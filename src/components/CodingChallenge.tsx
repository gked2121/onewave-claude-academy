"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgress } from '@/context/ProgressContext';
import { Check, Play, RotateCcw, Sparkles, Target, Trophy, CheckCircle, AlertCircle, Info, Copy, Clipboard } from 'lucide-react';
import Link from 'next/link';
import LevelNavigation from './LevelNavigation';
import { validateCode, extractCodeFromHTML } from '@/utils/codeValidator';
import { getContextualHelp } from '@/utils/claudeCoachKnowledge';
import { personalizeContent, getProjectEncouragement, getCliPersonalization } from '@/utils/contentPersonalization';

interface ChallengeData {
  id: number;
  title: string;
  description: string;
  icon: string;
  difficulty: string;
  xpReward: number;
  estimatedTime: string;
  objective: string;
  hints: string[];
  initialCode: string;
  solution: string;
  instructions: string[];
}

const challengeData: Record<number, ChallengeData> = {
  1: {
    id: 1,
    title: "Your First AI-Powered Webpage",
    description: "Learn to collaborate with AI to build your first website!",
    icon: "bot",
    difficulty: "Beginner",
    xpReward: 500,
    estimatedTime: "45 min",
    objective: "Create a personal webpage using AI as your coding partner",
    hints: [
      "Think of AI like a super-smart coding buddy who speaks every programming language",
      "Describe what you want in plain English - AI will write the code",
      "Start simple: 'Create a webpage about me with a colorful design'",
      "AI is like having a master chef in your kitchen - you provide ingredients (ideas), they cook (code)"
    ],
    initialCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Vibe Page</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            min-height: 100vh;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
        }
        /* Add your vibe styles here! */
    </style>
</head>
<body>
    <div class="container">
        <!-- Build your vibe page here! -->
        <h1>Welcome to My Vibe!</h1>

    </div>
</body>
</html>`,
    solution: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Vibe Page</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            min-height: 100vh;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
        }
        .section {
            margin: 40px 0;
            padding: 30px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            backdrop-filter: blur(10px);
        }
        .highlight {
            background: linear-gradient(45deg, #ff6b6b, #ee5a24);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="section">
            <h1>Welcome to My Vibe!</h1>
            <p>I'm building amazing things with code!</p>
        </header>

        <main>
            <section class="section">
                <h2>About My <span class="highlight">Coding Journey</span></h2>
                <p>Learning to code with good vibes and positive energy!</p>
            </section>

            <section class="section">
                <h2>Let's Connect!</h2>
                <p>Ready to build something awesome together?</p>
            </section>
        </main>
    </div>
</body>
</html>`,
    instructions: [
      "Open your AI CLI and ask: 'Create a personal webpage with my name and intro'",
      "Tell AI: 'Add an about section that says I'm learning to code with AI'",
      "Request: 'Add a colorful gradient background and modern styling'",
      "Ask AI: 'Make it responsive and add some fun visual flair'",
      "Copy the AI's code into the editor and test it out!"
    ]
  },
  2: {
    id: 2,
    title: "AI-Powered Interactive Elements",
    description: "Add buttons, animations, and interactive features with AI help!",
    icon: "sparkle",
    difficulty: "Beginner",
    xpReward: 750,
    estimatedTime: "30 min",
    objective: "Make your webpage interactive using AI to write JavaScript",
    hints: [
      "AI can write JavaScript just like a bilingual person speaks multiple languages",
      "Describe interactions in simple terms: 'When I click this button, show a message'",
      "Think of JavaScript like giving your webpage superpowers - buttons that do things!",
      "AI is like a magic wand - you say what you want to happen, it makes it work"
    ],
    initialCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive Vibe Page</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            min-height: 100vh;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
        }
        /* AI will help add interactive styles here! */
    </style>
</head>
<body>
    <div class="container">
        <h1>My Interactive Vibe Page!</h1>
        <!-- AI will help add interactive elements here! -->

    </div>

    <script>
        // AI will help write JavaScript here!
    </script>
</body>
</html>`,
    solution: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive Vibe Page</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            min-height: 100vh;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
        }
        .magic-button {
            background: linear-gradient(45deg, #ff6b6b, #ee5a24);
            border: none;
            padding: 15px 30px;
            border-radius: 25px;
            color: white;
            font-size: 18px;
            cursor: pointer;
            transition: transform 0.3s ease;
        }
        .magic-button:hover {
            transform: scale(1.1);
        }
        .hidden {
            display: none;
        }
        .surprise {
            background: rgba(255, 255, 255, 0.1);
            padding: 20px;
            border-radius: 15px;
            margin: 20px 0;
            animation: fadeIn 0.5s ease;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>My Interactive Vibe Page!</h1>
        <p>Welcome to my coding journey! Click the magic button below:</p>

        <button class="magic-button" onclick="showSurprise()">Click for Magic!</button>

        <div id="surprise" class="surprise hidden">
            <h2>Surprise! You triggered JavaScript!</h2>
            <p>You just made the webpage respond to your click. That's the power of interactive coding!</p>
        </div>

        <button class="magic-button" onclick="changeBackground()" style="margin-top: 20px;">
            Change Colors!
        </button>
    </div>

    <script>
        function showSurprise() {
            const surprise = document.getElementById('surprise');
            surprise.classList.remove('hidden');
        }

        function changeBackground() {
            const colors = [
                'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
            ];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            document.body.style.background = randomColor;
        }
    </script>
</body>
</html>`,
    instructions: [
      "Ask AI: 'Add a button that shows a hidden message when clicked'",
      "Request: 'Make the button have a hover effect that makes it bigger'",
      "Tell AI: 'Add another button that changes the background color randomly'",
      "Ask: 'Make the hidden message appear with a smooth animation'",
      "Test your interactive webpage - click the buttons and see the magic!"
    ]
  },
  3: {
    id: 3,
    title: "Real CLI AI Workflows",
    description: "Master the actual commands and prompts that professional developers use!",
    icon: "fire",
    difficulty: "Beginner",
    xpReward: 1000,
    estimatedTime: "45 min",
    objective: "Learn real CLI prompting techniques used by professional developers",
    hints: [
      "Think of CLI AI like having a senior developer sitting next to you - be specific about what you want",
      "Good prompts are like good recipes - they include context, requirements, and desired outcome",
      "CLI AI tools can read your entire project context - use phrases like 'update this file to...'",
      "Pro developers use iterative prompting: start broad, then refine with follow-up requests"
    ],
    initialCode: `# Your Project Structure
my-portfolio/
├── index.html (your main page)
├── styles.css (your styles)
├── script.js (your JavaScript)
└── README.md (project info)

# Real CLI AI Commands You'll Learn:
# 1. Project setup and structure
# 2. Feature implementation
# 3. Bug fixing and debugging
# 4. Code refactoring and optimization

<!-- This lesson teaches ACTUAL CLI usage, not just code -->`,
    solution: `# Mastered CLI AI Workflows!

You've learned the essential CLI AI patterns:

- [x] Context-aware prompting
- [x] Iterative development
- [x] Project-wide updates
- [x] Professional debugging techniques

Ready for real-world development!`,
    instructions: [
      "GEMINI CLI: Try 'gemini \"Create a portfolio site with navigation, about section, and contact form\"'",
      "CLAUDE CODE: Ask 'claude \"Add responsive design and make it mobile-friendly\"'",
      "CODEX CLI: Request 'codex \"Debug the form validation and add error messages\"'",
      "Practice follow-up: 'Make the color scheme more modern and add hover animations'",
      "Deploy command: 'Help me deploy this to GitHub Pages with automatic updates'"
    ]
  },
  4: {
    id: 4,
    title: "Project Deployment & Git Workflows",
    description: "Learn to deploy your projects and manage code like a pro developer!",
    icon: "rocket",
    difficulty: "Beginner",
    xpReward: 1250,
    estimatedTime: "30 min",
    objective: "Deploy your first project and set up professional git workflows",
    hints: [
      "Git is like a time machine for your code - you can go back to any previous version",
      "GitHub is like Google Drive for code - it saves your work in the cloud",
      "Deployment is like moving from your workshop to opening a store - your code goes live!",
      "CLI AI tools can handle all the scary git commands for you"
    ],
    initialCode: `# Professional Developer Workflow
# 1. Code locally with AI assistance
# 2. Save to Git (version control)
# 3. Push to GitHub (cloud backup)
# 4. Deploy to web (go live!)

# Commands you'll master:
git init
git add .
git commit -m "Initial commit"
git push origin main

# Plus deployment to:
- Vercel (recommended)
- Netlify
- GitHub Pages`,
    solution: `Deployment Master Achieved!

Your project is now LIVE on the internet!

- [x] Code saved to Git
- [x] Backed up on GitHub
- [x] Deployed to web
- [x] Professional workflow established

Share your live URL with friends!`,
    instructions: [
      "Ask AI: 'Help me initialize git and create my first commit'",
      "Request: 'Connect this to GitHub and push my code'",
      "Deploy: 'Deploy this project to Vercel with automatic updates'",
      "Set up: 'Create a professional README with project description'",
      "Test: Visit your live URL and share it with someone!"
    ]
  },
  5: {
    id: 5,
    title: "Advanced AI Development Patterns",
    description: "Master advanced prompting and become an AI development expert!",
    icon: "brain",
    difficulty: "Intermediate",
    xpReward: 1500,
    estimatedTime: "60 min",
    objective: "Learn advanced AI prompting patterns used by senior developers",
    hints: [
      "Chain prompting: Break complex tasks into smaller, sequential requests",
      "Context building: Give AI your project requirements, user stories, and constraints",
      "Error-driven development: Use AI to fix bugs by pasting error messages",
      "Refactoring workflows: Ask AI to improve code quality, performance, and maintainability"
    ],
    initialCode: `# Advanced AI Development Patterns

## 1. Chain Prompting
"First create the HTML structure"
→ "Now add CSS styling with modern design"
→ "Add JavaScript for interactivity"
→ "Optimize for mobile responsiveness"

## 2. Context-Rich Requests
"I'm building a task manager app for busy students.
The users need to add tasks, set priorities, and track deadlines.
Make it colorful and fun, not corporate."

## 3. Error-Driven Development
"I'm getting this error: [paste error]
Here's my code: [paste code]
Please fix and explain what went wrong"`,
    solution: `AI Development Expert Unlocked!

You now have the skills to:

- [x] Build complex applications with AI
- [x] Debug issues like a senior developer
- [x] Write professional, maintainable code
- [x] Deploy and manage real projects

Welcome to the future of development!`,
    instructions: [
      "Chain prompting: Build a todo app step-by-step with 4 separate AI requests",
      "Context prompting: Describe a full app idea and let AI architect the solution",
      "Error fixing: Intentionally break something and ask AI to debug it",
      "Refactoring: Ask AI to improve your code's performance and readability",
      "Portfolio piece: Create one final project that showcases all your new skills!"
    ]
  },
  6: {
    id: 6,
    title: "Real-World Project: Task Manager App",
    description: "Build a complete task management application using modern frameworks!",
    icon: "app",
    difficulty: "Intermediate",
    xpReward: 2000,
    estimatedTime: "90 min",
    objective: "Create a full-featured task manager with data persistence and modern UI",
    hints: [
      "This is your first real application - think like a product manager and developer",
      "AI can scaffold entire applications: 'Create a React task manager with CRUD operations'",
      "Focus on user experience: drag-and-drop, keyboard shortcuts, smooth animations",
      "Use AI to implement features you don't know: 'Add local storage to save tasks between sessions'"
    ],
    initialCode: `# Real-World Project Structure
# You'll build a complete task management application

## Features to implement:
- Add, edit, and delete tasks
- Mark tasks as complete/incomplete
- Priority levels (High, Medium, Low)
- Categories or tags
- Search and filter functionality
- Data persistence (localStorage)
- Responsive design
- Keyboard shortcuts

## Technology Stack:
- Frontend: React/Vue/Vanilla JS (your choice)
- Styling: Tailwind CSS or modern CSS
- State Management: Context API or simple state
- Storage: localStorage for persistence

## This is your portfolio piece!`,
    solution: `# Task Manager App - Complete Implementation

- [x] Modern React application with hooks
- [x] CRUD operations for task management
- [x] Priority levels and categorization
- [x] Search and filter functionality
- [x] Local storage persistence
- [x] Responsive design for all devices
- [x] Keyboard shortcuts for power users
- [x] Smooth animations and transitions
- [x] Deployed live for portfolio
- [x] Professional code structure

You now have a real application to show employers!`,
    instructions: [
      "Ask AI: 'Create a React task manager app with add, edit, delete, and complete functionality'",
      "Request: 'Add priority levels, categories, and local storage persistence'",
      "Ask: 'Implement search/filter functionality and keyboard shortcuts'",
      "Polish: 'Make it responsive and add smooth animations throughout'",
      "Deploy: 'Help me deploy this to Vercel/Netlify with a custom domain'"
    ]
  },
  7: {
    id: 7,
    title: "AI-Powered Features Integration",
    description: "Add real AI capabilities to your applications using API integrations!",
    icon: "brain",
    difficulty: "Advanced",
    xpReward: 2500,
    estimatedTime: "120 min",
    objective: "Integrate real AI APIs into your applications for intelligent features",
    hints: [
      "This level teaches you to build AI-powered applications, not just use AI for coding",
      "You'll integrate OpenAI, Claude, or Gemini APIs directly into your app",
      "Think beyond chatbots - AI can analyze text, generate content, classify data",
      "AI APIs are like having superpowers - describe the capability, get the implementation"
    ],
    initialCode: `# AI-Powered Application Features
# Transform your task manager into an intelligent assistant

## AI Features to Add:
1. Smart task categorization
   - AI analyzes task descriptions and suggests categories

2. Priority prediction
   - AI determines task urgency from context

3. Task suggestions
   - AI recommends related tasks based on your goals

4. Smart due dates
   - AI estimates completion time and suggests deadlines

5. Natural language input
   - "Add shopping and gym tomorrow" → creates 2 tasks

## APIs you'll integrate:
- OpenAI GPT for text analysis
- Claude for reasoning tasks
- Gemini for free intelligent features

## This makes your app stand out from basic CRUD applications!`,
    solution: `# AI-Enhanced Task Manager - Advanced Implementation

Successfully integrated AI capabilities:

- [x] Smart auto-categorization using AI text analysis
- [x] Intelligent priority prediction based on context
- [x] AI-powered task suggestions and recommendations
- [x] Natural language task input parsing
- [x] Smart scheduling with AI-estimated timeframes
- [x] Contextual insights and productivity analytics
- [x] Real-time AI assistance for task management
- [x] Professional API integration patterns
- [x] Error handling and fallback strategies
- [x] Deployed with AI features live

Your app now demonstrates advanced AI integration skills!`,
    instructions: [
      "API Setup: 'Help me integrate OpenAI/Claude/Gemini API into my task manager'",
      "Smart Features: 'Add AI categorization that analyzes task text and suggests categories'",
      "Natural Input: 'Create natural language parsing - turn sentences into structured tasks'",
      "Intelligence: 'Add AI priority prediction and smart due date suggestions'",
      "Polish: 'Implement error handling, loading states, and fallback strategies for AI features'"
    ]
  },
  8: {
    id: 8,
    title: "Full-Stack Deployment & DevOps",
    description: "Master professional deployment, monitoring, and DevOps workflows!",
    icon: "rocket",
    difficulty: "Advanced",
    xpReward: 3000,
    estimatedTime: "150 min",
    objective: "Deploy production-ready applications with professional DevOps practices",
    hints: [
      "This level makes you job-ready - you'll know the entire software delivery lifecycle",
      "DevOps isn't scary with AI help - describe what you want, get the configuration",
      "You'll set up real monitoring, logging, and error tracking like senior developers",
      "This completes your transformation from beginner to professional developer"
    ],
    initialCode: `# Professional DevOps & Deployment Pipeline
# Take your AI-powered app from local development to production

## DevOps Skills You'll Master:
1. Production Deployment
   - Deploy to Vercel, Netlify, or AWS
   - Custom domains and SSL certificates
   - Environment configuration management

2. CI/CD Pipelines
   - Automated testing on every commit
   - Automatic deployment on merge
   - Rollback strategies for failures

3. Monitoring & Observability
   - Error tracking with Sentry
   - Performance monitoring
   - User analytics and usage tracking

4. Database & Backend
   - Set up production database (Supabase/PlanetScale)
   - API routes and authentication
   - Data migrations and backups

## Professional Tools:
- GitHub Actions for CI/CD
- Docker for containerization
- Monitoring dashboards
- Professional logging

## You'll have a complete production application!`,
    solution: `# Production-Ready Full-Stack Application

CONGRATULATIONS! You're now a professional developer:

- [x] Production deployment with custom domain
- [x] Automated CI/CD pipeline with testing
- [x] Real-time monitoring and error tracking
- [x] Professional database with authentication
- [x] Scalable architecture and performance optimization
- [x] Security best practices implementation
- [x] Documentation and API specifications
- [x] Professional GitHub portfolio
- [x] Live application with real users
- [x] Complete DevOps workflow mastery

You've completed the journey from beginner to professional AI-enhanced developer!
Your portfolio now demonstrates enterprise-level capabilities.

Time to apply for those dream developer jobs!`,
    instructions: [
      "Production Deploy: 'Set up professional deployment with custom domain, SSL, and CDN'",
      "CI/CD Pipeline: 'Create GitHub Actions workflow with automated testing and deployment'",
      "Monitoring: 'Add error tracking, performance monitoring, and user analytics'",
      "Database: 'Set up production database with authentication and data persistence'",
      "Portfolio: 'Create professional documentation and README showcasing the complete project'"
    ]
  }
};

interface CodingChallengeProps {
  levelId: number;
}

export default function CodingChallenge({ levelId }: CodingChallengeProps) {
  const [code, setCode] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [validationResult, setValidationResult] = useState<any>(null);
  const [showValidation, setShowValidation] = useState(false);
  const [viewMode, setViewMode] = useState<'code' | 'link'>('code');
  const [localUrl, setLocalUrl] = useState('');
  const { completeLevel, character, selectedAiCli, project } = useProgress();

  // Get personalized content for this level
  const personalizedContent = personalizeContent(levelId, project, character, selectedAiCli || 'codex');
  const cliPersonalization = getCliPersonalization(selectedAiCli || 'codex');
  const projectEncouragement = getProjectEncouragement(project);

  // Get character-specific context for this level
  const getCharacterContext = (levelId: number) => {
    const characterNames = {1: 'Business Builder', 2: 'Tech Engineer', 3: 'Full-Stack Hybrid'};
    const characterName = characterNames[character as keyof typeof characterNames] || 'Developer';

    switch(character) {
      case 1: // Business Builder
        return {
          focus: "Focus on building MVPs fast to validate business ideas",
          outcome: `You'll build a ${levelId === 1 ? 'landing page' : levelId === 2 ? 'interactive demo' : levelId === 3 ? 'user feedback system' : levelId === 4 ? 'deployed MVP' : 'growth dashboard'} that real customers can use`,
          cliTip: `Use ${selectedAiCli || 'your AI CLI'} to prioritize features that drive user engagement and business metrics`
        };
      case 2: // Tech Engineer
        return {
          focus: "Focus on code quality, scalability, and professional practices",
          outcome: `You'll build ${levelId === 1 ? 'production-ready code' : levelId === 2 ? 'optimized interactions' : levelId === 3 ? 'scalable architecture' : levelId === 4 ? 'CI/CD pipeline' : 'enterprise-grade system'} following industry best practices`,
          cliTip: `Use ${selectedAiCli || 'your AI CLI'} to implement robust error handling, testing, and documentation`
        };
      case 3: // Full-Stack Hybrid
        return {
          focus: "Focus on end-to-end product development and team leadership",
          outcome: `You'll build ${levelId === 1 ? 'full product foundation' : levelId === 2 ? 'user-centric features' : levelId === 3 ? 'complete application' : levelId === 4 ? 'production deployment' : 'business-ready platform'} that bridges technical and business needs`,
          cliTip: `Use ${selectedAiCli || 'your AI CLI'} to balance technical excellence with business requirements`
        };
      default:
        return {
          focus: "Focus on learning professional AI development workflows",
          outcome: `You'll build a real project that showcases your growing AI development skills`,
          cliTip: `Use your AI CLI to learn industry-standard development practices`
        };
    }
  };

  const characterContext = getCharacterContext(levelId);

  // Get character-specific instructions
  const getCharacterInstructions = (levelId: number, baseInstructions: string[]) => {
    switch(character) {
      case 1: // Business Builder
        if (levelId === 1) {
          return [
            "Ask AI: 'Create a landing page for my startup idea with a compelling headline'",
            "Request: 'Add a problem statement that speaks to my target customers'",
            "Tell AI: 'Include a solution overview and benefits section'",
            "Ask: 'Add a simple email signup form to capture leads'",
            "Deploy: 'Make it mobile-friendly and add a call-to-action button'"
          ];
        } else if (levelId === 3) {
          return [
            "Ask AI: 'Set up a project structure for rapid MVP development'",
            "Request: 'Create reusable components that I can iterate on quickly'",
            "Tell AI: 'Add user analytics tracking for business metrics'",
            "Ask: 'Include A/B testing setup for feature validation'",
            "Deploy: 'Set up continuous deployment for fast iteration cycles'"
          ];
        }
        break;
      case 2: // Tech Engineer
        if (levelId === 1) {
          return [
            "Ask AI: 'Create a semantic HTML structure following web standards'",
            "Request: 'Add proper accessibility attributes and ARIA labels'",
            "Tell AI: 'Implement responsive design with mobile-first approach'",
            "Ask: 'Add performance optimizations and SEO best practices'",
            "Review: 'Ensure code follows industry standards and is well-documented'"
          ];
        } else if (levelId === 3) {
          return [
            "Ask AI: 'Set up a scalable project architecture with proper folder structure'",
            "Request: 'Implement error handling and logging throughout the application'",
            "Tell AI: 'Add comprehensive TypeScript types and interfaces'",
            "Ask: 'Set up unit tests and integration testing framework'",
            "Deploy: 'Configure CI/CD pipeline with automated testing and code quality checks'"
          ];
        }
        break;
      case 3: // Full-Stack Hybrid
        if (levelId === 1) {
          return [
            "Ask AI: 'Create a full-stack foundation with frontend and API structure'",
            "Request: 'Add user authentication and session management'",
            "Tell AI: 'Include database integration with user data persistence'",
            "Ask: 'Add admin dashboard for content and user management'",
            "Scale: 'Make it production-ready with monitoring and error tracking'"
          ];
        } else if (levelId === 3) {
          return [
            "Ask AI: 'Build a complete application with frontend, backend, and database'",
            "Request: 'Add real-time features using WebSockets or similar'",
            "Tell AI: 'Implement role-based access control and permissions'",
            "Ask: 'Add API documentation and client SDK generation'",
            "Deploy: 'Set up production infrastructure with load balancing and scaling'"
          ];
        }
        break;
    }
    return baseInstructions; // Fallback to original instructions
  };

  const challenge = challengeData[levelId];
  const characterInstructions = challenge ? getCharacterInstructions(levelId, challenge.instructions) : [];

  useEffect(() => {
    if (challenge) {
      // Use personalized code example if available, otherwise fall back to challenge default
      const codeToUse = personalizedContent.codeExample && personalizedContent.codeExample.trim() !== ''
        ? personalizedContent.codeExample
        : challenge.initialCode;
      setCode(codeToUse);
    }
  }, [challenge, personalizedContent]);

  if (!challenge) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Challenge Not Found</h1>
          <Link href="/journey" className="btn-primary">
            Back to Journey
          </Link>
        </div>
      </div>
    );
  }

  const handleRunCode = () => {
    setShowPreview(true);
    // Validate code when previewing
    const extracted = extractCodeFromHTML(code);
    const validation = validateCode(levelId, code, extracted.css, extracted.js);
    setValidationResult(validation);
  };

  const handleValidateCode = () => {
    const extracted = extractCodeFromHTML(code);
    const validation = validateCode(levelId, code, extracted.css, extracted.js);
    setValidationResult(validation);
    setShowValidation(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleCompleteStep = (stepIndex: number) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex]);
    }
    if (stepIndex < characterInstructions.length - 1) {
      setCurrentStep(stepIndex + 1);
    }
  };

  const handleCompleteChallenge = () => {
    completeLevel(levelId);
  };

  const isCompleted = completedSteps.length === characterInstructions.length;

  return (
    <div className="min-h-screen p-6 text-white pb-32">
      {/* Background mesh */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(45rem_50rem_at_top,rgba(47,201,244,0.2),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(50rem_45rem_at_bottom,rgba(0,199,189,0.15),transparent)]" />
      </div>
      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          className="glass rounded-2xl p-6 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="text-6xl">{challenge.icon}</div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {personalizedContent.title}
                </h1>
                <p className="text-gray-300 text-lg">{personalizedContent.description}</p>

                {/* Character-specific context */}
                <div className="mt-4 mb-2 max-w-2xl">
                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-4 border border-primary/20">
                    <h3 className="text-sm font-semibold text-primary mb-2">Your Path Focus</h3>
                    <p className="text-white/80 text-sm mb-2">{characterContext.focus}</p>
                    <p className="text-white/70 text-xs"><strong>What you'll build:</strong> {characterContext.outcome}</p>
                    <p className="text-blue-300 text-xs mt-2">Tip: {characterContext.cliTip}</p>
                  </div>
                </div>

                {/* Project encouragement */}
                {project && (
                  <div className="mt-2 max-w-2xl">
                    <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-xl p-4 border border-emerald-500/20">
                      <h3 className="text-sm font-semibold text-emerald-300 mb-2">Your Project Journey</h3>
                      <p className="text-white/80 text-sm mb-2">Building: <strong className="text-emerald-300">{project.name}</strong></p>
                      <p className="text-white/70 text-xs mb-2">{project.description}</p>
                      <p className="text-emerald-300 text-xs">{projectEncouragement}</p>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                    {challenge.difficulty}
                  </span>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                    +{challenge.xpReward} XP
                  </span>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                    ~{challenge.estimatedTime}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-center lg:text-right">
              <div className="text-2xl font-bold text-purple-400">
                {completedSteps.length}/{characterInstructions.length}
              </div>
              <div className="text-sm text-gray-400">Steps Complete</div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Instructions Panel */}
          <motion.div
            className="glass rounded-xl p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Target className="w-6 h-6 text-purple-400" />
              Mission Objective
            </h2>
            <p className="text-gray-300 mb-6">{personalizedContent.description}</p>

            {/* Personalized Objectives */}
            {personalizedContent.objectives.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  Learning Objectives
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {personalizedContent.objectives.map((objective, index) => (
                    <div key={index} className="flex items-start gap-2 p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
                      <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{objective}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <h3 className="text-xl font-semibold mb-4">Steps to Complete:</h3>
            <div className="space-y-3">
              {characterInstructions.map((instruction, index) => (
                <motion.div
                  key={index}
                  className={`flex items-start gap-3 p-3 rounded-lg border transition-all ${
                    completedSteps.includes(index)
                      ? 'bg-green-500/10 border-green-400/30'
                      : currentStep === index
                      ? 'bg-blue-500/10 border-blue-400/30'
                      : 'bg-white/5 border-white/10'
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                    completedSteps.includes(index)
                      ? 'bg-green-500'
                      : currentStep === index
                      ? 'bg-blue-500'
                      : 'bg-gray-600'
                  }`}>
                    {completedSteps.includes(index) ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm">{instruction}</p>
                    {currentStep === index && !completedSteps.includes(index) && (
                      <button
                        onClick={() => handleCompleteStep(index)}
                        className="mt-2 px-3 py-1 bg-blue-500 hover:bg-blue-600 rounded text-sm transition-colors"
                      >
                        Mark Complete
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {isCompleted && (
              <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <div className="mb-4">
                  <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-yellow-400">Challenge Complete!</h3>
                  <p className="text-gray-300">You've mastered the AI coding basics!</p>
                </div>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={handleCompleteChallenge}
                    className="btn-primary flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Claim Rewards
                  </button>
                  <Link href="/journey" className="btn-secondary">
                    Next Adventure
                  </Link>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Code Editor Panel */}
          <motion.div
            className="glass rounded-xl p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div>
                <h2 className="text-2xl font-bold">Code Editor</h2>
                <p className="text-sm text-gray-400 mt-1">
                  Paste code OR localhost link from your AI assistant!
                </p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
                <button
                  onClick={() => {
                    const codeToReset = personalizedContent.codeExample && personalizedContent.codeExample.trim() !== ''
                      ? personalizedContent.codeExample
                      : challenge.initialCode;
                    setCode(codeToReset);
                  }}
                  className="btn-secondary btn-sm flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className="btn-secondary btn-sm"
                >
                  {showSolution ? 'Hide' : 'Show'} Solution
                </button>
              </div>
            </div>

            {/* Toggle Tabs */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setViewMode('code')}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold text-sm transition-all ${
                  viewMode === 'code'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-zinc-800/50 text-white/50 hover:text-white/80'
                }`}
              >
                <div className="flex flex-col items-center gap-1">
                  <span className="text-lg"><Clipboard className="w-5 h-5 inline" /></span>
                  <span className="text-xs">Option 1: Paste Code</span>
                </div>
              </button>
              <button
                onClick={() => setViewMode('link')}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold text-sm transition-all ${
                  viewMode === 'link'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-zinc-800/50 text-white/50 hover:text-white/80'
                }`}
              >
                <div className="flex flex-col items-center gap-1">
                  <span className="text-lg"><Info className="w-5 h-5 inline" /></span>
                  <span className="text-xs">Option 2: Use Link</span>
                </div>
              </button>
            </div>

            {/* Code Input Mode */}
            {viewMode === 'code' && (
              <>
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 mb-3">
                  <p className="text-emerald-300 text-xs">
                    <strong>Got HTML code from your AI?</strong> Paste it below to preview AND get quality feedback!
                  </p>
                </div>
                <div className="bg-gray-900 rounded-lg overflow-hidden">
                  <div className="bg-gray-800 px-4 py-2 text-sm text-gray-400 border-b border-gray-700">
                    index.html
                  </div>
                  <textarea
                    value={showSolution ? challenge.solution : code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-80 p-4 bg-gray-900 text-white font-mono text-sm resize-none focus:outline-none"
                    spellCheck={false}
                    readOnly={showSolution}
                  />
                </div>
                <div className="mt-3">
                  <div className="relative group">
                    <button
                      onClick={handleRunCode}
                      disabled={!code}
                      className={`w-full py-2 px-4 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                        code
                          ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                          : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                      }`}
                    >
                      <Play className="w-4 h-4" />
                      Preview & Check Quality
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Link Input Mode */}
            {viewMode === 'link' && (
              <div className="space-y-3">
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                  <p className="text-blue-300 text-xs">
                    <strong>Got a localhost link?</strong> Your AI often creates a server. Paste the link here for instant preview!
                  </p>
                </div>
                <input
                  type="text"
                  value={localUrl}
                  onChange={(e) => setLocalUrl(e.target.value)}
                  placeholder="e.g., http://localhost:3000"
                  className="w-full bg-black/50 text-white font-mono text-sm p-3 rounded-lg border border-zinc-700 focus:border-emerald-500 outline-none"
                />
                <button
                  onClick={() => setShowPreview(true)}
                  disabled={!localUrl}
                  className={`w-full py-2 px-4 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                    localUrl
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                      : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                  }`}
                >
                  <Play className="w-4 h-4" />
                  Load Preview
                </button>
              </div>
            )}

            {/* Hints */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Personalized Tips:</h3>
              <div className="space-y-2">
                {personalizedContent.tips.map((tip, index) => (
                  <div key={index} className="text-sm text-gray-400 bg-white/5 p-2 rounded">
                    {tip}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Preview Modal */}
        <AnimatePresence>
          {showPreview && (
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPreview(false)}
            >
              <motion.div
                className="bg-white rounded-xl overflow-hidden max-w-4xl w-full mx-4 max-h-[80vh] flex flex-col"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-gray-800 text-white px-4 py-2 flex items-center justify-between">
                  <div>
                    <span className="font-medium">Live Preview</span>
                    <span className="text-xs text-gray-400 ml-2">
                      {viewMode === 'code' ? 'Your code running live!' : 'Your localhost app!'} Test everything here.
                    </span>
                  </div>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <span className="text-lg leading-none">&times;</span>
                  </button>
                </div>
                {viewMode === 'code' ? (
                  <iframe
                    srcDoc={code}
                    className="flex-1 w-full border-0"
                    style={{ minHeight: '500px' }}
                    sandbox="allow-scripts"
                  />
                ) : (
                  <iframe
                    src={localUrl}
                    className="flex-1 w-full border-0"
                    style={{ minHeight: '500px' }}
                  />
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Level Navigation */}
      <LevelNavigation currentLevel={levelId} />
    </div>
  );
}
