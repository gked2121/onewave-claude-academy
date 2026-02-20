"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useProgress } from '@/context/ProgressContext';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Rocket,
  Trophy,
  Star,
  Heart,
  Zap,
  ChevronRight,
  Gift,
  Shield,
  Target,
  Play,
  BookOpen,
  HelpCircle
} from 'lucide-react';

interface OnboardingStep {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  action?: () => void;
  actionLabel?: string;
}

export default function BeginnerOnboarding() {
  const router = useRouter();
  const { userEmail, addXP, updatePreferences } = useProgress();
  const [currentStep, setCurrentStep] = useState(0);
  const [userName, setUserName] = useState('');
  const [selectedPath, setSelectedPath] = useState<'absolute-beginner' | 'some-experience' | ''>('');
  const [showRewards, setShowRewards] = useState(false);

  const triggerCelebration = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#2FC1F4', '#00C7BD', '#FFD700']
    });
  };

  const steps: OnboardingStep[] = [
    {
      id: 0,
      title: "Welcome to Your Coding Adventure!",
      subtitle: "Let's make you a vibe coder in the friendliest way possible",
      icon: <Sparkles className="w-8 h-8 text-primary" />,
      content: (
        <div className="space-y-6">
          <div className="bg-primary/10 rounded-xl p-6 border border-primary/20">
            <p className="text-white/90 text-lg leading-relaxed">
              Hi there! I'm your AI guide, and I'm here to make coding <span className="text-primary font-semibold">fun and easy</span>!
            </p>
            <p className="text-white/80 mt-3">
              No scary terminals, no confusing jargon - just step-by-step learning with lots of rewards!
            </p>
          </div>

          <div className="space-y-3">
            <label className="text-white/90 text-sm font-medium">What should I call you?</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name or nickname"
              className="w-full px-4 py-3 bg-zinc-800/50 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
      ),
      actionLabel: "Let's Start! →"
    },
    {
      id: 1,
      title: `Nice to meet you, ${userName || 'friend'}!`,
      subtitle: "Let me understand where you're starting from",
      icon: <Target className="w-8 h-8 text-secondary" />,
      content: (
        <div className="space-y-4">
          <p className="text-white/80 mb-6">Choose the path that fits you best:</p>

          <button
            onClick={() => setSelectedPath('absolute-beginner')}
            className={`w-full p-6 rounded-xl border-2 transition-all ${
              selectedPath === 'absolute-beginner'
                ? 'border-primary bg-primary/10'
                : 'border-white/10 bg-zinc-900/50 hover:bg-zinc-800/50'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <Heart className="w-6 h-6 text-pink-400" />
              </div>
              <div className="text-left">
                <h3 className="text-white font-semibold text-lg mb-2">
                  I'm Brand New to Coding
                </h3>
                <p className="text-white/70 text-sm">
                  Never written code before? Perfect! We'll start with the absolute basics and build up slowly.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-pink-400/20 text-pink-400 rounded-full text-xs">Extra Gentle</span>
                  <span className="px-2 py-1 bg-pink-400/20 text-pink-400 rounded-full text-xs">More Rewards</span>
                  <span className="px-2 py-1 bg-pink-400/20 text-pink-400 rounded-full text-xs">Baby Steps</span>
                </div>
              </div>
            </div>
          </button>

          <button
            onClick={() => setSelectedPath('some-experience')}
            className={`w-full p-6 rounded-xl border-2 transition-all ${
              selectedPath === 'some-experience'
                ? 'border-secondary bg-secondary/10'
                : 'border-white/10 bg-zinc-900/50 hover:bg-zinc-800/50'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <Zap className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="text-left">
                <h3 className="text-white font-semibold text-lg mb-2">
                  I've Tried Coding Before
                </h3>
                <p className="text-white/70 text-sm">
                  Know some basics but want to level up with AI tools? We'll move a bit faster.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-yellow-400/20 text-yellow-400 rounded-full text-xs">Skip Basics</span>
                  <span className="px-2 py-1 bg-yellow-400/20 text-yellow-400 rounded-full text-xs">More Projects</span>
                  <span className="px-2 py-1 bg-yellow-400/20 text-yellow-400 rounded-full text-xs">Faster Pace</span>
                </div>
              </div>
            </div>
          </button>
        </div>
      ),
      actionLabel: "Continue →"
    },
    {
      id: 2,
      title: "Your Learning Style",
      subtitle: "Everyone learns differently - let's find what works for you",
      icon: <BookOpen className="w-8 h-8 text-primary" />,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-zinc-900/50 rounded-xl p-4 border border-primary/20">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-3">
                <Play className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-white font-medium mb-1">Interactive Demos</h4>
              <p className="text-white/60 text-sm">See code run in real-time</p>
            </div>

            <div className="bg-zinc-900/50 rounded-xl p-4 border border-secondary/20">
              <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-3">
                <Trophy className="w-6 h-6 text-secondary" />
              </div>
              <h4 className="text-white font-medium mb-1">Instant Rewards</h4>
              <p className="text-white/60 text-sm">Earn XP and badges</p>
            </div>

            <div className="bg-zinc-900/50 rounded-xl p-4 border border-yellow-400/20">
              <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center mb-3">
                <HelpCircle className="w-6 h-6 text-yellow-400" />
              </div>
              <h4 className="text-white font-medium mb-1">AI Helper</h4>
              <p className="text-white/60 text-sm">Get help anytime</p>
            </div>

            <div className="bg-zinc-900/50 rounded-xl p-4 border border-pink-400/20">
              <div className="w-12 h-12 bg-pink-400/20 rounded-lg flex items-center justify-center mb-3">
                <Shield className="w-6 h-6 text-pink-400" />
              </div>
              <h4 className="text-white font-medium mb-1">Safe Practice</h4>
              <p className="text-white/60 text-sm">Can't break anything!</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl p-6 border border-white/10">
            <p className="text-white/90 text-center">
              <span className="text-2xl mb-2 block"><Target className="w-6 h-6 text-primary inline" /></span>
              Our promise: You'll write your first working code in <span className="text-primary font-bold">under 5 minutes</span>!
            </p>
          </div>
        </div>
      ),
      actionLabel: "I'm Ready!"
    },
    {
      id: 3,
      title: "Welcome Rewards Unlocked!",
      subtitle: "Here's what you get for joining",
      icon: <Gift className="w-8 h-8 text-yellow-400" />,
      content: (
        <div className="space-y-6">
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.2 }}
          >
            <motion.div
              className="bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded-xl p-4 border border-yellow-400/30"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-3">
                <Star className="w-6 h-6 text-yellow-400" />
                <div>
                  <p className="text-white font-semibold">+100 XP Welcome Bonus!</p>
                  <p className="text-white/60 text-sm">You're already making progress!</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl p-4 border border-primary/30"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3">
                <Trophy className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-white font-semibold">First Steps Badge Earned!</p>
                  <p className="text-white/60 text-sm">Your first achievement!</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-r from-secondary/20 to-pink-400/20 rounded-xl p-4 border border-secondary/30"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-3">
                <Rocket className="w-6 h-6 text-secondary" />
                <div>
                  <p className="text-white font-semibold">3-Day Streak Started!</p>
                  <p className="text-white/60 text-sm">Come back tomorrow for bonus XP!</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div className="bg-zinc-900/50 rounded-xl p-6 border border-white/10">
            <h4 className="text-white font-medium mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Your First Mission:
            </h4>
            <p className="text-white/80">
              Write a simple &quot;Hello World&quot; program and see it run instantly!
              {selectedPath === 'absolute-beginner' && " Don't worry, I'll guide you through every single step!"}
            </p>
          </div>
        </div>
      ),
      actionLabel: "Start My First Mission!",
      action: () => {
        triggerCelebration();
        addXP(100);
        updatePreferences({ welcomeCompleted: true } as any);
        setTimeout(() => {
          router.push('/level/1');
        }, 1500);
      }
    }
  ];

  const currentStepData = steps[currentStep];

  const handleNext = () => {
    if (currentStep === 1 && !selectedPath) {
      return;
    }

    if (currentStepData.action) {
      currentStepData.action();
    } else if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const canProceed = () => {
    if (currentStep === 0) return userName.length > 0;
    if (currentStep === 1) return selectedPath !== '';
    return true;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        className="max-w-2xl w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-zinc-900/90 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
          {/* Progress Bar */}
          <div className="h-2 bg-zinc-800">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-secondary"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Content */}
          <div className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center">
                    {currentStepData.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {currentStepData.title}
                    </h2>
                    <p className="text-white/60 text-sm">
                      {currentStepData.subtitle}
                    </p>
                  </div>
                </div>

                <div className="mb-8">
                  {currentStepData.content}
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
                    className={`px-4 py-2 text-white/60 hover:text-white transition-colors ${
                      currentStep === 0 ? 'invisible' : ''
                    }`}
                  >
                    ← Back
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                      canProceed()
                        ? 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:scale-105'
                        : 'bg-zinc-800 text-white/40 cursor-not-allowed'
                    }`}
                  >
                    {currentStepData.actionLabel || 'Continue'}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Help Button */}
        <motion.button
          className="mt-6 mx-auto flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <HelpCircle className="w-4 h-4" />
          <span className="text-sm">Need help? Click here</span>
        </motion.button>
      </motion.div>
    </div>
  );
}
