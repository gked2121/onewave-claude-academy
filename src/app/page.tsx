"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
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
  LayoutDashboard,
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
  'claude-workspace': LayoutDashboard,
  'ai-strategy': Target,
};

// Enhanced animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

const fadeUpSpring = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 100, damping: 15 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const staggerFast = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const STATS = [
  { value: '8', label: 'Learning Tracks', icon: BookOpen },
  { value: '68', label: 'Interactive Levels', icon: Layers },
  { value: '500+', label: 'Hands-on Exercises', icon: Target },
  { value: '3', label: 'Certification Tiers', icon: Award },
];

const FEATURES = [
  {
    title: 'AI-Verified Exercises',
    description: 'Submit real work and receive instant, structured feedback powered by Claude. Every exercise is evaluated against real-world standards so your team builds skills they can use on day one.',
    icon: Bot,
    color: '#DA7756',
    span: 'col-span-1 lg:col-span-2',
  },
  {
    title: 'Gamified Progression',
    description: 'XP, achievements, streaks, and leaderboards keep individuals motivated and teams competing toward full proficiency.',
    icon: Trophy,
    color: '#F59E0B',
    span: 'col-span-1',
  },
  {
    title: 'Role-Based Paths',
    description: 'Sales, product, engineering, leadership -- every department gets a curriculum designed for exactly how they use AI.',
    icon: Target,
    color: '#2563EB',
    span: 'col-span-1',
  },
  {
    title: 'Team & Individual Certifications',
    description: 'Verifiable credentials at Associate, Professional, and Expert levels. Prove proficiency to your employer, your team, or yourself.',
    icon: Award,
    color: '#10B981',
    span: 'col-span-1 lg:col-span-2',
  },
];

const ENTERPRISE_FEATURES = [
  { icon: Shield, title: 'SOC 2 Compliant', description: 'Enterprise-grade security your IT team will approve' },
  { icon: Lock, title: 'SSO / SAML', description: 'One-click access through your existing identity provider' },
  { icon: BarChart3, title: 'Admin Analytics', description: 'See exactly who is trained, who is certified, and where gaps remain' },
  { icon: Users, title: 'Unlimited Seats', description: 'Roll out to every department -- from the C-suite to the front line' },
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Choose Your Path', description: 'Select a role-based curriculum designed for how you actually use AI at work.', icon: Target },
  { step: '02', title: 'Learn & Practice', description: 'Work through interactive levels with hands-on exercises verified by Claude in real time.', icon: Flame },
  { step: '03', title: 'Get Certified', description: 'Earn verifiable credentials that prove your Claude proficiency to your team and organization.', icon: GraduationCap },
];

// Floating particle component
function FloatingParticles() {
  const particles = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.3 + 0.05,
    color: i % 3 === 0 ? 'rgba(218,119,86,' : i % 3 === 1 ? 'rgba(37,99,235,' : 'rgba(8,145,178,',
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: `${p.color}${p.opacity})`,
            boxShadow: `0 0 ${p.size * 4}px ${p.color}${p.opacity * 0.5})`,
          }}
          animate={{
            y: [0, -80 - Math.random() * 60, 0],
            x: [0, (Math.random() - 0.5) * 60, 0],
            opacity: [p.opacity, p.opacity * 2, p.opacity],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// Animated grid background
function AnimatedGrid() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Perspective grid floor */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          transform: 'perspective(600px) rotateX(35deg)',
          transformOrigin: 'top center',
          maskImage: 'linear-gradient(to bottom, black 0%, transparent 80%)',
        }}
      />
      {/* Flat subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}

export default function Home() {
  const { userEmail } = useProgress();
  const isAuthenticated = !!userEmail;
  const paths = getAllPaths();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <div className="min-h-screen pb-32 -mx-4 noise-overlay">
      {/* ─── Hero Section ─── */}
      <section ref={heroRef} className="relative py-28 sm:py-36 lg:py-48 overflow-hidden">
        {/* Layered gradient mesh background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_90rem_60rem_at_50%_-30%,rgba(218,119,86,0.14),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70rem_50rem_at_80%_100%,rgba(37,99,235,0.1),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50rem_40rem_at_10%_60%,rgba(8,145,178,0.07),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_40rem_30rem_at_50%_50%,rgba(139,92,246,0.04),transparent)]" />

          {/* Large animated orbs with 3D depth */}
          <motion.div
            className="absolute top-[15%] right-[20%] w-[600px] h-[600px] rounded-full blur-[2px]"
            style={{
              background: 'radial-gradient(circle, rgba(218,119,86,0.08) 0%, rgba(218,119,86,0.02) 40%, transparent 70%)',
              animation: 'float-slow 25s ease-in-out infinite',
            }}
          />
          <motion.div
            className="absolute bottom-[10%] left-[15%] w-[500px] h-[500px] rounded-full blur-[1px]"
            style={{
              background: 'radial-gradient(circle, rgba(37,99,235,0.07) 0%, rgba(37,99,235,0.02) 40%, transparent 70%)',
              animation: 'float-reverse 30s ease-in-out infinite',
            }}
          />
          <motion.div
            className="absolute top-[40%] left-[50%] w-[350px] h-[350px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(8,145,178,0.06) 0%, transparent 60%)',
              animation: 'float-slow 20s ease-in-out infinite 5s',
            }}
          />
          {/* Smaller accent orbs */}
          <motion.div
            className="absolute top-[25%] left-[10%] w-[200px] h-[200px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 60%)',
            }}
            animate={{
              y: [0, -30, 10, 0],
              x: [0, 20, -10, 0],
              scale: [1, 1.1, 0.95, 1],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-[25%] right-[10%] w-[150px] h-[150px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 60%)',
            }}
            animate={{
              y: [0, 25, -15, 0],
              x: [0, -15, 20, 0],
            }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <FloatingParticles />
        <AnimatedGrid />

        {/* Hero content with parallax */}
        <motion.div
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        >
          <motion.div
            className="text-center relative"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            {/* 3D Floating Logo */}
            <motion.div
              className="mb-10 inline-block"
              variants={scaleIn}
              transition={{ duration: 0.8, type: 'spring', stiffness: 80 }}
            >
              <motion.div
                className="relative"
                animate={{
                  rotateY: [0, 5, -5, 0],
                  rotateX: [0, -3, 3, 0],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                style={{ perspective: 800, transformStyle: 'preserve-3d' }}
              >
                <Image
                  src="/logo.svg"
                  alt="Claude Academy"
                  width={96}
                  height={96}
                  className="mx-auto rounded-[24px] shadow-2xl ring-1 ring-white/10"
                  priority
                />
                {/* Logo glow */}
                <div
                  className="absolute inset-0 rounded-[24px] animate-pulse-glow"
                  style={{
                    boxShadow: '0 0 40px rgba(218,119,86,0.2), 0 0 80px rgba(218,119,86,0.08)',
                  }}
                />
                {/* Logo reflection */}
                <div
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-16 h-4 rounded-full blur-md opacity-20"
                  style={{ background: 'rgba(218,119,86,0.5)' }}
                />
              </motion.div>
            </motion.div>

            {/* Badge with shimmer */}
            <motion.div className="mb-8" variants={fadeUp} transition={{ duration: 0.6 }}>
              <span className="relative inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-5 py-2 text-sm font-medium text-white/80 ring-1 ring-white/[0.1] backdrop-blur-sm overflow-hidden">
                <Sparkles className="w-4 h-4 text-claude" />
                Upskill every employee on the complete Anthropic ecosystem
                {/* Shimmer sweep */}
                <span
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
                    animation: 'shimmer-sweep 3s ease-in-out infinite',
                  }}
                />
              </span>
            </motion.div>

            {/* Headline with depth */}
            <motion.h1
              className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] mb-8"
              variants={fadeUp}
              transition={{ duration: 0.7, type: 'spring', stiffness: 60 }}
            >
              <motion.span
                className="block"
                style={{ textShadow: '0 2px 40px rgba(0,0,0,0.3)' }}
              >
                Deploy Claude
              </motion.span>
              <motion.span
                className="block bg-gradient-to-r from-claude via-claude-light to-primary bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  backgroundSize: '200% 200%',
                  filter: 'drop-shadow(0 2px 20px rgba(218,119,86,0.15))',
                }}
              >
                Across Your Entire Business
              </motion.span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              className="mx-auto max-w-2xl text-lg sm:text-xl leading-relaxed text-white/65 mb-12 font-medium"
              variants={fadeUp}
              transition={{ duration: 0.7 }}
            >
              Train every team -- sales, product, engineering, leadership -- on Claude with
              role-based paths, hands-on exercises, and verifiable certifications.
              Whether you are upskilling your workforce or leveling up on your own, start here.
            </motion.p>

            {/* CTAs with enhanced hover */}
            <motion.div
              className="flex flex-col gap-4 sm:flex-row sm:justify-center mb-4"
              variants={fadeUp}
              transition={{ duration: 0.7 }}
            >
              {isAuthenticated ? (
                <>
                  <Link
                    href="/dashboard"
                    className="group relative inline-flex items-center justify-center gap-3 rounded-2xl bg-claude px-10 py-4.5 text-base font-bold text-white shadow-lg shadow-claude/25 hover:bg-claude-dark hover:shadow-xl hover:shadow-claude/35 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <Play className="h-5 w-5" />
                    <span>Continue Learning</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/tracks"
                    className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/[0.04] px-10 py-4.5 text-base font-bold text-white hover:bg-white/[0.08] hover:border-white/25 hover:-translate-y-0.5 backdrop-blur-sm transition-all duration-300"
                  >
                    <BookOpen className="h-5 w-5" />
                    <span>Browse Tracks</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="group relative inline-flex items-center justify-center gap-3 rounded-2xl bg-claude px-10 py-4.5 text-base font-bold text-white shadow-lg shadow-claude/25 hover:bg-claude-dark hover:shadow-xl hover:shadow-claude/35 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <UserPlus className="h-5 w-5" />
                    <span>Start Free</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/upgrade"
                    className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/[0.04] px-10 py-4.5 text-base font-bold text-white hover:bg-white/[0.08] hover:border-white/25 hover:-translate-y-0.5 backdrop-blur-sm transition-all duration-300"
                  >
                    <Building2 className="h-5 w-5" />
                    <span>For Teams & Enterprise</span>
                  </Link>
                </>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Stats Strip with 3D Cards ─── */}
      <section className="relative py-6">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="perspective-container">
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={staggerFast}
            >
              {STATS.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    className="relative rounded-2xl bg-white/[0.04] ring-1 ring-white/[0.06] p-6 text-center backdrop-blur-sm card-3d animated-border overflow-hidden"
                    variants={fadeUpSpring}
                    whileHover={{
                      scale: 1.04,
                      rotateX: -2,
                      rotateY: i < 2 ? 2 : -2,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    {/* Inner glow */}
                    <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_0%,rgba(218,119,86,0.08),transparent_60%)]" />
                    <Icon className="w-5 h-5 text-claude mx-auto mb-3 opacity-70 relative z-10" />
                    <motion.div
                      className="text-3xl sm:text-4xl font-extrabold text-white mb-1 tracking-tight relative z-10"
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1, type: 'spring', stiffness: 150 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-sm text-white/50 font-medium relative z-10">{stat.label}</div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Divider with glow ─── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>

      {/* ─── Choose Your Path with 3D Cards ─── */}
      <section className="relative py-16 sm:py-28 overflow-hidden">
        {/* Background depth */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80rem_50rem_at_50%_30%,rgba(218,119,86,0.04),transparent)]" />
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
              Role-Based Curriculum
            </motion.p>
            <motion.h2
              className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6"
              variants={fadeUp}
              style={{ textShadow: '0 4px 40px rgba(0,0,0,0.2)' }}
            >
              Choose Your Path
            </motion.h2>
            <motion.p
              className="mx-auto max-w-2xl text-lg text-white/55 leading-relaxed"
              variants={fadeUp}
            >
              Every role uses AI differently. Pick the path that matches your job today,
              or assign paths across departments to upskill your entire organization.
            </motion.p>
          </motion.div>

          <div className="perspective-container">
            <motion.div
              className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={stagger}
            >
              {paths.map((path, pathIndex) => {
                const IconComponent = PATH_ICONS[path.icon] || Briefcase;
                const displayRoles = path.exampleRoles.slice(0, 5);

                return (
                  <motion.div
                    key={path.id}
                    variants={fadeUpSpring}
                    whileHover={{
                      y: -12,
                      rotateX: 2,
                      rotateY: pathIndex === 0 ? 2 : pathIndex === 2 ? -2 : 0,
                      transition: { type: 'spring', stiffness: 200, damping: 18 },
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <Link
                      href={`/paths/${path.slug}`}
                      className="group relative block rounded-2xl overflow-hidden bg-white/[0.03] ring-1 ring-white/[0.06] hover:bg-white/[0.06] hover:ring-white/[0.15] transition-all duration-500"
                      style={{
                        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                      }}
                    >
                      {/* Animated top gradient accent */}
                      <motion.div
                        className="absolute top-0 left-0 right-0 h-[2px]"
                        style={{ background: `linear-gradient(to right, transparent, ${path.color}, transparent)` }}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + pathIndex * 0.15, duration: 0.8 }}
                      />

                      {/* Hover glow overlay */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                        style={{
                          background: `radial-gradient(ellipse at 50% 0%, ${path.color}10, transparent 60%)`,
                        }}
                      />

                      {/* Shimmer on hover */}
                      <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div
                          className="absolute inset-0"
                          style={{
                            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)',
                            animation: 'shimmer-sweep 2s ease-in-out infinite',
                          }}
                        />
                      </div>

                      <div className="relative z-10 p-8 sm:p-10">
                        {/* Floating icon with glow */}
                        <motion.div
                          className="w-16 h-16 rounded-xl flex items-center justify-center mb-7"
                          style={{
                            background: `linear-gradient(135deg, ${path.color}25, ${path.color}08)`,
                            boxShadow: `0 0 0 1px ${path.color}20, 0 8px 24px ${path.color}10`,
                          }}
                          whileHover={{
                            scale: 1.1,
                            rotate: 5,
                            boxShadow: `0 0 0 1px ${path.color}30, 0 12px 32px ${path.color}20`,
                          }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <span style={{ color: path.color }}>
                            <IconComponent className="w-7 h-7" />
                          </span>
                        </motion.div>

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
                              className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-white/[0.05] text-white/65 ring-1 ring-inset ring-white/[0.06] hover:bg-white/[0.1] transition-colors duration-200"
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

                        {/* Stats row */}
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
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                        </div>
                      </div>

                      {/* Bottom shadow depth */}
                      <div
                        className="absolute bottom-0 left-0 right-0 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: `linear-gradient(to top, ${path.color}06, transparent)`,
                        }}
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Animated Divider ─── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>

      {/* ─── How It Works with 3D Steps ─── */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60rem_30rem_at_30%_50%,rgba(37,99,235,0.07),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_40rem_25rem_at_70%_40%,rgba(8,145,178,0.05),transparent)]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
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
              style={{ textShadow: '0 4px 40px rgba(0,0,0,0.2)' }}
            >
              From Zero to Certified in Three Steps
            </motion.h2>
          </motion.div>

          <div className="perspective-container">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-14"
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
                    variants={fadeUpSpring}
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  >
                    {/* Animated connector line */}
                    {i < HOW_IT_WORKS.length - 1 && (
                      <motion.div
                        className="hidden md:block absolute top-14 left-[60%] right-[-40%] h-px"
                        style={{
                          background: 'linear-gradient(to right, rgba(37,99,235,0.3), rgba(37,99,235,0.05))',
                        }}
                        initial={{ scaleX: 0, transformOrigin: 'left' }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.3, duration: 0.8 }}
                      />
                    )}

                    {/* 3D step card */}
                    <motion.div
                      className="relative inline-flex items-center justify-center w-28 h-28 rounded-2xl bg-white/[0.04] ring-1 ring-white/[0.08] mb-8"
                      whileHover={{
                        rotateY: 10,
                        rotateX: -5,
                        boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 0 30px rgba(37,99,235,0.1)',
                      }}
                      transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <Icon className="w-10 h-10 text-primary" />
                      {/* Animated step number */}
                      <motion.span
                        className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center shadow-lg"
                        style={{ boxShadow: '0 4px 20px rgba(37,99,235,0.4)' }}
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.2, type: 'spring', stiffness: 200 }}
                      >
                        {item.step}
                      </motion.span>
                      {/* Glow ring */}
                      <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500"
                        style={{ boxShadow: '0 0 30px rgba(37,99,235,0.15), inset 0 0 20px rgba(37,99,235,0.05)' }}
                      />
                    </motion.div>

                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-white/50 text-[15px] leading-relaxed max-w-xs mx-auto">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Animated Divider ─── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>

      {/* ─── Features Bento Grid with 3D ─── */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60rem_40rem_at_50%_50%,rgba(218,119,86,0.06),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_40rem_30rem_at_80%_20%,rgba(139,92,246,0.04),transparent)]" />
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
              style={{ textShadow: '0 4px 40px rgba(0,0,0,0.2)' }}
            >
              Built for Real Proficiency
            </motion.h2>
            <motion.p
              className="mx-auto max-w-xl text-lg text-white/55"
              variants={fadeUp}
            >
              Not just awareness slides. Hands-on exercises and AI-verified skills
              that employees actually use in their daily work.
            </motion.p>
          </motion.div>

          <div className="perspective-container">
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-3 gap-5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={stagger}
            >
              {FEATURES.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    className={`relative rounded-2xl bg-white/[0.03] ring-1 ring-white/[0.06] p-8 sm:p-10 overflow-hidden animated-border ${feature.span}`}
                    variants={fadeUpSpring}
                    whileHover={{
                      y: -8,
                      rotateX: 1.5,
                      rotateY: i % 2 === 0 ? 1 : -1,
                      scale: 1.01,
                      transition: { type: 'spring', stiffness: 200, damping: 18 },
                    }}
                    style={{
                      transformStyle: 'preserve-3d',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    }}
                  >
                    {/* Depth gradient on hover */}
                    <div
                      className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                      style={{
                        background: `radial-gradient(ellipse at 30% 20%, ${feature.color}08, transparent 60%)`,
                      }}
                    />

                    {/* Icon with glow */}
                    <motion.div
                      className="w-14 h-14 mb-6 rounded-xl flex items-center justify-center relative z-10"
                      style={{
                        background: `linear-gradient(135deg, ${feature.color}22, ${feature.color}08)`,
                        boxShadow: `0 0 0 1px ${feature.color}18, 0 6px 20px ${feature.color}08`,
                      }}
                      whileHover={{
                        scale: 1.15,
                        rotate: 8,
                        boxShadow: `0 0 0 1px ${feature.color}30, 0 8px 30px ${feature.color}18`,
                      }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Icon className="w-7 h-7" style={{ color: feature.color }} />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-3 relative z-10">{feature.title}</h3>
                    <p className="text-white/50 text-[15px] leading-relaxed relative z-10">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Animated Divider ─── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>

      {/* ─── Complete Curriculum with enhanced grid ─── */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        {/* Background depth */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50rem_35rem_at_30%_60%,rgba(8,145,178,0.05),transparent)]" />
        </div>

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
              style={{ textShadow: '0 4px 40px rgba(0,0,0,0.2)' }}
            >
              8 Tracks. 68 Levels. One Ecosystem.
            </motion.h2>
            <motion.p
              className="mx-auto max-w-2xl text-base text-white/50"
              variants={fadeUp}
            >
              Every path draws from the same deep curriculum. Here is everything we cover.
            </motion.p>
          </motion.div>

          <div className="perspective-container">
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={staggerFast}
            >
              {TRACKS.map((track, i) => {
                const TrackIcon = TRACK_ICON_MAP[track.slug] || BookOpen;
                return (
                  <motion.div
                    key={track.id}
                    variants={fadeUpSpring}
                    whileHover={{
                      y: -6,
                      scale: 1.03,
                      rotateX: 2,
                      transition: { type: 'spring', stiffness: 250, damping: 18 },
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <Link
                      href={`/tracks/${track.slug}`}
                      className="group relative flex flex-col items-center gap-3 rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/[0.06] backdrop-blur-sm overflow-hidden transition-all duration-400"
                      style={{
                        boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
                      }}
                    >
                      {/* Hover glow */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                          background: `radial-gradient(circle at 50% 30%, ${track.color}12, transparent 70%)`,
                        }}
                      />

                      {/* Bottom glow line */}
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-[2px]"
                        style={{ background: `linear-gradient(to right, transparent, ${track.color}60, transparent)` }}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.05, duration: 0.6 }}
                      />

                      {/* Icon */}
                      <motion.div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${track.color}22, ${track.color}08)`,
                          boxShadow: `0 0 0 1px ${track.color}15`,
                        }}
                        whileHover={{
                          scale: 1.15,
                          rotate: 5,
                          boxShadow: `0 0 20px ${track.color}25`,
                        }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <span style={{ color: track.color }}>
                          <TrackIcon className="w-5 h-5" />
                        </span>
                      </motion.div>

                      <div className="text-center">
                        <h3 className="text-sm font-bold text-white mb-1.5 group-hover:text-white/90 transition-colors">
                          {track.name}
                        </h3>
                        <p className="text-xs text-white/40 leading-relaxed line-clamp-2">
                          {track.description}
                        </p>
                        <div className="flex items-center justify-center gap-3 mt-3 text-xs text-white/30">
                          <span>{track.totalLevels} levels</span>
                          <span className="w-1 h-1 rounded-full bg-white/15" />
                          <span>{track.estimatedHours}h</span>
                        </div>
                      </div>

                      <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/10 group-hover:text-white/30 group-hover:translate-x-1 shrink-0 transition-all duration-300" />
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Animated Divider ─── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>

      {/* ─── Enterprise Section with depth ─── */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60rem_40rem_at_70%_50%,rgba(37,99,235,0.07),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_40rem_30rem_at_30%_30%,rgba(139,92,246,0.04),transparent)]" />
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
                style={{ textShadow: '0 4px 40px rgba(0,0,0,0.2)' }}
              >
                Roll Out AI to Every Department, Not Just Engineering
              </motion.h2>
              <motion.p
                className="text-lg text-white/55 leading-relaxed mb-10"
                variants={fadeUp}
              >
                Most companies buy AI licenses but never train their people.
                Claude Academy closes that gap -- deploy structured training to hundreds
                of employees with admin dashboards, SSO, and real-time proficiency analytics.
              </motion.p>

              <motion.div variants={fadeUp}>
                <Link
                  href="/upgrade"
                  className="group inline-flex items-center gap-3 rounded-2xl bg-primary px-8 py-4 text-base font-bold text-white shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                  style={{ boxShadow: '0 8px 30px rgba(37,99,235,0.3)' }}
                >
                  <Building2 className="w-5 h-5" />
                  <span>Talk to Sales</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Right - 3D Feature cards */}
            <div className="perspective-container">
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={stagger}
              >
                {ENTERPRISE_FEATURES.map((feat, i) => {
                  const Icon = feat.icon;
                  return (
                    <motion.div
                      key={feat.title}
                      className="rounded-2xl bg-white/[0.04] ring-1 ring-white/[0.08] p-7 overflow-hidden relative"
                      variants={fadeUpSpring}
                      whileHover={{
                        y: -8,
                        rotateX: 3,
                        rotateY: i % 2 === 0 ? 2 : -2,
                        scale: 1.02,
                        boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 0 20px rgba(37,99,235,0.08)',
                      }}
                      transition={{ type: 'spring', stiffness: 250, damping: 18 }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {/* Hover glow */}
                      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_30%_20%,rgba(37,99,235,0.08),transparent_60%)] pointer-events-none" />

                      <motion.div
                        className="w-11 h-11 rounded-xl bg-primary/10 ring-1 ring-primary/15 flex items-center justify-center mb-5 relative z-10"
                        whileHover={{ scale: 1.15, rotate: 8 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Icon className="w-5 h-5 text-primary" />
                      </motion.div>
                      <h4 className="text-base font-bold text-white mb-2 relative z-10">{feat.title}</h4>
                      <p className="text-sm text-white/45 leading-relaxed relative z-10">{feat.description}</p>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Animated Divider ─── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>

      {/* ─── Final CTA with 3D depth ─── */}
      <section className="relative py-20 sm:py-28">
        {/* Background orbs */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(218,119,86,0.06) 0%, transparent 60%)' }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 perspective-container">
          <motion.div
            className="relative rounded-3xl overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUpSpring}
            whileHover={{
              rotateX: 1,
              y: -4,
              transition: { type: 'spring', stiffness: 150, damping: 20 },
            }}
            style={{
              transformStyle: 'preserve-3d',
              boxShadow: '0 8px 40px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.06)',
            }}
          >
            {/* Background layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.07] to-white/[0.02]" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.08] rounded-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(218,119,86,0.1),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(37,99,235,0.06),transparent_60%)]" />

            {/* Animated gradient border */}
            <motion.div
              className="absolute inset-0 rounded-3xl opacity-40"
              style={{
                background: 'conic-gradient(from 0deg, transparent, rgba(218,119,86,0.3), transparent, rgba(37,99,235,0.2), transparent)',
                maskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
                maskComposite: 'exclude',
                padding: '1px',
              }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            />

            <div className="relative z-10 p-12 sm:p-16 lg:p-20 text-center">
              <motion.h3
                className="text-4xl font-extrabold text-white mb-5 sm:text-5xl tracking-tight"
                style={{ textShadow: '0 4px 40px rgba(0,0,0,0.2)' }}
              >
                Your Team Is Already Behind. Catch Up.
              </motion.h3>
              <p className="text-white/55 mb-10 text-lg leading-relaxed max-w-lg mx-auto">
                Companies that train every employee on AI outperform those that do not.
                Start with a free individual account or roll out to your entire organization today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={isAuthenticated ? '/dashboard' : '/login'}
                  className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-claude px-10 py-4.5 text-base font-bold text-white hover:bg-claude-dark hover:-translate-y-0.5 transition-all duration-300"
                  style={{ boxShadow: '0 8px 30px rgba(218,119,86,0.3)' }}
                >
                  <Play className="w-5 h-5" />
                  <span>{isAuthenticated ? 'Continue Learning' : 'Start Free'}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/upgrade"
                  className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/[0.04] px-10 py-4.5 text-base font-bold text-white hover:bg-white/[0.08] hover:border-white/25 hover:-translate-y-0.5 backdrop-blur-sm transition-all duration-300"
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
