import { NextResponse } from 'next/server';

// Simple in-memory rate limiting (resets on server restart)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 3; // max 3 submissions per minute per IP

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

export async function POST(request: Request) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email, honeypot } = body;

    // Honeypot check - bots will fill this hidden field
    if (honeypot) {
      // Silently accept but don't process
      return NextResponse.json({ success: true, message: 'Subscribed!' });
    }

    // Email validation
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    // RFC 5322 simplified email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 });
    }

    // Reject obviously disposable/temporary email patterns
    const disposablePatterns = ['test@', 'temp@', 'fake@', 'noreply@', 'example@', 'admin@localhost'];
    const emailLower = email.toLowerCase();
    for (const pattern of disposablePatterns) {
      if (emailLower.includes(pattern)) {
        return NextResponse.json({ error: 'Please use a real email address' }, { status: 400 });
      }
    }

    // Buttondown API integration (free tier)
    // User needs to set BUTTONDOWN_API_KEY environment variable
    const apiKey = process.env.BUTTONDOWN_API_KEY;

    if (apiKey) {
      const response = await fetch('https://api.buttondown.email/v1/subscribers', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const error = await response.json();
        return NextResponse.json(
          { error: error.detail || 'Subscription failed. Please try again.' },
          { status: 400 }
        );
      }

      return NextResponse.json({ success: true, message: 'Successfully subscribed! Check your inbox.' });
    }

    // If no API key, acknowledge the subscription
    return NextResponse.json({
      success: true,
      message: "You're on the list! We'll notify you when we launch email delivery.",
    });
  } catch {
    return NextResponse.json({ error: 'Internal server error. Please try again.' }, { status: 500 });
  }
}
