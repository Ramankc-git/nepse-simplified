import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
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
          { error: error.detail || 'Subscription failed' },
          { status: 400 }
        );
      }

      return NextResponse.json({ success: true, message: 'Successfully subscribed!' });
    }

    // If no API key, just acknowledge (for demo)
    return NextResponse.json({
      success: true,
      message: 'Subscription noted! Configure Buttondown API key for automatic subscription.',
    });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
