// Claude Coach AI Knowledge Base - Context and assistance for Claude Academy lessons

export interface LevelContext {
  level: number;
  title: string;
  objective: string;
  commonPitfalls: string[];
  successCriteria: string[];
  helpfulPrompts: string[];
  encouragement: string[];
}

// Knowledge base for Claude Chat Fundamentals track
export const levelKnowledge: Record<number, LevelContext> = {
  1: {
    level: 1,
    title: "Introduction to Claude",
    objective: "Understand what Claude is and how to start a conversation",
    commonPitfalls: [
      "Treating Claude like a search engine - it's a conversational partner",
      "Being too vague with requests",
      "Not understanding Claude's capabilities and limitations"
    ],
    successCriteria: [
      "Understand Claude is an AI assistant by Anthropic",
      "Know how to access Claude (claude.ai, API, Claude Code)",
      "Can start a basic conversation with Claude",
      "Understand Claude's helpful, harmless, honest approach"
    ],
    helpfulPrompts: [
      "Think of Claude as a knowledgeable colleague who can help with almost anything",
      "Start simple: 'Help me understand...' or 'Can you explain...'",
      "Claude works best when you're specific about what you need"
    ],
    encouragement: [
      "You're learning to work with one of the most advanced AI assistants available!",
      "This skill will transform how you work and learn",
      "Every expert Claude user started exactly where you are"
    ]
  },
  2: {
    level: 2,
    title: "Your First Conversation",
    objective: "Have a productive back-and-forth conversation with Claude",
    commonPitfalls: [
      "Accepting the first response without asking follow-ups",
      "Not providing enough context about your needs",
      "Forgetting that conversations can be iterative"
    ],
    successCriteria: [
      "Can maintain a multi-turn conversation",
      "Knows how to ask follow-up questions",
      "Understands how to provide context",
      "Can refine responses through conversation"
    ],
    helpfulPrompts: [
      "After Claude responds, try 'Can you elaborate on...' or 'What about...'",
      "Share your background: 'I'm new to this, so please explain simply'",
      "Iterate: 'That's helpful, but can you make it more concise?'"
    ],
    encouragement: [
      "Great conversations with Claude are built, not given!",
      "The more you practice, the better your results will be",
      "You're developing a skill that professionals pay for"
    ]
  },
  3: {
    level: 3,
    title: "Writing Effective Prompts",
    objective: "Master the art of prompt engineering for better results",
    commonPitfalls: [
      "Writing prompts that are too short or vague",
      "Not specifying the format you want",
      "Forgetting to mention your audience or purpose"
    ],
    successCriteria: [
      "Can write clear, specific prompts",
      "Understands prompt structure: context + task + format",
      "Can specify tone, length, and style",
      "Uses examples when helpful"
    ],
    helpfulPrompts: [
      "Structure: [Context] + [What you need] + [How you want it]",
      "Example: 'I'm a marketing manager. Write 3 email subject lines for a product launch. Keep them under 50 characters.'",
      "Include constraints: 'Use simple language suitable for beginners'"
    ],
    encouragement: [
      "Prompt engineering is becoming one of the most valuable skills!",
      "You're learning to communicate effectively with AI",
      "Every great AI output starts with a great prompt"
    ]
  },
  4: {
    level: 4,
    title: "Context & Memory",
    objective: "Understand how Claude handles context and conversation history",
    commonPitfalls: [
      "Not realizing Claude doesn't remember between sessions",
      "Losing context in long conversations",
      "Not using Projects for persistent context"
    ],
    successCriteria: [
      "Understands Claude's context window",
      "Knows about Claude Projects for persistent context",
      "Can effectively reference earlier parts of conversation",
      "Understands when to start fresh vs. continue"
    ],
    helpfulPrompts: [
      "Use Claude Projects to save important context",
      "Reference earlier: 'As we discussed above...' or 'Building on that...'",
      "Start fresh when switching topics completely"
    ],
    encouragement: [
      "Understanding context is key to becoming a power user!",
      "You're learning the 'memory' of AI systems",
      "This knowledge applies to all AI tools, not just Claude"
    ]
  },
  5: {
    level: 5,
    title: "Advanced Prompting",
    objective: "Learn advanced techniques like chain-of-thought and role prompting",
    commonPitfalls: [
      "Overcomplicating prompts when simple works",
      "Not matching technique to task type",
      "Forgetting to validate AI outputs"
    ],
    successCriteria: [
      "Can use chain-of-thought prompting",
      "Understands role/persona prompting",
      "Can use few-shot examples effectively",
      "Knows when to use which technique"
    ],
    helpfulPrompts: [
      "Chain of thought: 'Think through this step by step'",
      "Role prompting: 'Act as an expert [role] and...'",
      "Few-shot: 'Here's an example: [example]. Now do the same for...'"
    ],
    encouragement: [
      "You're now in the top tier of Claude users!",
      "These techniques are used by AI professionals",
      "You can solve complex problems with these skills"
    ]
  },
  6: {
    level: 6,
    title: "Artifacts & Projects",
    objective: "Master Claude's productivity features for complex work",
    commonPitfalls: [
      "Not using Artifacts for code or documents",
      "Forgetting to organize work in Projects",
      "Not leveraging file attachments"
    ],
    successCriteria: [
      "Can create and edit Artifacts",
      "Knows how to use Claude Projects",
      "Can attach and analyze files",
      "Understands when to use each feature"
    ],
    helpfulPrompts: [
      "Ask Claude to 'create an artifact' for code or documents",
      "Use Projects to group related conversations",
      "Attach files: 'Analyze this document and...'",
      "Edit artifacts: 'Update the artifact to add...'"
    ],
    encouragement: [
      "You're using Claude like a professional!",
      "These features multiply your productivity",
      "You can now tackle complex, multi-part projects"
    ]
  },
  7: {
    level: 7,
    title: "Claude Pro Features",
    objective: "Leverage Claude Pro capabilities for maximum productivity",
    commonPitfalls: [
      "Not taking advantage of higher usage limits",
      "Not using the most capable models",
      "Forgetting about priority access during peak times"
    ],
    successCriteria: [
      "Understands Claude Pro benefits",
      "Can choose appropriate model for task",
      "Leverages extended context effectively",
      "Uses priority access strategically"
    ],
    helpfulPrompts: [
      "Use Claude 3 Opus for complex reasoning tasks",
      "Leverage extended context for long documents",
      "Take advantage of higher rate limits for batch work"
    ],
    encouragement: [
      "You're getting maximum value from Claude Pro!",
      "These features put you ahead of most users",
      "You have access to the most powerful AI assistant"
    ]
  },
  8: {
    level: 8,
    title: "Best Practices & Ethics",
    objective: "Develop responsible and effective AI usage habits",
    commonPitfalls: [
      "Over-relying on AI without verification",
      "Not considering privacy with sensitive data",
      "Forgetting to credit AI assistance when appropriate"
    ],
    successCriteria: [
      "Verifies important AI outputs",
      "Understands data privacy considerations",
      "Uses AI ethically and responsibly",
      "Knows when NOT to use AI"
    ],
    helpfulPrompts: [
      "Always verify facts and important information",
      "Consider: 'Should I share this data with an AI?'",
      "Think about: 'Is AI the right tool for this task?'"
    ],
    encouragement: [
      "You're now a responsible AI power user!",
      "These principles will serve you throughout your career",
      "You're ready to help others learn too!"
    ]
  }
};

export const globalKnowledge = {
  appGoal: "OneWave Claude Academy teaches people to master the complete Anthropic Claude ecosystem - from Claude Chat to Claude Code to building with the API.",

  learningPhilosophy: "We believe in hands-on, practical learning. Every lesson connects to real-world applications and builds skills you can use immediately.",

  claudeEcosystem: {
    "Claude Chat": "Web-based conversational AI at claude.ai",
    "Claude Code": "CLI tool for AI-powered development",
    "MCP": "Model Context Protocol for plugins and connectors",
    "Anthropic API": "Build AI-powered applications",
    "Claude Enterprise": "Team and business features",
    "Claude Skills": "Custom commands with SKILL.md"
  },

  encouragementPrinciples: [
    "Celebrate every milestone - learning AI tools is transformative",
    "Connect lessons to professional applications",
    "Emphasize that these skills are in high demand",
    "Build confidence through practical exercises"
  ]
};

// Function to get contextual help based on current level
export function getContextualHelp(level: number, userQuery: string, userProgress: any) {
  const levelInfo = levelKnowledge[level] || levelKnowledge[1];

  return {
    levelContext: levelInfo,
    globalContext: globalKnowledge,
    userProgress: {
      currentLevel: level,
      completedLevels: userProgress?.completedLevels || []
    }
  };
}
