// Claude Skills Mastery - Track Content
// Learn to create, publish, and use Claude Code Skills

import type { TrackLevel, LevelContent } from '@/lib/types';

export const CLAUDE_SKILLS_TRACK_ID = 'claude-skills';
export const CLAUDE_SKILLS_COLOR = '#EC4899';

export const claudeSkillsLevels: Omit<TrackLevel, 'id' | 'trackId'>[] = [
  // Level 1: What are Skills?
  {
    levelNumber: 1,
    title: 'What are Skills?',
    description: 'Introduction to the Claude Code Skills system and what you can build',
    xpReward: 150,
    estimatedMinutes: 15,
    isFree: true,
    requiresVerification: false,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'cs1-1',
          type: 'text',
          title: 'Understanding Skills',
          content: `<p>Skills are reusable instruction sets that extend Claude Code's capabilities. Think of them as teaching Claude new tricks that can be invoked on demand:</p>
<ul>
  <li><strong>Custom commands</strong> - Create your own slash commands like /deploy or /review</li>
  <li><strong>Specialized workflows</strong> - Automate multi-step processes</li>
  <li><strong>Domain expertise</strong> - Give Claude deep knowledge about specific tools or frameworks</li>
  <li><strong>Team standards</strong> - Encode your team's best practices and conventions</li>
</ul>`
        },
        {
          id: 'cs1-2',
          type: 'text',
          title: 'How Skills Work',
          content: `<p>When you invoke a skill, Claude Code:</p>
<ol>
  <li>Loads the SKILL.md file containing instructions</li>
  <li>Injects the skill's context into the conversation</li>
  <li>Follows the skill's defined workflow</li>
  <li>Uses any templates or patterns specified</li>
</ol>
<p>Skills are written in Markdown, making them easy to read, write, and share.</p>`
        },
        {
          id: 'cs1-3',
          type: 'code',
          title: 'A Simple Skill Example',
          language: 'markdown',
          content: `# Code Review Skill

## Description
Perform a thorough code review following team standards.

## Commands
- \`/review\` - Review staged changes
- \`/review [file]\` - Review a specific file

## Instructions
When reviewing code:
1. Check for security vulnerabilities
2. Verify error handling is complete
3. Ensure tests cover new functionality
4. Look for performance issues
5. Suggest improvements`
        },
        {
          id: 'cs1-4',
          type: 'tip',
          title: 'Skills vs Hooks',
          content: 'Skills are invoked manually with commands and provide guided workflows. Hooks run automatically at specific events (like after a file edit). Use skills for complex, multi-step tasks; use hooks for automatic formatting and validation.'
        },
        {
          id: 'cs1-5',
          type: 'text',
          title: 'Where Skills Live',
          content: `<p>Skills can be stored in several locations:</p>
<ul>
  <li><strong>Project skills</strong> - <code>.claude/skills/</code> directory in your project</li>
  <li><strong>Global skills</strong> - <code>~/.claude/skills/</code> for personal skills</li>
  <li><strong>Marketplace skills</strong> - Downloaded from the Skills Marketplace</li>
  <li><strong>Inline skills</strong> - Defined directly in settings.json</li>
</ul>`
        },
        {
          id: 'cs1-6',
          type: 'code',
          title: 'Listing Available Skills',
          language: 'text',
          content: `# In Claude Code, list all available skills
> /help

Available Skills:
  /commit     - Generate commit messages (built-in)
  /review     - Code review with team standards
  /test       - Generate tests for code (built-in)
  /deploy     - Deploy to staging environment
  /docs       - Generate documentation (built-in)

# Get help for a specific skill
> /review --help`
        }
      ]
    } as LevelContent
  },

  // Level 2: SKILL.md Structure
  {
    levelNumber: 2,
    title: 'SKILL.md Structure',
    description: 'Understand the anatomy of a skill file and all available sections',
    xpReward: 150,
    estimatedMinutes: 20,
    isFree: true,
    requiresVerification: true,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'cs2-1',
          type: 'text',
          title: 'Skill File Anatomy',
          content: `<p>A SKILL.md file consists of several key sections:</p>
<ul>
  <li><strong>Title (H1)</strong> - The skill name</li>
  <li><strong>Description</strong> - Brief explanation of purpose</li>
  <li><strong>Commands</strong> - Slash commands to invoke the skill</li>
  <li><strong>Instructions</strong> - Step-by-step guidance for Claude</li>
  <li><strong>Context</strong> - Background information needed</li>
  <li><strong>Templates</strong> - Code snippets and patterns</li>
  <li><strong>Rules</strong> - Constraints and guardrails</li>
  <li><strong>Examples</strong> - Sample interactions</li>
</ul>`
        },
        {
          id: 'cs2-2',
          type: 'code',
          title: 'Complete SKILL.md Template',
          language: 'markdown',
          content: `# Skill Name

## Description
A clear, concise description of what this skill does and when to use it.

## Commands
- \`/command\` - Main command description
- \`/command [arg]\` - Command with argument
- \`/command --flag\` - Command with option

## Context
Background information Claude needs to understand:
- Technology stack details
- Project-specific conventions
- External dependencies

## Instructions
Step-by-step process Claude should follow:
1. First, understand the user's request
2. Gather necessary context
3. Execute the main task
4. Verify the results
5. Report completion

## Rules
- ALWAYS do this
- NEVER do that
- Prefer X over Y

## Templates
### Template Name
\`\`\`typescript
// Code template here
\`\`\`

## Examples
User: /command create widget
Assistant: I'll create a new widget component...`
        },
        {
          id: 'cs2-3',
          type: 'text',
          title: 'The Description Section',
          content: `<p>The description helps Claude (and users) understand when to use the skill:</p>
<ul>
  <li>Keep it to 1-2 sentences</li>
  <li>Focus on the outcome, not the process</li>
  <li>Mention key use cases</li>
</ul>
<p>Good: "Generate type-safe API clients from OpenAPI specs with full error handling."</p>
<p>Bad: "This skill generates code."</p>`
        },
        {
          id: 'cs2-4',
          type: 'code',
          title: 'Commands Section Deep Dive',
          language: 'markdown',
          content: `## Commands
- \`/api\` - Show API skill help
- \`/api create [resource]\` - Create CRUD endpoints
- \`/api route [method] [path]\` - Create single endpoint
- \`/api doc\` - Generate API documentation
- \`/api test [endpoint]\` - Generate endpoint tests

### Arguments
- \`[resource]\` - Name of the resource (e.g., "user", "product")
- \`[method]\` - HTTP method (GET, POST, PUT, DELETE)
- \`[path]\` - URL path for the endpoint

### Flags
- \`--no-validation\` - Skip input validation generation
- \`--auth\` - Include authentication middleware
- \`--dry-run\` - Preview without creating files`
        },
        {
          id: 'cs2-5',
          type: 'tip',
          title: 'Effective Instructions',
          content: 'Write instructions as if explaining to a capable developer who is new to your project. Be specific about what to do, but flexible about how. Include the "why" behind important steps.'
        },
        {
          id: 'cs2-6',
          type: 'code',
          title: 'Rules Section Examples',
          language: 'markdown',
          content: `## Rules

### Security Rules
- NEVER hardcode secrets or API keys
- ALWAYS validate user input before processing
- Use parameterized queries for database operations

### Code Quality Rules
- Prefer composition over inheritance
- Keep functions under 30 lines
- Every public function needs JSDoc comments

### Project-Specific Rules
- Use the existing error handling pattern from src/lib/errors.ts
- All API responses must follow the ResponseDTO interface
- Log all errors using the Winston logger, not console.log`
        },
        {
          id: 'cs2-7',
          type: 'text',
          title: 'Templates for Consistency',
          content: `<p>Templates ensure Claude generates consistent code:</p>
<ul>
  <li>Include your project's standard patterns</li>
  <li>Add placeholders with clear naming (e.g., <code>{{componentName}}</code>)</li>
  <li>Show imports and exports</li>
  <li>Include TypeScript types</li>
</ul>`
        }
      ],
      exercise: {
        type: 'prompt',
        instructions: 'Describe the purpose of each major section in a SKILL.md file and explain when you would use the Rules section versus the Instructions section.',
        hints: [
          'Rules are constraints that must always be followed',
          'Instructions are step-by-step processes',
          'Think about what goes wrong without each section'
        ],
        validationCriteria: [
          'Explains the difference between Rules and Instructions',
          'Identifies when to use each section',
          'Shows understanding of skill structure'
        ]
      }
    } as LevelContent
  },

  // Level 3: Creating Your First Skill
  {
    levelNumber: 3,
    title: 'Creating Your First Skill',
    description: 'Build a complete skill from scratch with hands-on practice',
    xpReward: 200,
    estimatedMinutes: 25,
    isFree: false,
    requiresVerification: true,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'cs3-1',
          type: 'text',
          title: 'Skill Development Process',
          content: `<p>Creating an effective skill follows these steps:</p>
<ol>
  <li><strong>Identify the need</strong> - What repetitive task can be automated?</li>
  <li><strong>Define the scope</strong> - What should the skill do (and not do)?</li>
  <li><strong>Design commands</strong> - How will users invoke it?</li>
  <li><strong>Write instructions</strong> - How should Claude execute it?</li>
  <li><strong>Add templates</strong> - What code patterns should be used?</li>
  <li><strong>Test and refine</strong> - Does it work as expected?</li>
</ol>`
        },
        {
          id: 'cs3-2',
          type: 'text',
          title: 'Example: Component Generator Skill',
          content: `<p>Let's build a skill that generates React components with tests and stories. This skill should:</p>
<ul>
  <li>Create a component file with proper TypeScript types</li>
  <li>Generate a test file with common test cases</li>
  <li>Create a Storybook story file</li>
  <li>Follow consistent naming and file structure</li>
</ul>`
        },
        {
          id: 'cs3-3',
          type: 'code',
          title: 'Step 1: Create the Skill File',
          language: 'bash',
          content: `# Create the skills directory if it doesn't exist
mkdir -p .claude/skills

# Create the skill file
touch .claude/skills/component-generator.md`
        },
        {
          id: 'cs3-4',
          type: 'code',
          title: 'Step 2: Write the Skill Content',
          language: 'markdown',
          content: `# React Component Generator

## Description
Generate React components with TypeScript, unit tests, and Storybook stories following project conventions.

## Commands
- \`/component [name]\` - Create a new component with all files
- \`/component [name] --no-story\` - Skip Storybook story
- \`/component [name] --no-test\` - Skip test file

## Context
This project uses:
- React 18 with functional components
- TypeScript for type safety
- Jest and React Testing Library for tests
- Storybook 7 for component documentation
- CSS Modules for styling

## Instructions
When generating a component:

1. **Validate the name**: Ensure it's PascalCase
2. **Create the directory**: \`src/components/[Name]/\`
3. **Generate the component file**: Include props interface and JSDoc
4. **Generate the test file**: Include render test and key interactions
5. **Generate the story file**: Include default story and variants
6. **Create the index file**: Export the component

## Rules
- Component names MUST be PascalCase
- All props MUST have TypeScript types
- Test files MUST include at least a render test
- Stories MUST have a default export
- NEVER generate inline styles

## Templates

### Component Template
\`\`\`tsx
import React from 'react';
import styles from './{{Name}}.module.css';

export interface {{Name}}Props {
  /** Description of the prop */
  children?: React.ReactNode;
}

/**
 * {{Name}} component description
 */
export const {{Name}}: React.FC<{{Name}}Props> = ({ children }) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
};
\`\`\`

### Test Template
\`\`\`tsx
import { render, screen } from '@testing-library/react';
import { {{Name}} } from './{{Name}}';

describe('{{Name}}', () => {
  it('renders without crashing', () => {
    render(<{{Name}} />);
  });

  it('renders children correctly', () => {
    render(<{{Name}}>Test Content</{{Name}}>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
\`\`\`

### Story Template
\`\`\`tsx
import type { Meta, StoryObj } from '@storybook/react';
import { {{Name}} } from './{{Name}}';

const meta: Meta<typeof {{Name}}> = {
  title: 'Components/{{Name}}',
  component: {{Name}},
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof {{Name}}>;

export const Default: Story = {
  args: {
    children: 'Default content',
  },
};
\`\`\`

## Examples
User: /component UserAvatar
Assistant: I'll create the UserAvatar component with all supporting files.

Creating:
- src/components/UserAvatar/UserAvatar.tsx
- src/components/UserAvatar/UserAvatar.test.tsx
- src/components/UserAvatar/UserAvatar.stories.tsx
- src/components/UserAvatar/UserAvatar.module.css
- src/components/UserAvatar/index.ts`
        },
        {
          id: 'cs3-5',
          type: 'tip',
          title: 'Testing Your Skill',
          content: 'After creating the skill, test it with various inputs: simple names, compound names (UserProfileCard), edge cases (lowercase, numbers). Refine the instructions based on what Claude does correctly or incorrectly.'
        },
        {
          id: 'cs3-6',
          type: 'code',
          title: 'Step 3: Test the Skill',
          language: 'text',
          content: `# Reload skills in Claude Code
> /help

# Test the skill with different inputs
> /component Button

# Test with flags
> /component Modal --no-story

# Test edge cases
> /component userCard   # Should warn about casing`
        },
        {
          id: 'cs3-7',
          type: 'text',
          title: 'Iterating on Your Skill',
          content: `<p>After testing, you might need to:</p>
<ul>
  <li>Add more specific rules for edge cases</li>
  <li>Include additional templates for variants</li>
  <li>Clarify instructions that led to unexpected behavior</li>
  <li>Add examples for complex scenarios</li>
</ul>`
        }
      ],
      exercise: {
        type: 'code',
        instructions: 'Create a SKILL.md file for a "Database Migration" skill that generates migration files with up/down functions, timestamps, and safety checks.',
        starterCode: `# Database Migration Generator

## Description
<!-- What does this skill do? -->

## Commands
<!-- Define at least 2 commands -->

## Context
<!-- What database/ORM is used? -->

## Instructions
<!-- Step-by-step process -->

## Rules
<!-- Safety constraints -->

## Templates
<!-- Migration file template -->`,
        hints: [
          'Include commands for create, status, and rollback',
          'Add rules about data safety and backups',
          'Include a template with up() and down() functions',
          'Consider dry-run options for safety'
        ],
        validationCriteria: [
          'Has clear description',
          'Defines at least 2 commands',
          'Includes migration-specific rules',
          'Has a migration file template with up/down functions'
        ]
      }
    } as LevelContent
  },

  // Level 4: Publishing to Marketplace
  {
    levelNumber: 4,
    title: 'Publishing to Marketplace',
    description: 'Share your skills with the community and discover others',
    xpReward: 250,
    estimatedMinutes: 25,
    isFree: false,
    requiresVerification: true,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'cs4-1',
          type: 'text',
          title: 'The Skills Marketplace',
          content: `<p>The Claude Code Skills Marketplace is where developers share and discover skills:</p>
<ul>
  <li><strong>Browse skills</strong> - Find skills for your tech stack</li>
  <li><strong>Install with one command</strong> - Easy skill installation</li>
  <li><strong>Rate and review</strong> - Help others find quality skills</li>
  <li><strong>Publish your own</strong> - Share your expertise</li>
</ul>`
        },
        {
          id: 'cs4-2',
          type: 'code',
          title: 'Browsing and Installing Skills',
          language: 'bash',
          content: `# Search the marketplace
claude skills search "react component"

# View skill details
claude skills info @username/react-component-generator

# Install a skill globally
claude skills install @username/react-component-generator

# Install for current project only
claude skills install @username/react-component-generator --local

# List installed skills
claude skills list`
        },
        {
          id: 'cs4-3',
          type: 'text',
          title: 'Preparing for Publication',
          content: `<p>Before publishing, ensure your skill meets these criteria:</p>
<ul>
  <li><strong>Complete documentation</strong> - All sections filled out</li>
  <li><strong>Clear examples</strong> - Show real usage scenarios</li>
  <li><strong>Tested thoroughly</strong> - Works across different inputs</li>
  <li><strong>No sensitive data</strong> - Remove any project-specific secrets</li>
  <li><strong>Proper licensing</strong> - Specify how others can use it</li>
</ul>`
        },
        {
          id: 'cs4-4',
          type: 'code',
          title: 'Creating a Skill Package',
          language: 'markdown',
          content: `# Your skill needs a skill.json file for the marketplace:

\`\`\`json
{
  "name": "react-component-generator",
  "version": "1.0.0",
  "description": "Generate React components with TypeScript, tests, and Storybook stories",
  "author": "yourname",
  "license": "MIT",
  "keywords": ["react", "typescript", "component", "storybook", "testing"],
  "repository": "https://github.com/yourname/skill-react-component",
  "compatibility": {
    "claudeCode": ">=1.0.0"
  },
  "files": [
    "SKILL.md",
    "README.md"
  ]
}
\`\`\``
        },
        {
          id: 'cs4-5',
          type: 'code',
          title: 'Publishing Your Skill',
          language: 'bash',
          content: `# Authenticate with the marketplace
claude skills login

# Validate your skill package
claude skills validate

# Publish to the marketplace
claude skills publish

# Update an existing skill
claude skills publish --update

# Unpublish if needed
claude skills unpublish @yourname/skill-name`
        },
        {
          id: 'cs4-6',
          type: 'tip',
          title: 'Marketplace Best Practices',
          content: 'Use semantic versioning (1.0.0, 1.1.0, 2.0.0). Write a compelling README with screenshots or GIFs. Respond to user feedback and issues. Keep your skill updated as Claude Code evolves.'
        },
        {
          id: 'cs4-7',
          type: 'text',
          title: 'Creating a README',
          content: `<p>Your skill's README should include:</p>
<ul>
  <li><strong>Overview</strong> - What problem does it solve?</li>
  <li><strong>Installation</strong> - How to install</li>
  <li><strong>Quick start</strong> - Get running in 30 seconds</li>
  <li><strong>Commands reference</strong> - All available commands</li>
  <li><strong>Configuration</strong> - Customization options</li>
  <li><strong>Examples</strong> - Real-world usage</li>
  <li><strong>Contributing</strong> - How to help improve it</li>
</ul>`
        },
        {
          id: 'cs4-8',
          type: 'code',
          title: 'Example README',
          language: 'markdown',
          content: `# React Component Generator

Generate production-ready React components with TypeScript,
unit tests, and Storybook stories in seconds.

## Installation

\`\`\`bash
claude skills install @yourname/react-component-generator
\`\`\`

## Quick Start

\`\`\`bash
# Generate a complete component
/component Button

# Creates:
# - src/components/Button/Button.tsx
# - src/components/Button/Button.test.tsx
# - src/components/Button/Button.stories.tsx
# - src/components/Button/index.ts
\`\`\`

## Commands

| Command | Description |
|---------|-------------|
| \`/component [name]\` | Create component with all files |
| \`/component [name] --no-test\` | Skip test file |
| \`/component [name] --no-story\` | Skip Storybook story |

## License

MIT`
        }
      ],
      exercise: {
        type: 'code',
        instructions: 'Create a skill.json file and README outline for a skill you would want to publish. Include proper metadata, keywords, and all required sections.',
        starterCode: `// skill.json
{
  "name": "",
  "version": "",
  "description": "",
  "author": "",
  "license": "",
  "keywords": [],
  "repository": "",
  "compatibility": {
    "claudeCode": ">=1.0.0"
  }
}

// README.md outline (describe what each section would contain)`,
        hints: [
          'Choose a skill idea that solves a real problem you have',
          'Use descriptive keywords that help people find your skill',
          'Include installation and quick start in the README',
          'Think about what makes a skill trustworthy'
        ],
        validationCriteria: [
          'skill.json has all required fields',
          'Keywords are relevant and searchable',
          'README outline covers installation and usage',
          'Version follows semantic versioning'
        ]
      }
    } as LevelContent
  },

  // Level 5: Advanced Skill Patterns
  {
    levelNumber: 5,
    title: 'Advanced Skill Patterns',
    description: 'Master complex multi-step skills, integrations, and dynamic behavior',
    xpReward: 300,
    estimatedMinutes: 35,
    isFree: false,
    requiresVerification: true,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'cs5-1',
          type: 'text',
          title: 'Advanced Skill Capabilities',
          content: `<p>Beyond basic skills, you can build sophisticated tools that:</p>
<ul>
  <li><strong>Multi-step workflows</strong> - Chain complex operations together</li>
  <li><strong>External integrations</strong> - Connect to APIs and services</li>
  <li><strong>Dynamic behavior</strong> - Adapt based on project context</li>
  <li><strong>State management</strong> - Track progress across invocations</li>
  <li><strong>Composition</strong> - Build skills that use other skills</li>
</ul>`
        },
        {
          id: 'cs5-2',
          type: 'code',
          title: 'Multi-Step Workflow Skill',
          language: 'markdown',
          content: `# Feature Development Workflow

## Description
Guide the complete feature development process from specification to deployment.

## Commands
- \`/feature start [name]\` - Begin a new feature
- \`/feature status\` - Check current feature progress
- \`/feature complete\` - Finalize and prepare for merge

## Workflow Stages

### Stage 1: Planning
- Create feature branch from main
- Generate specification document
- Identify affected components
- Estimate effort

### Stage 2: Implementation
- Create necessary files and components
- Implement core functionality
- Add error handling
- Write inline documentation

### Stage 3: Testing
- Generate unit tests
- Create integration tests
- Run existing test suite
- Fix any failures

### Stage 4: Review Preparation
- Run linting and formatting
- Generate PR description
- Create changelog entry
- Verify all checks pass

## State Tracking
Track progress in \`.claude/feature-state.json\`:
\`\`\`json
{
  "currentFeature": "user-authentication",
  "branch": "feature/user-authentication",
  "stage": "implementation",
  "completedSteps": ["planning", "branch-created"],
  "pendingSteps": ["tests", "review"]
}
\`\`\`

## Instructions
When /feature start [name] is invoked:

1. Check for existing in-progress features
2. Create and checkout feature branch
3. Initialize state tracking file
4. Generate feature specification template
5. Analyze codebase for affected areas
6. Present implementation plan to user
7. Wait for user approval before proceeding

When /feature status is invoked:
1. Read current state from tracking file
2. Summarize completed and pending steps
3. Show any blockers or issues
4. Suggest next actions

When /feature complete is invoked:
1. Run all tests and verify passing
2. Run linting and fix issues
3. Generate comprehensive PR description
4. Update changelog
5. Present checklist for manual review`
        },
        {
          id: 'cs5-3',
          type: 'text',
          title: 'Skills with External Integrations',
          content: `<p>Skills can guide Claude to interact with external services:</p>
<ul>
  <li><strong>API calls</strong> - Fetch data from REST APIs</li>
  <li><strong>CLI tools</strong> - Run external command-line tools</li>
  <li><strong>File systems</strong> - Read configuration from various sources</li>
  <li><strong>MCP servers</strong> - Connect to Model Context Protocol servers</li>
</ul>`
        },
        {
          id: 'cs5-4',
          type: 'code',
          title: 'API Integration Skill',
          language: 'markdown',
          content: `# GitHub Issue Manager

## Description
Create, update, and manage GitHub issues directly from Claude Code.

## Commands
- \`/issue create [title]\` - Create a new issue
- \`/issue list\` - List open issues
- \`/issue close [number]\` - Close an issue

## Prerequisites
- GitHub CLI (gh) must be installed and authenticated
- Repository must be a GitHub repository

## Instructions

### For /issue create [title]:
1. Verify gh CLI is available: \`which gh\`
2. Check authentication: \`gh auth status\`
3. Gather issue details from user:
   - Title (required)
   - Description (prompt user)
   - Labels (suggest based on content)
   - Assignees (offer options)
4. Create issue using: \`gh issue create --title "..." --body "..." --label "..."\`
5. Return the issue URL

### For /issue list:
1. Run: \`gh issue list --state open --json number,title,labels,assignees\`
2. Format output as readable table
3. Group by label if more than 5 issues

### For /issue close [number]:
1. Confirm with user before closing
2. Run: \`gh issue close [number]\`
3. Optionally add closing comment

## Error Handling
- If gh not installed: Provide installation instructions
- If not authenticated: Guide through \`gh auth login\`
- If not a GitHub repo: Explain the requirement
- If issue not found: List similar issues

## Security Rules
- NEVER include tokens or credentials in commands
- Use gh CLI's built-in authentication
- Confirm destructive actions with user`
        },
        {
          id: 'cs5-5',
          type: 'tip',
          title: 'MCP Server Integration',
          content: 'For advanced integrations, skills can work with MCP (Model Context Protocol) servers. This allows Claude to access databases, external APIs, and other services securely through configured MCP connections.'
        },
        {
          id: 'cs5-6',
          type: 'code',
          title: 'Dynamic Context-Aware Skill',
          language: 'markdown',
          content: `# Smart Test Generator

## Description
Generate appropriate tests based on the project's testing framework and patterns.

## Commands
- \`/test [file]\` - Generate tests for a file
- \`/test coverage\` - Find untested code

## Context Detection
Before generating tests, detect the project setup:

### Framework Detection
Check package.json for:
- Jest: "jest" in devDependencies
- Vitest: "vitest" in devDependencies
- Mocha: "mocha" in devDependencies
- Testing Library: "@testing-library/*" packages

### Pattern Detection
Analyze existing test files to learn:
- File naming convention: *.test.ts, *.spec.ts, __tests__/*
- Import patterns: relative vs absolute
- Mocking approach: jest.mock, vi.mock, sinon
- Assertion style: expect, assert, should

## Instructions
1. Detect testing framework from package.json
2. Find existing test files and analyze patterns
3. Read the target file to understand what to test
4. Generate tests matching discovered patterns
5. Include edge cases and error scenarios
6. Use the same mocking approach as existing tests

## Adaptive Templates

### If Jest detected:
\`\`\`typescript
import { functionName } from '../path';

describe('functionName', () => {
  it('should...', () => {
    expect(functionName()).toBe(expected);
  });
});
\`\`\`

### If Vitest detected:
\`\`\`typescript
import { describe, it, expect } from 'vitest';
import { functionName } from '../path';

describe('functionName', () => {
  it('should...', () => {
    expect(functionName()).toBe(expected);
  });
});
\`\`\`

## Rules
- ALWAYS match existing test patterns in the project
- NEVER assume a framework - always detect first
- Include both happy path and error cases
- Mock external dependencies appropriately`
        },
        {
          id: 'cs5-7',
          type: 'text',
          title: 'Skill Composition',
          content: `<p>Advanced skills can reference and build upon other skills:</p>
<ul>
  <li><strong>Delegation</strong> - Call another skill for specific tasks</li>
  <li><strong>Extension</strong> - Add functionality to existing skills</li>
  <li><strong>Orchestration</strong> - Coordinate multiple skills in sequence</li>
</ul>`
        },
        {
          id: 'cs5-8',
          type: 'code',
          title: 'Skill Composition Example',
          language: 'markdown',
          content: `# Full Stack Feature Generator

## Description
Generate complete full-stack features including API, database, and UI.

## Commands
- \`/fullstack [feature]\` - Generate complete feature

## Composed Skills
This skill orchestrates:
- /api for backend endpoints
- /component for React components
- /migrate for database changes
- /test for generating tests

## Instructions

When generating a full-stack feature:

### Step 1: Database Layer
Invoke the migration skill mentally:
- Design the data model
- Create migration with proper relationships
- Generate Prisma/TypeORM entity

### Step 2: API Layer
Invoke the API skill pattern:
- Create CRUD endpoints
- Add validation schemas
- Include authentication checks

### Step 3: UI Layer
Invoke the component skill pattern:
- Create list/detail/form components
- Wire up API calls
- Add loading and error states

### Step 4: Integration
- Connect all layers
- Generate end-to-end tests
- Update routing configuration

## Coordination Rules
- Complete each layer before moving to next
- Verify types align across layers
- Test each layer independently
- Document API contracts between layers`
        }
      ],
      exercise: {
        type: 'code',
        instructions: 'Design an advanced skill that performs a multi-step workflow with external integration. Include state tracking, error handling, and at least 3 workflow stages.',
        starterCode: `# [Your Advanced Skill Name]

## Description
<!-- Describe the complex workflow this skill handles -->

## Commands
<!-- Define commands for each stage -->

## Workflow Stages
<!-- Detail at least 3 stages -->

### Stage 1:
<!-- What happens in this stage? -->

### Stage 2:
<!-- What happens in this stage? -->

### Stage 3:
<!-- What happens in this stage? -->

## State Tracking
<!-- How does the skill track progress? -->

## External Integration
<!-- What external tools/APIs does it use? -->

## Error Handling
<!-- How are errors handled at each stage? -->

## Instructions
<!-- Detailed instructions for each command -->`,
        hints: [
          'Think about a real workflow you do repeatedly',
          'Consider what state needs to persist between steps',
          'Plan for failures at each stage',
          'Include rollback or recovery options'
        ],
        validationCriteria: [
          'Has at least 3 distinct workflow stages',
          'Includes state tracking mechanism',
          'Defines external integration clearly',
          'Has comprehensive error handling',
          'Instructions are detailed for each stage'
        ]
      }
    } as LevelContent
  }
];
