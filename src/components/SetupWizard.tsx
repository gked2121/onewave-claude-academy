"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useProgress } from '@/context/ProgressContext';
import { ChevronRight, ChevronLeft, CheckCircle, Check, Download, ExternalLink, Play, Lightbulb, Code, Terminal, Zap, ArrowRight, AlertCircle } from 'lucide-react';
import { parseMarkdown } from '@/utils/markdown';
import LiveCodeDemo from './LiveCodeDemo';
import TerminalLauncher from './TerminalLauncher';
import TerminalPractice from './TerminalPractice';
import ErrorRecoveryWizard from './ErrorRecoveryWizard';

interface Tool {
  id: string;
  name: string;
  description: string;
  installed: boolean;
  version: string;
  downloadUrl: string;
  helpText: string;
  icon: string;
}

interface AICli {
  id: string;
  name: string;
  description: string;
  cost: string;
  costDetail: string;
  pros: string[];
  cons: string[];
  installCommand: string;
  setupSteps: string[];
  icon: string;
  selected?: boolean;
}

interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  difficulty: 'beginner' | 'intermediate';
  examples: string[];
  suggestedFeatures: string[];
}

const projectTemplates: ProjectTemplate[] = [
  {
    id: 'portfolio',
    name: 'Personal Portfolio',
    description: 'Showcase your work and tell your story',
    icon: '',
    difficulty: 'beginner',
    examples: ['Artist portfolio', 'Developer showcase', 'Photography site'],
    suggestedFeatures: ['About me section', 'Project gallery', 'Contact form']
  },
  {
    id: 'landing-page',
    name: 'Landing Page',
    description: 'Promote your idea, product, or service',
    icon: '',
    difficulty: 'beginner',
    examples: ['Product launch', 'Service offering', 'Event promotion'],
    suggestedFeatures: ['Hero section', 'Features list', 'Call-to-action', 'Email signup']
  },
  {
    id: 'recipe-app',
    name: 'Recipe/Content Site',
    description: 'Share recipes, blogs, or creative content',
    icon: '',
    difficulty: 'beginner',
    examples: ['Recipe collection', 'Travel blog', 'Hobby showcase'],
    suggestedFeatures: ['Content cards', 'Search/filter', 'Categories']
  },
  {
    id: 'dashboard',
    name: 'Simple Dashboard',
    description: 'Track data or manage information',
    icon: '',
    difficulty: 'intermediate',
    examples: ['Habit tracker', 'Budget planner', 'Project manager'],
    suggestedFeatures: ['Data visualization', 'Add/edit items', 'Progress tracking']
  }
];

const aiClis: AICli[] = [
  {
    id: 'claude',
    name: 'Claude Code CLI',
    description: 'Premium agentic coding tool that lives in your terminal',
    cost: 'Included in Pro subscription',
    costDetail: 'Claude Pro: $20/mo includes unlimited CLI usage',
    pros: [
      'Best-in-class code quality and reasoning',
      'Included in Claude Pro ($20/mo)',
      'Understands your entire codebase context',
      'Handles git workflows and routine tasks',
      'Built by Anthropic (makers of Claude)'
    ],
    cons: [
      'Requires Claude Pro subscription',
      'Monthly commitment for best value'
    ],
    installCommand: 'npm install -g @anthropic-ai/claude-code',
    setupSteps: [
      'Install: npm install -g @anthropic-ai/claude-code',
      'Subscribe to Claude Pro at https://claude.ai/upgrade',
      'Get API key from https://console.anthropic.com/dashboard',
      'Run: claude (will prompt for authentication on first use)',
      'Set API key when prompted or export ANTHROPIC_API_KEY=your_key',
      'Test with: claude "Help me set up a React project"'
    ],
    icon: ''
  },
  {
    id: 'codex',
    name: 'OpenAI Codex CLI',
    description: 'Lightweight coding agent with GPT-5 and multimodal support',
    cost: 'Included in ChatGPT Plus',
    costDetail: 'ChatGPT Plus: $20/mo includes unlimited CLI usage',
    pros: [
      'Included in ChatGPT Plus ($20/mo)',
      'Latest GPT-5 reasoning models (fastest)',
      'Multimodal: text, screenshots, diagrams',
      'Built in Rust for speed and efficiency',
      'Your code never leaves your environment'
    ],
    cons: [
      'Requires ChatGPT Plus subscription',
      'Windows support is experimental (use WSL)'
    ],
    installCommand: 'npm install -g @openai/codex',
    setupSteps: [
      'Install: npm install -g @openai/codex or download from GitHub releases',
      'Subscribe to ChatGPT Plus at https://chat.openai.com/upgrade',
      'Sign in with ChatGPT Plus account',
      'Run: codex (will open browser for authentication)',
      'Switch to best model: /model GPT-5-Codex (in chat)',
      'Test with: codex "create a responsive landing page"'
    ],
    icon: ''
  }
];

const tools: Tool[] = [
  {
    id: 'terminal',
    name: 'Terminal/Command Line',
    description: 'Built into your computer - this is where the magic happens!',
    installed: true,
    version: 'Available',
    downloadUrl: '',
    helpText: "Every computer has this built-in. We'll teach you the essential commands step by step.",
    icon: ''
  },
  {
    id: 'browser',
    name: 'Web Browser',
    description: 'Chrome, Firefox, Safari, or any modern browser',
    installed: true,
    version: 'Detected',
    downloadUrl: 'https://www.google.com/chrome/',
    helpText: "You're viewing this page, so you're ready! We'll use your browser to preview projects.",
    icon: ''
  }
];

const steps = [
  {
    id: 'welcome',
    title: 'Welcome to Claude Academy!',
    subtitle: 'Your journey from zero to AI-powered developer starts here',
    content: `Welcome to OneWave Claude Academy! You're about to learn the future of coding: **AI-powered development**.

**Your Journey Overview:**
- **Level 1**: Setup your AI coding assistant (5 mins)
- **Level 2**: Build your first webpage with AI help
- **Level 3**: Create an interactive business tool
- **Level 4**: Deploy your project live on the web
- **Level 5+**: Master advanced AI development skills

**What Makes This Different:**
- **No syntax memorization** - AI writes the code for you
- **Real projects** - Build things people actually use
- **Instant feedback** - See your progress immediately
- **Modern tools** - Learn what professionals use in 2025

**Your Goal:** By the end, you'll confidently build web applications by describing what you want to an AI assistant. No more tutorial hell!`,
    action: 'Show Me How It Works'
  },
  {
    id: 'project-selection',
    title: 'What Do You Want to Build?',
    subtitle: 'Choose your first project or create your own',
    content: `Let's make this personal! What project excites YOU?

Pick a starter template or describe your own idea. We'll customize your entire learning path around building what you actually want to create.`
  },
  {
    id: 'demo',
    title: 'Watch AI Code in Real-Time!',
    subtitle: 'See how fast and easy AI coding really is',
    content: `Let's see AI coding in action! Watch as we create a beautiful website component in seconds, not hours.

This is exactly what you'll be able to do after this tutorial - just describe what you want, and AI writes the code for you.

**Real developer results:**
• "Built my startup's landing page in 30 minutes instead of 3 days"
• "AI fixed a bug I'd been stuck on for hours in 2 minutes"
• "Created a complete web app without memorizing a single syntax rule"`,
    action: 'That\'s Amazing! Let\'s Start'
  },
  {
    id: 'problem',
    title: 'Why Not Replit, Lovable, or Cursor?',
    subtitle: 'The hidden costs of "easy" coding platforms',
    content: `**Real developer experiences from Reddit and forums:**

**"I started with $25 for a simple task and ended up paying $200 because I kept thinking WE ARE ALMOST DONE.. then BOOM, it will BREAK all the existing features"** - Lovable user

**"One user who typically spent $100-$250 per month blew through $70 in a night"** - Replit Agent 3 launch

**"Each new feature breaks existing features... it's frustrating to say the least"** - G2 Review

**The Problem**: AI IDEs lock you into expensive platforms that:
• Charge you when THEIR AI makes mistakes
• Break your code while trying to "fix" it
• Cost $100-$1000+ per month for real projects
• Keep you trapped in their ecosystem

**Our Solution**: Learn to use **professional CLI tools** for just $20/month (Claude Pro or ChatGPT Plus) with unlimited usage and full control over your code.`,
    action: 'Show Me The Better Way'
  },
  {
    id: 'whyai',
    title: 'Why AI-Powered Coding?',
    subtitle: 'This is how the pros code in 2025',
    content: `**Traditional coding**: Hours of syntax errors, documentation hunting, and debugging frustration.

**AI-powered coding**: Describe what you want, AI writes the code, you review and refine.

Real developers use AI CLIs every day to:
• Write code 10x faster
• Fix bugs instantly
• Learn new technologies effortlessly
• Build complex projects without memorizing syntax

You'll learn the same tools used at Google, Meta, and every major tech company.`,
    action: 'Choose Your AI Assistant'
  },
  {
    id: 'cli-selection',
    title: 'Choose Your AI Coding Assistant',
    subtitle: 'Pick your perfect coding partner based on your goals',
    content: `Time to pick your AI pair programmer! Both options cost $20/month and include unlimited usage.

**What's a "CLI"?** CLI stands for "Command Line Interface" - it's a tool you control by typing commands in your terminal (instead of clicking buttons). Don't worry, we'll show you exactly what to type!

**Quick Guide:**
- **Want best quality?** - **Claude Code** (Included in Claude Pro $20/mo)
- **Want speed & multimodal?** - **Codex** (Included in ChatGPT Plus $20/mo)

Both are professional-grade tools - same price, different strengths!`
  },
  {
    id: 'terminal-practice',
    title: 'Terminal Practice (2 minutes)',
    subtitle: 'Learn by doing - in a safe practice area',
    content: 'Before we install anything, let\'s practice using the terminal together. You\'ll try 3 simple commands in a safe environment where you can\'t break anything!'
  },
  {
    id: 'installation',
    title: 'Installing Your AI Assistant',
    subtitle: 'Step-by-step installation guide',
    content: 'Now that you know how to use the terminal, let\'s install your AI assistant. You\'ve got this!'
  },
  {
    id: 'verification',
    title: 'Let\'s Test Your Setup!',
    subtitle: 'Make sure everything works perfectly',
    content: 'Time to verify your installation worked. We\'ll run a few quick tests to make sure your AI assistant is ready to help you code.'
  },
  {
    id: 'ready',
    title: 'You\'re Ready to Code with AI!',
    subtitle: 'Your AI assistant is installed and ready',
    content: 'dynamic', // This will be replaced with character-specific content
    action: 'Start Coding!'
  }
];

export default function SetupWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [selectedCli, setSelectedCli] = useState<string | null>(null);
  const [installationVerified, setInstallationVerified] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [customProjectIdea, setCustomProjectIdea] = useState('');
  const [terminalPracticeCompleted, setTerminalPracticeCompleted] = useState(false);
  const [showErrorRecovery, setShowErrorRecovery] = useState(false);
  const { completeLevel, setSelectedAiCli, character, selectedAiCli, setProject } = useProgress();
  const router = useRouter();

  // Pre-select CLI based on character choice (if not already selected)
  useEffect(() => {
    if (!selectedCli && selectedAiCli) {
      setSelectedCli(selectedAiCli);
    }
  }, [selectedCli, selectedAiCli]);

  // Get character-specific messaging
  const getCharacterContext = () => {
    switch(character) {
      case 1: // Business Builder
        return {
          greeting: "Setting up your entrepreneurial toolkit!",
          focus: "You'll install a free AI assistant to quickly prototype and validate business ideas without expensive developers.",
          outcome: "Build landing pages, MVPs, and business tools to test your ideas fast and cheap.",
          recommendedCli: "claude",
          whyThisCli: "Claude Code provides excellent code quality for building professional business tools. It's trusted by startups and enterprises alike."
        };
      case 2: // Tech Engineer
        return {
          greeting: "Configuring your professional development environment!",
          focus: "You'll install enterprise-grade AI tools used by top tech companies for production-quality code.",
          outcome: "Write scalable applications, APIs, and systems that can handle real-world traffic and complexity.",
          recommendedCli: "claude",
          whyThisCli: "Claude Code is the gold standard for code quality. It's what senior engineers use when quality and maintainability matter most."
        };
      case 3: // Full-Stack Hybrid
        return {
          greeting: "Building your versatile development setup!",
          focus: "You'll install flexible AI tools that adapt to both quick prototypes and production systems.",
          outcome: "Switch between rapid business validation and technical implementation seamlessly.",
          recommendedCli: "codex",
          whyThisCli: "OpenAI Codex gives you the flexibility to choose: free with ChatGPT Plus for learning, pay-per-use for serious projects."
        };
      default:
        return {
          greeting: "Setting up your AI coding environment!",
          focus: "You'll install professional AI development tools used by modern developers.",
          outcome: "Build real applications with AI as your coding partner.",
          recommendedCli: "claude",
          whyThisCli: "Claude Code is perfect for getting started - it's professional and powerful."
        };
    }
  };

  // Get character-specific ready step content
  const getReadyStepContent = () => {
    const cliName = selectedCliData?.name || 'AI CLI';
    switch(character) {
      case 1: // Business Builder
        return `Perfect! You now have ${cliName} installed and ready to help you build business tools. Here's your entrepreneurial coding journey:

**Level 2**: Build a landing page to validate your business idea
**Level 3**: Add a lead capture form with email collection
**Level 4**: Create a simple dashboard to track metrics
**Level 5**: Deploy it live and start collecting real user feedback
**Level 6+**: Scale with payment integration and analytics

Your AI assistant will handle the technical complexity - you focus on the business strategy!`;
      case 2: // Tech Engineer
        return `Perfect! You now have ${cliName} installed and ready for professional development. Here's your technical coding journey:

**Level 2**: Build a responsive React component library
**Level 3**: Implement advanced state management and routing
**Level 4**: Add TypeScript and comprehensive testing
**Level 5**: Set up CI/CD pipelines and monitoring
**Level 6+**: Deploy scalable microservices architecture

Your AI assistant will help you follow best practices and write production-quality code!`;
      case 3: // Full-Stack Hybrid
        return `Perfect! You now have ${cliName} installed and ready for versatile development. Here's your hybrid coding journey:

**Level 2**: Build a full-stack web application prototype
**Level 3**: Add authentication and user management
**Level 4**: Implement real-time features and APIs
**Level 5**: Create mobile-responsive PWA features
**Level 6+**: Scale to production with cloud deployment

Your AI assistant will help you bridge business needs with technical implementation!`;
      default:
        return `Perfect! You now have ${cliName} installed and ready. Here's your coding journey:

**Level 2**: Build your first web page with AI assistance
**Level 3**: Style it beautifully with AI-generated CSS
**Level 4**: Add interactivity with AI-written JavaScript
**Level 5**: Deploy it live with AI deployment help
**Level 6+**: Build something amazing that's uniquely yours

Your AI assistant will write most of the code - you'll focus on the creative decisions!`;
    }
  };

  const characterContext = getCharacterContext();
  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;
  const selectedCliData = aiClis.find(cli => cli.id === selectedCli);

  const handleNext = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }

    // Save project selection when moving from project selection step
    if (currentStepData.id === 'project-selection' && selectedProject) {
      const template = projectTemplates.find(t => t.id === selectedProject);
      if (template) {
        setProject({
          id: `project-${Date.now()}`,
          name: template.name,
          description: selectedProject === 'custom' ? customProjectIdea : template.description,
          template: selectedProject as any,
          customIdea: selectedProject === 'custom' ? customProjectIdea : undefined,
          audience: 'personal',
          timeline: 'week',
          features: template.suggestedFeatures,
          createdAt: new Date()
        });
      }
    }

    // Save CLI selection when moving from CLI selection step
    if (currentStepData.id === 'cli-selection' && selectedCli) {
      setSelectedAiCli(selectedCli as any);
    }

    if (isLastStep) {
      completeLevel(0); // Introduction/Setup level
      router.push('/upgrade');
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

  return (
    <section className="min-h-screen pb-20 py-4 sm:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Background mesh */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(45rem_50rem_at_top,rgba(47,201,244,0.2),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(50rem_45rem_at_bottom,rgba(0,199,189,0.15),transparent)]" />
        </div>

        <div className="relative">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mb-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-white/90">Your coding adventure begins here</span>
              </div>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl mb-4">
              <span className="text-gradient-primary">Setup</span> Wizard
            </h1>

            {/* Character-specific greeting */}
            <div className="mb-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm backdrop-blur">
                <span className="text-primary/90">{characterContext.greeting}</span>
              </div>
            </div>

            <p className="mx-auto max-w-3xl text-base leading-6 text-white/70 mb-2">
              {characterContext.focus}
            </p>
            <p className="mx-auto max-w-3xl text-sm leading-5 text-white/60 mb-3">
              <strong>What you'll build:</strong> {characterContext.outcome}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-medium">Introduction</span>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium">+250 XP</span>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-medium">5 min</span>
            </div>
          </div>

          {/* Progress Steps - Simplified */}
          <div className="max-w-7xl mx-auto mb-6">
            <div className="bg-zinc-900/50 rounded-xl p-3 backdrop-blur-sm">
              <div className="flex items-center justify-between gap-2">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <button
                        onClick={() => handleStepClick(index)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          index === currentStep
                            ? 'bg-primary text-white shadow-lg shadow-primary/50'
                            : completedSteps.includes(index)
                            ? 'bg-emerald-500 text-white'
                            : 'bg-zinc-800 text-white/50'
                        }`}
                        disabled={index > Math.max(...completedSteps) + 1}
                      >
                        {completedSteps.includes(index) ? <Check className="w-4 h-4" /> : index + 1}
                      </button>
                      <span className={`text-xs mt-1 ${index === currentStep ? 'text-primary font-semibold' : 'text-white/50'}`}>
                        Step {index + 1}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`h-0.5 flex-1 mx-1 transition-colors ${
                        completedSteps.includes(index) ? 'bg-emerald-500' : 'bg-zinc-700'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className="max-w-7xl mx-auto px-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="rounded-xl bg-zinc-900/70 p-4 sm:p-6 ring-1 ring-white/10 backdrop-blur max-h-[75vh] overflow-y-auto"
              >
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-white mb-3">
                    {currentStepData.title}
                  </h2>
                  <p className="text-lg text-white/70">
                    {currentStepData.subtitle}
                  </p>
                </div>

                {/* Project Selection Step */}
                {currentStepData.id === 'project-selection' ? (
                  <div className="space-y-4 mb-8">
                    <div className="text-center mb-6">
                      <div className="text-white/80 text-lg">{parseMarkdown(currentStepData.content)}</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[65vh] overflow-y-auto pb-4">
                      {projectTemplates.map((template, index) => (
                        <motion.div
                          key={template.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`rounded-xl p-6 border-2 cursor-pointer transition-all ${
                            selectedProject === template.id
                              ? 'border-primary bg-primary/10'
                              : 'border-zinc-700/50 bg-zinc-800/50 hover:border-zinc-600'
                          }`}
                          onClick={() => {
                            setSelectedProject(template.id);
                            if (template.id !== 'custom') {
                              setCustomProjectIdea('');
                            }
                          }}
                        >
                          <div className="text-center mb-4">
                            <div className="text-5xl mb-3">{template.icon}</div>
                            <h3 className="text-xl font-bold text-white mb-2">{template.name}</h3>
                            <p className="text-white/80 text-sm mb-3">{template.description}</p>
                            <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                              template.difficulty === 'beginner'
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : 'bg-amber-500/20 text-amber-400'
                            }`}>
                              {template.difficulty}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <h4 className="text-xs font-semibold text-white/70 uppercase tracking-wide">Examples:</h4>
                            {template.examples.map((example, i) => (
                              <div key={i} className="text-xs text-white/60">• {example}</div>
                            ))}
                          </div>

                          {selectedProject === template.id && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="mt-4 p-3 bg-primary/20 rounded-lg border border-primary/30 text-center"
                            >
                              <CheckCircle className="w-5 h-5 text-primary mx-auto mb-1" />
                              <span className="text-sm font-semibold text-primary">Selected!</span>
                            </motion.div>
                          )}
                        </motion.div>
                      ))}
                    </div>

                    {/* Custom Idea Input */}
                    {selectedProject === 'custom' && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-6"
                      >
                        <h3 className="text-lg font-semibold text-primary mb-4">Describe Your Idea</h3>
                        <textarea
                          value={customProjectIdea}
                          onChange={(e) => setCustomProjectIdea(e.target.value)}
                          placeholder="Example: A website for my band with tour dates, music player, and merch store..."
                          className="w-full h-32 px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-white/40 focus:border-primary focus:outline-none resize-none"
                        />
                        <p className="text-white/60 text-sm mt-2">
                          Tip: Be specific! The more details you provide, the better we can customize your learning path.
                        </p>
                      </motion.div>
                    )}

                    {selectedProject && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6"
                      >
                        <div className="flex items-start gap-3">
                          <Lightbulb className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="text-lg font-semibold text-blue-300 mb-2">
                              Great choice!
                            </h4>
                            <p className="text-blue-200 text-sm">
                              We'll customize your entire learning path around building this project.
                              Every lesson, example, and challenge will help you create exactly what you want!
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                ) :

                /* Demo Step */
                currentStepData.id === 'demo' ? (
                  <div className="space-y-8 mb-8">
                    <div className="text-center mb-6">
                      <div className="text-white/80 text-lg">{parseMarkdown(currentStepData.content)}</div>
                    </div>
                    <LiveCodeDemo projectType={selectedProject || undefined} />
                  </div>
                ) :

                /* CLI Selection Step */
                currentStepData.id === 'cli-selection' ? (
                  <div className="space-y-6 mb-8">
                    <div className="text-center mb-6">
                      <div className="text-white/80 text-base max-w-4xl mx-auto mb-4">{parseMarkdown(currentStepData.content)}</div>

                      {/* Character-specific recommendation */}
                      {selectedAiCli && (
                        <div className="mt-4 max-w-2xl mx-auto bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4 border border-primary/20">
                          <h3 className="text-base font-semibold text-primary mb-2">Recommended: {characterContext.recommendedCli === 'claude' ? 'Claude Code' : 'Codex'}</h3>
                          <p className="text-white/70 text-sm">
                            {characterContext.whyThisCli}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
                      {aiClis.map((cli, index) => (
                        <motion.div
                          key={cli.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`rounded-xl p-5 border-2 cursor-pointer transition-all ${
                            selectedCli === cli.id
                              ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                              : 'border-zinc-700/50 bg-zinc-800/50 hover:border-zinc-600'
                          }`}
                          onClick={() => setSelectedCli(cli.id)}
                        >
                          <div className="flex items-start gap-4 mb-4">
                            <div className="text-3xl flex-shrink-0">{cli.icon}</div>
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-white mb-1">{cli.name}</h3>
                              <div className="text-sm font-semibold text-primary mb-1">{cli.cost}</div>
                              <p className="text-xs text-white/60">{cli.description}</p>
                            </div>
                            {selectedCli === cli.id && (
                              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                            )}
                          </div>

                          <div className="space-y-2">
                            <div>
                              <h4 className="text-xs font-semibold text-emerald-400 mb-1">Key Benefits:</h4>
                              <ul className="text-xs text-white/70 space-y-0.5">
                                {cli.pros.slice(0, 3).map((pro, i) => (
                                  <li key={i}>• {pro}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {selectedCli && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 mt-4 max-w-xl mx-auto"
                      >
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                          <p className="text-emerald-200 text-sm">
                            {selectedCli === 'claude' && "Perfect! Claude Code is ready to help you build high-quality projects."}
                            {selectedCli === 'codex' && "Perfect! OpenAI Codex is ready to help you build projects fast."}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                ) : currentStepData.id === 'terminal-practice' ? (
                  <div className="mb-8">
                    <TerminalPractice
                      onComplete={() => {
                        setTerminalPracticeCompleted(true);
                        // Auto-advance after a short delay
                        setTimeout(() => {
                          handleNext();
                        }, 1500);
                      }}
                    />
                  </div>
                ) : currentStepData.id === 'installation' && selectedCliData ? (
                  <div className="space-y-6 mb-8">
                    <div className="text-center mb-6">
                      <div className="text-white/80 text-lg mb-4">{parseMarkdown(currentStepData.content)}</div>
                      <div className="inline-flex items-center gap-3 bg-zinc-800 px-4 py-2 rounded-lg">
                        <span className="text-2xl">{selectedCliData.icon}</span>
                        <span className="font-semibold text-white">Installing {selectedCliData.name}</span>
                      </div>
                    </div>

                    {/* Simple Explanation */}
                    <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-lg p-6 mb-6">
                      <h3 className="text-lg font-semibold text-emerald-300 mb-3">What are we doing exactly?</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5">1</div>
                          <div>
                            <p className="text-white font-medium">Terminal (Command Line) = Your computer's control center</p>
                            <p className="text-white/70">Think of it like texting your computer. Instead of clicking icons with your mouse, you type messages (called "commands") to tell your computer exactly what to do.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5">2</div>
                          <div>
                            <p className="text-white font-medium">Installing = Adding a new superpower</p>
                            <p className="text-white/70">We're downloading and installing your AI coding assistant. It's like hiring a brilliant coding partner who never gets tired!</p>
                            <p className="text-emerald-300 text-sm mt-2"><strong>First, you'll need Node.js</strong> - the engine that powers modern web development. <a href="https://nodejs.org/en/download" target="_blank" rel="noopener noreferrer" className="underline hover:text-emerald-200">Download it here (official & safe)</a>. Used by millions of developers worldwide!</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-secondary/20 text-secondary text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5">3</div>
                          <div>
                            <p className="text-white font-medium">Commands = Magic spells for computers</p>
                            <p className="text-white/70">Each command tells your computer to do something specific. &quot;npm install&quot; means &quot;go get this tool from the internet and set it up for me.&quot;</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-700">
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Terminal className="w-5 h-5" />
                        Super Easy Installation (Just Click Buttons!)
                      </h3>

                      <div className="space-y-6">
                        {selectedCliData.setupSteps.slice(0, 1).map((step, index) => {
                          // Extract command if it's an install step
                          const isInstallStep = step.includes('npm install') || step.includes('brew install') || step.includes('pip install');
                          const command = isInstallStep ?
                            (step.includes(':') ? step.split(': ')[1] : step.split('Install: ')[1] || step)
                            : null;

                          return (
                            <div key={index} className="space-y-4">
                              <div className="flex items-start gap-4 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                  {index + 1}
                                </div>
                                <div className="flex-1">
                                  <p className="text-white/90 mb-3">{step}</p>
                                  {command && (
                                    <TerminalLauncher
                                      command={command}
                                      description="Click 'Open Terminal' to launch your terminal automatically, or copy the command to paste manually."
                                      websites={[
                                        ...(selectedCli === 'claude' ? [
                                          {
                                            name: 'Claude Code Installation',
                                            url: 'https://www.npmjs.com/package/@anthropic-ai/claude-code',
                                            description: 'NPM package page'
                                          },
                                          {
                                            name: 'Anthropic Console',
                                            url: 'https://console.anthropic.com/dashboard',
                                            description: 'Get your API key'
                                          }
                                        ] : []),
                                        ...(selectedCli === 'codex' ? [
                                          {
                                            name: 'OpenAI Codex GitHub',
                                            url: 'https://github.com/openai/codex',
                                            description: 'Download and setup guide'
                                          },
                                          {
                                            name: 'OpenAI API Keys',
                                            url: 'https://platform.openai.com/api-keys',
                                            description: 'Get your API key'
                                          }
                                        ] : [])
                                      ]}
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}

                        {/* Show remaining steps as simplified list */}
                        <div className="bg-zinc-800/50 rounded-lg p-4">
                          <h4 className="text-white font-semibold mb-3">After installation, you'll need to:</h4>
                          <div className="space-y-2">
                            {selectedCliData.setupSteps.slice(1).map((step, index) => (
                              <div key={index} className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-secondary/20 text-secondary text-xs flex items-center justify-center font-bold flex-shrink-0 mt-1">
                                  {index + 2}
                                </div>
                                <p className="text-white/80 text-sm">{step}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-emerald-300 mb-2">Security & Safety</h4>
                            <ul className="text-emerald-200 text-sm space-y-1">
                              <li>• <strong>Permission prompts are normal</strong> - Node.js needs access to install files</li>
                              <li>• <strong>Your data stays private</strong> - nothing is uploaded or shared</li>
                              <li>• <strong>Official tools only</strong> - we link directly to nodejs.org and npm</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                        <div className="flex items-start gap-2">
                          <Lightbulb className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-amber-300 mb-1">Need Help?</h4>
                            <p className="text-amber-200 text-sm">
                              Don't worry if this looks intimidating! Copy and paste each command one at a time.
                              If you get stuck, take a screenshot and ask for help in our community.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : currentStepData.id === 'verification' && selectedCliData ? (
                  <div className="space-y-6 mb-8">
                    <div className="text-center mb-6">
                      <div className="text-white/80 text-lg">{parseMarkdown(currentStepData.content)}</div>
                    </div>

                    {/* Simple Explanation */}
                    <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-6 mb-6">
                      <h3 className="text-lg font-semibold text-green-300 mb-3">What is &quot;verification&quot; anyway?</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5">1</div>
                          <div>
                            <p className="text-white font-medium">Testing = Making sure everything works</p>
                            <p className="text-white/70">Like turning on a new TV to make sure it works before you start watching Netflix!</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5">2</div>
                          <div>
                            <p className="text-white font-medium">Version command = &quot;Are you there?&quot;</p>
                            <p className="text-white/70">We're asking your AI assistant to tell us its version number. If it answers, it means it's installed and ready!</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-700">
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                        Test Your AI Assistant (One Click!)
                      </h3>

                      <div className="space-y-6">
                        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                          <p className="text-white/90 mb-3">Let's test if your AI assistant is ready:</p>
                          <TerminalLauncher
                            command={
                              selectedCli === 'claude' ? 'claude --help' :
                              'openai --version'
                            }
                            description="Click to run the test command. You should see a version number or help message if everything worked!"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <button
                            onClick={() => setInstallationVerified(true)}
                            className="flex items-center justify-center gap-3 px-6 py-4 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition-colors"
                          >
                            <CheckCircle className="w-5 h-5" />
                            It worked! I see the version/help
                          </button>

                          <button
                            onClick={() => setShowErrorRecovery(true)}
                            className="flex items-center justify-center gap-3 px-6 py-4 bg-red-500/20 text-red-300 border border-red-500/30 rounded-xl font-semibold hover:bg-red-500/30 transition-colors"
                          >
                            <AlertCircle className="w-5 h-5" />
                            I got an error or nothing happened
                          </button>
                        </div>
                      </div>

                      {installationVerified && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg"
                        >
                          <div className="flex items-center gap-2 text-emerald-300 mb-2">
                            <CheckCircle className="w-5 h-5" />
                            <span className="font-semibold">AMAZING! Your AI assistant is ready!</span>
                          </div>
                          <p className="text-emerald-200 text-sm">
                            You now have a professional AI coding partner installed on your computer. This is the same technology used at Google, Apple, and every major tech company!
                          </p>
                        </motion.div>
                      )}
                    </div>

                    {/* Error Recovery Wizard */}
                    {showErrorRecovery && (
                      <div className="mt-8">
                        <ErrorRecoveryWizard
                          cliName={selectedCliData?.name || 'AI CLI'}
                          onBack={() => setShowErrorRecovery(false)}
                          onResolved={() => {
                            setShowErrorRecovery(false);
                            setInstallationVerified(true);
                          }}
                        />
                      </div>
                    )}

                  </div>
                ) : (
                  <div className="mb-8">
                    <div className="prose prose-lg prose-invert mx-auto">
                      <div className="text-white/80 text-lg leading-relaxed">
                        {currentStepData.id === 'ready' ? parseMarkdown(getReadyStepContent()) : parseMarkdown(currentStepData.content)}
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-8 border-t border-white/10">
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
                      Step {currentStep + 1} of {steps.length}
                    </div>
                    <div className="w-32 h-2 bg-white/10 rounded-full">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
                        style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  {isLastStep ? (
                    <Link href="/level/1" className="inline-flex justify-center">
                      <button
                        onClick={handleNext}
                        className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                      >
                        {currentStepData.action}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </Link>
                  ) : (
                    <button
                      onClick={handleNext}
                      disabled={
                        (currentStepData.id === 'project-selection' && (!selectedProject || (selectedProject === 'custom' && !customProjectIdea.trim()))) ||
                        (currentStepData.id === 'cli-selection' && !selectedCli) ||
                        (currentStepData.id === 'verification' && !installationVerified)
                      }
                      className={`inline-flex items-center gap-3 px-10 py-5 rounded-xl font-bold text-xl transition-all ${
                        (currentStepData.id === 'project-selection' && (!selectedProject || (selectedProject === 'custom' && !customProjectIdea.trim()))) ||
                        (currentStepData.id === 'cli-selection' && !selectedCli) ||
                        (currentStepData.id === 'verification' && !installationVerified)
                          ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed shadow-none'
                          : 'bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600 text-white hover:scale-110 shadow-2xl shadow-emerald-500/70 animate-pulse hover:shadow-emerald-400/90 hover:from-emerald-300 hover:via-green-400 hover:to-emerald-500'
                      }`}
                    >
                      {currentStepData.id === 'project-selection' && !selectedProject
                        ? 'Choose a project first'
                        : currentStepData.id === 'project-selection' && selectedProject === 'custom' && !customProjectIdea.trim()
                        ? 'Describe your project idea'
                        : currentStepData.id === 'cli-selection' && !selectedCli
                        ? 'Select an AI CLI first'
                        : currentStepData.id === 'verification' && !installationVerified
                        ? 'Verify installation first'
                        : currentStepData.action}
                      <ChevronRight className="w-5 h-5" />
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
