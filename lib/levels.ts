// ============================================================================
// Claude Quest - Complete Level Data
// All 10 levels (0-9) for the Claude AI learning platform
// ============================================================================

export interface ValidationRuleData {
  type: 'minLength' | 'containsAny' | 'containsAll' | 'regex' | 'notContains';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: any;
  message: string;
  hint?: string;
}

export interface TaskData {
  id: number;
  type: 'learn' | 'task' | 'simulator';
  title: string;
  content?: string;
  description?: string;
  originalPrompt?: string;
  taskConfig?: {
    placeholder: string;
    validationRules: ValidationRuleData[];
    successMessage: string;
    exampleOutput?: string;
  };
  simulatorConfig?: {
    suggestedPrompts: string[];
    responses?: Record<string, string>;
  };
}

export interface LevelData {
  id: number;
  title: string;
  description: string;
  emoji: string;
  xp: number;
  estimatedTime: string;
  isPaid: boolean;
  skills: string[];
  color: string;
  tasks: TaskData[];
}

// ============================================================================
// Validation Rule Resolver
// Converts declarative ValidationRuleData into executable check functions
// ============================================================================

export function resolveValidationRule(rule: ValidationRuleData): {
  check: (input: string) => boolean;
  message: string;
  hint?: string;
} {
  switch (rule.type) {
    case 'minLength':
      return {
        check: (input: string) => input.length >= rule.params.min,
        message: rule.message,
        hint: rule.hint,
      };

    case 'containsAny':
      return {
        check: (input: string) => {
          const words: string[] = rule.params.words;
          return words.some((word) =>
            new RegExp(word, 'i').test(input)
          );
        },
        message: rule.message,
        hint: rule.hint,
      };

    case 'containsAll':
      return {
        check: (input: string) => {
          const words: string[] = rule.params.words;
          return words.every((word) =>
            new RegExp(word, 'i').test(input)
          );
        },
        message: rule.message,
        hint: rule.hint,
      };

    case 'regex':
      return {
        check: (input: string) => {
          const pattern = new RegExp(
            rule.params.pattern,
            rule.params.flags || 'i'
          );
          return pattern.test(input);
        },
        message: rule.message,
        hint: rule.hint,
      };

    case 'notContains':
      return {
        check: (input: string) =>
          !new RegExp(rule.params.text, 'i').test(input),
        message: rule.message,
        hint: rule.hint,
      };

    default:
      return {
        check: () => true,
        message: rule.message,
        hint: rule.hint,
      };
  }
}

// ============================================================================
// Level Data
// ============================================================================

export const levels: LevelData[] = [
  // ==========================================================================
  // LEVEL 0: Claude Fundamentals (FREE)
  // ==========================================================================
  {
    id: 0,
    title: 'The Foundation',
    description:
      'What Claude actually is, how to talk to it, and why your first prompt matters more than you think.',
    emoji: '🎯',
    xp: 100,
    estimatedTime: '15 min',
    isPaid: false,
    skills: [
      'Understanding Claude',
      'Basic Prompting',
      'Prompt Clarity',
      'Knowing Limitations',
    ],
    color: 'from-green-500 to-emerald-500',
    tasks: [
      {
        id: 1,
        type: 'learn',
        title: 'What is Claude?',
        content: `Claude is an AI assistant made by **Anthropic**. Not OpenAI. Not Google. Anthropic — a company built specifically around AI safety.

**Here's what Claude can actually do for you:**

- **Write anything** — emails, blog posts, code, marketing copy, legal summaries, creative fiction. Name it.
- **Think through problems** — break down complex decisions, compare tradeoffs, brainstorm from angles you hadn't considered.
- **Analyze and summarize** — drop in a 50-page document and get the key points in 30 seconds.
- **Write and debug code** — Python, JavaScript, SQL, and dozens more. Claude can explain what code does, find bugs, and suggest fixes.
- **Learn with you** — explain quantum physics to a 10-year-old or walk a senior engineer through a new framework. Claude adapts.

**What Claude won't do:**

- Browse the internet live. Claude has a knowledge cutoff and may not know about yesterday's news.
- Be right 100% of the time. Always verify anything high-stakes — medical, legal, financial.
- Replace your judgment. Claude is a thinking partner, not an oracle.

The single most important thing to know: **the quality of Claude's output depends on the quality of your input.** A vague question gets a vague answer. A specific, well-structured prompt gets something genuinely useful. That's what the rest of this course is about.`,
      },
      {
        id: 2,
        type: 'task',
        title: 'Write Your First Effective Prompt',
        description:
          'Write a prompt asking Claude to help you plan a small event. Your prompt should be specific, include context about the audience, and request a particular format for the response.',
        taskConfig: {
          placeholder:
            'Write your prompt here... (e.g., "Help me plan a birthday party for...")',
          validationRules: [
            {
              type: 'minLength',
              params: { min: 50 },
              message:
                'Your prompt should be at least 50 characters. Add more detail!',
              hint: 'Good prompts are specific. Try describing the type of event, who it is for, and what format you want the answer in.',
            },
            {
              type: 'containsAny',
              params: {
                words: [
                  'party',
                  'event',
                  'meeting',
                  'celebration',
                  'gathering',
                ],
              },
              message:
                'Mention the type of event you are planning (e.g., party, meeting, celebration).',
              hint: 'Be explicit about the kind of event: a birthday party, a team meeting, a holiday celebration, etc.',
            },
            {
              type: 'regex',
              params: {
                pattern:
                  'for|age|people|guests|audience|who',
                flags: 'i',
              },
              message:
                'Include context about who the event is for (audience, age group, number of guests).',
              hint: 'Tell Claude who will be attending. For example: "for a group of 10 coworkers" or "for my 7-year-old daughter."',
            },
            {
              type: 'regex',
              params: {
                pattern:
                  'list|table|steps|numbered|bullet|format|organize',
                flags: 'i',
              },
              message:
                'Request a specific format (e.g., a list, table, numbered steps).',
              hint: 'Ask Claude to organize the output in a particular way: "Give me a numbered list," "Organize this into a table," etc.',
            },
          ],
          successMessage:
            'Excellent prompt! You included specificity, context, and format - the three keys to great prompts!',
          exampleOutput:
            'Example: "Help me plan a dinosaur-themed birthday party for my 7-year-old. There will be 12 kids attending. Give me a numbered list of 5 activity ideas, a themed menu in a table, and a timeline for the day."',
        },
      },
      {
        id: 3,
        type: 'simulator',
        title: 'Practice: Chat with Claude',
        description:
          'Try chatting with Claude using what you have learned so far. Experiment with different types of prompts and see how Claude responds.',
        simulatorConfig: {
          suggestedPrompts: [
            'What can you help me with?',
            "I'm planning a dinosaur birthday party for my 7-year-old. Give me 3 activity ideas and a themed menu in a table.",
            'How do I write better prompts?',
          ],
        },
      },
      {
        id: 4,
        type: 'task',
        title: 'Improve a Bad Prompt',
        description:
          'The prompt below is too vague. Rewrite it to be specific, include an audience, specify a format, and focus on a particular topic.',
        originalPrompt: 'Write about dogs.',
        taskConfig: {
          placeholder:
            'Rewrite the prompt to be specific and effective...',
          validationRules: [
            {
              type: 'minLength',
              params: { min: 60 },
              message:
                'Your improved prompt should be at least 60 characters long.',
              hint: 'A good prompt is detailed. Specify the topic, audience, and format.',
            },
            {
              type: 'notContains',
              params: { text: 'write about dogs' },
              message:
                'Your prompt should not just repeat "Write about dogs." Make it more specific!',
              hint: 'Replace the vague instruction with something targeted, such as a specific breed, care tips, or training advice.',
            },
            {
              type: 'containsAny',
              params: {
                words: [
                  'breed',
                  'training',
                  'care',
                  'health',
                  'behavior',
                  'golden',
                  'puppy',
                  'senior',
                  'rescue',
                ],
              },
              message:
                'Focus on a specific dog topic (breed, training, care, health, behavior, etc.).',
              hint: 'Narrow the topic: instead of "dogs," write about "training a golden retriever puppy" or "senior dog health tips."',
            },
            {
              type: 'containsAny',
              params: {
                words: [
                  'blog',
                  'article',
                  'guide',
                  'tips',
                  'list',
                  'step',
                  'paragraph',
                  'word',
                ],
              },
              message:
                'Specify the format or type of content (blog post, guide, tips list, etc.).',
              hint: 'Tell Claude what kind of output you want: a blog post, a numbered list of tips, a step-by-step guide, etc.',
            },
            {
              type: 'containsAny',
              params: {
                words: [
                  'owner',
                  'beginner',
                  'first-time',
                  'new',
                  'people',
                  'reader',
                  'audience',
                ],
              },
              message:
                'Include who the content is for (new owners, beginners, experienced readers, etc.).',
              hint: 'Define the audience: "for first-time dog owners," "for people considering adopting a rescue," etc.',
            },
          ],
          successMessage:
            'Great work! Your improved prompt is specific, targeted, and tells Claude exactly what you need. This is a huge improvement over "Write about dogs."',
          exampleOutput:
            'Example: "Write a 500-word blog post for first-time dog owners about the top 5 training tips for golden retriever puppies. Use a friendly tone and include a numbered list."',
        },
      },
      {
        id: 5,
        type: 'learn',
        title: 'Understanding Limitations',
        content: `Every powerful tool has boundaries. Understanding Claude's limitations will help you use it more effectively and avoid common pitfalls.

**Knowledge cutoff**

• Claude's training data has a cutoff date. It does not have access to real-time information, live news, or events that happened after its training period.

• If you need current information, verify Claude's answers against up-to-date sources.

**Hallucinations**

• Claude can sometimes generate information that sounds confident and plausible but is actually incorrect. This is called a "hallucination."

• This is especially common with specific facts like names, dates, statistics, URLs, and citations.

• **Always verify** critical facts, especially for professional, medical, legal, or financial purposes.

**No long-term memory**

• By default, Claude does not remember previous conversations. Each new conversation starts fresh.

• Claude Projects can provide persistent context, but Claude itself does not learn or update from your interactions.

**Not a replacement for experts**

• Claude is a powerful assistant, but it is not a substitute for professional advice from doctors, lawyers, financial advisors, or other domain experts.

• Use Claude to research and prepare, but consult qualified professionals for critical decisions.

**Ethical boundaries**

• Claude is designed to be helpful, harmless, and honest. It will decline requests that involve harmful, illegal, or unethical content.

• These guardrails are intentional and make Claude a safer tool for everyone.

**Best practice:** Treat Claude as a highly capable collaborator with specific limitations. Verify important information, provide clear context, and use it to augment your own expertise rather than replace it.`,
      },
    ],
  },

  // ==========================================================================
  // LEVEL 1: Advanced Prompting (PRO)
  // ==========================================================================
  {
    id: 1,
    title: 'Prompt Engineering',
    description:
      'Role prompts, chain-of-thought, few-shot — the techniques that separate amateurs from power users.',
    emoji: '🎭',
    xp: 150,
    estimatedTime: '25 min',
    isPaid: true,
    skills: [
      'Role Prompting',
      'Chain-of-Thought',
      'Few-Shot Learning',
      'Prompt Engineering',
    ],
    color: 'from-orange-500 to-amber-500',
    tasks: [
      {
        id: 1,
        type: 'learn',
        title: 'Role Prompting',
        content: `**Role prompting** is one of the most powerful techniques for getting better results from Claude. By assigning Claude a specific persona, you shape the tone, depth, and style of its responses.

**What is role prompting?**

• You tell Claude to "act as" or "be" a specific type of expert or character.

• This primes Claude to respond with the knowledge, vocabulary, and perspective of that role.

**Why it works:**

• Claude has been trained on text from many domains. When you assign a role, you help Claude focus on the most relevant knowledge and communication style.

• A prompt like "You are a senior Python developer reviewing code for a junior engineer" produces very different output than just "Review this code."

**How to write effective role prompts:**

• **Be specific about the role:** "You are a senior Python developer with 10 years of experience in backend systems" is better than "You are a programmer."

• **Set the tone:** "Explain in a friendly, encouraging tone suitable for a beginner" vs. "Be concise and technical."

• **Define the task clearly:** After setting the role, describe exactly what you want Claude to do.

**Example:**

"You are a senior Python developer reviewing code for a junior engineer. Review the following function for bugs, performance issues, and readability. Provide your feedback as a numbered list, and suggest improved code where appropriate."

**Common roles to try:**

• Technical writer, marketing strategist, data analyst, UX researcher, product manager, teacher, debate coach, career counselor

**Tip:** You can combine roles with other techniques. For example, give Claude a role AND ask it to think step by step for even better results.`,
      },
      {
        id: 2,
        type: 'task',
        title: 'Write a Role-Based Prompt',
        description:
          'Write a prompt that assigns Claude a specific role or persona, gives it a clear task, and requests a structured format for the response.',
        taskConfig: {
          placeholder:
            'Write a role-based prompt... (e.g., "You are a...")',
          validationRules: [
            {
              type: 'containsAny',
              params: {
                words: [
                  'you are',
                  'act as',
                  'role',
                  'persona',
                  'expert',
                ],
              },
              message:
                'Assign Claude a specific role (e.g., "You are a...", "Act as a...").',
              hint: 'Start with a role assignment like "You are a senior data analyst" or "Act as an experienced marketing strategist."',
            },
            {
              type: 'minLength',
              params: { min: 80 },
              message:
                'Your prompt should be at least 80 characters. Add more detail about the task and context.',
              hint: 'Include who Claude is, what it should do, and any relevant context about the situation.',
            },
            {
              type: 'containsAny',
              params: {
                words: [
                  'specific',
                  'context',
                  'task',
                  'help',
                  'create',
                  'analyze',
                ],
              },
              message:
                'Include a clear task or context for Claude to work with.',
              hint: 'After setting the role, give Claude a specific task: analyze something, create a plan, review a document, etc.',
            },
            {
              type: 'containsAny',
              params: {
                words: [
                  'format',
                  'list',
                  'step',
                  'bullet',
                  'table',
                  'structure',
                ],
              },
              message:
                'Request a specific output format (list, steps, table, etc.).',
              hint: 'Tell Claude how to structure the response: "Provide your analysis as a bulleted list" or "Give me a step-by-step plan."',
            },
          ],
          successMessage:
            'Well done! Your role-based prompt gives Claude a clear identity, task, and format. This technique dramatically improves response quality.',
          exampleOutput:
            'Example: "You are a senior UX researcher. Analyze the following user feedback and identify the top 3 usability issues. Present your findings in a table with columns for Issue, Severity, and Recommended Fix."',
        },
      },
      {
        id: 3,
        type: 'learn',
        title: 'Chain-of-Thought Prompting',
        content: `**Chain-of-thought prompting** is a technique where you ask Claude to break a complex problem into steps and reason through each one before giving a final answer.

**Why chain-of-thought works:**

• Complex questions often have multiple parts. When Claude tries to answer in one shot, it may skip important considerations.

• By asking Claude to "think step by step," you encourage it to work through the logic sequentially, which leads to more accurate and thorough answers.

**How to use it:**

• Add phrases like **"Think step by step"**, **"Break this down"**, **"Walk me through your reasoning"**, or **"Analyze each factor before concluding"** to your prompts.

• You can also explicitly list the steps you want Claude to follow.

**Example — without chain-of-thought:**

"Is starting a coffee shop a good idea?"

Claude might give a generic "it depends" answer.

**Example — with chain-of-thought:**

"I am considering opening a coffee shop in a college town with a population of 50,000. Think step by step: analyze the market opportunity, estimate startup costs, identify the target customer, evaluate competition, and then give me your overall recommendation with a confidence level."

This produces a structured, thorough analysis instead of a surface-level response.

**When to use chain-of-thought:**

• Math and logic problems
• Business decisions and strategy
• Comparing multiple options
• Debugging code
• Any task requiring multi-step reasoning

**Pro tip:** Combine chain-of-thought with role prompting for even better results. "You are a business consultant. Think step by step and analyze whether this startup idea is viable."`,
      },
      {
        id: 4,
        type: 'task',
        title: 'Convert to Chain-of-Thought',
        description:
          'The prompt below is too simple and will get a shallow answer. Rewrite it using chain-of-thought prompting so Claude analyzes the problem step by step.',
        originalPrompt: 'Is this business idea good?',
        taskConfig: {
          placeholder:
            'Rewrite the prompt using chain-of-thought reasoning...',
          validationRules: [
            {
              type: 'minLength',
              params: { min: 100 },
              message:
                'Your prompt should be at least 100 characters. Chain-of-thought prompts need more detail.',
              hint: 'Describe the business idea and list the steps Claude should analyze (market, costs, competition, etc.).',
            },
            {
              type: 'containsAny',
              params: {
                words: [
                  'step by step',
                  'think through',
                  'break down',
                  'reason',
                  'analyze each',
                  'consider',
                ],
              },
              message:
                'Include chain-of-thought instructions (e.g., "think step by step", "break down", "analyze each").',
              hint: 'Explicitly tell Claude to reason through the problem: "Think step by step" or "Break down each factor."',
            },
            {
              type: 'containsAny',
              params: {
                words: [
                  'market',
                  'customer',
                  'revenue',
                  'cost',
                  'competition',
                  'feasibility',
                ],
              },
              message:
                'Include specific business factors to analyze (market, customers, revenue, costs, competition).',
              hint: 'List the dimensions you want Claude to evaluate: market size, target customer, revenue model, startup costs, competitive landscape, etc.',
            },
            {
              type: 'notContains',
              params: { text: 'is this business idea good' },
              message:
                'Do not just repeat the original prompt. Rewrite it with more depth and structure.',
              hint: 'Replace the vague question with specific analysis steps and context about the business idea.',
            },
          ],
          successMessage:
            'Excellent! Your chain-of-thought prompt will produce a much more thorough and useful analysis. Claude will now reason through each factor before concluding.',
          exampleOutput:
            'Example: "I want to start a meal prep delivery service for busy professionals in Austin, TX. Think step by step: 1) Analyze the target market and demand, 2) Estimate startup and monthly costs, 3) Identify competitors, 4) Evaluate the revenue model, 5) Give me your overall feasibility assessment with a confidence score."',
        },
      },
      {
        id: 5,
        type: 'simulator',
        title: 'Practice: Few-Shot Learning',
        description:
          'Few-shot learning means giving Claude examples of the input-output pattern you want before asking it to do the actual task. Practice this technique in the simulator.',
        simulatorConfig: {
          suggestedPrompts: [
            'Show me an example of few-shot prompting',
            'How do I use chain-of-thought?',
            'Give me a role prompting template',
          ],
        },
      },
    ],
  },

  // ==========================================================================
  // LEVEL 2: Claude Projects (PRO)
  // ==========================================================================
  {
    id: 2,
    title: 'Projects & Context',
    description:
      'Stop repeating yourself. Give Claude persistent memory and watch everything click.',
    emoji: '📁',
    xp: 150,
    estimatedTime: '20 min',
    isPaid: true,
    skills: [
      'Project Setup',
      'Custom Instructions',
      'Knowledge Management',
      'Workspace Organization',
    ],
    color: 'from-blue-500 to-cyan-500',
    tasks: [
      {
        id: 1,
        type: 'learn',
        title: 'What are Projects?',
        content: `**Claude Projects** are persistent workspaces that give Claude ongoing context about your work. Instead of re-explaining everything in every conversation, you set it up once and Claude remembers.

**Key features of Projects:**

• **Persistent conversations** — All chats within a Project share the same context. Claude understands the bigger picture of what you are working on across multiple conversations.

• **Custom instructions** — You write a set of rules and guidelines that Claude follows in every conversation within that Project. This is like giving Claude a permanent briefing.

• **Uploaded knowledge** — You can upload documents, code files, data, and reference materials. Claude can read and reference these files when answering your questions.

• **Organized workspaces** — Keep different areas of work separate. You might have a "Marketing Content" Project, a "Code Review" Project, and a "Research" Project, each with its own instructions and files.

**Why use Projects?**

• **Consistency** — Claude follows the same tone, rules, and style across all conversations in the Project.

• **Efficiency** — No need to re-explain context, upload the same files, or repeat instructions.

• **Quality** — With background knowledge uploaded, Claude gives more accurate, relevant answers.

**Example use cases:**

• A content team uploads their brand voice guidelines and Claude writes all drafts in that voice
• A developer uploads their codebase and Claude helps with code reviews and debugging
• A researcher uploads papers and Claude helps synthesize findings

**Getting started:** On claude.ai, click "Projects" in the sidebar to create your first Project. Give it a name, add instructions, and optionally upload files.`,
      },
      {
        id: 2,
        type: 'task',
        title: 'Write Project Instructions',
        description:
          'Write a set of custom instructions for a Claude Project. These instructions will guide Claude\'s behavior in every conversation within the Project. Include a role, rules/constraints, and formatting preferences.',
        taskConfig: {
          placeholder:
            'Write your Project instructions here...\n\nExample start: "You are a [role]. In this Project, you will help with..."',
          validationRules: [
            {
              type: 'minLength',
              params: { min: 100 },
              message:
                'Project instructions should be at least 100 characters. Add more detail about the role, rules, and format.',
              hint: 'Good Project instructions cover: who Claude is (role), what it should/should not do (rules), and how to format responses (style).',
            },
            {
              type: 'containsAny',
              params: {
                words: [
                  'role',
                  'persona',
                  'act as',
                  'you are',
                  'assistant',
                ],
              },
              message:
                'Define a role or persona for Claude (e.g., "You are a...", "Your role is...").',
              hint: 'Start by telling Claude what role it should play in this Project.',
            },
            {
              type: 'containsAny',
              params: {
                words: [
                  'always',
                  'never',
                  'must',
                  'should',
                  'rule',
                  'guideline',
                  'constraint',
                ],
              },
              message:
                'Include rules or constraints (e.g., "Always...", "Never...", "You must...").',
              hint: 'Set boundaries: "Always cite sources," "Never use jargon," "You must respond in bullet points," etc.',
            },
            {
              type: 'containsAny',
              params: {
                words: [
                  'format',
                  'respond',
                  'output',
                  'structure',
                  'tone',
                  'style',
                ],
              },
              message:
                'Specify formatting or style preferences (tone, structure, output format).',
              hint: 'Tell Claude how to format responses: "Use a professional tone," "Respond with bullet points," "Structure answers with headers."',
            },
          ],
          successMessage:
            'Great Project instructions! These will keep Claude consistent and focused across all conversations in this workspace.',
          exampleOutput:
            'Example: "You are a technical writing assistant for our API documentation team. Always use clear, concise language. Never use jargon without defining it first. Format all code examples with proper syntax highlighting. Respond in a professional but approachable tone. Structure longer answers with headers and bullet points."',
        },
      },
      {
        id: 3,
        type: 'learn',
        title: 'Adding Knowledge to Projects',
        content: `One of the most powerful features of Claude Projects is the ability to **upload documents and files** that Claude can reference in every conversation.

**What you can upload:**

• **Documents** — PDFs, Word docs, text files, markdown files
• **Code files** — Source code in any language, configuration files, scripts
• **Data** — CSV files, JSON data, spreadsheets
• **Reference materials** — Style guides, research papers, internal documentation

**Best practices for uploading knowledge:**

• **Be selective** — Upload the most relevant files. Too many irrelevant documents can dilute Claude's focus.

• **Organize content** — Name files clearly so Claude can reference them. "brand-voice-guide.md" is better than "doc1.pdf".

• **Keep files current** — Update uploaded documents when they change. Claude works with whatever version you have uploaded.

• **Use plain text when possible** — Claude processes plain text and markdown most effectively. If you have a choice, prefer these formats over complex PDFs.

**When to use Projects vs. regular conversations:**

• **Use Projects when:** You have ongoing work with consistent context, you want Claude to follow specific rules every time, you have reference documents Claude needs, or multiple team members will interact with the same context.

• **Use regular conversations when:** You have a one-off question, you are exploring a new topic, or the task does not need persistent context.

**Project knowledge limits:**

• There is a total context window limit for Projects. Very large codebases or document sets may need to be trimmed to the most relevant files.

• Claude reads uploaded files at the start of each conversation, so keep the knowledge base focused and relevant.`,
      },
      {
        id: 4,
        type: 'simulator',
        title: 'Simulate: Project Setup',
        description:
          'Practice setting up a Claude Project by discussing your use case, writing instructions, and planning what knowledge to upload.',
        simulatorConfig: {
          suggestedPrompts: [
            'How do I set up a Project for my team?',
            'What files should I upload to a writing assistant Project?',
            'Help me write Project instructions for a code reviewer',
          ],
        },
      },
    ],
  },

  // ==========================================================================
  // LEVEL 3: Artifacts Fundamentals (PRO)
  // ==========================================================================
  {
    id: 3,
    title: 'Artifacts',
    description:
      'Generate working apps, documents, and interactive tools — right inside the conversation.',
    emoji: '🎨',
    xp: 200,
    estimatedTime: '30 min',
    isPaid: true,
    skills: [
      'Artifact Creation',
      'Interactive Components',
      'Iterative Design',
      'Prompt-to-UI',
    ],
    color: 'from-orange-500 to-red-500',
    tasks: [
      {
        id: 1,
        type: 'learn',
        title: 'What are Artifacts?',
        content: `**Artifacts** are self-contained pieces of content that Claude creates and displays in a dedicated panel alongside the conversation. They are one of Claude's most visually impressive features.

**Types of Artifacts:**

• **React components** — Interactive web applications with state, buttons, forms, and real-time updates. Claude uses React with Tailwind CSS for styling.

• **HTML pages** — Complete web pages with HTML, CSS, and JavaScript. Great for landing pages, dashboards, and static content.

• **SVG graphics** — Scalable vector graphics for diagrams, illustrations, icons, and data visualizations.

• **Markdown documents** — Formatted text documents with headers, lists, tables, and more. Perfect for reports, guides, and documentation.

• **Code files** — Complete code files in any language, displayed with syntax highlighting.

**When does Claude create Artifacts?**

• When you ask for something **visual or interactive** — "Build me a calculator," "Create a chart," "Design a landing page"

• When the content is **substantial and self-contained** — A complete component, document, or application

• When the output benefits from being **displayed separately** from the conversation

**When does Claude NOT create Artifacts?**

• Short code snippets that are part of an explanation
• Simple text responses or answers to questions
• Content that only makes sense in the context of the conversation

**Key things to know:**

• Artifacts render live in the browser — you can interact with React components and HTML pages directly

• You can iterate on Artifacts by asking Claude to modify them — "Make the button blue," "Add a dark mode toggle," "Show the data in a pie chart instead"

• Artifacts have version history, so you can go back to previous versions`,
      },
      {
        id: 2,
        type: 'task',
        title: 'Write an Artifact-Triggering Prompt',
        description:
          'Write a prompt that would cause Claude to create an interactive Artifact. Your prompt should describe something visual, interactive, and styled.',
        taskConfig: {
          placeholder:
            'Write a prompt that triggers an Artifact... (e.g., "Create a...")',
          validationRules: [
            {
              type: 'minLength',
              params: { min: 60 },
              message:
                'Your prompt should be at least 60 characters. Describe the Artifact in more detail.',
              hint: 'Include what the Artifact should do, how it should look, and what users can interact with.',
            },
            {
              type: 'containsAny',
              params: {
                words: [
                  'create',
                  'build',
                  'make',
                  'generate',
                  'design',
                ],
              },
              message:
                'Use an action word that triggers creation (create, build, make, generate, design).',
              hint: 'Start with a clear action: "Create a...", "Build an interactive...", "Design a..."',
            },
            {
              type: 'containsAny',
              params: {
                words: [
                  'interactive',
                  'app',
                  'dashboard',
                  'tool',
                  'calculator',
                  'chart',
                  'form',
                  'website',
                  'page',
                ],
              },
              message:
                'Describe the type of Artifact (app, dashboard, calculator, chart, form, etc.).',
              hint: 'Be specific about what kind of interactive element you want: a calculator, a dashboard, a quiz, a data visualization, etc.',
            },
            {
              type: 'containsAny',
              params: {
                words: [
                  'button',
                  'input',
                  'click',
                  'user',
                  'display',
                  'show',
                  'color',
                  'style',
                ],
              },
              message:
                'Include interactivity or styling details (buttons, inputs, colors, user actions).',
              hint: 'Describe how users will interact with it: "with a button to submit," "with an input field for the user\'s name," "with a clean, modern style."',
            },
          ],
          successMessage:
            'Great Artifact prompt! Claude will create a fully interactive, styled component based on this. Try it in a real Claude conversation!',
          exampleOutput:
            'Example: "Create an interactive tip calculator app with an input for the bill amount, a slider for tip percentage (10-30%), and buttons to split the bill between 1-6 people. Display the results in a clean card with a modern design using green and white colors."',
        },
      },
      {
        id: 3,
        type: 'learn',
        title: 'Iterating on Artifacts',
        content: `One of the best features of Artifacts is that you can **iterate on them** — asking Claude to modify, improve, and build on existing Artifacts.

**How iteration works:**

• After Claude creates an Artifact, you can ask for changes in natural language.

• Claude understands the current state of the Artifact and applies your changes without starting from scratch.

• Each change creates a new version. You can go back to any previous version using the version history.

**Effective iteration prompts:**

• **Style changes:** "Make the background dark," "Use a blue and white color scheme," "Increase the font size"

• **Feature additions:** "Add a reset button," "Include a dark mode toggle," "Show a chart of the results"

• **Layout changes:** "Move the sidebar to the left," "Make it responsive for mobile," "Stack the cards vertically"

• **Bug fixes:** "The total is not calculating correctly," "The button does not work when clicked twice"

• **Content updates:** "Change the title to 'Weekly Report'," "Add a footer with contact info"

**Tips for effective iteration:**

• **Be specific** — "Make it better" is vague. "Add hover effects to the buttons and round the corners to 8px" is actionable.

• **One thing at a time** — For complex changes, ask for one modification per message. This keeps things clean and makes it easier to go back if something breaks.

• **Reference elements** — Refer to specific parts of the Artifact: "the submit button," "the header section," "the chart on the right."

• **Build incrementally** — Start with a basic version and add features one at a time. This produces better results than trying to describe everything upfront.

**Version history:**

• Every change creates a new version
• You can click through versions to compare
• If a change breaks something, go back to the previous version and try a different approach`,
      },
      {
        id: 4,
        type: 'task',
        title: 'Write a React Artifact Prompt',
        description:
          'Write a prompt specifically designed to create a React component Artifact. Include interactivity (state, events), styling details, and a clear description of the user experience.',
        taskConfig: {
          placeholder:
            'Write a prompt for a React Artifact... (e.g., "Build an interactive...")',
          validationRules: [
            {
              type: 'minLength',
              params: { min: 80 },
              message:
                'Your prompt should be at least 80 characters. Describe the component in detail.',
              hint: 'Include what the component does, how users interact with it, and how it should look.',
            },
            {
              type: 'containsAny',
              params: {
                words: [
                  'react',
                  'component',
                  'interactive',
                  'app',
                ],
              },
              message:
                'Mention that you want a React component or interactive app.',
              hint: 'Be explicit: "Create a React component that..." or "Build an interactive app..."',
            },
            {
              type: 'containsAny',
              params: {
                words: [
                  'state',
                  'button',
                  'input',
                  'form',
                  'click',
                  'handle',
                  'event',
                  'user',
                ],
              },
              message:
                'Include interactive elements (state management, buttons, inputs, event handling).',
              hint: 'Describe the interactivity: "with a button that adds items," "with an input field that filters results," "track state for each todo item."',
            },
            {
              type: 'containsAny',
              params: {
                words: [
                  'style',
                  'color',
                  'design',
                  'tailwind',
                  'css',
                  'layout',
                ],
              },
              message:
                'Mention styling or design preferences (colors, layout, Tailwind classes).',
              hint: 'Describe the look: "with a clean modern design," "use Tailwind CSS," "with a dark blue color scheme and rounded cards."',
            },
          ],
          successMessage:
            'Excellent React Artifact prompt! This will generate a fully interactive component. Claude will use React and Tailwind CSS to build it live.',
          exampleOutput:
            'Example: "Build an interactive React component for a habit tracker app. Users can add new habits with an input field and button, toggle habits as complete/incomplete by clicking on them, and see a progress bar showing the percentage completed today. Use Tailwind CSS with a clean design, green for completed habits, and gray for incomplete ones. Include state management for the habit list."',
        },
      },
      {
        id: 5,
        type: 'simulator',
        title: 'Practice: Artifacts',
        description:
          'Experiment with Artifact creation by trying different types of prompts. See how different descriptions lead to different Artifacts.',
        simulatorConfig: {
          suggestedPrompts: [
            'Create a tip calculator app',
            'Build a color palette generator',
            'Make an interactive quiz about space',
          ],
        },
      },
    ],
  },

  // ==========================================================================
  // LEVEL 4: Sharing & Publishing (PRO)
  // ==========================================================================
  {
    id: 4,
    title: 'Share & Collaborate',
    description:
      'Publish what you build. Share artifacts with your team or the world.',
    emoji: '📤',
    xp: 150,
    estimatedTime: '20 min',
    isPaid: true,
    skills: [
      'Publishing Artifacts',
      'Collaboration',
      'Sharing Best Practices',
      'Team Workflows',
    ],
    color: 'from-teal-500 to-cyan-500',
    tasks: [
      {
        id: 1,
        type: 'learn',
        title: 'How to Share Artifacts',
        content: `Claude lets you **share Artifacts** with others so they can view and interact with your creations — even if they do not have a Claude account.

**Published links:**

• When you create an Artifact, you can click **"Publish"** to generate a shareable link.

• Anyone with the link can view and interact with the Artifact in their browser.

• Published Artifacts are hosted by Anthropic and work like standalone web pages.

**Embedding Artifacts:**

• Published Artifacts can be embedded in other websites, blog posts, or documentation.

• This is great for sharing interactive tools, calculators, dashboards, and visualizations with a wider audience.

**Public vs. private sharing:**

• **Published Artifacts** are accessible to anyone with the link. Do not include sensitive or private information in published Artifacts.

• **Conversations** remain private. Publishing an Artifact only shares the Artifact itself, not the conversation that created it.

• You can **unpublish** an Artifact at any time to remove public access.

**Best practices for sharing:**

• **Test before publishing** — Make sure the Artifact works correctly, handles edge cases, and looks good on different screen sizes.

• **Add clear titles and labels** — Since the viewer will not have conversation context, the Artifact should be self-explanatory.

• **Consider your audience** — Design for the people who will use the shared Artifact. Keep the interface intuitive and the purpose clear.

• **Keep it professional** — Published Artifacts reflect on you. Use clean design, proper spelling, and clear language.`,
      },
      {
        id: 2,
        type: 'task',
        title: 'Write a Prompt for a Shareable Tool',
        description:
          'Write a prompt that would create an Artifact designed specifically for sharing with others. Think about what makes a tool shareable: it should be self-explanatory, polished, and useful to the target audience.',
        taskConfig: {
          placeholder:
            'Write a prompt for a shareable tool or app...',
          validationRules: [
            {
              type: 'minLength',
              params: { min: 70 },
              message:
                'Your prompt should be at least 70 characters. Describe the tool and its audience.',
              hint: 'Include what the tool does, who will use it, and why it should look polished.',
            },
            {
              type: 'containsAny',
              params: {
                words: [
                  'share',
                  'publish',
                  'public',
                  'tool',
                  'app',
                  'dashboard',
                ],
              },
              message:
                'Mention that this is meant to be shared or published (tool, app, dashboard).',
              hint: 'Indicate the Artifact is for sharing: "Create a tool I can share with my team" or "Build a public dashboard."',
            },
            {
              type: 'containsAny',
              params: {
                words: [
                  'user',
                  'audience',
                  'people',
                  'team',
                  'client',
                  'customer',
                ],
              },
              message:
                'Specify the target audience (team, clients, customers, public).',
              hint: 'Who will use this? "for my sales team," "for clients reviewing proposals," "for anyone tracking their budget."',
            },
            {
              type: 'containsAny',
              params: {
                words: [
                  'simple',
                  'easy',
                  'intuitive',
                  'clean',
                  'professional',
                  'polished',
                ],
              },
              message:
                'Emphasize usability (simple, intuitive, clean, professional, polished).',
              hint: 'Shared tools need to be self-explanatory. Mention that it should be "easy to use," "clean and professional," or "intuitive for non-technical users."',
            },
          ],
          successMessage:
            'Excellent! This prompt will create a polished, shareable tool. Remember to test your Artifacts before publishing them.',
          exampleOutput:
            'Example: "Create a clean, professional project status dashboard I can share with my client. It should show 5 project milestones with status indicators (complete, in progress, not started), a progress bar for overall completion, and a section for next steps. Make it intuitive and easy to understand for non-technical users."',
        },
      },
      {
        id: 3,
        type: 'learn',
        title: 'Collaboration with Artifacts',
        content: `Artifacts are not just for solo use — they are powerful **collaboration tools** that enable team workflows and iterative creation.

**Remixing:**

• When someone shares an Artifact with you, you can **remix** it — take the Artifact into your own Claude conversation and modify it.

• This is great for building on someone else's work: take a template, customize it for your needs, and publish your version.

• Remixing encourages a "building blocks" approach where the team creates reusable components.

**Team workflows:**

• **Templates** — Create standard Artifacts (report templates, dashboards, calculators) that the whole team can use and customize.

• **Handoffs** — Build an initial version and share it with a teammate who can iterate on it in their own conversation.

• **Reviews** — Share an Artifact with your team for feedback, then incorporate their suggestions in subsequent iterations.

**Iterating on shared Artifacts:**

• When you share an Artifact and get feedback, you can go back to your conversation and ask Claude to make the changes.

• Each iteration creates a new version, so you can track the evolution of the Artifact.

• Republish after making changes to update the shared link with the latest version.

**Best practices for team collaboration:**

• **Document your Artifacts** — Include a title, description, and usage instructions within the Artifact itself so teammates know how to use it.

• **Version communication** — Let your team know when you have updated a shared Artifact. Include a changelog if the changes are significant.

• **Standardize formats** — Agree on common color schemes, layouts, and component patterns to keep team Artifacts consistent.

• **Start simple** — Begin with a basic version and iterate based on team feedback rather than trying to build the perfect version on the first try.`,
      },
      {
        id: 4,
        type: 'simulator',
        title: 'Practice: Shareable Content',
        description:
          'Practice creating content designed for sharing. Think about what would be useful to others and how to make it polished and self-explanatory.',
        simulatorConfig: {
          suggestedPrompts: [
            'Create a budget tracker I can share with my team',
            'Build a meeting agenda template',
            'Design a project status dashboard',
          ],
        },
      },
    ],
  },

  // ==========================================================================
  // LEVEL 5: Claude Desktop (PRO)
  // ==========================================================================
  {
    id: 5,
    title: 'Claude Desktop',
    description:
      'Claude on your machine. Read local files, access your tools, work offline.',
    emoji: '💻',
    xp: 250,
    estimatedTime: '40 min',
    isPaid: true,
    skills: [
      'Desktop Setup',
      'Local File Access',
      'System Integration',
      'Desktop Workflows',
    ],
    color: 'from-amber-500 to-orange-500',
    tasks: [
      {
        id: 1,
        type: 'learn',
        title: 'Desktop vs. Web',
        content: `**Claude Desktop** is a native application that brings Claude to your computer with capabilities that go beyond the web interface.

**Local file access:**

• Claude Desktop can read files directly from your computer — documents, code files, images, and more.

• Instead of copying and pasting content into the chat, you can point Claude to files on your local machine.

• This is especially powerful for working with large codebases, document sets, and data files.

**MCP (Model Context Protocol) support:**

• Claude Desktop supports **MCP**, a protocol that lets Claude connect to external tools, databases, APIs, and services.

• Through MCP, Claude can interact with your development environment, databases, file system, and third-party services.

• This transforms Claude from a chat assistant into an integrated tool in your workflow.

**Offline capabilities:**

• Claude Desktop provides a native experience with system-level integration.

• It lives in your taskbar/dock for quick access and supports keyboard shortcuts for rapid interaction.

**System integration:**

• **Keyboard shortcuts** — Quickly invoke Claude from anywhere on your computer.

• **Drag and drop** — Drop files directly into the Claude window for analysis.

• **Native notifications** — Get notified when Claude completes long-running tasks.

**When to use Desktop vs. Web:**

• **Desktop** — Working with local files, using MCP integrations, wanting a dedicated app experience, developer workflows
• **Web** — Quick questions, Artifact creation and sharing, working from any device, collaboration features`,
      },
      {
        id: 2,
        type: 'learn',
        title: 'Setting Up Claude Desktop',
        content: `Getting Claude Desktop installed and configured is straightforward. Here is everything you need to know.

**Installation:**

• Download Claude Desktop from **Anthropic's official website** (claude.ai/download).

• Available for **macOS** and **Windows**. Linux support may be available or coming soon.

• Install it like any other desktop application — drag to Applications (macOS) or run the installer (Windows).

**Configuration:**

• Claude Desktop stores its configuration in a JSON file called **claude_desktop_config.json**.

• **macOS location:** ~/Library/Application Support/Claude/claude_desktop_config.json

• **Windows location:** %APPDATA%\\Claude\\claude_desktop_config.json

**The config file structure:**

The configuration file is where you set up MCP servers and other settings. A basic config file looks like this:

\`\`\`json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/directory"]
    }
  }
}
\`\`\`

**First-time setup tips:**

• **Sign in** with your Claude account (same credentials as claude.ai).

• **Explore the interface** — it looks similar to the web version but with additional options for local file access.

• **Set up at least one MCP server** to unlock the full potential of Claude Desktop (covered in the MCP level).

• **Learn the keyboard shortcut** for quick access — this will become your most-used shortcut.

**Updating:**

• Claude Desktop updates automatically. You will be notified when a new version is available.

• Always keep the app updated for the latest features and security patches.`,
      },
      {
        id: 3,
        type: 'task',
        title: 'Describe a Desktop Workflow',
        description:
          'Describe a workflow that takes advantage of Claude Desktop\'s unique capabilities: local file access, MCP connections, and system integration. Think about something you do regularly that could be enhanced by having Claude access your local files.',
        taskConfig: {
          placeholder:
            'Describe a workflow using Claude Desktop...',
          validationRules: [
            {
              type: 'minLength',
              params: { min: 80 },
              message:
                'Your workflow description should be at least 80 characters. Add more detail.',
              hint: 'Describe the full workflow: what files you would access, what Claude would do with them, and what the output would be.',
            },
            {
              type: 'containsAny',
              params: {
                words: [
                  'file',
                  'local',
                  'folder',
                  'directory',
                  'document',
                  'desktop',
                ],
              },
              message:
                'Reference local files, folders, or desktop features.',
              hint: 'Mention specific local resources: "read files from my project folder," "analyze documents on my desktop," "access my local codebase."',
            },
            {
              type: 'containsAny',
              params: {
                words: [
                  'read',
                  'write',
                  'access',
                  'analyze',
                  'process',
                  'search',
                  'open',
                ],
              },
              message:
                'Describe what Claude will do with the files (read, analyze, process, etc.).',
              hint: 'Be specific about the action: "read and summarize," "analyze for patterns," "process and generate a report."',
            },
            {
              type: 'containsAny',
              params: {
                words: [
                  'workflow',
                  'automate',
                  'task',
                  'project',
                  'productivity',
                ],
              },
              message:
                'Frame it as a workflow or productivity improvement.',
              hint: 'Explain how this workflow improves your productivity: "This workflow automates my weekly report generation" or "This task saves me an hour of manual review."',
            },
          ],
          successMessage:
            'Great workflow design! This takes full advantage of Claude Desktop\'s local capabilities. Try setting this up in Claude Desktop.',
          exampleOutput:
            'Example: "Every Monday, I would use Claude Desktop to read all the markdown files in my project\'s /docs folder, analyze them for outdated information, and generate a report listing which documents need updates. Claude would access the local files directly, compare the content against current best practices, and automate what normally takes me 2 hours of manual review."',
        },
      },
      {
        id: 4,
        type: 'simulator',
        title: 'Practice: Desktop Prompts',
        description:
          'Practice writing prompts that leverage Claude Desktop features. Think about workflows involving local files, system integration, and MCP.',
        simulatorConfig: {
          suggestedPrompts: [
            'How do I analyze files on my desktop with Claude?',
            "What can Claude Desktop do that the web can't?",
            'Help me set up a local file workflow',
          ],
        },
      },
    ],
  },

  // ==========================================================================
  // LEVEL 6: MCP (Model Context Protocol) (PRO)
  // ==========================================================================
  {
    id: 6,
    title: 'MCP',
    description:
      'The protocol that turns Claude into a platform. Connect databases, APIs, anything.',
    emoji: '🔌',
    xp: 300,
    estimatedTime: '45 min',
    isPaid: true,
    skills: [
      'MCP Architecture',
      'Server Configuration',
      'Tool Integration',
      'Workflow Automation',
    ],
    color: 'from-teal-500 to-green-500',
    tasks: [
      {
        id: 1,
        type: 'learn',
        title: 'What is MCP?',
        content: `**MCP (Model Context Protocol)** is an open protocol that lets Claude connect to external tools, data sources, and services. Think of it as a universal adapter that gives Claude superpowers beyond text generation.

**The MCP architecture:**

• **Host** — The application running Claude (e.g., Claude Desktop). The host manages the connection between Claude and MCP servers.

• **Client** — The MCP client inside the host application. It communicates with MCP servers on Claude's behalf.

• **Server** — An MCP server provides specific capabilities: reading files, querying databases, calling APIs, etc. Each server exposes a set of "tools" that Claude can use.

**Why MCP matters:**

• Without MCP, Claude is limited to the text you paste into the conversation. With MCP, Claude can **reach out** and interact with external systems.

• MCP is an **open standard**, meaning anyone can build MCP servers. There is a growing ecosystem of community-built servers for popular tools and services.

• MCP enables **real automation** — Claude can read your files, query your database, update your project management tool, and more.

**What Claude can do with MCP:**

• **Read and write files** on your local machine
• **Query databases** (PostgreSQL, SQLite, etc.)
• **Call APIs** (GitHub, Slack, Jira, etc.)
• **Search the web** for current information
• **Run code** in sandboxed environments
• **Interact with development tools** (git, npm, docker, etc.)

**Key concept:** MCP follows a permission model. You explicitly configure which servers Claude can access, and each server defines what operations are allowed. Claude cannot access anything you have not configured.`,
      },
      {
        id: 2,
        type: 'learn',
        title: 'MCP Server Types',
        content: `MCP servers come in many flavors, each designed to give Claude access to different tools and data sources.

**Filesystem server:**

• Gives Claude read/write access to specified directories on your computer.
• You control which directories Claude can access.
• Great for code review, document analysis, and file management.

\`\`\`json
{
  "filesystem": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/you/projects"]
  }
}
\`\`\`

**Database servers:**

• Connect Claude to PostgreSQL, SQLite, MySQL, and other databases.
• Claude can query, analyze, and even modify data (if configured).
• Powerful for data analysis, reporting, and database management.

**API servers:**

• Connect Claude to web services: GitHub, Slack, Google Drive, Notion, Jira, and many more.
• Claude can read issues, send messages, update documents, and more.

**Community servers:**

• The MCP ecosystem is growing rapidly. Community-built servers cover a wide range of tools and services.
• Check the official MCP repository and community directories for available servers.

**Configuration in claude_desktop_config.json:**

All MCP servers are configured in the same file:

\`\`\`json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/dir"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "your-token-here"
      }
    }
  }
}
\`\`\`

**Common runtime commands:**

• **npx** — Runs Node.js-based MCP servers (most common)
• **uvx** or **python** — Runs Python-based MCP servers
• **node** — Runs local Node.js scripts as MCP servers
• **docker** — Runs containerized MCP servers for isolation

**Security tip:** Always review what permissions an MCP server requires before configuring it. Only grant the minimum access needed.`,
      },
      {
        id: 3,
        type: 'task',
        title: 'Write an MCP Config Snippet',
        description:
          'Write a JSON configuration snippet for an MCP server. It should include the server name, command to run, and any necessary arguments.',
        taskConfig: {
          placeholder:
            'Write your MCP config JSON...\n\n{\n  "mcpServers": {\n    ...\n  }\n}',
          validationRules: [
            {
              type: 'containsAny',
              params: {
                words: [
                  'mcpServers',
                  'command',
                  'args',
                  'server',
                ],
              },
              message:
                'Include MCP config keys: mcpServers, command, args.',
              hint: 'An MCP config needs at minimum: "mcpServers" as the top-level key, "command" for the runtime, and "args" for the server arguments.',
            },
            {
              type: 'containsAny',
              params: {
                words: ['npx', 'node', 'python', 'uvx', 'docker'],
              },
              message:
                'Specify a runtime command (npx, node, python, uvx, or docker).',
              hint: 'The "command" field should be a runtime: "npx" for Node.js servers, "python" or "uvx" for Python servers, "docker" for containerized servers.',
            },
            {
              type: 'minLength',
              params: { min: 40 },
              message:
                'Your config should be at least 40 characters. Include more detail.',
              hint: 'A valid config has the mcpServers object, a named server, a command, and args array.',
            },
          ],
          successMessage:
            'Valid MCP config! You can paste this into your claude_desktop_config.json to connect Claude to this tool.',
          exampleOutput:
            'Example:\n{\n  "mcpServers": {\n    "filesystem": {\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/me/documents"]\n    }\n  }\n}',
        },
      },
      {
        id: 4,
        type: 'task',
        title: 'Describe an MCP Use Case',
        description:
          'Describe a real-world use case where MCP would significantly improve your workflow. Explain what data or service you would connect, what Claude would do with it, and how it would improve your productivity.',
        taskConfig: {
          placeholder:
            'Describe your MCP use case...',
          validationRules: [
            {
              type: 'minLength',
              params: { min: 80 },
              message:
                'Your description should be at least 80 characters. Include more detail about the use case.',
              hint: 'Describe the data source, what Claude would do, and why it matters for your workflow.',
            },
            {
              type: 'containsAny',
              params: {
                words: [
                  'data',
                  'file',
                  'database',
                  'api',
                  'service',
                  'tool',
                  'server',
                ],
              },
              message:
                'Mention the data source or service you would connect (files, database, API, etc.).',
              hint: 'Be specific: "Connect Claude to my PostgreSQL database," "Give Claude access to my project files," "Integrate with the GitHub API."',
            },
            {
              type: 'containsAny',
              params: {
                words: [
                  'connect',
                  'integrate',
                  'access',
                  'read',
                  'write',
                  'query',
                  'fetch',
                ],
              },
              message:
                'Describe the action Claude would take (connect, read, query, fetch, etc.).',
              hint: 'Explain what Claude does with the connection: "query the database for sales data," "read files and generate summaries," "fetch issues from GitHub."',
            },
            {
              type: 'containsAny',
              params: {
                words: [
                  'automate',
                  'workflow',
                  'productivity',
                  'efficiency',
                ],
              },
              message:
                'Explain the workflow or productivity benefit.',
              hint: 'Frame the benefit: "This automates my weekly reporting workflow" or "This improves efficiency by eliminating manual data entry."',
            },
          ],
          successMessage:
            'Great MCP use case! This is exactly the kind of integration that makes Claude Desktop + MCP so powerful.',
          exampleOutput:
            'Example: "I would connect Claude to my company\'s PostgreSQL database using the MCP database server. Claude could query sales data, generate weekly performance reports, and identify trends — automating a workflow that currently takes our team 3 hours every Monday."',
        },
      },
      {
        id: 5,
        type: 'simulator',
        title: 'Practice: MCP',
        description:
          'Practice designing MCP integrations and understanding how Claude can interact with external systems.',
        simulatorConfig: {
          suggestedPrompts: [
            'How do I connect Claude to my database?',
            'What MCP servers are available?',
            'Help me configure a filesystem MCP server',
          ],
        },
      },
    ],
  },

  // ==========================================================================
  // LEVEL 7: Web & Desktop Connectors (PRO)
  // ==========================================================================
  {
    id: 7,
    title: 'Integrations',
    description:
      'Wire Claude into your actual stack — Gmail, Drive, Notion, Slack, and more.',
    emoji: '🔗',
    xp: 200,
    estimatedTime: '30 min',
    isPaid: true,
    skills: [
      'Service Integration',
      'Automation Design',
      'Security Best Practices',
      'Connector Workflows',
    ],
    color: 'from-amber-500 to-orange-500',
    tasks: [
      {
        id: 1,
        type: 'learn',
        title: 'Integration Capabilities',
        content: `Claude can connect to a wide range of popular services and tools, transforming it from a standalone assistant into an integrated part of your digital workflow.

**Gmail integration:**

• Claude can read, search, and draft emails.
• Use Claude to summarize long email threads, draft professional responses, and organize your inbox.
• Example: "Summarize the last 5 emails from my manager and draft a response to the most urgent one."

**Google Drive integration:**

• Claude can access documents, spreadsheets, and files stored in Google Drive.
• Read and analyze documents, extract information from spreadsheets, and create new content based on existing files.
• Example: "Read my Q4 sales report from Google Drive and create a summary with key takeaways."

**Notion integration:**

• Claude can read and update Notion pages, databases, and workspaces.
• Great for project management, knowledge base maintenance, and content creation.
• Example: "Update my Notion project board with the latest sprint tasks."

**Slack integration:**

• Claude can read messages, send responses, and interact with Slack channels.
• Automate team communications, summarize channel activity, and respond to common questions.
• Example: "Summarize what was discussed in the #engineering channel today."

**Zapier integration:**

• Zapier acts as a bridge to thousands of apps and services.
• Create automated workflows (Zaps) that trigger Claude actions based on events in other apps.
• Example: "When a new support ticket is created in Zendesk, have Claude draft an initial response."

**How to connect:**

• Some integrations are built into Claude directly (check Settings on claude.ai).
• Others use MCP servers (configured in Claude Desktop).
• Zapier provides the broadest connectivity for services without native MCP servers.`,
      },
      {
        id: 2,
        type: 'task',
        title: 'Design an Automation Workflow',
        description:
          'Design a workflow that connects Claude to one or more services. Describe the trigger, the actions Claude takes, and the expected outcome.',
        taskConfig: {
          placeholder:
            'Describe your automation workflow...\n\n"When [trigger], Claude will [action], resulting in [outcome]..."',
          validationRules: [
            {
              type: 'minLength',
              params: { min: 80 },
              message:
                'Your workflow should be at least 80 characters. Include the trigger, actions, and outcome.',
              hint: 'Describe the full flow: what event starts the workflow, what Claude does, and what the result is.',
            },
            {
              type: 'containsAny',
              params: {
                words: [
                  'gmail',
                  'drive',
                  'notion',
                  'slack',
                  'zapier',
                  'email',
                  'calendar',
                ],
              },
              message:
                'Reference at least one service or connector (Gmail, Drive, Notion, Slack, Zapier, etc.).',
              hint: 'Name the service: "When a new email arrives in Gmail," "Update the Notion database," "Send a Slack message."',
            },
            {
              type: 'containsAny',
              params: {
                words: [
                  'trigger',
                  'action',
                  'automate',
                  'when',
                  'then',
                  'send',
                  'create',
                  'update',
                ],
              },
              message:
                'Include trigger/action language (when, then, trigger, action, automate).',
              hint: 'Frame it as a trigger-action workflow: "When X happens, then Claude does Y."',
            },
            {
              type: 'containsAny',
              params: {
                words: [
                  'workflow',
                  'process',
                  'integration',
                  'connect',
                ],
              },
              message:
                'Frame this as a workflow, process, or integration.',
              hint: 'Use workflow language: "This workflow connects...", "This integration process...", "The automated workflow..."',
            },
          ],
          successMessage:
            'Great automation workflow! This kind of integration is where Claude really shines as a productivity multiplier.',
          exampleOutput:
            'Example: "When a new email arrives in Gmail from a client, Claude will read the email, draft a professional response, and create a task in Notion with the action items. Then it sends a Slack message to the #client-updates channel with a summary. This workflow automates our client communication process and ensures nothing falls through the cracks."',
        },
      },
      {
        id: 3,
        type: 'learn',
        title: 'Security & Permissions',
        content: `When connecting Claude to external services, **security should be your top priority**. Here are the best practices for keeping your data safe.

**Permission principles:**

• **Least privilege** — Only grant Claude the minimum permissions it needs. If Claude only needs to read emails, do not give it permission to send or delete them.

• **Scoped access** — Limit access to specific folders, channels, or databases rather than giving blanket access to everything.

• **Review regularly** — Periodically review what services Claude has access to and revoke permissions that are no longer needed.

**Data handling best practices:**

• **Sensitive data** — Be cautious about giving Claude access to files or messages containing passwords, API keys, financial data, or personal information.

• **Compliance** — If your organization has data governance policies (HIPAA, GDPR, SOC 2, etc.), ensure your Claude integrations comply with these requirements.

• **Audit trail** — Keep track of what integrations you have set up and what data flows through them.

**Connector security:**

• **OAuth tokens** — Many integrations use OAuth for authentication. These tokens should be treated like passwords — do not share them or commit them to code repositories.

• **API keys** — Store API keys securely. In MCP configs, be aware that keys are stored in plain text in the config file. Protect this file with appropriate file permissions.

• **Environment variables** — For sensitive values, consider using environment variables rather than hardcoding credentials in config files.

**Red flags to watch for:**

• MCP servers requesting more permissions than they need
• Third-party servers from unknown or untrusted sources
• Integrations that require admin-level access
• Configurations that expose sensitive directories or databases

**Best practice:** Start with read-only access, test the integration, and then expand permissions only as needed. It is always easier to grant more access than to recover from a data breach.`,
      },
      {
        id: 4,
        type: 'simulator',
        title: 'Practice: Integrations',
        description:
          'Practice designing integration workflows and understanding how Claude connects to external services.',
        simulatorConfig: {
          suggestedPrompts: [
            'How do I connect Claude to my Gmail?',
            'Design a Slack workflow with Claude',
            'Automate my Google Drive with Claude',
          ],
        },
      },
    ],
  },

  // ==========================================================================
  // LEVEL 8: Building with Claude (PRO)
  // ==========================================================================
  {
    id: 8,
    title: 'Build with the API',
    description:
      'From API keys to production apps. Build software that has Claude inside it.',
    emoji: '🏗️',
    xp: 300,
    estimatedTime: '45 min',
    isPaid: true,
    skills: [
      'API Usage',
      'Model Selection',
      'System Prompts',
      'App Architecture',
    ],
    color: 'from-indigo-500 to-blue-500',
    tasks: [
      {
        id: 1,
        type: 'learn',
        title: 'The Claude API',
        content: `The **Claude API** lets you integrate Claude's capabilities into your own applications, products, and workflows programmatically.

**Claude model family:**

• **Claude Opus** — The most capable model. Best for complex reasoning, nuanced analysis, research, and tasks that require deep understanding. Higher cost, slower speed.

• **Claude Sonnet** — The balanced model. Great for most tasks: writing, coding, analysis, and conversation. Good balance of capability, speed, and cost.

• **Claude Haiku** — The fastest and most affordable model. Best for simple tasks, classification, data extraction, and high-volume use cases where speed matters more than depth.

**When to use each model:**

• **Opus:** Complex research, multi-step reasoning, creative writing, code architecture decisions
• **Sonnet:** General-purpose tasks, code generation, content creation, customer-facing applications
• **Haiku:** Quick classifications, data extraction, simple Q&A, chatbots, high-throughput pipelines

**Pricing tiers:**

• Models are priced per token (input tokens + output tokens).
• Haiku is significantly cheaper than Sonnet, which is cheaper than Opus.
• For cost-sensitive applications, use Haiku where possible and reserve Opus for tasks that truly need it.

**API basics:**

• The API uses a REST interface with JSON payloads.
• You send a system prompt (optional) and a list of messages (user and assistant turns).
• Claude responds with the assistant's message.

\`\`\`json
{
  "model": "claude-sonnet-4-20250514",
  "max_tokens": 1024,
  "system": "You are a helpful assistant.",
  "messages": [
    {"role": "user", "content": "What is the capital of France?"}
  ]
}
\`\`\`

• Access the API at **api.anthropic.com** with your API key.
• SDKs are available for Python, TypeScript/JavaScript, and other languages.`,
      },
      {
        id: 2,
        type: 'learn',
        title: 'System Prompts',
        content: `**System prompts** are instructions you give to Claude at the API level that shape its behavior for the entire conversation. They are the foundation of any Claude-powered application.

**Best practices for system prompts:**

• **Define the role clearly** — "You are a customer support agent for Acme Corp. You help customers with product questions, returns, and account issues."

• **Set boundaries** — "Never provide medical, legal, or financial advice. If asked, redirect the user to a qualified professional."

• **Specify output format** — "Always respond in JSON format with the keys: answer, confidence, and sources."

• **Handle edge cases** — "If you are unsure about the answer, say 'I am not certain about this. Let me connect you with a team member.' Never make up information."

• **Manage tone** — "Use a friendly, professional tone. Avoid jargon. Explain technical terms when you must use them."

**Guardrails:**

• **Content filters** — "Do not generate content that is offensive, discriminatory, or inappropriate."

• **Topic restrictions** — "Only answer questions related to our products and services. For off-topic questions, politely redirect."

• **Information boundaries** — "Do not reveal internal pricing, employee information, or system architecture details."

**Output formatting:**

• **JSON mode** — Great for programmatic consumption. Specify the exact schema you expect.

• **Markdown** — Good for human-readable responses with formatting.

• **Structured text** — Define templates: "Respond with: Greeting, Analysis, Recommendation, Next Steps."

**Context management:**

• Keep system prompts focused and concise. Very long system prompts can dilute the instructions.

• Put the most important rules first — Claude pays more attention to the beginning of the system prompt.

• Test your system prompt thoroughly with edge cases before deploying to production.

**Common mistakes:**

• Being too vague ("Be helpful") instead of specific ("Answer product questions using only information from our knowledge base")
• Not handling errors or unclear inputs
• Forgetting to set output format expectations
• Not testing with adversarial inputs`,
      },
      {
        id: 3,
        type: 'task',
        title: 'Write a Production System Prompt',
        description:
          'Write a system prompt for a production Claude-powered application. It should define the role, set rules and constraints, specify output format, and handle edge cases and errors.',
        taskConfig: {
          placeholder:
            'Write your production system prompt...',
          validationRules: [
            {
              type: 'minLength',
              params: { min: 120 },
              message:
                'A production system prompt should be at least 120 characters. Include role, rules, format, and error handling.',
              hint: 'Cover all four areas: role definition, behavioral rules, output formatting, and edge case handling.',
            },
            {
              type: 'containsAny',
              params: {
                words: [
                  'you are',
                  'role',
                  'assistant',
                  'system',
                ],
              },
              message:
                'Define a clear role for Claude.',
              hint: 'Start with the role: "You are a customer support assistant for..." or "Your role is to..."',
            },
            {
              type: 'containsAny',
              params: {
                words: [
                  'never',
                  'always',
                  'must',
                  'should',
                  'do not',
                  'constraint',
                  'rule',
                  'boundary',
                ],
              },
              message:
                'Include rules and constraints (never, always, must, do not, etc.).',
              hint: 'Set guardrails: "Never provide medical advice," "Always cite your sources," "You must respond in English."',
            },
            {
              type: 'containsAny',
              params: {
                words: [
                  'format',
                  'respond',
                  'output',
                  'json',
                  'markdown',
                  'structure',
                ],
              },
              message:
                'Specify output formatting preferences.',
              hint: 'Tell Claude how to format responses: "Respond in JSON," "Use markdown headers," "Structure your answer with these sections."',
            },
            {
              type: 'containsAny',
              params: {
                words: [
                  'error',
                  'edge case',
                  'fallback',
                  'handle',
                  'invalid',
                  'unclear',
                ],
              },
              message:
                'Include error handling or edge case instructions.',
              hint: 'Plan for problems: "If the input is unclear, ask for clarification," "Handle invalid data by responding with an error message," "For edge cases, fall back to a safe default."',
            },
          ],
          successMessage:
            'Excellent production system prompt! This covers the role, rules, format, and edge cases — the four pillars of a robust system prompt.',
          exampleOutput:
            'Example: "You are a customer support assistant for TechCo, a SaaS platform. Your role is to help users with account issues, billing questions, and feature explanations. Rules: Always be polite and professional. Never provide refunds directly — escalate to a human agent. Do not share internal documentation or pricing not listed on our website. Format: Respond in markdown with clear headers. For multi-step solutions, use numbered lists. Error handling: If you cannot answer a question, say \'Let me connect you with a specialist\' and provide the support email. If the user\'s request is unclear, ask one clarifying question before proceeding."',
        },
      },
      {
        id: 4,
        type: 'task',
        title: 'Design an App Architecture',
        description:
          'Design the high-level architecture for an application powered by Claude. Describe the user interface, backend integration with the Claude API, and how responses are displayed.',
        taskConfig: {
          placeholder:
            'Describe your Claude-powered app architecture...',
          validationRules: [
            {
              type: 'minLength',
              params: { min: 100 },
              message:
                'Your architecture description should be at least 100 characters.',
              hint: 'Describe three layers: user interface (frontend), Claude API integration (backend), and response handling (output).',
            },
            {
              type: 'containsAny',
              params: {
                words: [
                  'user',
                  'input',
                  'request',
                  'interface',
                  'frontend',
                ],
              },
              message:
                'Describe the user-facing side (interface, inputs, requests).',
              hint: 'How do users interact with the app? "Users type questions into a chat interface," "The frontend collects form data."',
            },
            {
              type: 'containsAny',
              params: {
                words: [
                  'api',
                  'claude',
                  'model',
                  'endpoint',
                  'backend',
                ],
              },
              message:
                'Describe the Claude API integration (backend, model, endpoint).',
              hint: 'How does the backend call Claude? "The backend sends requests to the Claude API using Sonnet," "A Node.js server manages the Claude endpoint."',
            },
            {
              type: 'containsAny',
              params: {
                words: [
                  'response',
                  'output',
                  'display',
                  'result',
                  'data',
                ],
              },
              message:
                'Describe how responses are handled and displayed.',
              hint: 'What happens with Claude\'s response? "The response is displayed in a chat bubble," "Results are parsed from JSON and shown in a dashboard."',
            },
          ],
          successMessage:
            'Solid architecture design! This covers the full stack from user input to Claude API to response display.',
          exampleOutput:
            'Example: "A customer support chatbot. Frontend: A React chat interface where users type questions. Input is sent to a Node.js backend via REST API. Backend: The server adds a system prompt, includes conversation history, and calls the Claude API using Sonnet for fast responses. It includes rate limiting and authentication. Response: Claude\'s response is streamed back to the frontend in real time, displayed in chat bubbles with markdown rendering. Error handling: If the API fails, the user sees \'Our team is on it\' with a fallback support email."',
        },
      },
      {
        id: 5,
        type: 'simulator',
        title: 'Practice: Building',
        description:
          'Practice designing Claude-powered applications and writing system prompts for real-world use cases.',
        simulatorConfig: {
          suggestedPrompts: [
            'Help me design a Claude-powered chatbot',
            'What\'s the best model for my use case?',
            'Write a system prompt for a customer service bot',
          ],
        },
      },
    ],
  },

  // ==========================================================================
  // LEVEL 9: Claude Master (PRO)
  // ==========================================================================
  {
    id: 9,
    title: 'Claude Master',
    description:
      'The capstone. Design a complete solution that puts everything together.',
    emoji: '👑',
    xp: 400,
    estimatedTime: '60 min',
    isPaid: true,
    skills: [
      'Solution Design',
      'Advanced Prompting',
      'Full-Stack Claude',
      'Production Readiness',
    ],
    color: 'from-yellow-500 to-amber-500',
    tasks: [
      {
        id: 1,
        type: 'learn',
        title: 'Capstone Overview',
        content: `Congratulations on reaching the final level! This capstone brings together **everything you have learned** across all previous levels.

**Skills you have built:**

• **Prompting mastery** (Levels 0-1) — Writing clear, specific prompts. Role prompting, chain-of-thought reasoning, and few-shot learning.

• **Projects expertise** (Level 2) — Setting up persistent workspaces with custom instructions and uploaded knowledge.

• **Artifacts proficiency** (Levels 3-4) — Creating interactive components, iterating on designs, and sharing/publishing your creations.

• **Desktop power** (Level 5) — Using Claude Desktop for local file access and system-level integration.

• **MCP integration** (Level 6) — Connecting Claude to external tools, databases, and APIs using the Model Context Protocol.

• **Connector workflows** (Level 7) — Integrating Claude with Gmail, Slack, Notion, and other services through connectors and automation.

• **Building applications** (Level 8) — Using the Claude API, selecting the right model, writing production system prompts, and designing app architectures.

**The capstone challenge:**

In the following tasks, you will combine these skills to design a **complete Claude-powered solution** from start to finish. This includes:

• Identifying a real problem or workflow to solve
• Choosing the right Claude tools and integrations
• Writing professional-grade prompts and system instructions
• Designing for production use with error handling and security

**This is your chance to prove mastery.** Take your time, think big, and create something you are proud of.`,
      },
      {
        id: 2,
        type: 'task',
        title: 'Design a Complete Claude Solution',
        description:
          'Design a comprehensive solution that uses multiple Claude capabilities. Describe the problem, the tools you would use (Projects, Artifacts, MCP, API, integrations), the target audience, and key features.',
        taskConfig: {
          placeholder:
            'Describe your complete Claude-powered solution...',
          validationRules: [
            {
              type: 'minLength',
              params: { min: 150 },
              message:
                'Your solution design should be at least 150 characters. This is a comprehensive capstone — go into detail.',
              hint: 'Cover: the problem you are solving, who it is for, what Claude tools you are using, and the key features of the solution.',
            },
            {
              type: 'containsAny',
              params: {
                words: [
                  'project',
                  'solution',
                  'application',
                  'tool',
                  'system',
                ],
              },
              message:
                'Describe the overall project, solution, or system.',
              hint: 'Frame your answer as a project or system: "This solution is a..." or "The system provides..."',
            },
            {
              type: 'containsAny',
              params: {
                words: [
                  'user',
                  'audience',
                  'customer',
                  'client',
                  'team',
                ],
              },
              message:
                'Identify the target audience or users.',
              hint: 'Who benefits from this? "Marketing teams," "Small business owners," "Software developers," "Students."',
            },
            {
              type: 'containsAny',
              params: {
                words: [
                  'claude',
                  'ai',
                  'artifact',
                  'project',
                  'mcp',
                  'api',
                ],
              },
              message:
                'Reference specific Claude tools or capabilities you would use.',
              hint: 'Name the Claude features: "Claude Projects for persistent context," "Artifacts for the dashboard UI," "MCP for database access," "The API for backend integration."',
            },
            {
              type: 'containsAny',
              params: {
                words: [
                  'feature',
                  'capability',
                  'function',
                  'workflow',
                  'automation',
                ],
              },
              message:
                'Describe key features, capabilities, or workflows.',
              hint: 'List the main features: "Key features include automated report generation, real-time data analysis, and team collaboration workflows."',
            },
          ],
          successMessage:
            'Outstanding solution design! You have demonstrated mastery of multiple Claude capabilities and thought through a comprehensive, real-world application.',
          exampleOutput:
            'Example: "An AI-powered sales enablement system for B2B SaaS teams. This solution uses Claude Projects to maintain context about our product catalog and pricing. The Claude API (Sonnet) powers a customer-facing chatbot that answers product questions. MCP connects Claude to our CRM database so it can pull customer history and deal status. Artifacts generate interactive proposal dashboards for each client. Key features: automated proposal generation, real-time competitive analysis, personalized pricing recommendations, and a Slack integration that notifies sales reps when a prospect engages with a proposal."',
        },
      },
      {
        id: 3,
        type: 'task',
        title: 'Write Comprehensive Project Instructions',
        description:
          'Write a complete set of Project instructions for a professional Claude deployment. This should include the role, detailed rules and guidelines, formatting requirements, and references to knowledge sources.',
        taskConfig: {
          placeholder:
            'Write your comprehensive Project instructions...',
          validationRules: [
            {
              type: 'minLength',
              params: { min: 150 },
              message:
                'Comprehensive instructions should be at least 150 characters. Include role, rules, formatting, and knowledge references.',
              hint: 'Cover all four areas thoroughly: who Claude is (role), behavioral constraints (rules), how to format output (formatting), and what knowledge to reference (sources).',
            },
            {
              type: 'containsAny',
              params: {
                words: [
                  'role',
                  'persona',
                  'expert',
                  'assistant',
                ],
              },
              message:
                'Define the role or persona.',
              hint: 'Start with a clear role: "You are a senior technical writer," "Your role is a data analysis expert."',
            },
            {
              type: 'containsAny',
              params: {
                words: [
                  'rule',
                  'guideline',
                  'constraint',
                  'boundary',
                  'always',
                  'never',
                ],
              },
              message:
                'Include rules, guidelines, or constraints.',
              hint: 'Set clear rules: "Always use active voice," "Never include unverified statistics," "Follow these guidelines for every response."',
            },
            {
              type: 'containsAny',
              params: {
                words: [
                  'format',
                  'output',
                  'structure',
                  'respond',
                  'style',
                ],
              },
              message:
                'Specify formatting or style requirements.',
              hint: 'Define the output format: "Structure responses with headers," "Use bullet points for lists," "Respond in a professional but approachable style."',
            },
            {
              type: 'containsAny',
              params: {
                words: [
                  'knowledge',
                  'context',
                  'reference',
                  'source',
                  'document',
                ],
              },
              message:
                'Reference knowledge sources or context documents.',
              hint: 'Mention the knowledge base: "Reference the uploaded product documentation," "Use the brand voice guide as your source of truth," "Consult the uploaded context documents."',
            },
          ],
          successMessage:
            'Masterful Project instructions! These are production-ready and cover all the essential elements for a professional Claude deployment.',
          exampleOutput:
            'Example: "You are a senior technical documentation specialist for CloudPlatform. Your role is to help the engineering team create and maintain API documentation.\n\nRules and guidelines:\n- Always use active voice and present tense\n- Never include internal employee names or unreleased feature details\n- Follow our style guide (uploaded document: style-guide.md)\n- Keep explanations concise — aim for clarity over completeness\n\nFormatting:\n- Structure all documentation with H2 headers for sections\n- Use code blocks with language tags for all code examples\n- Include a Summary section at the top of every document\n- Output in markdown format\n\nKnowledge sources:\n- Reference the uploaded API specification (api-spec.yaml) as the source of truth\n- Consult the uploaded context documents for product context\n- Use existing documentation patterns from docs-examples.md"',
        },
      },
      {
        id: 4,
        type: 'simulator',
        title: 'Final Practice',
        description:
          'Your final practice session. Use everything you have learned to have advanced conversations with Claude. Push the boundaries of what you can create.',
        simulatorConfig: {
          suggestedPrompts: [
            'Help me plan a complete Claude-powered workflow for my business',
            'What\'s the most advanced thing I can build with Claude?',
            'Review my Claude mastery journey',
          ],
        },
      },
      {
        id: 5,
        type: 'learn',
        title: 'Graduation',
        content: `**Congratulations, Claude Master!** You have completed all 10 levels of Claude Quest and demonstrated mastery across the full spectrum of Claude capabilities.

**What you have achieved:**

• **Prompt Engineering** — You can write clear, specific, and effective prompts using role prompting, chain-of-thought reasoning, and few-shot learning.

• **Claude Projects** — You know how to create persistent workspaces with custom instructions and uploaded knowledge bases.

• **Artifacts** — You can create interactive React components, HTML pages, SVG graphics, and more — and iterate on them effectively.

• **Sharing & Collaboration** — You know how to publish, share, and collaborate on Claude-created content.

• **Claude Desktop** — You can leverage local file access, MCP integrations, and system-level features.

• **MCP Integration** — You understand the Model Context Protocol and can configure Claude to connect to databases, APIs, and external tools.

• **Service Connectors** — You can design automation workflows with Gmail, Slack, Notion, Zapier, and other services.

• **Building Applications** — You can use the Claude API, select the right model, write production system prompts, and design application architectures.

**Next steps:**

• **Build something real** — Take your capstone design and implement it. Start small, iterate, and ship.

• **Join the community** — Connect with other Claude users on Anthropic's community forums, Discord, and social media.

• **Stay current** — Claude and the AI landscape evolve rapidly. Follow Anthropic's blog and changelog for new features and best practices.

• **Share your knowledge** — Help others learn Claude. Teach a colleague, write a blog post, or contribute to the community.

• **Explore the API** — If you have not already, sign up for API access at console.anthropic.com and start building.

**You are now a Claude Master. Go build something amazing.**`,
      },
    ],
  },
];

export default levels;
