"use client";

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useProgress } from '@/context/ProgressContext';

export default function SuccessPage() {
  return (
    <Suspense fallback={<Loading />}> 
      <SuccessInner />
    </Suspense>
  );
}

function Loading() {
  return (
    <main className="min-h-screen p-8 text-white flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold">Verifying your purchase…</h1>
    </main>
  );
}

function SuccessInner() {
  const params = useSearchParams();
  const sessionId = params.get('session_id');
  const { setPlan } = useProgress();
  const [status, setStatus] = useState<'verifying' | 'ok' | 'fail'>('verifying');

  useEffect(() => {
    async function run() {
      if (!sessionId) return setStatus('fail');
      try {
        const res = await fetch(`/api/checkout/verify?session_id=${sessionId}`);
        const data = await res.json();
        if (data.ok) {
          setPlan('full');
          setStatus('ok');
        } else {
          setStatus('fail');
        }
      } catch {
        setStatus('fail');
      }
    }
    run();
  }, [sessionId, setPlan]);

  return (
    <main className="min-h-screen p-8 text-white flex flex-col items-center justify-center text-center">
      {status === 'verifying' && <h1 className="text-3xl font-bold">Verifying your purchase…</h1>}
      {status === 'ok' && (
        <>
          <h1 className="text-4xl font-bold mb-2">You're Pro!</h1>
          <p className="text-gray-300 mb-6">Thanks for supporting Claude Academy. Extra levels and features are unlocked.</p>
          <Link href="/journey" className="btn-primary">Back to Journey</Link>
        </>
      )}
      {status === 'fail' && (
        <>
          <h1 className="text-3xl font-bold mb-2">We couldn’t verify your payment</h1>
          <p className="text-gray-300 mb-6">If you were charged, contact support with your email and we’ll fix it.</p>
          <div className="flex gap-3">
            <Link href="/upgrade" className="btn-secondary">Try again</Link>
            <Link href="/" className="btn-primary">Home</Link>
          </div>
        </>
      )}
    </main>
  );
}
