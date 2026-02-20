import Link from 'next/link';

export default function CancelPage() {
  return (
    <main className="min-h-screen p-8 text-white flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold mb-2">Checkout canceled</h1>
      <p className="text-gray-300 mb-6">No worries — you can complete your quest on Free anytime.</p>
      <div className="flex gap-3">
        <Link href="/upgrade" className="btn-primary">Choose a plan</Link>
        <Link href="/journey" className="btn-secondary">Back to Journey</Link>
      </div>
    </main>
  );
}

