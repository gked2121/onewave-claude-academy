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
}

export interface Level {
  id: number;
  title: string;
  description: string;
  category: 'setup' | 'coding' | 'deployment' | 'bonus';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // in minutes
  xpReward: number;
  prerequisites: number[];
  content: {
    steps: LevelStep[];
    resources: Resource[];
  };
}

export interface LevelStep {
  id: string;
  title: string;
  description: string;
  type: 'text' | 'code' | 'terminal' | 'check';
  content: string;
  validation?: ValidationRule;
}

export interface ValidationRule {
  type: 'command' | 'file' | 'api' | 'manual';
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
  selectedAiCli?: AiCliType;
  learningPath?: string; // Derived from selectedAiCli
  project?: UserProject; // New: User's custom project
}

export type Plan = 'free' | 'full' | 'pro';

export type AiCliType = 'claude' | 'codex' | null;

// Project Types
export interface UserProject {
  id: string;
  name: string;
  description: string;
  template?: 'portfolio' | 'recipe-app' | 'blog' | 'creative-showcase' | 'dashboard' | 'landing-page' | 'custom';
  customIdea?: string;
  audience: 'personal' | 'friends' | 'professional' | 'public';
  timeline: 'weekend' | 'week' | 'month' | 'no-rush';
  features: string[];
  aiValidation?: {
    isValid: boolean;
    suggestions: string[];
    complexity: 'beginner' | 'intermediate' | 'advanced';
    estimatedTime: string;
    features: string[];
  };
  createdAt: Date;
  progress?: {
    completedFeatures: string[];
    currentPhase: 'planning' | 'building' | 'testing' | 'deploying' | 'completed';
    milestones: ProjectMilestone[];
  };
}

export interface ProjectMilestone {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  completedAt?: Date;
  level?: number; // Associated learning level
}

export interface LearningPath {
  id: AiCliType;
  name: string;
  description: string;
  targetAudience: string;
  levels: PathLevel[];
  cost: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface PathLevel {
  id: number;
  title: string;
  description: string;
  category: 'setup' | 'coding' | 'deployment' | 'optimization';
  focus: string; // What this level teaches specific to the path
  tools: string[]; // CLI-specific tools used
  xpReward: number;
  estimatedTime: string;
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

export interface AIResponse {
  content: string;
  model: string;
  tokens: number;
  timestamp: Date;
}

// Form Types
export interface FormValidationResult {
  isValid: boolean;
  errors: Record<string, string[]>;
}

export interface FormFieldConfig {
  name: string;
  type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox';
  label: string;
  placeholder?: string;
  required?: boolean;
  validation?: FormValidation[];
  options?: Array<{ value: string; label: string }>;
}

export interface FormValidation {
  type: 'required' | 'email' | 'minLength' | 'maxLength' | 'pattern' | 'custom';
  value?: any;
  message: string;
  validator?: (value: any) => boolean;
}

// UI Component Types
export interface ComponentVariant {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface LoadingState {
  isLoading: boolean;
  error?: string | null;
  data?: any;
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

// Utility Types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Component Props Types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  'data-testid'?: string;
}

export interface ButtonProps extends BaseComponentProps, ComponentVariant {
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}

export interface InputProps extends BaseComponentProps {
  name: string;
  type?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  error?: string;
}

export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}