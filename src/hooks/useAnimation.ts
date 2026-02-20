"use client";

import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from './useMediaQuery';

interface UseAnimationOptions {
  duration?: number;
  delay?: number;
  easing?: string;
  loop?: boolean;
  autoStart?: boolean;
}

interface UseAnimationReturn {
  isAnimating: boolean;
  start: () => void;
  stop: () => void;
  reset: () => void;
  progress: number;
}

function useAnimation({
  duration = 1000,
  delay = 0,
  easing = 'ease-in-out',
  loop = false,
  autoStart = false
}: UseAnimationOptions = {}): UseAnimationReturn {
  const [isAnimating, setIsAnimating] = useState(false);
  const [progress, setProgress] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  const start = () => {
    if (prefersReducedMotion) {
      setProgress(1);
      return;
    }
    setIsAnimating(true);
    setProgress(0);
  };

  const stop = () => {
    setIsAnimating(false);
  };

  const reset = () => {
    setIsAnimating(false);
    setProgress(0);
  };

  useEffect(() => {
    if (autoStart && !prefersReducedMotion) {
      const timer = setTimeout(start, delay);
      return () => clearTimeout(timer);
    }
  }, [autoStart, delay, prefersReducedMotion]);

  useEffect(() => {
    if (!isAnimating || prefersReducedMotion) return;

    const startTime = Date.now();
    let animationFrame: number;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(elapsed / duration, 1);

      setProgress(newProgress);

      if (newProgress >= 1) {
        if (loop) {
          setProgress(0);
          animate();
        } else {
          setIsAnimating(false);
        }
      } else {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    const delayTimer = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(delayTimer);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isAnimating, duration, delay, loop, prefersReducedMotion]);

  return {
    isAnimating,
    start,
    stop,
    reset,
    progress
  };
}

export default useAnimation;