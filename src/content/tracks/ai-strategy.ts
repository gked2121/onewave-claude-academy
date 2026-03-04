// AI Strategy & Fluency - Track Content
// Strategic AI adoption for managers, directors, and executives

import type { TrackLevel, LevelContent } from '@/lib/types';

export const AI_STRATEGY_TRACK_ID = 'ai-strategy';
export const AI_STRATEGY_COLOR = '#059669';

export const aiStrategyLevels: Omit<TrackLevel, 'id' | 'trackId'>[] = [
  // Level 1: The 4 D's of AI Fluency
  {
    levelNumber: 1,
    title: "The 4 D's of AI Fluency",
    description: 'Master the four core competencies that separate effective AI users from everyone else',
    xpReward: 150,
    estimatedMinutes: 15,
    isFree: true,
    requiresVerification: false,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'as1-1',
          type: 'text',
          title: 'Why AI Fluency Matters',
          content: `<p>AI fluency is not about knowing how to use a chatbot. It is a strategic competency that determines whether your organization extracts real value from AI investments or simply adds another tool to the shelf. The difference between a team that uses AI effectively and one that does not comes down to four core disciplines -- the 4 D's.</p>
<p>These four competencies work together as a cycle. Mastering one without the others leads to predictable failure patterns: delegating without discernment produces unreliable outputs; describing without diligence creates a false sense of productivity; discernment without delegation means you never actually hand work off to AI.</p>
<p>As a leader, your job is not just to develop these competencies yourself, but to build them across your entire team.</p>`
        },
        {
          id: 'as1-2',
          type: 'text',
          title: 'Delegation: Knowing What to Hand Off',
          content: `<p><strong>Delegation</strong> is the skill of identifying which tasks, decisions, and workflows should involve AI and which should remain purely human. This is arguably the highest-leverage skill because it determines where AI actually gets used.</p>
<p>Strong AI delegation means understanding:</p>
<ul>
  <li><strong>Tasks AI excels at</strong> -- summarization, first-draft generation, data analysis, pattern recognition, classification, translation, and format conversion</li>
  <li><strong>Tasks that require human judgment</strong> -- final strategic decisions, relationship-sensitive communications, ethical evaluations, and novel creative direction</li>
  <li><strong>The gray zone</strong> -- tasks where AI does the heavy lifting but a human reviews, refines, and approves the output (this is where most business value lives)</li>
</ul>
<p>A common mistake among new AI users is binary thinking: either AI does the whole task or the human does the whole task. In practice, the highest-value use cases are collaborative -- AI generates the first 80%, and the human refines the remaining 20%.</p>`
        },
        {
          id: 'as1-3',
          type: 'text',
          title: 'Description: Crafting Clear Instructions',
          content: `<p><strong>Description</strong> is the ability to articulate what you need from AI with enough clarity and context that it can deliver high-quality results. This is the operational sibling of prompt engineering, but it extends beyond individual prompts to encompass how you frame problems, provide context, and define success criteria.</p>
<p>Effective description includes:</p>
<ul>
  <li><strong>Context framing</strong> -- telling AI the role it should play, the audience for the output, and the standards it should meet</li>
  <li><strong>Specificity over vagueness</strong> -- "Write a 300-word executive summary of Q3 results emphasizing revenue growth and customer acquisition" versus "Summarize this report"</li>
  <li><strong>Constraints and guardrails</strong> -- specifying what the output should NOT include, format requirements, tone, and length</li>
  <li><strong>Iteration framing</strong> -- treating the first output as a starting point and knowing how to direct revisions</li>
</ul>
<p>Leaders who master description find that AI consistently produces outputs they can use with minimal revision. Those who do not master it waste time re-prompting or, worse, accept mediocre outputs.</p>`
        },
        {
          id: 'as1-4',
          type: 'text',
          title: 'Discernment: Evaluating AI Output Quality',
          content: `<p><strong>Discernment</strong> is the critical thinking skill applied specifically to AI outputs. It is the ability to quickly and accurately evaluate whether AI-generated content is correct, complete, appropriately nuanced, and safe to use in a business context.</p>
<p>Key aspects of discernment:</p>
<ul>
  <li><strong>Factual accuracy</strong> -- AI can state incorrect information with high confidence. Can you spot when numbers, dates, claims, or attributions are wrong?</li>
  <li><strong>Logical coherence</strong> -- does the output follow sound reasoning, or does it contain subtle logical gaps?</li>
  <li><strong>Tone and audience fit</strong> -- is the language appropriate for the intended recipient and context?</li>
  <li><strong>Completeness</strong> -- did AI address all parts of your request, or did it quietly skip difficult elements?</li>
  <li><strong>Bias detection</strong> -- is the output balanced and fair, or does it reflect patterns that could be problematic?</li>
</ul>
<p>Discernment is particularly important for leaders because their outputs often carry organizational authority. A factual error in an internal memo is embarrassing; a factual error in a client deliverable or board presentation is damaging.</p>`
        },
        {
          id: 'as1-5',
          type: 'text',
          title: 'Diligence: Verification, Iteration, and QA',
          content: `<p><strong>Diligence</strong> is the discipline of consistently verifying AI outputs, iterating to improve quality, and maintaining quality assurance standards even when AI makes the work feel easy.</p>
<p>Diligence in practice means:</p>
<ul>
  <li><strong>Never publishing a first draft</strong> -- always review and refine AI-generated content before it reaches its audience</li>
  <li><strong>Cross-referencing claims</strong> -- when AI cites data or makes factual assertions, verify them against primary sources</li>
  <li><strong>Systematic iteration</strong> -- rather than accepting "good enough," pushing AI for better results through follow-up prompts and refinement</li>
  <li><strong>Establishing review workflows</strong> -- creating team processes for AI-assisted content that include human review checkpoints</li>
  <li><strong>Maintaining audit trails</strong> -- keeping records of what was AI-generated and what was human-verified, especially for compliance-sensitive work</li>
</ul>
<p>The biggest risk in AI adoption is not that AI produces bad outputs -- it is that speed and convenience erode the habits of verification. Diligence is the discipline that prevents this.</p>`
        },
        {
          id: 'as1-6',
          type: 'text',
          title: 'Self-Assessment: Rate Yourself on Each D',
          content: `<p>Take a moment to honestly rate yourself on each of the 4 D's using a 1-5 scale, where 1 means "I have not developed this skill" and 5 means "I consistently demonstrate this at a high level."</p>
<ul>
  <li><strong>Delegation (1-5):</strong> Do you regularly identify tasks that could benefit from AI assistance? Do you have a clear framework for deciding what to hand off?</li>
  <li><strong>Description (1-5):</strong> When you use AI, do you get high-quality outputs on the first or second try? Can you articulate requirements clearly enough that AI understands context and constraints?</li>
  <li><strong>Discernment (1-5):</strong> Can you quickly spot errors, omissions, or quality issues in AI output? Do you evaluate AI content as critically as you would evaluate work from a new team member?</li>
  <li><strong>Diligence (1-5):</strong> Do you consistently verify AI outputs before sharing them? Have you established review processes for AI-assisted work on your team?</li>
</ul>
<p>Most leaders find they are strong in one or two areas and weaker in others. Your lowest-scoring D is likely where the biggest gains are available. As you progress through this track, you will build practical skills in each area.</p>`
        }
      ]
    } as LevelContent
  },

  // Level 2: Model Selection: Haiku vs Sonnet vs Opus
  {
    levelNumber: 2,
    title: 'Model Selection: Haiku vs Sonnet vs Opus',
    description: 'Learn when to use each Claude model to optimize for speed, quality, and cost',
    xpReward: 200,
    estimatedMinutes: 20,
    isFree: true,
    requiresVerification: true,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'as2-1',
          type: 'text',
          title: 'Why Model Selection Matters',
          content: `<p>Anthropic offers multiple Claude models, each optimized for different use cases. Choosing the right model for each task is a strategic decision that directly impacts three variables: output quality, response speed, and cost.</p>
<p>Think of model selection like staffing decisions. You would not assign a senior VP to sort mail, and you would not ask an intern to present to the board. The same logic applies to AI models:</p>
<ul>
  <li><strong>Over-indexing on the most powerful model</strong> wastes budget and slows down simple tasks</li>
  <li><strong>Under-indexing with the cheapest model</strong> produces subpar results on complex work</li>
  <li><strong>Strategic model routing</strong> matches the right capability level to each task, optimizing all three variables simultaneously</li>
</ul>
<p>Organizations that master model selection typically reduce their AI costs by 40-60% while maintaining or improving output quality.</p>`
        },
        {
          id: 'as2-2',
          type: 'text',
          title: 'Haiku 4.5: Speed and Efficiency',
          content: `<p><strong>Claude Haiku 4.5</strong> is the fastest and most cost-effective model in the Claude family. It is designed for high-volume, straightforward tasks where speed matters more than deep reasoning.</p>
<p>Haiku excels at:</p>
<ul>
  <li><strong>Classification and routing</strong> -- sorting emails, categorizing support tickets, tagging content</li>
  <li><strong>Simple question answering</strong> -- FAQ responses, factual lookups, basic explanations</li>
  <li><strong>Data extraction</strong> -- pulling structured information from unstructured text (names, dates, amounts)</li>
  <li><strong>Format conversion</strong> -- converting between data formats, reformatting text</li>
  <li><strong>Content moderation</strong> -- screening content against policies at high throughput</li>
</ul>
<p>Haiku is ideal for any task that a competent human could complete quickly without deep thought. If the task has a clear right answer and does not require nuance, Haiku is likely your best choice.</p>
<p><strong>When NOT to use Haiku:</strong> multi-step reasoning, nuanced writing, complex code generation, tasks requiring deep domain expertise, or anything where subtle quality differences matter.</p>`
        },
        {
          id: 'as2-3',
          type: 'text',
          title: 'Sonnet 4.6: The Balanced Daily Driver',
          content: `<p><strong>Claude Sonnet 4.6</strong> is the balanced model that handles the majority of business tasks well. It offers a strong combination of quality, speed, and cost-effectiveness, making it the default choice for most workflows.</p>
<p>Sonnet excels at:</p>
<ul>
  <li><strong>Business writing</strong> -- emails, reports, proposals, presentations, and internal communications</li>
  <li><strong>Code generation and review</strong> -- writing functions, debugging, refactoring, and code explanations</li>
  <li><strong>Analysis and synthesis</strong> -- analyzing documents, comparing options, summarizing research</li>
  <li><strong>Creative content</strong> -- marketing copy, blog posts, social media content</li>
  <li><strong>Multi-step tasks</strong> -- workflows that require following several instructions in sequence</li>
</ul>
<p>Sonnet is the model you should reach for by default. It handles 70-80% of typical business tasks at a quality level that requires minimal human revision. Think of it as your reliable senior associate -- capable, efficient, and consistently good.</p>
<p><strong>When to upgrade to Opus:</strong> when Sonnet's output feels shallow, when the task requires synthesizing complex information from multiple domains, or when the stakes are high enough that the quality difference justifies the cost.</p>`
        },
        {
          id: 'as2-4',
          type: 'text',
          title: 'Opus 4.6: Deep Reasoning and Complex Strategy',
          content: `<p><strong>Claude Opus 4.6</strong> is the most capable model, designed for tasks that require deep reasoning, nuanced judgment, and sophisticated synthesis. It is the most expensive and slowest model, but it delivers meaningfully better results on complex work.</p>
<p>Opus excels at:</p>
<ul>
  <li><strong>Strategic analysis</strong> -- market analysis, competitive intelligence, scenario planning, and risk assessment</li>
  <li><strong>Complex document creation</strong> -- board presentations, investment memos, detailed technical architectures</li>
  <li><strong>Multi-domain synthesis</strong> -- connecting insights across financial, operational, and market data</li>
  <li><strong>Nuanced communication</strong> -- stakeholder communications that require political sensitivity and precise framing</li>
  <li><strong>Advanced code architecture</strong> -- system design, complex algorithms, and code that requires understanding broad context</li>
  <li><strong>Long-form reasoning</strong> -- tasks that require maintaining coherence across thousands of words while building a logical argument</li>
</ul>
<p>Reserve Opus for high-stakes, high-complexity work. If you are preparing a deliverable for the C-suite, a client, or the board, Opus is worth the premium. For internal drafts and routine tasks, Sonnet delivers 90% of the value at a fraction of the cost.</p>`
        },
        {
          id: 'as2-5',
          type: 'text',
          title: 'Cost and Performance Comparison',
          content: `<p>Understanding the relative cost and performance profile of each model helps you make informed routing decisions.</p>
<ul>
  <li><strong>Haiku 4.5</strong> -- Fastest response time (under 2 seconds for most tasks). Lowest cost per token. Best throughput for high-volume pipelines. Quality is strong for straightforward tasks but drops off quickly as complexity increases.</li>
  <li><strong>Sonnet 4.6</strong> -- Moderate response time (2-10 seconds for typical tasks). Mid-range cost per token. Quality is consistently good across a wide range of tasks. The sweet spot for most business applications.</li>
  <li><strong>Opus 4.6</strong> -- Longest response time (5-30 seconds or more for complex tasks). Highest cost per token. Noticeably better quality on complex reasoning, nuanced writing, and multi-step analysis. The premium is justified for high-stakes deliverables.</li>
</ul>
<p>A practical rule of thumb for organizations:</p>
<ul>
  <li><strong>60% of tasks</strong> should route to Haiku or Sonnet (high-volume, routine work)</li>
  <li><strong>30% of tasks</strong> should use Sonnet (moderate complexity, daily work)</li>
  <li><strong>10% of tasks</strong> should use Opus (complex, high-stakes deliverables)</li>
</ul>
<p>This distribution typically delivers strong results while keeping costs manageable.</p>`
        },
        {
          id: 'as2-6',
          type: 'tip',
          title: 'Model Selection Decision Framework',
          content: 'Ask three questions to choose the right model: (1) How complex is the reasoning required? Simple = Haiku, moderate = Sonnet, deep = Opus. (2) What are the stakes if the output is imperfect? Low = Haiku, medium = Sonnet, high = Opus. (3) How much volume will you run? High volume favors Haiku for cost efficiency. When in doubt, start with Sonnet and upgrade to Opus only if the quality is not sufficient.'
        }
      ],
      exercise: {
        type: 'build',
        instructions: 'Classify the following 10 tasks to the appropriate Claude model tier (Haiku, Sonnet, or Opus). For each task, explain your reasoning based on complexity, stakes, and volume considerations.\n\n1. Categorizing 5,000 customer support tickets by topic\n2. Writing a board presentation on the company\'s AI strategy\n3. Generating a weekly team status email from bullet points\n4. Analyzing a competitor\'s 50-page annual report for strategic insights\n5. Extracting names and email addresses from a batch of business cards\n6. Drafting a blog post about industry trends\n7. Creating a detailed financial model explanation for investors\n8. Reformatting CSV data into a JSON structure\n9. Writing a sensitive communication to employees about organizational changes\n10. Summarizing meeting notes into action items',
        hints: [
          'Consider both the complexity of the task and the stakes of getting it wrong',
          'High-volume tasks almost always favor Haiku for cost efficiency',
          'Board-level and investor-facing content justifies Opus pricing',
          'Most routine business writing is a natural fit for Sonnet'
        ],
        validationCriteria: [
          'Each task is assigned to a specific model tier',
          'Reasoning references complexity, stakes, or volume for each assignment',
          'High-volume extraction tasks are correctly routed to Haiku',
          'High-stakes strategic tasks are correctly routed to Opus',
          'Routine business tasks are correctly routed to Sonnet'
        ]
      }
    } as LevelContent
  },

  // Level 3: Enterprise Search
  {
    levelNumber: 3,
    title: 'Enterprise Search',
    description: 'Leverage organizational knowledge through Claude\'s Enterprise Search capabilities',
    xpReward: 250,
    estimatedMinutes: 25,
    isFree: false,
    requiresVerification: true,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'as3-1',
          type: 'text',
          title: 'What is Enterprise Search?',
          content: `<p>Enterprise Search is a capability available in Claude Teams and Enterprise plans that allows Claude to search across your organization's internal knowledge base during conversations. Instead of relying solely on its training data, Claude can retrieve and reference your company's actual documents, policies, reports, and institutional knowledge.</p>
<p>This solves one of the biggest limitations of general AI assistants: they do not know anything about <em>your</em> organization. Without Enterprise Search, every conversation with Claude starts from zero -- you have to paste in context, upload documents, and explain your company's specifics. With Enterprise Search, Claude can find and reference that information on its own.</p>
<p>The business impact is significant:</p>
<ul>
  <li><strong>Reduced onboarding time</strong> -- new employees can ask Claude about company processes and get answers grounded in actual documentation</li>
  <li><strong>Faster decision-making</strong> -- leaders can ask "What was our Q3 retention rate?" and get answers pulled from real reports</li>
  <li><strong>Institutional knowledge preservation</strong> -- critical knowledge that lives in documents (not just in people's heads) becomes accessible to everyone</li>
  <li><strong>Consistent answers</strong> -- everyone in the organization gets responses grounded in the same source of truth</li>
</ul>`
        },
        {
          id: 'as3-2',
          type: 'text',
          title: 'How Enterprise Search Indexes Knowledge',
          content: `<p>Enterprise Search works by connecting to your organization's knowledge repositories and creating a searchable index that Claude can query in real time. Understanding how this indexing works helps you optimize what Claude can find.</p>
<p>The indexing process:</p>
<ul>
  <li><strong>Source connection</strong> -- administrators connect knowledge sources such as Google Drive, Notion, Confluence, SharePoint, or other document repositories</li>
  <li><strong>Content ingestion</strong> -- the system reads and processes documents, extracting text, metadata, and structural information</li>
  <li><strong>Semantic indexing</strong> -- content is indexed not just by keywords but by meaning, allowing Claude to find relevant information even when the exact words differ</li>
  <li><strong>Continuous sync</strong> -- as documents are updated, the index refreshes to reflect the latest versions</li>
  <li><strong>Permission enforcement</strong> -- search results respect the original document permissions, so users only see content they are authorized to access</li>
</ul>
<p>This is not a simple keyword search. Semantic indexing means Claude can understand that "customer churn" and "client attrition" refer to the same concept, and it will find relevant documents regardless of which term was used.</p>`
        },
        {
          id: 'as3-3',
          type: 'text',
          title: 'Configuring Search Sources',
          content: `<p>Setting up Enterprise Search effectively requires thoughtful decisions about what to index and how to organize it. As a leader, you should be involved in these decisions because they determine what Claude can and cannot find.</p>
<p>Key configuration decisions:</p>
<ul>
  <li><strong>Which repositories to connect</strong> -- start with high-value, frequently referenced knowledge bases. Company wikis, policy documents, process guides, and reporting archives are high-priority. Avoid indexing personal drafts, outdated archives, or sensitive HR files.</li>
  <li><strong>Folder and permission structure</strong> -- ensure your document permissions are clean before connecting. Enterprise Search inherits these permissions, so messy access controls will create messy search results.</li>
  <li><strong>Document quality</strong> -- the AI can only retrieve what exists. If your documentation is outdated, incomplete, or poorly organized, the search results will reflect that. Consider a documentation cleanup before launching Enterprise Search.</li>
  <li><strong>Naming conventions</strong> -- well-titled documents with clear headings and metadata are easier for the system to index and retrieve accurately.</li>
</ul>`
        },
        {
          id: 'as3-4',
          type: 'text',
          title: 'Using Search in Conversations',
          content: `<p>Once Enterprise Search is configured, using it in conversations is straightforward. Claude automatically searches when a question would benefit from organizational context, and you can also explicitly direct it to search.</p>
<p>Effective search queries:</p>
<ul>
  <li><strong>Direct requests</strong> -- "Find our Q3 revenue report and summarize the key metrics" tells Claude exactly what to look for</li>
  <li><strong>Policy questions</strong> -- "What is our company's policy on remote work?" retrieves and synthesizes policy documents</li>
  <li><strong>Process lookups</strong> -- "How do we onboard new enterprise clients?" finds process documentation</li>
  <li><strong>Historical context</strong> -- "What decisions were made at last month's leadership offsite?" searches meeting notes and summaries</li>
  <li><strong>Cross-referencing</strong> -- "Compare our current marketing strategy with the one we used in Q1" finds and analyzes multiple documents</li>
</ul>
<p>Tips for getting the best search results:</p>
<ul>
  <li>Be specific about the document type or time period when possible</li>
  <li>Use the terminology your organization actually uses in its documents</li>
  <li>If Claude does not find what you need, rephrase with alternative terms your team might have used</li>
  <li>Ask Claude to cite the specific documents it found so you can verify the information</li>
</ul>`
        },
        {
          id: 'as3-5',
          type: 'text',
          title: 'Making Organizational Knowledge Searchable',
          content: `<p>Enterprise Search is only as good as the knowledge base it indexes. Leaders play a critical role in ensuring their organization's knowledge is actually searchable and useful. This is a strategic initiative, not just an IT configuration task.</p>
<p>Building a searchable knowledge base:</p>
<ul>
  <li><strong>Audit existing documentation</strong> -- identify gaps, outdated content, and duplicates. Create a plan to address the most impactful gaps first.</li>
  <li><strong>Establish documentation standards</strong> -- define templates for common document types (meeting notes, project briefs, post-mortems, process guides). Consistent structure makes content more searchable.</li>
  <li><strong>Create a documentation culture</strong> -- make documentation a natural part of workflows rather than an afterthought. If decisions happen in meetings, meeting notes should be standard. If processes change, the process guide should be updated the same day.</li>
  <li><strong>Designate knowledge owners</strong> -- assign responsibility for keeping key knowledge areas current. Without owners, documentation decays quickly.</li>
  <li><strong>Measure and improve</strong> -- track which searches succeed and which fail. Use failed searches to identify documentation gaps and prioritize new content creation.</li>
</ul>`
        },
        {
          id: 'as3-6',
          type: 'warning',
          title: 'Security and Compliance Considerations',
          content: 'Enterprise Search inherits document permissions, but leaders should still audit what gets indexed. Ensure that confidential HR information, legal matters under privilege, unreleased financial data, and other sensitive content is excluded from the search index or restricted to appropriate access groups. Work with your IT and legal teams to establish clear policies about what should and should not be searchable.'
        }
      ],
      exercise: {
        type: 'build',
        instructions: 'Design a comprehensive Enterprise Search strategy for your organization (or a hypothetical one). Your strategy should include:\n\n1. Knowledge Source Inventory -- list at least 5 knowledge repositories you would connect and explain why each is valuable\n2. Priority Ranking -- rank your sources by business impact and explain your reasoning\n3. Documentation Gap Analysis -- identify 3 areas where documentation is likely missing or outdated\n4. Permission Audit Plan -- describe how you would review and clean up document permissions before launch\n5. Success Metrics -- define 3-4 metrics you would track to measure whether Enterprise Search is delivering value\n6. Rollout Plan -- outline a phased approach to launching Enterprise Search across the organization',
        hints: [
          'Start with the knowledge sources that are most frequently referenced by the most people',
          'Consider both formal documentation (wikis, guides) and informal knowledge (meeting notes, Slack threads)',
          'Think about what questions new employees ask most frequently -- those represent high-value search targets',
          'Success metrics should tie back to business outcomes like time saved or decision speed'
        ],
        validationCriteria: [
          'Lists at least 5 knowledge sources with clear rationale for each',
          'Includes a priority ranking with business impact reasoning',
          'Identifies specific documentation gaps with a plan to address them',
          'Addresses permission and security considerations',
          'Defines measurable success metrics tied to business outcomes',
          'Presents a phased rollout approach'
        ]
      }
    } as LevelContent
  },

  // Level 4: The 5x Productivity Framework
  {
    levelNumber: 4,
    title: 'The 5x Productivity Framework',
    description: 'Identify where AI can multiply your team\'s output and build the business case for investment',
    xpReward: 250,
    estimatedMinutes: 25,
    isFree: false,
    requiresVerification: true,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'as4-1',
          type: 'text',
          title: 'The 5x Concept: AI as a Force Multiplier',
          content: `<p>The 5x Productivity Framework is built on a simple premise: in many knowledge-work roles, AI can enable one person to produce the output that previously required five. This is not about working five times harder -- it is about eliminating the repetitive, time-consuming components of work so that human effort is focused on the high-judgment tasks that actually drive value.</p>
<p>This framework matters for leaders because it reframes AI adoption from a technology question ("Should we use AI?") to a strategic capacity question ("Where can AI replace the need for incremental headcount?"). Every time you consider hiring an additional person, you should first ask: "Could AI, combined with our existing team, handle this workload increase?"</p>
<p>The 5x number is not universal -- some tasks see 10x gains, others see 2x. But across a typical knowledge-work role, the aggregate productivity increase is substantial enough to fundamentally change how you think about team sizing, budgeting, and capacity planning.</p>
<p>Key principles of the framework:</p>
<ul>
  <li><strong>Identify repetitive high-volume tasks</strong> that consume disproportionate time</li>
  <li><strong>Measure current time investment</strong> accurately before projecting savings</li>
  <li><strong>Calculate compound impact</strong> -- time saved on one task frees capacity for others</li>
  <li><strong>Account for quality improvements</strong> -- AI often improves consistency alongside speed</li>
</ul>`
        },
        {
          id: 'as4-2',
          type: 'text',
          title: 'Finding High-Leverage AI Opportunities',
          content: `<p>Not all tasks benefit equally from AI assistance. The highest-leverage opportunities share specific characteristics. Learning to identify these characteristics is a core skill for any leader driving AI adoption.</p>
<p>The High-Leverage Task Criteria:</p>
<ul>
  <li><strong>High frequency</strong> -- tasks that occur daily or weekly have more total time to save than quarterly tasks</li>
  <li><strong>Significant time per occurrence</strong> -- tasks that take 30+ minutes per occurrence are better candidates than 5-minute tasks</li>
  <li><strong>Structured input/output</strong> -- tasks with relatively predictable formats (reports, emails, analyses) are easier for AI to handle than completely unstructured creative work</li>
  <li><strong>Pattern-based</strong> -- tasks that follow a recognizable pattern, even with variation in specifics (each sales proposal is different, but they all follow a similar structure)</li>
  <li><strong>Low ambiguity tolerance</strong> -- tasks where "good enough" quality is acceptable for the first draft, with human review catching any issues</li>
</ul>
<p>Common high-leverage opportunities by function:</p>
<ul>
  <li><strong>Sales:</strong> proposal drafting, call summary generation, CRM data entry, competitive research</li>
  <li><strong>Marketing:</strong> content creation, campaign analysis, social media management, reporting</li>
  <li><strong>Finance:</strong> report generation, variance analysis, forecast narratives, compliance documentation</li>
  <li><strong>Operations:</strong> process documentation, status reporting, vendor communication, meeting summaries</li>
  <li><strong>HR:</strong> job description writing, policy documentation, training material creation, candidate screening summaries</li>
</ul>`
        },
        {
          id: 'as4-3',
          type: 'text',
          title: 'ROI Calculation: Time Saved x Frequency x Value',
          content: `<p>Building a credible business case for AI investment requires quantifying the return. The core formula is straightforward:</p>
<p><strong>Annual AI ROI = (Time Saved per Task) x (Task Frequency per Year) x (Hourly Value of Time)</strong></p>
<p>Working through an example:</p>
<ul>
  <li><strong>Task:</strong> Writing weekly client status reports</li>
  <li><strong>Current time per report:</strong> 45 minutes</li>
  <li><strong>Time with AI assistance:</strong> 10 minutes (AI drafts, human reviews and sends)</li>
  <li><strong>Time saved per occurrence:</strong> 35 minutes</li>
  <li><strong>Frequency:</strong> 50 reports per year (weekly, minus holidays)</li>
  <li><strong>Total time saved:</strong> 1,750 minutes = ~29 hours per year</li>
  <li><strong>Hourly fully-loaded cost:</strong> $75/hour</li>
  <li><strong>Annual value of time saved:</strong> $2,175 per person</li>
  <li><strong>Across a team of 10:</strong> $21,750 per year -- from a single task</li>
</ul>
<p>When you stack multiple tasks, the numbers become compelling quickly. A typical knowledge worker has 5-10 tasks that are strong AI candidates. Across all of them, annual savings per person often reach $15,000-$40,000 in reclaimed productive time.</p>`
        },
        {
          id: 'as4-4',
          type: 'text',
          title: 'The Hire vs. Automate Decision Matrix',
          content: `<p>When your team faces a capacity constraint, the traditional response is to hire. The 5x Framework adds a critical step: before approving a new headcount, evaluate whether AI can absorb the workload increase.</p>
<p>Use this decision matrix to evaluate each situation:</p>
<ul>
  <li><strong>Automate (AI handles it):</strong> The capacity gap is driven by repetitive, pattern-based tasks. The work does not require deep relationship building or novel strategic thinking. Quality can be maintained with human review of AI output. Examples: data entry backlog, report generation volume, content production scaling.</li>
  <li><strong>Augment (AI + existing team):</strong> The capacity gap spans both routine and judgment-heavy work. AI can handle the routine portions, freeing existing team members for higher-value work. Examples: a growing client portfolio where AI handles reporting while humans focus on relationship management.</li>
  <li><strong>Hire (human required):</strong> The capacity gap is driven by work that requires deep human judgment, relationship building, creative direction, or physical presence. AI cannot meaningfully reduce the time required. Examples: new market expansion requiring on-the-ground relationships, senior leadership roles, roles requiring professional licensure.</li>
</ul>
<p>The goal is not to avoid hiring altogether. It is to ensure that every new hire is focused on work that genuinely requires a human, while AI handles the tasks that do not.</p>`
        },
        {
          id: 'as4-5',
          type: 'text',
          title: 'Building the Business Case for AI Investment',
          content: `<p>Once you have identified opportunities and calculated ROI, you need to build a compelling business case. Here is a framework that resonates with executive decision-makers:</p>
<ul>
  <li><strong>Current State</strong> -- document how time is currently spent across the team. Use time audits or estimates to quantify hours spent on AI-automatable tasks. Be specific: "Our 8-person sales team spends a combined 40 hours per week on proposal drafting and CRM updates."</li>
  <li><strong>Proposed State</strong> -- describe how AI changes the workflow. Show the before/after for specific tasks with time estimates. Be realistic: do not claim 100% automation; show the human-in-the-loop model.</li>
  <li><strong>Financial Impact</strong> -- present the ROI calculation. Include hard savings (avoided hires, reduced overtime) and soft benefits (faster turnaround, improved consistency, higher employee satisfaction from eliminating drudge work).</li>
  <li><strong>Investment Required</strong> -- detail the costs: AI platform subscription, training time, implementation effort, and ongoing management. Be transparent about the investment needed to capture the returns.</li>
  <li><strong>Risk Mitigation</strong> -- address concerns about quality, security, and compliance. Describe review workflows, data handling policies, and guardrails.</li>
  <li><strong>Timeline and Milestones</strong> -- propose a phased rollout with measurable checkpoints. Start with a pilot team or function, prove the value, then expand.</li>
</ul>`
        },
        {
          id: 'as4-6',
          type: 'tip',
          title: 'Start Small and Prove Value Fast',
          content: 'The most successful AI business cases start with a single team and 2-3 high-impact tasks. Run a 30-day pilot, measure results rigorously, and use real data to justify broader rollout. Executive sponsors are far more persuaded by "we tried it with the sales team and saved 25 hours per week" than by theoretical projections.'
        }
      ],
      exercise: {
        type: 'build',
        instructions: 'Calculate the AI ROI for 3 tasks in your current role (or a role you manage). For each task, document:\n\n1. Task Description -- what the task involves and who does it\n2. Current Time Investment -- minutes per occurrence and frequency (daily/weekly/monthly)\n3. AI-Assisted Time Estimate -- how long it would take with AI handling the first draft or bulk of the work\n4. Time Saved per Year -- calculated from the difference and frequency\n5. Dollar Value -- using a reasonable fully-loaded hourly rate for the role\n6. Team Multiplier -- total value across all team members who perform this task\n\nThen summarize:\n- Total annual value across all 3 tasks\n- Which task has the highest ROI and why\n- What would you need to invest (time, tools, training) to capture this value\n- A one-paragraph business case you could present to your leadership',
        hints: [
          'Choose tasks you actually do frequently -- the ROI calculation is more credible with real numbers',
          'Be conservative in your AI time savings estimates; underestimate rather than overestimate',
          'Remember to include the team multiplier -- savings per person multiplied by team size',
          'A fully-loaded hourly rate includes salary, benefits, overhead -- typically 1.3-1.5x the base hourly rate'
        ],
        validationCriteria: [
          'Three distinct tasks are identified with clear descriptions',
          'Time calculations are specific and mathematically correct',
          'AI-assisted estimates are realistic, not assuming 100% automation',
          'Dollar values use a reasonable fully-loaded hourly rate',
          'Team multiplier is applied where appropriate',
          'Summary includes a concise business case paragraph'
        ]
      }
    } as LevelContent
  },

  // Level 5: Building Your AI-First Workflow (Capstone)
  {
    levelNumber: 5,
    title: 'Building Your AI-First Workflow (Capstone)',
    description: 'Design a complete personal AI workflow and create your adoption roadmap',
    xpReward: 250,
    estimatedMinutes: 25,
    isFree: false,
    requiresVerification: true,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'as5-1',
          type: 'text',
          title: 'Auditing Your Current Workflow',
          content: `<p>Building an AI-first workflow starts with an honest audit of how you currently spend your time. Most leaders underestimate how much of their week is consumed by tasks that AI could accelerate or handle entirely.</p>
<p>Conduct a one-week time audit using this approach:</p>
<ul>
  <li><strong>Track every task</strong> -- for one week, log what you work on in 30-minute blocks. Include meetings, email, document creation, review, research, and administrative work.</li>
  <li><strong>Categorize each block</strong> -- assign each block one of four labels:
    <ul>
      <li><strong>Automate:</strong> AI could handle this with minimal review (data formatting, meeting note cleanup, routine correspondence)</li>
      <li><strong>Accelerate:</strong> AI could create a strong first draft that I refine (reports, presentations, analysis, proposals)</li>
      <li><strong>Assist:</strong> AI could provide useful input but the work is primarily human (strategic decisions, relationship conversations, creative direction)</li>
      <li><strong>Human-only:</strong> This requires fully human effort (in-person meetings, sensitive conversations, final sign-off on critical decisions)</li>
    </ul>
  </li>
  <li><strong>Calculate the breakdown</strong> -- what percentage of your week falls into each category? Most knowledge workers find that 40-60% of their time is in the Automate or Accelerate categories.</li>
</ul>
<p>This audit gives you a concrete picture of where AI can have the most impact on your personal productivity and effectiveness.</p>`
        },
        {
          id: 'as5-2',
          type: 'text',
          title: 'Designing Your Personal AI Stack',
          content: `<p>An AI-first workflow is not about using one tool for everything. It is about assembling a set of AI surfaces, models, and integrations that cover your most common workflows. Think of it as designing your personal AI toolkit.</p>
<p>Components of your AI stack:</p>
<ul>
  <li><strong>Surfaces</strong> -- where you interact with AI:
    <ul>
      <li>Claude.ai (web interface) for standalone conversations, document analysis, and brainstorming</li>
      <li>Claude in Slack or Teams for quick questions and in-context collaboration</li>
      <li>Claude Code (CLI) for technical work and file-based tasks</li>
      <li>API integrations for automated workflows that run without manual input</li>
    </ul>
  </li>
  <li><strong>Model routing</strong> -- matching the right model to each task type:
    <ul>
      <li>Haiku for quick classifications, data extraction, and high-volume processing</li>
      <li>Sonnet for daily writing, analysis, and code tasks</li>
      <li>Opus for strategic deliverables and complex reasoning</li>
    </ul>
  </li>
  <li><strong>Connectors</strong> -- how AI accesses your data and tools:
    <ul>
      <li>Enterprise Search for organizational knowledge</li>
      <li>MCP servers for connecting to databases, APIs, and internal tools</li>
      <li>File upload for document analysis and processing</li>
    </ul>
  </li>
  <li><strong>Saved workflows</strong> -- reusable prompts and skills for your most common tasks</li>
</ul>`
        },
        {
          id: 'as5-3',
          type: 'text',
          title: 'Playbooks: Meeting Prep, Email Triage, Executive Briefing',
          content: `<p>An AI-first workflow becomes powerful when you have ready-made playbooks for your most frequent high-value tasks. Here are three playbooks that most leaders can implement immediately.</p>
<p><strong>Playbook 1: Meeting Preparation</strong></p>
<ul>
  <li>Before each meeting, give Claude the agenda, attendee list, and any pre-read materials</li>
  <li>Ask Claude to summarize key context, highlight potential discussion points, and draft questions you should ask</li>
  <li>For recurring meetings, provide notes from the previous meeting and ask Claude to identify open items and follow-up status</li>
  <li>Result: walk into every meeting prepared in 5 minutes instead of 30</li>
</ul>
<p><strong>Playbook 2: Email Triage and Response</strong></p>
<ul>
  <li>At the start of each day, provide Claude with your unread emails (or use an integration)</li>
  <li>Ask Claude to categorize by urgency and action required: respond immediately, respond today, delegate, archive</li>
  <li>For emails that need responses, have Claude draft replies that you review and send</li>
  <li>Result: process your inbox in 15 minutes instead of an hour</li>
</ul>
<p><strong>Playbook 3: Executive Briefing Preparation</strong></p>
<ul>
  <li>Gather raw inputs: metrics, team updates, project statuses, risk items</li>
  <li>Provide Claude with the briefing template and audience context</li>
  <li>Ask Claude to synthesize inputs into an executive-ready narrative with key takeaways, risks, and recommended actions</li>
  <li>Review, refine, and add your strategic perspective</li>
  <li>Result: create a polished executive briefing in 20 minutes instead of 2 hours</li>
</ul>`
        },
        {
          id: 'as5-4',
          type: 'text',
          title: 'Creating Your AI Adoption Roadmap',
          content: `<p>Sustainable AI adoption does not happen overnight. It requires a structured roadmap that builds skills gradually and demonstrates value at each stage. Here is a proven 90-day framework:</p>
<p><strong>Days 1-14: Foundation</strong></p>
<ul>
  <li>Complete your time audit and identify your top 5 AI-opportunity tasks</li>
  <li>Set up your AI tools and accounts (Claude.ai at minimum)</li>
  <li>Practice the 4 D's on low-stakes tasks: draft emails, summarize documents, brainstorm ideas</li>
  <li>Goal: develop basic AI fluency and comfort</li>
</ul>
<p><strong>Days 15-30: Integration</strong></p>
<ul>
  <li>Build your first 3 playbooks (meeting prep, email triage, and one role-specific task)</li>
  <li>Start using AI daily for at least 2-3 tasks</li>
  <li>Track time saved and note quality observations</li>
  <li>Goal: AI becomes a natural part of your daily workflow</li>
</ul>
<p><strong>Days 31-60: Optimization</strong></p>
<ul>
  <li>Refine your playbooks based on what works and what does not</li>
  <li>Explore advanced features: Projects, Enterprise Search, custom instructions</li>
  <li>Start model routing -- use the right model for each task</li>
  <li>Calculate your actual ROI from the first month</li>
  <li>Goal: measurable productivity improvement with data to prove it</li>
</ul>
<p><strong>Days 61-90: Expansion</strong></p>
<ul>
  <li>Share your playbooks and results with your team</li>
  <li>Run a team pilot with 2-3 colleagues</li>
  <li>Build the business case for broader adoption using your real data</li>
  <li>Identify the next wave of AI opportunities</li>
  <li>Goal: from personal adoption to team transformation</li>
</ul>`
        },
        {
          id: 'as5-5',
          type: 'text',
          title: 'Measuring and Demonstrating Results',
          content: `<p>The final and most critical element of your AI-first workflow is measurement. Without data, your AI adoption story is anecdotal. With data, it becomes a compelling case for organizational transformation.</p>
<p>Metrics to track:</p>
<ul>
  <li><strong>Time metrics</strong>
    <ul>
      <li>Hours saved per week (aggregate across all AI-assisted tasks)</li>
      <li>Turnaround time reduction for specific deliverables (e.g., "proposals now take 1 hour instead of 4")</li>
      <li>Time to first draft (how quickly AI produces a usable starting point)</li>
    </ul>
  </li>
  <li><strong>Quality metrics</strong>
    <ul>
      <li>Revision cycles needed (are you getting closer to final quality faster?)</li>
      <li>Error rates in AI-assisted work versus purely manual work</li>
      <li>Stakeholder satisfaction with AI-assisted deliverables</li>
    </ul>
  </li>
  <li><strong>Capacity metrics</strong>
    <ul>
      <li>Additional projects or tasks you can take on with freed time</li>
      <li>Backlog reduction (are you clearing work that was previously deprioritized?)</li>
      <li>Response time improvement to internal and external stakeholders</li>
    </ul>
  </li>
  <li><strong>Financial metrics</strong>
    <ul>
      <li>Cost of AI tools versus value of time saved</li>
      <li>Avoided hiring costs (headcount you did not need to add)</li>
      <li>Revenue impact from faster delivery or improved quality</li>
    </ul>
  </li>
</ul>
<p>Present results monthly. Use a simple dashboard or one-page summary that shows trends over time. Leaders who can demonstrate measurable AI ROI become the go-to voices for AI strategy in their organizations.</p>`
        },
        {
          id: 'as5-6',
          type: 'tip',
          title: 'The Compound Effect of AI Fluency',
          content: 'The real power of an AI-first workflow is not any single task -- it is the compound effect of saving time across dozens of tasks every week. Those reclaimed hours add up to entire workdays per month. The leaders who invest in building these workflows now will have a significant and growing advantage over those who wait.'
        }
      ],
      exercise: {
        type: 'build',
        instructions: 'Create a complete Personal AI Workflow Document that includes all of the following sections:\n\n1. Time Audit Summary -- categorize your typical week into Automate, Accelerate, Assist, and Human-only percentages\n2. Top 5 AI Opportunity Tasks -- list the five tasks where AI will have the biggest impact, with estimated time savings for each\n3. Personal AI Stack -- define your surfaces (where you will use AI), model routing (which model for which tasks), and connectors (how AI accesses your data)\n4. Three Playbooks -- write detailed playbooks for your three most common AI-assisted workflows, including triggers, inputs, AI instructions, review steps, and outputs\n5. 90-Day Adoption Roadmap -- customize the 90-day framework from this lesson to your specific role, with concrete milestones for each phase\n6. Success Metrics -- define 4-5 metrics you will track monthly, including how you will measure each one\n7. Business Case Summary -- write a one-paragraph summary you could share with your leadership team explaining the expected ROI of your AI workflow',
        hints: [
          'Be specific and realistic in your time audit -- overestimating AI savings undermines credibility',
          'Your playbooks should be detailed enough that a colleague could follow them',
          'The 90-day roadmap should include specific tasks and milestones, not just general goals',
          'Tie your success metrics to outcomes your leadership team cares about (revenue, efficiency, quality)'
        ],
        validationCriteria: [
          'Time audit covers a full typical work week with realistic percentages',
          'Top 5 tasks include specific time savings estimates',
          'AI stack covers surfaces, model routing, and connectors',
          'Three playbooks are detailed with clear steps',
          '90-day roadmap has concrete milestones for each phase',
          'Success metrics are measurable and tied to business outcomes',
          'Business case summary is concise and compelling'
        ]
      }
    } as LevelContent
  }
];
