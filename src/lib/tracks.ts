// Track data loader - imports and exports track content
import { LearningTrack, TrackLevel } from '@/lib/types';
import { claudeChatLevels, CLAUDE_CHAT_TRACK_ID, CLAUDE_CHAT_COLOR } from '@/content/tracks/claude-chat';
import { claudeCodeLevels, CLAUDE_CODE_TRACK_ID, CLAUDE_CODE_COLOR } from '@/content/tracks/claude-code';
import { mcpDevelopmentLevels, MCP_DEVELOPMENT_TRACK_ID, MCP_DEVELOPMENT_COLOR } from '@/content/tracks/mcp-development';
import { anthropicApiLevels, ANTHROPIC_API_TRACK_ID, ANTHROPIC_API_COLOR } from '@/content/tracks/anthropic-api';
import { claudeEnterpriseLevels, CLAUDE_ENTERPRISE_TRACK_ID, CLAUDE_ENTERPRISE_COLOR } from '@/content/tracks/claude-enterprise';
import { claudeSkillsLevels, CLAUDE_SKILLS_TRACK_ID, CLAUDE_SKILLS_COLOR } from '@/content/tracks/claude-skills';
import { claudeWorkspaceLevels, CLAUDE_WORKSPACE_TRACK_ID, CLAUDE_WORKSPACE_COLOR } from '@/content/tracks/claude-workspace';
import { aiStrategyLevels, AI_STRATEGY_TRACK_ID, AI_STRATEGY_COLOR } from '@/content/tracks/ai-strategy';

// Track definitions
export const TRACKS: LearningTrack[] = [
  {
    id: 'claude-chat',
    slug: 'claude-chat',
    name: 'Claude Chat Fundamentals',
    description: 'Master prompting, Projects, Artifacts, and conversation techniques with Claude',
    icon: 'message-circle',
    difficulty: 'beginner',
    estimatedHours: 4,
    orderIndex: 1,
    color: CLAUDE_CHAT_COLOR,
    totalLevels: 8,
    totalXp: 1200,
    isFree: true,
    prerequisites: [],
  },
  {
    id: 'claude-code',
    slug: 'claude-code',
    name: 'Claude Code Mastery',
    description: 'CLI installation, hooks, skills, and IDE integrations for developers',
    icon: 'terminal',
    difficulty: 'intermediate',
    estimatedHours: 9,
    orderIndex: 2,
    color: '#2563EB',
    totalLevels: 14,
    totalXp: 2900,
    isFree: false,
    prerequisites: ['claude-chat'],
  },
  {
    id: 'mcp-development',
    slug: 'mcp-development',
    name: 'MCP Development',
    description: 'Build custom Model Context Protocol servers and integrations',
    icon: 'plug',
    difficulty: 'advanced',
    estimatedHours: 10,
    orderIndex: 3,
    color: '#0891B2',
    totalLevels: 10,
    totalXp: 2000,
    isFree: false,
    prerequisites: ['claude-code'],
  },
  {
    id: 'anthropic-api',
    slug: 'anthropic-api',
    name: 'Anthropic API',
    description: 'Build AI applications with streaming, tools, and batch processing',
    icon: 'code',
    difficulty: 'intermediate',
    estimatedHours: 8,
    orderIndex: 4,
    color: '#22C55E',
    totalLevels: 10,
    totalXp: 2000,
    isFree: false,
    prerequisites: ['claude-chat'],
  },
  {
    id: 'claude-enterprise',
    slug: 'claude-enterprise',
    name: 'Claude Enterprise',
    description: 'SSO, SCIM, Slack integration, and team management at scale',
    icon: 'building',
    difficulty: 'intermediate',
    estimatedHours: 6,
    orderIndex: 5,
    color: '#F59E0B',
    totalLevels: 8,
    totalXp: 1600,
    isFree: false,
    prerequisites: ['claude-chat'],
  },
  {
    id: 'claude-skills',
    slug: 'claude-skills',
    name: 'Claude Skills',
    description: 'Create custom automations with SKILL.md and the marketplace',
    icon: 'zap',
    difficulty: 'intermediate',
    estimatedHours: 4,
    orderIndex: 6,
    color: '#EC4899',
    totalLevels: 5,
    totalXp: 1000,
    isFree: false,
    prerequisites: ['claude-code'],
  },
  {
    id: 'claude-workspace',
    slug: 'claude-workspace',
    name: 'Claude Workspace',
    description: 'Master Cowork, Connectors, Styles, Plugins, and the Surfaces decision framework',
    icon: 'layout-dashboard',
    difficulty: 'beginner',
    estimatedHours: 5,
    orderIndex: 7,
    color: CLAUDE_WORKSPACE_COLOR,
    totalLevels: 8,
    totalXp: 1550,
    isFree: false,
    prerequisites: ['claude-chat'],
  },
  {
    id: 'ai-strategy',
    slug: 'ai-strategy',
    name: 'AI Strategy & Fluency',
    description: 'Strategic AI adoption frameworks, model selection, and productivity optimization for leaders',
    icon: 'target',
    difficulty: 'intermediate',
    estimatedHours: 4,
    orderIndex: 8,
    color: AI_STRATEGY_COLOR,
    totalLevels: 5,
    totalXp: 1100,
    isFree: false,
    prerequisites: ['claude-chat'],
  },
];

// Map of track slug to level content
const TRACK_LEVELS: Record<string, Omit<TrackLevel, 'id' | 'trackId'>[]> = {
  'claude-chat': claudeChatLevels,
  'claude-code': claudeCodeLevels,
  'mcp-development': mcpDevelopmentLevels,
  'anthropic-api': anthropicApiLevels,
  'claude-enterprise': claudeEnterpriseLevels,
  'claude-skills': claudeSkillsLevels,
  'claude-workspace': claudeWorkspaceLevels,
  'ai-strategy': aiStrategyLevels,
};

/**
 * Get all available tracks
 */
export function getAllTracks(): LearningTrack[] {
  return TRACKS.sort((a, b) => a.orderIndex - b.orderIndex);
}

/**
 * Get a specific track by slug
 */
export function getTrack(slug: string): LearningTrack | undefined {
  return TRACKS.find(track => track.slug === slug);
}

/**
 * Get all levels for a track
 */
export function getTrackLevels(trackSlug: string): Omit<TrackLevel, 'id' | 'trackId'>[] {
  return TRACK_LEVELS[trackSlug] || [];
}

/**
 * Get a specific level from a track
 */
export function getTrackLevel(trackSlug: string, levelNumber: number): Omit<TrackLevel, 'id' | 'trackId'> | undefined {
  const levels = TRACK_LEVELS[trackSlug];
  if (!levels) return undefined;
  return levels.find(level => level.levelNumber === levelNumber);
}

/**
 * Get the next level in a track
 */
export function getNextLevel(trackSlug: string, currentLevel: number): number | null {
  const levels = TRACK_LEVELS[trackSlug];
  if (!levels) return null;

  const nextLevelNumber = currentLevel + 1;
  const nextLevel = levels.find(l => l.levelNumber === nextLevelNumber);
  return nextLevel ? nextLevelNumber : null;
}

/**
 * Check if a track has any content
 */
export function trackHasContent(trackSlug: string): boolean {
  const levels = TRACK_LEVELS[trackSlug];
  return levels && levels.length > 0;
}

/**
 * Get recommended tracks based on user profile
 */
export function getRecommendedTracks(profile: {
  department?: string;
  role?: string;
  experienceLevel?: string;
}): { track: LearningTrack; reason: string; priority: 'primary' | 'secondary' | 'optional' }[] {
  const recommendations: { track: LearningTrack; reason: string; priority: 'primary' | 'secondary' | 'optional' }[] = [];

  const allTracks = getAllTracks();

  // Everyone starts with Claude Chat
  const chatTrack = allTracks.find(t => t.slug === 'claude-chat');
  if (chatTrack) {
    recommendations.push({
      track: chatTrack,
      reason: 'Foundation for all users',
      priority: 'primary'
    });
  }

  // Claude Workspace is recommended for all users
  const workspaceTrack = allTracks.find(t => t.slug === 'claude-workspace');
  if (workspaceTrack) {
    recommendations.push({
      track: workspaceTrack,
      reason: 'Master Cowork, Connectors, and platform features',
      priority: 'secondary'
    });
  }

  // Role-based recommendations
  const { department, role, experienceLevel } = profile;

  // Engineering/Development
  if (department === 'engineering' || role?.toLowerCase().includes('developer') || role?.toLowerCase().includes('engineer')) {
    const codeTrack = allTracks.find(t => t.slug === 'claude-code');
    const apiTrack = allTracks.find(t => t.slug === 'anthropic-api');
    const mcpTrack = allTracks.find(t => t.slug === 'mcp-development');

    if (codeTrack) recommendations.push({ track: codeTrack, reason: 'Essential for developers', priority: 'primary' });
    if (apiTrack) recommendations.push({ track: apiTrack, reason: 'Build AI-powered applications', priority: 'secondary' });
    if (mcpTrack && experienceLevel === 'advanced') {
      recommendations.push({ track: mcpTrack, reason: 'Create custom integrations', priority: 'secondary' });
    }
  }

  // IT/Admin
  if (department === 'it' || role?.toLowerCase().includes('admin') || role?.toLowerCase().includes('it')) {
    const enterpriseTrack = allTracks.find(t => t.slug === 'claude-enterprise');
    if (enterpriseTrack) {
      recommendations.push({ track: enterpriseTrack, reason: 'Manage Claude at scale', priority: 'primary' });
    }
  }

  // Management/Executive
  if (role?.toLowerCase().includes('manager') || role?.toLowerCase().includes('director') || role?.toLowerCase().includes('exec') || role?.toLowerCase().includes('ceo') || role?.toLowerCase().includes('cto')) {
    const enterpriseTrack = allTracks.find(t => t.slug === 'claude-enterprise');
    if (enterpriseTrack) {
      recommendations.push({ track: enterpriseTrack, reason: 'Deploy Claude across your organization', priority: 'secondary' });
    }
    const strategyTrack = allTracks.find(t => t.slug === 'ai-strategy');
    if (strategyTrack) {
      recommendations.push({ track: strategyTrack, reason: 'Strategic AI adoption and productivity frameworks', priority: 'primary' });
    }
  }

  // Skills track for automation-focused roles
  if (role?.toLowerCase().includes('ops') || role?.toLowerCase().includes('automation') || department === 'operations') {
    const skillsTrack = allTracks.find(t => t.slug === 'claude-skills');
    if (skillsTrack) {
      recommendations.push({ track: skillsTrack, reason: 'Automate workflows with Skills', priority: 'secondary' });
    }
  }

  // Add remaining tracks as optional
  const recommendedSlugs = new Set(recommendations.map(r => r.track.slug));
  for (const track of allTracks) {
    if (!recommendedSlugs.has(track.slug)) {
      recommendations.push({ track, reason: 'Expand your knowledge', priority: 'optional' });
    }
  }

  return recommendations;
}
