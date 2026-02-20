'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { TrackSelector } from '@/components/learning/TrackSelector';
import { getAllTracks } from '@/lib/tracks';
import { useProgress } from '@/context/ProgressContext';
import type { LearningTrack, UserTrackProgress } from '@/lib/types';

export default function TracksPage() {
  const router = useRouter();
  const { plan, completedLevels, userEmail } = useProgress();
  const [tracks, setTracks] = useState<LearningTrack[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const allTracks = getAllTracks();
    setTracks(allTracks);
  }, []);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (mounted && !userEmail) {
      router.push('/login');
    }
  }, [mounted, userEmail, router]);

  const userProgress: Record<string, UserTrackProgress> = {};

  const userPlan: 'free' | 'individual' | 'team' | 'enterprise' =
    plan === 'full' ? 'individual' : 'free';

  const handleSelectTrack = (trackSlug: string) => {
    router.push(`/tracks/${trackSlug}`);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-claude border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-bg pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <TrackSelector
            tracks={tracks}
            userProgress={userProgress}
            userPlan={userPlan}
            onSelectTrack={handleSelectTrack}
          />
        </motion.div>
      </div>
    </main>
  );
}
