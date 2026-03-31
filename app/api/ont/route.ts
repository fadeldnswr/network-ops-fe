import { NextRequest, NextResponse } from 'next/server';

async function fetchWithRetry(url: string, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'application/json',
          'Accept-Language': 'en-US,en;q=0.9',
          'Referer': 'https://api.arwyd.it.com/',
          'Origin': 'https://api.arwyd.it.com',
          'Connection': 'keep-alive',
        },
      });

      console.log(`[v0] Attempt ${i + 1}: Status ${response.status}`);

      if (response.status === 403) {
        console.log('[v0] Received 403, waiting before retry...');
        await new Promise((resolve) => setTimeout(resolve, 2000));
        continue;
      }

      return response;
    } catch (error) {
      console.error(`[v0] Attempt ${i + 1} failed:`, error);
      if (i < maxRetries - 1) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }
  }

  throw new Error('Failed to fetch after multiple retries');
}

export async function GET(request: NextRequest) {
  const customerId = request.nextUrl.searchParams.get('customer_id');

  if (!customerId) {
    return NextResponse.json(
      { error: 'Customer ID is required' },
      { status: 400 }
    );
  }

  try {
    console.log('[v0] Fetching ONT data for customer ID:', customerId);

    const response = await fetchWithRetry(
      `https://api.arwyd.it.com/api/ont/${customerId}`
    );

    if (!response.ok) {
      console.log('[v0] API response status:', response.status);

      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Customer ID not found' },
          { status: 404 }
        );
      }

      if (response.status === 403) {
        console.log('[v0] Received persistent 403 - API may require authentication');
        return NextResponse.json(
          {
            error:
              'The API service is currently unavailable. Please check if your customer ID is correct and try again later.',
          },
          { status: 503 }
        );
      }

      return NextResponse.json(
        { error: `Failed to fetch data: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('[v0] Successfully fetched ONT data');

    return NextResponse.json(data);
  } catch (error) {
    console.error('[v0] API Error:', error);

    return NextResponse.json(
      { error: 'Failed to fetch ONT data. Please try again.' },
      { status: 500 }
    );
  }
}
