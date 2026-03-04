'use client';

import { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  value: number;
  /** Duration in ms */
  duration?: number;
  /** Delay before starting in ms */
  delay?: number;
  /** Format with locale separators */
  format?: boolean;
  /** Suffix to append */
  suffix?: string;
  /** Prefix to prepend */
  prefix?: string;
  className?: string;
}

export function AnimatedCounter({
  value,
  duration = 1200,
  delay = 0,
  format = false,
  suffix = '',
  prefix = '',
  className = '',
}: AnimatedCounterProps) {
  const [displayed, setDisplayed] = useState(0);
  const [started, setStarted] = useState(false);
  const frameRef = useRef<number>(undefined);
  const startTimeRef = useRef<number>(undefined);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started || value === 0) {
      if (value === 0) setDisplayed(0);
      return;
    }

    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);

      setDisplayed(Math.round(easedProgress * value));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    startTimeRef.current = undefined;
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [started, value, duration]);

  const formattedValue = format ? displayed.toLocaleString() : String(displayed);

  return (
    <span className={className}>
      {prefix}{formattedValue}{suffix}
    </span>
  );
}
