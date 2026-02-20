"use client";

import { usePathname } from 'next/navigation';
import Enhanced3DBackground from './Enhanced3DBackground';
import FloatingElements from './FloatingElements';

export default function ConditionalBackground() {
  const pathname = usePathname();

  // Don't show background on mastermind page
  if (pathname === '/mastermind') {
    return null;
  }

  return (
    <>
      <Enhanced3DBackground />
      <FloatingElements />
    </>
  );
}
