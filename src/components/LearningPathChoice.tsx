"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgress } from '@/context/ProgressContext';
import { Sparkles, BookOpen, Rocket, User, ArrowRight, Target, Lightbulb, Code, Zap, ChevronRight } from 'lucide-react';

const pathOptions = [
  {
    id: 'custom',
    name: 'Build Your Project',
    icon: Rocket,
    tagline: 'Learn by creating something you actually want',
    description: 'Tell us what you want to build and we\'ll create a personalized learning path just for you',
    features: [
      'AI-powered project planning',
      'Custom examples using your idea',
      'Build something you\'ll actually use',
      'Get feedback on your real project'
    ],
    benefits: [
      'Higher motivation & engagement',
      'Real portfolio piece you can showcase',
      'Practical skills for your specific goals',
      'Personalized learning experience'
    ],
    nextStep: '/project-wizard',
    recommended: true,
    timeCommitment: 'Adaptive to your project scope',
    difficulty: 'Tailored to your experience',
    outcome: 'Your own project built with AI assistance'
  },
  {
    id: 'structured',
    name: 'Structured Learning Path',
    icon: BookOpen,
    tagline: 'Follow our proven curriculum step by step',
    description: 'Complete our structured program with exercises, projects, and clear milestones',
    features: [
      'Proven curriculum design',
      'Clear progression milestones',
      'Comprehensive skill coverage',
      'Battle-tested examples'
    ],
    benefits: [
      'No decision paralysis',
      'Guaranteed skill coverage',
      'Clear learning objectives',
      'Proven success track record'
    ],
    nextStep: '/character-selection',
    recommended: false,
    timeCommitment: '2-4 weeks',
    difficulty: 'Beginner to Advanced',
    outcome: 'Complete AI development mastery'
  }
];

export default function LearningPathChoice() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-full border border-purple-500/30 text-purple-300 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Choose Your Learning Adventure
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            How Would You Like to{' '}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Learn?
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Choose the learning style that fits your goals. Both paths use AI assistance,
            but with different approaches to keep you motivated and engaged.
          </p>
        </motion.div>

        {/* Path Options */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 max-w-6xl mx-auto mb-12">
          {pathOptions.map((path, index) => {
            const Icon = path.icon;
            const isSelected = selectedPath === path.id;
            const isHovered = hoveredPath === path.id;

            return (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
                onMouseEnter={() => setHoveredPath(path.id)}
                onMouseLeave={() => setHoveredPath(null)}
              >
                {path.recommended && (
                  <div className="absolute -top-3 left-6 z-20">
                    <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      RECOMMENDED
                    </div>
                  </div>
                )}

                <motion.div
                  className={`relative h-full cursor-pointer rounded-3xl p-8 backdrop-blur-xl border transition-all duration-500 ${
                    isSelected
                      ? 'bg-white/10 border-purple-400/50 ring-2 ring-purple-400/30'
                      : isHovered
                      ? 'bg-white/5 border-white/20 transform scale-[1.02]'
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                  onClick={() => setSelectedPath(path.id)}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Hover glow effect */}
                  {isHovered && (
                    <motion.div
                      className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-emerald-500/20 -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}

                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">{path.name}</h3>
                        <p className="text-purple-300 font-medium">{path.tagline}</p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {path.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-4 mb-6">
                    <h4 className="text-white font-semibold flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-yellow-400" />
                      What You'll Get
                    </h4>
                    <div className="space-y-2">
                      {path.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-4 mb-8">
                    <h4 className="text-white font-semibold flex items-center gap-2">
                      <Zap className="w-4 h-4 text-blue-400" />
                      Why Choose This
                    </h4>
                    <div className="space-y-2">
                      {path.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                          <span className="text-gray-300">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-1">{path.timeCommitment}</div>
                      <div className="text-xs text-gray-400">Time Commitment</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-1">{path.difficulty}</div>
                      <div className="text-xs text-gray-400">Difficulty Level</div>
                    </div>
                  </div>

                  {/* Outcome */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 mb-6">
                    <h5 className="text-white font-semibold mb-2 flex items-center gap-2">
                      <Target className="w-4 h-4 text-emerald-400" />
                      Your Outcome
                    </h5>
                    <p className="text-gray-300 text-sm">{path.outcome}</p>
                  </div>

                  {/* Selection indicator */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute top-8 right-8"
                      >
                        <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.1 }}
                          >
                            <ArrowRight className="w-4 h-4 text-white" />
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Continue Button */}
        <AnimatePresence>
          {selectedPath && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <Link
                href={pathOptions.find(p => p.id === selectedPath)?.nextStep || '/'}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                Start Your Journey
                <ChevronRight className="w-5 h-5" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
