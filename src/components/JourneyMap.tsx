"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useProgress } from '@/context/ProgressContext';
import { Check, Lock, Star, Zap, Trophy, Target, Play, Clock, Award, Map, Code, Terminal, Palette, Globe, Rocket, ArrowRight, CheckCircle, Circle, ChevronRight, BookOpen, Layers } from 'lucide-react';
import { learningPaths, getLearningPath } from '@/data/learningPaths';


export default function JourneyMap() {
  const { unlockedLevels, completedLevels, plan, userEmail, xp, selectedAiCli, project, character } = useProgress();

  // Get the appropriate learning path based on CLI selection
  const currentPath = getLearningPath(selectedAiCli || null);

  // Convert learning path levels to roadmap format - Better Grid Layout
  const roadmapSteps = [
    {
      id: 0,
      name: 'Setup Wizard',
      title: 'Foundation Camp',
      icon: Terminal,
      description: 'Choose your AI CLI and setup your dev environment',
      longDescription: 'Master the fundamentals of using AI-powered coding tools and get your environment ready.',
      difficulty: 'Beginner',
      estimatedTime: '5 min',
      xpReward: 250,
      free: true,
      category: 'setup',
      landmark: 'Base Camp'
    },
    ...currentPath.levels.map((level, index) => ({
      id: level.id,
      name: level.title,
      title: level.title,
      icon: level.category === 'setup' ? Terminal :
            level.category === 'coding' ? Code :
            level.category === 'deployment' ? Globe :
            Rocket,
      description: level.description,
      longDescription: `${level.description}. Focus: ${level.focus}`,
      difficulty: currentPath.difficulty === 'beginner' ? 'Beginner' :
                  currentPath.difficulty === 'intermediate' ? 'Intermediate' : 'Advanced',
      estimatedTime: level.estimatedTime,
      xpReward: level.xpReward,
      free: currentPath.id === 'codex', // Codex starter track is accessible on the free plan
      category: level.category,
      landmark: level.tools.join(', ')
    }))
  ];

  const getStepStatus = (step: typeof roadmapSteps[0]) => {
    // If completed, show as completed
    if (completedLevels.includes(step.id)) return 'completed';

    // Always allow access to first two levels (free content)
    if (step.id <= 1) return 'unlocked';

    // Check if user has full plan for premium content
    if (plan === 'full') return 'unlocked';

    // Check admin access
    const isAdmin = userEmail?.toLowerCase().includes('gabe@onewave-ai.com') || userEmail?.toLowerCase().includes('gked21@gmail.com');
    if (isAdmin) return 'unlocked';

    // Check if specifically unlocked
    if (unlockedLevels.includes(step.id)) return 'unlocked';

    return 'locked';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'Intermediate': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'Advanced': return 'text-red-400 bg-red-500/10 border-red-500/20';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  // Get project-specific description for a level
  const getProjectDescription = (step: typeof roadmapSteps[0]) => {
    if (!project) return step.description;

    const projectDescriptions: Record<number, Record<string, string>> = {
      0: {
        portfolio: "Set up your development environment to build your professional portfolio website",
        'recipe-app': "Configure AI tools to help you create your recipe sharing application",
        blog: "Prepare your coding setup for building your personal blog platform",
        'creative-showcase': "Get your creative tools ready for building your artistic portfolio",
        dashboard: "Set up your development workspace for building data visualization dashboards",
        'landing-page': "Configure your environment for creating high-converting landing pages",
        custom: `Set up your development environment to build ${project.name}`
      },
      1: {
        portfolio: `Build the homepage for your professional portfolio showcasing your skills to ${project.audience}`,
        'recipe-app': "Create an appetizing homepage for your recipe sharing platform with beautiful food imagery",
        blog: "Design a clean, readable blog homepage that engages your readers and showcases your writing",
        'creative-showcase': "Build a stunning visual homepage that immediately showcases your creative work",
        dashboard: "Create a professional dashboard interface with clean data visualization layouts",
        'landing-page': "Build a high-converting landing page optimized for your target audience",
        custom: `Start building ${project.name} with your first interactive webpage`
      }
    };

    const template = project.template || 'custom';
    return projectDescriptions[step.id]?.[template] || step.description;
  };

  const totalSteps = roadmapSteps.length;
  const completedSteps = completedLevels.length;

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Background mesh */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(45rem_50rem_at_top,rgba(47,201,244,0.2),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(50rem_45rem_at_bottom,rgba(0,199,189,0.15),transparent)]" />
        </div>

        <div className="relative">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur">
                <Map className="h-4 w-4 text-primary" />
                <span className="text-white/90">Navigate through your coding journey</span>
              </div>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6">
              <span className="text-gradient-primary">{currentPath.name}</span> Journey
            </h1>
            <p className="mx-auto max-w-3xl text-lg leading-8 text-white/70 mb-6">
              {currentPath.description}
            </p>

            {/* Project Integration */}
            {project && (
              <div className="max-w-4xl mx-auto mb-8">
                <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-2xl p-6 border border-emerald-500/20 backdrop-blur">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                    <h3 className="text-xl font-semibold text-white">Building: {project.name}</h3>
                  </div>
                  <p className="text-white/80 mb-4">{project.description}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-emerald-400" />
                      <span className="text-white/70">Target: {project.audience}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span className="text-white/70">Timeline: {project.timeline}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-purple-400" />
                      <span className="text-white/70">{project.template} project</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Path Info */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 rounded-full border border-zinc-700">
                <span className="text-sm text-white/60">Target:</span>
                <span className="text-sm font-medium text-white">{currentPath.targetAudience}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 rounded-full border border-zinc-700">
                <span className="text-sm text-white/60">Cost:</span>
                <span className={`text-sm font-medium ${
                  currentPath.cost === 'FREE' ? 'text-emerald-400' : 'text-amber-400'
                }`}>{currentPath.cost}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 rounded-full border border-zinc-700">
                <span className="text-sm text-white/60">Level:</span>
                <span className="text-sm font-medium text-primary capitalize">{currentPath.difficulty}</span>
              </div>
            </div>

            {/* Path Switch Notice */}
            {!selectedAiCli && (
              <div className="max-w-2xl mx-auto mb-8 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                <p className="text-amber-200 text-sm">
                  <strong>No AI CLI selected yet!</strong> Complete the Introduction to choose your learning path and unlock customized content.
                </p>
              </div>
            )}
          </div>

          {/* Enhanced Stats with Character Context */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12">
            <div className="rounded-2xl bg-zinc-900/70 p-6 ring-1 ring-white/10 backdrop-blur text-center">
              <div className="text-3xl font-bold text-primary">{completedSteps}</div>
              <div className="text-sm text-white/60">Completed</div>
            </div>
            <div className="rounded-2xl bg-zinc-900/70 p-6 ring-1 ring-white/10 backdrop-blur text-center">
              <div className="text-3xl font-bold text-secondary">{totalSteps}</div>
              <div className="text-sm text-white/60">Total Levels</div>
            </div>
            <div className="rounded-2xl bg-zinc-900/70 p-6 ring-1 ring-white/10 backdrop-blur text-center">
              <div className="text-3xl font-bold text-yellow-400">{xp}</div>
              <div className="text-sm text-white/60">XP Earned</div>
            </div>
            <div className="rounded-2xl bg-zinc-900/70 p-6 ring-1 ring-white/10 backdrop-blur text-center">
              <div className="text-2xl font-bold text-primary">
                {character === 1 ? 'B' : character === 2 ? 'T' : character === 3 ? 'H' : 'D'}
              </div>
              <div className="text-sm text-white/60">
                {character === 1 ? 'Business Builder' : character === 2 ? 'Tech Engineer' : character === 3 ? 'Full-Stack Hybrid' : 'Developer'}
              </div>
            </div>
          </div>

          {/* Professional Timeline Journey Map */}
          <div className="space-y-12">
            {/* Journey Title */}
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-6">Your Development Path</h2>
              <p className="text-xl text-white/70 mb-8 max-w-3xl mx-auto">
                Master AI-powered development through a structured, professional learning journey
              </p>

              {/* Professional Progress Bar */}
              <div className="max-w-2xl mx-auto mb-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm text-white/60 gap-2 mb-2">
                  <span>Progress</span>
                  <span>{Math.round((completedSteps / totalSteps) * 100)}% Complete</span>
                </div>
                <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${(completedSteps / totalSteps) * 100}%` }}
                  >
                    <div className="h-full bg-white/20 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>

              <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full mx-auto"></div>
            </div>

            {/* Professional Timeline */}
            <div className="relative max-w-4xl mx-auto">
              {/* Central Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-emerald-400 via-blue-500 to-purple-500 rounded-full">
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-400/30 via-blue-500/30 to-purple-500/30 blur-sm rounded-full"></div>
              </div>

              {/* Timeline Steps */}
              <div className="space-y-16">
              {roadmapSteps.map((step, index) => {
                const status = getStepStatus(step);
                const Icon = step.icon;
                const isClickable = status === 'unlocked' || status === 'completed';

                return (
                  <motion.div
                    key={step.id}
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    {isClickable ? (
                      <Link href={`/level/${step.id}`} className="group block">
                        <motion.div
                          className={`rounded-2xl p-4 md:p-6 ring-1 backdrop-blur transition-all duration-300 relative overflow-hidden min-h-[200px] ${
                            status === 'completed'
                              ? 'bg-emerald-500/10 ring-emerald-400/30 hover:bg-emerald-500/20'
                              : status === 'unlocked'
                              ? 'bg-primary/10 ring-primary/30 hover:bg-primary/20'
                              : 'bg-zinc-800/50 ring-white/10'
                          }`}
                          whileHover={isClickable ? { scale: 1.02, y: -4 } : {}}
                          whileTap={isClickable ? { scale: 0.98 } : {}}
                        >
                          {/* Level Number Badge */}
                          <div className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            status === 'completed'
                              ? 'bg-emerald-500 text-white'
                              : status === 'unlocked'
                              ? 'bg-primary text-white'
                              : 'bg-zinc-700 text-zinc-400'
                          }`}>
                            {step.id}
                          </div>

                          {/* Completion Glow Effect */}
                          {status === 'completed' && (
                            <motion.div
                              className="absolute inset-0 bg-emerald-400/10 rounded-2xl"
                              animate={{
                                opacity: [0.1, 0.3, 0.1],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            />
                          )}

                          {/* Pulsing animation for unlocked levels */}
                          {status === 'unlocked' && (
                            <motion.div
                              className="absolute inset-0 rounded-2xl ring-2 ring-primary/50"
                              animate={{
                                scale: [1, 1.02, 1],
                                opacity: [0.5, 0.8, 0.5],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            />
                          )}

                          {/* Icon and Status */}
                          <div className="flex flex-col sm:flex-row items-start gap-4 mb-4">
                            <div className={`p-3 rounded-xl ${
                              status === 'completed'
                                ? 'bg-emerald-500/20'
                                : status === 'unlocked'
                                ? 'bg-primary/20'
                                : 'bg-zinc-700/50'
                            }`}>
                              {status === 'completed' ? (
                                <Check className="w-6 h-6 text-emerald-400" />
                              ) : (
                                <Icon className={`w-6 h-6 ${
                                  status === 'unlocked' ? 'text-primary' : 'text-zinc-500'
                                }`} />
                              )}
                            </div>

                            <div className="flex-1">
                              <h3 className={`font-bold text-lg mb-1 ${
                                isClickable ? 'text-white' : 'text-zinc-400'
                              }`}>
                                {step.title}
                              </h3>
                              <p className={`text-sm ${
                                isClickable ? 'text-white/70' : 'text-zinc-500'
                              }`}>
                                {getProjectDescription(step)}
                              </p>
                            </div>
                          </div>

                          {/* Metadata */}
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
                            <div className="flex flex-wrap items-center gap-3">
                              <span className={`px-2 py-1 rounded border ${getDifficultyColor(step.difficulty)}`}>
                                {step.difficulty}
                              </span>
                              <span className={isClickable ? 'text-white/60' : 'text-zinc-600'}>
                                {step.estimatedTime}
                              </span>
                            </div>
                            <div className={`flex items-center gap-1 ${
                              isClickable ? 'text-yellow-400' : 'text-zinc-600'
                            }`}>
                              <Star className="w-3 h-3" />
                              <span className="font-medium">+{step.xpReward} XP</span>
                            </div>
                          </div>

                          {/* Progress Indicator */}
                          {status === 'completed' && (
                            <div className="mt-4 flex items-center gap-2 text-emerald-400 text-sm font-medium">
                              <CheckCircle className="w-4 h-4" />
                              <span>Completed!</span>
                            </div>
                          )}

                          {status === 'unlocked' && (
                            <div className="mt-4 flex items-center gap-2 text-primary text-sm font-medium">
                              <Play className="w-4 h-4" />
                              <span>Ready to start</span>
                            </div>
                          )}
                        </motion.div>
                      </Link>
                    ) : (
                      <div className="rounded-2xl p-4 md:p-6 ring-1 ring-zinc-700/50 bg-zinc-800/30 backdrop-blur opacity-60 min-h-[200px]">
                        {/* Level Number Badge */}
                        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-700 text-zinc-400 flex items-center justify-center text-sm font-bold">
                          {step.id}
                        </div>

                        {/* Icon and Status */}
                        <div className="flex flex-col sm:flex-row items-start gap-4 mb-4">
                          <div className="p-3 rounded-xl bg-zinc-700/50">
                            <Lock className="w-6 h-6 text-zinc-500" />
                          </div>

                          <div className="flex-1">
                            <h3 className="font-bold text-lg mb-1 text-zinc-400">
                              {step.title}
                            </h3>
                            <p className="text-sm text-zinc-500">
                              {getProjectDescription(step)}
                            </p>
                          </div>
                        </div>

                        {/* Locked Metadata */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
                          <span className="px-2 py-1 rounded border border-zinc-600 text-zinc-500">
                            Locked
                          </span>
                          <div className="flex items-center gap-1 text-zinc-600">
                            <Star className="w-3 h-3" />
                            <span className="font-medium">+{step.xpReward} XP</span>
                          </div>
                        </div>

                        <div className="mt-4 text-zinc-500 text-sm">
                          Complete previous levels to unlock
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
              </div>
            </div>

            {/* Progress Visualization */}
            <div className="max-w-2xl mx-auto">
              <div className="bg-zinc-900/50 rounded-2xl p-6 ring-1 ring-white/10 backdrop-blur">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Journey Progress</h3>
                  <p className="text-white/60 text-sm">
                    Complete all levels to become a professional AI developer
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-white/80 mb-2">
                  <span>Progress</span>
                  <span>{completedSteps}/{totalSteps} Levels</span>
                </div>

                <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full relative"
                    initial={{ width: 0 }}
                    animate={{ width: `${(completedSteps / totalSteps) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  >
                    {/* Animated shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="rounded-2xl bg-primary/5 p-8 ring-1 ring-primary/20 backdrop-blur">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Begin Your Adventure?
              </h3>
              <p className="text-white/70 mb-8 max-w-2xl mx-auto">
                Start your journey through the coding realms. Master Claude Code, build amazing projects, and unlock your potential.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/character-selection"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-secondary px-8 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                >
                  <Play className="w-5 h-5" />
                  Start Adventure
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/upgrade"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold text-white backdrop-blur hover:bg-white/10 transition-colors"
                >
                  <Trophy className="w-5 h-5" />
                  Unlock Full Journey
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
