"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HelpCircle,
  Lightbulb,
  X,
  ChevronRight,
  Sparkles,
  Info,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Eye,
  EyeOff
} from 'lucide-react';

interface Hint {
  id: string;
  title: string;
  content: string;
  type: 'tip' | 'warning' | 'info' | 'success';
  code?: string;
  visual?: React.ReactNode;
}

interface HintSystemProps {
  hints: Hint[];
  context?: string;
  allowSkip?: boolean;
}

export default function HintSystem({ hints, context, allowSkip = true }: HintSystemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [showFullHint, setShowFullHint] = useState(false);
  const [usedHints, setUsedHints] = useState<Set<string>>(new Set());
  const [pulseHelp, setPulseHelp] = useState(true);

  const currentHint = hints[currentHintIndex];

  useEffect(() => {
    const timer = setTimeout(() => {
      setPulseHelp(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, [context]);

  const openHints = () => {
    setIsOpen(true);
    setPulseHelp(false);
    if (currentHint) {
      setUsedHints(prev => new Set([...prev, currentHint.id]));
    }
  };

  const nextHint = () => {
    if (currentHintIndex < hints.length - 1) {
      setCurrentHintIndex(currentHintIndex + 1);
      setShowFullHint(false);
    }
  };

  const prevHint = () => {
    if (currentHintIndex > 0) {
      setCurrentHintIndex(currentHintIndex - 1);
      setShowFullHint(false);
    }
  };

  const getHintIcon = (type: string) => {
    switch (type) {
      case 'tip': return <Lightbulb className="w-5 h-5 text-yellow-400" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-red-400" />;
      case 'info': return <Info className="w-5 h-5 text-primary" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-green-400" />;
      default: return <HelpCircle className="w-5 h-5 text-white/60" />;
    }
  };

  const getHintColor = (type: string) => {
    switch (type) {
      case 'tip': return 'from-yellow-400/20 to-yellow-600/20 border-yellow-400/30';
      case 'warning': return 'from-red-400/20 to-red-600/20 border-red-400/30';
      case 'info': return 'from-primary/20 to-secondary/20 border-primary/30';
      case 'success': return 'from-green-400/20 to-green-600/20 border-green-400/30';
      default: return 'from-zinc-700/20 to-zinc-800/20 border-white/10';
    }
  };

  return (
    <>
      {/* Floating Help Button */}
      <motion.button
        onClick={openHints}
        className={`
          fixed bottom-6 right-6 z-50
          w-14 h-14 rounded-full
          bg-gradient-to-r from-primary to-secondary
          text-white shadow-lg
          flex items-center justify-center
          hover:shadow-xl transition-all
          ${pulseHelp ? 'animate-pulse' : ''}
        `}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <HelpCircle className="w-6 h-6" />
        {hints.length > usedHints.size && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center">
            {hints.length - usedHints.size}
          </span>
        )}
      </motion.button>

      {/* Hint Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => allowSkip && setIsOpen(false)}
            />

            {/* Hint Content */}
            <motion.div
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="bg-zinc-900/95 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
                {/* Header */}
                <div className={`p-6 bg-gradient-to-r ${getHintColor(currentHint?.type || 'info')}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      {getHintIcon(currentHint?.type || 'info')}
                      <h3 className="text-white font-bold text-lg">
                        {currentHint?.title || 'Hint'}
                      </h3>
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Hint Progress */}
                  <div className="flex items-center gap-2">
                    {hints.map((_, index) => (
                      <div
                        key={index}
                        className={`h-1 flex-1 rounded-full transition-all ${
                          index <= currentHintIndex ? 'bg-white/60' : 'bg-white/20'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {!showFullHint ? (
                    <div>
                      <p className="text-white/80 mb-4">
                        Need a hint? I can help you with this challenge!
                      </p>
                      <button
                        onClick={() => setShowFullHint(true)}
                        className="w-full px-4 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg text-white font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        Show Hint
                      </button>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <p className="text-white/90 leading-relaxed mb-4">
                        {currentHint?.content}
                      </p>

                      {/* Code Example */}
                      {currentHint?.code && (
                        <div className="bg-zinc-800/50 rounded-lg p-4 mb-4">
                          <p className="text-white/60 text-xs mb-2">EXAMPLE:</p>
                          <code className="text-primary font-mono text-sm">
                            {currentHint.code}
                          </code>
                        </div>
                      )}

                      {/* Visual Helper */}
                      {currentHint?.visual && (
                        <div className="bg-zinc-800/50 rounded-lg p-4 mb-4">
                          {currentHint.visual}
                        </div>
                      )}

                      {/* Navigation */}
                      <div className="flex items-center justify-between mt-6">
                        <button
                          onClick={prevHint}
                          disabled={currentHintIndex === 0}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                            currentHintIndex === 0
                              ? 'bg-zinc-800/50 text-white/30 cursor-not-allowed'
                              : 'bg-zinc-800 text-white hover:bg-zinc-700'
                          }`}
                        >
                          ← Previous
                        </button>

                        <span className="text-white/60 text-sm">
                          Hint {currentHintIndex + 1} of {hints.length}
                        </span>

                        {currentHintIndex < hints.length - 1 ? (
                          <button
                            onClick={nextHint}
                            className="px-3 py-2 bg-primary rounded-lg text-white text-sm font-medium hover:bg-primary/80 transition-all flex items-center gap-1"
                          >
                            Next Hint
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => setIsOpen(false)}
                            className="px-3 py-2 bg-green-400 rounded-lg text-white text-sm font-medium hover:bg-green-500 transition-all flex items-center gap-1"
                          >
                            Got it!
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Encouragement Footer */}
                <div className="px-6 pb-6">
                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-3 border border-white/5">
                    <p className="text-white/70 text-sm text-center flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      Remember: Getting stuck is part of learning!
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Contextual Mini Hints */}
      {!isOpen && context && (
        <motion.div
          className="fixed bottom-24 right-6 max-w-xs"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2 }}
        >
          <div className="bg-zinc-900/90 backdrop-blur rounded-lg p-3 border border-primary/20">
            <div className="flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-yellow-400 mt-0.5" />
              <div>
                <p className="text-white/80 text-sm">Quick tip:</p>
                <p className="text-white/60 text-xs mt-1">{context}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}