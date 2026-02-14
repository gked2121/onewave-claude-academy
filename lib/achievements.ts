export interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
  xp: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  condition: (progress: any) => boolean;
  secret?: boolean;
}

export const achievements: Achievement[] = [
  // Beginner Achievements
  {
    id: 'first_steps',
    title: 'First Steps',
    description: 'Finish your first task. The journey begins.',
    emoji: '👣',
    xp: 25,
    rarity: 'common',
    condition: (p) => p.completedLevels.length >= 1
  },
  {
    id: 'quick_learner',
    title: 'Quick Learner',
    description: 'Blaze through Level 0 in under 15 minutes.',
    emoji: '⚡',
    xp: 50,
    rarity: 'rare',
    condition: (p) => p.completedLevels.includes(0) && p.timeSpent <= 15
  },
  {
    id: 'perfect_prompt',
    title: 'Perfect Prompt',
    description: 'Nail every validation check on the first try.',
    emoji: '🎯',
    xp: 100,
    rarity: 'epic',
    condition: (p) => p.perfectValidations >= 1
  },

  // Progress Achievements
  {
    id: 'rising_star',
    title: 'Rising Star',
    description: 'Hit 500 XP. You\'re not a beginner anymore.',
    emoji: '⭐',
    xp: 75,
    rarity: 'rare',
    condition: (p) => p.xp >= 500
  },
  {
    id: 'master_wizard',
    title: 'Master Wizard',
    description: 'All 10 levels. Complete. You\'re the real deal.',
    emoji: '🧙‍♂️',
    xp: 500,
    rarity: 'legendary',
    condition: (p) => p.completedLevels.length === 10
  },
  {
    id: 'halfway_there',
    title: 'Halfway There',
    description: 'Five down, five to go. No stopping now.',
    emoji: '🏃',
    xp: 150,
    rarity: 'rare',
    condition: (p) => p.completedLevels.length >= 5
  },

  // Streak Achievements
  {
    id: 'on_fire',
    title: 'On Fire!',
    description: 'Three days straight. Momentum is real.',
    emoji: '🔥',
    xp: 100,
    rarity: 'rare',
    condition: (p) => p.streak >= 3
  },
  {
    id: 'unstoppable',
    title: 'Unstoppable',
    description: 'A full week without breaking stride.',
    emoji: '💪',
    xp: 250,
    rarity: 'epic',
    condition: (p) => p.streak >= 7
  },
  {
    id: 'legendary_streak',
    title: 'Legendary Streak',
    description: '30 days. This is who you are now.',
    emoji: '👑',
    xp: 1000,
    rarity: 'legendary',
    condition: (p) => p.streak >= 30
  },

  // Skill Achievements
  {
    id: 'prompt_master',
    title: 'Prompt Master',
    description: '10 perfect prompts. You\'ve got the touch.',
    emoji: '📝',
    xp: 200,
    rarity: 'epic',
    condition: (p) => p.perfectPrompts >= 10
  },
  {
    id: 'gpt_builder',
    title: 'GPT Builder',
    description: 'Built your first Custom GPT. Creator mode unlocked.',
    emoji: '🏗️',
    xp: 300,
    rarity: 'epic',
    condition: (p) => p.customGpts?.length >= 1
  },
  {
    id: 'api_wizard',
    title: 'API Wizard',
    description: 'Three API integrations. You speak machine.',
    emoji: '🔌',
    xp: 350,
    rarity: 'epic',
    condition: (p) => p.apiIntegrations >= 3
  },

  // Speed Achievements
  {
    id: 'speedrunner',
    title: 'Speedrunner',
    description: 'Three levels in one day. Someone\'s hungry.',
    emoji: '🏃‍♂️',
    xp: 200,
    rarity: 'rare',
    condition: (p) => p.levelsCompletedToday >= 3
  },
  {
    id: 'marathon_runner',
    title: 'Marathon Runner',
    description: 'Five levels in one sitting. Respect.',
    emoji: '🏃‍♀️',
    xp: 400,
    rarity: 'epic',
    condition: (p) => p.levelsInSession >= 5
  },

  // Secret Achievements
  {
    id: 'konami_code',
    title: 'Secret Code',
    description: 'You found it. We knew you would.',
    emoji: '🎮',
    xp: 500,
    rarity: 'legendary',
    secret: true,
    condition: (p) => p.secretCodes?.includes('konami')
  },
  {
    id: 'night_owl',
    title: 'Night Owl',
    description: 'Finishing levels at 2am. Dedication or insomnia?',
    emoji: '🦉',
    xp: 100,
    rarity: 'rare',
    secret: true,
    condition: (p) => p.nightOwlLevels >= 1
  },
  {
    id: 'early_bird',
    title: 'Early Bird',
    description: 'Before 7am. The quiet hours hit different.',
    emoji: '🐦',
    xp: 100,
    rarity: 'rare',
    secret: true,
    condition: (p) => p.earlyBirdLevels >= 1
  },

  // Social Achievements
  {
    id: 'influencer',
    title: 'Influencer',
    description: 'Shared your progress 5 times. Spreading the word.',
    emoji: '📱',
    xp: 150,
    rarity: 'rare',
    condition: (p) => p.sharesCount >= 5
  },
  {
    id: 'teacher',
    title: 'Teacher',
    description: 'Helped 3 other learners. Knowledge multiplied.',
    emoji: '👨‍🏫',
    xp: 200,
    rarity: 'epic',
    condition: (p) => p.helpedUsers >= 3
  },
];

export const getRarityColor = (rarity: Achievement['rarity']) => {
  switch (rarity) {
    case 'common': return 'from-gray-400 to-gray-500';
    case 'rare': return 'from-blue-400 to-cyan-500';
    case 'epic': return 'from-teal-400 to-cyan-500';
    case 'legendary': return 'from-yellow-400 to-orange-500';
  }
};

export const getRarityGlow = (rarity: Achievement['rarity']) => {
  switch (rarity) {
    case 'common': return 'shadow-gray-500/50';
    case 'rare': return 'shadow-blue-500/50';
    case 'epic': return 'shadow-teal-500/50';
    case 'legendary': return 'shadow-yellow-500/50';
  }
};
