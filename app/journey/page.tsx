"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/context/ProgressContext";
import { useRouter } from "next/navigation";
import { Lock, CheckCircle2, Crown, Sparkles, Star, Target, Zap, ArrowRight, X } from "lucide-react";
import levels from "@/lib/levels";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function LevelCard({ level, isUnlocked, isCompleted, onClick }: { level: any; isUnlocked: boolean; isCompleted: boolean; onClick: () => void }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <motion.div
        whileHover={isUnlocked ? { scale: 1.05, y: -5 } : {}}
        whileTap={isUnlocked ? { scale: 0.95 } : {}}
        onClick={() => isUnlocked && onClick()}
        className={`relative cursor-pointer rounded-3xl p-6 border-2 transition-all ${
          isCompleted
            ? `border-green-400/50 bg-gradient-to-br from-green-900/30 to-emerald-900/30 shadow-lg shadow-green-500/20`
            : isUnlocked
            ? `border-orange-500/50 bg-black/40 hover:border-orange-400 hover:shadow-xl hover:shadow-orange-500/30`
            : `border-gray-600/30 bg-black/20 opacity-60 cursor-not-allowed`
        } backdrop-blur-xl group`}
      >
        {/* Level Number Badge */}
        <div className={`absolute -top-3 -left-3 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
          isCompleted ? "bg-green-500" : isUnlocked ? "bg-orange-500" : "bg-gray-600"
        } text-white shadow-lg`}>
          {level.id}
        </div>

        {/* Status Icon */}
        <div className="absolute -top-3 -right-3">
          {isCompleted ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-green-500 rounded-full p-2 shadow-lg"
            >
              <CheckCircle2 className="w-5 h-5 text-white" />
            </motion.div>
          ) : !isUnlocked ? (
            <div className="bg-gray-600 rounded-full p-2 shadow-lg">
              <Lock className="w-5 h-5 text-white" />
            </div>
          ) : level.isPaid ? (
            <div className="bg-yellow-500 rounded-full p-2 shadow-lg">
              <Crown className="w-4 h-4 text-white" />
            </div>
          ) : null}
        </div>

        {/* Emoji */}
        <motion.div
          animate={isUnlocked ? {
            y: [0, -5, 0],
            rotate: [0, 5, -5, 0]
          } : {}}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-6xl mb-4 text-center filter drop-shadow-lg"
        >
          {level.emoji}
        </motion.div>

        {/* Title */}
        <h3 className={`text-xl font-bold text-center mb-2 bg-gradient-to-r ${level.color} bg-clip-text text-transparent`}>
          {level.title}
        </h3>

        {/* Description */}
        <p className="text-stone-200 text-sm text-center mb-4 leading-relaxed">
          {level.description}
        </p>

        {/* Skills Tags */}
        <div className="flex flex-wrap gap-1 justify-center mb-4">
          {level.skills.slice(0, 2).map((skill: string, i: number) => (
            <span key={i} className="text-xs px-2 py-1 bg-white/5 rounded-full text-stone-300">
              {skill}
            </span>
          ))}
          {level.skills.length > 2 && (
            <span className="text-xs px-2 py-1 bg-orange-500/20 rounded-full text-orange-300">
              +{level.skills.length - 2}
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-orange-400 pt-4 border-t border-amber-200/15">
          <div className="flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>{level.xp} XP</span>
          </div>
          <div>{level.estimatedTime}</div>
        </div>

        {/* Details Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowDetails(true);
          }}
          className="w-full mt-4 py-2 px-4 rounded-xl bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/50 text-orange-200 text-sm font-semibold transition-all"
        >
          View Details
        </button>
      </motion.div>

      {/* Details Modal */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`bg-gradient-to-br from-orange-900/90 to-amber-900/90 backdrop-blur-xl rounded-3xl p-8 max-w-2xl w-full border-2 border-orange-400/50 shadow-2xl`}
            >
              <button
                onClick={() => setShowDetails(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              <div className="text-center mb-6">
                <div className="text-7xl mb-4">{level.emoji}</div>
                <h2 className={`text-3xl font-bold mb-3 bg-gradient-to-r ${level.color} bg-clip-text text-transparent`}>
                  Level {level.id}: {level.title}
                </h2>
                <p className="text-amber-50 text-lg">{level.description}</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-black/30 rounded-xl p-4">
                  <h3 className="font-semibold text-orange-300 mb-2 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Skills You&apos;ll Master:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {level.skills.map((skill: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-white/10 rounded-lg text-amber-50 text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/30 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-orange-300 mb-1">
                      <Sparkles className="w-4 h-4" />
                      <span className="font-semibold">XP Reward</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{level.xp}</p>
                  </div>
                  <div className="bg-black/30 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-orange-300 mb-1">
                      <Zap className="w-4 h-4" />
                      <span className="font-semibold">Time Required</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{level.estimatedTime}</p>
                  </div>
                </div>
              </div>

              {isUnlocked ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setShowDetails(false);
                    onClick();
                  }}
                  className={`w-full py-4 px-6 rounded-xl bg-gradient-to-r ${level.color} text-white font-bold text-lg shadow-xl flex items-center justify-center gap-2`}
                >
                  {isCompleted ? (
                    <>
                      <Star className="w-5 h-5" />
                      Review Level
                    </>
                  ) : (
                    <>
                      Start Level
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              ) : (
                <div className="w-full py-4 px-6 rounded-xl bg-gray-600/50 text-gray-300 font-bold text-lg text-center flex items-center justify-center gap-2">
                  <Lock className="w-5 h-5" />
                  Upgrade to Pro to Unlock
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function JourneyPage() {
  const { isLevelUnlocked, isLevelCompleted, plan } = useProgress();
  const router = useRouter();

  const handleLevelClick = (level: typeof levels[0]) => {
    if (level.id === 0 || plan === "pro" || isLevelUnlocked(level.id)) {
      router.push(`/level/${level.id}`);
    }
  };

  const totalXP = levels.reduce((sum, level) => sum + level.xp, 0);
  const earnedXP = levels
    .filter(level => isLevelCompleted(level.id))
    .reduce((sum, level) => sum + level.xp, 0);
  const completedCount = levels.filter(level => isLevelCompleted(level.id)).length;

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="text-7xl mb-4"
        >
          🗺️
        </motion.div>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
          The Path to Claude Mastery
        </h1>
        <p className="text-xl text-amber-100 mb-6">
          Each level builds on the last. By the end, you&apos;ll wonder how you worked without this.
        </p>

        {/* Overall Progress Stats */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-4 border border-amber-200/20">
              <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                {completedCount}/{levels.length}
              </div>
              <div className="text-sm text-stone-300">Levels Complete</div>
            </div>
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-4 border border-amber-200/20">
              <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                {earnedXP}
              </div>
              <div className="text-sm text-stone-300">XP Earned</div>
            </div>
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-4 border border-amber-200/20">
              <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                {Math.round((earnedXP / totalXP) * 100)}%
              </div>
              <div className="text-sm text-stone-300">Progress</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-black/40 rounded-full h-6 overflow-hidden border border-amber-200/20">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(earnedXP / totalXP) * 100}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 flex items-center justify-end pr-3"
            >
              {earnedXP > 0 && (
                <span className="text-xs font-bold text-white">{earnedXP} / {totalXP} XP</span>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Levels Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {levels.map((level, index) => {
          const isUnlocked = level.id === 0 || plan === "pro" || isLevelUnlocked(level.id);
          const isCompleted = isLevelCompleted(level.id);

          return (
            <React.Fragment key={level.id}>
              {/* Advanced Track Separator */}
              {level.id === 10 && (
                <div className="md:col-span-2 lg:col-span-3">
                  <div className="flex items-center gap-4 py-6">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
                    <div className="text-center">
                      <div className="text-3xl mb-1">🚀</div>
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                        Advanced Track
                      </h2>
                      <p className="text-sm text-cyan-300/70 mt-1">
                        Deep-dive into Claude Code, automation, and system architecture.
                      </p>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
                  </div>
                </div>
              )}
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.1, type: "spring" }}
              >
                <LevelCard
                  level={level}
                  isUnlocked={isUnlocked}
                  isCompleted={isCompleted}
                  onClick={() => handleLevelClick(level)}
                />
              </motion.div>
            </React.Fragment>
          );
        })}
      </div>

      {/* Upgrade CTA */}
      {plan === "free" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-4xl mx-auto bg-gradient-to-r from-orange-500/20 via-amber-500/20 to-yellow-500/20 backdrop-blur-xl rounded-3xl p-8 border-2 border-orange-400/50"
        >
          <div className="text-center">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="text-6xl mb-4"
            >
              👑
            </motion.div>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
              Level 0 Was Just the Beginning
            </h2>
            <p className="text-xl text-amber-50 mb-6 max-w-2xl mx-auto">
              Unlock all 15 levels and go from &apos;I&apos;ve used Claude&apos; to &apos;Claude is how I work.&apos; Every level builds a real skill.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
              <div className="flex items-center gap-2 text-green-300">
                <CheckCircle2 className="w-5 h-5" />
                <span>All 15 Levels</span>
              </div>
              <div className="flex items-center gap-2 text-green-300">
                <CheckCircle2 className="w-5 h-5" />
                <span>Interactive Simulators</span>
              </div>
              <div className="flex items-center gap-2 text-green-300">
                <CheckCircle2 className="w-5 h-5" />
                <span>Real-World Projects</span>
              </div>
              <div className="flex items-center gap-2 text-green-300">
                <CheckCircle2 className="w-5 h-5" />
                <span>Lifetime Access</span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold text-xl shadow-2xl shadow-orange-500/50 hover:shadow-orange-500/70 transition-all flex items-center justify-center gap-3 mx-auto"
            >
              <Crown className="w-6 h-6" />
              Unlock All Levels &mdash; $9.99/mo
              <ArrowRight className="w-6 h-6" />
            </motion.button>
            <p className="text-stone-400 text-sm mt-4">
              Cancel anytime. You&apos;ll know if it&apos;s worth it by Level 2.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
