import { ApiResponse, ChatMessage, AIResponse } from '@/types';

// Base API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

// API Error classes
export class APIError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    message?: string
  ) {
    super(message || `API Error: ${status} ${statusText}`);
    this.name = 'APIError';
  }
}

export class NetworkError extends Error {
  constructor(message = 'Network error occurred') {
    super(message);
    this.name = 'NetworkError';
  }
}

// Generic API client
class APIClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new APIError(response.status, response.statusText);
      }

      const data = await response.json();
      return {
        data,
        status: 'success',
      };
    } catch (error) {
      if (error instanceof APIError) {
        return {
          status: 'error',
          error: error.message,
        };
      }

      return {
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  async get<T>(endpoint: string, params?: Record<string, string>): Promise<ApiResponse<T>> {
    const url = params ? `${endpoint}?${new URLSearchParams(params)}` : endpoint;
    return this.request<T>(url, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // Streaming request for AI chat
  async stream(endpoint: string, data: any): Promise<Response> {
    const url = `${this.baseURL}${endpoint}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: this.defaultHeaders,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new APIError(response.status, response.statusText);
    }

    return response;
  }
}

// Create default API client instance
export const api = new APIClient();

// Specific API functions
export const aiAPI = {
  async chat(messages: ChatMessage[], options?: {
    model?: string;
    temperature?: number;
  }): Promise<ApiResponse<AIResponse>> {
    return api.post('/ai/chat', {
      messages,
      ...options,
    });
  },

  async streamChat(
    messages: ChatMessage[],
    onChunk: (chunk: string) => void,
    options?: {
      model?: string;
      temperature?: number;
    }
  ): Promise<void> {
    try {
      const response = await api.stream('/ai/chat', {
        messages,
        ...options,
      });

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        onChunk(chunk);
      }
    } catch (error) {
      throw error instanceof Error ? error : new Error('Stream failed');
    }
  },
};

export const billingAPI = {
  async createCheckout(planType: string): Promise<ApiResponse<{ url: string }>> {
    return api.post('/checkout', { planType });
  },

  async verifyCheckout(sessionId: string): Promise<ApiResponse<{ success: boolean }>> {
    return api.post('/checkout/verify', { sessionId });
  },
};

export const progressAPI = {
  async syncProgress(progressData: any): Promise<ApiResponse<any>> {
    return api.post('/progress/sync', progressData);
  },

  async getLeaderboard(): Promise<ApiResponse<any[]>> {
    return api.get('/progress/leaderboard');
  },
};

// Request interceptors for common functionality
export const withAuth = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const withRetry = async <T>(
  apiCall: () => Promise<ApiResponse<T>>,
  maxRetries = 3,
  delay = 1000
): Promise<ApiResponse<T>> => {
  let lastError: Error = new Error('Max retries exceeded');

  for (let i = 0; i <= maxRetries; i++) {
    try {
      const result = await apiCall();
      if (result.status === 'success') {
        return result;
      }
      lastError = new Error(result.error);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');
    }

    if (i < maxRetries) {
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
    }
  }

  return {
    status: 'error',
    error: lastError.message,
  };
};

// Cache utility for API responses
class APICache {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

  set(key: string, data: any, ttl = 300000): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  get(key: string): any | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    if (Date.now() - cached.timestamp > cached.ttl) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  clear(): void {
    this.cache.clear();
  }

  delete(key: string): void {
    this.cache.delete(key);
  }
}

export const apiCache = new APICache();

// Cached API wrapper
export const withCache = <T>(
  key: string,
  apiCall: () => Promise<ApiResponse<T>>,
  ttl?: number
) => {
  return async (): Promise<ApiResponse<T>> => {
    const cached = apiCache.get(key);
    if (cached) {
      return { status: 'success', data: cached };
    }

    const result = await apiCall();
    if (result.status === 'success' && result.data) {
      apiCache.set(key, result.data, ttl);
    }

    return result;
  };
};