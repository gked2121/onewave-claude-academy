'use client';

import { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Users,
  Briefcase,
  Sparkles,
  Target,
  Check,
  Building2,
  Code,
  BarChart3,
  HeadphonesIcon,
  DollarSign,
  Megaphone,
  Settings,
  Cog,
  Crown,
  Layers,
  Terminal,
  Clock,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { useProgress } from '@/context/ProgressContext';
import { getRecommendedPath, getAllPaths } from '@/lib/paths';
import type { RolePath } from '@/lib/types';

// Department options
const DEPARTMENTS = [
  { id: 'engineering', label: 'Engineering', icon: Code, description: 'Software development, DevOps, QA' },
  { id: 'sales', label: 'Sales', icon: DollarSign, description: 'Account executives, SDRs, sales ops' },
  { id: 'marketing', label: 'Marketing', icon: Megaphone, description: 'Content, growth, brand, campaigns' },
  { id: 'operations', label: 'Operations', icon: Cog, description: 'Business ops, project management' },
  { id: 'customer-success', label: 'Customer Success', icon: HeadphonesIcon, description: 'Support, success managers, onboarding' },
  { id: 'finance', label: 'Finance', icon: BarChart3, description: 'Accounting, FP&A, analytics' },
  { id: 'hr', label: 'People & HR', icon: Users, description: 'Recruiting, people ops, L&D' },
  { id: 'leadership', label: 'Leadership', icon: Crown, description: 'Executives, directors, managers' },
  { id: 'it', label: 'IT & Admin', icon: Settings, description: 'System administration, security' },
  { id: 'other', label: 'Other', icon: Building2, description: 'Other departments' },
];

// Experience levels
const EXPERIENCE_LEVELS = [
  { id: 'beginner', label: 'New to AI', description: 'Just getting started with AI tools' },
  { id: 'intermediate', label: 'Some Experience', description: 'Used ChatGPT or similar tools' },
  { id: 'advanced', label: 'AI Power User', description: 'Regular AI user, ready for advanced topics' },
];

type OnboardingStep = 'department' | 'role' | 'experience' | 'goals' | 'recommendations';

const PATH_ICONS: Record<string, typeof Briefcase> = {
  briefcase: Briefcase,
  layers: Layers,
  terminal: Terminal,
};

export default function OnboardingPage() {
  const router = useRouter();
  const { setUserEmail, updatePreferences } = useProgress();

  const [currentStep, setCurrentStep] = useState<OnboardingStep>('department');
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [role, setRole] = useState('');
  const [experienceLevel, setExperienceLevel] = useState<string | null>(null);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showOtherPaths, setShowOtherPaths] = useState(false);

  // Goals based on department
  const getGoalsForDepartment = (dept: string) => {
    const commonGoals = [
      { id: 'productivity', label: 'Boost productivity' },
      { id: 'automate', label: 'Automate repetitive tasks' },
      { id: 'quality', label: 'Improve work quality' },
    ];

    const deptGoals: Record<string, { id: string; label: string }[]> = {
      engineering: [
        { id: 'code-faster', label: 'Write code faster' },
        { id: 'debug', label: 'Debug more efficiently' },
        { id: 'documentation', label: 'Better documentation' },
        { id: 'code-review', label: 'Improve code reviews' },
      ],
      sales: [
        { id: 'emails', label: 'Write better emails' },
        { id: 'research', label: 'Research prospects faster' },
        { id: 'proposals', label: 'Create winning proposals' },
        { id: 'objections', label: 'Handle objections better' },
      ],
      marketing: [
        { id: 'content', label: 'Create content faster' },
        { id: 'copy', label: 'Write better copy' },
        { id: 'campaigns', label: 'Plan campaigns' },
        { id: 'analyze', label: 'Analyze performance data' },
      ],
      'customer-success': [
        { id: 'responses', label: 'Faster customer responses' },
        { id: 'knowledge', label: 'Build knowledge bases' },
        { id: 'onboard', label: 'Improve onboarding' },
        { id: 'upsell', label: 'Identify upsell opportunities' },
      ],
      finance: [
        { id: 'reports', label: 'Generate reports faster' },
        { id: 'analysis', label: 'Better data analysis' },
        { id: 'forecasting', label: 'Improve forecasting' },
        { id: 'compliance', label: 'Streamline compliance' },
      ],
      operations: [
        { id: 'processes', label: 'Optimize processes' },
        { id: 'sops', label: 'Create SOPs' },
        { id: 'project-mgmt', label: 'Better project management' },
        { id: 'coordination', label: 'Improve team coordination' },
      ],
      hr: [
        { id: 'hiring', label: 'Streamline hiring' },
        { id: 'policies', label: 'Write policies' },
        { id: 'training', label: 'Create training materials' },
        { id: 'culture', label: 'Improve employee experience' },
      ],
      leadership: [
        { id: 'strategy', label: 'Strategic planning' },
        { id: 'communication', label: 'Better team communication' },
        { id: 'decisions', label: 'Data-driven decisions' },
        { id: 'vision', label: 'Articulate vision clearly' },
      ],
      it: [
        { id: 'troubleshoot', label: 'Faster troubleshooting' },
        { id: 'scripts', label: 'Automate with scripts' },
        { id: 'docs', label: 'Better technical docs' },
        { id: 'security', label: 'Security best practices' },
      ],
    };

    return [...(deptGoals[dept] || []), ...commonGoals];
  };

  const recommendedPath = useMemo(() => {
    if (!selectedDepartment) return null;
    return getRecommendedPath(selectedDepartment, role || undefined);
  }, [selectedDepartment, role]);

  const otherPaths = useMemo(() => {
    if (!recommendedPath) return [];
    return getAllPaths().filter((p) => p.id !== recommendedPath.id);
  }, [recommendedPath]);

  const handleNext = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      if (currentStep === 'department' && selectedDepartment) {
        setCurrentStep('role');
      } else if (currentStep === 'role' && role.trim()) {
        setCurrentStep('experience');
      } else if (currentStep === 'experience' && experienceLevel) {
        setCurrentStep('goals');
      } else if (currentStep === 'goals') {
        setCurrentStep('recommendations');
      }
      setIsAnimating(false);
    }, 200);
  }, [currentStep, selectedDepartment, role, experienceLevel]);

  const handleBack = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      if (currentStep === 'role') setCurrentStep('department');
      else if (currentStep === 'experience') setCurrentStep('role');
      else if (currentStep === 'goals') setCurrentStep('experience');
      else if (currentStep === 'recommendations') setCurrentStep('goals');
      setIsAnimating(false);
    }, 200);
  }, [currentStep]);

  const handleComplete = useCallback(() => {
    // Save preferences to context (and eventually database)
    updatePreferences({
      department: selectedDepartment || undefined,
      role: role || undefined,
      experienceLevel: experienceLevel || undefined,
      goals: selectedGoals,
    } as any);

    // Navigate to the recommended path
    if (recommendedPath) {
      router.push(`/paths/${recommendedPath.slug}`);
    } else {
      router.push('/dashboard');
    }
  }, [selectedDepartment, role, experienceLevel, selectedGoals, updatePreferences, router, recommendedPath]);

  const toggleGoal = (goalId: string) => {
    setSelectedGoals(prev =>
      prev.includes(goalId)
        ? prev.filter(g => g !== goalId)
        : [...prev, goalId]
    );
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'department':
        return (
          <motion.div
            key="department"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-claude/20 flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-claude" />
              </div>
              <h2 className="text-2xl font-bold text-text mb-2">What's your department?</h2>
              <p className="text-text-soft">
                We'll customize your learning path based on your team
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {DEPARTMENTS.map((dept) => {
                const Icon = dept.icon;
                const isSelected = selectedDepartment === dept.id;
                return (
                  <button
                    key={dept.id}
                    onClick={() => setSelectedDepartment(dept.id)}
                    className={`
                      relative p-4 rounded-xl border transition-all duration-200 text-left
                      ${isSelected
                        ? 'border-claude bg-claude/10 shadow-glow-claude'
                        : 'border-border bg-bg-card hover:border-border-hover hover:bg-bg-lighter'
                      }
                    `}
                  >
                    {isSelected && (
                      <div className="absolute top-2 right-2">
                        <Check className="w-4 h-4 text-claude" />
                      </div>
                    )}
                    <Icon className={`w-6 h-6 mb-2 ${isSelected ? 'text-claude' : 'text-text-muted'}`} />
                    <div className="font-medium text-text text-sm">{dept.label}</div>
                    <div className="text-xs text-text-muted line-clamp-1">{dept.description}</div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        );

      case 'role':
        return (
          <motion.div
            key="role"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6 max-w-md mx-auto"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-text mb-2">What's your role?</h2>
              <p className="text-text-soft">
                This helps us recommend the right learning tracks
              </p>
            </div>

            <div>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g., Software Engineer, Account Executive, Marketing Manager..."
                className="w-full px-4 py-4 bg-bg-card border border-border rounded-xl
                         text-text placeholder:text-text-muted text-lg
                         focus:outline-none focus:border-primary transition-colors"
                autoFocus
              />
              <p className="mt-2 text-sm text-text-muted">
                Include your seniority level if relevant (Senior, Lead, Director, etc.)
              </p>
            </div>
          </motion.div>
        );

      case 'experience':
        return (
          <motion.div
            key="experience"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6 max-w-lg mx-auto"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-success/20 flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-success" />
              </div>
              <h2 className="text-2xl font-bold text-text mb-2">What's your AI experience?</h2>
              <p className="text-text-soft">
                We'll adjust the difficulty to match your level
              </p>
            </div>

            <div className="space-y-3">
              {EXPERIENCE_LEVELS.map((level) => {
                const isSelected = experienceLevel === level.id;
                return (
                  <button
                    key={level.id}
                    onClick={() => setExperienceLevel(level.id)}
                    className={`
                      w-full p-4 rounded-xl border transition-all duration-200 text-left flex items-center gap-4
                      ${isSelected
                        ? 'border-success bg-success/10'
                        : 'border-border bg-bg-card hover:border-border-hover'
                      }
                    `}
                  >
                    <div className={`
                      w-6 h-6 rounded-full border-2 flex items-center justify-center
                      ${isSelected ? 'border-success bg-success' : 'border-border'}
                    `}>
                      {isSelected && <Check className="w-4 h-4 text-white" />}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-text">{level.label}</div>
                      <div className="text-sm text-text-muted">{level.description}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        );

      case 'goals':
        return (
          <motion.div
            key="goals"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6 max-w-xl mx-auto"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-yellow-500/20 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-yellow-500" />
              </div>
              <h2 className="text-2xl font-bold text-text mb-2">What do you want to achieve?</h2>
              <p className="text-text-soft">
                Select all that apply - we'll prioritize relevant content
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {getGoalsForDepartment(selectedDepartment || 'other').map((goal) => {
                const isSelected = selectedGoals.includes(goal.id);
                return (
                  <button
                    key={goal.id}
                    onClick={() => toggleGoal(goal.id)}
                    className={`
                      p-4 rounded-xl border transition-all duration-200 text-left
                      ${isSelected
                        ? 'border-yellow-500 bg-yellow-500/10'
                        : 'border-border bg-bg-card hover:border-border-hover'
                      }
                    `}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`
                        w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0
                        ${isSelected ? 'border-yellow-500 bg-yellow-500' : 'border-border'}
                      `}>
                        {isSelected && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className={isSelected ? 'text-text' : 'text-text-soft'}>
                        {goal.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        );

      case 'recommendations': {
        if (!recommendedPath) return null;
        const PathIcon = PATH_ICONS[recommendedPath.icon] || Briefcase;
        const coreTracks = recommendedPath.trackSequence.filter((t) => t.isCore);
        const optionalTracks = recommendedPath.trackSequence.filter((t) => !t.isCore);

        return (
          <motion.div
            key="recommendations"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6 max-w-2xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-2">
              <p className="text-sm text-text-muted uppercase tracking-wide mb-3">
                Based on your role as a <span className="text-text font-medium">{role}</span> in{' '}
                <span className="text-text font-medium">{DEPARTMENTS.find((d) => d.id === selectedDepartment)?.label}</span>
              </p>
              <h2 className="text-2xl font-bold text-text">We recommend</h2>
            </div>

            {/* Recommended path card */}
            <div
              className="relative rounded-2xl border-2 overflow-hidden"
              style={{ borderColor: recommendedPath.color }}
            >
              {/* Accent gradient bar */}
              <div
                className="h-1.5"
                style={{ background: `linear-gradient(90deg, ${recommendedPath.color}, ${recommendedPath.accentColor})` }}
              />

              <div className="p-6 bg-bg-card space-y-5">
                {/* Path identity */}
                <div className="flex items-start gap-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${recommendedPath.color}20` }}
                  >
                    <PathIcon className="w-7 h-7" style={{ color: recommendedPath.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-text">{recommendedPath.name}</h3>
                    <p className="text-sm font-medium mt-0.5" style={{ color: recommendedPath.color }}>
                      {recommendedPath.tagline}
                    </p>
                    <p className="text-sm text-text-muted mt-2 leading-relaxed">
                      {recommendedPath.description}
                    </p>
                  </div>
                </div>

                {/* Stats row */}
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-1.5 text-text-muted">
                    <Clock className="w-4 h-4" />
                    <span>{recommendedPath.estimatedHours} hours</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-text-muted">
                    <BookOpen className="w-4 h-4" />
                    <span>{recommendedPath.totalLevels} levels</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-text-muted">
                    <Layers className="w-4 h-4" />
                    <span>{recommendedPath.trackSequence.length} tracks</span>
                  </div>
                </div>

                {/* Curriculum overview */}
                <div>
                  <h4 className="text-xs font-medium text-text-muted uppercase tracking-wide mb-3">
                    Your Curriculum
                  </h4>
                  <div className="space-y-2">
                    {coreTracks.map((track, idx) => (
                      <div key={track.trackSlug} className="flex items-start gap-3">
                        <div className="relative flex flex-col items-center">
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                            style={{ backgroundColor: recommendedPath.color }}
                          >
                            {idx + 1}
                          </div>
                          {idx < coreTracks.length - 1 && (
                            <div className="w-px h-full min-h-[16px] bg-border mt-1" />
                          )}
                        </div>
                        <div className="pb-2">
                          <div className="text-sm font-medium text-text">{track.label}</div>
                          <div className="text-xs text-text-muted">{track.description}</div>
                        </div>
                      </div>
                    ))}
                    {optionalTracks.length > 0 && (
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white/70 flex-shrink-0 bg-bg-lighter border border-border">
                          +
                        </div>
                        <div className="text-xs text-text-muted pt-1">
                          Plus {optionalTracks.length} optional {optionalTracks.length === 1 ? 'track' : 'tracks'}:{' '}
                          {optionalTracks.map((t) => t.label).join(', ')}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Example roles badges */}
                <div>
                  <h4 className="text-xs font-medium text-text-muted uppercase tracking-wide mb-2">
                    Perfect for
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {recommendedPath.exampleRoles.slice(0, 8).map((exRole) => (
                      <span
                        key={exRole}
                        className="px-2.5 py-1 text-xs rounded-full border"
                        style={{
                          borderColor: `${recommendedPath.color}40`,
                          color: recommendedPath.accentColor,
                          backgroundColor: `${recommendedPath.color}10`,
                        }}
                      >
                        {exRole}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* View other paths toggle */}
            <div>
              <button
                onClick={() => setShowOtherPaths(!showOtherPaths)}
                className="flex items-center gap-2 text-sm text-text-muted hover:text-text transition-colors mx-auto"
              >
                <span>View Other Paths</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${showOtherPaths ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {showOtherPaths && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                      {otherPaths.map((path) => {
                        const OtherIcon = PATH_ICONS[path.icon] || Briefcase;
                        return (
                          <div
                            key={path.id}
                            className="p-4 rounded-xl bg-bg-card border border-border hover:border-border-hover transition-colors"
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <div
                                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                                style={{ backgroundColor: `${path.color}20` }}
                              >
                                <OtherIcon className="w-5 h-5" style={{ color: path.color }} />
                              </div>
                              <div>
                                <div className="font-medium text-text text-sm">{path.name}</div>
                                <div className="text-xs text-text-muted">{path.tagline}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-text-muted mt-2">
                              <span>{path.estimatedHours}h</span>
                              <span>{path.totalLevels} levels</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        );
      }
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 'department': return !!selectedDepartment;
      case 'role': return role.trim().length > 0;
      case 'experience': return !!experienceLevel;
      case 'goals': return true; // Goals are optional
      case 'recommendations': return true;
    }
  };

  const stepNumber = () => {
    const steps: OnboardingStep[] = ['department', 'role', 'experience', 'goals', 'recommendations'];
    return steps.indexOf(currentStep) + 1;
  };

  return (
    <main className="min-h-screen bg-bg flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-claude/20 to-claude/10">
              <span className="text-2xl font-bold text-claude">C</span>
            </div>
            <span className="font-bold text-lg tracking-tight text-claude">Claude Academy</span>
          </div>

          {/* Progress indicator */}
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`
                  w-2 h-2 rounded-full transition-all
                  ${step <= stepNumber() ? 'bg-claude' : 'bg-border'}
                  ${step === stepNumber() ? 'w-4' : ''}
                `}
              />
            ))}
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4 pt-24 pb-32">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-bg/80 backdrop-blur-xl border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {currentStep !== 'department' ? (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-4 py-2 text-text-muted hover:text-text transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep === 'recommendations' ? (
            <button
              onClick={handleComplete}
              className="flex items-center gap-2 px-8 py-3 rounded-xl font-medium transition-colors text-white shadow-glow-claude"
              style={{
                backgroundColor: recommendedPath?.color || 'var(--color-claude)',
              }}
            >
              <span>Start This Path</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!canProceed() || isAnimating}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all
                ${canProceed()
                  ? 'bg-claude hover:bg-claude-dark text-white shadow-glow-claude'
                  : 'bg-bg-card text-text-muted cursor-not-allowed'
                }
              `}
            >
              <span>Continue</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </footer>
    </main>
  );
}
