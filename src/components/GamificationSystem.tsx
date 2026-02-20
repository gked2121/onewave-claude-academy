"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgress } from '@/context/ProgressContext';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Star,
  Zap,
  Target,
  Award,
  Gift,
  Flame,
  Heart,
  Shield,
  Sparkles,
  Crown,
  Medal,
  Gem,
  Rocket,
  Brain,
  Code,
  Terminal,
  CheckCircle,
  TrendingUp,
  BookOpen
} from 'lucide-react';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  xpReward: number;
  unlocked: boolean;
  unlockedAt?: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  total: number;
  reward: number;
  icon: React.ReactNode;
}

interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  completed: boolean;
  icon: React.ReactNode;
}

export default function GamificationSystem() {
  const { xp, achievements: unlockedAchievements, completedLevels, addXP } = useProgress();
  const streak = 0; // TODO: Implement streak tracking
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [currentReward, setCurrentReward] = useState<any>(null);
  const [dailyStreak, setDailyStreak] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  const badges: Badge[] = [
    {
      id: 'first-steps',
      name: 'First Steps',
      description: 'Complete your first lesson',
      icon: <Sparkles className="w-6 h-6" />,
      color: 'from-green-400 to-green-600',
      xpReward: 50,
      unlocked: unlockedAchievements.includes('firstSteps'),
      rarity: 'common'
    },
    {
      id: 'terminal-master',
      name: 'Terminal Master',
      description: 'Complete the terminal tutorial',
      icon: <Terminal className="w-6 h-6" />,
      color: 'from-primary to-secondary',
      xpReward: 100,
      unlocked: unlockedAchievements.includes('terminalMaster'),
      rarity: 'rare'
    },
    {
      id: 'ai-wizard',
      name: 'AI Wizard',
      description: 'Use AI to generate 10 code snippets',
      icon: <Brain className="w-6 h-6" />,
      color: 'from-purple-400 to-pink-400',
      xpReward: 200,
      unlocked: unlockedAchievements.includes('aiWizard'),
      rarity: 'epic'
    },
    {
      id: 'streak-champion',
      name: 'Streak Champion',
      description: 'Maintain a 7-day streak',
      icon: <Flame className="w-6 h-6" />,
      color: 'from-orange-400 to-red-500',
      xpReward: 300,
      unlocked: (streak || 0) >= 7,
      rarity: 'epic'
    },
    {
      id: 'code-master',
      name: 'Code Master',
      description: 'Complete all beginner levels',
      icon: <Crown className="w-6 h-6" />,
      color: 'from-yellow-400 to-yellow-600',
      xpReward: 500,
      unlocked: unlockedAchievements.includes('codeMaster'),
      rarity: 'legendary'
    }
  ];

  const achievements: Achievement[] = [
    {
      id: 'lessons-completed',
      title: 'Lesson Explorer',
      description: 'Complete lessons to progress',
      progress: (completedLevels || []).length,
      total: 10,
      reward: 100,
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      id: 'xp-collector',
      title: 'XP Collector',
      description: 'Earn experience points',
      progress: Math.min(xp || 0, 1000),
      total: 1000,
      reward: 200,
      icon: <Star className="w-5 h-5" />
    },
    {
      id: 'badge-hunter',
      title: 'Badge Hunter',
      description: 'Unlock badges',
      progress: badges.filter(b => b.unlocked).length,
      total: badges.length,
      reward: 150,
      icon: <Medal className="w-5 h-5" />
    }
  ];

  const dailyChallenges: DailyChallenge[] = [
    {
      id: 'daily-lesson',
      title: 'Complete a Lesson',
      description: 'Finish any lesson today',
      xpReward: 25,
      completed: false,
      icon: <Target className="w-5 h-5 text-primary" />
    },
    {
      id: 'daily-practice',
      title: 'Practice Coding',
      description: 'Write at least 10 lines of code',
      xpReward: 30,
      completed: false,
      icon: <Code className="w-5 h-5 text-secondary" />
    },
    {
      id: 'daily-streak',
      title: 'Keep the Streak',
      description: 'Login and learn today',
      xpReward: 20,
      completed: true,
      icon: <Flame className="w-5 h-5 text-orange-400" />
    }
  ];

  const triggerReward = (reward: any) => {
    setCurrentReward(reward);
    setShowRewardModal(true);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#2FC1F4', '#00C7BD', '#FFD700', '#FF69B4']
    });

    if (reward.xp) {
      addXP(reward.xp);
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-yellow-400 to-yellow-600';
      default: return 'from-zinc-400 to-zinc-600';
    }
  };

  const getRarityLabel = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'Common';
      case 'rare': return 'Rare';
      case 'epic': return 'Epic';
      case 'legendary': return 'Legendary';
      default: return 'Basic';
    }
  };

  return (
    <div className="space-y-8 p-6">
      {/* Stats Overview */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="bg-zinc-900/90 backdrop-blur rounded-xl p-4 border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-yellow-400/20 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-white/60 text-xs">Total XP</p>
              <p className="text-white text-xl font-bold">{xp || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/90 backdrop-blur rounded-xl p-4 border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-orange-400/20 rounded-lg flex items-center justify-center">
              <Flame className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="text-white/60 text-xs">Streak</p>
              <p className="text-white text-xl font-bold">{streak || 0} days</p>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/90 backdrop-blur rounded-xl p-4 border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-white/60 text-xs">Badges</p>
              <p className="text-white text-xl font-bold">{badges.filter(b => b.unlocked).length}</p>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/90 backdrop-blur rounded-xl p-4 border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p className="text-white/60 text-xs">Level</p>
              <p className="text-white text-xl font-bold">{Math.floor((xp || 0) / 100) + 1}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Daily Challenges */}
      <motion.div
        className="bg-zinc-900/90 backdrop-blur rounded-2xl border border-white/10 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h3 className="text-white text-lg font-bold flex items-center gap-2 justify-center sm:justify-start">
            <Zap className="w-5 h-5 text-yellow-400" />
            Daily Challenges
          </h3>
          <span className="text-white/60 text-sm text-center sm:text-right">Resets in 14h 32m</span>
        </div>

        <div className="space-y-3">
          {dailyChallenges.map((challenge) => (
            <div
              key={challenge.id}
              className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 rounded-lg border ${
                challenge.completed
                  ? 'bg-green-400/10 border-green-400/30'
                  : 'bg-zinc-800/50 border-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  challenge.completed ? 'bg-green-400/20' : 'bg-zinc-700'
                }`}>
                  {challenge.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    challenge.icon
                  )}
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{challenge.title}</p>
                  <p className="text-white/60 text-xs">{challenge.description}</p>
                </div>
              </div>
              <div className="text-center sm:text-right">
                <p className={`font-bold text-sm ${
                  challenge.completed ? 'text-green-400' : 'text-primary'
                }`}>
                  +{challenge.xpReward} XP
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-white/10">
          <p className="text-white/80 text-sm text-center">
            Complete all daily challenges for a <span className="text-primary font-bold">+50 XP bonus!</span>
          </p>
        </div>
      </motion.div>

      {/* Badges Collection */}
      <motion.div
        className="bg-zinc-900/90 backdrop-blur rounded-2xl border border-white/10 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
          <Medal className="w-5 h-5 text-yellow-400" />
          Badge Collection
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.map((badge) => (
            <motion.div
              key={badge.id}
              className={`relative p-4 rounded-xl border-2 transition-all ${
                badge.unlocked
                  ? 'border-white/20 bg-gradient-to-br ' + badge.color + ' bg-opacity-20'
                  : 'border-white/5 bg-zinc-800/50 opacity-50'
              }`}
              whileHover={badge.unlocked ? { scale: 1.05 } : {}}
            >
              {badge.unlocked && (
                <div className={`absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getRarityColor(badge.rarity)} text-white`}>
                  {getRarityLabel(badge.rarity)}
                </div>
              )}

              <div className="flex flex-col items-center text-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                  badge.unlocked ? 'bg-white/20' : 'bg-zinc-700'
                }`}>
                  <div className={badge.unlocked ? 'text-white' : 'text-white/30'}>
                    {badge.icon}
                  </div>
                </div>
                <p className={`font-bold text-sm ${badge.unlocked ? 'text-white' : 'text-white/40'}`}>
                  {badge.name}
                </p>
                <p className="text-white/60 text-xs mt-1">{badge.description}</p>
                {badge.unlocked && (
                  <p className="text-primary text-xs font-bold mt-2">+{badge.xpReward} XP</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Achievement Progress */}
      <motion.div
        className="bg-zinc-900/90 backdrop-blur rounded-2xl border border-white/10 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-primary" />
          Achievements
        </h3>

        <div className="space-y-4">
          {achievements.map((achievement) => {
            const progress = (achievement.progress / achievement.total) * 100;
            return (
              <div key={achievement.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center">
                      {achievement.icon}
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{achievement.title}</p>
                      <p className="text-white/60 text-xs">{achievement.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white/80 text-sm">{achievement.progress}/{achievement.total}</p>
                    <p className="text-primary text-xs font-bold">+{achievement.reward} XP</p>
                  </div>
                </div>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-secondary"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Reward Modal */}
      <AnimatePresence>
        {showRewardModal && currentReward && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowRewardModal(false)} />

            <motion.div
              className="relative bg-zinc-900/95 backdrop-blur-xl rounded-2xl border border-white/10 p-8 max-w-md w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="text-center">
                <motion.div
                  className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 0.5 }}
                >
                  <Trophy className="w-10 h-10 text-white" />
                </motion.div>

                <h2 className="text-white text-2xl font-bold mb-2">Achievement Unlocked!</h2>
                <p className="text-white/80 mb-4">{currentReward.name}</p>
                <p className="text-white/60 text-sm mb-6">{currentReward.description}</p>

                <div className="flex items-center justify-center gap-4">
                  <div className="px-4 py-2 bg-primary/20 rounded-lg">
                    <p className="text-primary font-bold">+{currentReward.xp} XP</p>
                  </div>
                </div>

                <button
                  onClick={() => setShowRewardModal(false)}
                  className="mt-6 px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-semibold hover:shadow-lg transition-all"
                >
                  Awesome!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
