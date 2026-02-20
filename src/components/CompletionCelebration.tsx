"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Trophy, Star, Sparkles, ArrowRight, Share2 } from 'lucide-react';
import Link from 'next/link';

interface CompletionCelebrationProps {
  isOpen: boolean;
  onClose: () => void;
  level: number;
  title: string;
  xpEarned: number;
  nextLevel?: number;
  achievements?: Array<{
    id: string;
    title: string;
    icon: string;
    xpReward: number;
  }>;
}

export default function CompletionCelebration({
  isOpen,
  onClose,
  level,
  title,
  xpEarned,
  nextLevel,
  achievements = []
}: CompletionCelebrationProps) {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Trigger confetti animation
      const duration = 3000;
      const animationEnd = Date.now() + duration;

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti({
          angle: randomInRange(55, 125),
          spread: randomInRange(50, 70),
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });

        confetti({
          angle: randomInRange(55, 125),
          spread: randomInRange(50, 70),
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }, 250);

      // Show details after initial animation
      setTimeout(() => setShowDetails(true), 1000);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const shareText = `Just completed Level ${level}: ${title} in Claude Academy! Earned ${xpEarned} XP and ${achievements.length} achievements. Learning AI development has never been this fun! #ClaudeAcademy #AILearning`;

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    window.open(`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl p-8 max-w-lg w-full ring-1 ring-white/10 shadow-2xl"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Trophy Animation */}
            <div className="text-center mb-6">
              <motion.div
                className="inline-block"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              </motion.div>

              <motion.h1
                className="text-3xl font-bold text-white mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Level Complete!
              </motion.h1>

              <motion.p
                className="text-xl text-primary font-semibold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {title}
              </motion.p>
            </div>

            {/* XP and Stats */}
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-6"
                >
                  {/* XP Earned */}
                  <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl p-6 border border-primary/30">
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <Sparkles className="w-6 h-6 text-yellow-400" />
                      <span className="text-2xl font-bold text-white">+{xpEarned} XP</span>
                    </div>
                    <p className="text-center text-white/70">Experience Points Earned</p>
                  </div>

                  {/* Achievements */}
                  {achievements.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-yellow-400" />
                        Achievements Unlocked!
                      </h3>
                      <div className="space-y-2">
                        {achievements.map((achievement, index) => (
                          <motion.div
                            key={achievement.id}
                            className="flex items-center gap-3 bg-white/5 rounded-lg p-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index }}
                          >
                            <span className="text-2xl">{achievement.icon}</span>
                            <div className="flex-1">
                              <h4 className="font-medium text-white">{achievement.title}</h4>
                            </div>
                            <div className="flex items-center gap-1 text-yellow-400">
                              <Star className="w-4 h-4" />
                              <span className="text-sm font-medium">+{achievement.xpReward}</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Share Section */}
                  <div className="border-t border-white/10 pt-6">
                    <h3 className="text-lg font-semibold text-white mb-4 text-center">
                      Share Your Success!
                    </h3>
                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={shareOnTwitter}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm"
                      >
                        <Share2 className="w-4 h-4" />
                        Twitter
                      </button>
                      <button
                        onClick={shareOnLinkedIn}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors text-sm"
                      >
                        <Share2 className="w-4 h-4" />
                        LinkedIn
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-2">
                    {nextLevel !== undefined ? (
                      <Link
                        href={`/level/${nextLevel}`}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                        onClick={onClose}
                      >
                        Next Level
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    ) : (
                      <Link
                        href="/journey"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                        onClick={onClose}
                      >
                        View Journey
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}

                    <button
                      onClick={onClose}
                      className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-colors"
                    >
                      Continue
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}