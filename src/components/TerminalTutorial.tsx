"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgress } from '@/context/ProgressContext';
import { ChevronRight, ChevronLeft, CheckCircle, Terminal, Copy, Play, FileText, Folder, Home, ArrowRight } from 'lucide-react';

interface TerminalStep {
  id: string;
  title: string;
  description: string;
  command: string;
  explanation: string;
  whatItDoes: string;
  example: string;
  tips: string[];
}

const terminalSteps: TerminalStep[] = [
  {
    id: 'opening',
    title: 'Opening Your Terminal',
    description: 'Like finding the control room of your computer',
    command: '',
    explanation: 'Think of your terminal as your computer\'s control room - like the bridge of a spaceship. Instead of clicking buttons, you give direct voice commands to your computer.',
    whatItDoes: 'Opens a text-based interface to your computer',
    example: '',
    tips: [
      'Mac: Press Cmd + Space, type "Terminal", press Enter (like saying "Computer, open control room")',
      'Windows: Press Win + R, type "cmd", press Enter (like accessing the command center)',
      'Linux: Press Ctrl + Alt + T (like pressing the "bridge access" button)',
      'You can also search for "Terminal" in your applications'
    ]
  },
  {
    id: 'pwd',
    title: 'Where Am I?',
    description: 'Like asking "What room am I in?" in a giant mansion',
    command: 'pwd',
    explanation: 'Imagine your computer is a huge mansion with thousands of rooms (folders). PWD is like asking "What room am I standing in right now?" It gives you the full address of your current location.',
    whatItDoes: 'Shows your current folder path',
    example: '/Users/yourname or C:\\Users\\yourname',
    tips: [
      'Like GPS for your computer - shows exactly where you are',
      'You\'ll see a path like /Users/yourname/Documents (like "Mansion > Second Floor > Study > Desk")',
      'This is your "home base" when you first open terminal'
    ]
  },
  {
    id: 'ls',
    title: 'What\'s Here?',
    description: 'See what files and folders are in your current location',
    command: 'ls',
    explanation: 'LS stands for "list". It shows you all the files and folders in your current directory.',
    whatItDoes: 'Lists all files and folders in the current directory',
    example: 'Documents  Downloads  Desktop  Pictures',
    tips: [
      'Try "ls -la" to see more details including hidden files',
      'Folders appear differently than files (often in blue)',
      'Like opening a folder in Finder/Explorer but in text form'
    ]
  },
  {
    id: 'cd',
    title: 'Moving Around',
    description: 'Navigate to different folders',
    command: 'cd foldername',
    explanation: 'CD stands for "Change Directory". It\'s like double-clicking a folder to open it.',
    whatItDoes: 'Moves you into a different folder',
    example: 'cd Documents (goes into Documents folder)',
    tips: [
      'cd .. goes up one level (back to parent folder)',
      'cd ~ goes to your home folder',
      'cd / goes to the root of your computer',
      'Use Tab to auto-complete folder names!'
    ]
  },
  {
    id: 'mkdir',
    title: 'Creating Folders',
    description: 'Make new folders for your projects',
    command: 'mkdir my-project',
    explanation: 'MKDIR stands for "Make Directory". It creates a new folder wherever you are.',
    whatItDoes: 'Creates a new empty folder',
    example: 'mkdir coding-projects (creates a folder called "coding-projects")',
    tips: [
      'Use quotes for names with spaces: mkdir "My Cool Project"',
      'You can create multiple folders: mkdir folder1 folder2 folder3',
      'Best practice: use lowercase and dashes for project names'
    ]
  },
  {
    id: 'touch',
    title: 'Creating Files',
    description: 'Create new empty files',
    command: 'touch filename.txt',
    explanation: 'TOUCH creates a new empty file. It\'s like right-clicking and selecting "New File".',
    whatItDoes: 'Creates a new empty file',
    example: 'touch index.html (creates an empty HTML file)',
    tips: [
      'Include the file extension: .html, .css, .js, .txt',
      'touch README.md creates a markdown file',
      'You can create multiple files: touch file1.txt file2.txt'
    ]
  },
  {
    id: 'cat',
    title: 'Reading Files',
    description: 'View the contents of text files',
    command: 'cat filename.txt',
    explanation: 'CAT displays the contents of a file in your terminal. Great for quickly reading small files.',
    whatItDoes: 'Shows the contents of a text file',
    example: 'cat package.json (shows what\'s inside package.json)',
    tips: [
      'Only works well with text files (not images or videos)',
      'For long files, use "less filename.txt" instead',
      'cat can also combine files: cat file1.txt file2.txt'
    ]
  },
  {
    id: 'open',
    title: 'Opening Files & Folders',
    description: 'Open files with their default applications',
    command: 'open filename',
    explanation: 'OPEN launches files with their default app, or opens folders in Finder/Explorer.',
    whatItDoes: 'Opens files/folders with default applications',
    example: 'open . (opens current folder in Finder/Explorer)',
    tips: [
      'open index.html opens your HTML file in a web browser',
      'open . opens the current folder in your file manager',
      'Windows users: use "start" instead of "open"',
      'Linux users: use "xdg-open" instead of "open"'
    ]
  }
];

export default function TerminalTutorial() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [triedCommand, setTriedCommand] = useState(false);
  const { completeLevel, character } = useProgress();

  // Get character-specific terminal use cases
  const getCharacterTerminalContext = () => {
    switch(character) {
      case 1: // Business Builder
        return {
          motivation: "Master the terminal to rapidly prototype and validate business ideas!",
          useCase: "Soon you'll use these commands to deploy MVPs, manage projects, and automate business workflows.",
          examples: [
            "Deploy a landing page in 30 seconds",
            "Launch A/B tests with one command",
            "Automate customer feedback collection"
          ]
        };
      case 2: // Tech Engineer
        return {
          motivation: "Welcome to your professional development toolkit!",
          useCase: "These are the commands every senior developer uses daily for system management and deployment.",
          examples: [
            "Manage production deployments",
            "Debug complex system issues",
            "Automate CI/CD pipelines"
          ]
        };
      case 3: // Full-Stack Hybrid
        return {
          motivation: "Bridge the gap between business and technology!",
          useCase: "You'll use terminal commands to manage both technical projects and business operations.",
          examples: [
            "Deploy full-stack applications",
            "Manage product development workflows",
            "Coordinate technical and business teams"
          ]
        };
      default:
        return {
          motivation: "Learn the essential developer toolkit!",
          useCase: "These commands will be your daily tools as an AI-enhanced developer.",
          examples: [
            "Manage your coding projects",
            "Deploy applications to the web",
            "Collaborate with development teams"
          ]
        };
    }
  };

  const characterContext = getCharacterTerminalContext();

  const step = terminalSteps[currentStep];
  const isLastStep = currentStep === terminalSteps.length - 1;
  const isFirstStep = currentStep === 0;

  const handleNext = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    setTriedCommand(false);

    if (isLastStep) {
      // Complete terminal tutorial and redirect to setup wizard
      completeLevel('terminal' as any);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    if (stepIndex <= Math.max(...completedSteps) + 1) {
      setCurrentStep(stepIndex);
    }
  };

  const copyCommand = () => {
    navigator.clipboard.writeText(step.command);
    setTriedCommand(true);
  };

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Background mesh */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(45rem_50rem_at_top,rgba(47,201,244,0.2),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(50rem_45rem_at_bottom,rgba(0,199,189,0.15),transparent)]" />
        </div>

        <div className="relative">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur">
                <Terminal className="h-4 w-4 text-primary" />
                <span className="text-white/90">Master the command line basics</span>
              </div>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6">
              <span className="text-gradient-primary">Terminal</span> Basics
            </h1>

            {/* Character-specific motivation */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm backdrop-blur">
                <span className="text-primary/90">{characterContext.motivation}</span>
              </div>
            </div>

            <p className="mx-auto max-w-3xl text-lg leading-8 text-white/70 mb-4">
              {characterContext.useCase}
            </p>

            {/* Character-specific examples */}
            <div className="max-w-2xl mx-auto mb-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 border border-primary/20">
              <h3 className="text-lg font-semibold text-white mb-3">What You'll Build:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {characterContext.examples.map((example, index) => (
                  <div key={index} className="text-center">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2">
                      <span className="text-primary text-sm font-bold">{index + 1}</span>
                    </div>
                    <p className="text-sm text-white/80">{example}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="mx-auto max-w-3xl text-base leading-7 text-white/60 mb-6">
              Learn the essential terminal commands every developer uses daily. These 8 commands will give you superpowers!
            </p>
            <div className="flex items-center justify-center gap-4 mt-4">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-medium">Terminal Tutorial</span>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium">+300 XP</span>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-medium">15 min</span>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="max-w-6xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
              {terminalSteps.map((stepItem, index) => (
                <div key={stepItem.id} className="flex items-center">
                  <button
                    onClick={() => handleStepClick(index)}
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all ${
                      index === currentStep
                        ? 'bg-primary border-primary text-white scale-110'
                        : completedSteps.includes(index)
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : index <= Math.max(...completedSteps) + 1
                        ? 'border-white/30 text-white/70 hover:border-primary hover:text-primary'
                        : 'border-white/10 text-white/30'
                    }`}
                    disabled={index > Math.max(...completedSteps) + 1}
                    title={stepItem.title}
                  >
                    {completedSteps.includes(index) ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      index + 1
                    )}
                  </button>
                  {index < terminalSteps.length - 1 && (
                    <div className={`w-4 h-0.5 mx-1 transition-colors ${
                      completedSteps.includes(index) ? 'bg-emerald-500' : 'bg-white/20'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl bg-zinc-900/70 p-8 ring-1 ring-white/10 backdrop-blur"
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    {step.title}
                  </h2>
                  <p className="text-xl text-white/70">
                    {step.description}
                  </p>
                </div>

                <div className="space-y-6 mb-8">
                  {/* Command */}
                  {step.command && (
                    <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-700">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                          <Terminal className="w-5 h-5 text-primary" />
                          Command to Try
                        </h3>
                        <button
                          onClick={copyCommand}
                          className="flex items-center gap-2 px-3 py-1 bg-primary hover:bg-primary/80 text-white text-sm rounded-lg transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                          Copy
                        </button>
                      </div>
                      <div className="bg-black rounded-lg p-4 font-mono">
                        <span className="text-emerald-400">$ </span>
                        <span className="text-white">{step.command}</span>
                      </div>
                      {step.example && (
                        <div className="mt-2 text-sm text-white/60">
                          Example output: <span className="text-white/80">{step.example}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Explanation */}
                  <div className="bg-blue-500/10 rounded-xl p-6 border border-blue-500/20">
                    <h3 className="text-lg font-semibold text-blue-300 mb-3">
                      What this does
                    </h3>
                    <p className="text-blue-200 leading-relaxed mb-3">{step.explanation}</p>
                    <p className="text-blue-100 font-medium">{step.whatItDoes}</p>
                  </div>

                  {/* Tips */}
                  <div className="bg-emerald-500/10 rounded-xl p-6 border border-emerald-500/20">
                    <h3 className="text-lg font-semibold text-emerald-300 mb-3">
                      Pro Tips
                    </h3>
                    <ul className="space-y-2">
                      {step.tips.map((tip, index) => (
                        <li key={index} className="text-emerald-200 flex items-start gap-2">
                          <span className="text-emerald-400 font-bold mt-1">•</span>
                          <span className="leading-relaxed">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Try It Encouragement */}
                  {step.command && !triedCommand && (
                    <div className="bg-amber-500/10 rounded-xl p-6 border border-amber-500/20 text-center">
                      <Play className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                      <h3 className="text-lg font-semibold text-amber-300 mb-2">
                        Give it a try!
                      </h3>
                      <p className="text-amber-200">
                        Open your terminal and type the command above. Don't worry - you can't break anything!
                      </p>
                    </div>
                  )}

                  {triedCommand && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-emerald-500/10 rounded-xl p-6 border border-emerald-500/20 text-center"
                    >
                      <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                      <h3 className="text-lg font-semibold text-emerald-300 mb-2">
                        Nice work!
                      </h3>
                      <p className="text-emerald-200">
                        You're getting the hang of this! Terminal commands are powerful tools.
                      </p>
                    </motion.div>
                  )}
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between pt-8 border-t border-white/10">
                  <button
                    onClick={handlePrev}
                    disabled={isFirstStep}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                      isFirstStep
                        ? 'opacity-50 cursor-not-allowed text-white/50'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>

                  <div className="text-center">
                    <div className="text-sm text-white/60 mb-1">
                      Command {currentStep + 1} of {terminalSteps.length}
                    </div>
                    <div className="w-32 h-2 bg-white/10 rounded-full">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
                        style={{ width: `${((currentStep + 1) / terminalSteps.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all"
                  >
                    {isLastStep ? 'Complete Tutorial' : 'Next Command'}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Completion Call to Action */}
          {completedSteps.length === terminalSteps.length && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-16"
            >
              <div className="rounded-2xl bg-primary/5 p-8 ring-1 ring-primary/20 backdrop-blur max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Terminal Master Unlocked!
                </h3>
                <p className="text-white/70 mb-6">
                  You now know the essential commands that every developer uses daily. Ready to install your AI coding assistant?
                </p>
                <a
                  href="/level/0"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-8 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                >
                  Start Setup Wizard
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}