"use client";

import { useState, useCallback, useRef, useEffect } from 'react';

interface UseAsyncState<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
}

interface UseAsyncReturn<T> extends UseAsyncState<T> {
  execute: (...args: any[]) => Promise<T | undefined>;
  reset: () => void;
}

function useAsync<T = any>(
  asyncFunction: (...args: any[]) => Promise<T>,
  immediate = false
): UseAsyncReturn<T> {
  const [state, setState] = useState<UseAsyncState<T>>({
    data: null,
    error: null,
    loading: false,
  });

  // Keep track of the current execution to avoid race conditions
  const executionRef = useRef(0);

  const execute = useCallback(
    async (...args: any[]): Promise<T | undefined> => {
      // Increment execution counter
      const currentExecution = ++executionRef.current;

      setState(prevState => ({
        ...prevState,
        loading: true,
        error: null
      }));

      try {
        const result = await asyncFunction(...args);

        // Only update state if this is still the current execution
        if (currentExecution === executionRef.current) {
          setState({
            data: result,
            error: null,
            loading: false,
          });
          return result;
        }
      } catch (error) {
        // Only update state if this is still the current execution
        if (currentExecution === executionRef.current) {
          setState({
            data: null,
            error: error as Error,
            loading: false,
          });
        }
      }
    },
    [asyncFunction]
  );

  const reset = useCallback(() => {
    // Increment to cancel any ongoing executions
    executionRef.current++;
    setState({
      data: null,
      error: null,
      loading: false,
    });
  }, []);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {
    ...state,
    execute,
    reset,
  };
}

export default useAsync;