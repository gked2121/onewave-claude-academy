/**
 * Single source of truth for all level configurations
 * All components should import and use this config for consistency
 */

export interface LevelConfig {
  id: number;
  title: string;
  shortTitle: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // minutes
  xpReward: number;
  requiredLevel: number | null; // null means no prerequisite
  isFree: boolean;
  tags: string[];
  objectives: string[];
  route: string;
}

export const LEVELS: LevelConfig[] = [
  {
    id: -1,
    title: 'Coding Fundamentals',
    shortTitle: 'Fundamentals',
    description: 'Learn essential concepts before you start: Terminal, GitHub, Vercel, and AI tools',
    difficulty: 'beginner',
    estimatedTime: 10,
    xpReward: 200,
    requiredLevel: null,
    isFree: false,
    tags: ['concepts', 'foundations'],
    objectives: [
      'Understand what a terminal is and why developers use it',
      'Learn about GitHub and version control',
      'Discover deployment with Vercel',
      'Explore AI coding tools vs traditional methods'
    ],
    route: '/level/-1'
  },
  {
    id: 0,
    title: 'Setup Your AI Coding Environment',
    shortTitle: 'Setup Wizard',
    description: 'Install and configure your AI coding assistant to start building projects',
    difficulty: 'beginner',
    estimatedTime: 15,
    xpReward: 300,
    requiredLevel: null,
    isFree: true,
    tags: ['setup', 'installation', 'configuration'],
    objectives: [
      'Choose your character path',
      'Select and install an AI CLI tool',
      'Practice using the terminal',
      'Verify your installation works',
      'Choose your first project'
    ],
    route: '/level/0'
  },
  {
    id: 1,
    title: 'Build Your First AI-Powered Webpage',
    shortTitle: 'First Webpage',
    description: 'Create a complete webpage using AI as your coding partner',
    difficulty: 'beginner',
    estimatedTime: 20,
    xpReward: 400,
    requiredLevel: 0,
    isFree: false,
    tags: ['html', 'css', 'ai-assisted'],
    objectives: [
      'Use AI to generate HTML structure',
      'Style your page with CSS via AI prompts',
      'Add responsive design elements',
      'Deploy your first webpage live'
    ],
    route: '/level/1'
  },
  {
    id: 2,
    title: 'Interactive Components with JavaScript',
    shortTitle: 'Add Interactivity',
    description: 'Make your webpage come alive with JavaScript and user interactions',
    difficulty: 'beginner',
    estimatedTime: 25,
    xpReward: 500,
    requiredLevel: 1,
    isFree: false,
    tags: ['javascript', 'interactivity', 'events'],
    objectives: [
      'Add click handlers and event listeners',
      'Create dynamic content updates',
      'Build a simple interactive feature',
      'Debug JavaScript with AI assistance'
    ],
    route: '/level/2'
  },
  {
    id: 3,
    title: 'Build a Multi-Page Application',
    shortTitle: 'Multi-Page App',
    description: 'Create a complete application with multiple pages and navigation',
    difficulty: 'intermediate',
    estimatedTime: 30,
    xpReward: 600,
    requiredLevel: 2,
    isFree: false,
    tags: ['routing', 'navigation', 'architecture'],
    objectives: [
      'Set up page routing',
      'Create shared navigation components',
      'Manage state across pages',
      'Implement form submissions'
    ],
    route: '/level/3'
  },
  {
    id: 4,
    title: 'Connect to APIs and External Data',
    shortTitle: 'Work with APIs',
    description: 'Fetch and display data from external sources using APIs',
    difficulty: 'intermediate',
    estimatedTime: 35,
    xpReward: 700,
    requiredLevel: 3,
    isFree: false,
    tags: ['apis', 'fetch', 'data', 'async'],
    objectives: [
      'Understand REST APIs',
      'Fetch data with async/await',
      'Display API data in your UI',
      'Handle loading and error states'
    ],
    route: '/level/4'
  },
  {
    id: 5,
    title: 'User Authentication & Protected Routes',
    shortTitle: 'Authentication',
    description: 'Add user login, signup, and protected content to your application',
    difficulty: 'intermediate',
    estimatedTime: 40,
    xpReward: 800,
    requiredLevel: 4,
    isFree: false,
    tags: ['auth', 'security', 'sessions'],
    objectives: [
      'Implement user registration',
      'Create login/logout functionality',
      'Protect routes with authentication',
      'Store user sessions securely'
    ],
    route: '/level/5'
  },
  {
    id: 6,
    title: 'Database Integration & Data Persistence',
    shortTitle: 'Databases',
    description: 'Store and retrieve data from a real database',
    difficulty: 'advanced',
    estimatedTime: 45,
    xpReward: 900,
    requiredLevel: 5,
    isFree: false,
    tags: ['database', 'storage', 'crud'],
    objectives: [
      'Set up a database (Supabase/Firebase)',
      'Create, read, update, delete operations',
      'Design database schemas',
      'Query and filter data efficiently'
    ],
    route: '/level/6'
  },
  {
    id: 7,
    title: 'Advanced UI & Component Libraries',
    shortTitle: 'Advanced UI',
    description: 'Build beautiful, professional interfaces with modern component libraries',
    difficulty: 'advanced',
    estimatedTime: 50,
    xpReward: 1000,
    requiredLevel: 6,
    isFree: false,
    tags: ['ui', 'components', 'design-systems'],
    objectives: [
      'Integrate UI component libraries',
      'Create reusable custom components',
      'Implement advanced animations',
      'Build responsive layouts with Tailwind/CSS-in-JS'
    ],
    route: '/level/7'
  },
  {
    id: 8,
    title: 'Deploy Your Production Application',
    shortTitle: 'Production Deploy',
    description: 'Take your app live with custom domain, analytics, and monitoring',
    difficulty: 'advanced',
    estimatedTime: 60,
    xpReward: 1200,
    requiredLevel: 7,
    isFree: false,
    tags: ['deployment', 'production', 'devops'],
    objectives: [
      'Configure production environment',
      'Set up custom domain',
      'Add analytics and monitoring',
      'Implement CI/CD pipeline',
      'Optimize for performance'
    ],
    route: '/level/8'
  }
];

// Helper functions
export const getLevelById = (id: number): LevelConfig | undefined => {
  return LEVELS.find(level => level.id === id);
};

export const getFreeLevels = (): LevelConfig[] => {
  return LEVELS.filter(level => level.isFree);
};

export const getPaidLevels = (): LevelConfig[] => {
  return LEVELS.filter(level => !level.isFree);
};

export const getNextLevel = (currentId: number): LevelConfig | undefined => {
  return LEVELS.find(level => level.requiredLevel === currentId);
};

export const getTotalXP = (): number => {
  return LEVELS.reduce((sum, level) => sum + level.xpReward, 0);
};

export const getTotalTime = (): number => {
  return LEVELS.reduce((sum, level) => sum + level.estimatedTime, 0);
};

export const isLevelUnlocked = (levelId: number, completedLevels: number[]): boolean => {
  const level = getLevelById(levelId);
  if (!level) return false;

  // Level -1 is always unlocked (fundamentals)
  if (level.id === -1) return true;

  // If no prerequisite, it's unlocked
  if (level.requiredLevel === null) return true;

  // Check if prerequisite is completed
  return completedLevels.includes(level.requiredLevel);
};

export const getLevelProgress = (completedLevels: number[]): {
  completed: number;
  total: number;
  percentage: number;
  totalXP: number;
  earnedXP: number;
} => {
  const completed = completedLevels.length;
  const total = LEVELS.length;
  const percentage = Math.round((completed / total) * 100);
  const totalXP = getTotalXP();
  const earnedXP = LEVELS
    .filter(level => completedLevels.includes(level.id))
    .reduce((sum, level) => sum + level.xpReward, 0);

  return { completed, total, percentage, totalXP, earnedXP };
};