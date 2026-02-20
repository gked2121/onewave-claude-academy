"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Redirect legacy level pages to new tracks system
export default function LevelOne() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/tracks/claude-chat/1');
  }, [router]);

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-claude border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
