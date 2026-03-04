'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Trophy,
  Flame,
  Sparkles,
  ChevronRight,
  Award,
  BookOpen,
  Map,
  ArrowRight,
  Play,
  CheckCircle,
} from 'lucide-react';
import { getAllTracks, getTrackLevels } from '@/lib/tracks';
import { getAllPaths } from '@/lib/paths';
import { useProgress } from '@/context/ProgressContext';
import { getTrackCompletionInfo } from '@/lib/recommendations';
import { PathProgressBar } from '@/components/PathProgressBar';
import { NextStepCard } from '@/components/NextStepCard';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { TypewriterText } from '@/components/TypewriterText';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function DashboardPage() {
  const router = useRouter();
  const { xp, achievements, completedLevels, userEmail, learningPath, getPathProgress } = useProgress();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !userEmail) {
      router.push('/login');
    }
  }, [mounted, userEmail, router]);

  const userLevel = Math.floor(xp / 500) + 1;
  const xpToNext = 500 - (xp % 500);
  const pathProgress = getPathProgress();
  const paths = getAllPaths();

  // Get active tracks (tracks user has started)
  const activeTracks = useMemo(() => {
    const allTracks = getAllTracks();
    return allTracks
      .map(track => {
        const info = getTrackCompletionInfo(track.slug, completedLevels);
        return info;
      })
      .filter(info => info && info.completedCount > 0 && !info.isComplete)
      .sort((a, b) => b!.percent - a!.percent) as NonNullable<ReturnType<typeof getTrackCompletionInfo>>[];
  }, [completedLevels]);

  // Get completed tracks for knowledge map preview
  const allTrackInfo = useMemo(() => {
    const allTracks = getAllTracks();
    return allTracks.map(track => getTrackCompletionInfo(track.slug, completedLevels)!).filter(Boolean);
  }, [completedLevels]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-claude border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-bg pt-24 pb-16 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80rem_50rem_at_50%_-20%,rgba(218,119,86,0.08),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60rem_40rem_at_80%_60%,rgba(37,99,235,0.05),transparent)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section 1: Welcome + Path Progress Hero */}
        <motion.div {...fadeUp} className="mb-10">
          <h1 className="text-3xl font-bold text-text mb-2">
            <TypewriterText
              text={`Welcome back${userEmail ? `, ${userEmail.split('@')[0]}` : ''}`}
              speed={30}
              delay={200}
              cursor={false}
            />
          </h1>

          {pathProgress ? (
            <div className="mt-4">
              <PathProgressBar className="mb-4" />
              {pathProgress.nextRecommendedLevel && (
                <Link
                  href={`/tracks/${pathProgress.nextRecommendedLevel.trackSlug}/${pathProgress.nextRecommendedLevel.levelNumber}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-claude text-white font-medium text-sm hover:opacity-90 transition-opacity"
                >
                  <Play className="w-4 h-4" />
                  Continue Learning
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          ) : (
            <div className="mt-4">
              <p className="text-text-soft mb-4">Choose a learning path to get started</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {paths.map((path, i) => (
                  <motion.div
                    key={path.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <Link
                      href={`/paths/${path.slug}`}
                      className="block p-4 rounded-xl border border-border bg-bg-card hover:border-border-hover transition-all group perspective-container"
                    >
                      <div className="card-3d">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                          style={{ backgroundColor: `${path.color}20` }}
                        >
                          <BookOpen className="w-5 h-5" style={{ color: path.color }} />
                        </div>
                        <h3 className="font-semibold text-text text-sm mb-1">{path.name}</h3>
                        <p className="text-xs text-text-muted line-clamp-2">{path.tagline}</p>
                        <div className="flex items-center gap-1 mt-2 text-xs font-medium" style={{ color: path.color }}>
                          <span>Explore</span>
                          <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Section 2: Quick Stats Row */}
        <motion.div
          {...fadeUp}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
        >
          {/* XP Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="perspective-container"
          >
            <div className="card-3d bg-bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 400, damping: 15 }}
                  className="w-10 h-10 rounded-lg bg-claude/20 flex items-center justify-center"
                >
                  <Sparkles className="w-5 h-5 text-claude" />
                </motion.div>
                <div>
                  <div className="text-2xl font-bold text-text">
                    <AnimatedCounter value={xp} format delay={400} duration={1500} />
                  </div>
                  <div className="text-xs text-text-muted">Total XP (Lv. {userLevel})</div>
                </div>
              </div>
              <div className="h-1.5 bg-border rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(xp % 500) / 5}%` }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="h-full bg-gradient-to-r from-claude to-primary rounded-full"
                />
              </div>
              <div className="text-xs text-text-muted mt-1">
                {xpToNext} XP to level {userLevel + 1}
              </div>
            </div>
          </motion.div>

          {/* Streak Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="perspective-container"
          >
            <div className="card-3d bg-bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.35, type: 'spring', stiffness: 400, damping: 15 }}
                  className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center"
                >
                  <Flame className="w-5 h-5 text-orange-500" />
                </motion.div>
                <div>
                  <div className="text-2xl font-bold text-text">
                    <AnimatedCounter value={completedLevels.length > 0 ? 1 : 0} delay={500} duration={600} />
                  </div>
                  <div className="text-xs text-text-muted">Day Streak</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Levels Completed Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="perspective-container"
          >
            <div className="card-3d bg-bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: 'spring', stiffness: 400, damping: 15 }}
                  className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center"
                >
                  <CheckCircle className="w-5 h-5 text-success" />
                </motion.div>
                <div>
                  <div className="text-2xl font-bold text-text">
                    <AnimatedCounter value={completedLevels.length} delay={600} duration={1000} />
                  </div>
                  <div className="text-xs text-text-muted">Levels Done</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Achievements Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="perspective-container"
          >
            <div className="card-3d bg-bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.45, type: 'spring', stiffness: 400, damping: 15 }}
                  className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center"
                >
                  <Trophy className="w-5 h-5 text-yellow-500" />
                </motion.div>
                <div>
                  <div className="text-2xl font-bold text-text">
                    <AnimatedCounter value={achievements.length} delay={700} duration={800} />
                  </div>
                  <div className="text-xs text-text-muted">Achievements</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Section 3: Smart Next Steps */}
        <motion.div
          {...fadeUp}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          <NextStepCard />
        </motion.div>

        {/* Section 4: Active Tracks */}
        {activeTracks.length > 0 && (
          <motion.div
            {...fadeUp}
            transition={{ delay: 0.3 }}
            className="mb-10"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-text">Active Tracks</h2>
              <Link
                href="/tracks"
                className="flex items-center gap-1 text-sm text-text-muted hover:text-text transition-colors"
              >
                Browse All Tracks
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeTracks.slice(0, 4).map(info => (
                <Link
                  key={info.track.slug}
                  href={`/tracks/${info.track.slug}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-bg-card border border-border hover:border-border-hover transition-all group"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${info.track.color}20` }}
                  >
                    <Sparkles className="w-6 h-6" style={{ color: info.track.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-text text-sm mb-1">{info.track.name}</h3>
                    <div className="flex items-center gap-3 text-xs text-text-muted mb-2">
                      <span>{info.completedCount}/{info.totalCount} levels</span>
                      <span>{info.percent}%</span>
                    </div>
                    <div className="h-1.5 bg-border rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${info.percent}%`, backgroundColor: info.track.color }}
                      />
                    </div>
                  </div>
                  {info.nextLevel && (
                    <div className="flex-shrink-0 text-right hidden sm:block">
                      <p className="text-xs text-text-muted">Next</p>
                      <p className="text-xs font-medium text-text truncate max-w-[120px]">{info.nextLevel.title}</p>
                    </div>
                  )}
                  <ChevronRight className="w-5 h-5 text-text-muted group-hover:text-text transition-colors flex-shrink-0" />
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* Section 5: Knowledge Map Preview */}
        <motion.div
          {...fadeUp}
          transition={{ delay: 0.35 }}
          className="mb-10"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-text">Knowledge Map</h2>
            <Link
              href="/knowledge-map"
              className="flex items-center gap-1 text-sm text-text-muted hover:text-text transition-colors"
            >
              View Full Map
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="rounded-xl border border-border bg-bg-card p-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {allTrackInfo.map((info, i) => {
                const circumference = 2 * Math.PI * 24;
                return (
                  <motion.div
                    key={info.track.slug}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.06, type: 'spring', stiffness: 300 }}
                  >
                    <Link
                      href={`/tracks/${info.track.slug}`}
                      className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-bg-lighter transition-colors group"
                    >
                      <div className="relative">
                        <svg width="56" height="56" viewBox="0 0 56 56" className="transform -rotate-90">
                          <circle
                            cx="28" cy="28" r="24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            className="text-border"
                          />
                          <motion.circle
                            cx="28" cy="28" r="24"
                            fill="none"
                            stroke={info.track.color}
                            strokeWidth="3"
                            strokeDasharray={circumference}
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset: circumference * (1 - info.percent / 100) }}
                            transition={{ delay: 0.6 + i * 0.08, duration: 1, ease: 'easeOut' }}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div
                          className="absolute inset-0 flex items-center justify-center text-xs font-bold"
                          style={{ color: info.completedCount > 0 ? info.track.color : undefined }}
                        >
                          {info.isComplete ? (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.8 + i * 0.08, type: 'spring' }}
                            >
                              <CheckCircle className="w-5 h-5 text-success" />
                            </motion.div>
                          ) : (
                            <span className={info.completedCount > 0 ? '' : 'text-text-muted'}>
                              <AnimatedCounter value={info.percent} delay={600 + i * 80} duration={1000} suffix="%" />
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-xs text-text-muted text-center line-clamp-1 group-hover:text-text transition-colors">
                        {info.track.name.replace('Claude ', '').replace('Anthropic ', '')}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Section 6: Recent Achievements & Quick Actions */}
        <motion.div
          {...fadeUp}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Achievements */}
          <Link
            href="/achievements"
            className="flex items-center justify-between p-5 bg-bg-card border border-border rounded-xl hover:border-border-hover transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <Award className="w-5 h-5 text-yellow-500" />
              </div>
              <div>
                <h3 className="font-semibold text-text mb-0.5">Achievements</h3>
                <p className="text-sm text-text-soft">{achievements.length} unlocked</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-text-muted" />
          </Link>

          {/* Knowledge Map Link */}
          <Link
            href="/knowledge-map"
            className="flex items-center justify-between p-5 bg-bg-card border border-border rounded-xl hover:border-border-hover transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Map className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-text mb-0.5">Knowledge Map</h3>
                <p className="text-sm text-text-soft">See your full progress</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-text-muted" />
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
