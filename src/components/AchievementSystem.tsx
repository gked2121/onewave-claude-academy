"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Zap, Target, Award, Sparkles, Crown, Shield, Gem, Medal, Share2 } from 'lucide-react';
import { useProgress } from '@/context/ProgressContext';
import ShareAchievement from './ShareAchievement';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  category: 'progress' | 'skill' | 'special';
  unlocked: boolean;
  unlockedAt?: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const achievements: Achievement[] = [
  // Beginner Achievements
  {
    id: 'first_steps',
    title: 'First Steps',
    description: 'Complete your first coding challenge',
    icon: '👶',
    xpReward: 100,
    category: 'progress',
    unlocked: false,
    rarity: 'common'
  },
  {
    id: 'terminal_master',
    title: 'Terminal Master',
    description: 'Complete the terminal basics tutorial',
    icon: 'terminal',
    xpReward: 150,
    category: 'progress',
    unlocked: false,
    rarity: 'common'
  },
  {
    id: 'setup_wizard',
    title: 'Setup Wizard',
    description: 'Successfully install and configure your AI CLI',
    icon: 'wrench',
    xpReward: 200,
    category: 'progress',
    unlocked: false,
    rarity: 'common'
  },

  // Skill-based Achievements
  {
    id: 'speed_demon',
    title: 'Speed Demon',
    description: 'Complete a challenge in under 10 minutes',
    icon: 'zap',
    xpReward: 300,
    category: 'skill',
    unlocked: false,
    rarity: 'rare'
  },
  {
    id: 'perfectionist',
    title: 'Perfectionist',
    description: 'Complete a challenge without using hints',
    icon: 'target',
    xpReward: 250,
    category: 'skill',
    unlocked: false,
    rarity: 'common'
  },
  {
    id: 'creative_genius',
    title: 'Creative Genius',
    description: 'Add 3 custom features beyond requirements',
    icon: 'palette',
    xpReward: 400,
    category: 'special',
    unlocked: false,
    rarity: 'epic'
  },
  {
    id: 'ai_whisperer',
    title: 'AI Whisperer',
    description: 'Write 10 perfect prompts that work on first try',
    icon: 'bot',
    xpReward: 500,
    category: 'skill',
    unlocked: false,
    rarity: 'rare'
  },

  // Progress Milestones
  {
    id: 'web_developer',
    title: 'Web Developer',
    description: 'Complete levels 1-3 (Web Development Basics)',
    icon: 'globe',
    xpReward: 400,
    category: 'progress',
    unlocked: false,
    rarity: 'rare'
  },
  {
    id: 'deployment_master',
    title: 'Deployment Master',
    description: 'Successfully deploy your first application',
    icon: 'rocket',
    xpReward: 600,
    category: 'progress',
    unlocked: false,
    rarity: 'rare'
  },
  {
    id: 'full_stack_hero',
    title: 'Full-Stack Hero',
    description: 'Build and deploy a complete application (Level 6)',
    icon: 'layers',
    xpReward: 800,
    category: 'progress',
    unlocked: false,
    rarity: 'epic'
  },
  {
    id: 'ai_integration_expert',
    title: 'AI Integration Expert',
    description: 'Successfully integrate AI APIs into your application',
    icon: 'brain',
    xpReward: 1000,
    category: 'progress',
    unlocked: false,
    rarity: 'epic'
  },

  // Special Achievements
  {
    id: 'early_adopter',
    title: 'Early Adopter',
    description: 'Join Claude Academy in its early days',
    icon: 'star',
    xpReward: 300,
    category: 'special',
    unlocked: false,
    rarity: 'rare'
  },
  {
    id: 'community_helper',
    title: 'Community Helper',
    description: 'Help 5 other developers in the community',
    icon: 'handshake',
    xpReward: 500,
    category: 'special',
    unlocked: false,
    rarity: 'rare'
  },
  {
    id: 'bug_hunter',
    title: 'Bug Hunter',
    description: 'Report and help fix a bug in the platform',
    icon: 'bug',
    xpReward: 750,
    category: 'special',
    unlocked: false,
    rarity: 'epic'
  },
  {
    id: 'portfolio_star',
    title: 'Portfolio Star',
    description: 'Create a portfolio that gets 100+ views',
    icon: 'medal',
    xpReward: 600,
    category: 'special',
    unlocked: false,
    rarity: 'rare'
  },
  {
    id: 'first_project_launch',
    title: 'Project Pioneer',
    description: 'Complete your first personalized project milestone',
    icon: 'target',
    xpReward: 400,
    category: 'special',
    unlocked: false,
    rarity: 'rare'
  },

  // Character-specific Achievements
  {
    id: 'business_builder_mvp',
    title: 'MVP Builder',
    description: 'Launch your first Minimum Viable Product',
    icon: 'briefcase',
    xpReward: 800,
    category: 'special',
    unlocked: false,
    rarity: 'epic'
  },
  {
    id: 'tech_engineer_pro',
    title: 'Technical Excellence',
    description: 'Write production-quality code with 100% test coverage',
    icon: 'microscope',
    xpReward: 900,
    category: 'special',
    unlocked: false,
    rarity: 'epic'
  },
  {
    id: 'hybrid_leader',
    title: 'Tech-Business Bridge',
    description: 'Successfully bridge technical and business requirements',
    icon: 'bridge',
    xpReward: 850,
    category: 'special',
    unlocked: false,
    rarity: 'epic'
  },

  // Master Level Achievements
  {
    id: 'devops_master',
    title: 'DevOps Master',
    description: 'Set up complete CI/CD pipeline with monitoring',
    icon: 'tools',
    xpReward: 1200,
    category: 'progress',
    unlocked: false,
    rarity: 'legendary'
  },
  {
    id: 'ai_developer_pro',
    title: 'Professional AI Developer',
    description: 'Complete all 9 levels of the quest',
    icon: 'award',
    xpReward: 1500,
    category: 'progress',
    unlocked: false,
    rarity: 'legendary'
  },
  {
    id: 'claude_academy_legend',
    title: 'Claude Academy Legend',
    description: 'Master all tracks and achieve ultimate status',
    icon: 'crown',
    xpReward: 2000,
    category: 'special',
    unlocked: false,
    rarity: 'legendary'
  }
];

interface AchievementSystemProps {
  onAchievementUnlocked?: (achievement: Achievement) => void;
  userProgress?: {
    completedLevels: number[];
    xp: number;
    character: number | null;
    selectedAiCli: string | null;
  };
}

export default function AchievementSystem({ onAchievementUnlocked }: { onAchievementUnlocked?: (achievement: Achievement) => void }) {
  const progress = useProgress();
  const [userAchievements, setUserAchievements] = useState<Achievement[]>(achievements);
  const [showNotification, setShowNotification] = useState<Achievement | null>(null);
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [shareAchievement, setShareAchievement] = useState<Achievement | null>(null);

  // Check for achievements based on user progress
  useEffect(() => {
    const { completedLevels, xp, character, selectedAiCli, project } = progress;

    // Auto-unlock achievements based on progress
    if (completedLevels.length >= 1 && !userAchievements.find(a => a.id === 'first_steps')?.unlocked) {
      unlockAchievement('first_steps');
    }

    if (completedLevels.includes(0) && !userAchievements.find(a => a.id === 'setup_wizard')?.unlocked) {
      unlockAchievement('setup_wizard');
    }

    // Web developer milestone (levels 1-3)
    if ([1, 2, 3].every(level => completedLevels.includes(level)) &&
        !userAchievements.find(a => a.id === 'web_developer')?.unlocked) {
      unlockAchievement('web_developer');
    }

    // Deployment master (level 4)
    if (completedLevels.includes(4) && !userAchievements.find(a => a.id === 'deployment_master')?.unlocked) {
      unlockAchievement('deployment_master');
    }

    // Full-stack hero (level 6)
    if (completedLevels.includes(6) && !userAchievements.find(a => a.id === 'full_stack_hero')?.unlocked) {
      unlockAchievement('full_stack_hero');
    }

    // AI integration expert (level 7)
    if (completedLevels.includes(7) && !userAchievements.find(a => a.id === 'ai_integration_expert')?.unlocked) {
      unlockAchievement('ai_integration_expert');
    }

    // DevOps master (level 8)
    if (completedLevels.includes(8) && !userAchievements.find(a => a.id === 'devops_master')?.unlocked) {
      unlockAchievement('devops_master');
    }

    // Professional AI Developer (all levels)
    if ([0, 1, 2, 3, 4, 5, 6, 7, 8].every(level => completedLevels.includes(level)) &&
        !userAchievements.find(a => a.id === 'ai_developer_pro')?.unlocked) {
      unlockAchievement('ai_developer_pro');
    }

    // Character-specific achievements
    if (character === 1 && completedLevels.includes(6) &&
        !userAchievements.find(a => a.id === 'business_builder_mvp')?.unlocked) {
      unlockAchievement('business_builder_mvp');
    }

    if (character === 2 && completedLevels.includes(8) &&
        !userAchievements.find(a => a.id === 'tech_engineer_pro')?.unlocked) {
      unlockAchievement('tech_engineer_pro');
    }

    if (character === 3 && completedLevels.includes(7) &&
        !userAchievements.find(a => a.id === 'hybrid_leader')?.unlocked) {
      unlockAchievement('hybrid_leader');
    }

    // Project-specific achievement
    if (project && completedLevels.includes(1) &&
        !userAchievements.find(a => a.id === 'first_project_launch')?.unlocked) {
      unlockAchievement('first_project_launch');
    }

    // Early adopter (if they joined in 2025)
    const joinDate = new Date().getFullYear();
    if (joinDate === 2025 && !userAchievements.find(a => a.id === 'early_adopter')?.unlocked) {
      unlockAchievement('early_adopter');
    }

  }, [progress, userAchievements]);

  const unlockAchievement = (achievementId: string) => {
    setUserAchievements(prev => {
      const updated = prev.map(achievement => {
        if (achievement.id === achievementId && !achievement.unlocked) {
          const unlockedAchievement = {
            ...achievement,
            unlocked: true,
            unlockedAt: new Date()
          };

          // Show notification
          setShowNotification(unlockedAchievement);
          setTimeout(() => setShowNotification(null), 4000);

          // Callback for parent component
          onAchievementUnlocked?.(unlockedAchievement);

          return unlockedAchievement;
        }
        return achievement;
      });
      return updated;
    });
  };

  const getRarityColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-yellow-400 to-orange-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getRarityTextColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common': return 'text-gray-300';
      case 'rare': return 'text-blue-300';
      case 'epic': return 'text-purple-300';
      case 'legendary': return 'text-yellow-300';
      default: return 'text-gray-300';
    }
  };

  const filteredAchievements = userAchievements.filter(achievement => {
    if (filter === 'unlocked') return achievement.unlocked;
    if (filter === 'locked') return !achievement.unlocked;
    return true;
  });

  const unlockedCount = userAchievements.filter(a => a.unlocked).length;
  const totalXP = userAchievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.xpReward, 0);

  return (
    <>
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20 border border-purple-500/20 backdrop-blur-xl mb-8">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-yellow-400/5 via-purple-500/5 to-blue-500/5 rounded-2xl"></div>
          <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-yellow-400/10 to-purple-500/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-4 left-4 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full blur-xl"></div>
        </div>

        <div className="relative p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-6 text-center md:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30">
                <Trophy className="w-8 h-8 text-yellow-400" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white flex items-center gap-2">
                  Achievement Gallery
                  <Crown className="w-6 h-6 text-yellow-400" />
                </h2>
                <p className="text-white/70">Showcase your Claude ecosystem mastery</p>
                {progress.project && (
                  <p className="text-sm text-emerald-300 mt-1">Building: {progress.project.name}</p>
                )}
              </div>
            </div>
            <div className="text-center md:text-right">
              <div className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                {unlockedCount}/{userAchievements.length}
              </div>
              <div className="text-sm text-white/60">Unlocked</div>
            </div>
          </div>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl p-4 border border-yellow-500/20 text-center">
              <div className="text-2xl font-bold text-yellow-400 mb-1">{totalXP}</div>
              <div className="text-xs text-white/60">Achievement XP</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-xl p-4 border border-blue-500/20 text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">
                {userAchievements.filter(a => a.unlocked && a.rarity === 'rare').length}
              </div>
              <div className="text-xs text-white/60 flex items-center justify-center gap-1">
                <Gem className="w-3 h-3" />
                Rare Unlocked
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-purple-500/20 text-center">
              <div className="text-2xl font-bold text-purple-400 mb-1">
                {userAchievements.filter(a => a.unlocked && (a.rarity === 'epic' || a.rarity === 'legendary')).length}
              </div>
              <div className="text-xs text-white/60 flex items-center justify-center gap-1">
                <Shield className="w-3 h-3" />
                Epic+ Unlocked
              </div>
            </div>
            <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-xl p-4 border border-emerald-500/20 text-center">
              <div className="text-2xl font-bold text-emerald-400 mb-1">
                {Math.round((unlockedCount / userAchievements.length) * 100)}%
              </div>
              <div className="text-xs text-white/60 flex items-center justify-center gap-1">
                <Medal className="w-3 h-3" />
                Complete
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6">

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          {['all', 'unlocked', 'locked'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType as any)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                filter === filterType
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/10 text-gray-400 hover:text-white'
              }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>

        {/* Achievement Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              className={`relative p-4 rounded-xl border transition-all ${
                achievement.unlocked
                  ? 'bg-gradient-to-br from-white/10 to-white/5 border-purple-400/30'
                  : 'bg-white/5 border-white/10 opacity-60'
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={achievement.unlocked ? { scale: 1.02 } : {}}
            >
              {/* Rarity Indicator */}
              <div className={`absolute top-2 right-2 w-3 h-3 rounded-full bg-gradient-to-r ${getRarityColor(achievement.rarity)}`} />

              {/* Achievement Icon */}
              <div className="text-center mb-3">
                <div className={`text-4xl mb-2 ${achievement.unlocked ? '' : 'grayscale'}`}>
                  {achievement.icon}
                </div>
                <h3 className={`font-bold ${achievement.unlocked ? 'text-slate-800' : 'text-slate-500'}`}>
                  {achievement.title}
                </h3>
              </div>

              {/* Description */}
              <p className={`text-sm text-center mb-3 ${
                achievement.unlocked ? 'text-gray-300' : 'text-gray-500'
              }`}>
                {achievement.description}
              </p>

              {/* Rarity and XP */}
              <div className="flex justify-between items-center text-xs">
                <span className={`font-medium ${getRarityTextColor(achievement.rarity)}`}>
                  {achievement.rarity.toUpperCase()}
                </span>
                <span className={`flex items-center gap-1 ${
                  achievement.unlocked ? 'text-yellow-400' : 'text-gray-500'
                }`}>
                  <Star className="w-3 h-3" />
                  {achievement.xpReward} XP
                </span>
              </div>

              {/* Unlock Date & Share Button */}
              {achievement.unlocked && (
                <div className="mt-3 flex flex-col gap-2">
                  {achievement.unlockedAt && (
                    <div className="text-xs text-gray-400 text-center">
                      Unlocked {achievement.unlockedAt.toLocaleDateString()}
                    </div>
                  )}
                  <button
                    onClick={() => setShareAchievement(achievement)}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    Share Achievement
                  </button>
                </div>
              )}

              {/* Unlocked Effect */}
              {achievement.unlocked && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.5, 0] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-xl" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Achievement Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            className="fixed top-4 right-4 z-50"
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-xl shadow-2xl border border-purple-400/30 max-w-sm">
              <div className="flex items-center gap-3 mb-2">
                <Trophy className="w-6 h-6 text-yellow-300" />
                <h3 className="font-bold text-white">Achievement Unlocked!</h3>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="text-3xl">{showNotification.icon}</div>
                <div>
                  <h4 className="font-semibold text-white">{showNotification.title}</h4>
                  <p className="text-purple-100 text-sm">{showNotification.description}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Sparkles className="w-3 h-3 text-yellow-300" />
                    <span className="text-yellow-300 text-sm font-medium">+{showNotification.xpReward} XP</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  setShareAchievement(showNotification);
                  setShowNotification(null);
                }}
                className="w-full bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Modal */}
      {shareAchievement && (
        <ShareAchievement
          achievement={shareAchievement}
          onClose={() => setShareAchievement(null)}
        />
      )}
    </>
  );
}
