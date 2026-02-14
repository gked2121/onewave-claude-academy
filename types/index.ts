// Core Domain Types
export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Character {
  id: number;
  name: string;
  emoji: string;
  description: string;
  traits: string[];
  color: string;
  unlockLevel: number;
  path: 'prompt-master' | 'business-builder' | 'developer-augmenter';
}

export interface Level {
  id: number;
  title: string;
  description: string;
  category: 'fundamentals' | 'custom-gpts' | 'agents' | 'canvas' | 'connectors' | 'advanced';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // in minutes
  xpReward: number;
  prerequisites: number[];
  isPaid: boolean; // Only Level 0 is free
  content: {
    steps: LevelStep[];
    resources: Resource[];
  };
}

export interface LevelStep {
  id: string;
  title: string;
  description: string;
  type: 'text' | 'interactive' | 'simulator' | 'check';
  content: string;
  validation?: ValidationRule;
}

export interface ValidationRule {
  type: 'text' | 'simulator' | 'api' | 'manual';
  criteria: string;
}

export interface Resource {
  id: string;
  title: string;
  url: string;
  type: 'documentation' | 'tutorial' | 'tool' | 'reference';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
  xpReward: number;
  category: 'progress' | 'skill' | 'special';
  unlockCondition: string;
}

// State Management Types
export interface ProgressState {
  character: number | null;
  unlockedLevels: number[];
  completedLevels: number[];
  currentLevel?: number;
  xp: number;
  plan: Plan;
  achievements: string[];
  license?: string;
  userEmail?: string;
  preferences: UserPreferences;
  customGpts: CustomGPT[]; // User's created GPTs

  // Achievement tracking
  streak: number;
  lastActivityDate?: string;
  perfectValidations: number;
  perfectPrompts: number;
  apiIntegrations: number;
  levelsCompletedToday: number;
  levelsInSession: number;
  nightOwlLevels: number;
  earlyBirdLevels: number;
  sharesCount: number;
  helpedUsers: number;
  secretCodes: string[];
}

export type Plan = 'free' | 'pro';

// Custom GPT Types
export interface CustomGPT {
  id: string;
  name: string;
  description: string;
  instructions: string;
  capabilities: {
    webBrowsing: boolean;
    dalle: boolean;
    codeInterpreter: boolean;
  };
  conversationStarters: string[];
  knowledge: string[];
  actions: GPTAction[];
  createdAt: Date;
  updatedAt: Date;
}

export interface GPTAction {
  id: string;
  name: string;
  description: string;
  schema: any; // OpenAPI schema
}

export interface LearningPath {
  id: string;
  name: string;
  description: string;
  targetAudience: string;
  levels: PathLevel[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface PathLevel {
  id: number;
  title: string;
  description: string;
  category: 'fundamentals' | 'custom-gpts' | 'agents' | 'canvas' | 'connectors' | 'advanced';
  focus: string;
  tools: string[];
  xpReward: number;
  estimatedTime: string;
  isPaid: boolean;
}

export interface UserPreferences {
  theme: 'dark' | 'light' | 'auto';
  visualsEnabled: boolean;
  soundEnabled: boolean;
  language: string;
  notifications: boolean;
}

// API Types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  status: 'success' | 'error';
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  timestamp?: Date;
  id?: string;
}

// Event Types
export interface AppEvent {
  type: string;
  payload?: any;
  timestamp: Date;
}

export interface LevelCompletedEvent extends AppEvent {
  type: 'level_completed';
  payload: {
    levelId: number;
    xpEarned: number;
    timeSpent: number;
  };
}

export interface AchievementUnlockedEvent extends AppEvent {
  type: 'achievement_unlocked';
  payload: {
    achievementId: string;
    xpEarned: number;
  };
}

// Component Props Types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  'data-testid'?: string;
}

export interface ButtonProps extends BaseComponentProps {
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
}

export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}
