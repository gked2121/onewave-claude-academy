// Claude Workspace - Track Content
// Covers Claude surfaces, Styles, Research Mode, Connectors, Cowork, Plugins, and decision frameworks

import type { TrackLevel, LevelContent } from '@/lib/types';

export const CLAUDE_WORKSPACE_TRACK_ID = 'claude-workspace';
export const CLAUDE_WORKSPACE_COLOR = '#8B5CF6';

export const claudeWorkspaceLevels: Omit<TrackLevel, 'id' | 'trackId'>[] = [
  // Level 1: Claude Surfaces: Web, Desktop & Mobile
  {
    levelNumber: 1,
    title: 'Claude Surfaces: Web, Desktop & Mobile',
    description: 'Understand the different ways to access Claude and what each surface does best',
    xpReward: 100,
    estimatedMinutes: 10,
    isFree: true,
    requiresVerification: false,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'cw1-1',
          type: 'text',
          title: 'Three Ways to Use Claude',
          content: `<p>Claude is available across three primary surfaces, each designed for different workflows and situations. Understanding which surface to use and when is one of the highest-leverage skills you can build.</p>
<ul>
  <li><strong>claude.ai (Web)</strong> -- The full-featured browser experience. Accessible from any device with a browser, this is where most people start. It supports Projects, Artifacts, file uploads, and all the latest features as soon as they ship.</li>
  <li><strong>Claude Desktop</strong> -- A native application for macOS and Windows. Desktop brings Claude directly into your operating system with local file access, drag-and-drop from Finder or Explorer, an always-available window, and Computer Use capabilities.</li>
  <li><strong>Claude Mobile</strong> -- Available on iOS and Android. Optimized for on-the-go tasks like voice conversations, quick lookups, photo analysis, and travel assistance.</li>
</ul>
<p>All three surfaces connect to the same underlying Claude model and share your account, subscription, and conversation history.</p>`
        },
        {
          id: 'cw1-2',
          type: 'text',
          title: 'Feature Comparison: What Is Available Where',
          content: `<p>Not every feature is available on every surface. Here is a breakdown of key capabilities:</p>
<table>
  <tr><th>Feature</th><th>Web</th><th>Desktop</th><th>Mobile</th></tr>
  <tr><td>Projects</td><td>Yes</td><td>Yes</td><td>View only</td></tr>
  <tr><td>Artifacts</td><td>Yes</td><td>Yes</td><td>View only</td></tr>
  <tr><td>File uploads</td><td>Yes</td><td>Yes (+ drag-and-drop)</td><td>Photos/Camera</td></tr>
  <tr><td>Local file access</td><td>No</td><td>Yes</td><td>No</td></tr>
  <tr><td>Voice mode</td><td>No</td><td>No</td><td>Yes</td></tr>
  <tr><td>Computer Use</td><td>No</td><td>Yes</td><td>No</td></tr>
  <tr><td>Research Mode</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
  <tr><td>Connectors</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
  <tr><td>Cowork</td><td>Yes</td><td>Yes</td><td>No</td></tr>
  <tr><td>Keyboard shortcut</td><td>N/A</td><td>Yes (global)</td><td>N/A</td></tr>
</table>
<p>The web and desktop experiences are the most feature-complete. Mobile intentionally focuses on the tasks that make sense when you are away from your desk.</p>`
        },
        {
          id: 'cw1-3',
          type: 'text',
          title: 'Claude Desktop: Your Local AI Companion',
          content: `<p>Claude Desktop is the best choice when your work involves local files and deep focus sessions. Key advantages:</p>
<ul>
  <li><strong>Local file access</strong> -- Open files directly from your filesystem without uploading. Claude can read documents, images, and code files from your machine.</li>
  <li><strong>Drag-and-drop</strong> -- Drag a file from Finder or Explorer straight into the conversation window. No need to navigate upload dialogs.</li>
  <li><strong>Always-on availability</strong> -- Set a global keyboard shortcut to summon Claude instantly from any application. This makes it easy to ask quick questions without switching to a browser.</li>
  <li><strong>Computer Use</strong> -- Claude Desktop supports Computer Use, which allows Claude to see your screen and interact with your computer to accomplish tasks.</li>
</ul>
<p>Desktop is ideal for developers, analysts, writers, and anyone who works primarily at their computer and wants Claude integrated into their desktop workflow.</p>`
        },
        {
          id: 'cw1-4',
          type: 'text',
          title: 'Claude Mobile: AI in Your Pocket',
          content: `<p>The mobile app shines in contexts where a keyboard is not your primary input:</p>
<ul>
  <li><strong>Voice mode</strong> -- Have a spoken conversation with Claude. Perfect for brainstorming while walking, dictating notes, or getting answers hands-free.</li>
  <li><strong>On-the-go lookups</strong> -- Quick questions, fact checks, and calculations when you are away from your desk.</li>
  <li><strong>Photo analysis</strong> -- Snap a photo of a whiteboard, receipt, menu, error message, or document and have Claude analyze it immediately.</li>
  <li><strong>Travel assistance</strong> -- Translation help, itinerary planning, restaurant research, and navigation guidance.</li>
</ul>
<p>Think of mobile as your AI companion for the moments between focused work sessions.</p>`
        },
        {
          id: 'cw1-5',
          type: 'code',
          title: 'Same Task, Different Surfaces',
          language: 'text',
          content: `Scenario: Preparing talking points for a client meeting

--- Web (claude.ai) ---
1. Open your "Client: Acme" project
2. Upload the latest proposal PDF
3. Ask Claude to generate talking points
4. Review the Artifact, iterate, and share with your team

--- Desktop ---
1. Press your global shortcut to open Claude
2. Drag the proposal file from your Documents folder
3. Ask Claude to generate talking points
4. Copy them directly into your presentation app

--- Mobile ---
1. Open Claude while commuting to the meeting
2. Use voice mode: "Give me 5 talking points for the Acme proposal"
3. Review on screen, refine with follow-up voice messages
4. Walk into the meeting prepared`
        },
        {
          id: 'cw1-6',
          type: 'tip',
          title: 'Conversations Sync Across Surfaces',
          content: 'Your conversations sync across all three surfaces. Start a conversation on desktop at your office, continue it on mobile during your commute, and pick it up again on the web when you get home. Projects, styles, and account settings also carry over.'
        }
      ]
    } as LevelContent
  },

  // Level 2: Custom Styles for Consistent Output
  {
    levelNumber: 2,
    title: 'Custom Styles for Consistent Output',
    description: 'Create and manage custom Styles to get consistent tone, format, and voice across all your conversations',
    xpReward: 150,
    estimatedMinutes: 15,
    isFree: true,
    requiresVerification: true,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'cw2-1',
          type: 'text',
          title: 'What Are Styles?',
          content: `<p>Styles let you control how Claude writes -- the tone, format, length, and personality of every response. Instead of repeating formatting instructions in every conversation, you set a Style once and it applies across all your chats.</p>
<p>Styles are different from Project Instructions in an important way:</p>
<ul>
  <li><strong>Styles</strong> -- Control <em>how</em> Claude writes. They affect voice, tone, formatting, and length. Styles are account-wide and travel with you across all conversations and projects.</li>
  <li><strong>Project Instructions</strong> -- Control <em>what</em> Claude knows and does within a specific project. They provide domain context, rules, and reference material scoped to that project.</li>
</ul>
<p>Think of Styles as Claude's personality layer, and Project Instructions as its knowledge layer. The two work together: a Style might say "write in a direct, executive tone" while the Project Instructions say "we are a healthcare company; always follow HIPAA guidelines."</p>`
        },
        {
          id: 'cw2-2',
          type: 'text',
          title: 'Built-in Style Presets',
          content: `<p>Claude comes with several built-in style presets to get you started:</p>
<ul>
  <li><strong>Normal</strong> -- Claude's default balanced style. Clear, helpful, moderate length.</li>
  <li><strong>Concise</strong> -- Shorter responses. Cuts filler words and unnecessary preamble. Good for quick answers.</li>
  <li><strong>Explanatory</strong> -- Longer, more detailed responses. Walks through reasoning and provides context. Good for learning.</li>
  <li><strong>Formal</strong> -- Professional, polished language. Avoids contractions and casual phrasing. Good for business communication.</li>
</ul>
<p>You can switch between these at any time using the Style selector in the conversation interface. But the real power comes from creating your own custom styles.</p>`
        },
        {
          id: 'cw2-3',
          type: 'text',
          title: 'Creating Custom Styles Step by Step',
          content: `<p>To create a custom Style:</p>
<ol>
  <li><strong>Open Settings</strong> -- Navigate to your account settings or click the Style selector and choose "Create new style."</li>
  <li><strong>Name your Style</strong> -- Choose a descriptive name that makes it easy to find later, such as "Executive Comms" or "Technical Docs."</li>
  <li><strong>Write the style instructions</strong> -- Describe the voice, tone, formatting rules, and any constraints. Be specific. The more detail you provide, the more consistent Claude's output will be.</li>
  <li><strong>Test it</strong> -- Start a conversation, select your new Style, and try several different prompts to see if the output matches your expectations.</li>
  <li><strong>Iterate</strong> -- Refine the instructions based on what you see. Add examples of good and bad output if needed.</li>
</ol>
<p>You can also create a Style by giving Claude a sample of writing you like. Ask it to analyze the sample and generate style instructions, then paste those instructions into a new custom Style.</p>`
        },
        {
          id: 'cw2-4',
          type: 'code',
          title: 'Example Custom Styles',
          language: 'text',
          content: `--- Style: "Executive Comms" ---
Write in a direct, results-oriented tone. Lead with the conclusion
or recommendation, then provide supporting context. Use bullet
points for lists. Keep paragraphs to 2-3 sentences maximum.
Avoid hedging language ("I think", "perhaps", "it seems").
Use active voice. Assume the reader is a busy executive who
needs to make a decision quickly.

--- Style: "Technical Analysis" ---
Write with precision and specificity. Define technical terms on
first use. Structure responses with clear headers and numbered
steps where appropriate. Include relevant trade-offs and edge
cases. Cite assumptions explicitly. Use code examples when they
clarify a point. Favor depth over brevity -- thoroughness matters
more than word count.

--- Style: "Friendly Support" ---
Write in a warm, approachable tone. Use "you" and "your"
frequently. Break complex instructions into simple numbered
steps. Anticipate follow-up questions and address them proactively.
End responses with a brief summary of next steps or an offer to
help further. Use plain language -- no jargon.`
        },
        {
          id: 'cw2-5',
          type: 'text',
          title: 'Combining Styles and Projects',
          content: `<p>The most powerful setup combines a Style with Project Instructions. Here is how they complement each other:</p>
<ul>
  <li><strong>Style ("Executive Comms")</strong> ensures every response is concise, direct, and formatted for decision-makers.</li>
  <li><strong>Project Instructions ("Q1 Board Deck")</strong> tell Claude about your company, the audience, the metrics that matter, and the documents to reference.</li>
</ul>
<p>Together, Claude knows both <em>what</em> to say and <em>how</em> to say it. This is how teams achieve consistent, on-brand output without rewriting prompts every time.</p>
<p>A practical workflow: create 3-4 Styles for your most common communication modes (internal memos, customer-facing, technical, casual). Then use Project Instructions to layer in context for each specific initiative.</p>`
        },
        {
          id: 'cw2-6',
          type: 'tip',
          title: 'Quick Style Switching',
          content: 'You can switch Styles mid-conversation. Start with "Technical Analysis" to draft a detailed plan, then switch to "Executive Comms" and ask Claude to rewrite the same content for a leadership audience. Same information, different delivery.'
        }
      ],
      exercise: {
        type: 'build',
        instructions: 'Create 2 custom Styles for different work contexts. For each Style, write out: (1) the Style name, (2) the full style instructions including voice, tone, formatting rules, and constraints, and (3) an example prompt and what a response in that Style should look like. The two Styles should be clearly different from each other in voice and purpose.',
        hints: [
          'Think about the two most different types of writing you do at work -- one might be internal and casual, the other external and polished',
          'Include specific formatting rules (paragraph length, use of bullet points, headers) not just tone words',
          'Add examples of phrases to use and phrases to avoid for each Style'
        ],
        validationCriteria: [
          'Created 2 distinct Styles with different voice and purpose',
          'Each Style has a descriptive name',
          'Style instructions are specific enough to produce consistent output',
          'Includes formatting rules, not just tone descriptions',
          'Provided example prompts showing how each Style would be used'
        ]
      }
    } as LevelContent
  },

  // Level 3: Research Mode: Deep Dives
  {
    levelNumber: 3,
    title: 'Research Mode: Deep Dives',
    description: 'Learn how Research Mode works and how to craft prompts that trigger thorough, multi-step research',
    xpReward: 200,
    estimatedMinutes: 20,
    isFree: false,
    requiresVerification: true,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'cw3-1',
          type: 'text',
          title: 'What Is Research Mode?',
          content: `<p>Research Mode is a special capability in Claude that enables multi-step, in-depth investigation of complex topics. When Research Mode activates, Claude goes beyond a single response -- it searches the web, reads multiple sources, synthesizes information across those sources, and delivers a comprehensive, cited answer.</p>
<p>You can think of Research Mode as the difference between asking a colleague a quick question at their desk versus asking them to spend an afternoon digging into a topic and writing up their findings. The depth and thoroughness are significantly greater.</p>
<p>Research Mode is available on Claude Pro and Team plans. It uses a dedicated "Research" toggle or activates when Claude determines that your question requires multi-step research to answer well.</p>`
        },
        {
          id: 'cw3-2',
          type: 'text',
          title: 'How Research Mode Differs from Standard Responses',
          content: `<p>Standard Claude responses draw on its training data -- the information baked into the model during training. Research Mode goes further:</p>
<ul>
  <li><strong>Multi-step investigation</strong> -- Claude performs multiple searches, reads pages, and follows leads. A single Research Mode response may involve 10-20 web searches behind the scenes.</li>
  <li><strong>Real-time web access</strong> -- Instead of relying solely on training data, Claude actively searches the web for current information, recent publications, and up-to-date data.</li>
  <li><strong>Source citations</strong> -- Research Mode responses include links to the sources Claude consulted, so you can verify and dig deeper.</li>
  <li><strong>Longer, structured output</strong> -- Research responses are typically much longer and more structured than standard answers, often organized with headers, sections, and summaries.</li>
  <li><strong>Synthesis across sources</strong> -- Claude does not just list what it found. It synthesizes information, identifies patterns, notes contradictions, and draws conclusions.</li>
</ul>`
        },
        {
          id: 'cw3-3',
          type: 'text',
          title: 'Crafting Prompts That Trigger Effective Research',
          content: `<p>The quality of your research prompt directly determines the quality of the output. Here are the principles for writing great research prompts:</p>
<ul>
  <li><strong>Be specific about scope</strong> -- "Research the B2B SaaS onboarding space, focusing on companies with 50-200 employees" is much better than "research onboarding."</li>
  <li><strong>Define what you need to decide</strong> -- "I need to choose between Stripe and Adyen for payment processing. Research both with a focus on pricing, global coverage, and developer experience" gives Claude a clear mission.</li>
  <li><strong>Specify the output format</strong> -- "Produce a comparison matrix with 8-10 criteria" or "Write a 2-page briefing document with an executive summary" helps Claude structure its findings.</li>
  <li><strong>Set boundaries</strong> -- "Focus on developments from 2024-2025" or "Only consider solutions that support SOC 2 compliance" keeps the research focused.</li>
  <li><strong>Ask for analysis, not just facts</strong> -- "What are the trade-offs?" and "What would you recommend and why?" push Claude beyond summarization into genuine analysis.</li>
</ul>`
        },
        {
          id: 'cw3-4',
          type: 'code',
          title: 'Research Prompt Examples by Use Case',
          language: 'text',
          content: `--- Competitive Analysis ---
Research our top 3 competitors in the project management space:
Asana, Monday.com, and ClickUp. For each, provide:
1. Current pricing tiers and what is included
2. Key features released in the last 12 months
3. Target customer segment and positioning
4. Strengths and weaknesses based on user reviews
5. Market share or growth indicators if available
Synthesize into a comparison matrix and highlight where we have
opportunities to differentiate.

--- Literature Review ---
Conduct a literature review on the effectiveness of spaced
repetition in corporate training programs. Focus on:
- Peer-reviewed studies from 2018-present
- Measurable outcomes (retention rates, time to proficiency)
- Comparison with traditional training methods
- Implementation challenges and solutions
Summarize the consensus, note any conflicting findings, and
recommend practical applications for a 500-person company.

--- Due Diligence ---
Research the company Acme Technologies for an investment
evaluation. I need:
- Founding story, leadership team, and funding history
- Product overview and market positioning
- Revenue model and any reported financials
- Recent news, partnerships, or notable developments
- Red flags or risks to investigate further
Format as a one-page investment brief with a risk assessment.`
        },
        {
          id: 'cw3-5',
          type: 'warning',
          title: 'Limitations and When to Verify',
          content: 'Research Mode is powerful but not infallible. Always verify critical numbers, statistics, and claims by checking the cited sources directly. Web search results can be biased toward popular or well-SEO-optimized sources, which may not be the most authoritative. For highly specialized or technical topics, Research Mode is best used as a starting point -- not the final word. Time-sensitive financial data, legal requirements, and medical information should always be confirmed with domain experts.'
        },
        {
          id: 'cw3-6',
          type: 'tip',
          title: 'Combining Research Mode with Projects',
          content: 'For ongoing research, create a dedicated Project. Upload existing research, reports, or internal documents as project files. Then use Research Mode within that project -- Claude will combine its web research with your uploaded context, giving you answers that are both current and grounded in your specific situation.'
        }
      ],
      exercise: {
        type: 'prompt',
        instructions: 'Craft a research prompt for a real question you need answered at work. The prompt should: (1) clearly define the research question, (2) specify the scope and boundaries, (3) describe the output format you need, and (4) include what kind of analysis or synthesis you expect. After writing the prompt, evaluate: does it give Claude enough direction to deliver a useful result without being so narrow that it misses important context?',
        hints: [
          'Pick a question where you would normally spend 2-4 hours researching manually',
          'Include constraints like time period, geography, industry, or company size to keep the research focused',
          'Specify whether you need a summary, a comparison, a recommendation, or a full briefing document'
        ],
        validationCriteria: [
          'Research question is clearly defined and non-trivial',
          'Scope and boundaries are specified',
          'Output format is described',
          'Prompt requests analysis or synthesis, not just a list of facts',
          'Prompt would produce a result you could actually use in your work'
        ]
      }
    } as LevelContent
  },

  // Level 4: Connectors: Gmail & Google Calendar
  {
    levelNumber: 4,
    title: 'Connectors: Gmail & Google Calendar',
    description: 'Connect Claude to your email and calendar for meeting prep, email triage, and scheduling workflows',
    xpReward: 200,
    estimatedMinutes: 20,
    isFree: false,
    requiresVerification: true,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'cw4-1',
          type: 'text',
          title: 'What Are Connectors?',
          content: `<p>Connectors are first-party integrations built directly into Claude that allow it to access your external tools and services. Unlike MCPs (Model Context Protocol servers), which require technical setup, Connectors are enabled with a few clicks in your Claude settings -- no code, no configuration files, no terminal.</p>
<p>When you enable a Connector, Claude gains the ability to read and interact with data from that service during your conversations. You stay in control: Claude only accesses the services you have explicitly connected, and you can revoke access at any time.</p>
<p>Currently available Connectors include Gmail, Google Calendar, Google Drive, Slack, and others. This level focuses on the two most immediately useful: Gmail and Google Calendar.</p>`
        },
        {
          id: 'cw4-2',
          type: 'text',
          title: 'Enabling Connectors',
          content: `<p>To enable Connectors:</p>
<ol>
  <li>Open Claude settings (click your profile icon, then Settings).</li>
  <li>Navigate to the "Connectors" or "Integrations" section.</li>
  <li>Find Gmail and/or Google Calendar in the list.</li>
  <li>Click "Connect" and authenticate with your Google account.</li>
  <li>Review the permissions Claude is requesting and approve.</li>
</ol>
<p>Once connected, Claude can access these services in any conversation. You do not need to re-authenticate each time. If you work with multiple Google accounts, you can choose which one to connect.</p>`
        },
        {
          id: 'cw4-3',
          type: 'text',
          title: 'Gmail Connector: What You Can Do',
          content: `<p>With the Gmail Connector enabled, Claude can work with your email in powerful ways:</p>
<ul>
  <li><strong>Search emails</strong> -- "Find all emails from the Acme team in the last 2 weeks" or "Show me unread messages about the Q1 budget."</li>
  <li><strong>Summarize threads</strong> -- "Summarize the email thread with Sarah about the product launch. What decisions were made and what is still open?"</li>
  <li><strong>Draft replies</strong> -- "Draft a reply to John's email about the contract terms. Be professional but push back on the 60-day payment window."</li>
  <li><strong>Triage your inbox</strong> -- "Look at my last 20 unread emails. Categorize them as urgent, needs response, FYI, or can ignore."</li>
  <li><strong>Extract action items</strong> -- "Go through my emails from today and list all the action items assigned to me."</li>
</ul>
<p>Claude reads the emails in real time -- it is not working from cached or outdated data.</p>`
        },
        {
          id: 'cw4-4',
          type: 'text',
          title: 'Google Calendar Connector: What You Can Do',
          content: `<p>The Google Calendar Connector gives Claude visibility into your schedule:</p>
<ul>
  <li><strong>View your schedule</strong> -- "What does my calendar look like tomorrow?" or "Am I free Thursday afternoon?"</li>
  <li><strong>Meeting prep</strong> -- "I have a meeting with the design team at 2pm. What is the agenda, who is attending, and what should I prepare?"</li>
  <li><strong>Find free time</strong> -- "Find a 30-minute slot this week where both my calendar and Sarah's calendar are open."</li>
  <li><strong>Scheduling advice</strong> -- "I need to schedule a 1-hour strategy session with the leadership team. What are the best options next week?"</li>
  <li><strong>Daily briefings</strong> -- "Give me a briefing for today: what meetings do I have, what should I prepare for each, and where are the gaps in my schedule?"</li>
</ul>`
        },
        {
          id: 'cw4-5',
          type: 'code',
          title: 'Meeting Prep Workflow: Email + Calendar Combined',
          language: 'text',
          content: `User: I have a meeting with the Acme Corp team at 3pm today.
Help me prepare.

Claude's workflow (behind the scenes):
1. Checks Google Calendar for the 3pm meeting details
   -> Finds: "Acme Q1 Review" with 4 attendees, agenda link
2. Searches Gmail for recent Acme correspondence
   -> Finds: 8 email threads from the last 2 weeks
3. Synthesizes everything into a prep brief

Claude's response:
"Here is your prep brief for the Acme Q1 Review at 3pm:

MEETING DETAILS
- Attendees: Sarah Chen (VP Sales), Mike Torres (Account Mgr),
  Lisa Park (CS Lead), You
- Duration: 45 minutes
- Agenda: Q1 metrics review, renewal discussion, expansion plan

KEY CONTEXT FROM RECENT EMAILS
- Sarah flagged concerns about adoption in their engineering
  team (email from March 1)
- Mike confirmed they want to add 50 seats (email from Feb 28)
- Open issue: they requested a custom integration timeline
  (Lisa's thread from Feb 25, still unresolved)

RECOMMENDED TALKING POINTS
1. Address the engineering adoption concern with usage data
2. Present the 50-seat expansion pricing
3. Provide a timeline estimate for the custom integration
4. Confirm renewal terms for the upcoming contract cycle"`
        },
        {
          id: 'cw4-6',
          type: 'text',
          title: 'Security and Privacy',
          content: `<p>Understanding what Claude can and cannot access is important for trust:</p>
<ul>
  <li><strong>Read access only (by default)</strong> -- Connectors give Claude the ability to read your emails and calendar. Claude does not send emails or create calendar events unless you explicitly instruct it to and the Connector supports write actions.</li>
  <li><strong>Session-scoped</strong> -- Claude only accesses your connected services during active conversations. It does not continuously monitor your inbox or calendar in the background.</li>
  <li><strong>You control access</strong> -- You can disconnect any Connector at any time from Settings. Revoking access is immediate.</li>
  <li><strong>Data handling</strong> -- Anthropic's data retention policies apply. Email content and calendar data accessed through Connectors are subject to the same privacy protections as any other data in your Claude conversations.</li>
  <li><strong>No lateral sharing</strong> -- Data from your Connectors is not shared with other users, even within the same organization on a Team plan.</li>
</ul>`
        }
      ],
      exercise: {
        type: 'build',
        instructions: 'Enable at least one Connector (Gmail or Google Calendar) and use it for a real meeting prep workflow. Document: (1) which Connector(s) you enabled, (2) the prompt you used, (3) what Claude found and synthesized, and (4) how much time this saved compared to doing the prep manually. If you cannot enable a Connector, write out a detailed plan for how you would use the Gmail + Calendar Connectors for your next important meeting.',
        hints: [
          'Start with a meeting that is coming up in the next day or two so the context is fresh',
          'Ask Claude to combine email context with calendar details for a more useful briefing',
          'Try asking Claude to identify open questions or unresolved threads related to the meeting'
        ],
        validationCriteria: [
          'Enabled at least one Connector or provided a detailed plan',
          'Used the Connector for a specific, real meeting prep task',
          'Documented what Claude found and how it synthesized the information',
          'Reflected on time saved or expected efficiency gain'
        ]
      }
    } as LevelContent
  },

  // Level 5: Connectors: Slack, Drive & Beyond
  {
    levelNumber: 5,
    title: 'Connectors: Slack, Drive & Beyond',
    description: 'Expand your connected workflow with Slack, Google Drive, and other Connectors, and learn when to use Connectors vs MCPs',
    xpReward: 200,
    estimatedMinutes: 20,
    isFree: false,
    requiresVerification: true,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'cw5-1',
          type: 'text',
          title: 'Slack Connector',
          content: `<p>The Slack Connector brings your team communication into Claude's context. With it, Claude can:</p>
<ul>
  <li><strong>Search channels</strong> -- "Search the #product channel for discussions about the new pricing model from the last week."</li>
  <li><strong>Read threads</strong> -- "Read the thread in #engineering about the database migration and summarize the key decisions."</li>
  <li><strong>Draft messages</strong> -- "Draft a message for #announcements about the upcoming maintenance window. Include the date, duration, and what teams are affected."</li>
  <li><strong>Catch up on channels</strong> -- "I have been out for 3 days. Summarize the important discussions in #sales, #product, and #engineering."</li>
</ul>
<p>This is particularly valuable for managers and team leads who need to stay on top of multiple channels without reading every message. Claude can distill hours of Slack conversations into a 2-minute summary.</p>`
        },
        {
          id: 'cw5-2',
          type: 'text',
          title: 'Google Drive and Docs Connector',
          content: `<p>The Google Drive Connector lets Claude reference your stored documents during conversations:</p>
<ul>
  <li><strong>Reference documents</strong> -- "Look at the Q1 marketing plan in my Drive and suggest three improvements based on our actual Q1 results."</li>
  <li><strong>Cross-reference files</strong> -- "Compare the project brief in Drive with the latest Slack discussion in #project-alpha. Are we still aligned on scope?"</li>
  <li><strong>Summarize documents</strong> -- "Summarize the 30-page vendor evaluation document from my Drive into a one-page executive brief."</li>
  <li><strong>Update and iterate</strong> -- "Based on the feedback in this email thread, draft updated sections 3 and 4 of the proposal in my Drive."</li>
</ul>
<p>The Drive Connector is especially useful when your documents live in Google Workspace and you want Claude to work with them without the manual step of downloading and uploading files.</p>`
        },
        {
          id: 'cw5-3',
          type: 'text',
          title: 'Other Connectors and the Growing Ecosystem',
          content: `<p>Beyond Gmail, Calendar, Slack, and Drive, the Connector ecosystem continues to expand:</p>
<ul>
  <li><strong>Notion</strong> -- Access your team's knowledge base, project documentation, and meeting notes directly from Claude.</li>
  <li><strong>HubSpot</strong> -- Pull CRM data, contact information, and deal details into your conversations for sales and marketing workflows.</li>
  <li><strong>Zapier</strong> -- Connect Claude to thousands of apps through Zapier's automation platform, enabling workflows that span tools you already use.</li>
</ul>
<p>As more Connectors become available, the pattern remains the same: enable in Settings, authenticate, and start referencing that service in your conversations. No code required.</p>`
        },
        {
          id: 'cw5-4',
          type: 'code',
          title: 'Multi-Connector Workflow Example',
          language: 'text',
          content: `Scenario: Preparing a client quarterly business review (QBR)

User: I need to prepare for the Acme Corp QBR next Tuesday.
Pull together everything I need.

Claude combines data from multiple Connectors:

1. Google Calendar -> Finds the QBR meeting, attendees, agenda
2. Gmail -> Searches for Acme correspondence, finds 12 threads
3. Slack -> Searches #acme-account for internal team discussions
4. Google Drive -> Finds the QBR template and last quarter's deck

Claude's output:
"Here is your QBR prep package for Acme Corp:

MEETING: Tuesday 2pm, 60 minutes
ATTENDEES: [list from calendar]

FROM EMAIL: Key topics Acme has raised recently:
- Request for API rate limit increase (March 1)
- Question about SOC 2 compliance timeline (Feb 25)
- Positive feedback on new dashboard (Feb 20)

FROM SLACK (#acme-account):
- Engineering confirmed rate limit increase is feasible (Feb 28)
- CS noted NPS score improved from 7.2 to 8.1
- Sales flagged expansion conversation for 100 additional seats

FROM DRIVE: Last quarter's QBR deck shows:
- We committed to 3 features; 2 delivered, 1 delayed
- Usage grew 34% quarter-over-quarter

SUGGESTED AGENDA:
1. Celebrate wins (dashboard feedback, NPS improvement)
2. Address API rate limit request (confirmed feasible)
3. SOC 2 timeline update
4. Expansion discussion (100 seats)
5. Feature delivery update (address the delayed item)"`
        },
        {
          id: 'cw5-5',
          type: 'text',
          title: 'Connectors vs MCPs: When to Use Which',
          content: `<p>Both Connectors and MCPs (Model Context Protocol) let Claude interact with external services, but they serve different users and use cases:</p>
<ul>
  <li><strong>Connectors are no-code.</strong> Enable them in Settings with a few clicks. Perfect for business users, managers, and anyone who wants Claude to access their tools without technical setup.</li>
  <li><strong>MCPs are developer-oriented.</strong> They require installing and configuring MCP servers, often through a config file or terminal. They offer more power and customization, including access to custom databases, internal APIs, and specialized tools.</li>
  <li><strong>Connectors are curated.</strong> Anthropic builds and maintains them, ensuring quality and security. MCPs can be built by anyone -- Anthropic, third parties, or your own team.</li>
  <li><strong>MCPs offer deeper integration.</strong> If you need Claude to write to a database, execute code against an internal tool, or perform custom actions, MCPs are the right choice.</li>
</ul>
<p>Rule of thumb: If a Connector exists for your service and does what you need, use the Connector. If you need custom behavior, deeper integration, or access to an internal tool, build or install an MCP.</p>`
        },
        {
          id: 'cw5-6',
          type: 'warning',
          title: 'Privacy and Data Considerations',
          content: 'When you connect services to Claude, data from those services becomes part of your conversation context. Be mindful of what you are asking Claude to access, especially in shared accounts. Avoid pulling sensitive HR data, financial records, or confidential legal documents into Claude conversations unless your organization has approved that use case. Always check your company policies on AI tool usage with connected services.'
        }
      ],
      exercise: {
        type: 'build',
        instructions: 'Design a multi-Connector workflow for a real recurring task in your work. Document: (1) the task you want to automate or accelerate, (2) which 2 or more Connectors would be involved, (3) what data Claude would pull from each, (4) what the synthesized output would look like, and (5) how often you would use this workflow. If possible, test it live with enabled Connectors.',
        hints: [
          'Think about tasks where you currently alt-tab between 3+ apps to gather information',
          'QBR prep, weekly reports, onboarding new team members, and incident reviews are all great candidates',
          'Consider how combining Slack context with email context gives Claude a more complete picture'
        ],
        validationCriteria: [
          'Identifies a real, recurring task worth optimizing',
          'Involves at least 2 different Connectors',
          'Clearly describes what data comes from each Connector',
          'Describes a useful synthesized output',
          'Estimates frequency and time savings'
        ]
      }
    } as LevelContent
  },

  // Level 6: Cowork: Your Async AI Teammate
  {
    levelNumber: 6,
    title: 'Cowork: Your Async AI Teammate',
    description: 'Learn to use Cowork for background tasks that Claude completes while you focus on other things',
    xpReward: 250,
    estimatedMinutes: 25,
    isFree: false,
    requiresVerification: true,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'cw6-1',
          type: 'text',
          title: 'What Is Cowork?',
          content: `<p>Cowork is a capability in Claude that allows you to delegate substantial tasks that Claude works on asynchronously -- in the background -- while you focus on other work. Instead of a back-and-forth conversation where you wait for each response, you give Claude a clear assignment, step away, and come back to completed work.</p>
<p>Think of the difference between a quick question at a colleague's desk and assigning them a deliverable with a brief. Cowork is the latter. You define what you need, provide context, and Claude goes to work. When it finishes, you review the output, provide feedback, and iterate if needed.</p>
<p>Cowork is available directly in claude.ai and Claude Desktop -- no coding, no API, no special tools. It is designed for business users who need to delegate knowledge work, not just ask questions.</p>`
        },
        {
          id: 'cw6-2',
          type: 'text',
          title: 'How Cowork Differs from Regular Chat',
          content: `<p>Understanding the difference between Cowork and standard chat helps you decide when to use each:</p>
<ul>
  <li><strong>Task duration</strong> -- Chat is for quick exchanges (seconds to a few minutes). Cowork handles longer tasks that may run for several minutes to complete a full deliverable.</li>
  <li><strong>Runs while you are away</strong> -- In chat, you typically wait for the response. With Cowork, you kick off the task and go do something else. Claude notifies you when it is done.</li>
  <li><strong>Returns completed work</strong> -- Chat gives you a response. Cowork gives you a deliverable: a full draft, a complete analysis, a research brief, a structured dataset.</li>
  <li><strong>More structured input</strong> -- Because Cowork tasks are larger, investing time in clear instructions up front pays off significantly. A good Cowork brief is like a good creative brief: scope, audience, deliverable, constraints.</li>
  <li><strong>Review and feedback loop</strong> -- After Cowork delivers, you review the output and can send it back with feedback for refinement, similar to working with a human colleague.</li>
</ul>`
        },
        {
          id: 'cw6-3',
          type: 'text',
          title: 'Kicking Off a Cowork Task',
          content: `<p>Writing clear Cowork instructions is the most important skill for getting good results. A strong Cowork brief includes:</p>
<ol>
  <li><strong>Objective</strong> -- What is the deliverable? Be specific. "Write a competitive analysis" is better than "look into our competitors."</li>
  <li><strong>Scope</strong> -- What should be included and excluded? "Focus on pricing and feature comparison for the top 5 competitors in our segment."</li>
  <li><strong>Audience</strong> -- Who will read the output? "This is for the VP of Product to use in a board presentation."</li>
  <li><strong>Format</strong> -- How should the output be structured? "Produce a 2-page brief with an executive summary, comparison table, and recommendation section."</li>
  <li><strong>Context</strong> -- What background does Claude need? Upload relevant documents, provide links, or describe the situation.</li>
  <li><strong>Constraints</strong> -- Any rules or limitations? "Do not include companies with less than $10M in funding. Use only data from 2024 or later."</li>
</ol>
<p>The more specific your brief, the less iteration you will need afterward.</p>`
        },
        {
          id: 'cw6-4',
          type: 'code',
          title: 'Cowork Brief Examples by Department',
          language: 'text',
          content: `--- Marketing: Research Brief ---
TASK: Produce a research brief on content marketing trends
for B2B SaaS in 2025.
SCOPE: Focus on distribution channels, content formats, and
measurement approaches. Exclude B2C and e-commerce.
DELIVERABLE: 3-page brief with executive summary, 5 key
trends (each with supporting data), and 3 actionable
recommendations for our team.
AUDIENCE: Marketing leadership team.
CONTEXT: We are a 200-person SaaS company selling to
mid-market enterprises. Our current content strategy is
blog-heavy and we want to diversify.

--- Sales: Account Research ---
TASK: Research Acme Corp in preparation for our first
sales meeting.
SCOPE: Company overview, recent news, leadership team,
technology stack, likely pain points, and competitive
solutions they might be evaluating.
DELIVERABLE: One-page account brief with key talking
points and 3 discovery questions to ask.
AUDIENCE: Account executive preparing for the meeting.

--- Operations: Process Documentation ---
TASK: Draft a standard operating procedure for our
monthly close process.
SCOPE: Cover all steps from the 25th of the month through
final reporting on the 5th. Include responsible parties,
deadlines, and sign-off requirements.
DELIVERABLE: SOP document with numbered steps, a timeline
chart, and a checklist version.
CONTEXT: [Uploaded: current_close_notes.pdf, team_roster.csv]

--- HR: Meeting Prep Package ---
TASK: Prepare a briefing package for the quarterly
all-hands meeting.
SCOPE: Summarize key accomplishments, metrics, new hires,
and upcoming initiatives for Q1.
DELIVERABLE: Slide outline (10 slides), speaker notes for
each slide, and a suggested Q&A prep sheet.
CONTEXT: [Uploaded: q1_metrics.xlsx, new_hires.csv]`
        },
        {
          id: 'cw6-5',
          type: 'text',
          title: 'Monitoring, Reviewing, and Providing Feedback',
          content: `<p>Once you have kicked off a Cowork task, here is the workflow:</p>
<ul>
  <li><strong>Monitor progress</strong> -- Claude may show intermediate steps or status updates as it works. You can check in at any time without disrupting the task.</li>
  <li><strong>Review the deliverable</strong> -- When Claude finishes, review the output carefully. Check for accuracy, completeness, tone, and alignment with your brief.</li>
  <li><strong>Provide feedback</strong> -- If the output needs changes, send specific feedback. "The tone is too formal for an internal memo -- make it more conversational" or "Section 3 is missing the cost comparison data. Add that and recalculate the totals."</li>
  <li><strong>Iterate</strong> -- Claude will revise based on your feedback. Most Cowork tasks converge in 1-2 rounds of revision, similar to working with a skilled junior colleague.</li>
  <li><strong>Export and use</strong> -- Once you are satisfied, copy, download, or share the final output.</li>
</ul>
<p>The review step is critical. Cowork is a collaboration, not full automation. Your judgment, domain expertise, and quality standards are what turn Claude's output into a finished product.</p>`
        },
        {
          id: 'cw6-6',
          type: 'tip',
          title: 'Best Use Cases for Cowork',
          content: 'Cowork excels at tasks that are well-defined but time-consuming: research briefs, first drafts of documents, data analysis and summarization, competitive intelligence, meeting prep packages, and process documentation. It is less suited for tasks requiring real-time human judgment, tasks where the requirements are unclear, or highly creative work where the "right answer" depends on taste and instinct you have not yet articulated.'
        }
      ],
      exercise: {
        type: 'build',
        instructions: 'Start a Cowork task for a real work scenario. Write a complete Cowork brief including: (1) the objective, (2) the scope, (3) the audience, (4) the desired format, (5) relevant context or uploaded files, and (6) any constraints. If you have access to Cowork, run the task and document the results and any feedback you provided. If you do not have access, write the brief as if you were going to hand it off to a capable colleague.',
        hints: [
          'Choose a task that would normally take you 1-3 hours to do manually',
          'The more specific your brief, the better the output -- invest 5-10 minutes in writing clear instructions',
          'Include examples of what "good" looks like if you have them -- upload a previous version of a similar deliverable'
        ],
        validationCriteria: [
          'Brief includes all six components: objective, scope, audience, format, context, constraints',
          'The task is specific enough that someone could complete it without asking clarifying questions',
          'The deliverable format is clearly defined',
          'The brief reflects a real work scenario, not a hypothetical'
        ]
      }
    } as LevelContent
  },

  // Level 7: Cowork & Plugins: Advanced Workflows
  {
    levelNumber: 7,
    title: 'Cowork & Plugins: Advanced Workflows',
    description: 'Design multi-step Cowork workflows, understand Plugins for organizational capabilities, and learn the "Do I need to hire for this?" framework',
    xpReward: 250,
    estimatedMinutes: 25,
    isFree: false,
    requiresVerification: true,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'cw7-1',
          type: 'text',
          title: 'Multi-Step Cowork Workflows',
          content: `<p>Once you are comfortable with single Cowork tasks, the next level is chaining multiple tasks into a workflow. A multi-step Cowork workflow breaks a large project into sequential tasks, where the output of one feeds into the next.</p>
<p>Example: Producing a quarterly business review deck.</p>
<ol>
  <li><strong>Step 1: Research</strong> -- "Pull together our Q1 metrics from the uploaded spreadsheet and compare them to our targets. Flag anything more than 10% off target."</li>
  <li><strong>Step 2: Analysis</strong> -- "Based on the metrics summary, write a narrative analysis of our Q1 performance. Identify the top 3 wins and top 3 areas for improvement."</li>
  <li><strong>Step 3: Draft</strong> -- "Using the analysis, draft a 12-slide QBR deck outline with speaker notes. Follow the template structure from last quarter's deck (uploaded)."</li>
  <li><strong>Step 4: Review prep</strong> -- "Generate a list of likely questions the board will ask about these results and draft concise answers for each."</li>
</ol>
<p>Each step builds on the previous one, and you can review and course-correct between steps. This is how you handle complex, multi-hour projects with Cowork.</p>`
        },
        {
          id: 'cw7-2',
          type: 'text',
          title: 'Plugins: Organizational Capabilities',
          content: `<p>Plugins extend Claude's capabilities at the organizational level. While Skills are personal (you create them for yourself), Plugins are shared resources that benefit everyone in your organization.</p>
<p>Key differences between Plugins and Skills:</p>
<ul>
  <li><strong>Plugins are organizational</strong> -- One person builds a Plugin, and the entire team can use it. Skills are individual, scoped to your own account.</li>
  <li><strong>Plugins encode institutional knowledge</strong> -- They capture workflows, brand guidelines, domain expertise, and processes that are specific to your company.</li>
  <li><strong>Plugins are maintained centrally</strong> -- When the process changes, the Plugin is updated once and everyone gets the new version.</li>
  <li><strong>Skills are quick and personal</strong> -- They are great for individual productivity hacks and personal workflows. Plugins are for team-wide standardization.</li>
</ul>
<p>Think of Plugins as the difference between one person's personal checklist (a Skill) and the company's official standard operating procedure (a Plugin).</p>`
        },
        {
          id: 'cw7-3',
          type: 'code',
          title: 'Plugin Examples',
          language: 'text',
          content: `--- Example: Marketing Brand Voice Plugin ---
What it does: Ensures all Claude-generated marketing content
follows the company's brand guidelines. Encodes tone, vocabulary,
formatting rules, and approval criteria.

Who builds it: The brand marketing manager, once.
Who uses it: Every marketer, content writer, and social media
manager in the company.

Impact: Instead of each person writing their own style prompts
(inconsistently), the Plugin enforces brand consistency across
all content. New hires produce on-brand content from day one.

--- Example: Sales Playbook Plugin ---
What it does: Provides Claude with the company's sales methodology,
objection handling scripts, competitor positioning, and pricing
rules.

Who builds it: Sales enablement, once.
Who uses it: Every sales rep and account executive.

Impact: Reps get real-time coaching that is aligned with the
company's playbook. Competitive responses are consistent.
Pricing mistakes are avoided.

--- Example: Legal Review Plugin ---
What it does: Applies the company's contract review checklist
to any uploaded agreement. Flags non-standard terms, missing
clauses, and risk areas.

Who builds it: Legal ops, once.
Who uses it: Legal team, procurement, partnership managers.

Impact: First-pass contract review that used to take 2 hours
is done in minutes. Human lawyers focus on judgment calls,
not checklist items.`
        },
        {
          id: 'cw7-4',
          type: 'text',
          title: 'The "Do I Need to Hire for This?" Framework',
          content: `<p>One of the most strategic questions Cowork raises is: "Could this task be handled by Cowork instead of adding headcount?" This is not about replacing people -- it is about identifying work that is well-structured, repetitive, and time-consuming, where Cowork can handle the bulk of the effort.</p>
<p>Use this framework to evaluate:</p>
<ol>
  <li><strong>Is the task well-defined?</strong> -- Can you write a clear brief for it? If yes, Cowork is a strong candidate.</li>
  <li><strong>Is it repetitive?</strong> -- Does this task happen weekly, monthly, or per-client? Repetitive tasks benefit most from delegation to Cowork.</li>
  <li><strong>What is the current time investment?</strong> -- Track how long it takes a person to do this task. If it is 3+ hours per occurrence, the ROI of delegating to Cowork is high.</li>
  <li><strong>Does it require real-time judgment?</strong> -- If the task requires being in the room, reading body language, or making split-second decisions, it needs a person. If it requires research, synthesis, and writing, Cowork can handle it.</li>
  <li><strong>What is the quality bar?</strong> -- If the output needs to be 95% polished on the first pass, Cowork plus human review can achieve that. If it needs to be perfect with no review, keep a human in the loop.</li>
</ol>
<p>Common tasks where Cowork replaces incremental headcount: weekly reporting, competitive research, first-draft document creation, data summarization, meeting prep, and process documentation.</p>`
        },
        {
          id: 'cw7-5',
          type: 'warning',
          title: 'When NOT to Use Cowork',
          content: 'Cowork is not the right tool for everything. Avoid it for: time-sensitive tasks where you need an answer in the next 30 seconds (use regular chat), tasks requiring real-time human judgment or emotional intelligence (performance reviews, sensitive negotiations), situations where the requirements are too vague to write a brief ("just make it better"), and highly creative work where the direction emerges through iteration rather than specification.'
        },
        {
          id: 'cw7-6',
          type: 'tip',
          title: 'Time Tracking Tip',
          content: 'Start tracking how long tasks take you manually. When you delegate the same task to Cowork, note the time spent writing the brief plus reviewing the output. Over a month, compare the totals. Most teams find that Cowork reduces time on delegatable tasks by 60-80%, and the quality is consistent because the brief enforces standards.'
        }
      ],
      exercise: {
        type: 'build',
        instructions: 'Design a Cowork delegation plan for 3 real tasks from your work. For each task, document: (1) what the task is, (2) how long it currently takes a person, (3) whether it is a good Cowork candidate (using the framework), (4) the Cowork brief you would write, and (5) estimated time savings. Also identify one task that would benefit from being a Plugin rather than a one-off Cowork brief, and explain why.',
        hints: [
          'Look at your calendar from last week -- which meetings generated follow-up work that could be delegated?',
          'Consider tasks you have been meaning to do but keep deprioritizing because they are time-consuming',
          'For the Plugin candidate, think about a task that multiple people on your team do in slightly different ways'
        ],
        validationCriteria: [
          'Identifies 3 specific, real tasks from actual work',
          'Evaluates each task against the delegation framework',
          'Includes a Cowork brief for each delegatable task',
          'Estimates time savings with reasoning',
          'Identifies a Plugin candidate with clear justification'
        ]
      }
    } as LevelContent
  },

  // Level 8: The Surfaces Decision Framework
  {
    levelNumber: 8,
    title: 'The Surfaces Decision Framework',
    description: 'Master the complete decision tree for choosing the right Claude surface for any task',
    xpReward: 200,
    estimatedMinutes: 20,
    isFree: false,
    requiresVerification: true,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'cw8-1',
          type: 'text',
          title: 'The Complete Decision Tree',
          content: `<p>By this point, you understand the full landscape of Claude surfaces and capabilities. The challenge is no longer "what can Claude do?" but "which surface should I use for this specific task?" Here is the complete decision tree:</p>
<ul>
  <li><strong>Quick question or fast answer needed?</strong> -- Use Claude Chat (web or mobile). Ideal for lookups, definitions, quick drafts, and brainstorming. Response time: seconds.</li>
  <li><strong>Deep work with documents and context?</strong> -- Use Claude Desktop with Projects. Local file access, persistent project instructions, and distraction-free focus. Best for writing, editing, analysis, and document processing.</li>
  <li><strong>Async tasks, research, or large deliverables?</strong> -- Use Claude Cowork. Delegate the task with a brief and come back to completed work. Best for research briefs, first drafts, data analysis, and meeting prep packages.</li>
  <li><strong>Building software or working with code?</strong> -- Use Claude Code. The CLI-based coding agent that reads your codebase, writes code, runs tests, and commits changes. Purpose-built for developers.</li>
  <li><strong>Connecting to external tools and services?</strong> -- Use Connectors (no-code, for business users) or MCPs (developer-configured, for deeper integrations). Connectors for Gmail, Slack, Calendar, Drive; MCPs for custom databases, internal APIs, and specialized tools.</li>
  <li><strong>Organizational-level capabilities?</strong> -- Use Plugins. Encode institutional knowledge, brand guidelines, and standard processes once so the entire team benefits.</li>
  <li><strong>Programmatic access or building on top of Claude?</strong> -- Use the Anthropic API. For developers building applications, automations, and integrations that call Claude programmatically.</li>
</ul>`
        },
        {
          id: 'cw8-2',
          type: 'text',
          title: 'Decision Matrix: Four Dimensions',
          content: `<p>When the decision tree is not enough, evaluate your task across four dimensions:</p>
<p><strong>1. Task Type</strong></p>
<ul>
  <li>Conversational (Q&A, brainstorming) -- Chat</li>
  <li>Document-heavy (writing, editing, analysis) -- Desktop + Projects</li>
  <li>Research-heavy (multi-source investigation) -- Research Mode or Cowork</li>
  <li>Code-heavy (building, debugging, refactoring) -- Claude Code</li>
  <li>Integration-heavy (pulling data from tools) -- Connectors or MCPs</li>
</ul>
<p><strong>2. Technical Skill Required</strong></p>
<ul>
  <li>No technical skill -- Chat, Connectors, Cowork, Styles</li>
  <li>Some technical comfort -- Projects, Research Mode, Desktop</li>
  <li>Developer-level skill -- Claude Code, MCPs, API</li>
</ul>
<p><strong>3. Time Sensitivity</strong></p>
<ul>
  <li>Need it now (seconds) -- Chat</li>
  <li>Need it soon (minutes) -- Chat or Desktop</li>
  <li>Can wait (hours) -- Cowork</li>
  <li>Ongoing automation -- API, MCPs</li>
</ul>
<p><strong>4. Complexity</strong></p>
<ul>
  <li>Simple, single-step -- Chat</li>
  <li>Multi-step, structured -- Desktop + Projects or Cowork</li>
  <li>Complex, multi-system -- Connectors + Cowork or API</li>
</ul>`
        },
        {
          id: 'cw8-3',
          type: 'code',
          title: 'Real-World Scenarios with Recommended Surfaces',
          language: 'text',
          content: `Scenario 1: "I need to reply to this email quickly"
-> Claude Chat (mobile or web)
Why: Simple, time-sensitive, single task. No setup needed.

Scenario 2: "Write a 10-page technical specification"
-> Claude Desktop + Project
Why: Document-heavy, needs project context and file references.
Set up a project with relevant docs and architectural diagrams.

Scenario 3: "Research 5 competitors before our strategy offsite"
-> Claude Cowork (with Research Mode)
Why: Multi-step research, not time-sensitive, substantial
deliverable. Write a brief and let Cowork handle it overnight.

Scenario 4: "Refactor our authentication module"
-> Claude Code
Why: Codebase-level work. Claude Code reads your repo, makes
changes across files, and runs tests.

Scenario 5: "Pull my latest emails and calendar to prep
for tomorrow's meetings"
-> Connectors (Gmail + Calendar)
Why: Needs real-time data from your personal tools. Connectors
make this a one-prompt workflow.

Scenario 6: "Build a dashboard that pulls data from our
internal database"
-> Claude Code + MCP
Why: Requires code plus access to an internal system. Set up
an MCP for the database, then use Claude Code to build the UI.

Scenario 7: "Ensure all marketing content follows our brand"
-> Plugin
Why: Organizational capability. One person builds the brand
Plugin, the whole marketing team uses it.

Scenario 8: "Process 10,000 support tickets and categorize them"
-> Anthropic API
Why: Programmatic, high-volume task. Build a script that calls
the API for each ticket.`
        },
        {
          id: 'cw8-4',
          type: 'text',
          title: 'Combining Surfaces for Maximum Impact',
          content: `<p>The most powerful workflows combine multiple surfaces. Here are patterns that experienced Claude users rely on:</p>
<ul>
  <li><strong>Research + Draft</strong> -- Use Cowork with Research Mode to investigate a topic, then switch to Desktop with a Project to write the final document using the research as context.</li>
  <li><strong>Connectors + Cowork</strong> -- Use Connectors to pull together email, calendar, and Slack context, then kick off a Cowork task to synthesize everything into a deliverable.</li>
  <li><strong>Chat + Code</strong> -- Use Chat to prototype an approach or get architectural advice, then switch to Claude Code to implement it in your actual codebase.</li>
  <li><strong>Plugin + Cowork</strong> -- A Plugin encodes your company's standards and a Cowork task applies those standards to produce a deliverable. The Plugin ensures consistency; Cowork handles the heavy lifting.</li>
  <li><strong>Mobile + Desktop handoff</strong> -- Brainstorm on mobile during your commute using voice mode, then continue the same conversation on Desktop when you sit down to do focused work.</li>
</ul>
<p>The surfaces are not competing options -- they are complementary tools in a unified system. The skill is knowing when to reach for which one, and how to chain them together.</p>`
        },
        {
          id: 'cw8-5',
          type: 'tip',
          title: 'Start with the Task, Not the Tool',
          content: 'A common mistake is becoming comfortable with one surface and trying to force every task into it. Instead, start by clearly defining what you need to accomplish, then use the decision tree to pick the right surface. Over time, the selection becomes instinctive -- you will reach for the right tool without thinking about it.'
        },
        {
          id: 'cw8-6',
          type: 'text',
          title: 'Building Your Personal Workflow System',
          content: `<p>To make the decision framework practical, map it to your actual daily work. Audit a typical week and categorize your Claude-compatible tasks:</p>
<ul>
  <li><strong>Daily tasks</strong> -- Email triage (Connectors), meeting prep (Connectors + Chat), quick questions (Chat/Mobile). These become habits.</li>
  <li><strong>Weekly tasks</strong> -- Status reports (Cowork), research updates (Cowork + Research), code reviews (Claude Code). These become scheduled workflows.</li>
  <li><strong>Monthly/quarterly tasks</strong> -- QBR prep (multi-Connector + Cowork), competitive analysis (Research + Cowork), documentation updates (Desktop + Projects). These become delegation playbooks.</li>
  <li><strong>Ad hoc tasks</strong> -- Bug fixes (Claude Code), urgent analysis (Chat + file upload), presentation drafts (Desktop). These rely on your instinct for the right surface.</li>
</ul>
<p>Document your workflow system somewhere accessible. As you discover new patterns, add them. Within a few weeks, you will have a personalized Claude operating manual that makes you significantly more productive.</p>`
        }
      ],
      exercise: {
        type: 'build',
        instructions: 'Map 5 real tasks from your daily or weekly work to their optimal Claude surface. For each task, provide: (1) what the task is, (2) which Claude surface you would use and why, (3) the specific prompt or brief you would write, (4) any Connectors, Projects, or Styles involved, and (5) estimated time savings compared to your current approach. Bonus: identify one task you are currently not using Claude for but should be, based on the decision framework.',
        hints: [
          'Look at your last 5 days of work -- what consumed the most time?',
          'Include at least one task each from: Chat, Desktop/Projects, and Cowork',
          'For the bonus task, think about what you keep doing manually even though it could be delegated'
        ],
        validationCriteria: [
          'Maps exactly 5 real tasks to Claude surfaces',
          'Each mapping includes reasoning for why that surface is optimal',
          'Provides specific prompts or briefs for each task',
          'Mentions relevant supporting features (Connectors, Styles, Projects)',
          'Estimates time savings with justification'
        ]
      }
    } as LevelContent
  }
];

export default claudeWorkspaceLevels;
