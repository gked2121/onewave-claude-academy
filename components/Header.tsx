"use client";

import { useProgress } from "@/context/ProgressContext";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Zap, Trophy, Menu, X } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";
import { useState } from "react";

export default function Header() {
  const progress = useProgress();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Calculate level from XP (every 500 XP = 1 level)
  const level = Math.floor(progress.xp / 500);
  const xpInCurrentLevel = progress.xp % 500;
  const xpProgressPercent = (xpInCurrentLevel / 500) * 100;

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-orange-500/20">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Logo size="md" showAnimation={false} />
          </Link>

          {/* Stats - Desktop Only */}
          <div className="hidden md:flex items-center gap-4">
            {/* Streak */}
            {progress.streak > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-2 bg-orange-500/20 border border-orange-400/50 rounded-full px-3 py-1.5"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                >
                  <Flame className="w-4 h-4 text-orange-400" />
                </motion.div>
                <span className="text-sm font-bold text-orange-300">
                  {progress.streak} day{progress.streak > 1 ? 's' : ''}
                </span>
              </motion.div>
            )}

            {/* Level & XP */}
            <div className="flex items-center gap-3 bg-orange-500/20 border border-orange-400/50 rounded-full px-4 py-1.5">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-orange-400" />
                <span className="text-sm font-bold text-orange-300">
                  Lvl {level}
                </span>
              </div>
              <div className="w-24 h-2 bg-black/40 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${xpProgressPercent}%` }}
                  className="h-full bg-gradient-to-r from-orange-500 to-amber-500"
                />
              </div>
              <span className="text-xs text-orange-400">
                {progress.xp} XP
              </span>
            </div>

            {/* User Name */}
            {progress.userName && (
              <div className="flex items-center gap-2 bg-orange-500/20 border border-orange-400/50 rounded-full px-3 py-1.5">
                <span className="text-sm font-bold text-orange-300">
                  {progress.userName}
                </span>
              </div>
            )}

            {/* Achievements */}
            <Link
              href="/achievements"
              className="flex items-center gap-2 bg-yellow-500/20 border border-yellow-400/50 rounded-full px-3 py-1.5 hover:bg-yellow-500/30 transition-colors"
            >
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-bold text-yellow-300">
                {progress.achievements.length}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="hover:text-orange-300 transition-colors font-medium">Home</Link>
            <Link href="/journey" className="hover:text-orange-300 transition-colors font-medium">Journey</Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 transition-colors"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>

    {/* Mobile Menu */}
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-[72px] left-0 right-0 z-40 md:hidden bg-black/95 backdrop-blur-xl border-b border-orange-500/20"
        >
          <nav className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-4">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="py-3 px-4 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 text-center font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/journey"
              onClick={() => setIsMenuOpen(false)}
              className="py-3 px-4 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 text-center font-medium transition-colors"
            >
              Journey
            </Link>
            {/* User Stats - Mobile Only */}
            <div className="mt-4 pt-4 border-t border-orange-500/20 space-y-3">
              {progress.userName && (
                <div className="flex justify-between items-center px-4">
                  <span className="text-orange-300 text-sm">Name</span>
                  <span className="text-orange-100 font-bold">{progress.userName}</span>
                </div>
              )}
              <div className="flex justify-between items-center px-4">
                <span className="text-orange-300 text-sm">Level</span>
                <span className="text-orange-100 font-bold">{level}</span>
              </div>
              <div className="flex justify-between items-center px-4">
                <span className="text-orange-300 text-sm">XP</span>
                <span className="text-orange-100 font-bold">{progress.xp}</span>
              </div>
              <div className="flex justify-between items-center px-4">
                <span className="text-orange-300 text-sm">Achievements</span>
                <span className="text-orange-100 font-bold">{progress.achievements.length}</span>
              </div>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
