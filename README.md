# Claude Quest - Master Claude AI in 10 Fun Levels

Transform from beginner to Claude expert through gamified learning. Unlock skills, earn achievements, and get real results — one level at a time.

## 🎯 Overview

Claude Quest is a gamified learning platform that helps users get the most out of Claude AI through:
- Level-by-level skill progression
- Master Claude Artifacts for interactive content creation
- Learn Claude Projects for organized workflows
- Understanding Model Context Protocol (MCP)
- Interactive challenges and achievements
- Practical, real-world applications
- Personalized learning paths
- Gamified experience with XP and rewards

## 🚀 Features

### Learning Paths
Choose from 3 specialized learning paths:
- **🎯 Prompt Master**: Master effective prompting to unlock Claude's full potential
- **💼 AI Productivity Pro**: Use Claude to supercharge your productivity and workflows
- **⚡ AI Developer**: Leverage Claude for coding, debugging, and development

### Claude Features Mastery
Learn to use Claude's powerful features:
- **Artifacts**: Create interactive content in a separate window - from documents to React apps
- **Projects**: Organize conversations with custom knowledge and context
- **Model Context Protocol (MCP)**: Integrate Claude Desktop with external tools and data sources
- **Desktop vs Web**: Understand the differences and when to use each
- **Sharing & Publishing**: Share your Artifacts and collaborate with teams
- **Real-world Projects**: Build portfolios, code projects, and professional documents

### 10-Level Curriculum

**Level 0 (FREE)**: Claude Fundamentals
- Getting started with Claude
- Writing effective prompts
- Understanding Claude's capabilities
- First hands-on challenges

**Levels 1-9 (PRO)**:
1. Advanced Prompting Techniques
2. Claude Projects Mastery
3. Claude Artifacts Fundamentals
4. Sharing & Publishing Artifacts
5. Claude Desktop Basics
6. Model Context Protocol (MCP)
7. Web & Desktop Connectors
8. Building with Claude
9. Claude Master - Real-World Projects

## 💰 Monetization

- **Free Tier**: Start your learning journey with Level 0
- **Pro Tier**: $9.99/month - Unlock all 10 levels and exclusive achievements

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.4 with Turbopack
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Effects**: Canvas Confetti
- **State Management**: React Context + Local Storage
- **Authentication**: Supabase (planned)
- **Payments**: Stripe (planned)

## 📦 Installation

```bash
# Navigate to project directory
cd /Users/gabe/claude-quest

# Install dependencies
npm install

# Run development server
npm run dev
```

The app will be available at `http://localhost:3000` (or 3001 if 3000 is in use).

## 🎮 How It Works

### User Flow
1. **Choose Your Path**: Select from Prompt Master, AI Productivity Pro, or AI Developer
2. **Start Free**: Complete Level 0 to learn Claude fundamentals
3. **Track Progress**: View your journey map with all 10 levels and achievements
4. **Level Up**: Unlock Pro to access all levels and earn exclusive achievements

### Progress Tracking
- XP system (100-400 XP per level)
- Achievement badges
- Completion tracking
- Progress persistence via localStorage

### Gamification Elements
- Character-based learning paths
- Step-by-step guided lessons
- Interactive Artifacts challenges
- Hands-on Projects creation
- Confetti celebrations on completion
- Progress visualization
- XP and achievement system
- Share your Artifacts creations

## 📂 Project Structure

```
claude-quest/
├── app/
│   ├── layout.tsx          # Root layout with header/footer
│   ├── page.tsx            # Home page with learning path selection
│   ├── journey/
│   │   └── page.tsx        # Journey map showing all levels
│   └── level/
│       └── 0/
│           └── page.tsx    # Level 0 content (FREE)
├── context/
│   └── ProgressContext.tsx # Global progress state management
├── hooks/
│   └── useLocalStorage.ts  # localStorage persistence hook
├── types/
│   └── index.ts           # TypeScript type definitions
└── components/            # Reusable UI components
```

## 🔐 Monetization Implementation

### Current State
- Level 0 is free and accessible to all users
- Levels 1-9 show as locked for free plan users
- Journey page displays upgrade CTA
- ProgressContext checks plan status before unlocking levels

### To Implement
- [ ] Supabase authentication
- [ ] Stripe checkout integration
- [ ] Subscription management
- [ ] Email notifications
- [ ] Admin dashboard

## 🎨 Design System

### Color Scheme
- **Primary**: Orange to Amber gradient (`from-orange-500 to-amber-500`)
- **Background**: Dark gradient (`from-orange-950 via-amber-950 to-yellow-950`)
- **Accents**: Orange, amber, yellow variations for different elements

### Typography
- **Headings**: Geist Sans
- **Code**: Geist Mono
- **Gradients**: Used for all major headings

### Components
- Glassmorphism cards (`backdrop-blur-sm`)
- Animated transitions with Framer Motion
- Lucide React icons throughout
- Responsive grid layouts

## 🚧 Roadmap

### Phase 1: Foundation ✅
- [x] Project setup
- [x] ProgressContext implementation
- [x] Character selection page
- [x] Level 0 content
- [x] Journey map
- [x] Monetization structure

### Phase 2: Content (In Progress)
- [ ] Create content for Levels 1-9
- [ ] Interactive simulators (Artifacts, Projects, MCP)
- [ ] Practice exercises
- [ ] Achievement system

### Phase 3: Monetization
- [ ] Supabase authentication
- [ ] Stripe integration
- [ ] Payment flow
- [ ] Subscription management

### Phase 4: Advanced Features
- [ ] Progress analytics
- [ ] Community features
- [ ] Certificate generation
- [ ] Artifacts gallery (user-created Artifacts)

## 🎯 Key Differentiators

### What Makes Claude Quest Unique
- **Gamified Learning**: Learn through fun, interactive levels instead of boring tutorials
- **Achievement System**: Earn badges and XP as you master new skills
- **Practical Focus**: Real-world applications you can use immediately
- **Personalized Paths**: Choose the learning journey that fits your goals
- **Progressive Learning**: Master one skill before moving to the next
- **Engaging Experience**: Confetti celebrations, progress tracking, and visual feedback
- **Claude-Specific**: Focus on unique Claude features like Artifacts, Projects, and MCP

## 📝 License

© 2025 OneWave AI. All rights reserved.

## 🤝 Support

For questions or support, contact: gabe@onewave-ai.com

---

**Built with ❤️ by OneWave AI**
