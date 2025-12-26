import { NextRequest, NextResponse } from 'next/server';

// Access your secret API key from server-side environment variables
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// This is the official Google AI API endpoint
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

export async function POST(req: NextRequest) {
  // 1. Check if the API key is configured on the server
  if (!GEMINI_API_KEY) {
    return NextResponse.json(
      { error: 'API key not configured on server. Please set GEMINI_API_KEY.' },
      { status: 500 }
    );
  }

  try {
    // 2. Get the prompt from the client's request
    const { prompt, history } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required.' }, { status: 400 });
    }

    // 3. Prepare the payload to send to the official Gemini API
    const payload = {
      // Use the provided history or create a new one with the prompt
      contents: history || [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        topP: 0.9,
      },
    };

    // 4. Make the call to the actual Gemini API from your server
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API Error:', errorData);
      return NextResponse.json(
        { error: errorData.error?.message || 'An error occurred with the Gemini API.' },
        { status: response.status }
      );
    }

    // 5. Send the successful response back to your client
    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (text) {
      return NextResponse.json({ text });
    } else {
      console.warn('Unexpected Gemini API response structure:', data);
      return NextResponse.json({ error: 'Could not extract text from Gemini response.' }, { status: 500 });
    }

  } catch (error: any) {
    console.error('Error in your /api/gemini route:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}