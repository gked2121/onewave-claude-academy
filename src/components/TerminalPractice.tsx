"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, CheckCircle, ArrowRight, Sparkles, Trophy } from 'lucide-react';

interface PracticeCommand {
  id: string;
  instruction: string;
  command: string;
  explanation: string;
  expectedOutput: string;
  hint?: string;
}

const practiceCommands: PracticeCommand[] = [
  {
    id: 'pwd',
    instruction: '📍 Step 1: Find out where you are in your computer',
    command: 'pwd',
    explanation: 'pwd means "print working directory" - it shows your current folder location. This is like asking "where am I?" in your computer\'s file system.',
    expectedOutput: '/Users/your-name/...',
    hint: 'Type exactly these 3 letters (all lowercase): pwd'
  },
  {
    id: 'ls',
    instruction: '📂 Step 2: See what files and folders are here',
    command: 'ls',
    explanation: 'ls means "list" - it shows all files and folders in your current location. Think of it like opening a drawer to see what\'s inside.',
    expectedOutput: 'Desktop  Documents  Downloads  ...',
    hint: 'Type exactly these 2 letters (lowercase L, lowercase S): ls'
  },
  {
    id: 'echo',
    instruction: '💬 Step 3: Make the computer say something',
    command: 'echo "Hello, I did it!"',
    explanation: 'echo prints text to the screen - like making your computer talk! This is similar to console.log() if you know programming.',
    expectedOutput: 'Hello, I did it!',
    hint: 'Type this exactly (including the quotes): echo "Hello, I did it!"'
  }
];

interface TerminalPracticeProps {
  onComplete: () => void;
}

export default function TerminalPractice({ onComplete }: TerminalPracticeProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [attempted, setAttempted] = useState(false);

  const currentCommand = practiceCommands[currentStep];
  const isLastStep = currentStep === practiceCommands.length - 1;
  const allCompleted = completedSteps.length === practiceCommands.length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAttempted(true);

    const normalizedInput = userInput.trim().toLowerCase();
    const normalizedExpected = currentCommand.command.toLowerCase();

    if (normalizedInput === normalizedExpected) {
      // Correct answer!
      setCompletedSteps([...completedSteps, currentCommand.id]);

      if (isLastStep) {
        // All done!
        setTimeout(() => {
          onComplete();
        }, 2000);
      } else {
        // Move to next command
        setTimeout(() => {
          setCurrentStep(currentStep + 1);
          setUserInput('');
          setAttempted(false);
          setShowHint(false);
        }, 1500);
      }
    }
  };

  const isCorrect = attempted && userInput.trim().toLowerCase() === currentCommand.command.toLowerCase();

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm backdrop-blur mb-4">
          <Terminal className="w-4 h-4 text-primary" />
          <span className="text-primary font-semibold">Safe Practice Area</span>
        </div>

        <h2 className="text-3xl font-bold text-white mb-3">
          Let's Practice 3 Simple Commands!
        </h2>
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 max-w-2xl mx-auto mb-4">
          <p className="text-emerald-100 font-semibold mb-2">
            This is 100% safe - you can't break anything!
          </p>
          <p className="text-white/70 text-sm">
            Just type what you see, press "Run Command", and watch it work. You'll be done in 2 minutes!
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-center gap-2 mb-3">
          {practiceCommands.map((cmd, idx) => (
            <div
              key={cmd.id}
              className={`w-3 h-3 rounded-full transition-all ${
                completedSteps.includes(cmd.id)
                  ? 'bg-emerald-400 scale-110'
                  : idx === currentStep
                  ? 'bg-primary scale-125'
                  : 'bg-white/20'
              }`}
            />
          ))}
        </div>
        <p className="text-center text-sm text-white/60">
          Step {currentStep + 1} of {practiceCommands.length}
        </p>
      </div>

      {/* Practice Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-zinc-900/70 rounded-2xl p-8 ring-1 ring-white/10 backdrop-blur mb-6"
        >
          {/* Instruction */}
          <div className="mb-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 border border-primary/20">
            <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-yellow-400" />
              {currentCommand.instruction}
            </h3>
            <p className="text-white/80 text-base leading-relaxed">
              {currentCommand.explanation}
            </p>
          </div>

          {/* Big clear instruction box */}
          <div className="bg-yellow-500/10 border-2 border-yellow-500/30 rounded-xl p-5 mb-4">
            <p className="text-yellow-100 font-bold text-lg mb-2">Type this command:</p>
            <code className="block text-yellow-50 text-2xl font-bold font-mono bg-black/30 rounded-lg p-4 text-center">
              {currentCommand.command}
            </code>
            <p className="text-yellow-200/80 text-sm mt-3 text-center">
              Copy it exactly as shown, then click "Run Command" below
            </p>
          </div>

          {/* Terminal Simulation */}
          <form onSubmit={handleSubmit}>
            <div className="bg-black/70 border-2 border-zinc-700 rounded-xl p-5 font-mono text-base mb-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-emerald-400 text-xl font-bold">$</span>
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Type or paste the command here..."
                  className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/40 text-lg"
                  autoFocus
                />
              </div>

              {isCorrect && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-emerald-400 mt-3 text-sm"
                >
                  {currentCommand.expectedOutput}
                </motion.div>
              )}
            </div>

            {/* Feedback */}
            <AnimatePresence>
              {isCorrect && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-500/20 border border-emerald-500/40 rounded-lg p-4 mb-4"
                >
                  <div className="flex items-center gap-2 text-emerald-300 font-semibold">
                    <CheckCircle className="w-5 h-5" />
                    Perfect! You got it!
                  </div>
                </motion.div>
              )}

              {attempted && !isCorrect && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-yellow-500/20 border border-yellow-500/40 rounded-lg p-4 mb-4"
                >
                  <div className="flex items-start gap-2 mb-3">
                    <span className="text-2xl text-yellow-300">?</span>
                    <div>
                      <p className="text-yellow-300 font-semibold mb-1">
                        Almost there! Let's try again
                      </p>
                      <p className="text-yellow-200/80 text-sm">
                        You typed: <code className="bg-black/30 px-2 py-0.5 rounded">{userInput}</code>
                      </p>
                    </div>
                  </div>
                  {currentCommand.hint && (
                    <div className="text-yellow-100 text-sm bg-yellow-500/10 rounded-lg p-3 border border-yellow-500/20">
                      <strong className="block mb-1">Here's the exact command:</strong>
                      <code className="text-yellow-50 font-bold">{currentCommand.hint.split(': ')[1] || currentCommand.hint}</code>
                      <p className="text-yellow-200/70 text-xs mt-2">
                        Tip: Copy and paste it, or type it exactly as shown (check for typos!)
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 flex items-center justify-center gap-3 text-lg"
            >
              Run Command
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </motion.div>
      </AnimatePresence>

      {/* Completion Celebration */}
      {allCompleted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-gradient-to-br from-emerald-500/20 to-primary/20 rounded-2xl p-8 ring-1 ring-emerald-500/30"
        >
          <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">
            You're a Terminal Pro!
          </h3>
          <p className="text-white/70 mb-4">
            You just ran {practiceCommands.length} real terminal commands. That's exactly what professional developers do every day!
          </p>
          <p className="text-primary font-semibold">
            +50 XP earned • Achievement unlocked: Terminal Master
          </p>
        </motion.div>
      )}

      {/* Encouragement */}
      {!allCompleted && (
        <div className="text-center">
          <p className="text-white/60 text-sm">
            Pro tip: You can press <kbd className="px-2 py-1 bg-white/10 rounded text-xs">Enter</kbd> to run the command
          </p>
        </div>
      )}
    </div>
  );
}