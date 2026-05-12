import { NextResponse } from 'next/server';
import { fetchMarketData } from '@/lib/nepse-api';

export async function GET() {
  try {
    const data = await fetchMarketData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch market data', timestamp: new Date().toISOString() },
      { status: 500 }
    );
  }
}
