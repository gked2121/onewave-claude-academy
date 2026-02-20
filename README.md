# OneWave Claude Academy

A gamified training platform for mastering the complete Anthropic/Claude ecosystem.

## Overview

OneWave Claude Academy teaches individuals and teams how to use Claude effectively across all tools and interfaces:

- **Claude Chat** - Prompting, context management, Projects, Artifacts
- **Claude Code** - CLI, hooks, skills, IDE integrations
- **MCP Development** - Model Context Protocol, custom connectors
- **Anthropic API** - Authentication, streaming, batch processing, tools
- **Claude Enterprise** - Admin console, SSO, Slack integration
- **Claude Skills** - Automation, SKILL.md, marketplace

## Features

- **6 Learning Tracks** with 50+ interactive lessons
- **AI-Powered Verification** - Submit work and get instant feedback
- **Gamification** - XP, achievements, streaks, leaderboards
- **Certifications** - Associate, Professional, Expert levels
- **Team Management** - Organization dashboards, progress tracking
- **Personalized Paths** - Role-based recommendations based on department and job function

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **React**: 19.x
- **Styling**: Tailwind CSS 4
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth (PKCE)
- **Payments**: Stripe
- **AI**: Anthropic Claude API

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Stripe account (for payments)
- Anthropic API key

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Run database migrations
npm run db:migrate

# Start development server
npm run dev
```

### Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Anthropic
ANTHROPIC_API_KEY=your_anthropic_api_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── (auth)/            # Authentication pages
│   └── (dashboard)/       # Protected dashboard pages
├── components/
│   ├── learning/          # Track, Level, Exercise components
│   ├── onboarding/        # User onboarding flow
│   ├── gamification/      # XP, achievements, leaderboards
│   ├── organization/      # Team management
│   └── ui/                # Reusable UI components
├── content/
│   └── tracks/            # Track curriculum content
├── context/               # React Context providers
├── lib/
│   ├── supabase/          # Supabase client
│   ├── stripe/            # Stripe integration
│   └── types.ts           # TypeScript definitions
└── styles/                # Global styles
```

## Learning Tracks

1. **Claude Chat Fundamentals** (8 levels) - Foundation for all users
2. **Claude Code Mastery** (12 levels) - CLI and development workflows
3. **MCP Development** (10 levels) - Build custom integrations
4. **Anthropic API** (10 levels) - Build AI-powered applications
5. **Claude Enterprise** (8 levels) - Deploy at scale
6. **Claude Skills** (5 levels) - Automation and workflows

## Color Palette

The design uses Claude's official terra cotta (#DA7756) combined with OneWave blue (#2563EB):

- **Claude Terra Cotta**: `#DA7756` - Achievements, XP, celebrations
- **OneWave Blue**: `#2563EB` - Primary actions, navigation
- **Secondary Teal**: `#0891B2` - Accents, highlights
- **Dark Slate**: `#0F172A` - Backgrounds

## Pricing Tiers

| Tier | Price | Features |
|------|-------|----------|
| Free | $0 | 1 track (Claude Chat basics), basic gamification |
| Individual | $29/mo | All 6 tracks, certifications, full gamification |
| Team | $99/mo | Up to 10 seats, team dashboard, analytics |
| Enterprise | Custom | Unlimited seats, SSO, custom content |

## License

Proprietary - OneWave AI. All rights reserved.

## Support

For questions or issues contact support@onewave.ai
