"use client";

import { usePathname } from 'next/navigation';

export default function ConditionalBackground() {
  const pathname = usePathname();

  if (pathname === '/mastermind') {
    return null;
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1E] via-[#0F172A] to-[#0A0F1E]" />

      {/* Subtle dot grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Top-left warm glow */}
      <div className="absolute -top-[400px] -left-[200px] w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(218,119,86,0.06)_0%,transparent_70%)]" />

      {/* Bottom-right cool glow */}
      <div className="absolute -bottom-[300px] -right-[200px] w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.04)_0%,transparent_70%)]" />

      {/* Top edge highlight */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </div>
  );
}
