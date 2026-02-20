"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { MessageCircle, ArrowRight, Sparkles, Zap, Trophy, Play, CheckCircle, Briefcase, Rocket } from 'lucide-react';
import Breadcrumbs from './Breadcrumbs';
import NavigationButtons from './NavigationButtons';

interface AgentIntroductionProps {
  characterName: string;
  characterIconName: string;
}

export default function AgentIntroduction({ characterName, characterIconName }: AgentIntroductionProps) {
  const [currentStep, setCurrentStep] = useState(0);

  // Map icon name to component
  const iconMap = {
    'Briefcase': Briefcase,
    'Zap': Zap,
    'Rocket': Rocket,
  };

  const CharacterIcon = iconMap[characterIconName as keyof typeof iconMap] || Zap;

  const introSteps = [
    {
      title: `Meet Your ${characterName} AI Agent`,
      content: `Hi! I'm your personal AI coding agent. I'll guide you through every step of your AI coding journey, from basic terminal commands to building real applications.`,
      icon: MessageCircle,
      action: () => setCurrentStep(1)
    },
    {
      title: "How Our Learning System Works",
      content: "You'll complete interactive levels, earn XP points, and unlock achievements. Each level builds on the previous one, but I'm always here to help when you get stuck.",
      icon: Trophy,
      action: () => setCurrentStep(2)
    },
    {
      title: "Ready to Start?",
      content: "Your first challenge is the Setup Wizard - we'll install AI development tools together. Don't worry, I'll walk you through every command!",
      icon: Play,
      action: null
    }
  ];

  const currentIntroStep = introSteps[currentStep];

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="absolute inset-0 -z-10 overflow-hidden bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-[radial-gradient(45rem_50rem_at_top,rgba(47,201,244,0.1),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(50rem_45rem_at_bottom,rgba(0,199,189,0.1),transparent)]" />
      </div>

      <div className="max-w-4xl w-full">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <Breadcrumbs />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900 backdrop-blur-xl rounded-2xl border border-white/10 p-8 relative overflow-hidden"
          style={{ backgroundColor: '#18181b' }}
        >
          {/* Decorative elements */}
          <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-xl" />
          <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full blur-lg" />

          {/* Character Icon */}
          <div className="flex items-center gap-4 mb-8 relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center">
              <CharacterIcon className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{characterName} Agent</h1>
              <p className="text-white/60">Your AI Coding Guide</p>
            </div>
            <div className="ml-auto">
              <div className="flex items-center gap-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full px-3 py-1">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-emerald-400 text-sm font-medium">Online</span>
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="mb-8"
            >
              {/* Message bubble */}
              <div className="bg-zinc-800 rounded-2xl p-6 border border-white/10 relative" style={{ backgroundColor: '#27272a' }}>
                <div className="absolute -left-2 top-6 w-4 h-4 bg-zinc-800 border-l border-t border-white/10 rotate-45" style={{ backgroundColor: '#27272a' }} />

                <div className="flex items-start gap-3 mb-4">
                  <currentIntroStep.icon className="w-5 h-5 text-primary mt-1" />
                  <h2 className="text-xl font-semibold text-white">{currentIntroStep.title}</h2>
                </div>

                <p className="text-white/80 leading-relaxed mb-4">
                  {currentIntroStep.content}
                </p>

                {currentStep === 1 && (
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 text-center">
                      <Zap className="w-6 h-6 text-primary mx-auto mb-1" />
                      <div className="text-xs text-white/70">Earn XP</div>
                    </div>
                    <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-3 text-center">
                      <Trophy className="w-6 h-6 text-secondary mx-auto mb-1" />
                      <div className="text-xs text-white/70">Unlock Badges</div>
                    </div>
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 text-center">
                      <Sparkles className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
                      <div className="text-xs text-white/70">Level Up</div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress indicator */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {introSteps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index <= currentStep ? 'bg-primary' : 'bg-white/20'
                }`}
              />
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 justify-center">
            {currentStep < 2 ? (
              <button
                onClick={() => {
                  if (currentIntroStep.action) {
                    currentIntroStep.action();
                  } else {
                    setCurrentStep(prev => prev + 1);
                  }
                }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary px-6 py-3 rounded-xl text-white font-semibold hover:scale-105 transition-transform"
              >
                {currentStep === 0 ? 'Start Chat' : 'Continue'}
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex gap-3">
                <Link
                  href="/level/0"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary px-8 py-3 rounded-xl text-white font-semibold hover:scale-105 transition-transform"
                >
                  <Play className="w-4 h-4" />
                  Start Level 0
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/journey"
                  className="inline-flex items-center gap-2 bg-white/5 border border-white/20 px-6 py-3 rounded-xl text-white font-semibold hover:bg-white/10 transition-colors"
                >
                  View Full Journey
                </Link>
              </div>
            )}
          </div>

          {/* Skip option */}
          {currentStep < 2 && (
            <div className="text-center mt-4">
              <Link
                href="/journey"
                className="text-white/50 text-sm hover:text-white/70 transition-colors"
              >
                Skip introduction
              </Link>
            </div>
          )}
        </motion.div>

        {/* Quick tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center"
        >
          <p className="text-white/60 text-sm flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            Takes 2-3 minutes • Completely free to try • No credit card required
          </p>
        </motion.div>

        {/* Navigation buttons */}
        <div className="mt-8">
          <NavigationButtons
            showBack={true}
            showContinue={false}
            customBack={{
              href: "/character-selection",
              text: "Back to Character Selection"
            }}
          />
        </div>
      </div>
    </div>
  );
}