"use client";

import { useState, useEffect, useCallback, useRef } from 'react';

interface UseTimerOptions {
  initialTime?: number;
  interval?: number;
  onComplete?: () => void;
}

interface UseTimerReturn {
  time: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: (newTime?: number) => void;
  stop: () => void;
}

function useTimer({
  initialTime = 0,
  interval = 1000,
  onComplete
}: UseTimerOptions = {}): UseTimerReturn {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback((newTime?: number) => {
    setTime(newTime ?? initialTime);
    setIsRunning(false);
  }, [initialTime]);

  const stop = useCallback(() => {
    setTime(initialTime);
    setIsRunning(false);
  }, [initialTime]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime - 1;
          if (newTime <= 0) {
            setIsRunning(false);
            onComplete?.();
            return 0;
          }
          return newTime;
        });
      }, interval);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, interval, onComplete]);

  return {
    time,
    isRunning,
    start,
    pause,
    reset,
    stop,
  };
}

export default useTimer;