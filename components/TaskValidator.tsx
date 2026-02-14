"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Lightbulb, Trophy } from "lucide-react";
import confetti from "canvas-confetti";
import { useProgress } from "@/context/ProgressContext";

interface ValidationRule {
  check: (input: string) => boolean;
  message: string;
  hint?: string;
}

interface TaskValidatorProps {
  title: string;
  description: string;
  placeholder: string;
  validationRules: ValidationRule[];
  successMessage: string;
  onSuccess?: () => void;
  exampleOutput?: string;
}

export default function TaskValidator({
  title,
  description,
  placeholder,
  validationRules,
  successMessage,
  onSuccess,
  exampleOutput
}: TaskValidatorProps) {
  const [userInput, setUserInput] = useState("");
  const [validationResults, setValidationResults] = useState<{ passed: boolean; message: string; hint?: string }[]>([]);
  const [isValidated, setIsValidated] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const progress = useProgress();

  const handleValidate = () => {
    setAttemptCount(prev => prev + 1);

    const results = validationRules.map(rule => ({
      passed: rule.check(userInput),
      message: rule.message,
      hint: rule.hint
    }));

    setValidationResults(results);
    setIsValidated(true);

    const allPassed = results.every(r => r.passed);
    setIsSuccess(allPassed);

    if (allPassed) {
      // Track perfect validation (first try)
      if (attemptCount === 0) {
        progress.incrementPerfectValidations();
        progress.incrementPerfectPrompts();
      }

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      setTimeout(() => {
        if (onSuccess) onSuccess();
      }, 1000);
    }
  };

  const handleReset = () => {
    setUserInput("");
    setValidationResults([]);
    setIsValidated(false);
    setShowHints(false);
    setIsSuccess(false);
  };

  const allPassed = validationResults.length > 0 && validationResults.every(r => r.passed);
  const failedCount = validationResults.filter(r => !r.passed).length;

  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-2xl border-2 border-orange-500/30 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-6">
        <div className="flex items-start gap-4">
          <div className="bg-white/20 p-3 rounded-xl">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-orange-100 text-sm leading-relaxed">{description}</p>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-6 space-y-4">
        <div>
          <label className="text-sm font-semibold text-orange-300 mb-2 block">
            Your Work:
          </label>
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={placeholder}
            rows={8}
            className="w-full bg-orange-500/10 border border-orange-500/30 rounded-xl px-4 py-3 text-white placeholder-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono text-sm resize-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleValidate}
            disabled={!userInput.trim() || isSuccess}
            className="flex-1 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl px-6 py-3 text-white font-semibold flex items-center justify-center gap-2 transition-all"
          >
            <Check className="w-5 h-5" />
            Check My Work
          </motion.button>

          {isValidated && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleReset}
              className="px-6 py-3 bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/50 rounded-xl text-orange-200 font-semibold transition-all"
            >
              Try Again
            </motion.button>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowHints(!showHints)}
            className="px-4 py-3 bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/50 rounded-xl text-orange-200 transition-all"
          >
            <Lightbulb className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Validation Results */}
        <AnimatePresence>
          {isValidated && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-3"
            >
              {/* Success Message */}
              {allPassed && (
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-400/50 rounded-xl p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-green-500 rounded-full p-2">
                      <Check className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-green-300 mb-1">Perfect! 🎉</h4>
                      <p className="text-green-200 text-sm">{successMessage}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Failed Requirements */}
              {!allPassed && (
                <div className="bg-orange-500/10 border-2 border-orange-400/30 rounded-xl p-4">
                  <h4 className="font-bold text-orange-300 mb-3 flex items-center gap-2">
                    <X className="w-5 h-5" />
                    {failedCount} requirement{failedCount > 1 ? 's' : ''} to fix
                  </h4>
                  <div className="space-y-2">
                    {validationResults.map((result, index) => (
                      <div
                        key={index}
                        className={`flex items-start gap-2 text-sm p-2 rounded-lg ${
                          result.passed
                            ? "bg-green-500/10 text-green-300"
                            : "bg-red-500/10 text-red-300"
                        }`}
                      >
                        {result.passed ? (
                          <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        ) : (
                          <X className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        )}
                        <span>{result.message}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hints */}
        <AnimatePresence>
          {showHints && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-orange-500/10 border-2 border-orange-400/30 rounded-xl p-4 space-y-3"
            >
              <h4 className="font-bold text-orange-300 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Hints to help you succeed:
              </h4>
              <div className="space-y-2">
                {validationRules.map((rule, index) => (
                  rule.hint && (
                    <div key={index} className="text-sm text-orange-200 bg-orange-500/10 rounded-lg p-2">
                      💡 {rule.hint}
                    </div>
                  )
                ))}
              </div>
              {exampleOutput && (
                <div className="mt-3 pt-3 border-t border-orange-400/30">
                  <p className="text-xs text-orange-300 mb-2 font-semibold">Example format:</p>
                  <div className="bg-black/40 rounded-lg p-3 font-mono text-xs text-orange-100 whitespace-pre-line">
                    {exampleOutput}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
