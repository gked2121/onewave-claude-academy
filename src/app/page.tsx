"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
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
  Shield,
  BarChart3,
  Target,
  Flame,
  Lock,
  CheckCircle2,
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

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const STATS = [
  { value: '6', label: 'Learning Tracks', icon: BookOpen },
  { value: '53', label: 'Interactive Levels', icon: Layers },
  { value: '500+', label: 'Hands-on Exercises', icon: Target },
  { value: '3', label: 'Certification Tiers', icon: Award },
];

const FEATURES = [
  {
    title: 'AI-Verified Exercises',
    description: 'Submit real work and receive instant, structured feedback powered by Claude. Every exercise is evaluated for accuracy, completeness, and best practices.',
    icon: Bot,
    color: '#DA7756',
    span: 'col-span-1 lg:col-span-2',
  },
  {
    title: 'Gamified Progression',
    description: 'Earn XP, unlock achievements, maintain streaks, and climb leaderboards as you master each track.',
    icon: Trophy,
    color: '#F59E0B',
    span: 'col-span-1',
  },
  {
    title: 'Role-Based Paths',
    description: 'Curated curricula for sales, product, engineering, and leadership. Learn exactly what your role needs.',
    icon: Target,
    color: '#2563EB',
    span: 'col-span-1',
  },
  {
    title: 'Team Certifications',
    description: 'Verifiable credentials at Associate, Professional, and Expert levels. Track and prove team-wide AI proficiency.',
    icon: Award,
    color: '#10B981',
    span: 'col-span-1 lg:col-span-2',
  },
];

const ENTERPRISE_FEATURES = [
  { icon: Shield, title: 'SOC 2 Compliant', description: 'Enterprise-grade security and data handling' },
  { icon: Lock, title: 'SSO / SAML', description: 'Integrate with your existing identity provider' },
  { icon: BarChart3, title: 'Admin Analytics', description: 'Team progress dashboards and usage reports' },
  { icon: Users, title: 'Unlimited Seats', description: 'Scale training across your entire organization' },
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Choose Your Path', description: 'Select a role-based curriculum designed for how you actually use AI at work.', icon: Target },
  { step: '02', title: 'Learn & Practice', description: 'Work through interactive levels with hands-on exercises verified by Claude in real time.', icon: Flame },
  { step: '03', title: 'Get Certified', description: 'Earn verifiable credentials that prove your Claude proficiency to your team and organization.', icon: GraduationCap },
];

export default function Home() {
  const { userEmail } = useProgress();
  const isAuthenticated = !!userEmail;
  const paths = getAllPaths();

  return (
    <div className="min-h-screen pb-32 -mx-4">
      {/* ─── Hero Section ─── */}
      <section className="relative py-28 sm:py-36 lg:py-44 overflow-hidden">
        {/* Animated gradient mesh background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_90rem_60rem_at_50%_-30%,rgba(218,119,86,0.12),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70rem_50rem_at_80%_100%,rgba(37,99,235,0.08),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50rem_40rem_at_10%_60%,rgba(8,145,178,0.06),transparent)]" />
          {/* Animated floating orb */}
          <motion.div
            className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(218,119,86,0.06) 0%, transparent 70%)' }}
            animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 70%)' }}
            animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 -z-10 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center relative"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            {/* Logo */}
            <motion.div className="mb-8" variants={fadeUp} transition={{ duration: 0.6 }}>
              <Image
                src="/logo.svg"
                alt="Claude Academy"
                width={88}
                height={88}
                className="mx-auto rounded-[22px] shadow-2xl ring-1 ring-white/10"
                priority
              />
            </motion.div>

            {/* Badge */}
            <motion.div className="mb-8" variants={fadeUp} transition={{ duration: 0.6 }}>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-5 py-2 text-sm font-medium text-white/80 ring-1 ring-white/[0.1] backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-claude" />
                The official training platform for the Anthropic ecosystem
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] mb-8"
              variants={fadeUp}
              transition={{ duration: 0.7 }}
            >
              <span className="block">Master AI Before</span>
              <span className="block bg-gradient-to-r from-claude via-claude-light to-primary bg-clip-text text-transparent">
                Your Competition Does
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              className="mx-auto max-w-2xl text-lg sm:text-xl leading-relaxed text-white/65 mb-12 font-medium"
              variants={fadeUp}
              transition={{ duration: 0.7 }}
            >
              Structured, role-based training paths for sales, product, and engineering teams.
              Hands-on exercises verified by Claude. Certifications that prove real proficiency.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col gap-4 sm:flex-row sm:justify-center mb-4"
              variants={fadeUp}
              transition={{ duration: 0.7 }}
            >
              {isAuthenticated ? (
                <>
                  <Link
                    href="/dashboard"
                    className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-claude px-10 py-4.5 text-base font-bold text-white shadow-lg shadow-claude/20 hover:bg-claude-dark hover:shadow-xl hover:shadow-claude/30 transition-all duration-300"
                  >
                    <Play className="h-5 w-5" />
                    <span>Continue Learning</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/tracks"
                    className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/[0.04] px-10 py-4.5 text-base font-bold text-white hover:bg-white/[0.08] hover:border-white/25 backdrop-blur-sm transition-all duration-300"
                  >
                    <BookOpen className="h-5 w-5" />
                    <span>Browse Tracks</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-claude px-10 py-4.5 text-base font-bold text-white shadow-lg shadow-claude/20 hover:bg-claude-dark hover:shadow-xl hover:shadow-claude/30 transition-all duration-300"
                  >
                    <UserPlus className="h-5 w-5" />
                    <span>Start Free</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/upgrade"
                    className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/[0.04] px-10 py-4.5 text-base font-bold text-white hover:bg-white/[0.08] hover:border-white/25 backdrop-blur-sm transition-all duration-300"
                  >
                    <Building2 className="h-5 w-5" />
                    <span>For Teams & Enterprise</span>
                  </Link>
                </>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Stats Strip ─── */}
      <section className="relative py-6">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
          >
            {STATS.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className="relative rounded-2xl bg-white/[0.04] ring-1 ring-white/[0.06] p-6 text-center backdrop-blur-sm"
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className="w-5 h-5 text-claude mx-auto mb-3 opacity-70" />
                  <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/50 font-medium">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── Divider ─── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      </div>

      {/* ─── Choose Your Path ─── */}
      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            <motion.p
              className="text-sm font-semibold uppercase tracking-[0.2em] text-claude mb-4"
              variants={fadeUp}
            >
              Role-Based Curriculum
            </motion.p>
            <motion.h2
              className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6"
              variants={fadeUp}
            >
              Choose Your Path
            </motion.h2>
            <motion.p
              className="mx-auto max-w-2xl text-lg text-white/55 leading-relaxed"
              variants={fadeUp}
            >
              Whether you write emails or write code, there is a structured path
              designed for exactly how you use Claude at work.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            {paths.map((path) => {
              const IconComponent = PATH_ICONS[path.icon] || Briefcase;
              const displayRoles = path.exampleRoles.slice(0, 5);

              return (
                <motion.div key={path.id} variants={fadeUp} transition={{ duration: 0.5 }}>
                  <Link
                    href={`/paths/${path.slug}`}
                    className="group relative block rounded-2xl overflow-hidden transition-all duration-300 bg-white/[0.03] ring-1 ring-white/[0.06] hover:bg-white/[0.06] hover:ring-white/[0.12] hover:shadow-xl hover:shadow-black/20 hover:-translate-y-1"
                  >
                    {/* Top gradient accent */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px]"
                      style={{ background: `linear-gradient(to right, transparent, ${path.color}80, transparent)` }}
                    />

                    <div className="relative z-10 p-8 sm:p-10">
                      {/* Icon */}
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center mb-7"
                        style={{
                          background: `linear-gradient(135deg, ${path.color}20, ${path.color}08)`,
                          boxShadow: `0 0 0 1px ${path.color}18`,
                        }}
                      >
                        <span style={{ color: path.color }}>
                          <IconComponent className="w-7 h-7" />
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                        {path.name}
                      </h3>
                      <p className="text-white/55 text-[15px] leading-relaxed mb-7">
                        {path.tagline}
                      </p>

                      {/* Role badges */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {displayRoles.map((role) => (
                          <span
                            key={role}
                            className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-white/[0.05] text-white/65 ring-1 ring-inset ring-white/[0.06]"
                          >
                            {role}
                          </span>
                        ))}
                        {path.exampleRoles.length > 5 && (
                          <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium text-white/35">
                            +{path.exampleRoles.length - 5} more
                          </span>
                        )}
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-5 mb-8 text-sm text-white/45">
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
                        className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300"
                        style={{ color: path.accentColor }}
                      >
                        <span>View Curriculum</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── Divider ─── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      </div>

      {/* ─── How It Works ─── */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60rem_30rem_at_30%_50%,rgba(37,99,235,0.06),transparent)]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            <motion.p
              className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4"
              variants={fadeUp}
            >
              Simple Process
            </motion.p>
            <motion.h2
              className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl mb-6"
              variants={fadeUp}
            >
              From Zero to Certified in Three Steps
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            {HOW_IT_WORKS.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.step}
                  className="relative text-center"
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                >
                  {/* Connector line */}
                  {i < HOW_IT_WORKS.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-[60%] right-[-40%] h-px bg-gradient-to-r from-white/10 to-transparent" />
                  )}

                  <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-white/[0.04] ring-1 ring-white/[0.08] mb-8">
                    <Icon className="w-10 h-10 text-primary" />
                    <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center shadow-lg shadow-primary/30">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-white/50 text-[15px] leading-relaxed max-w-xs mx-auto">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── Divider ─── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      </div>

      {/* ─── Features Bento Grid ─── */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60rem_40rem_at_50%_50%,rgba(218,119,86,0.05),transparent)]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            <motion.p
              className="text-sm font-semibold uppercase tracking-[0.2em] text-claude mb-4"
              variants={fadeUp}
            >
              Platform Features
            </motion.p>
            <motion.h2
              className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl mb-6"
              variants={fadeUp}
            >
              Built for Real Proficiency
            </motion.h2>
            <motion.p
              className="mx-auto max-w-xl text-lg text-white/55"
              variants={fadeUp}
            >
              Not just awareness training. Hands-on, verified skill building that sticks.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  className={`relative rounded-2xl bg-white/[0.03] ring-1 ring-white/[0.06] p-8 sm:p-10 hover:bg-white/[0.06] hover:ring-white/[0.1] transition-all duration-300 ${feature.span}`}
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                >
                  <div
                    className="w-14 h-14 mb-6 rounded-xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}08)`,
                      boxShadow: `0 0 0 1px ${feature.color}15`,
                    }}
                  >
                    <Icon className="w-7 h-7" style={{ color: feature.color }} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-white/50 text-[15px] leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── Divider ─── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      </div>

      {/* ─── Complete Curriculum ─── */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            <motion.p
              className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary mb-4"
              variants={fadeUp}
            >
              Full Catalog
            </motion.p>
            <motion.h2
              className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl mb-5"
              variants={fadeUp}
            >
              6 Tracks. 53 Levels. One Ecosystem.
            </motion.h2>
            <motion.p
              className="mx-auto max-w-2xl text-base text-white/50"
              variants={fadeUp}
            >
              Every path draws from the same deep curriculum. Here is everything we cover.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            {TRACKS.map((track) => {
              const TrackIcon = TRACK_ICON_MAP[track.slug] || BookOpen;
              return (
                <motion.div key={track.id} variants={fadeUp} transition={{ duration: 0.4 }}>
                  <Link
                    href={`/tracks/${track.slug}`}
                    className="group relative flex items-start gap-4 rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/[0.06] backdrop-blur-sm hover:bg-white/[0.06] hover:ring-white/[0.12] hover:shadow-lg hover:shadow-black/10 transition-all duration-300"
                  >
                    <div
                      className="shrink-0 w-11 h-11 rounded-lg flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${track.color}20, ${track.color}08)`,
                      }}
                    >
                      <span style={{ color: track.color }}>
                        <TrackIcon className="w-5 h-5" />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-bold text-white mb-1.5 group-hover:text-white/90 transition-colors">
                        {track.name}
                      </h3>
                      <p className="text-xs text-white/40 leading-relaxed line-clamp-2">
                        {track.description}
                      </p>
                      <div className="flex items-center gap-3 mt-3 text-xs text-white/30">
                        <span>{track.totalLevels} levels</span>
                        <span className="w-1 h-1 rounded-full bg-white/15" />
                        <span>{track.estimatedHours}h</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/15 group-hover:text-white/35 shrink-0 mt-1.5 transition-colors" />
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── Divider ─── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      </div>

      {/* ─── Enterprise Section ─── */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60rem_40rem_at_70%_50%,rgba(37,99,235,0.06),transparent)]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left - Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={stagger}
            >
              <motion.p
                className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4"
                variants={fadeUp}
              >
                Enterprise Ready
              </motion.p>
              <motion.h2
                className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl mb-6"
                variants={fadeUp}
              >
                Scale AI Training Across Your Organization
              </motion.h2>
              <motion.p
                className="text-lg text-white/55 leading-relaxed mb-10"
                variants={fadeUp}
              >
                Deploy Claude Academy to hundreds of employees with admin dashboards,
                SSO integration, and detailed analytics on team-wide proficiency.
              </motion.p>

              <motion.div variants={fadeUp}>
                <Link
                  href="/upgrade"
                  className="group inline-flex items-center gap-3 rounded-2xl bg-primary px-8 py-4 text-base font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                >
                  <Building2 className="w-5 h-5" />
                  <span>Talk to Sales</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Right - Feature cards */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={stagger}
            >
              {ENTERPRISE_FEATURES.map((feat) => {
                const Icon = feat.icon;
                return (
                  <motion.div
                    key={feat.title}
                    className="rounded-2xl bg-white/[0.04] ring-1 ring-white/[0.08] p-7 hover:bg-white/[0.07] transition-colors duration-300"
                    variants={fadeUp}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-11 h-11 rounded-xl bg-primary/10 ring-1 ring-primary/15 flex items-center justify-center mb-5">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="text-base font-bold text-white mb-2">{feat.title}</h4>
                    <p className="text-sm text-white/45 leading-relaxed">{feat.description}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Divider ─── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      </div>

      {/* ─── Final CTA ─── */}
      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="relative rounded-3xl overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] to-white/[0.02]" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.08] rounded-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(218,119,86,0.08),transparent_60%)]" />

            <div className="relative z-10 p-12 sm:p-16 lg:p-20 text-center">
              <h3 className="text-4xl font-extrabold text-white mb-5 sm:text-5xl tracking-tight">
                Ready to Master Claude?
              </h3>
              <p className="text-white/55 mb-10 text-lg leading-relaxed max-w-lg mx-auto">
                Join professionals across sales, product, and engineering who are building
                real proficiency with the complete Anthropic ecosystem.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={isAuthenticated ? '/dashboard' : '/login'}
                  className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-claude px-10 py-4.5 text-base font-bold text-white shadow-lg shadow-claude/20 hover:bg-claude-dark hover:shadow-xl hover:shadow-claude/30 transition-all duration-300"
                >
                  <Play className="w-5 h-5" />
                  <span>{isAuthenticated ? 'Continue Learning' : 'Start Free'}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/upgrade"
                  className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/[0.04] px-10 py-4.5 text-base font-bold text-white hover:bg-white/[0.08] hover:border-white/25 backdrop-blur-sm transition-all duration-300"
                >
                  <Users className="w-5 h-5" />
                  <span>For Teams</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
