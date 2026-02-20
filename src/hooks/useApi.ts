"use client";

import { useState, useEffect, useCallback } from 'react';
import { ApiResponse } from '@/types';

interface UseApiOptions {
  immediate?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

interface UseApiReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (...args: any[]) => Promise<T>;
  reset: () => void;
}

function useApi<T = any>(
  apiFunction: (...args: any[]) => Promise<ApiResponse<T>>,
  options: UseApiOptions = {}
): UseApiReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async (...args: any[]): Promise<T> => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiFunction(...args);

        if (response.status === 'error') {
          throw new Error(response.error || 'API request failed');
        }

        const result = response.data as T;
        setData(result);
        options.onSuccess?.(result);
        return result;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        setError(errorMessage);
        options.onError?.(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiFunction, options]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (options.immediate) {
      execute();
    }
  }, [execute, options.immediate]);

  return { data, loading, error, execute, reset };
}

export default useApi;