// =====================================================
// OneWave Claude Academy - Type Definitions
// =====================================================

// Learning Track Types
export interface LearningTrack {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedHours: number;
  orderIndex: number;
  isActive?: boolean;
  isFree?: boolean;
  prerequisites: string[];
  totalLevels?: number;
  totalXp?: number;
}

export interface TrackLevel {
  id: string;
  trackId: string;
  levelNumber: number;
  title: string;
  description: string;
  content: LevelContent;
  xpReward: number;
  estimatedMinutes: number;
  isFree: boolean;
  requiresVerification: boolean;
}

export interface LevelContent {
  type: 'lesson' | 'quiz' | 'exercise' | 'project';
  sections: ContentSection[];
  quiz?: Quiz;
  exercise?: Exercise;
}

export interface ContentSection {
  id: string;
  type: 'text' | 'code' | 'video' | 'interactive' | 'tip' | 'warning' | 'image';
  title?: string;
  content: string;
  language?: string; // For code blocks
  imageSrc?: string; // For image sections - path relative to /public
  imageAlt?: string; // Alt text for images
  metadata?: Record<string, unknown>;
}

export interface Quiz {
  questions: QuizQuestion[];
  passingScore: number;
  allowRetry: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'code-completion';
  options?: string[];
  correctAnswer: string | number;
  explanation?: string;
  points: number;
}

export interface Exercise {
  type: 'prompt' | 'code' | 'build' | 'upload';
  instructions: string;
  starterCode?: string;
  solution?: string;
  hints: string[];
  validationCriteria?: string[];
}

// User Progress Types
export interface UserTrackProgress {
  id: string;
  userId: string;
  trackId: string;
  currentLevel: number;
  completedLevels: number[];
  quizScores: Record<number, number>;
  startedAt: string;
  completedAt?: string;
  lastActivity: string;
}

export interface UserProgress {
  xp: number;
  level: number;
  streak: number;
  badges: string[];
  achievements: string[];
  plan: 'free' | 'individual' | 'team' | 'enterprise';
  trackProgress: Record<string, UserTrackProgress>;
}

// Achievement Types
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  xpReward: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  requirementType: string;
  requirementValue: number;
  category: string;
  trackId?: string;
  unlockedAt?: string;
}

// Organization Types
export interface Organization {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  adminUserId: string;
  plan: 'team' | 'enterprise';
  maxSeats: number;
  settings: Record<string, unknown>;
}

export interface OrganizationMember {
  id: string;
  orgId: string;
  userId: string;
  role: 'admin' | 'manager' | 'member';
  department?: string;
  joinedAt: string;
  user?: {
    username: string;
    avatarUrl?: string;
    xp: number;
    level: number;
  };
}

// Certification Types
export interface Certification {
  id: string;
  userId: string;
  trackId: string;
  level: 'associate' | 'professional' | 'expert';
  score?: number;
  certificateNumber: string;
  certificateUrl?: string;
  issuedAt: string;
  expiresAt?: string;
}

// Daily Challenge Types
export interface DailyChallenge {
  id: string;
  date: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
  trackId?: string;
  challengeType: 'prompt' | 'code' | 'quiz' | 'build';
  challengeData: Record<string, unknown>;
  hints: string[];
  tags: string[];
}

// Leaderboard Types
export interface LeaderboardEntry {
  id: string;
  username: string;
  avatarUrl?: string;
  xp: number;
  level: number;
  streak: number;
  badgeCount: number;
  rank: number;
}

// Track metadata for display
export const TRACK_ICONS: Record<string, string> = {
  'claude-chat': 'MessageCircle',
  'claude-code': 'Terminal',
  'mcp-development': 'Plug',
  'anthropic-api': 'Code',
  'claude-enterprise': 'Building',
  'claude-skills': 'Zap',
  'claude-workspace': 'LayoutDashboard',
  'ai-strategy': 'Target',
};

export const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: 'text-green-500',
  intermediate: 'text-yellow-500',
  advanced: 'text-red-500',
};

export const RARITY_COLORS: Record<string, string> = {
  common: 'text-gray-400',
  rare: 'text-blue-400',
  epic: 'text-purple-400',
  legendary: 'text-yellow-400',
};

// =====================================================
// Role-Based Learning Paths
// =====================================================

export type PathTier = 'non-technical' | 'hybrid' | 'technical';

export interface RolePath {
  id: string;
  slug: string;
  tier: PathTier;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  color: string;
  accentColor: string;
  exampleRoles: string[];
  departments: string[];
  trackSequence: PathTrackEntry[];
  estimatedHours: number;
  totalLevels: number;
}

export interface PathTrackEntry {
  trackSlug: string;
  label: string;
  description: string;
  selectedLevels?: number[];
  isCore: boolean;
}
