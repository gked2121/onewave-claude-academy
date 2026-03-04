"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useProgress } from "@/context/ProgressContext";
import { motion } from "framer-motion";
import { Menu, X, Star, Trophy, Zap, LogOut, LogIn, Settings, ShieldCheck, Users } from "lucide-react";
import useOrgRole from "@/hooks/useOrgRole";

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
        isActive
          ? 'bg-primary/20 text-primary'
          : 'text-white/70 hover:text-white hover:bg-white/5'
      }`}
    >
      {label}
    </Link>
  );
}

function XPCounter() {
  const { xp } = useProgress();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full border border-primary/20">
        <Star className="w-4 h-4 text-primary" />
        <span className="text-sm font-semibold text-primary">0 XP</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full border border-primary/20">
      <Star className="w-4 h-4 text-primary" />
      <span className="text-sm font-semibold text-primary">{xp} XP</span>
    </div>
  );
}

function PlanBadge() {
  const { plan, userEmail } = useProgress();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border bg-zinc-800 border-zinc-700">
        <Zap className="w-4 h-4 text-zinc-500" />
        <span className="text-sm font-semibold text-zinc-500">Loading</span>
      </div>
    );
  }

  const isAdmin = userEmail?.toLowerCase().includes('gabe@onewave-ai.com') || userEmail?.toLowerCase().includes('gked21@gmail.com');

  if (isAdmin) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary/10 rounded-full border border-secondary/20">
        <Trophy className="w-4 h-4 text-secondary" />
        <span className="text-sm font-semibold text-secondary">Admin</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${
      plan === 'full'
        ? 'bg-primary/10 border-primary/20'
        : 'bg-zinc-800 border-zinc-700'
    }`}>
      <Zap className={`w-4 h-4 ${plan === 'full' ? 'text-primary' : 'text-zinc-500'}`} />
      <span className={`text-sm font-semibold ${plan === 'full' ? 'text-primary' : 'text-zinc-500'}`}>
        {plan === 'full' ? 'Pro' : 'Free'}
      </span>
    </div>
  );
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { userEmail, logout } = useProgress();
  const { role: orgRole } = useOrgRole();
  const isSignedIn = !!userEmail;
  const showTeamLink = orgRole === 'admin' || orgRole === 'manager';

  useEffect(() => {
    setMounted(true);
  }, []);

  // macOS-style auto-hide on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        // Always show at top
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Show header when mouse is near top of screen
      if (e.clientY < 100) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [lastScrollY]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur bg-zinc-900/80 border-b border-zinc-800"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Link href={(mounted && isSignedIn) ? "/dashboard" : "/"} className="flex items-center gap-3 group">
                <Image
                  src="/favicon.svg"
                  alt="Claude Academy"
                  width={40}
                  height={40}
                  className="group-hover:scale-105 transition-transform rounded-lg"
                />
                <div className="hidden sm:flex flex-col">
                  <span className="font-bold text-lg tracking-tight text-claude">
                    Claude Academy
                  </span>
                  <span className="text-xs text-white/60 -mt-1 tracking-wide">
                    by OneWave AI
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.nav
              className="hidden md:flex items-center gap-1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <NavLink href="/dashboard" label="Dashboard" />
              <NavLink href="/tracks" label="Tracks" />
              <NavLink href="/knowledge-map" label="Knowledge Map" />
              <NavLink href="/achievements" label="Achievements" />
              {showTeamLink && <NavLink href="/admin" label="Team" />}
              <NavLink href="/settings" label="Settings" />
              <NavLink href="/upgrade" label="Upgrade" />
            </motion.nav>

            {/* Right Side Controls */}
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="hidden sm:flex items-center gap-3">
                <XPCounter />
                <PlanBadge />
                {isSignedIn ? (
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors text-sm"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden lg:inline">Logout</span>
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-semibold"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Sign In</span>
                  </Link>
                )}
              </div>

              {/* Mobile menu toggle */}
              <button
                className="md:hidden p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
              </button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          className="fixed inset-x-0 top-16 z-40 md:hidden"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <div className="bg-zinc-900/95 backdrop-blur border-b border-zinc-800 px-4 py-6">
            <nav className="flex flex-col gap-4">
              <Link
                href="/dashboard"
                className="rounded-2xl bg-zinc-800 px-6 py-4 text-center font-semibold text-white hover:bg-zinc-700 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/tracks"
                className="rounded-2xl bg-zinc-800 px-6 py-4 text-center font-semibold text-white hover:bg-zinc-700 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Learning Tracks
              </Link>
              <Link
                href="/knowledge-map"
                className="rounded-2xl bg-zinc-800 px-6 py-4 text-center font-semibold text-white hover:bg-zinc-700 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Knowledge Map
              </Link>
              <Link
                href="/achievements"
                className="rounded-2xl bg-zinc-800 px-6 py-4 text-center font-semibold text-white hover:bg-zinc-700 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Achievements
              </Link>
              {showTeamLink && (
                <Link
                  href="/admin"
                  className="rounded-2xl bg-zinc-800 px-6 py-4 text-center font-semibold text-white hover:bg-zinc-700 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Team
                </Link>
              )}
              <Link
                href="/settings"
                className="rounded-2xl bg-zinc-800 px-6 py-4 text-center font-semibold text-white hover:bg-zinc-700 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Settings
              </Link>
              <Link
                href="/upgrade"
                className="rounded-2xl bg-gradient-to-r from-claude to-primary px-6 py-4 text-center font-semibold text-white shadow-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Upgrade
              </Link>
            </nav>

            <div className="flex flex-col items-center gap-4 mt-6 pt-6 border-t border-zinc-800">
              <div className="flex items-center gap-4">
                <XPCounter />
                <PlanBadge />
              </div>
              {isSignedIn ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold shadow-lg"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}