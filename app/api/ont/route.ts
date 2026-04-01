import axios, { AxiosResponse, AxiosError } from 'axios';
import { resolve } from 'path';
import { NextResponse, NextRequest } from 'next/server';

// Define base URL
const API_BASE_URL = "https://api.arwyd.it.com";
const HEADERS = {
  "Content-Type": "application/json",
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  Accept: 'application/json',
  'Accept-Language': 'en-US,en;q=0.9',
  Referer: 'https://api.arwyd.it.com/',
  Origin: 'https://api.arwyd.it.com',
  Connection: 'keep-alive',
}

// Define sleep condition
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Define API route handler for fetching ONT data
async function fetchWithRetry(url: string, maxRetries: number = 3): Promise<AxiosResponse> {
  for(let i = 0; i < maxRetries; i++){
    try {
      const response = await axios.get(url, {
        headers: HEADERS,
        timeout: 15000, // Set timeout to 15 seconds
        validateStatus: () => true, // Accept all status codes for custom handling
      })
      console.log(`[v0] Attempt ${i + 1}: Status ${response.status}`);

      // Check if status code is 403/404
      if(response.status === 403 || response.status === 404){
        console.log(`[v0] Received ${response.status} - Retrying after delay...`);
        if(i < maxRetries - 1){
          await sleep(2000); // Wait for 2 seconds before retrying
          continue;
        }
      }
        return response;
      } catch (error) {
      console.error(`[v0] Fetch error: ${error}`);

      // Check if max retries reached
      if(maxRetries - 1){
        console.log(`[v0] Retrying after error...`);
        await sleep(2000);
        continue;
      }

      // Throw error if all retries failed
      throw error;
    }
  } 
  throw new Error('Max retries reached - Unable to fetch data');
} 

// Define GET request handler for ONT data endpoint
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
      `${API_BASE_URL}/api/ont/${encodeURIComponent(customerId)}`
    );

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

    if (response.status < 200 || response.status >= 300) {
      return NextResponse.json(
        {
          error:
            typeof response.data?.error === 'string'
              ? response.data.error
              : `Failed to fetch data: ${response.status}`,
        },
        { status: response.status }
      );
    }

    console.log('[v0] Successfully fetched ONT data');
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('[v0] API Error:', error);

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      if (axiosError.code === 'ECONNABORTED') {
        return NextResponse.json(
          { error: 'Request timed out. Please try again.' },
          { status: 504 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to fetch ONT data. Please try again.' },
      { status: 500 }
    );
  }
}