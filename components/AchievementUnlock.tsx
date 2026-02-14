"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, X, Share2 } from "lucide-react";
import confetti from "canvas-confetti";
import { Achievement, getRarityColor, getRarityGlow } from "@/lib/achievements";
import { useProgress } from "@/context/ProgressContext";

interface AchievementUnlockProps {
  achievement: Achievement;
  onClose: () => void;
}

export default function AchievementUnlock({ achievement, onClose }: AchievementUnlockProps) {
  const [show, setShow] = useState(true);
  const progress = useProgress();

  useEffect(() => {
    // Trigger confetti
    const colors = {
      common: ['#9CA3AF', '#6B7280'],
      rare: ['#60A5FA', '#3B82F6'],
      epic: ['#2DD4BF', '#14B8A6'],
      legendary: ['#FBBF24', '#F59E0B']
    }[achievement.rarity];

    confetti({
      particleCount: achievement.rarity === 'legendary' ? 200 : achievement.rarity === 'epic' ? 150 : 100,
      spread: achievement.rarity === 'legendary' ? 120 : 80,
      origin: { y: 0.6 },
      colors
    });

    // Auto-close after 5 seconds
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onClose, 300);
    }, 5000);

    return () => clearTimeout(timer);
  }, [achievement, onClose]);

  const handleShare = () => {
    const text = `🎉 I just unlocked "${achievement.title}" in Claude Quest! ${achievement.emoji}\n\n${achievement.description}\n\n+${achievement.xp} XP`;

    // Track share action
    progress.incrementSharesCount();

    if (navigator.share) {
      navigator.share({
        title: 'Achievement Unlocked!',
        text: text,
      });
    } else {
      navigator.clipboard.writeText(text);
      alert('Achievement copied to clipboard!');
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -100 }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4"
        >
          <motion.div
            animate={{
              rotate: achievement.rarity === 'legendary' ? [0, 2, -2, 0] : 0,
            }}
            transition={{
              duration: 0.5,
              repeat: achievement.rarity === 'legendary' ? Infinity : 0,
              ease: "easeInOut"
            }}
            className={`relative bg-gradient-to-br ${
              achievement.rarity === 'legendary' ? 'from-yellow-500/20 to-orange-500/20' :
              achievement.rarity === 'epic' ? 'from-teal-500/20 to-cyan-500/20' :
              achievement.rarity === 'rare' ? 'from-blue-500/20 to-cyan-500/20' :
              'from-gray-500/20 to-gray-600/20'
            } backdrop-blur-xl rounded-3xl p-6 border-2 ${
              achievement.rarity === 'legendary' ? 'border-yellow-400/50' :
              achievement.rarity === 'epic' ? 'border-teal-400/50' :
              achievement.rarity === 'rare' ? 'border-blue-400/50' :
              'border-gray-400/50'
            } shadow-2xl ${getRarityGlow(achievement.rarity)}`}
          >
            {/* Close Button */}
            <button
              onClick={() => {
                setShow(false);
                setTimeout(onClose, 300);
              }}
              className="absolute top-3 right-3 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>

            <div className="flex items-start gap-4">
              {/* Achievement Icon */}
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.2
                }}
                className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${getRarityColor(achievement.rarity)} flex items-center justify-center text-3xl shadow-lg`}
              >
                {achievement.emoji}
              </motion.div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className={`w-5 h-5 ${
                    achievement.rarity === 'legendary' ? 'text-yellow-400' :
                    achievement.rarity === 'epic' ? 'text-teal-400' :
                    achievement.rarity === 'rare' ? 'text-blue-400' :
                    'text-gray-400'
                  }`} />
                  <span className={`text-xs font-bold uppercase tracking-wider ${
                    achievement.rarity === 'legendary' ? 'text-yellow-400' :
                    achievement.rarity === 'epic' ? 'text-teal-400' :
                    achievement.rarity === 'rare' ? 'text-blue-400' :
                    'text-gray-400'
                  }`}>
                    {achievement.rarity}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-1">
                  {achievement.title}
                </h3>
                <p className="text-sm text-orange-200 mb-3">
                  {achievement.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className={`text-lg font-bold bg-gradient-to-r ${getRarityColor(achievement.rarity)} bg-clip-text text-transparent`}>
                    +{achievement.xp} XP
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleShare}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white text-sm font-semibold"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Shine Effect for Legendary */}
            {achievement.rarity === 'legendary' && (
              <motion.div
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                style={{ transform: 'skewX(-20deg)' }}
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
