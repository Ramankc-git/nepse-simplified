import { NextResponse } from 'next/server';
import { fetchMarketData } from '@/lib/nepse-api';

// Simple in-memory rate limiting for market-data endpoint
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 30; // max 30 requests per minute per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now - record.lastReset > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return false;
  }

  record.count++;
  if (record.count > RATE_LIMIT_MAX) {
    return true;
  }
  return false;
}

export async function GET(request: Request) {
  try {
    // Rate limiting
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.', timestamp: new Date().toISOString() },
        { status: 429 }
      );
    }

    // Priority 1: Check CMS for latest weekly market data (server-only)
    try {
      const { getCmsMarketData } = await import('@/lib/cms');
      const cmsData = getCmsMarketData();
      if (cmsData) return NextResponse.json(cmsData);
    } catch {
      // CMS not available, continue to API
    }

    // Priority 2: Try external APIs, then fallback sample data
    const data = await fetchMarketData();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch market data', timestamp: new Date().toISOString() },
      { status: 500 }
    );
  }
}
