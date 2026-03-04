'use client';

import { useEffect, useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  Layers,
  Terminal,
  Clock,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Star,
  ArrowRight,
  ArrowLeft,
  Shield,
  Zap,
  Target,
  Users,
  FileText,
  MessageSquare,
  Workflow,
  Code,
  Server,
  Settings,
  Award,
  Sparkles,
  Play,
} from 'lucide-react';
import { getPath } from '@/lib/paths';
import { getTrack, getTrackLevels } from '@/lib/tracks';
import { useProgress } from '@/context/ProgressContext';
import { PathProgressBar } from '@/components/PathProgressBar';
import type { RolePath, PathTrackEntry, PathTier } from '@/lib/types';

// Map icon strings to components
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  briefcase: Briefcase,
  layers: Layers,
  terminal: Terminal,
};

// Mastery outcomes by tier
const MASTERY_OUTCOMES: Record<
  PathTier,
  { icon: React.ComponentType<{ className?: string }>; title: string; description: string }[]
> = {
  'non-technical': [
    {
      icon: MessageSquare,
      title: 'Expert Prompting',
      description:
        'Craft precise, effective prompts that get the results you need on the first try.',
    },
    {
      icon: FileText,
      title: 'Document Analysis',
      description:
        'Upload and analyze contracts, reports, and spreadsheets with Claude.',
    },
    {
      icon: Workflow,
      title: 'Project Workflows',
      description:
        'Build reusable Projects and Artifacts that streamline recurring work.',
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description:
        'Share Claude workflows with your team and standardize AI usage.',
    },
  ],
  hybrid: [
    {
      icon: Target,
      title: 'Advanced Projects',
      description:
        'Design multi-step Claude Projects that combine analysis, writing, and automation.',
    },
    {
      icon: Workflow,
      title: 'Workflow Automation',
      description:
        'Automate repetitive tasks using Skills, templates, and integrations.',
    },
    {
      icon: Code,
      title: 'Technical Literacy',
      description:
        'Understand APIs and developer workflows well enough to spec and collaborate.',
    },
    {
      icon: Settings,
      title: 'Enterprise Management',
      description:
        'Deploy Claude for teams with SSO, Slack, and organizational controls.',
    },
  ],
  technical: [
    {
      icon: Terminal,
      title: 'Claude Code CLI',
      description:
        'Full proficiency with hooks, skills, IDE integration, and agentic workflows.',
    },
    {
      icon: Code,
      title: 'API Development',
      description:
        'Build production applications with streaming, tool use, vision, and batch processing.',
    },
    {
      icon: Server,
      title: 'MCP Servers',
      description:
        'Design and ship custom Model Context Protocol servers and connectors.',
    },
    {
      icon: Shield,
      title: 'Enterprise Deployment',
      description:
        'SSO, SCIM provisioning, audit logs, and platform-level security.',
    },
  ],
};

interface TrackAccordionProps {
  entry: PathTrackEntry;
  index: number;
  total: number;
  pathColor: string;
}

function TrackAccordion({ entry, index, total, pathColor }: TrackAccordionProps) {
  const [isOpen, setIsOpen] = useState(index === 0);

  const track = getTrack(entry.trackSlug);
  const allLevels = getTrackLevels(entry.trackSlug);

  const levels = useMemo(() => {
    if (entry.selectedLevels && entry.selectedLevels.length > 0) {
      return allLevels.filter((l) => entry.selectedLevels!.includes(l.levelNumber));
    }
    return allLevels;
  }, [allLevels, entry.selectedLevels]);

  const totalMinutes = levels.reduce((sum, l) => sum + l.estimatedMinutes, 0);
  const totalXp = levels.reduce((sum, l) => sum + l.xpReward, 0);

  const isLast = index === total - 1;

  return (
    <div className="relative flex gap-6">
      {/* Timeline connector */}
      <div className="flex flex-col items-center flex-shrink-0">
        {/* Circle node */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 * index, type: 'spring', stiffness: 200 }}
          className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg border-2"
          style={{
            borderColor: pathColor,
            background: `linear-gradient(135deg, ${pathColor}30, ${pathColor}10)`,
          }}
        >
          {index + 1}
        </motion.div>
        {/* Vertical line */}
        {!isLast && (
          <div
            className="w-0.5 flex-1 min-h-8"
            style={{ backgroundColor: `${pathColor}30` }}
          />
        )}
      </div>

      {/* Card content */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 * index + 0.05 }}
        className={`flex-1 mb-6 ${isLast ? '' : ''}`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left group rounded-2xl bg-bg-light/80 border border-border hover:border-border-hover backdrop-blur-sm p-6 transition-all duration-300"
          style={{
            borderColor: isOpen ? `${pathColor}40` : undefined,
          }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h3 className="text-lg font-bold text-text">{entry.label}</h3>
                {entry.isCore && (
                  <span
                    className="px-2.5 py-0.5 text-xs font-semibold rounded-full"
                    style={{
                      backgroundColor: `${pathColor}20`,
                      color: pathColor,
                    }}
                  >
                    Core
                  </span>
                )}
              </div>
              <p className="text-text-soft text-sm leading-relaxed">{entry.description}</p>
              <div className="flex items-center gap-4 mt-3 text-xs text-text-muted">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  {levels.length} lessons
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {totalMinutes} min
                </span>
                <span className="flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5" />
                  {totalXp.toLocaleString()} XP
                </span>
              </div>
            </div>
            <div className="flex-shrink-0 mt-1">
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-5 h-5 text-text-muted" />
              </motion.div>
            </div>
          </div>
        </button>

        {/* Expanded level list */}
        <AnimatePresence>
          {isOpen && levels.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="pt-2 space-y-1">
                {levels.map((level, levelIdx) => (
                  <motion.div
                    key={level.levelNumber}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: levelIdx * 0.03 }}
                    className="flex items-center gap-4 px-6 py-3 rounded-xl bg-bg-card/50 hover:bg-bg-card transition-colors group/level"
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{
                        backgroundColor: `${pathColor}15`,
                        color: pathColor,
                      }}
                    >
                      {level.levelNumber}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text truncate">
                        {level.title}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-text-muted flex-shrink-0">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {level.estimatedMinutes}m
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        {level.xpReward} XP
                      </span>
                    </div>
                    {track && (
                      <Link
                        href={`/tracks/${entry.trackSlug}?level=${level.levelNumber}`}
                        className="opacity-0 group-hover/level:opacity-100 transition-opacity"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ChevronRight
                          className="w-4 h-4 text-text-muted hover:text-text transition-colors"
                        />
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default function PathDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { learningPath, setLearningPath, getPathProgress, completedLevels } = useProgress();

  const slug = typeof params.slug === 'string' ? params.slug : '';
  const path = getPath(slug);

  const isActivePath = learningPath === slug;
  const isOnDifferentPath = !!learningPath && learningPath !== slug;
  const pathProgress = isActivePath ? getPathProgress() : null;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !path) {
      router.push('/paths');
    }
  }, [mounted, path, router]);

  const handleStartPath = () => {
    if (!path) return;
    setLearningPath(slug);
    // Navigate to first track's first level
    const firstTrack = path.trackSequence[0];
    if (firstTrack) {
      const levels = getTrackLevels(firstTrack.trackSlug);
      const firstLevel = firstTrack.selectedLevels?.[0] || levels[0]?.levelNumber || 1;
      router.push(`/tracks/${firstTrack.trackSlug}/${firstLevel}`);
    }
  };

  const handleContinuePath = () => {
    if (pathProgress?.nextRecommendedLevel) {
      router.push(`/tracks/${pathProgress.nextRecommendedLevel.trackSlug}/${pathProgress.nextRecommendedLevel.levelNumber}`);
    }
  };

  const handleSwitchPath = () => {
    setLearningPath(slug);
  };

  if (!mounted || !path) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-claude border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const PathIcon = ICON_MAP[path.icon] || Briefcase;
  const masteryOutcomes = MASTERY_OUTCOMES[path.tier];

  // Calculate total XP across all tracks
  const totalXp = path.trackSequence.reduce((sum, entry) => {
    const allLevels = getTrackLevels(entry.trackSlug);
    const levels =
      entry.selectedLevels && entry.selectedLevels.length > 0
        ? allLevels.filter((l) => entry.selectedLevels!.includes(l.levelNumber))
        : allLevels;
    return sum + levels.reduce((s, l) => s + l.xpReward, 0);
  }, 0);

  return (
    <main className="min-h-screen bg-bg pb-24">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Background gradients */}
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 80rem 50rem at 50% -10%, ${path.color}15, transparent)`,
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_40%_at_50%_0%,black_10%,transparent_100%)]" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href="/paths"
              className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              All Learning Paths
            </Link>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-start gap-8">
            {/* Left: Icon + Text */}
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-5 mb-6"
              >
                {/* Path icon with glow */}
                <div className="relative">
                  <div
                    className="absolute inset-0 blur-2xl opacity-40 rounded-full"
                    style={{ backgroundColor: path.color }}
                  />
                  <div
                    className="relative w-20 h-20 rounded-2xl flex items-center justify-center border"
                    style={{
                      background: `linear-gradient(135deg, ${path.color}25, ${path.color}08)`,
                      borderColor: `${path.color}40`,
                    }}
                  >
                    <span style={{ color: path.color }}>
                      <PathIcon className="w-10 h-10" />
                    </span>
                  </div>
                </div>

                <div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-text tracking-tight">
                    {path.name}
                  </h1>
                  <p
                    className="text-lg font-medium mt-1"
                    style={{ color: path.accentColor }}
                  >
                    {path.tagline}
                  </p>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-text-soft text-base leading-relaxed max-w-2xl mb-8"
              >
                {path.description}
              </motion.p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="flex flex-wrap gap-6 mb-8"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-text-muted" />
                  <span className="text-sm text-text-muted">
                    <span className="font-semibold text-text">{path.totalLevels}</span> lessons
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-text-muted" />
                  <span className="text-sm text-text-muted">
                    <span className="font-semibold text-text">{path.estimatedHours}</span> hours
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-text-muted" />
                  <span className="text-sm text-text-muted">
                    <span className="font-semibold text-text">{path.trackSequence.length}</span>{' '}
                    tracks
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-text-muted" />
                  <span className="text-sm text-text-muted">
                    <span className="font-semibold text-text">{totalXp.toLocaleString()}</span> XP
                  </span>
                </div>
              </motion.div>

              {/* Example roles */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-3">
                  Built for roles like
                </p>
                <div className="flex flex-wrap gap-2">
                  {path.exampleRoles.map((role) => (
                    <span
                      key={role}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg border"
                      style={{
                        backgroundColor: `${path.color}08`,
                        borderColor: `${path.color}20`,
                        color: path.accentColor,
                      }}
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right: CTA card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="lg:w-80 flex-shrink-0"
            >
              <div
                className="rounded-2xl p-6 border backdrop-blur-sm"
                style={{
                  background: `linear-gradient(135deg, ${path.color}10, transparent)`,
                  borderColor: `${path.color}25`,
                }}
              >
                {/* Path progress if active */}
                {isActivePath && pathProgress && (
                  <div className="mb-5">
                    <PathProgressBar showNextStep={false} />
                  </div>
                )}

                {!isActivePath && (
                  <div className="text-center mb-5">
                    <div className="text-3xl font-extrabold text-text mb-1">
                      {path.estimatedHours}h
                    </div>
                    <p className="text-sm text-text-muted">to completion</p>
                  </div>
                )}

                {/* Start / Continue / Switch buttons */}
                {isActivePath && pathProgress?.nextRecommendedLevel ? (
                  <button
                    onClick={handleContinuePath}
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-white font-bold text-sm transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      backgroundColor: path.color,
                      boxShadow: `0 0 20px ${path.color}30`,
                    }}
                  >
                    <Play className="w-4 h-4" />
                    Continue Path
                  </button>
                ) : isOnDifferentPath ? (
                  <div className="space-y-2">
                    <button
                      onClick={handleSwitchPath}
                      className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-white font-bold text-sm transition-all duration-300 hover:scale-[1.02]"
                      style={{
                        backgroundColor: path.color,
                        boxShadow: `0 0 20px ${path.color}30`,
                      }}
                    >
                      <Play className="w-4 h-4" />
                      Switch to This Path
                    </button>
                    <p className="text-xs text-text-muted text-center">
                      You are currently on a different path
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={handleStartPath}
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-white font-bold text-sm transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      backgroundColor: path.color,
                      boxShadow: `0 0 20px ${path.color}30`,
                    }}
                  >
                    <Play className="w-4 h-4" />
                    Start This Path
                  </button>
                )}

                {!isActivePath && !isOnDifferentPath && (
                  <p className="text-xs text-text-muted text-center mt-3">
                    Begin with {path.trackSequence[0]?.label}
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Curriculum / Syllabus Section */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-10"
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text mb-3">
              Your Learning Journey
            </h2>
            <p className="text-text-soft text-base max-w-2xl">
              {path.trackSequence.length} tracks, {path.totalLevels} lessons, organized in a clear
              sequence from foundations to mastery.
            </p>
          </motion.div>

          {/* Timeline */}
          <div>
            {path.trackSequence.map((entry, index) => (
              <TrackAccordion
                key={entry.trackSlug}
                entry={entry}
                index={index}
                total={path.trackSequence.length}
                pathColor={path.color}
              />
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Master Section */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text mb-3">
              What You will Master
            </h2>
            <p className="text-text-soft text-base">
              Key skills and outcomes you will gain by completing this path.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {masteryOutcomes.map((outcome, index) => {
              const OutcomeIcon = outcome.icon;
              return (
                <motion.div
                  key={outcome.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group rounded-2xl bg-bg-light/60 border border-border hover:border-border-hover p-6 transition-all duration-300"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{
                      background: `linear-gradient(135deg, ${path.color}20, ${path.color}08)`,
                    }}
                  >
                    <span style={{ color: path.color }}>
                      <OutcomeIcon className="w-6 h-6" />
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-text mb-2">{outcome.title}</h3>
                  <p className="text-sm text-text-soft leading-relaxed">
                    {outcome.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl p-10 text-center border relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${path.color}12, transparent)`,
              borderColor: `${path.color}25`,
            }}
          >
            {/* Subtle glow */}
            <div
              className="absolute -top-32 -right-32 w-64 h-64 rounded-full blur-3xl opacity-20"
              style={{ backgroundColor: path.color }}
            />
            <div
              className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full blur-3xl opacity-10"
              style={{ backgroundColor: path.color }}
            />

            <div className="relative z-10">
              <span style={{ color: path.color }} className="inline-block mx-auto mb-4">
                <Award className="w-12 h-12" />
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-text mb-3">
                Ready to become a {path.name}?
              </h3>
              <p className="text-text-soft mb-8 max-w-lg mx-auto">
                {path.totalLevels} lessons, {path.estimatedHours} hours, and{' '}
                {totalXp.toLocaleString()} XP standing between you and mastery.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {isActivePath && pathProgress?.nextRecommendedLevel ? (
                  <button
                    onClick={handleContinuePath}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-white font-bold transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      backgroundColor: path.color,
                      boxShadow: `0 0 25px ${path.color}30`,
                    }}
                  >
                    <Play className="w-5 h-5" />
                    Continue Path
                    <ArrowRight className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    onClick={handleStartPath}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-white font-bold transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      backgroundColor: path.color,
                      boxShadow: `0 0 25px ${path.color}30`,
                    }}
                  >
                    <Play className="w-5 h-5" />
                    {isOnDifferentPath ? 'Switch to This Path' : 'Start This Path'}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                )}
                <Link
                  href="/upgrade"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold border-2 border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                >
                  <Sparkles className="w-5 h-5" />
                  Get Full Access
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
