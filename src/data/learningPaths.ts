import { LearningPath } from '@/types';

export const learningPaths: LearningPath[] = [
  {
    id: 'codex',
    name: 'Codex Starter Track',
    description: 'Flexible path that uses OpenAI Codex tools with ChatGPT Plus or pay-as-you-go credits',
    targetAudience: 'Beginners, solo builders, budget-conscious makers',
    cost: 'ChatGPT Plus / pay-as-you-go',
    difficulty: 'beginner',
    levels: [
      {
        id: 1,
        title: 'Codex CLI Setup & First Project',
        description: 'Install the Codex helper CLI and build your first AI-assisted web page',
        category: 'setup',
        focus: 'Flexible tooling, basic web development',
        tools: ['Codex CLI', 'VS Code', 'HTML/CSS'],
        xpReward: 500,
        estimatedTime: '45 min'
      },
      {
        id: 2,
        title: 'Codex-Powered Styling',
        description: 'Use Codex prompts to create beautiful CSS while keeping costs low',
        category: 'coding',
        focus: 'Cost-effective design, CSS mastery',
        tools: ['Codex CLI', 'CSS3', 'Open source design kits'],
        xpReward: 750,
        estimatedTime: '1 hour'
      },
      {
        id: 3,
        title: 'Smart JavaScript with Codex',
        description: 'Learn JavaScript fundamentals with Codex support and real browser feedback',
        category: 'coding',
        focus: 'JavaScript fundamentals, efficient learning',
        tools: ['Codex CLI', 'JavaScript', 'Browser DevTools'],
        xpReward: 1000,
        estimatedTime: '1.5 hours'
      },
      {
        id: 4,
        title: 'Launch Without Extra Costs',
        description: 'Deploy your projects using free platforms and Codex deployment helpers',
        category: 'deployment',
        focus: 'Free hosting, portfolio building',
        tools: ['Codex CLI', 'Netlify/Vercel', 'GitHub Pages'],
        xpReward: 1250,
        estimatedTime: '1 hour'
      },
      {
        id: 5,
        title: 'Scaling on a Budget',
        description: 'Build larger projects and automate tasks while watching your API spend',
        category: 'optimization',
        focus: 'Resource optimization, free tools ecosystem',
        tools: ['Codex CLI', 'Free APIs', 'Optimization tools'],
        xpReward: 1500,
        estimatedTime: '2 hours'
      },
      {
        id: 6,
        title: 'Codex Starter App',
        description: 'Build your first complete application with Codex as your pair programmer',
        category: 'coding',
        focus: 'Complete app development, portfolio building',
        tools: ['Codex CLI', 'React/Vue', 'Free hosting'],
        xpReward: 2000,
        estimatedTime: '1.5 hours'
      },
      {
        id: 7,
        title: 'AI Features on Demand',
        description: 'Add practical AI features to your app using Codex API recipes',
        category: 'optimization',
        focus: 'AI API integration, intelligent features',
        tools: ['Codex API', 'JavaScript', 'Free AI services'],
        xpReward: 2500,
        estimatedTime: '2 hours'
      },
      {
        id: 8,
        title: 'Showcase Your Portfolio',
        description: 'Deploy and present your work with polished case studies and Codex prompt templates',
        category: 'deployment',
        focus: 'Portfolio building, professional presentation',
        tools: ['GitHub Pages', 'Free domain', 'Portfolio templates'],
        xpReward: 3000,
        estimatedTime: '2.5 hours'
      }
    ]
  },
  {
    id: 'claude',
    name: 'Claude Pro Track',
    description: 'Premium quality-focused development path',
    targetAudience: 'Quality-focused developers, professionals, startups',
    cost: '$20-200/month',
    difficulty: 'intermediate',
    levels: [
      {
        id: 1,
        title: 'Claude Code Pro Setup',
        description: 'Master premium AI development with Claude\'s advanced reasoning',
        category: 'setup',
        focus: 'Professional development workflow, code quality',
        tools: ['Claude Code CLI', 'Advanced prompting', 'Professional IDE'],
        xpReward: 500,
        estimatedTime: '30 min'
      },
      {
        id: 2,
        title: 'Architectural Excellence',
        description: 'Design robust, scalable applications with Claude\'s guidance',
        category: 'coding',
        focus: 'Software architecture, best practices',
        tools: ['Claude Code CLI', 'Design patterns', 'Code review'],
        xpReward: 750,
        estimatedTime: '1.5 hours'
      },
      {
        id: 3,
        title: 'Advanced Interactions',
        description: 'Build sophisticated user interactions with Claude\'s help',
        category: 'coding',
        focus: 'Complex UX, state management, performance',
        tools: ['Claude Code CLI', 'React/Vue', 'State management'],
        xpReward: 1000,
        estimatedTime: '2 hours'
      },
      {
        id: 4,
        title: 'Professional Deployment',
        description: 'Deploy production-ready applications with monitoring',
        category: 'deployment',
        focus: 'Production deployment, monitoring, CI/CD',
        tools: ['Claude Code CLI', 'Docker', 'AWS/Vercel Pro'],
        xpReward: 1250,
        estimatedTime: '1.5 hours'
      },
      {
        id: 5,
        title: 'Enterprise Features',
        description: 'Add authentication, APIs, and enterprise capabilities',
        category: 'optimization',
        focus: 'Enterprise patterns, security, scalability',
        tools: ['Claude Code CLI', 'Auth systems', 'API design'],
        xpReward: 1500,
        estimatedTime: '3 hours'
      },
      {
        id: 6,
        title: 'Production-Grade Application',
        description: 'Build enterprise-quality applications with Claude\'s guidance',
        category: 'coding',
        focus: 'Enterprise patterns, advanced architecture',
        tools: ['Claude Code CLI', 'TypeScript', 'Testing frameworks'],
        xpReward: 2000,
        estimatedTime: '1.5 hours'
      },
      {
        id: 7,
        title: 'Advanced AI Integration',
        description: 'Implement sophisticated AI features with Claude APIs',
        category: 'optimization',
        focus: 'AI integration, intelligent workflows',
        tools: ['Claude API', 'Advanced prompting', 'AI orchestration'],
        xpReward: 2500,
        estimatedTime: '2 hours'
      },
      {
        id: 8,
        title: 'Enterprise Deployment',
        description: 'Deploy with enterprise-grade monitoring and DevOps',
        category: 'deployment',
        focus: 'DevOps mastery, production monitoring',
        tools: ['Claude Code CLI', 'AWS/GCP', 'Professional monitoring'],
        xpReward: 3000,
        estimatedTime: '2.5 hours'
      }
    ]
  },
  {
    id: 'codex',
    name: 'OpenAI Enterprise Track',
    description: 'Flexible, powerful development for experienced teams',
    targetAudience: 'Experienced developers, enterprises, power users',
    cost: 'Pay-per-use ($3-15/1M tokens)',
    difficulty: 'advanced',
    levels: [
      {
        id: 1,
        title: 'OpenAI API Mastery',
        description: 'Master GPT-4 for complex development tasks',
        category: 'setup',
        focus: 'API optimization, cost management, advanced prompting',
        tools: ['OpenAI API', 'Custom integrations', 'Usage tracking'],
        xpReward: 500,
        estimatedTime: '45 min'
      },
      {
        id: 2,
        title: 'Multi-Model Architecture',
        description: 'Combine different AI models for optimal results',
        category: 'coding',
        focus: 'Model selection, hybrid approaches, optimization',
        tools: ['GPT-4', 'Code models', 'Custom workflows'],
        xpReward: 750,
        estimatedTime: '2 hours'
      },
      {
        id: 3,
        title: 'Enterprise Integration',
        description: 'Integrate AI into existing enterprise systems',
        category: 'coding',
        focus: 'Legacy integration, enterprise patterns, security',
        tools: ['OpenAI API', 'Enterprise tools', 'Security frameworks'],
        xpReward: 1000,
        estimatedTime: '2.5 hours'
      },
      {
        id: 4,
        title: 'Scalable AI Deployment',
        description: 'Deploy AI-powered applications at enterprise scale',
        category: 'deployment',
        focus: 'Scalability, load balancing, cost optimization',
        tools: ['OpenAI API', 'Kubernetes', 'Enterprise cloud'],
        xpReward: 1250,
        estimatedTime: '2 hours'
      },
      {
        id: 5,
        title: 'AI-Native Innovation',
        description: 'Build cutting-edge AI-first applications',
        category: 'optimization',
        focus: 'Innovation, custom models, advanced use cases',
        tools: ['OpenAI API', 'Custom models', 'Research tools'],
        xpReward: 1500,
        estimatedTime: '4 hours'
      },
      {
        id: 6,
        title: 'Scalable System Architecture',
        description: 'Build enterprise-scale applications with advanced patterns',
        category: 'coding',
        focus: 'System design, scalability patterns',
        tools: ['OpenAI API', 'Microservices', 'Advanced architecture'],
        xpReward: 2000,
        estimatedTime: '2 hours'
      },
      {
        id: 7,
        title: 'Multi-Model AI Orchestration',
        description: 'Combine multiple AI models for optimal performance',
        category: 'optimization',
        focus: 'AI orchestration, model optimization',
        tools: ['OpenAI API', 'Multiple AI models', 'Performance optimization'],
        xpReward: 2500,
        estimatedTime: '2.5 hours'
      },
      {
        id: 8,
        title: 'Enterprise AI Platform',
        description: 'Deploy AI-first applications at enterprise scale',
        category: 'deployment',
        focus: 'Enterprise deployment, AI platform management',
        tools: ['OpenAI API', 'Enterprise cloud', 'AI platform tools'],
        xpReward: 3000,
        estimatedTime: '3 hours'
      }
    ]
  }
];

export function getLearningPath(cliType: string | null) {
  return learningPaths.find(path => path.id === cliType) || learningPaths[0];
}

export function getLevelContent(cliType: string | null, levelId: number) {
  const path = getLearningPath(cliType);
  return path.levels.find(level => level.id === levelId);
}
