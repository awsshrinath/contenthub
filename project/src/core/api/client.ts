import { config } from '@/lib/config';

export class APIError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export const apiClient = {
  async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(endpoint, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new APIError(response.status, await response.text());
    }

    return response.json();
  },
};