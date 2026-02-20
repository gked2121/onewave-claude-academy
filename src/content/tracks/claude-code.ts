// Claude Code Mastery - Track Content
// CLI installation, hooks, skills, and IDE integrations for developers

import type { TrackLevel, LevelContent } from '@/lib/types';

export const CLAUDE_CODE_TRACK_ID = 'claude-code';
export const CLAUDE_CODE_COLOR = '#2563EB';

export const claudeCodeLevels: Omit<TrackLevel, 'id' | 'trackId'>[] = [
  // Level 1: Introduction & Installation
  {
    levelNumber: 1,
    title: 'Getting Started with Claude Code',
    description: 'Install Claude Code CLI and understand its core capabilities',
    xpReward: 150,
    estimatedMinutes: 15,
    isFree: true,
    requiresVerification: false,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'cc1-1',
          type: 'text',
          title: 'What is Claude Code?',
          content: `<p>Claude Code is Anthropic's official command-line interface for AI-powered development. It brings Claude directly into your terminal, allowing you to:</p>
<ul>
  <li><strong>Edit files</strong> - Claude can read, write, and modify code across your entire project</li>
  <li><strong>Run commands</strong> - Execute terminal commands with AI assistance</li>
  <li><strong>Navigate codebases</strong> - Claude understands project structure and relationships</li>
  <li><strong>Debug issues</strong> - Get AI help troubleshooting errors in context</li>
  <li><strong>Refactor code</strong> - Safely transform code with AI guidance</li>
</ul>`
        },
        {
          id: 'cc1-screenshot-1',
          type: 'image',
          title: 'Claude Code in the Terminal',
          content: 'Claude Code runs directly in your terminal. It can read your project, suggest changes, and execute commands.',
          imageSrc: '/screenshots/claude-code/cli-terminal.svg',
          imageAlt: 'Screenshot of Claude Code CLI running in a terminal with a conversation about refactoring code'
        },
        {
          id: 'cc1-2',
          type: 'code',
          title: 'Installation',
          language: 'bash',
          content: `# Install Claude Code globally with npm
npm install -g @anthropic-ai/claude-code

# Or use npx to run without installing
npx @anthropic-ai/claude-code

# Verify installation
claude --version`
        },
        {
          id: 'cc1-3',
          type: 'tip',
          title: 'Requirements',
          content: 'Claude Code requires Node.js 18+ and works on macOS, Linux, and Windows (via WSL). You\'ll need an Anthropic API key or Claude Pro subscription to use it.'
        },
        {
          id: 'cc1-4',
          type: 'text',
          title: 'Authentication',
          content: `<p>After installation, authenticate with your Anthropic account:</p>
<ol>
  <li>Run <code>claude</code> in your terminal</li>
  <li>A browser window will open for authentication</li>
  <li>Sign in with your Anthropic account or Claude Pro subscription</li>
  <li>Claude Code will automatically configure your credentials</li>
</ol>`
        },
        {
          id: 'cc1-5',
          type: 'code',
          title: 'Your First Claude Code Session',
          language: 'bash',
          content: `# Start Claude Code in your project directory
cd /path/to/your/project
claude

# Claude will analyze your project and start an interactive session
# Try asking: "What does this project do?"`
        }
      ]
    } as LevelContent
  },

  // Level 2: Basic Commands
  {
    levelNumber: 2,
    title: 'Essential Commands',
    description: 'Master the core commands and shortcuts for efficient coding',
    xpReward: 150,
    estimatedMinutes: 15,
    isFree: true,
    requiresVerification: true,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'cc2-1',
          type: 'text',
          title: 'Command Overview',
          content: `<p>Claude Code supports slash commands for common actions:</p>
<ul>
  <li><code>/help</code> - Show available commands</li>
  <li><code>/clear</code> - Clear conversation history</li>
  <li><code>/compact</code> - Summarize and compact context</li>
  <li><code>/cost</code> - Show token usage and costs</li>
  <li><code>/doctor</code> - Check installation health</li>
</ul>`
        },
        {
          id: 'cc2-2',
          type: 'code',
          title: 'File Operations',
          language: 'text',
          content: `# Ask Claude to read a file
> Read the package.json file and summarize the dependencies

# Ask Claude to edit a file
> Add error handling to the login function in auth.ts

# Ask Claude to create a new file
> Create a new React component called UserProfile.tsx`
        },
        {
          id: 'cc2-3',
          type: 'tip',
          title: 'Keyboard Shortcuts',
          content: 'Use Ctrl+C to cancel the current operation, Ctrl+L to clear the screen while keeping history, and Escape to cancel the current input without exiting.'
        },
        {
          id: 'cc2-4',
          type: 'text',
          title: 'Working with Context',
          content: `<p>Claude Code automatically maintains context about:</p>
<ul>
  <li><strong>Current directory</strong> - Understands your project structure</li>
  <li><strong>Recent files</strong> - Remembers files you've discussed</li>
  <li><strong>Conversation history</strong> - Builds on previous messages</li>
  <li><strong>Project type</strong> - Adapts to your tech stack</li>
</ul>`
        },
        {
          id: 'cc2-5',
          type: 'code',
          title: 'Multi-file Operations',
          language: 'text',
          content: `# Update multiple files at once
> Refactor all API endpoints to use async/await instead of callbacks

# Search across the project
> Find all usages of the deprecated "oldFunction"

# Batch changes
> Add TypeScript types to all files in the utils folder`
        }
      ],
      exercise: {
        type: 'prompt',
        instructions: 'Write a prompt asking Claude Code to create a new utility function file with proper TypeScript types. Include what the function should do, the file location, and any specific requirements.',
        hints: [
          'Specify the exact file path where the function should be created',
          'Describe what the function should do and its parameters',
          'Mention TypeScript types and export requirements'
        ],
        validationCriteria: [
          'Includes a specific file path',
          'Describes function behavior clearly',
          'Mentions TypeScript types'
        ]
      }
    } as LevelContent
  },

  // Level 3: File Operations Deep Dive
  {
    levelNumber: 3,
    title: 'Mastering File Operations',
    description: 'Learn advanced file reading, writing, and editing techniques',
    xpReward: 200,
    estimatedMinutes: 20,
    isFree: false,
    requiresVerification: true,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'cc3-1',
          type: 'text',
          title: 'How Claude Code Handles Files',
          content: `<p>Claude Code has powerful file manipulation capabilities:</p>
<ul>
  <li><strong>Read</strong> - View file contents with syntax highlighting</li>
  <li><strong>Write</strong> - Create new files from scratch</li>
  <li><strong>Edit</strong> - Make targeted changes to existing files</li>
  <li><strong>Move/Rename</strong> - Reorganize files and update imports</li>
  <li><strong>Delete</strong> - Remove files with confirmation</li>
</ul>`
        },
        {
          id: 'cc3-2',
          type: 'code',
          title: 'Safe Editing Pattern',
          language: 'text',
          content: `# Claude shows you changes before applying
> Update the database connection string in config.ts

Claude: I'll update the connection string. Here's the change:

- const DB_URL = "postgres://localhost:5432/dev"
+ const DB_URL = process.env.DATABASE_URL || "postgres://localhost:5432/dev"

Apply this change? [Y/n]`
        },
        {
          id: 'cc3-3',
          type: 'warning',
          title: 'Safety Features',
          content: 'Claude Code always shows diffs before applying changes and asks for confirmation. You can configure auto-accept for trusted operations, but review is enabled by default for safety.'
        },
        {
          id: 'cc3-4',
          type: 'text',
          title: 'Glob Patterns',
          content: `<p>Use glob patterns to work with multiple files:</p>
<ul>
  <li><code>*.ts</code> - All TypeScript files in current directory</li>
  <li><code>**/*.test.ts</code> - All test files recursively</li>
  <li><code>src/components/**</code> - Everything in components folder</li>
  <li><code>!node_modules/**</code> - Exclude node_modules</li>
</ul>`
        },
        {
          id: 'cc3-5',
          type: 'code',
          title: 'Bulk Operations Example',
          language: 'text',
          content: `# Add license headers to all source files
> Add the MIT license header to all .ts files in src/

# Update imports across files
> Rename "OldComponent" to "NewComponent" and update all imports

# Add common patterns
> Add error boundaries to all page components in src/pages/`
        }
      ],
      exercise: {
        type: 'prompt',
        instructions: 'Write a prompt asking Claude Code to refactor a set of files. Include: the file pattern, what changes to make, and any constraints (like preserving existing functionality).',
        hints: [
          'Use glob patterns to specify which files to change',
          'Be specific about what refactoring means for your code',
          'Mention any tests or functionality that must be preserved'
        ],
        validationCriteria: [
          'Uses file patterns or specifies files',
          'Clear refactoring instructions',
          'Mentions constraints or preservation requirements'
        ]
      }
    } as LevelContent
  },

  // Level 4: Working with Git
  {
    levelNumber: 4,
    title: 'Git Integration',
    description: 'Use Claude Code for commits, diffs, and version control workflows',
    xpReward: 200,
    estimatedMinutes: 20,
    isFree: false,
    requiresVerification: true,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'cc4-1',
          type: 'text',
          title: 'Git-Aware Development',
          content: `<p>Claude Code integrates seamlessly with Git:</p>
<ul>
  <li><strong>Commit messages</strong> - Generate meaningful commit messages</li>
  <li><strong>Diff analysis</strong> - Understand changes in context</li>
  <li><strong>Branch management</strong> - Help with merges and conflicts</li>
  <li><strong>PR preparation</strong> - Create pull request descriptions</li>
</ul>`
        },
        {
          id: 'cc4-2',
          type: 'code',
          title: 'Smart Commits',
          language: 'text',
          content: `# Generate commit message based on changes
> /commit

Claude analyzes staged changes and suggests:
"feat(auth): add password reset functionality

- Add forgot password endpoint
- Create email template for reset link
- Add rate limiting for reset requests"

Use this commit message? [Y/n/edit]`
        },
        {
          id: 'cc4-3',
          type: 'tip',
          title: 'Conventional Commits',
          content: 'Claude Code follows the Conventional Commits specification by default (feat, fix, docs, style, refactor, test, chore). You can customize this in your project settings.'
        },
        {
          id: 'cc4-4',
          type: 'code',
          title: 'PR Workflow',
          language: 'text',
          content: `# Create a pull request with description
> Create a PR for these changes to the main branch

Claude generates:
- Title summarizing the changes
- Description with context
- Test plan
- Screenshots (if UI changes detected)
- Breaking changes notes`
        },
        {
          id: 'cc4-5',
          type: 'text',
          title: 'Conflict Resolution',
          content: `<p>When you encounter merge conflicts, Claude can help:</p>
<ol>
  <li>Analyze both versions of the conflicting code</li>
  <li>Understand the intent behind each change</li>
  <li>Suggest the best resolution</li>
  <li>Apply the fix and verify it works</li>
</ol>`
        }
      ],
      exercise: {
        type: 'prompt',
        instructions: 'Write a prompt asking Claude Code to help you prepare a pull request. Include what changes were made, any context reviewers need, and specific sections you want in the PR description.',
        hints: [
          'Mention the key changes and their purpose',
          'Include any testing that was done',
          'Specify if there are breaking changes or migration steps'
        ],
        validationCriteria: [
          'Describes the changes being merged',
          'Provides context for reviewers',
          'Includes relevant sections (testing, breaking changes, etc.)'
        ]
      }
    } as LevelContent
  },

  // Level 5: The Hooks System
  {
    levelNumber: 5,
    title: 'Understanding Hooks',
    description: 'Learn how hooks extend Claude Code with custom behaviors',
    xpReward: 250,
    estimatedMinutes: 25,
    isFree: false,
    requiresVerification: false,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'cc5-1',
          type: 'text',
          title: 'What are Hooks?',
          content: `<p>Hooks are commands that run automatically at specific points in Claude Code's workflow:</p>
<ul>
  <li><strong>PreToolCall</strong> - Before Claude uses a tool (like editing a file)</li>
  <li><strong>PostToolCall</strong> - After a tool completes</li>
  <li><strong>PreMessage</strong> - Before Claude responds</li>
  <li><strong>PostMessage</strong> - After Claude's response</li>
  <li><strong>Notification</strong> - When Claude needs user attention</li>
</ul>`
        },
        {
          id: 'cc5-2',
          type: 'code',
          title: 'Hook Configuration',
          language: 'json',
          content: `// .claude/settings.json
{
  "hooks": {
    "PreToolCall": [
      {
        "matcher": "Edit",
        "command": "npm run lint:fix {{file}}"
      }
    ],
    "PostToolCall": [
      {
        "matcher": "Write",
        "command": "prettier --write {{file}}"
      }
    ]
  }
}`
        },
        {
          id: 'cc5-3',
          type: 'tip',
          title: 'Common Use Cases',
          content: 'Popular hooks include: auto-formatting after file changes, running tests after code edits, checking types before commits, and sending notifications on completion.'
        },
        {
          id: 'cc5-4',
          type: 'text',
          title: 'Hook Variables',
          content: `<p>Hooks can access context variables:</p>
<ul>
  <li><code>{{file}}</code> - The file being operated on</li>
  <li><code>{{tool}}</code> - The tool being called</li>
  <li><code>{{message}}</code> - The user's message</li>
  <li><code>{{cwd}}</code> - Current working directory</li>
  <li><code>{{branch}}</code> - Current git branch</li>
</ul>`
        },
        {
          id: 'cc5-5',
          type: 'code',
          title: 'Advanced Hook Example',
          language: 'json',
          content: `{
  "hooks": {
    "PostToolCall": [
      {
        "matcher": "Edit",
        "conditions": {
          "filePattern": "**/*.test.ts"
        },
        "command": "npm test -- --findRelatedTests {{file}}"
      }
    ]
  }
}`
        }
      ]
    } as LevelContent
  },

  // Level 6: Creating Custom Hooks
  {
    levelNumber: 6,
    title: 'Building Custom Hooks',
    description: 'Create your own hooks for automated workflows',
    xpReward: 250,
    estimatedMinutes: 25,
    isFree: false,
    requiresVerification: true,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'cc6-1',
          type: 'text',
          title: 'Designing Effective Hooks',
          content: `<p>When creating hooks, consider:</p>
<ul>
  <li><strong>Purpose</strong> - What problem does this hook solve?</li>
  <li><strong>Timing</strong> - When should it run (pre/post)?</li>
  <li><strong>Scope</strong> - Should it run for all files or specific patterns?</li>
  <li><strong>Failure handling</strong> - What happens if the hook fails?</li>
</ul>`
        },
        {
          id: 'cc6-2',
          type: 'code',
          title: 'TypeScript Type Checking Hook',
          language: 'json',
          content: `{
  "hooks": {
    "PreToolCall": [
      {
        "name": "TypeCheck",
        "matcher": "Edit",
        "conditions": {
          "filePattern": "**/*.{ts,tsx}"
        },
        "command": "npx tsc --noEmit --skipLibCheck",
        "onFailure": "warn"
      }
    ]
  }
}`
        },
        {
          id: 'cc6-3',
          type: 'code',
          title: 'Auto-Documentation Hook',
          language: 'json',
          content: `{
  "hooks": {
    "PostToolCall": [
      {
        "name": "UpdateDocs",
        "matcher": "Write",
        "conditions": {
          "filePattern": "src/api/**/*.ts"
        },
        "command": "npm run docs:generate",
        "async": true
      }
    ]
  }
}`
        },
        {
          id: 'cc6-4',
          type: 'warning',
          title: 'Hook Performance',
          content: 'Synchronous hooks block Claude Code until they complete. For slow operations (like test suites), use async: true to run them in the background.'
        },
        {
          id: 'cc6-5',
          type: 'text',
          title: 'Testing Your Hooks',
          content: `<p>Debug hooks with these commands:</p>
<ol>
  <li><code>/hooks list</code> - Show all configured hooks</li>
  <li><code>/hooks test [name]</code> - Test a specific hook</li>
  <li><code>/hooks debug</code> - Enable verbose hook logging</li>
</ol>`
        }
      ],
      exercise: {
        type: 'code',
        instructions: 'Create a hook configuration that runs ESLint fix on any TypeScript file after Claude edits it. Include a condition to only run on files in the src/ directory.',
        starterCode: `{
  "hooks": {
    // Add your hook here
  }
}`,
        hints: [
          'Use PostToolCall to run after edits',
          'Match on the Edit tool',
          'Use filePattern to limit to src/**/*.ts files'
        ],
        validationCriteria: [
          'Uses PostToolCall hook type',
          'Matches Edit operations',
          'Includes correct file pattern',
          'Runs eslint --fix command'
        ]
      }
    } as LevelContent
  },

  // Level 7: Skills Introduction
  {
    levelNumber: 7,
    title: 'Introduction to Skills',
    description: 'Learn about Claude Code Skills and the SKILL.md format',
    xpReward: 200,
    estimatedMinutes: 20,
    isFree: false,
    requiresVerification: false,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'cc7-1',
          type: 'text',
          title: 'What are Skills?',
          content: `<p>Skills are reusable capabilities you can add to Claude Code:</p>
<ul>
  <li><strong>Custom commands</strong> - Teach Claude new slash commands</li>
  <li><strong>Domain knowledge</strong> - Add context about your project or stack</li>
  <li><strong>Workflows</strong> - Automate multi-step processes</li>
  <li><strong>Integrations</strong> - Connect to external services</li>
</ul>`
        },
        {
          id: 'cc7-2',
          type: 'code',
          title: 'Basic SKILL.md Structure',
          language: 'markdown',
          content: `# My Custom Skill

## Description
A brief description of what this skill does.

## Commands
- \`/mycommand\` - What this command does

## Instructions
When the user invokes this skill, you should:
1. First step
2. Second step
3. Third step

## Examples
User: /mycommand create a new feature
Assistant: [Example response]`
        },
        {
          id: 'cc7-3',
          type: 'tip',
          title: 'Skill Location',
          content: 'Place SKILL.md files in your project\'s .claude/ directory. Claude Code automatically loads skills from this location when you start a session.'
        },
        {
          id: 'cc7-4',
          type: 'text',
          title: 'Built-in Skills',
          content: `<p>Claude Code includes several built-in skills:</p>
<ul>
  <li><code>/commit</code> - Generate commit messages</li>
  <li><code>/review</code> - Code review current changes</li>
  <li><code>/test</code> - Generate tests for code</li>
  <li><code>/docs</code> - Generate documentation</li>
  <li><code>/explain</code> - Explain code in detail</li>
</ul>`
        },
        {
          id: 'cc7-5',
          type: 'code',
          title: 'Using Skills',
          language: 'text',
          content: `# List available skills
> /help

# Use a skill
> /commit

# Get skill-specific help
> /commit --help`
        }
      ]
    } as LevelContent
  },

  // Level 8: Building Custom Skills
  {
    levelNumber: 8,
    title: 'Creating Custom Skills',
    description: 'Build your own skills with SKILL.md files',
    xpReward: 300,
    estimatedMinutes: 30,
    isFree: false,
    requiresVerification: true,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'cc8-1',
          type: 'text',
          title: 'Skill Design Principles',
          content: `<p>Effective skills are:</p>
<ul>
  <li><strong>Focused</strong> - Do one thing well</li>
  <li><strong>Documented</strong> - Clear instructions for Claude</li>
  <li><strong>Flexible</strong> - Handle variations in user input</li>
  <li><strong>Safe</strong> - Include guardrails and confirmations</li>
</ul>`
        },
        {
          id: 'cc8-2',
          type: 'code',
          title: 'Complete Skill Example',
          language: 'markdown',
          content: `# API Endpoint Generator

## Description
Generate RESTful API endpoints with proper validation, error handling, and documentation.

## Commands
- \`/api create [resource]\` - Create CRUD endpoints for a resource
- \`/api route [method] [path]\` - Create a single route

## Context
This project uses:
- Express.js for routing
- Zod for validation
- Prisma for database

## Instructions
When creating API endpoints:
1. Create the route file in src/routes/
2. Add Zod validation schemas
3. Include error handling middleware
4. Add JSDoc comments for documentation
5. Update the route index file

## Templates
### Route Template
\`\`\`typescript
import { Router } from 'express';
import { z } from 'zod';

const router = Router();
// Route implementation here
export default router;
\`\`\``
        },
        {
          id: 'cc8-3',
          type: 'tip',
          title: 'Skill Variables',
          content: 'Use placeholders like [resource] and [method] in your commands. Claude will recognize these as parameters the user should provide.'
        },
        {
          id: 'cc8-4',
          type: 'text',
          title: 'Advanced Skill Features',
          content: `<p>Skills can include:</p>
<ul>
  <li><strong>Templates</strong> - Code snippets for Claude to use</li>
  <li><strong>Rules</strong> - Constraints on what Claude should do</li>
  <li><strong>Context</strong> - Project-specific information</li>
  <li><strong>Examples</strong> - Sample interactions</li>
</ul>`
        },
        {
          id: 'cc8-5',
          type: 'code',
          title: 'Skill with Rules',
          language: 'markdown',
          content: `# Database Migration Skill

## Rules
- NEVER modify production database directly
- Always create a migration file, don't edit schema directly
- Include rollback commands in every migration
- Verify foreign key constraints before changes

## Commands
- \`/migrate create [name]\` - Create new migration
- \`/migrate check\` - Validate pending migrations`
        }
      ],
      exercise: {
        type: 'code',
        instructions: 'Create a SKILL.md file for a "component generator" skill that creates React components with TypeScript, tests, and Storybook stories.',
        starterCode: `# Component Generator

## Description
<!-- Add description -->

## Commands
<!-- Add commands -->

## Instructions
<!-- Add step-by-step instructions -->`,
        hints: [
          'Include commands for different component types (page, ui, form)',
          'Specify the folder structure for generated files',
          'Include templates for component, test, and story files'
        ],
        validationCriteria: [
          'Has clear description',
          'Defines at least 2 commands',
          'Includes step-by-step instructions',
          'Mentions TypeScript and testing'
        ]
      }
    } as LevelContent
  },

  // Level 9: VS Code Integration
  {
    levelNumber: 9,
    title: 'VS Code Integration',
    description: 'Use Claude Code seamlessly within Visual Studio Code',
    xpReward: 200,
    estimatedMinutes: 20,
    isFree: false,
    requiresVerification: false,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'cc9-1',
          type: 'text',
          title: 'Claude Code in VS Code',
          content: `<p>VS Code integration provides:</p>
<ul>
  <li><strong>Inline suggestions</strong> - AI completions as you type</li>
  <li><strong>Terminal integration</strong> - Claude in the integrated terminal</li>
  <li><strong>Quick actions</strong> - Right-click context menu options</li>
  <li><strong>Problem detection</strong> - AI-powered error explanations</li>
</ul>`
        },
        {
          id: 'cc9-2',
          type: 'code',
          title: 'Installation',
          language: 'bash',
          content: `# Install the VS Code extension
# Search "Claude Code" in VS Code Extensions
# Or install via command line:
code --install-extension anthropic.claude-code`
        },
        {
          id: 'cc9-3',
          type: 'text',
          title: 'Key Features',
          content: `<p>The VS Code extension adds:</p>
<ul>
  <li><strong>Claude Panel</strong> - Dedicated chat view in the sidebar</li>
  <li><strong>Inline Chat</strong> - Cmd/Ctrl+I for quick questions</li>
  <li><strong>Selection Actions</strong> - Select code and ask Claude about it</li>
  <li><strong>Diff View</strong> - Review AI changes before applying</li>
</ul>`
        },
        {
          id: 'cc9-4',
          type: 'tip',
          title: 'Keyboard Shortcuts',
          content: 'Cmd/Ctrl+Shift+C opens Claude panel. Cmd/Ctrl+I starts inline chat. Select code and press Cmd/Ctrl+Shift+E to explain it.'
        },
        {
          id: 'cc9-5',
          type: 'text',
          title: 'Configuration',
          content: `<p>Configure in VS Code Settings:</p>
<ul>
  <li><code>claude.model</code> - Choose default model</li>
  <li><code>claude.autoAccept</code> - Auto-accept low-risk changes</li>
  <li><code>claude.contextFiles</code> - Additional files to include</li>
  <li><code>claude.excludePatterns</code> - Files to ignore</li>
</ul>`
        }
      ]
    } as LevelContent
  },

  // Level 10: JetBrains Integration
  {
    levelNumber: 10,
    title: 'JetBrains Integration',
    description: 'Set up Claude Code in IntelliJ, WebStorm, and other JetBrains IDEs',
    xpReward: 200,
    estimatedMinutes: 20,
    isFree: false,
    requiresVerification: false,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'cc10-1',
          type: 'text',
          title: 'JetBrains Plugin',
          content: `<p>The Claude Code plugin works with all JetBrains IDEs:</p>
<ul>
  <li>IntelliJ IDEA</li>
  <li>WebStorm</li>
  <li>PyCharm</li>
  <li>GoLand</li>
  <li>Rider</li>
  <li>And more...</li>
</ul>`
        },
        {
          id: 'cc10-2',
          type: 'text',
          title: 'Installation Steps',
          content: `<ol>
  <li>Open Settings/Preferences</li>
  <li>Go to Plugins → Marketplace</li>
  <li>Search for "Claude Code"</li>
  <li>Click Install and restart the IDE</li>
  <li>Configure authentication in Settings → Tools → Claude Code</li>
</ol>`
        },
        {
          id: 'cc10-3',
          type: 'tip',
          title: 'JetBrains-Specific Features',
          content: 'The JetBrains plugin integrates with the IDE\'s refactoring tools, so Claude can use built-in rename, extract method, and other refactoring operations.'
        },
        {
          id: 'cc10-4',
          type: 'text',
          title: 'Usage Patterns',
          content: `<p>Common workflows in JetBrains IDEs:</p>
<ul>
  <li><strong>Alt+Enter on errors</strong> - Get AI fix suggestions</li>
  <li><strong>Right-click refactor</strong> - AI-assisted refactoring</li>
  <li><strong>Generate menu</strong> - AI generation options</li>
  <li><strong>Tool window</strong> - Persistent Claude chat</li>
</ul>`
        }
      ]
    } as LevelContent
  },

  // Level 11: Team Configuration
  {
    levelNumber: 11,
    title: 'Team Configuration',
    description: 'Set up Claude Code for team development with shared settings',
    xpReward: 250,
    estimatedMinutes: 25,
    isFree: false,
    requiresVerification: true,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'cc11-1',
          type: 'text',
          title: 'Team Setup Overview',
          content: `<p>Claude Code supports team configuration for consistent AI assistance:</p>
<ul>
  <li><strong>Shared settings</strong> - Project-level configuration in .claude/</li>
  <li><strong>Team skills</strong> - Custom skills everyone can use</li>
  <li><strong>Context files</strong> - Shared knowledge about the project</li>
  <li><strong>Access control</strong> - Manage permissions and quotas</li>
</ul>`
        },
        {
          id: 'cc11-2',
          type: 'code',
          title: 'Project Configuration',
          language: 'json',
          content: `// .claude/settings.json (commit to repo)
{
  "version": 1,
  "project": {
    "name": "My Team Project",
    "description": "Description for Claude context"
  },
  "include": [
    "src/**/*.ts",
    "docs/**/*.md"
  ],
  "exclude": [
    "node_modules",
    "dist",
    ".env*"
  ],
  "skills": [
    ".claude/skills/api-generator.md",
    ".claude/skills/test-helper.md"
  ]
}`
        },
        {
          id: 'cc11-3',
          type: 'text',
          title: 'CLAUDE.md Project Context',
          content: `<p>Create a CLAUDE.md file in your project root to provide persistent context:</p>
<ul>
  <li>Project architecture overview</li>
  <li>Coding standards and conventions</li>
  <li>Important patterns to follow</li>
  <li>Things Claude should avoid</li>
</ul>`
        },
        {
          id: 'cc11-4',
          type: 'code',
          title: 'Example CLAUDE.md',
          language: 'markdown',
          content: `# Project Context for Claude

## Architecture
This is a Next.js 14 application with:
- App Router for routing
- Prisma for database
- tRPC for type-safe APIs

## Coding Standards
- Use functional components with hooks
- Prefer named exports
- All components need unit tests

## Important Rules
- Never commit .env files
- Always use the logger, not console.log
- Database changes need migrations`
        },
        {
          id: 'cc11-5',
          type: 'tip',
          title: 'Gitignore Considerations',
          content: 'Commit .claude/settings.json and CLAUDE.md but add .claude/auth.json to .gitignore to protect credentials.'
        }
      ],
      exercise: {
        type: 'code',
        instructions: 'Create a CLAUDE.md file for a team project. Include sections for architecture, coding standards, and important rules that Claude should follow.',
        starterCode: `# Project Context for Claude

## Architecture
<!-- Describe your tech stack -->

## Coding Standards
<!-- List your conventions -->

## Important Rules
<!-- What should Claude always/never do -->`,
        hints: [
          'Be specific about your tech stack and patterns',
          'Include naming conventions and file organization',
          'List common mistakes Claude should avoid'
        ],
        validationCriteria: [
          'Has architecture section with tech stack',
          'Includes coding standards',
          'Lists specific rules or constraints'
        ]
      }
    } as LevelContent
  },

  // Level 12: Enterprise Patterns
  {
    levelNumber: 12,
    title: 'Enterprise Deployment',
    description: 'Advanced patterns for deploying Claude Code in enterprise environments',
    xpReward: 300,
    estimatedMinutes: 30,
    isFree: false,
    requiresVerification: false,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'cc12-1',
          type: 'text',
          title: 'Enterprise Considerations',
          content: `<p>When deploying Claude Code at scale, consider:</p>
<ul>
  <li><strong>Security</strong> - API key management, data privacy</li>
  <li><strong>Compliance</strong> - Audit logs, access control</li>
  <li><strong>Cost management</strong> - Usage monitoring, quotas</li>
  <li><strong>Standardization</strong> - Consistent configuration across teams</li>
</ul>`
        },
        {
          id: 'cc12-2',
          type: 'text',
          title: 'Centralized Configuration',
          content: `<p>Enterprise teams can use:</p>
<ul>
  <li><strong>Organization settings</strong> - Defaults for all projects</li>
  <li><strong>Skill libraries</strong> - Shared skills across teams</li>
  <li><strong>Usage policies</strong> - Guardrails and restrictions</li>
  <li><strong>Approved integrations</strong> - Vetted MCP servers</li>
</ul>`
        },
        {
          id: 'cc12-3',
          type: 'code',
          title: 'Enterprise Settings Example',
          language: 'json',
          content: `{
  "enterprise": {
    "requireApproval": ["Write", "Bash"],
    "blockedPatterns": [
      ".env*",
      "**/secrets/**",
      "**/credentials/**"
    ],
    "auditLog": true,
    "costAlerts": {
      "daily": 50,
      "monthly": 1000
    }
  }
}`
        },
        {
          id: 'cc12-4',
          type: 'warning',
          title: 'Security Best Practices',
          content: 'Never let Claude Code access production credentials or databases directly. Use read-only replicas and separate development environments for AI-assisted work.'
        },
        {
          id: 'cc12-5',
          type: 'text',
          title: 'Deployment Workflow',
          content: `<p>Recommended enterprise workflow:</p>
<ol>
  <li>Pilot with a small team</li>
  <li>Establish guidelines and training</li>
  <li>Create organization-wide skills</li>
  <li>Set up monitoring and cost controls</li>
  <li>Roll out with support resources</li>
</ol>`
        },
        {
          id: 'cc12-6',
          type: 'tip',
          title: 'Getting Help',
          content: 'Enterprise customers have access to dedicated support. Contact your Anthropic account manager for custom deployment assistance and training.'
        }
      ]
    } as LevelContent
  }
];
