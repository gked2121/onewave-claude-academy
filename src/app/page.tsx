"use client";

import Link from 'next/link';
import {
  ArrowRight,
  Play,
  BookOpen,
  Trophy,
  Sparkles,
  UserPlus,
  Terminal,
  Briefcase,
  Layers,
  Clock,
  Users,
  Award,
  Bot,
  MessageCircle,
  Code,
  Building2,
  Zap,
  Server,
  ChevronRight,
  GraduationCap,
} from 'lucide-react';
import { useProgress } from '@/context/ProgressContext';
import { getAllPaths } from '@/lib/paths';
import { TRACKS } from '@/lib/tracks';

const PATH_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  briefcase: Briefcase,
  layers: Layers,
  terminal: Terminal,
};

const TRACK_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  'claude-chat': MessageCircle,
  'claude-code': Terminal,
  'mcp-development': Server,
  'anthropic-api': Code,
  'claude-enterprise': Building2,
  'claude-skills': Zap,
};

export default function Home() {
  const { userEmail } = useProgress();
  const isAuthenticated = !!userEmail;
  const paths = getAllPaths();

  return (
    <div className="min-h-screen pb-32">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Background mesh */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80rem_50rem_at_50%_-20%,rgba(218,119,86,0.15),transparent)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60rem_40rem_at_80%_80%,rgba(8,145,178,0.08),transparent)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black_10%,transparent_100%)]" />
          </div>

          <div className="text-center relative">
            {/* Logo mark */}
            <div className="mb-6 animate-[fadeIn_0.6s_ease-out]">
              <div className="w-20 h-20 mx-auto relative group flex items-center justify-center">
                <div className="absolute inset-0 bg-claude/20 blur-2xl rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-claude/25 to-claude/8 flex items-center justify-center relative z-10 border border-claude/20">
                  <span className="text-4xl font-bold text-claude drop-shadow-[0_0_12px_rgba(218,119,86,0.2)]">C</span>
                </div>
              </div>
            </div>

            {/* Main Heading */}
            <div className="mb-6 animate-[fadeIn_0.8s_ease-out]">
              <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.1]">
                <span className="text-claude drop-shadow-[0_0_20px_rgba(218,119,86,0.15)]">Claude Academy</span>
                <br />
                <span className="bg-gradient-to-b from-white to-white/75 bg-clip-text text-transparent">by OneWave AI</span>
              </h1>
            </div>

            {/* Subheading */}
            <div className="mb-10 animate-[fadeIn_1s_ease-out]">
              <p className="mx-auto max-w-2xl text-lg leading-8 text-white/80 sm:text-xl font-medium">
                Personalized learning paths for every role --{' '}
                <span className="text-white/95">from sales to engineering</span>.
                Master the complete Anthropic ecosystem with hands-on, AI-verified training.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center mb-6 animate-[fadeIn_1.2s_ease-out]">
              {isAuthenticated ? (
                <>
                  <Link
                    href="/dashboard"
                    className="group relative inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-claude via-claude to-claude-dark px-8 py-4 text-base font-bold text-white shadow-[0_0_15px_rgba(218,119,86,0.3)] hover:shadow-[0_0_30px_rgba(218,119,86,0.4)] transition-all duration-300 hover:scale-105 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    <Play className="h-5 w-5 relative z-10" />
                    <span className="relative z-10">Continue Learning</span>
                    <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/tracks"
                    className="group inline-flex items-center justify-center gap-2.5 rounded-2xl border border-white/20 bg-white/5 px-8 py-4 text-base font-bold text-white backdrop-blur-xl hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                  >
                    <BookOpen className="h-5 w-5" />
                    <span>Browse All Tracks</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="group relative inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-claude via-claude to-claude-dark px-8 py-4 text-base font-bold text-white shadow-[0_0_15px_rgba(218,119,86,0.3)] hover:shadow-[0_0_30px_rgba(218,119,86,0.4)] transition-all duration-300 hover:scale-105 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    <UserPlus className="h-5 w-5 relative z-10" />
                    <span className="relative z-10">Start Free</span>
                    <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/upgrade"
                    className="group inline-flex items-center justify-center gap-2.5 rounded-2xl border border-white/20 bg-white/5 px-8 py-4 text-base font-bold text-white backdrop-blur-xl hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                  >
                    <Sparkles className="h-5 w-5" />
                    <span>Get Full Access</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Choose Your Path Section */}
      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-claude mb-4">
              Role-based curriculum
            </p>
            <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl mb-5">
              Choose Your Path
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-white/60">
              Whether you are writing emails or writing code, there is a structured path designed for how you actually use Claude.
            </p>
          </div>

          {/* Path Cards */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
            {paths.map((path) => {
              const IconComponent = PATH_ICONS[path.icon] || Briefcase;
              const displayRoles = path.exampleRoles.slice(0, 5);

              return (
                <Link
                  key={path.id}
                  href={`/paths/${path.slug}`}
                  className="group relative rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02]"
                >
                  {/* Card background with glass morphism */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-transparent backdrop-blur-xl" />
                  <div
                    className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 group-hover:ring-2 transition-all duration-500"
                    style={{
                      // @ts-expect-error -- CSS custom property for hover glow
                      '--tw-ring-color': undefined,
                    }}
                  />
                  {/* Colored border glow on hover */}
                  <div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      boxShadow: `inset 0 0 0 1.5px ${path.color}50, 0 0 30px ${path.color}15`,
                    }}
                  />
                  {/* Top accent gradient */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(to right, transparent, ${path.color}, transparent)`,
                    }}
                  />
                  {/* Background glow */}
                  <div
                    className="absolute -top-32 -right-32 w-64 h-64 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ background: `${path.color}08` }}
                  />

                  <div className="relative z-10 p-8 sm:p-9">
                    {/* Icon */}
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${path.color}30, ${path.color}10)`,
                        boxShadow: `0 0 0 1px ${path.color}20`,
                      }}
                    >
                      <span style={{ color: path.color }}>
                        <IconComponent className="w-7 h-7" />
                      </span>
                    </div>

                    {/* Name & tagline */}
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:translate-x-0.5 transition-transform duration-300">
                      {path.name}
                    </h3>
                    <p className="text-white/60 text-[15px] leading-relaxed mb-6">
                      {path.tagline}
                    </p>

                    {/* Role badges */}
                    <div className="flex flex-wrap gap-2 mb-7">
                      {displayRoles.map((role) => (
                        <span
                          key={role}
                          className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-white/[0.06] text-white/70 ring-1 ring-inset ring-white/[0.08]"
                        >
                          {role}
                        </span>
                      ))}
                      {path.exampleRoles.length > 5 && (
                        <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium text-white/40">
                          +{path.exampleRoles.length - 5} more
                        </span>
                      )}
                    </div>

                    {/* Stats row */}
                    <div className="flex items-center gap-5 mb-7 text-sm text-white/50">
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4" />
                        <span>{path.trackSequence.length} tracks</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <GraduationCap className="w-4 h-4" />
                        <span>{path.totalLevels} levels</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        <span>{path.estimatedHours}h</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <div
                      className="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-300"
                      style={{ color: path.accentColor }}
                    >
                      <span>View Curriculum</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Complete Curriculum Section */}
      <section className="relative py-16 sm:py-20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60rem_30rem_at_50%_50%,rgba(37,99,235,0.05),transparent)]" />
          </div>

          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary mb-4">
              Full catalog
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl mb-4">
              6 Tracks. 53 Levels. One Ecosystem.
            </h2>
            <p className="mx-auto max-w-2xl text-base text-white/55">
              Every path pulls from the same deep curriculum. Here is everything we cover.
            </p>
          </div>

          {/* Compact track grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TRACKS.map((track) => {
              const TrackIcon = TRACK_ICON_MAP[track.slug] || BookOpen;
              return (
                <Link
                  key={track.id}
                  href={`/tracks/${track.slug}`}
                  className="group relative flex items-start gap-4 rounded-2xl bg-white/[0.04] p-5 ring-1 ring-white/[0.06] backdrop-blur-sm hover:bg-white/[0.07] hover:ring-white/15 transition-all duration-300"
                >
                  <div
                    className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${track.color}25, ${track.color}10)`,
                    }}
                  >
                    <span style={{ color: track.color }}>
                      <TrackIcon className="w-5 h-5" />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold text-white mb-1 group-hover:text-white/90 transition-colors">
                      {track.name}
                    </h3>
                    <p className="text-xs text-white/45 leading-relaxed line-clamp-2">
                      {track.description}
                    </p>
                    <div className="flex items-center gap-3 mt-2.5 text-xs text-white/35">
                      <span>{track.totalLevels} levels</span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span>{track.estimatedHours}h</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/40 shrink-0 mt-1 transition-colors" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Claude Academy Section */}
      <section className="relative py-16 sm:py-20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60rem_40rem_at_50%_50%,rgba(218,119,86,0.06),transparent)]" />
          </div>

          <div className="text-center mb-14">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl mb-4">
              Why <span className="text-claude">Claude Academy</span>?
            </h2>
            <p className="mx-auto max-w-xl text-base text-white/55">
              Built for teams and individuals who want real proficiency, not just awareness.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Gamified Learning */}
            <div className="group relative rounded-2xl bg-white/[0.04] p-7 ring-1 ring-white/[0.06] backdrop-blur-sm hover:bg-white/[0.07] hover:ring-white/12 transition-all duration-400">
              <div className="w-12 h-12 mb-5 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-500/5 flex items-center justify-center ring-1 ring-amber-500/15 group-hover:scale-110 transition-transform duration-300">
                <Trophy className="w-6 h-6 text-amber-400" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Gamified Learning</h4>
              <p className="text-sm text-white/55 leading-relaxed">
                Earn XP, unlock achievements, and track progress as you master each track and level.
              </p>
            </div>

            {/* AI-Verified */}
            <div className="group relative rounded-2xl bg-white/[0.04] p-7 ring-1 ring-white/[0.06] backdrop-blur-sm hover:bg-white/[0.07] hover:ring-white/12 transition-all duration-400">
              <div className="w-12 h-12 mb-5 rounded-xl bg-gradient-to-br from-claude/20 to-claude/5 flex items-center justify-center ring-1 ring-claude/15 group-hover:scale-110 transition-transform duration-300">
                <Bot className="w-6 h-6 text-claude" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">AI-Verified Exercises</h4>
              <p className="text-sm text-white/55 leading-relaxed">
                Submit real work and get instant, structured feedback from Claude on your solutions.
              </p>
            </div>

            {/* Team Certifications */}
            <div className="group relative rounded-2xl bg-white/[0.04] p-7 ring-1 ring-white/[0.06] backdrop-blur-sm hover:bg-white/[0.07] hover:ring-white/12 transition-all duration-400">
              <div className="w-12 h-12 mb-5 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center ring-1 ring-primary/15 group-hover:scale-110 transition-transform duration-300">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Team Certifications</h4>
              <p className="text-sm text-white/55 leading-relaxed">
                Verifiable credentials at Associate, Professional, and Expert levels for individuals and teams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="group relative rounded-3xl overflow-hidden">
            {/* Glass background */}
            <div className="absolute inset-0 bg-gradient-to-br from-claude/10 via-claude/5 to-transparent backdrop-blur-xl" />
            <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-claude/20 group-hover:ring-claude/35 transition-all duration-500" />
            {/* Glow effects */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-claude/8 rounded-full blur-3xl" />
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-primary/6 rounded-full blur-3xl" />

            <div className="relative z-10 p-10 sm:p-14 text-center">
              <h3 className="text-3xl font-extrabold text-white mb-4 sm:text-4xl">
                Ready to Master Claude?
              </h3>
              <p className="text-white/65 mb-8 text-base leading-relaxed max-w-lg mx-auto">
                Join professionals across sales, product, and engineering who are building real proficiency with the Anthropic ecosystem.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={isAuthenticated ? '/dashboard' : '/login'}
                  className="group/btn relative inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-claude via-claude to-claude-dark px-9 py-4 text-base font-bold text-white shadow-[0_0_15px_rgba(218,119,86,0.3)] hover:shadow-[0_0_30px_rgba(218,119,86,0.4)] transition-all duration-300 hover:scale-105 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                  <Play className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">{isAuthenticated ? 'Continue Learning' : 'Start Free'}</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/upgrade"
                  className="group/btn inline-flex items-center justify-center gap-2.5 rounded-2xl border border-white/20 bg-white/5 px-9 py-4 text-base font-bold text-white backdrop-blur-xl hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                >
                  <Users className="w-5 h-5" />
                  <span>For Teams</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
