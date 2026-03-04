// Role-based learning paths - routes users by profession/role
import type { RolePath, PathTier } from '@/lib/types';

export const ROLE_PATHS: RolePath[] = [
  // ─────────────────────────────────────────────────
  // NON-TECHNICAL PATH
  // ─────────────────────────────────────────────────
  {
    id: 'non-technical',
    slug: 'non-technical',
    tier: 'non-technical',
    name: 'Business Professional',
    tagline: 'Turn Claude into your unfair advantage at work',
    description:
      'Master Claude for writing, research, analysis, and communication. No coding required. Learn the prompting techniques, Projects, and Artifacts that make top performers 10x more effective.',
    icon: 'briefcase',
    color: '#DA7756',
    accentColor: '#E8957A',
    exampleRoles: [
      'Sales Rep',
      'Account Executive',
      'Lawyer',
      'Paralegal',
      'HR Manager',
      'Recruiter',
      'Marketing Manager',
      'Content Writer',
      'Finance Analyst',
      'Executive Assistant',
      'Consultant',
      'Customer Success Manager',
    ],
    departments: [
      'sales',
      'marketing',
      'hr',
      'finance',
      'customer-success',
      'leadership',
      'other',
    ],
    trackSequence: [
      {
        trackSlug: 'claude-chat',
        label: 'Claude Chat Mastery',
        description:
          'Prompting fundamentals, conversation techniques, document analysis, and real-world workflows',
        isCore: true,
      },
      {
        trackSlug: 'claude-workspace',
        label: 'Claude Workspace',
        description:
          'Cowork, Connectors, Styles, Plugins, and the Surfaces decision framework',
        isCore: true,
      },
      {
        trackSlug: 'ai-strategy',
        label: 'AI Strategy & Fluency',
        description:
          'Strategic frameworks for AI adoption, model selection, and productivity optimization',
        isCore: true,
      },
      {
        trackSlug: 'claude-enterprise',
        label: 'Enterprise Collaboration',
        description:
          'Team features, Slack integration, and getting the most out of Claude across your organization',
        selectedLevels: [1, 5, 6],
        isCore: false,
      },
    ],
    estimatedHours: 15,
    totalLevels: 24,
  },

  // ─────────────────────────────────────────────────
  // HYBRID PATH
  // ─────────────────────────────────────────────────
  {
    id: 'hybrid',
    slug: 'hybrid',
    tier: 'hybrid',
    name: 'Power User',
    tagline: 'Bridge the gap between business and technology',
    description:
      'Go beyond chat. Learn Projects, Artifacts, workflow automation, and just enough technical literacy to collaborate with engineering teams and build light automations.',
    icon: 'layers',
    color: '#2563EB',
    accentColor: '#3B82F6',
    exampleRoles: [
      'Product Manager',
      'Operations Lead',
      'Project Manager',
      'Data Analyst',
      'Solutions Architect',
      'Technical Writer',
      'UX Researcher',
      'Business Analyst',
      'Scrum Master',
      'Growth Lead',
    ],
    departments: ['operations', 'leadership', 'it'],
    trackSequence: [
      {
        trackSlug: 'claude-chat',
        label: 'Claude Chat Mastery',
        description:
          'Prompting, Projects, Artifacts, advanced techniques, and document analysis',
        isCore: true,
      },
      {
        trackSlug: 'claude-enterprise',
        label: 'Enterprise & Team Management',
        description:
          'Admin Console, team management, Slack integration, and organizational deployment',
        isCore: true,
      },
      {
        trackSlug: 'claude-skills',
        label: 'Skills & Automation',
        description:
          'Create custom automations with SKILL.md to streamline your workflows',
        selectedLevels: [1, 2, 3],
        isCore: false,
      },
      {
        trackSlug: 'claude-workspace',
        label: 'Claude Workspace',
        description:
          'Cowork, Connectors, Styles, Plugins, and the Surfaces decision framework',
        isCore: true,
      },
      {
        trackSlug: 'ai-strategy',
        label: 'AI Strategy & Fluency',
        description:
          'Strategic frameworks for AI adoption, model selection, and productivity optimization',
        isCore: true,
      },
      {
        trackSlug: 'anthropic-api',
        label: 'API Literacy',
        description:
          'Understand how Claude API works so you can spec integrations and talk to your engineering team',
        selectedLevels: [1, 2],
        isCore: false,
      },
    ],
    estimatedHours: 23,
    totalLevels: 34,
  },

  // ─────────────────────────────────────────────────
  // TECHNICAL PATH
  // ─────────────────────────────────────────────────
  {
    id: 'technical',
    slug: 'technical',
    tier: 'technical',
    name: 'Developer & Engineer',
    tagline: 'Build with Claude across the full stack',
    description:
      'From Claude Code CLI to the Anthropic API to building custom MCP servers. The complete technical curriculum for developers who want to ship AI-powered software.',
    icon: 'terminal',
    color: '#0891B2',
    accentColor: '#22D3EE',
    exampleRoles: [
      'Software Engineer',
      'Full-Stack Developer',
      'Frontend Developer',
      'Backend Engineer',
      'DevOps Engineer',
      'ML Engineer',
      'Data Scientist',
      'IT Administrator',
      'Platform Engineer',
      'Security Engineer',
    ],
    departments: ['engineering', 'it'],
    trackSequence: [
      {
        trackSlug: 'claude-chat',
        label: 'Claude Fundamentals',
        description:
          'Prompting techniques every developer needs before touching the API or CLI',
        selectedLevels: [1, 2, 3, 5],
        isCore: true,
      },
      {
        trackSlug: 'claude-code',
        label: 'Claude Code Mastery',
        description:
          'CLI installation, hooks, skills, IDE integrations, and enterprise deployment',
        isCore: true,
      },
      {
        trackSlug: 'anthropic-api',
        label: 'Anthropic API',
        description:
          'Build applications with streaming, tool use, vision, and batch processing',
        isCore: true,
      },
      {
        trackSlug: 'mcp-development',
        label: 'MCP Development',
        description:
          'Build custom Model Context Protocol servers, connectors, and integrations',
        isCore: true,
      },
      {
        trackSlug: 'claude-skills',
        label: 'Claude Skills',
        description:
          'Create and publish custom SKILL.md automations',
        isCore: false,
      },
      {
        trackSlug: 'claude-enterprise',
        label: 'Enterprise Administration',
        description:
          'SSO, SCIM provisioning, audit logs, and platform security',
        selectedLevels: [1, 2, 3, 4, 7, 8],
        isCore: false,
      },
      {
        trackSlug: 'claude-workspace',
        label: 'Claude Workspace',
        description:
          'Platform features including Cowork, Connectors, and Surfaces framework',
        selectedLevels: [1, 3, 4, 6, 8],
        isCore: false,
      },
      {
        trackSlug: 'ai-strategy',
        label: 'AI Strategy',
        description:
          'Model selection, productivity frameworks, and strategic AI adoption',
        selectedLevels: [1, 2, 4],
        isCore: false,
      },
    ],
    estimatedHours: 42,
    totalLevels: 57,
  },
];

/**
 * Get all role paths
 */
export function getAllPaths(): RolePath[] {
  return ROLE_PATHS;
}

/**
 * Get a specific path by slug
 */
export function getPath(slug: string): RolePath | undefined {
  return ROLE_PATHS.find((p) => p.slug === slug);
}

/**
 * Get recommended path based on department and role
 */
export function getRecommendedPath(department: string, role?: string): RolePath {
  // Check department mapping first
  for (const path of ROLE_PATHS) {
    if (path.departments.includes(department)) {
      return path;
    }
  }

  // Fallback: check role keywords
  if (role) {
    const lower = role.toLowerCase();
    const techKeywords = [
      'engineer',
      'developer',
      'devops',
      'sre',
      'architect',
      'programmer',
      'coder',
      'ml ',
      'machine learning',
      'data scientist',
      'security',
      'infrastructure',
      'platform',
    ];
    const hybridKeywords = [
      'product',
      'project manager',
      'scrum',
      'analyst',
      'operations',
      'technical writer',
      'solutions',
      'ux ',
      'growth',
    ];

    if (techKeywords.some((kw) => lower.includes(kw))) {
      return ROLE_PATHS.find((p) => p.tier === 'technical')!;
    }
    if (hybridKeywords.some((kw) => lower.includes(kw))) {
      return ROLE_PATHS.find((p) => p.tier === 'hybrid')!;
    }
  }

  // Default to non-technical
  return ROLE_PATHS.find((p) => p.tier === 'non-technical')!;
}

/**
 * Get path by tier
 */
export function getPathByTier(tier: PathTier): RolePath {
  return ROLE_PATHS.find((p) => p.tier === tier)!;
}
