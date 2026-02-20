"use client";

import { useEffect } from 'react';

function useTitle(title: string, restore = true) {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const previousTitle = document.title;
    document.title = title;

    return () => {
      if (restore) {
        document.title = previousTitle;
      }
    };
  }, [title, restore]);
}

export default useTitle;