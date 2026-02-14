"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Target, Trophy, Rocket } from "lucide-react";
import { useState } from "react";

interface WelcomeModalProps {
  onClose: () => void;
}

export default function WelcomeModal({ onClose }: WelcomeModalProps) {
  const [step, setStep] = useState(0);

  const steps = [
    {
      icon: <Sparkles className="w-16 h-16 text-orange-400" />,
      title: "You\u2019re Underusing Claude",
      description: "Most people barely scratch the surface. You\u2019re about to change that.",
      emoji: "👋",
    },
    {
      icon: <Target className="w-16 h-16 text-amber-400" />,
      title: "Pick Your Path",
      description: "Prompting, productivity, or development. All roads lead to mastery.",
      emoji: "🎯",
    },
    {
      icon: <Trophy className="w-16 h-16 text-yellow-400" />,
      title: "10 Levels. Real Skills.",
      description: "Each level unlocks a real capability. By the end, Claude feels like a different tool.",
      emoji: "🏆",
    },
    {
      icon: <Rocket className="w-16 h-16 text-orange-400" />,
      title: "Level 0 Is on Us",
      description: "Start free. No account needed. See what you\u2019ve been missing.",
      emoji: "🚀",
    },
  ];

  const currentStep = steps[step];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onClose();
    }
  };

  const handleSkip = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
        onClick={handleSkip}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-gradient-to-br from-orange-900/95 to-amber-900/95 backdrop-blur-xl rounded-3xl p-8 max-w-2xl w-full border-2 border-orange-400/50 shadow-2xl relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -top-20 -right-20 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                rotate: [360, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -bottom-20 -left-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"
            />
          </div>

          {/* Close button */}
          <button
            onClick={handleSkip}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Content */}
          <div className="relative z-10">
            {/* Step indicator */}
            <div className="flex justify-center gap-2 mb-8">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === step
                      ? "w-8 bg-gradient-to-r from-orange-500 to-amber-500"
                      : index < step
                      ? "w-2 bg-orange-400"
                      : "w-2 bg-orange-800"
                  }`}
                />
              ))}
            </div>

            {/* Animated emoji */}
            <motion.div
              key={step}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-8xl text-center mb-6"
            >
              {currentStep.emoji}
            </motion.div>

            {/* Icon and title */}
            <motion.div
              key={`content-${step}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="flex justify-center mb-4">
                {currentStep.icon}
              </div>
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-300 via-amber-300 to-yellow-300 bg-clip-text text-transparent">
                {currentStep.title}
              </h2>
              <p className="text-xl text-orange-100 mb-8 leading-relaxed max-w-xl mx-auto">
                {currentStep.description}
              </p>
            </motion.div>

            {/* Navigation buttons */}
            <div className="flex gap-4 justify-center">
              {step > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStep(step - 1)}
                  className="px-8 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-all"
                >
                  Back
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold shadow-xl hover:shadow-orange-500/50 transition-all flex items-center gap-2"
              >
                {step < steps.length - 1 ? (
                  <>
                    Next
                    <Rocket className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Start Learning
                    <Sparkles className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </div>

            {/* Skip button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handleSkip}
              className="mt-4 text-orange-300 hover:text-orange-100 text-sm transition-colors mx-auto block"
            >
              Skip tutorial
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
