// Claude Chat Fundamentals - Track Content
// This is the foundational track for all users

import type { TrackLevel, LevelContent } from '@/lib/types';

export const CLAUDE_CHAT_TRACK_ID = 'claude-chat';
export const CLAUDE_CHAT_COLOR = '#DA7756';

export const claudeChatLevels: Omit<TrackLevel, 'id' | 'trackId'>[] = [
  // Level 1: Introduction to Claude
  {
    levelNumber: 1,
    title: 'Meet Claude',
    description: 'Understand what Claude is, its capabilities, and how it differs from other AI assistants',
    xpReward: 100,
    estimatedMinutes: 10,
    isFree: true,
    requiresVerification: false,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'intro-1',
          type: 'text',
          title: 'What is Claude?',
          content: `<p>Claude is an AI assistant created by Anthropic. Unlike simple chatbots, Claude is designed to be helpful, harmless, and honest. It can assist with a wide range of tasks including:</p>
<ul>
  <li><strong>Writing and editing</strong> - drafts, emails, reports, creative content</li>
  <li><strong>Analysis</strong> - data interpretation, document review, research</li>
  <li><strong>Coding</strong> - write, debug, and explain code in any language</li>
  <li><strong>Learning</strong> - explain complex topics, answer questions, tutor</li>
  <li><strong>Problem-solving</strong> - brainstorm, strategize, troubleshoot</li>
</ul>`
        },
        {
          id: 'intro-screenshot-1',
          type: 'image',
          title: 'The Claude Chat Interface',
          content: 'The main Claude conversation view. Your messages appear on the right; Claude responds on the left.',
          imageSrc: '/screenshots/claude-chat/chat-interface.svg',
          imageAlt: 'Screenshot of the Claude chat interface showing a conversation between a user and Claude'
        },
        {
          id: 'intro-2',
          type: 'tip',
          title: 'Key Insight',
          content: 'Claude has a "knowledge cutoff" date and cannot browse the internet in real-time. For the most current information, you may need to provide context or documents directly.'
        },
        {
          id: 'intro-3',
          type: 'text',
          title: 'Claude vs. Other AI Assistants',
          content: `<p>What makes Claude different:</p>
<ul>
  <li><strong>Constitutional AI</strong> - trained to follow principles about being helpful while avoiding harm</li>
  <li><strong>Long context window</strong> - can process up to 200,000 tokens (about 150,000 words)</li>
  <li><strong>Thoughtful responses</strong> - Claude thinks through problems step-by-step</li>
  <li><strong>Honest about limitations</strong> - will tell you when it doesn't know something</li>
</ul>`
        },
        {
          id: 'intro-4',
          type: 'code',
          title: 'Your First Conversation',
          language: 'text',
          content: `User: Hi Claude, what can you help me with today?

Claude: Hello! I'm happy to help with a wide variety of tasks. Here are some things I'm particularly good at:

• Writing and editing any kind of content
• Answering questions and explaining complex topics
• Helping with coding and technical problems
• Analyzing documents, data, or situations
• Brainstorming ideas and problem-solving
• Math calculations and logical reasoning

What would you like to work on?`
        }
      ]
    } as LevelContent
  },

  // Level 2: Basic Prompting
  {
    levelNumber: 2,
    title: 'Crafting Effective Prompts',
    description: 'Learn the fundamentals of writing clear, effective prompts to get better responses',
    xpReward: 150,
    estimatedMinutes: 15,
    isFree: true,
    requiresVerification: true,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'prompting-1',
          type: 'text',
          title: 'The Art of Prompting',
          content: `<p>A prompt is simply what you type to Claude. The quality of your prompt directly affects the quality of the response. Good prompts are:</p>
<ul>
  <li><strong>Clear</strong> - unambiguous about what you want</li>
  <li><strong>Specific</strong> - include relevant details and constraints</li>
  <li><strong>Contextual</strong> - provide background information when helpful</li>
  <li><strong>Structured</strong> - organized in a logical way</li>
</ul>`
        },
        {
          id: 'prompting-2',
          type: 'text',
          title: 'Before and After Examples',
          content: `<p><strong>Weak prompt:</strong></p>
<p><em>"Write about marketing"</em></p>
<p>This is too vague - what aspect of marketing? For what purpose? What format?</p>

<p><strong>Strong prompt:</strong></p>
<p><em>"Write a 200-word LinkedIn post about the importance of customer retention for B2B SaaS companies. Include 2 specific statistics and end with a question to encourage engagement."</em></p>
<p>This specifies: format, length, topic, audience, requirements, and desired outcome.</p>`
        },
        {
          id: 'prompting-3',
          type: 'tip',
          title: 'The CLEAR Framework',
          content: 'Context (background), Length (how long), Examples (show what you want), Audience (who is this for), Role (what perspective to take)'
        },
        {
          id: 'prompting-4',
          type: 'code',
          title: 'Structured Prompt Template',
          language: 'markdown',
          content: `**Role:** Act as a [expert type]

**Context:** [Relevant background information]

**Task:** [What you want Claude to do]

**Requirements:**
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]

**Format:** [How to structure the output]

**Example:** [Optional: show desired output style]`
        },
        {
          id: 'prompting-5',
          type: 'warning',
          title: 'Common Mistakes',
          content: 'Avoid: asking multiple unrelated questions at once, being vague about format requirements, not providing enough context for specialized tasks, expecting Claude to read your mind about preferences.'
        }
      ],
      exercise: {
        type: 'prompt',
        instructions: 'Write a well-structured prompt asking Claude to help you create a weekly team meeting agenda. Include: the role Claude should take, context about your team, specific sections you want, and any constraints.',
        hints: [
          'Start by defining what role Claude should take (e.g., "Act as an experienced meeting facilitator")',
          'Include context about your team size, meeting duration, and goals',
          'Specify the sections you want in the agenda (updates, decisions, action items, etc.)'
        ],
        validationCriteria: [
          'Includes a clear role or perspective for Claude',
          'Provides relevant context (team info, meeting details)',
          'Specifies desired format or structure',
          'Has clear requirements or constraints'
        ]
      }
    } as LevelContent
  },

  // Level 3: Context and Conversation
  {
    levelNumber: 3,
    title: 'Managing Context & Conversations',
    description: 'Learn how to maintain context across conversations and use Claude\'s memory effectively',
    xpReward: 150,
    estimatedMinutes: 12,
    isFree: true,
    requiresVerification: false,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'context-1',
          type: 'text',
          title: 'How Claude Remembers',
          content: `<p>Within a single conversation, Claude remembers everything discussed. However:</p>
<ul>
  <li><strong>Within conversation:</strong> Full memory of all messages</li>
  <li><strong>Across conversations:</strong> No memory (each conversation starts fresh)</li>
  <li><strong>Context window:</strong> Limited to ~200K tokens total</li>
</ul>
<p>This means you can reference earlier parts of your chat ("like I mentioned before") but you'll need to re-establish context in new conversations.</p>`
        },
        {
          id: 'context-2',
          type: 'tip',
          title: 'Pro Tip: The Context Dump',
          content: 'Start important conversations by providing key context upfront: your role, the project you\'re working on, relevant constraints, and your preferences. This "context dump" helps Claude give better responses throughout the conversation.'
        },
        {
          id: 'context-3',
          type: 'text',
          title: 'Conversation Techniques',
          content: `<p><strong>Build iteratively:</strong> Start simple, then refine based on responses.</p>
<p><strong>Reference previous messages:</strong> "Can you expand on point #2?" or "Make that shorter"</p>
<p><strong>Correct misunderstandings:</strong> "That's not quite what I meant. I want X, not Y"</p>
<p><strong>Ask for alternatives:</strong> "Give me 3 different approaches" or "What's another way to do this?"</p>`
        },
        {
          id: 'context-4',
          type: 'code',
          title: 'Iterative Refinement Example',
          language: 'text',
          content: `User: Write a tagline for my coffee shop

Claude: "Where every cup tells a story"

User: I like it, but make it more playful and mention we're open late

Claude: "Late nights, great brews, endless possibilities"

User: Perfect! Now give me 2 more variations in that style

Claude: 1. "Fuel your midnight adventures, one cup at a time"
        2. "Because good coffee doesn't have a bedtime"`
        },
        {
          id: 'context-5',
          type: 'interactive',
          content: 'Try this yourself: Start a conversation asking Claude to help with something, then practice refining the response through 3-4 follow-up messages.'
        }
      ]
    } as LevelContent
  },

  // Level 4: Projects and Artifacts
  {
    levelNumber: 4,
    title: 'Projects & Artifacts',
    description: 'Organize your work with Projects and create shareable Artifacts',
    xpReward: 200,
    estimatedMinutes: 15,
    isFree: false,
    requiresVerification: true,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'projects-1',
          type: 'text',
          title: 'What are Projects?',
          content: `<p>Projects help you organize related conversations and give Claude persistent context. With Projects, you can:</p>
<ul>
  <li><strong>Group conversations</strong> by topic, client, or workflow</li>
  <li><strong>Set project instructions</strong> that Claude follows in all project chats</li>
  <li><strong>Upload reference files</strong> that Claude can access anytime</li>
  <li><strong>Maintain consistency</strong> across multiple conversations</li>
</ul>`
        },
        {
          id: 'projects-screenshot-1',
          type: 'image',
          title: 'Claude Projects Panel',
          content: 'The Projects sidebar lets you organize conversations by topic, client, or workflow. Each project holds its own instructions and uploaded files.',
          imageSrc: '/screenshots/claude-chat/projects-panel.svg',
          imageAlt: 'Screenshot of the Claude Projects panel showing a list of organized projects'
        },
        {
          id: 'projects-2',
          type: 'code',
          title: 'Setting Project Instructions',
          language: 'markdown',
          content: `Example project instructions for a marketing team:

---
You are helping the Growth Marketing team at Acme Corp.

Our brand voice is: friendly, professional, data-driven

Key guidelines:
- All content should be concise (under 150 words for social)
- Include metrics/data when possible
- Target audience: B2B SaaS decision-makers
- Avoid jargon; use simple language

Reference our brand guide (uploaded) for visual standards.
---`
        },
        {
          id: 'projects-3',
          type: 'text',
          title: 'What are Artifacts?',
          content: `<p>Artifacts are standalone pieces of content that Claude creates in a separate panel. They're ideal for:</p>
<ul>
  <li><strong>Documents</strong> - reports, essays, documentation</li>
  <li><strong>Code</strong> - complete scripts, components, apps</li>
  <li><strong>Diagrams</strong> - flowcharts, architecture diagrams (with Mermaid)</li>
  <li><strong>Interactive content</strong> - React components, HTML pages</li>
</ul>
<p>Artifacts can be copied, downloaded, or shared with a link.</p>`
        },
        {
          id: 'projects-screenshot-2',
          type: 'image',
          title: 'Artifacts in Action',
          content: 'When Claude generates an Artifact, it appears in a side panel where you can preview, edit, and share it.',
          imageSrc: '/screenshots/claude-chat/artifacts-view.svg',
          imageAlt: 'Screenshot showing a Claude Artifact rendered in the side panel alongside the conversation'
        },
        {
          id: 'projects-4',
          type: 'tip',
          title: 'When to Use Artifacts',
          content: 'Request an artifact when you need: substantial content (500+ words), code you\'ll use directly, something to share or export, or content you\'ll iterate on multiple times.'
        },
        {
          id: 'projects-5',
          type: 'warning',
          title: 'Artifact Limitations',
          content: 'Artifacts are stored per-conversation and don\'t persist across chats. For important artifacts, save them locally or in your project files. Also, complex interactive artifacts may have rendering limitations.'
        },
        {
          id: 'projects-6',
          type: 'text',
          title: 'Interactive Artifacts',
          content: `<p>Claude can build fully interactive React components as artifacts, giving you working tools right inside the conversation. Common interactive artifacts include:</p>
<ul>
  <li><strong>Dashboards</strong> - data visualizations with charts, filters, and dynamic displays</li>
  <li><strong>Calculators</strong> - mortgage calculators, ROI estimators, unit converters, pricing tools</li>
  <li><strong>Forms and surveys</strong> - multi-step forms with validation, quizzes, and feedback collectors</li>
  <li><strong>Mini applications</strong> - to-do lists, timers, kanban boards, color pickers</li>
  <li><strong>Data tools</strong> - CSV parsers, JSON formatters, regex testers, diff viewers</li>
  <li><strong>Games and simulations</strong> - simple games, algorithm visualizations, physics simulations</li>
</ul>
<p>To request an interactive artifact, describe what you want the tool to do and ask Claude to build it as a React component. You can iterate on the design, add features, or change styling through follow-up messages.</p>`
        },
        {
          id: 'projects-7',
          type: 'code',
          title: 'Mermaid Diagrams',
          language: 'text',
          content: `Claude can generate Mermaid diagram artifacts for visual documentation.
Here are example prompts and what they produce:

--- Flowchart ---
Prompt: "Create a flowchart showing our user signup process:
visitor lands on page, chooses email or Google signup,
validates input, creates account, sends welcome email."

Claude produces a Mermaid flowchart with decision nodes,
directional arrows, and labeled steps.

--- Org Chart ---
Prompt: "Create an org chart for a startup with a CEO,
CTO and COO reporting to them, and 2-3 people under each."

Claude produces a top-down hierarchy diagram with
roles and reporting lines.

--- Sequence Diagram ---
Prompt: "Show the API request flow: client sends request
to API gateway, gateway checks auth service, forwards
to backend, backend queries database, response flows back."

Claude produces a sequence diagram with labeled
participants and message arrows showing the full flow.

--- Timeline ---
Prompt: "Create a timeline of our product roadmap:
Q1 - MVP launch, Q2 - mobile app, Q3 - enterprise
features, Q4 - international expansion."

Claude produces a Gantt chart or timeline visualization
with phases and milestones.`
        },
        {
          id: 'projects-8',
          type: 'text',
          title: 'SVG Visualizations',
          content: `<p>Claude can generate custom SVG (Scalable Vector Graphics) artifacts for visual content that goes beyond what Mermaid diagrams offer. SVG artifacts are resolution-independent and can be downloaded or embedded anywhere.</p>
<ul>
  <li><strong>Custom diagrams</strong> - architecture diagrams, network topologies, system overviews with precise layouts and styling</li>
  <li><strong>Data visualizations</strong> - bar charts, pie charts, scatter plots, and custom chart types with your specific data</li>
  <li><strong>Infographics</strong> - visual summaries combining icons, text, and layout for presentations or documentation</li>
  <li><strong>Icons and logos</strong> - simple vector graphics, badges, and branded visual elements</li>
  <li><strong>Wireframes</strong> - low-fidelity UI mockups and layout sketches for rapid prototyping</li>
  <li><strong>Process maps</strong> - detailed workflow visualizations with custom styling beyond standard diagram tools</li>
</ul>
<p>To get the best SVG results, describe the visual you want in detail: specify colors, layout direction, relative sizes, and any text labels. Claude will generate clean SVG code rendered as a visual artifact you can preview and download.</p>`
        }
      ],
      exercise: {
        type: 'build',
        instructions: 'Create a project setup for your work context. Write out: 1) What the project would be called, 2) Project instructions (2-3 paragraphs), 3) What files you would upload as references. Then describe an artifact you would ask Claude to create.',
        hints: [
          'Think about a recurring type of work you do',
          'Include tone, format preferences, and key constraints in instructions',
          'Reference files could include: brand guides, templates, past examples, data'
        ],
        validationCriteria: [
          'Includes a clear project name and purpose',
          'Project instructions are specific and actionable',
          'Identifies relevant reference files to upload',
          'Describes a meaningful artifact to create'
        ]
      }
    } as LevelContent
  },

  // Level 5: Advanced Prompting Techniques
  {
    levelNumber: 5,
    title: 'Advanced Prompting',
    description: 'Master techniques like role prompting, chain-of-thought, and few-shot learning',
    xpReward: 250,
    estimatedMinutes: 20,
    isFree: false,
    requiresVerification: true,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'advanced-1',
          type: 'text',
          title: 'Role Prompting',
          content: `<p>Assigning Claude a specific role or persona changes how it responds:</p>
<ul>
  <li><strong>"Act as a senior software architect"</strong> → More technical, considers scalability</li>
  <li><strong>"You are a creative writing teacher"</strong> → More instructional, focuses on craft</li>
  <li><strong>"Respond as a skeptical investor"</strong> → Critical analysis, risk-focused</li>
</ul>
<p>Role prompting leverages Claude's training on diverse perspectives and expertise areas.</p>`
        },
        {
          id: 'advanced-2',
          type: 'text',
          title: 'Chain-of-Thought Prompting',
          content: `<p>Ask Claude to think step-by-step for complex reasoning tasks:</p>
<ul>
  <li><strong>"Let's think through this step by step"</strong></li>
  <li><strong>"Walk me through your reasoning"</strong></li>
  <li><strong>"Break this down into steps"</strong></li>
</ul>
<p>This improves accuracy on math, logic, and multi-step problems significantly.</p>`
        },
        {
          id: 'advanced-3',
          type: 'code',
          title: 'Few-Shot Learning Example',
          language: 'text',
          content: `User: Convert these customer complaints to formal tickets.

Example 1:
Complaint: "Your app crashed when I tried to pay!!"
Ticket: [HIGH] Payment Processing - App crash during checkout. Customer unable to complete transaction.

Example 2:
Complaint: "Can't find the settings button anywhere"
Ticket: [LOW] UI/UX - Settings navigation unclear. Customer having difficulty locating settings menu.

Now convert this:
Complaint: "Been waiting 3 days for my order and no updates"

Claude: [MEDIUM] Order Fulfillment - Delayed shipment. Customer awaiting order update after 3 days without tracking information.`
        },
        {
          id: 'advanced-4',
          type: 'tip',
          title: 'XML Tags for Structure',
          content: 'Use XML-like tags to structure complex prompts: <context>...</context>, <task>...</task>, <constraints>...</constraints>. Claude recognizes these and maintains clear separation between sections.'
        },
        {
          id: 'advanced-5',
          type: 'code',
          title: 'Structured Prompt with Tags',
          language: 'xml',
          content: `<role>
You are a technical documentation writer with 10+ years experience.
</role>

<context>
We're documenting our new API for external developers.
Audience: Mid-level developers, familiar with REST APIs.
</context>

<task>
Write documentation for the /users endpoint including:
- Endpoint description
- Request parameters
- Response format
- Example request/response
- Error codes
</task>

<style>
- Use clear, concise language
- Include code examples in JavaScript
- Follow API documentation best practices
</style>`
        }
      ],
      exercise: {
        type: 'prompt',
        instructions: 'Create an advanced prompt using at least 2 of these techniques: role prompting, chain-of-thought, few-shot examples, or XML tags. The prompt should be for a complex task relevant to your work.',
        hints: [
          'Choose a task that genuinely requires reasoning (analysis, strategy, problem-solving)',
          'If using few-shot, include 2-3 clear examples',
          'Combine techniques: role + chain-of-thought works well for analysis tasks'
        ],
        validationCriteria: [
          'Uses at least 2 advanced prompting techniques',
          'Techniques are applied appropriately to the task',
          'Prompt is well-structured and clear',
          'Task is complex enough to benefit from advanced techniques'
        ]
      }
    } as LevelContent
  },

  // Level 6: Working with Documents
  {
    levelNumber: 6,
    title: 'Document Analysis & Processing',
    description: 'Learn to upload, analyze, and transform documents with Claude',
    xpReward: 200,
    estimatedMinutes: 15,
    isFree: false,
    requiresVerification: false,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'docs-1',
          type: 'text',
          title: 'Uploading Documents',
          content: `<p>Claude can process various file types:</p>
<ul>
  <li><strong>PDFs</strong> - reports, papers, ebooks</li>
  <li><strong>Images</strong> - screenshots, diagrams, photos</li>
  <li><strong>Text files</strong> - .txt, .md, .csv</li>
  <li><strong>Code files</strong> - most programming languages</li>
</ul>
<p>Simply drag and drop or use the attachment button to upload files.</p>`
        },
        {
          id: 'docs-2',
          type: 'text',
          title: 'Effective Document Prompts',
          content: `<p>When working with documents, be specific about what you want:</p>
<ul>
  <li><strong>Summarize</strong> - "Give me a 3-paragraph summary of the key findings"</li>
  <li><strong>Extract</strong> - "List all action items mentioned in this meeting notes"</li>
  <li><strong>Analyze</strong> - "What are the main arguments for and against the proposal?"</li>
  <li><strong>Transform</strong> - "Convert this technical doc into a FAQ for customers"</li>
  <li><strong>Compare</strong> - "What are the key differences between these two contracts?"</li>
</ul>`
        },
        {
          id: 'docs-3',
          type: 'tip',
          title: 'Multi-Document Analysis',
          content: 'Upload multiple related documents in one message to enable comparative analysis. Claude can cross-reference, find inconsistencies, and synthesize information across documents.'
        },
        {
          id: 'docs-4',
          type: 'code',
          title: 'Document Processing Prompt',
          language: 'text',
          content: `User: [Uploads quarterly_report.pdf]

Analyze this quarterly report and provide:

1. **Executive Summary** (2-3 sentences)
2. **Key Metrics** - extract the 5 most important numbers
3. **Trends** - what's improving vs declining?
4. **Risk Factors** - any concerns mentioned?
5. **Action Items** - recommended next steps

Format as a structured brief I can share with the team.`
        },
        {
          id: 'docs-5',
          type: 'warning',
          title: 'Document Limitations',
          content: 'Very long documents may need to be split. Scanned PDFs work better with clear text. Password-protected files must be unlocked first. Complex tables may need extra guidance to interpret correctly.'
        }
      ]
    } as LevelContent
  },

  // Level 7: Vision & Image Analysis
  {
    levelNumber: 7,
    title: 'Vision: Working with Images',
    description: 'Use Claude\'s vision capabilities to analyze and work with images',
    xpReward: 200,
    estimatedMinutes: 12,
    isFree: false,
    requiresVerification: true,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'vision-1',
          type: 'text',
          title: 'What Claude Can See',
          content: `<p>Claude's vision capabilities include:</p>
<ul>
  <li><strong>Reading text</strong> - in screenshots, photos, documents</li>
  <li><strong>Analyzing charts</strong> - understanding data visualizations</li>
  <li><strong>Describing images</strong> - detailed visual descriptions</li>
  <li><strong>UI/UX feedback</strong> - critiquing designs and interfaces</li>
  <li><strong>Code from screenshots</strong> - extracting code from images</li>
  <li><strong>Comparing images</strong> - finding differences and similarities</li>
</ul>`
        },
        {
          id: 'vision-2',
          type: 'code',
          title: 'Image Analysis Examples',
          language: 'text',
          content: `// Screenshot analysis
"What does this error message say and how do I fix it?"

// UI feedback
"Review this landing page design. What works well and what could improve?"

// Chart interpretation
"Summarize the key insights from this dashboard screenshot"

// Code extraction
"Convert the code shown in this image to text I can copy"

// Comparison
"Compare these two mockups - what changed between versions?"`
        },
        {
          id: 'vision-3',
          type: 'tip',
          title: 'Best Practices for Images',
          content: 'Use clear, high-resolution images. Crop to relevant areas when possible. For text-heavy images, mention if there are specific sections to focus on. Combine multiple screenshots in one message for comparison tasks.'
        },
        {
          id: 'vision-4',
          type: 'warning',
          title: 'Vision Limitations',
          content: 'Claude cannot identify specific individuals, access image URLs (must upload directly), or consistently read very small or blurry text. It also has limitations with complex diagrams that require domain expertise to interpret.'
        }
      ],
      exercise: {
        type: 'upload',
        instructions: 'Upload a screenshot of a UI/interface you work with (could be an app, website, or tool). Ask Claude to analyze it and provide 3 specific suggestions for improvement based on UX best practices.',
        hints: [
          'Choose a screenshot that has room for improvement',
          'Be specific about what aspect you want feedback on',
          'You can ask follow-up questions to dive deeper'
        ],
        validationCriteria: [
          'Uploaded a relevant screenshot',
          'Asked a clear question about the image',
          'Received actionable UX feedback'
        ]
      }
    } as LevelContent
  },

  // Level 8: Practical Applications
  {
    levelNumber: 8,
    title: 'Real-World Applications',
    description: 'Apply everything you\'ve learned to common workplace scenarios',
    xpReward: 300,
    estimatedMinutes: 20,
    isFree: false,
    requiresVerification: true,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'apps-1',
          type: 'text',
          title: 'Email & Communication',
          content: `<p>Claude excels at drafting professional communication:</p>
<ul>
  <li><strong>Draft emails</strong> - provide context and let Claude write</li>
  <li><strong>Respond to difficult messages</strong> - diplomatic handling</li>
  <li><strong>Translate tone</strong> - formal ↔ casual adjustments</li>
  <li><strong>Summarize email threads</strong> - extract key points and action items</li>
</ul>`
        },
        {
          id: 'apps-2',
          type: 'text',
          title: 'Meeting Preparation & Follow-up',
          content: `<p>Use Claude to maximize meeting effectiveness:</p>
<ul>
  <li><strong>Create agendas</strong> - structured meeting plans</li>
  <li><strong>Prepare talking points</strong> - key messages and supporting data</li>
  <li><strong>Process meeting notes</strong> - extract action items and decisions</li>
  <li><strong>Draft follow-up emails</strong> - summarize outcomes and next steps</li>
</ul>`
        },
        {
          id: 'apps-3',
          type: 'text',
          title: 'Research & Analysis',
          content: `<p>Accelerate research and decision-making:</p>
<ul>
  <li><strong>Summarize long documents</strong> - quick understanding of reports</li>
  <li><strong>Compare options</strong> - structured pros/cons analysis</li>
  <li><strong>Generate questions</strong> - prepare for interviews or evaluations</li>
  <li><strong>Fact-check claims</strong> - (with provided documents)</li>
</ul>`
        },
        {
          id: 'apps-4',
          type: 'code',
          title: 'Workflow Example: Weekly Report',
          language: 'text',
          content: `User: Help me write my weekly status report.

Context:
- Team: Product Engineering (5 people)
- This week: launched user dashboard v2, fixed critical bug in auth
- Blockers: waiting on design review for mobile app
- Next week: starting payment integration

Requirements:
- Keep it under 200 words
- Professional but friendly tone
- Include: highlights, blockers, next week
- Format for Slack post

[Claude generates formatted status update]

User: Good, but emphasize the dashboard launch more - it was a big deal`
        }
      ],
      exercise: {
        type: 'build',
        instructions: 'Choose a real work task you do regularly. Create a detailed prompt template for Claude to help with this task. Include: the context Claude needs, the specific task, format requirements, and any constraints. Then test it with a real example.',
        hints: [
          'Think about a task you do at least weekly',
          'Include all the context you usually have to gather',
          'Specify the exact format you need the output in'
        ],
        validationCriteria: [
          'Template addresses a genuine recurring task',
          'Includes necessary context for Claude',
          'Specifies clear output requirements',
          'Could be reused with minimal changes'
        ]
      }
    } as LevelContent
  }
];

export default claudeChatLevels;
