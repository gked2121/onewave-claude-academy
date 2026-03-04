'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Map } from 'lucide-react';
import { KnowledgeMap } from '@/components/KnowledgeMap';
import { useProgress } from '@/context/ProgressContext';

export default function KnowledgeMapPage() {
  const router = useRouter();
  const { userEmail } = useProgress();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !userEmail) {
      router.push('/login');
    }
  }, [mounted, userEmail, router]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-claude border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-bg pt-24 pb-16 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80rem_50rem_at_50%_-10%,rgba(37,99,235,0.06),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60rem_40rem_at_80%_80%,rgba(218,119,86,0.04),transparent)]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Map className="w-7 h-7 text-primary" />
            <h1 className="text-3xl font-bold text-text">Knowledge Map</h1>
          </div>
          <p className="text-text-soft">
            Your learning progress across all 8 tracks. Complete prerequisites to unlock advanced tracks.
          </p>
        </motion.div>

        {/* Knowledge Map Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <KnowledgeMap />
        </motion.div>
      </div>
    </main>
  );
}
