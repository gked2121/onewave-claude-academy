"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Redirect legacy journey page to new dashboard
export default function JourneyPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-claude border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
