'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  ChevronLeft,
  Briefcase,
  Building2,
  Target,
  Sparkles,
  Code,
  Terminal,
  MessageCircle,
  Users,
  LayoutDashboard,
  PenTool,
  Database,
  Shield,
  Megaphone,
  HeadphonesIcon,
  Lightbulb,
  CheckCircle
} from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: (profile: UserOnboardingProfile) => void;
}

export interface UserOnboardingProfile {
  department: string;
  role: string;
  experienceLevel: string;
  goals: string[];
  recommendedTracks: string[];
}

interface Step {
  id: string;
  title: string;
  subtitle: string;
}

const STEPS: Step[] = [
  { id: 'department', title: 'What department do you work in?', subtitle: 'This helps us personalize your learning path' },
  { id: 'role', title: 'What best describes your role?', subtitle: 'We\'ll recommend the right Claude tools for you' },
  { id: 'experience', title: 'How familiar are you with AI?', subtitle: 'We\'ll adjust the content difficulty' },
  { id: 'goals', title: 'What do you want to achieve?', subtitle: 'Select all that apply' },
  { id: 'recommendations', title: 'Your personalized learning path', subtitle: 'Based on your profile, here\'s what we recommend' },
];

const DEPARTMENTS = [
  { id: 'engineering', label: 'Engineering / Development', icon: Code, color: '#2563EB' },
  { id: 'product', label: 'Product Management', icon: LayoutDashboard, color: '#7C3AED' },
  { id: 'design', label: 'Design / UX', icon: PenTool, color: '#EC4899' },
  { id: 'data', label: 'Data / Analytics', icon: Database, color: '#10B981' },
  { id: 'marketing', label: 'Marketing / Growth', icon: Megaphone, color: '#F59E0B' },
  { id: 'sales', label: 'Sales / Business Dev', icon: Target, color: '#EF4444' },
  { id: 'support', label: 'Customer Support', icon: HeadphonesIcon, color: '#06B6D4' },
  { id: 'operations', label: 'Operations / Admin', icon: Building2, color: '#6366F1' },
  { id: 'security', label: 'Security / Compliance', icon: Shield, color: '#DC2626' },
  { id: 'executive', label: 'Executive / Leadership', icon: Briefcase, color: '#0891B2' },
  { id: 'other', label: 'Other', icon: Users, color: '#64748B' },
];

const ROLES: Record<string, { id: string; label: string; description: string }[]> = {
  engineering: [
    { id: 'developer', label: 'Software Developer', description: 'Write code, build features' },
    { id: 'senior-dev', label: 'Senior / Lead Developer', description: 'Architecture, mentoring, complex systems' },
    { id: 'devops', label: 'DevOps / SRE', description: 'Infrastructure, CI/CD, reliability' },
    { id: 'manager', label: 'Engineering Manager', description: 'Team leadership, project delivery' },
    { id: 'architect', label: 'Solutions Architect', description: 'System design, technical strategy' },
  ],
  product: [
    { id: 'pm', label: 'Product Manager', description: 'Feature definition, roadmap' },
    { id: 'senior-pm', label: 'Senior PM / Director', description: 'Strategy, multiple products' },
    { id: 'analyst', label: 'Product Analyst', description: 'Metrics, insights, optimization' },
  ],
  design: [
    { id: 'designer', label: 'UX/UI Designer', description: 'Interface design, user flows' },
    { id: 'researcher', label: 'UX Researcher', description: 'User studies, insights' },
    { id: 'content', label: 'Content Designer', description: 'Copy, microcopy, content strategy' },
  ],
  data: [
    { id: 'analyst', label: 'Data Analyst', description: 'Reports, dashboards, insights' },
    { id: 'scientist', label: 'Data Scientist', description: 'ML models, predictions' },
    { id: 'engineer', label: 'Data Engineer', description: 'Pipelines, infrastructure' },
  ],
  marketing: [
    { id: 'marketer', label: 'Marketing Manager', description: 'Campaigns, content, brand' },
    { id: 'content', label: 'Content Marketing', description: 'Blog, social, copywriting' },
    { id: 'growth', label: 'Growth Marketing', description: 'Acquisition, optimization' },
  ],
  sales: [
    { id: 'rep', label: 'Sales Representative', description: 'Prospecting, closing deals' },
    { id: 'manager', label: 'Sales Manager', description: 'Team leadership, forecasting' },
    { id: 'enablement', label: 'Sales Enablement', description: 'Training, tools, process' },
  ],
  support: [
    { id: 'agent', label: 'Support Agent', description: 'Customer issues, tickets' },
    { id: 'manager', label: 'Support Manager', description: 'Team, processes, quality' },
    { id: 'success', label: 'Customer Success', description: 'Retention, expansion' },
  ],
  operations: [
    { id: 'ops', label: 'Operations Manager', description: 'Processes, efficiency' },
    { id: 'admin', label: 'Admin / Office Manager', description: 'Coordination, scheduling' },
    { id: 'hr', label: 'HR / People Ops', description: 'Hiring, culture, policies' },
  ],
  security: [
    { id: 'analyst', label: 'Security Analyst', description: 'Monitoring, incident response' },
    { id: 'engineer', label: 'Security Engineer', description: 'Implementation, tooling' },
    { id: 'compliance', label: 'Compliance Manager', description: 'Regulations, audits' },
  ],
  executive: [
    { id: 'cxo', label: 'C-Suite Executive', description: 'CEO, CTO, COO, etc.' },
    { id: 'vp', label: 'VP / Director', description: 'Department leadership' },
    { id: 'founder', label: 'Founder', description: 'Startup leadership' },
  ],
  other: [
    { id: 'general', label: 'General / Individual Contributor', description: 'Various tasks' },
    { id: 'student', label: 'Student / Learning', description: 'Education, skill building' },
    { id: 'freelancer', label: 'Freelancer / Consultant', description: 'Independent work' },
  ],
};

const EXPERIENCE_LEVELS = [
  { id: 'beginner', label: 'New to AI', description: 'Never used AI assistants before', icon: '' },
  { id: 'familiar', label: 'Familiar', description: 'Used ChatGPT or Claude a few times', icon: '' },
  { id: 'regular', label: 'Regular User', description: 'Use AI tools weekly or more', icon: '' },
  { id: 'advanced', label: 'Power User', description: 'Deep experience with prompting, APIs, etc.', icon: '' },
];

const GOALS = [
  { id: 'productivity', label: 'Boost productivity', description: 'Get more done in less time' },
  { id: 'coding', label: 'Write better code', description: 'Use AI for development tasks' },
  { id: 'content', label: 'Create content', description: 'Writing, marketing, documentation' },
  { id: 'analysis', label: 'Analyze data', description: 'Insights, reports, research' },
  { id: 'automation', label: 'Automate workflows', description: 'Build integrations, reduce manual work' },
  { id: 'team', label: 'Enable my team', description: 'Roll out AI across the organization' },
  { id: 'enterprise', label: 'Enterprise deployment', description: 'Security, compliance, scale' },
  { id: 'building', label: 'Build AI products', description: 'Create apps using Claude API' },
];

// Recommendation engine
function getRecommendedTracks(profile: Partial<UserOnboardingProfile>): { track: string; reason: string; priority: 'primary' | 'secondary' | 'optional' }[] {
  const recommendations: { track: string; reason: string; priority: 'primary' | 'secondary' | 'optional' }[] = [];

  // Everyone should start with Claude Chat
  recommendations.push({
    track: 'claude-chat',
    reason: 'Essential foundation for all Claude users',
    priority: 'primary'
  });

  // Engineering roles → Claude Code + API
  if (['engineering', 'data'].includes(profile.department || '')) {
    recommendations.push({
      track: 'claude-code',
      reason: 'Perfect for your development workflow',
      priority: 'primary'
    });
    recommendations.push({
      track: 'anthropic-api',
      reason: 'Build custom integrations with Claude',
      priority: 'secondary'
    });
    if (profile.goals?.includes('automation')) {
      recommendations.push({
        track: 'mcp-development',
        reason: 'Create powerful custom connectors',
        priority: 'secondary'
      });
    }
  }

  // Technical managers → Enterprise + Code
  if (['manager', 'senior-dev', 'architect', 'cxo', 'vp'].includes(profile.role || '')) {
    recommendations.push({
      track: 'claude-enterprise',
      reason: 'Deploy Claude securely across your team',
      priority: 'primary'
    });
  }

  // Non-technical roles → Chat + Skills
  if (['marketing', 'sales', 'support', 'operations', 'design'].includes(profile.department || '')) {
    recommendations.push({
      track: 'claude-skills',
      reason: 'Automate your workflows without coding',
      priority: 'secondary'
    });
  }

  // Goal-based recommendations
  if (profile.goals?.includes('automation')) {
    if (!recommendations.find(r => r.track === 'claude-skills')) {
      recommendations.push({
        track: 'claude-skills',
        reason: 'Build powerful automations',
        priority: 'secondary'
      });
    }
  }

  if (profile.goals?.includes('enterprise') || profile.goals?.includes('team')) {
    if (!recommendations.find(r => r.track === 'claude-enterprise')) {
      recommendations.push({
        track: 'claude-enterprise',
        reason: 'Deploy at scale with security controls',
        priority: 'primary'
      });
    }
  }

  if (profile.goals?.includes('building')) {
    if (!recommendations.find(r => r.track === 'anthropic-api')) {
      recommendations.push({
        track: 'anthropic-api',
        reason: 'Essential for building AI-powered products',
        priority: 'primary'
      });
    }
    recommendations.push({
      track: 'mcp-development',
      reason: 'Create custom integrations',
      priority: 'secondary'
    });
  }

  // Remove duplicates and sort by priority
  const uniqueRecommendations = recommendations.filter((r, i) =>
    recommendations.findIndex(rec => rec.track === r.track) === i
  );

  return uniqueRecommendations.sort((a, b) => {
    const order = { primary: 0, secondary: 1, optional: 2 };
    return order[a.priority] - order[b.priority];
  });
}

const TRACK_INFO: Record<string, { name: string; icon: React.ComponentType<{ className?: string }>; color: string }> = {
  'claude-chat': { name: 'Claude Chat Fundamentals', icon: MessageCircle, color: '#DA7756' },
  'claude-code': { name: 'Claude Code Mastery', icon: Terminal, color: '#2563EB' },
  'mcp-development': { name: 'MCP Development', icon: Code, color: '#0891B2' },
  'anthropic-api': { name: 'Anthropic API', icon: Code, color: '#10B981' },
  'claude-enterprise': { name: 'Claude Enterprise', icon: Building2, color: '#6366F1' },
  'claude-skills': { name: 'Claude Skills', icon: Sparkles, color: '#F59E0B' },
};

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [profile, setProfile] = useState<Partial<UserOnboardingProfile>>({
    goals: []
  });
  const [recommendations, setRecommendations] = useState<ReturnType<typeof getRecommendedTracks>>([]);

  const handleNext = () => {
    if (currentStep === STEPS.length - 2) {
      // Calculate recommendations before showing final step
      setRecommendations(getRecommendedTracks(profile));
    }
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    onComplete({
      department: profile.department || 'other',
      role: profile.role || 'general',
      experienceLevel: profile.experienceLevel || 'beginner',
      goals: profile.goals || [],
      recommendedTracks: recommendations.map(r => r.track)
    });
  };

  const canProceed = () => {
    switch (STEPS[currentStep].id) {
      case 'department': return !!profile.department;
      case 'role': return !!profile.role;
      case 'experience': return !!profile.experienceLevel;
      case 'goals': return (profile.goals?.length || 0) > 0;
      case 'recommendations': return true;
      default: return false;
    }
  };

  const renderStepContent = () => {
    const step = STEPS[currentStep];

    switch (step.id) {
      case 'department':
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {DEPARTMENTS.map((dept) => {
              const Icon = dept.icon;
              const isSelected = profile.department === dept.id;
              return (
                <button
                  key={dept.id}
                  onClick={() => setProfile(p => ({ ...p, department: dept.id, role: undefined }))}
                  className={`
                    flex flex-col items-center gap-3 p-5 rounded-xl
                    border-2 transition-all duration-200
                    ${isSelected
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-border-hover bg-bg-card'
                    }
                  `}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${dept.color}20`, color: dept.color }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-sm font-medium text-center ${isSelected ? 'text-primary' : 'text-text'}`}>
                    {dept.label}
                  </span>
                </button>
              );
            })}
          </div>
        );

      case 'role':
        const roles = ROLES[profile.department || 'other'] || ROLES.other;
        return (
          <div className="space-y-3">
            {roles.map((role) => {
              const isSelected = profile.role === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => setProfile(p => ({ ...p, role: role.id }))}
                  className={`
                    w-full flex items-center gap-4 p-4 rounded-xl
                    border-2 transition-all duration-200 text-left
                    ${isSelected
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-border-hover bg-bg-card'
                    }
                  `}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                    ${isSelected ? 'border-primary' : 'border-border'}`}
                  >
                    {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                  </div>
                  <div>
                    <p className={`font-medium ${isSelected ? 'text-primary' : 'text-text'}`}>
                      {role.label}
                    </p>
                    <p className="text-sm text-text-muted">{role.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-4">
            {EXPERIENCE_LEVELS.map((level) => {
              const isSelected = profile.experienceLevel === level.id;
              return (
                <button
                  key={level.id}
                  onClick={() => setProfile(p => ({ ...p, experienceLevel: level.id }))}
                  className={`
                    w-full flex items-center gap-4 p-5 rounded-xl
                    border-2 transition-all duration-200 text-left
                    ${isSelected
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-border-hover bg-bg-card'
                    }
                  `}
                >
                  <span className="text-3xl">{level.icon}</span>
                  <div className="flex-1">
                    <p className={`font-medium ${isSelected ? 'text-primary' : 'text-text'}`}>
                      {level.label}
                    </p>
                    <p className="text-sm text-text-muted">{level.description}</p>
                  </div>
                  {isSelected && <CheckCircle className="w-6 h-6 text-primary" />}
                </button>
              );
            })}
          </div>
        );

      case 'goals':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {GOALS.map((goal) => {
              const isSelected = profile.goals?.includes(goal.id);
              return (
                <button
                  key={goal.id}
                  onClick={() => {
                    setProfile(p => ({
                      ...p,
                      goals: isSelected
                        ? p.goals?.filter(g => g !== goal.id) || []
                        : [...(p.goals || []), goal.id]
                    }));
                  }}
                  className={`
                    flex items-start gap-3 p-4 rounded-xl
                    border-2 transition-all duration-200 text-left
                    ${isSelected
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-border-hover bg-bg-card'
                    }
                  `}
                >
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5
                    ${isSelected ? 'border-primary bg-primary' : 'border-border'}`}
                  >
                    {isSelected && <CheckCircle className="w-3 h-3 text-white" />}
                  </div>
                  <div>
                    <p className={`font-medium ${isSelected ? 'text-primary' : 'text-text'}`}>
                      {goal.label}
                    </p>
                    <p className="text-sm text-text-muted">{goal.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        );

      case 'recommendations':
        return (
          <div className="space-y-4">
            {recommendations.map((rec, index) => {
              const track = TRACK_INFO[rec.track];
              const Icon = track?.icon || Code;
              return (
                <motion.div
                  key={rec.track}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`
                    flex items-center gap-4 p-5 rounded-xl border
                    ${rec.priority === 'primary'
                      ? 'border-claude bg-claude/10'
                      : 'border-border bg-bg-card'
                    }
                  `}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${track?.color || '#DA7756'}20`, color: track?.color || '#DA7756' }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-text">{track?.name}</p>
                      {rec.priority === 'primary' && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-claude text-white">
                          Recommended
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-text-muted">{rec.reason}</p>
                  </div>
                </motion.div>
              );
            })}

            <div className="mt-6 p-4 rounded-xl bg-primary/10 border border-primary/20">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-text-soft">
                  We&apos;ve tailored these recommendations based on your {profile.department} background
                  and goal to {profile.goals?.join(', ')}. You can always explore other tracks later!
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {STEPS.map((step, index) => (
            <div
              key={step.id}
              className={`
                h-2 rounded-full transition-all duration-300
                ${index === currentStep
                  ? 'w-8 bg-claude'
                  : index < currentStep
                    ? 'w-4 bg-success'
                    : 'w-4 bg-border'
                }
              `}
            />
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="bg-bg-card rounded-2xl border border-border p-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-text mb-2">
                {STEPS[currentStep].title}
              </h2>
              <p className="text-text-muted">
                {STEPS[currentStep].subtitle}
              </p>
            </div>

            {renderStepContent()}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <button
                onClick={handleBack}
                disabled={currentStep === 0}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                  ${currentStep === 0
                    ? 'text-text-muted/50 cursor-not-allowed'
                    : 'text-text-muted hover:text-text'
                  }
                `}
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Back</span>
              </button>

              {currentStep < STEPS.length - 1 ? (
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className={`
                    flex items-center gap-2 px-6 py-3 rounded-xl font-medium
                    transition-all duration-200
                    ${canProceed()
                      ? 'bg-primary hover:bg-primary-hover text-white'
                      : 'bg-bg-lighter text-text-muted cursor-not-allowed'
                    }
                  `}
                >
                  <span>Continue</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleComplete}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium
                           bg-claude hover:bg-claude-dark text-white
                           transition-all duration-200 shadow-glow-claude"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Start Learning</span>
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
