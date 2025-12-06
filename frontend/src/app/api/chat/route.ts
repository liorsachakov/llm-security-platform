import { NextResponse } from 'next/server';

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

    const apiResponse = await fetch('https://u1xbad85mh.execute-api.us-east-1.amazonaws.com/dev/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        session_id
      }),
    });

    if (!apiResponse.ok) {
      throw new Error(`API responded with status ${apiResponse.status}`);
    }

    const data = await apiResponse.json();
    
    // The external API returns { response: "..." } or similar structure. 
    // Adjust based on actual response format if needed.
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error processing chat request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

