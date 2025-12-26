import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Call Nano Banana Pro API
    const response = await fetch('https://api.nanobanana.pro/v1/image/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
        width: 1024,
        height: 1024,
        steps: 4,
        guidance: 2,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Nano Banana Pro API error:', errorData);
      return NextResponse.json(
        { error: errorData.message || 'Failed to generate image' },
        { status: response.status }
      );
    }

    const data = await response.json();

    // The API returns the image URL in the response
    if (!data.image_url && !data.imageUrl && !data.url) {
      console.error('No image URL in response:', data);
      return NextResponse.json(
        { error: 'No image URL returned from API' },
        { status: 500 }
      );
    }

    const imageUrl = data.image_url || data.imageUrl || data.url;

    return NextResponse.json({ imageUrl });
  } catch (error: any) {
    console.error('Error generating image:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
