"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Redirect legacy level 0 to new onboarding
export default function LevelZero() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/onboarding');
  }, [router]);

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-claude border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
