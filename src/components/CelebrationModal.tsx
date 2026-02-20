"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Sparkles, PartyPopper, ArrowRight, X } from 'lucide-react';
import { useProgress } from '@/context/ProgressContext';
import confetti from 'canvas-confetti';

interface CelebrationData {
  type: 'level_complete' | 'category_complete' | 'milestone';
  title: string;
  subtitle: string;
  xpEarned: number;
  nextAction?: {
    text: string;
    href: string;
  };
}

export default function CelebrationModal() {
  const [celebration, setCelebration] = useState<CelebrationData | null>(null);
  const { addEventListener, removeEventListener, completedLevels } = useProgress();

  useEffect(() => {
    const handleLevelCompleted = (event: any) => {
      const levelId = event.payload.levelId;

      // Trigger confetti
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }, 300);

      // Check for major milestones
      let celebrationData: CelebrationData | null = null;

      if (levelId === 0) {
        celebrationData = {
          type: 'level_complete',
          title: 'Welcome to AI Coding!',
          subtitle: 'You\'ve taken your first step into AI-powered development!',
          xpEarned: event.payload.xpEarned,
          nextAction: {
            text: 'Continue to Terminal Basics',
            href: '/level/1'
          }
        };
      } else if (levelId === 1) {
        celebrationData = {
          type: 'category_complete',
          title: 'Foundation Complete!',
          subtitle: 'You\'ve mastered the fundamentals! Ready to build real projects?',
          xpEarned: event.payload.xpEarned,
          nextAction: {
            text: 'Start Building Phase',
            href: '/level/2'
          }
        };
      } else if (levelId === 3) {
        celebrationData = {
          type: 'category_complete',
          title: 'Building Phase Complete!',
          subtitle: 'Amazing! You\'ve created real projects. Ready for mastery?',
          xpEarned: event.payload.xpEarned,
          nextAction: {
            text: 'Enter Mastery Phase',
            href: '/level/4'
          }
        };
      } else if (levelId === 5) {
        celebrationData = {
          type: 'milestone',
          title: 'Claude Academy Master!',
          subtitle: 'Congratulations! You\'ve completed the entire journey!',
          xpEarned: event.payload.xpEarned,
          nextAction: {
            text: 'Explore More Projects',
            href: '/projects'
          }
        };
      } else {
        celebrationData = {
          type: 'level_complete',
          title: `Level ${levelId} Complete!`,
          subtitle: 'Great progress! Keep the momentum going!',
          xpEarned: event.payload.xpEarned
        };
      }

      if (celebrationData) {
        setCelebration(celebrationData);
      }
    };

    addEventListener('level_completed', handleLevelCompleted);

    return () => {
      removeEventListener('level_completed', handleLevelCompleted);
    };
  }, [addEventListener, removeEventListener]);

  const closeCelebration = () => {
    setCelebration(null);
  };

  if (!celebration) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl p-8 max-w-md w-full border border-primary/20 shadow-2xl overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={closeCelebration}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
          >
            <X className="w-4 h-4 text-white/70" />
          </button>

          {/* Background effects */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,215,0,0.15),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(255,105,180,0.1),transparent_50%)]" />
          </div>

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400/30 rounded-full"
                initial={{
                  x: Math.random() * 300,
                  y: Math.random() * 400,
                  opacity: 0
                }}
                animate={{
                  y: [null, Math.random() * -100 - 50],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.5, 0.5]
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              />
            ))}
          </div>

          {/* Main content */}
          <div className="text-center relative z-10">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400/20 to-orange-500/20 border border-yellow-400/30 mb-6"
            >
              {celebration.type === 'milestone' ? (
                <Trophy className="w-10 h-10 text-yellow-400" />
              ) : celebration.type === 'category_complete' ? (
                <PartyPopper className="w-10 h-10 text-yellow-400" />
              ) : (
                <Star className="w-10 h-10 text-yellow-400" />
              )}
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-white mb-2"
            >
              {celebration.title}
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-white/70 mb-6"
            >
              {celebration.subtitle}
            </motion.p>

            {/* XP Reward */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl px-6 py-3 border border-primary/30 mb-8"
            >
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-bold text-lg">
                +{celebration.xpEarned} XP
              </span>
            </motion.div>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-3 justify-center"
            >
              {celebration.nextAction ? (
                <a
                  href={celebration.nextAction.href}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary px-6 py-3 rounded-xl text-white font-semibold hover:scale-105 transition-transform"
                  onClick={closeCelebration}
                >
                  <span>{celebration.nextAction.text}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              ) : null}

              <button
                onClick={closeCelebration}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl text-white font-semibold transition-colors"
              >
                {celebration.nextAction ? 'Later' : 'Awesome!'}
              </button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}