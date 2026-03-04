'use client';

import { useState, useEffect, useRef } from 'react';

interface TypewriterTextProps {
  text: string;
  /** Characters per second */
  speed?: number;
  /** Delay before starting in ms */
  delay?: number;
  /** HTML mode - renders as HTML after completion, types as plain text */
  html?: boolean;
  className?: string;
  /** Called when typing finishes */
  onComplete?: () => void;
  /** Show blinking cursor */
  cursor?: boolean;
}

export function TypewriterText({
  text,
  speed = 40,
  delay = 0,
  html = false,
  className = '',
  onComplete,
  cursor = true,
}: TypewriterTextProps) {
  const [displayedLength, setDisplayedLength] = useState(0);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);

  // Strip HTML tags to get plain text for character counting
  const plainText = html ? text.replace(/<[^>]*>/g, '') : text;

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    intervalRef.current = setInterval(() => {
      setDisplayedLength(prev => {
        if (prev >= plainText.length) {
          clearInterval(intervalRef.current);
          setDone(true);
          onComplete?.();
          return prev;
        }
        return prev + 1;
      });
    }, 1000 / speed);

    return () => clearInterval(intervalRef.current);
  }, [started, plainText.length, speed, onComplete]);

  if (!started) {
    return <span className={className} />;
  }

  // Once done and HTML mode, render full HTML
  if (done && html) {
    return (
      <span
        className={className}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    );
  }

  const displayed = plainText.slice(0, displayedLength);

  return (
    <span className={className}>
      {displayed}
      {cursor && !done && (
        <span className="inline-block w-[2px] h-[1em] bg-current ml-0.5 animate-blink align-text-bottom" />
      )}
    </span>
  );
}
