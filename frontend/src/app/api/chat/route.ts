import { NextResponse } from 'next/server';

const BASE_URL = 'https://u1xbad85mh.execute-api.us-east-1.amazonaws.com/dev';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt, session_id } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    if (!session_id) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    const apiResponse = await fetch(
      `${BASE_URL}/sessions/${encodeURIComponent(session_id)}/messages`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      }
    );

    if (!apiResponse.ok) {
      throw new Error(`API responded with status ${apiResponse.status}`);
    }

    const data = await apiResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error processing chat request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

