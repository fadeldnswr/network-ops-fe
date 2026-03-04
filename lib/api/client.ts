
// Define API client
const API_URL = process.env.API_URL || "http://192.168.254.11:8002";

// Helper function to make API requests
export async function apiGet<T>(path: string): Promise<T> {
    const response = await fetch(`${API_URL}${path}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        cache: 'no-cache'
    })

    // Check if the response is successful
    if(!response.ok) {
        throw new Error(`API request failed with status ${response.status}: ${response.statusText}`)
    }
    return response.json() as Promise<T>;
}