"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useProgress } from '@/context/ProgressContext';
import { ChevronRight, ChevronLeft, CheckCircle, Terminal, Github, Globe, Zap, Code, Lightbulb, BookOpen, Play } from 'lucide-react';

interface ConceptCard {
  id: string;
  title: string;
  icon: any;
  description: string;
  explanation: string;
  analogy: string;
  whyImportant: string;
  examples: string[];
}

const concepts: ConceptCard[] = [
  {
    id: 'terminal',
    title: 'What is a Terminal?',
    icon: Terminal,
    description: 'Your direct line to your computer\'s brain',
    explanation: 'The terminal is a text-based interface where you can give your computer direct commands. Instead of clicking buttons, you type instructions.',
    analogy: 'Think of it like texting with your computer. Instead of using a mouse to click "copy file", you text your computer "cp file.txt backup.txt" and it does it instantly.',
    whyImportant: 'AI coding tools work through the terminal. It\'s faster than clicking through menus and gives you superpowers as a developer.',
    examples: [
      'ls - see what files are in a folder',
      'cd Documents - go to your Documents folder',
      'mkdir my-project - create a new folder called "my-project"',
      'git clone [url] - download code from the internet'
    ]
  },
  {
    id: 'github',
    title: 'What is GitHub?',
    icon: Github,
    description: 'The world\'s library of code',
    explanation: 'GitHub is where developers store, share, and collaborate on code. It\'s like Google Drive, but designed specifically for programming projects.',
    analogy: 'Imagine a massive library where every book is a software project. You can read anyone\'s "book" (code), make your own copy, suggest improvements, or contribute your own "books" for others to use.',
    whyImportant: 'Most coding tools, tutorials, and open-source projects live on GitHub. It\'s where you\'ll find and share code.',
    examples: [
      'React - Facebook\'s web framework used by millions',
      'VS Code - Microsoft\'s free code editor',
      'TensorFlow - Google\'s AI/machine learning library',
      'Linux - The operating system that runs most of the internet'
    ]
  },
  {
    id: 'vercel',
    title: 'What is Vercel?',
    icon: Globe,
    description: 'Your website\'s home on the internet',
    explanation: 'Vercel takes your code and puts it live on the internet so anyone can visit your website. It handles all the technical server stuff automatically.',
    analogy: 'Like Shopify for websites. You build your site, Vercel hosts it. You don\'t need to worry about servers, just push your code and it\'s live.',
    whyImportant: 'You need somewhere to host your websites. Vercel makes it free and automatic - perfect for learning and sharing your projects.',
    examples: [
      'Deploy a website in 30 seconds from GitHub',
      'Automatic HTTPS and CDN (makes sites fast globally)',
      'Free tier includes custom domains',
      'Used by major companies like Netflix and TikTok'
    ]
  },
  {
    id: 'ai-tools',
    title: 'AI Coding vs Traditional Tools',
    icon: Zap,
    description: 'The difference between having a coding mentor vs struggling alone',
    explanation: 'Traditional coding: memorize syntax, debug for hours, read documentation. AI coding: describe what you want, AI writes it, you review and refine.',
    analogy: 'Traditional coding is like learning a foreign language by memorizing a dictionary. AI coding is like having a fluent translator who helps you express your ideas immediately.',
    whyImportant: 'AI tools like Claude Code and OpenAI let beginners build real projects on day 1 instead of spending months on syntax.',
    examples: [
      'You: "create a todo app" → AI: writes the complete code',
      'You: "add dark mode" → AI: updates the entire styling',
      'You: "fix this bug" → AI: finds and fixes the issue',
      'You: "deploy to Vercel" → AI: sets up deployment'
    ]
  },
  {
    id: 'comparison',
    title: 'AI Tools vs No-Code Platforms',
    icon: Code,
    description: 'Learning to fish vs buying fish from the store',
    explanation: 'No-code tools (Replit, Lovable) give you pre-made solutions. AI coding tools teach you to build anything from scratch with real code.',
    analogy: 'No-code is like IKEA furniture - fast to assemble, but limited designs. AI coding is like having a master carpenter teach you - takes slightly longer, but you can build anything.',
    whyImportant: 'With AI + real coding skills, you\'re not limited by what the platform allows. You own your code and can build unique solutions.',
    examples: [
      'No-code: Limited to platform templates and features',
      'AI coding: Build anything - mobile apps, AI tools, games',
      'No-code: Monthly fees, vendor lock-in',
      'AI coding: Own your code, deploy anywhere'
    ]
  }
];

export default function CodingBasics() {
  const [currentConcept, setCurrentConcept] = useState(0);
  const [completedConcepts, setCompletedConcepts] = useState<number[]>([]);
  const { completeLevel, character } = useProgress();

  // Get character-specific messaging
  const getCharacterContext = () => {
    switch(character) {
      case 1: // Business Builder
        return {
          greeting: "Perfect for aspiring entrepreneurs!",
          focus: "You'll learn how to use AI tools to build and validate business ideas without expensive developers."
        };
      case 2: // Tech Engineer
        return {
          greeting: "Welcome, future tech leader!",
          focus: "You'll master professional-grade AI development tools used at top tech companies."
        };
      case 3: // Full-Stack Hybrid
        return {
          greeting: "Ready to bridge business and tech!",
          focus: "You'll learn both technical skills and business strategy with AI as your accelerator."
        };
      default:
        return {
          greeting: "Welcome to your AI coding journey!",
          focus: "You'll learn the fundamentals that every modern developer needs to know."
        };
    }
  };

  const characterContext = getCharacterContext();

  const concept = concepts[currentConcept];
  const isLastConcept = currentConcept === concepts.length - 1;
  const isFirstConcept = currentConcept === 0;
  const Icon = concept.icon;

  const handleNext = () => {
    if (!completedConcepts.includes(currentConcept)) {
      setCompletedConcepts([...completedConcepts, currentConcept]);
    }

    if (isLastConcept) {
      completeLevel(-1);
    } else {
      setCurrentConcept(currentConcept + 1);
    }
  };

  const handlePrev = () => {
    if (currentConcept > 0) {
      setCurrentConcept(currentConcept - 1);
    }
  };

  const handleConceptClick = (index: number) => {
    if (index <= Math.max(...completedConcepts, -1) + 1) {
      setCurrentConcept(index);
    }
  };

  const allCompleted = completedConcepts.length === concepts.length;

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
                <BookOpen className="h-4 w-4 text-primary" />
                <span className="text-white/90">Learn the fundamentals first</span>
              </div>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6">
              <span className="text-gradient-primary">Coding</span> Fundamentals
            </h1>

            {/* Character-specific greeting */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm backdrop-blur">
                <span className="text-primary/90">{characterContext.greeting}</span>
              </div>
            </div>

            <p className="mx-auto max-w-3xl text-lg leading-8 text-white/70 mb-4">
              {characterContext.focus}
            </p>
            <p className="mx-auto max-w-3xl text-base leading-7 text-white/60 mb-6">
              Before we start coding, let's understand the essential tools and concepts you'll use every day.
            </p>
            <div className="flex items-center justify-center gap-4 mt-4">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-medium">Level -1</span>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium">+200 XP</span>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium">10 min</span>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-4 mb-8 flex-wrap">
              {concepts.map((conceptItem, index) => (
                <div key={conceptItem.id} className="flex items-center">
                  <button
                    onClick={() => handleConceptClick(index)}
                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all ${
                      index === currentConcept
                        ? 'bg-primary border-primary text-white scale-110'
                        : completedConcepts.includes(index)
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : index <= Math.max(...completedConcepts, -1) + 1
                        ? 'border-white/30 text-white/70 hover:border-primary hover:text-primary'
                        : 'border-white/10 text-white/30'
                    }`}
                    disabled={index > Math.max(...completedConcepts, -1) + 1}
                    title={conceptItem.title}
                  >
                    {completedConcepts.includes(index) ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <conceptItem.icon className="w-6 h-6" />
                    )}
                  </button>
                  {index < concepts.length - 1 && (
                    <div className={`w-8 h-0.5 mx-2 transition-colors ${
                      completedConcepts.includes(index) ? 'bg-emerald-500' : 'bg-white/20'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Concept Content */}
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentConcept}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl bg-zinc-900/70 p-8 ring-1 ring-white/10 backdrop-blur"
              >
                <div className="text-center mb-8">
                  <div className="mb-4">
                    <Icon className="w-16 h-16 text-primary mx-auto" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">
                    {concept.title}
                  </h2>
                  <p className="text-xl text-white/70">
                    {concept.description}
                  </p>
                </div>

                <div className="space-y-6 mb-8">
                  {/* Explanation */}
                  <div className="bg-zinc-800/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-yellow-400" />
                      What is it?
                    </h3>
                    <p className="text-white/80 leading-relaxed">{concept.explanation}</p>
                  </div>

                  {/* Analogy */}
                  <div className="bg-blue-500/10 rounded-xl p-6 border border-blue-500/20">
                    <h3 className="text-lg font-semibold text-blue-300 mb-3">
                      Think of it like...
                    </h3>
                    <p className="text-blue-200 leading-relaxed">{concept.analogy}</p>
                  </div>

                  {/* Why Important */}
                  <div className="bg-emerald-500/10 rounded-xl p-6 border border-emerald-500/20">
                    <h3 className="text-lg font-semibold text-emerald-300 mb-3">
                      Why you need to know this
                    </h3>
                    <p className="text-emerald-200 leading-relaxed">{concept.whyImportant}</p>
                  </div>

                  {/* Examples */}
                  <div className="bg-purple-500/10 rounded-xl p-6 border border-purple-500/20">
                    <h3 className="text-lg font-semibold text-purple-300 mb-3">
                      Examples
                    </h3>
                    <ul className="space-y-2">
                      {concept.examples.map((example, index) => (
                        <li key={index} className="text-purple-200 flex items-start gap-2">
                          <span className="text-purple-400 font-mono text-sm mt-1">•</span>
                          <span className="leading-relaxed">{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-8 border-t border-white/10">
                  <button
                    onClick={handlePrev}
                    disabled={isFirstConcept}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                      isFirstConcept
                        ? 'opacity-50 cursor-not-allowed text-white/50'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>

                  <div className="text-center">
                    <div className="text-sm text-white/60 mb-1">
                      Concept {currentConcept + 1} of {concepts.length}
                    </div>
                    <div className="w-32 h-2 bg-white/10 rounded-full">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
                        style={{ width: `${((currentConcept + 1) / concepts.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  {isLastConcept && allCompleted ? (
                    <Link href="/level/0">
                      <button
                        onClick={handleNext}
                        className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                      >
                        Start Setup Wizard
                        <Play className="w-4 h-4" />
                      </button>
                    </Link>
                  ) : (
                    <button
                      onClick={handleNext}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all"
                    >
                      {isLastConcept ? 'Complete & Continue' : 'Next Concept'}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
