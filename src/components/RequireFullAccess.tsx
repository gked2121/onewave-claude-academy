"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useProgress } from '@/context/ProgressContext';
import { Crown, Zap, Star, ArrowRight, CheckCircle, Lock, Sparkles } from 'lucide-react';

interface RequireFullAccessProps {
  children: React.ReactNode;
  level?: number;
  showProgress?: boolean;
}

export default function RequireFullAccess({
  children,
  level,
  showProgress = true
}: RequireFullAccessProps) {
  const { plan, completedLevels, xp } = useProgress();

  if (plan === 'full') return <>{children}</>;

  const completedCount = completedLevels.length;
  const progressPercentage = Math.min((completedCount / 1) * 100, 100); // Show progress out of 1 free level

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      {/* Background gradients */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(45rem_50rem_at_top,rgba(47,201,244,0.2),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(50rem_45rem_at_bottom,rgba(0,199,189,0.15),transparent)]" />
      </div>

      <motion.div
        className="max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Progress Badge */}
        {showProgress && completedCount > 0 && (
          <motion.div
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-2 text-sm backdrop-blur mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <CheckCircle className="w-4 h-4 text-primary" />
            <span className="text-white font-semibold">
              You completed {completedCount} level{completedCount !== 1 ? 's' : ''} • {xp} XP earned!
            </span>
          </motion.div>
        )}

        {/* Lock Icon */}
        <motion.div
          className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          <Crown className="w-10 h-10 text-primary" />
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gradient-primary mb-4">
            Ready for More?
          </h1>

          <div className="mb-8">
            <p className="text-xl text-white/90 mb-3">
              You've experienced the power of AI coding!
            </p>
            <p className="text-white/70 max-w-xl mx-auto">
              {level ? `Level ${level}` : 'Advanced levels'} and beyond contain the real magic:
              <strong className="text-primary"> AI workflows, advanced prompts, and professional projects</strong>
              that transform beginners into confident developers.
            </p>
          </div>

          {/* Progress Bar (if showing progress) */}
          {showProgress && (
            <div className="mb-8">
              <div className="flex justify-between text-sm text-white/60 mb-2">
                <span>Free Trial Progress</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ delay: 0.6, duration: 1 }}
                />
              </div>
            </div>
          )}

          {/* Value Proposition */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-left">
            <div className="bg-zinc-900/50 rounded-xl p-4 ring-1 ring-primary/10">
              <Zap className="w-6 h-6 text-primary mb-2" />
              <h3 className="font-semibold text-white text-sm">All Levels</h3>
              <p className="text-xs text-white/60">8+ advanced coding challenges</p>
            </div>
            <div className="bg-zinc-900/50 rounded-xl p-4 ring-1 ring-secondary/10">
              <Sparkles className="w-6 h-6 text-secondary mb-2" />
              <h3 className="font-semibold text-white text-sm">AI Coach</h3>
              <p className="text-xs text-white/60">Personal guidance & feedback</p>
            </div>
            <div className="bg-zinc-900/50 rounded-xl p-4 ring-1 ring-yellow-500/10">
              <Star className="w-6 h-6 text-yellow-400 mb-2" />
              <h3 className="font-semibold text-white text-sm">Lifetime Access</h3>
              <p className="text-xs text-white/60">One payment, forever yours</p>
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Link
            href="/upgrade"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary px-8 py-4 rounded-2xl text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          >
            <Crown className="w-5 h-5" />
            Upgrade Now
            <ArrowRight className="w-5 h-5" />
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 border border-white/20 bg-white/5 px-8 py-4 rounded-2xl text-white font-semibold backdrop-blur hover:bg-white/10 transition-colors"
          >
            Back to Home
          </Link>
        </motion.div>

        {/* Testimonial/Social Proof */}
        <motion.div
          className="mt-8 pt-8 border-t border-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-sm text-white/60 mb-2">Join thousands who've upgraded their coding skills</p>
          <div className="flex items-center justify-center gap-1 text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
            <span className="ml-2 text-white/60 text-sm">Loved by developers worldwide</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
