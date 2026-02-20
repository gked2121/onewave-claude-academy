"use client";

import { useEffect, useCallback } from 'react';

interface UseKeyboardOptions {
  preventDefault?: boolean;
  stopPropagation?: boolean;
  enabled?: boolean;
}

function useKeyboard(
  key: string | string[],
  callback: (event: KeyboardEvent) => void,
  options: UseKeyboardOptions = {}
) {
  const { preventDefault = false, stopPropagation = false, enabled = true } = options;

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return;

      const keys = Array.isArray(key) ? key : [key];
      const keyPressed = event.key.toLowerCase();

      if (keys.some(k => k.toLowerCase() === keyPressed)) {
        if (preventDefault) event.preventDefault();
        if (stopPropagation) event.stopPropagation();
        callback(event);
      }
    },
    [key, callback, preventDefault, stopPropagation, enabled]
  );

  useEffect(() => {
    if (!enabled) return;

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress, enabled]);
}

export default useKeyboard;