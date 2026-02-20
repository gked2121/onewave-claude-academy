// MCP Development - Track Content
// Building Model Context Protocol servers, resources, tools, and integrations

import type { TrackLevel, LevelContent } from '@/lib/types';

export const MCP_DEVELOPMENT_TRACK_ID = 'mcp-development';
export const MCP_DEVELOPMENT_COLOR = '#0891B2';

export const mcpDevelopmentLevels: Omit<TrackLevel, 'id' | 'trackId'>[] = [
  // Level 1: What is MCP?
  {
    levelNumber: 1,
    title: 'What is MCP?',
    description: 'Introduction to Model Context Protocol and why it matters',
    xpReward: 150,
    estimatedMinutes: 15,
    isFree: true,
    requiresVerification: false,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'mcp1-1',
          type: 'text',
          title: 'The Model Context Protocol',
          content: `<p>The Model Context Protocol (MCP) is an open standard that enables AI assistants to securely connect to external data sources and tools. Think of it as a universal adapter that lets AI models:</p>
<ul>
  <li><strong>Access real-time data</strong> - Connect to databases, APIs, and file systems</li>
  <li><strong>Execute actions</strong> - Run code, manage files, interact with services</li>
  <li><strong>Maintain context</strong> - Keep relevant information available across conversations</li>
  <li><strong>Stay secure</strong> - Control what the AI can access and do</li>
</ul>`
        },
        {
          id: 'mcp1-2',
          type: 'text',
          title: 'Why MCP Matters',
          content: `<p>Before MCP, every AI integration was custom-built. MCP provides:</p>
<ul>
  <li><strong>Standardization</strong> - One protocol works with many AI clients</li>
  <li><strong>Composability</strong> - Mix and match servers for different capabilities</li>
  <li><strong>Security</strong> - Built-in authentication and permission models</li>
  <li><strong>Simplicity</strong> - Clear patterns for common integration needs</li>
</ul>`
        },
        {
          id: 'mcp1-3',
          type: 'tip',
          title: 'MCP is Open Source',
          content: 'MCP is an open specification maintained by Anthropic. Anyone can build MCP servers or clients, and the protocol is designed to work with any AI model, not just Claude.'
        },
        {
          id: 'mcp1-4',
          type: 'text',
          title: 'Core Concepts',
          content: `<p>MCP has three main primitives:</p>
<ul>
  <li><strong>Resources</strong> - Data that the AI can read (files, database records, API responses)</li>
  <li><strong>Tools</strong> - Actions the AI can perform (create file, send email, run query)</li>
  <li><strong>Prompts</strong> - Reusable prompt templates for common tasks</li>
</ul>`
        },
        {
          id: 'mcp1-5',
          type: 'code',
          title: 'A Simple Example',
          language: 'typescript',
          content: `// An MCP server exposes capabilities to AI clients
const server = new MCPServer({
  name: "my-data-server",
  version: "1.0.0"
});

// Resources let the AI read data
server.addResource({
  uri: "data://users/current",
  name: "Current User",
  description: "Information about the logged-in user"
});

// Tools let the AI take actions
server.addTool({
  name: "send_notification",
  description: "Send a push notification to a user",
  parameters: { userId: "string", message: "string" }
});`
        }
      ]
    } as LevelContent
  },

  // Level 2: MCP Architecture
  {
    levelNumber: 2,
    title: 'MCP Architecture',
    description: 'Understanding servers, clients, and transport layers',
    xpReward: 200,
    estimatedMinutes: 20,
    isFree: true,
    requiresVerification: false,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'mcp2-1',
          type: 'text',
          title: 'The MCP Architecture',
          content: `<p>MCP uses a client-server architecture with three main components:</p>
<ul>
  <li><strong>MCP Hosts</strong> - Applications that want AI capabilities (Claude Desktop, IDEs)</li>
  <li><strong>MCP Clients</strong> - Protocol handlers within hosts that connect to servers</li>
  <li><strong>MCP Servers</strong> - Services that expose resources, tools, and prompts</li>
</ul>`
        },
        {
          id: 'mcp2-2',
          type: 'code',
          title: 'Architecture Diagram',
          language: 'text',
          content: `┌─────────────────────────────────────────────────────┐
│                     MCP Host                         │
│                (Claude Desktop)                      │
│  ┌─────────────────────────────────────────────────┐ │
│  │                 MCP Client                       │ │
│  │         (Protocol Implementation)                │ │
│  └──────────┬──────────────────┬───────────────────┘ │
└─────────────┼──────────────────┼────────────────────┘
              │                  │
         Transport          Transport
          (stdio)            (HTTP)
              │                  │
    ┌─────────▼─────┐  ┌────────▼────────┐
    │  MCP Server   │  │   MCP Server    │
    │  (Database)   │  │   (REST API)    │
    └───────────────┘  └─────────────────┘`
        },
        {
          id: 'mcp2-3',
          type: 'text',
          title: 'Transport Layers',
          content: `<p>MCP supports multiple transport mechanisms:</p>
<ul>
  <li><strong>stdio</strong> - Standard input/output for local servers (most common)</li>
  <li><strong>HTTP with SSE</strong> - Server-Sent Events for remote servers</li>
  <li><strong>WebSocket</strong> - Bidirectional communication for real-time needs</li>
</ul>`
        },
        {
          id: 'mcp2-4',
          type: 'code',
          title: 'Transport Configuration',
          language: 'json',
          content: `{
  "mcpServers": {
    "local-server": {
      "command": "node",
      "args": ["./my-server.js"],
      "transport": "stdio"
    },
    "remote-server": {
      "url": "https://api.example.com/mcp",
      "transport": "http",
      "headers": {
        "Authorization": "Bearer token"
      }
    }
  }
}`
        },
        {
          id: 'mcp2-5',
          type: 'tip',
          title: 'Choosing a Transport',
          content: 'Use stdio for local development and testing - it is the simplest. Use HTTP/SSE for production deployments where the server runs remotely or needs to handle multiple clients.'
        },
        {
          id: 'mcp2-6',
          type: 'text',
          title: 'Protocol Messages',
          content: `<p>MCP uses JSON-RPC 2.0 for communication. Key message types:</p>
<ul>
  <li><strong>initialize</strong> - Handshake and capability negotiation</li>
  <li><strong>resources/list</strong> - List available resources</li>
  <li><strong>resources/read</strong> - Read a specific resource</li>
  <li><strong>tools/list</strong> - List available tools</li>
  <li><strong>tools/call</strong> - Execute a tool</li>
</ul>`
        }
      ]
    } as LevelContent
  },

  // Level 3: Your First MCP Server
  {
    levelNumber: 3,
    title: 'Your First MCP Server',
    description: 'Set up a basic server with resources',
    xpReward: 250,
    estimatedMinutes: 30,
    isFree: false,
    requiresVerification: true,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'mcp3-1',
          type: 'text',
          title: 'Getting Started',
          content: `<p>Let's build your first MCP server. We'll create a simple server that exposes some resources. You'll need:</p>
<ul>
  <li>Node.js 18 or higher</li>
  <li>A code editor</li>
  <li>Claude Desktop or another MCP client for testing</li>
</ul>`
        },
        {
          id: 'mcp3-2',
          type: 'code',
          title: 'Project Setup',
          language: 'bash',
          content: `# Create a new project
mkdir my-first-mcp-server
cd my-first-mcp-server

# Initialize npm and install dependencies
npm init -y
npm install @modelcontextprotocol/sdk

# Create the server file
touch server.ts`
        },
        {
          id: 'mcp3-3',
          type: 'code',
          title: 'Basic Server Structure',
          language: 'typescript',
          content: `import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// Create the server instance
const server = new Server(
  {
    name: "my-first-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      resources: {},  // We'll expose resources
    },
  }
);

// Handle resource listing
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: "greeting://hello",
        name: "Hello World",
        description: "A simple greeting resource",
        mimeType: "text/plain",
      },
    ],
  };
});

// Handle resource reading
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  if (request.params.uri === "greeting://hello") {
    return {
      contents: [
        {
          uri: "greeting://hello",
          mimeType: "text/plain",
          text: "Hello from MCP! This is your first server.",
        },
      ],
    };
  }
  throw new Error("Resource not found");
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP server running on stdio");
}

main().catch(console.error);`
        },
        {
          id: 'mcp3-4',
          type: 'tip',
          title: 'Console Output',
          content: 'Use console.error() for logging in MCP servers. console.log() writes to stdout which is used for the protocol - logging there would break communication with the client.'
        },
        {
          id: 'mcp3-5',
          type: 'code',
          title: 'Configure Claude Desktop',
          language: 'json',
          content: `// ~/Library/Application Support/Claude/claude_desktop_config.json (macOS)
// %APPDATA%\\Claude\\claude_desktop_config.json (Windows)
{
  "mcpServers": {
    "my-first-server": {
      "command": "npx",
      "args": ["ts-node", "/path/to/my-first-mcp-server/server.ts"]
    }
  }
}`
        },
        {
          id: 'mcp3-6',
          type: 'text',
          title: 'Testing Your Server',
          content: `<p>After configuring Claude Desktop:</p>
<ol>
  <li>Restart Claude Desktop to load the new server</li>
  <li>Look for the server in the MCP menu (hammer icon)</li>
  <li>Ask Claude: "What resources are available?"</li>
  <li>Ask Claude: "Read the hello greeting resource"</li>
</ol>`
        }
      ],
      exercise: {
        type: 'code',
        instructions: 'Extend the server to add a second resource called "time://current" that returns the current date and time. Include the resource in the list and handle reading it.',
        starterCode: `// Add a new resource to the existing server
// 1. Add it to the resources list
// 2. Handle reading it in the ReadResourceRequestSchema handler`,
        hints: [
          'Add another object to the resources array in ListResourcesRequestSchema handler',
          'Use new Date().toISOString() to get the current time',
          'Add an else if check in ReadResourceRequestSchema for the new URI'
        ],
        validationCriteria: [
          'New resource listed with uri "time://current"',
          'Resource has appropriate name and description',
          'ReadResourceRequestSchema returns current time for the new URI'
        ]
      }
    } as LevelContent
  },

  // Level 4: Resources & Tools
  {
    levelNumber: 4,
    title: 'Resources & Tools',
    description: 'Define and expose capabilities to AI clients',
    xpReward: 300,
    estimatedMinutes: 35,
    isFree: false,
    requiresVerification: true,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'mcp4-1',
          type: 'text',
          title: 'Resources vs Tools',
          content: `<p>Understanding when to use resources vs tools:</p>
<ul>
  <li><strong>Resources</strong> - Read-only data that the AI can access. Use for: files, database records, configuration, API responses.</li>
  <li><strong>Tools</strong> - Actions that have side effects. Use for: creating records, sending messages, modifying files, making API calls.</li>
</ul>`
        },
        {
          id: 'mcp4-2',
          type: 'code',
          title: 'Defining Resources',
          language: 'typescript',
          content: `// Resources can be static or dynamic
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  // Fetch actual data to list available resources
  const users = await db.users.findMany();

  return {
    resources: users.map(user => ({
      uri: \`user://\${user.id}\`,
      name: \`User: \${user.name}\`,
      description: \`Profile information for \${user.email}\`,
      mimeType: "application/json",
    })),
  };
});

// Handle reading the resource content
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const uri = request.params.uri;
  const match = uri.match(/^user:\\/\\/(\\d+)$/);

  if (match) {
    const userId = match[1];
    const user = await db.users.findUnique({ where: { id: userId } });

    return {
      contents: [{
        uri,
        mimeType: "application/json",
        text: JSON.stringify(user, null, 2),
      }],
    };
  }

  throw new Error(\`Unknown resource: \${uri}\`);
});`
        },
        {
          id: 'mcp4-3',
          type: 'code',
          title: 'Defining Tools',
          language: 'typescript',
          content: `import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "create_user",
        description: "Create a new user account",
        inputSchema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "The user's full name",
            },
            email: {
              type: "string",
              description: "The user's email address",
            },
          },
          required: ["name", "email"],
        },
      },
      {
        name: "send_email",
        description: "Send an email to a user",
        inputSchema: {
          type: "object",
          properties: {
            to: { type: "string", description: "Recipient email" },
            subject: { type: "string", description: "Email subject" },
            body: { type: "string", description: "Email body content" },
          },
          required: ["to", "subject", "body"],
        },
      },
    ],
  };
});`
        },
        {
          id: 'mcp4-4',
          type: 'code',
          title: 'Implementing Tool Handlers',
          language: 'typescript',
          content: `// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "create_user": {
      const user = await db.users.create({
        data: {
          name: args.name as string,
          email: args.email as string,
        },
      });
      return {
        content: [{
          type: "text",
          text: \`Created user \${user.id}: \${user.name}\`,
        }],
      };
    }

    case "send_email": {
      await emailService.send({
        to: args.to as string,
        subject: args.subject as string,
        body: args.body as string,
      });
      return {
        content: [{
          type: "text",
          text: \`Email sent to \${args.to}\`,
        }],
      };
    }

    default:
      throw new Error(\`Unknown tool: \${name}\`);
  }
});`
        },
        {
          id: 'mcp4-5',
          type: 'warning',
          title: 'Tool Safety',
          content: 'Tools can have real side effects. Always validate inputs, implement proper error handling, and consider adding confirmation steps for destructive actions. The AI client may retry failed operations.'
        },
        {
          id: 'mcp4-6',
          type: 'tip',
          title: 'Input Schema',
          content: 'Use JSON Schema for tool input validation. The AI uses the schema to understand what parameters are needed and will format its requests accordingly.'
        }
      ],
      exercise: {
        type: 'code',
        instructions: 'Create a tool called "create_note" that accepts a title and content, and returns a confirmation with a generated ID. Include proper input schema with descriptions.',
        starterCode: `// Add to the tools list in ListToolsRequestSchema
{
  name: "create_note",
  // Add description and inputSchema
}

// Add handler in CallToolRequestSchema
case "create_note": {
  // Implement the handler
}`,
        hints: [
          'Define title and content as required string properties',
          'Generate a unique ID using Date.now() or crypto.randomUUID()',
          'Return a text content with the created note details'
        ],
        validationCriteria: [
          'Tool has name, description, and inputSchema',
          'Schema includes title and content as required fields',
          'Handler generates an ID and returns confirmation'
        ]
      }
    } as LevelContent
  },

  // Level 5: Prompts & Sampling
  {
    levelNumber: 5,
    title: 'Prompts & Sampling',
    description: 'Add prompt templates and sampling capabilities',
    xpReward: 250,
    estimatedMinutes: 25,
    isFree: false,
    requiresVerification: false,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'mcp5-1',
          type: 'text',
          title: 'MCP Prompts',
          content: `<p>Prompts are reusable templates that help users interact with your server. They provide:</p>
<ul>
  <li><strong>Structured inputs</strong> - Define what arguments the prompt needs</li>
  <li><strong>Pre-written instructions</strong> - Guide the AI on how to use your server</li>
  <li><strong>Discoverability</strong> - Users can browse available prompts</li>
</ul>`
        },
        {
          id: 'mcp5-2',
          type: 'code',
          title: 'Defining Prompts',
          language: 'typescript',
          content: `import {
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// Update server capabilities
const server = new Server(
  { name: "my-server", version: "1.0.0" },
  {
    capabilities: {
      resources: {},
      tools: {},
      prompts: {},  // Enable prompts
    },
  }
);

// List available prompts
server.setRequestHandler(ListPromptsRequestSchema, async () => {
  return {
    prompts: [
      {
        name: "analyze_data",
        description: "Analyze data from a specific table",
        arguments: [
          {
            name: "table_name",
            description: "The database table to analyze",
            required: true,
          },
          {
            name: "focus_area",
            description: "What aspect to focus on (trends, outliers, summary)",
            required: false,
          },
        ],
      },
    ],
  };
});`
        },
        {
          id: 'mcp5-3',
          type: 'code',
          title: 'Implementing Prompts',
          language: 'typescript',
          content: `// Return the prompt content when requested
server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "analyze_data") {
    const tableName = args?.table_name ?? "unknown";
    const focus = args?.focus_area ?? "general summary";

    return {
      description: \`Analyze the \${tableName} table\`,
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: \`Please analyze the data in the "\${tableName}" table.
Focus on: \${focus}.

Steps:
1. First, use the list_tables tool to verify the table exists
2. Use the query_table tool to fetch sample data
3. Analyze the data structure and content
4. Provide insights based on the focus area

Be thorough and highlight any interesting patterns.\`,
          },
        },
      ],
    };
  }

  throw new Error(\`Unknown prompt: \${name}\`);
});`
        },
        {
          id: 'mcp5-4',
          type: 'text',
          title: 'Sampling',
          content: `<p>Sampling allows MCP servers to request AI completions from the client. This enables:</p>
<ul>
  <li><strong>Agentic workflows</strong> - Server can ask the AI to help with complex tasks</li>
  <li><strong>Dynamic content</strong> - Generate responses based on context</li>
  <li><strong>Human-in-the-loop</strong> - The client controls approval of AI requests</li>
</ul>`
        },
        {
          id: 'mcp5-5',
          type: 'code',
          title: 'Using Sampling',
          language: 'typescript',
          content: `// Server can request completions from the AI
const result = await server.request(
  {
    method: "sampling/createMessage",
    params: {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: "Summarize this data in one sentence: " + dataJson,
          },
        },
      ],
      maxTokens: 100,
    },
  },
  // Schema for the response
  CreateMessageResultSchema
);

console.error("AI summary:", result.content.text);`
        },
        {
          id: 'mcp5-6',
          type: 'warning',
          title: 'Sampling Considerations',
          content: 'Sampling requests go through the client and may require user approval. Do not rely on sampling for time-critical operations. The client controls the AI model used and may reject requests.'
        }
      ]
    } as LevelContent
  },

  // Level 6: Security & OAuth 2.1
  {
    levelNumber: 6,
    title: 'Security & OAuth 2.1',
    description: 'Implement authentication and secure your MCP server',
    xpReward: 300,
    estimatedMinutes: 35,
    isFree: false,
    requiresVerification: false,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'mcp6-1',
          type: 'text',
          title: 'MCP Security Model',
          content: `<p>Security in MCP operates at multiple levels:</p>
<ul>
  <li><strong>Transport security</strong> - TLS for remote connections</li>
  <li><strong>Authentication</strong> - OAuth 2.1 for user identity</li>
  <li><strong>Authorization</strong> - Scopes and permissions for capabilities</li>
  <li><strong>Input validation</strong> - Sanitize all inputs from AI</li>
</ul>`
        },
        {
          id: 'mcp6-2',
          type: 'text',
          title: 'OAuth 2.1 in MCP',
          content: `<p>MCP uses OAuth 2.1 with PKCE for secure authentication:</p>
<ul>
  <li><strong>Authorization Code + PKCE</strong> - Secure flow for public clients</li>
  <li><strong>Refresh tokens</strong> - Long-lived sessions without re-auth</li>
  <li><strong>Scopes</strong> - Fine-grained permission control</li>
</ul>`
        },
        {
          id: 'mcp6-3',
          type: 'code',
          title: 'OAuth Server Configuration',
          language: 'typescript',
          content: `import { Server } from "@modelcontextprotocol/sdk/server/index.js";

const server = new Server(
  { name: "secure-server", version: "1.0.0" },
  {
    capabilities: {
      resources: {},
      tools: {},
    },
    // Define required OAuth scopes
    requiredScopes: ["read:data", "write:data"],
  }
);

// Middleware to check authentication
function requireAuth(request: any) {
  const token = request.meta?.authToken;
  if (!token) {
    throw new Error("Authentication required");
  }

  // Verify the token with your auth provider
  const decoded = verifyToken(token);
  return decoded;
}`
        },
        {
          id: 'mcp6-4',
          type: 'code',
          title: 'Scope-Based Authorization',
          language: 'typescript',
          content: `// Define scopes for different capabilities
const SCOPES = {
  READ_DATA: "read:data",
  WRITE_DATA: "write:data",
  ADMIN: "admin",
};

// Check scopes in tool handlers
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const user = requireAuth(request);
  const { name } = request.params;

  // Check if user has required scope
  if (name === "delete_all" && !user.scopes.includes(SCOPES.ADMIN)) {
    throw new Error("Insufficient permissions: admin scope required");
  }

  if (name.startsWith("write_") && !user.scopes.includes(SCOPES.WRITE_DATA)) {
    throw new Error("Insufficient permissions: write:data scope required");
  }

  // Proceed with tool execution
  return executeToold(name, request.params.arguments, user);
});`
        },
        {
          id: 'mcp6-5',
          type: 'warning',
          title: 'Security Best Practices',
          content: 'Never trust input from AI clients without validation. Implement rate limiting to prevent abuse. Log all tool calls for audit purposes. Use the principle of least privilege for scopes.'
        },
        {
          id: 'mcp6-6',
          type: 'code',
          title: 'Input Validation Example',
          language: 'typescript',
          content: `import { z } from "zod";

// Define strict schemas for tool inputs
const CreateUserSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  role: z.enum(["user", "admin"]).default("user"),
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "create_user") {
    // Validate input against schema
    const parsed = CreateUserSchema.safeParse(request.params.arguments);

    if (!parsed.success) {
      throw new Error(\`Invalid input: \${parsed.error.message}\`);
    }

    // Use validated data
    const user = await createUser(parsed.data);
    return { content: [{ type: "text", text: \`Created: \${user.id}\` }] };
  }
});`
        },
        {
          id: 'mcp6-7',
          type: 'tip',
          title: 'Testing Security',
          content: 'Test your server with invalid tokens, missing scopes, and malformed inputs. Use tools like OWASP ZAP to scan for vulnerabilities. Consider a security audit before production deployment.'
        }
      ]
    } as LevelContent
  },

  // Level 7: Building a Database Connector
  {
    levelNumber: 7,
    title: 'Building a Database Connector',
    description: 'Connect to PostgreSQL or MySQL databases',
    xpReward: 350,
    estimatedMinutes: 40,
    isFree: false,
    requiresVerification: true,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'mcp7-1',
          type: 'text',
          title: 'Database MCP Server',
          content: `<p>A database connector is one of the most useful MCP servers. It allows AI to:</p>
<ul>
  <li><strong>Explore schemas</strong> - Understand table structures</li>
  <li><strong>Query data</strong> - Run SELECT queries safely</li>
  <li><strong>Modify data</strong> - INSERT, UPDATE, DELETE with safeguards</li>
  <li><strong>Analyze patterns</strong> - Help with data analysis tasks</li>
</ul>`
        },
        {
          id: 'mcp7-2',
          type: 'code',
          title: 'Project Setup',
          language: 'bash',
          content: `mkdir mcp-database-server
cd mcp-database-server

npm init -y
npm install @modelcontextprotocol/sdk pg
npm install -D typescript @types/pg ts-node

# Create tsconfig.json
echo '{"compilerOptions":{"target":"ES2020","module":"NodeNext","moduleResolution":"NodeNext","strict":true,"outDir":"dist"}}' > tsconfig.json`
        },
        {
          id: 'mcp7-3',
          type: 'code',
          title: 'Database Server Implementation',
          language: 'typescript',
          content: `import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { Pool } from "pg";

// Initialize database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const server = new Server(
  { name: "postgres-server", version: "1.0.0" },
  { capabilities: { resources: {}, tools: {} } }
);

// List tables as resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  const result = await pool.query(\`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
  \`);

  return {
    resources: result.rows.map(row => ({
      uri: \`postgres://table/\${row.table_name}\`,
      name: row.table_name,
      description: \`Database table: \${row.table_name}\`,
      mimeType: "application/json",
    })),
  };
});`
        },
        {
          id: 'mcp7-4',
          type: 'code',
          title: 'Reading Table Data',
          language: 'typescript',
          content: `// Read table schema and sample data
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const match = request.params.uri.match(/^postgres:\\/\\/table\\/(.+)$/);
  if (!match) throw new Error("Invalid URI");

  const tableName = match[1];

  // Validate table name to prevent SQL injection
  const validTable = await pool.query(
    \`SELECT 1 FROM information_schema.tables
     WHERE table_schema = 'public' AND table_name = $1\`,
    [tableName]
  );
  if (validTable.rows.length === 0) {
    throw new Error("Table not found");
  }

  // Get schema
  const schema = await pool.query(\`
    SELECT column_name, data_type, is_nullable
    FROM information_schema.columns
    WHERE table_name = $1
    ORDER BY ordinal_position
  \`, [tableName]);

  // Get sample data (limit for safety)
  const sample = await pool.query(
    \`SELECT * FROM "\${tableName}" LIMIT 10\`
  );

  return {
    contents: [{
      uri: request.params.uri,
      mimeType: "application/json",
      text: JSON.stringify({
        schema: schema.rows,
        sampleData: sample.rows,
        rowCount: sample.rowCount,
      }, null, 2),
    }],
  };
});`
        },
        {
          id: 'mcp7-5',
          type: 'code',
          title: 'Query Tool',
          language: 'typescript',
          content: `// Define a safe query tool
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "run_query",
      description: "Run a read-only SQL query",
      inputSchema: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "SQL SELECT query to execute",
          },
        },
        required: ["query"],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "run_query") {
    const query = request.params.arguments?.query as string;

    // Safety: Only allow SELECT queries
    if (!query.trim().toLowerCase().startsWith("select")) {
      throw new Error("Only SELECT queries are allowed");
    }

    // Safety: Prevent dangerous patterns
    const dangerous = ["drop", "delete", "update", "insert", "alter", "truncate"];
    if (dangerous.some(d => query.toLowerCase().includes(d))) {
      throw new Error("Query contains forbidden keywords");
    }

    const result = await pool.query(query);
    return {
      content: [{
        type: "text",
        text: JSON.stringify(result.rows, null, 2),
      }],
    };
  }
  throw new Error("Unknown tool");
});`
        },
        {
          id: 'mcp7-6',
          type: 'warning',
          title: 'Database Security',
          content: 'Always use parameterized queries. Never interpolate AI-provided values directly into SQL. Use a read-only database user when possible. Set query timeouts and row limits.'
        }
      ],
      exercise: {
        type: 'code',
        instructions: 'Add a "describe_table" tool that returns detailed schema information for a specific table, including column types, constraints, and indexes.',
        starterCode: `// Add to the tools list
{
  name: "describe_table",
  description: "Get detailed schema information for a table",
  inputSchema: {
    // Define the schema
  }
}

// Add the handler
case "describe_table": {
  // Implement fetching schema details
}`,
        hints: [
          'Use information_schema.columns for column details',
          'Use pg_indexes for index information',
          'Validate the table name exists before querying'
        ],
        validationCriteria: [
          'Tool accepts table_name parameter',
          'Returns column names, types, and constraints',
          'Validates table exists before querying'
        ]
      }
    } as LevelContent
  },

  // Level 8: Building an API Connector
  {
    levelNumber: 8,
    title: 'Building an API Connector',
    description: 'Connect to REST and GraphQL APIs',
    xpReward: 350,
    estimatedMinutes: 40,
    isFree: false,
    requiresVerification: true,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'mcp8-1',
          type: 'text',
          title: 'API Connector Overview',
          content: `<p>An API connector MCP server allows AI to interact with external services. Common use cases:</p>
<ul>
  <li><strong>SaaS integrations</strong> - Salesforce, HubSpot, Slack</li>
  <li><strong>Internal APIs</strong> - Your company's microservices</li>
  <li><strong>Public APIs</strong> - Weather, news, financial data</li>
  <li><strong>GraphQL endpoints</strong> - Flexible data querying</li>
</ul>`
        },
        {
          id: 'mcp8-2',
          type: 'code',
          title: 'REST API Server Setup',
          language: 'typescript',
          content: `import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const API_BASE = process.env.API_BASE_URL || "https://api.example.com";
const API_KEY = process.env.API_KEY;

const server = new Server(
  { name: "api-connector", version: "1.0.0" },
  { capabilities: { resources: {}, tools: {} } }
);

// Helper for API calls
async function apiCall(
  method: string,
  path: string,
  body?: any
): Promise<any> {
  const response = await fetch(\`\${API_BASE}\${path}\`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": \`Bearer \${API_KEY}\`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(\`API error: \${response.status} \${response.statusText}\`);
  }

  return response.json();
}`
        },
        {
          id: 'mcp8-3',
          type: 'code',
          title: 'Exposing API Endpoints as Tools',
          language: 'typescript',
          content: `// Define tools for API operations
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "list_items",
      description: "List items from the API with optional filtering",
      inputSchema: {
        type: "object",
        properties: {
          status: {
            type: "string",
            enum: ["active", "archived", "all"],
            description: "Filter by status",
          },
          limit: {
            type: "number",
            description: "Maximum items to return (default 20)",
          },
        },
      },
    },
    {
      name: "get_item",
      description: "Get a specific item by ID",
      inputSchema: {
        type: "object",
        properties: {
          id: { type: "string", description: "The item ID" },
        },
        required: ["id"],
      },
    },
    {
      name: "create_item",
      description: "Create a new item",
      inputSchema: {
        type: "object",
        properties: {
          name: { type: "string", description: "Item name" },
          description: { type: "string", description: "Item description" },
          tags: {
            type: "array",
            items: { type: "string" },
            description: "Tags for categorization",
          },
        },
        required: ["name"],
      },
    },
  ],
}));`
        },
        {
          id: 'mcp8-4',
          type: 'code',
          title: 'Implementing Tool Handlers',
          language: 'typescript',
          content: `server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "list_items": {
        const params = new URLSearchParams();
        if (args?.status) params.set("status", args.status as string);
        if (args?.limit) params.set("limit", String(args.limit));

        const data = await apiCall("GET", \`/items?\${params}\`);
        return {
          content: [{
            type: "text",
            text: JSON.stringify(data, null, 2),
          }],
        };
      }

      case "get_item": {
        const data = await apiCall("GET", \`/items/\${args?.id}\`);
        return {
          content: [{
            type: "text",
            text: JSON.stringify(data, null, 2),
          }],
        };
      }

      case "create_item": {
        const data = await apiCall("POST", "/items", {
          name: args?.name,
          description: args?.description,
          tags: args?.tags || [],
        });
        return {
          content: [{
            type: "text",
            text: \`Created item: \${JSON.stringify(data, null, 2)}\`,
          }],
        };
      }

      default:
        throw new Error(\`Unknown tool: \${name}\`);
    }
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: \`Error: \${error instanceof Error ? error.message : "Unknown error"}\`,
      }],
      isError: true,
    };
  }
});`
        },
        {
          id: 'mcp8-5',
          type: 'code',
          title: 'GraphQL Support',
          language: 'typescript',
          content: `// Add a flexible GraphQL query tool
{
  name: "graphql_query",
  description: "Execute a GraphQL query",
  inputSchema: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description: "The GraphQL query string",
      },
      variables: {
        type: "object",
        description: "Query variables",
      },
    },
    required: ["query"],
  },
}

// Handler
case "graphql_query": {
  const response = await fetch(\`\${API_BASE}/graphql\`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": \`Bearer \${API_KEY}\`,
    },
    body: JSON.stringify({
      query: args?.query,
      variables: args?.variables || {},
    }),
  });

  const data = await response.json();
  return {
    content: [{
      type: "text",
      text: JSON.stringify(data, null, 2),
    }],
  };
}`
        },
        {
          id: 'mcp8-6',
          type: 'tip',
          title: 'Rate Limiting',
          content: 'Implement rate limiting to prevent the AI from overwhelming external APIs. Use a token bucket or sliding window algorithm. Cache responses when appropriate.'
        }
      ],
      exercise: {
        type: 'code',
        instructions: 'Add a "search_items" tool that accepts a query string and optional filters, calls a search endpoint, and returns paginated results.',
        starterCode: `// Add the search tool definition
{
  name: "search_items",
  description: "Search for items",
  inputSchema: {
    // Define properties: query, filters, page, pageSize
  }
}

// Implement the handler
case "search_items": {
  // Build search URL, call API, return results with pagination info
}`,
        hints: [
          'Include query as required, filters/page/pageSize as optional',
          'Build URL params from all provided arguments',
          'Return total count and page info along with results'
        ],
        validationCriteria: [
          'Tool has query as required parameter',
          'Supports optional pagination parameters',
          'Returns structured results with pagination metadata'
        ]
      }
    } as LevelContent
  },

  // Level 9: Testing & Debugging
  {
    levelNumber: 9,
    title: 'Testing & Debugging',
    description: 'Test and debug MCP servers effectively',
    xpReward: 300,
    estimatedMinutes: 30,
    isFree: false,
    requiresVerification: false,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'mcp9-1',
          type: 'text',
          title: 'Testing MCP Servers',
          content: `<p>Thorough testing is crucial for MCP servers. Test at multiple levels:</p>
<ul>
  <li><strong>Unit tests</strong> - Test individual handlers and utilities</li>
  <li><strong>Integration tests</strong> - Test the full MCP protocol flow</li>
  <li><strong>End-to-end tests</strong> - Test with actual MCP clients</li>
  <li><strong>Security tests</strong> - Test input validation and auth</li>
</ul>`
        },
        {
          id: 'mcp9-2',
          type: 'code',
          title: 'Unit Testing Handlers',
          language: 'typescript',
          content: `import { describe, it, expect, vi } from "vitest";

// Mock the database
vi.mock("pg", () => ({
  Pool: vi.fn(() => ({
    query: vi.fn(),
  })),
}));

describe("ReadResourceRequestSchema handler", () => {
  it("should return table schema and sample data", async () => {
    const mockPool = {
      query: vi.fn()
        .mockResolvedValueOnce({ rows: [{ table_name: "users" }] })
        .mockResolvedValueOnce({ rows: [
          { column_name: "id", data_type: "integer" },
          { column_name: "name", data_type: "text" },
        ]})
        .mockResolvedValueOnce({ rows: [{ id: 1, name: "Test" }], rowCount: 1 }),
    };

    const result = await handleReadResource(
      { uri: "postgres://table/users" },
      mockPool
    );

    expect(result.contents[0].mimeType).toBe("application/json");
    const data = JSON.parse(result.contents[0].text);
    expect(data.schema).toHaveLength(2);
    expect(data.sampleData).toHaveLength(1);
  });

  it("should throw on invalid table", async () => {
    const mockPool = {
      query: vi.fn().mockResolvedValueOnce({ rows: [] }),
    };

    await expect(
      handleReadResource({ uri: "postgres://table/nonexistent" }, mockPool)
    ).rejects.toThrow("Table not found");
  });
});`
        },
        {
          id: 'mcp9-3',
          type: 'code',
          title: 'Integration Testing with MCP Inspector',
          language: 'bash',
          content: `# Install the MCP Inspector CLI
npm install -g @modelcontextprotocol/inspector

# Test your server interactively
mcp-inspector --command "npx ts-node server.ts"

# The inspector provides:
# - Interactive tool calling
# - Resource browsing
# - Request/response logging
# - Protocol validation`
        },
        {
          id: 'mcp9-4',
          type: 'code',
          title: 'Programmatic Integration Tests',
          language: 'typescript',
          content: `import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { spawn } from "child_process";

describe("MCP Server Integration", () => {
  let client: Client;
  let serverProcess: any;

  beforeAll(async () => {
    // Start the server process
    serverProcess = spawn("npx", ["ts-node", "server.ts"]);

    // Create client transport
    const transport = new StdioClientTransport({
      command: "npx",
      args: ["ts-node", "server.ts"],
    });

    // Connect client
    client = new Client({ name: "test-client", version: "1.0.0" }, {});
    await client.connect(transport);
  });

  afterAll(async () => {
    await client.close();
    serverProcess.kill();
  });

  it("should list resources", async () => {
    const resources = await client.listResources();
    expect(resources.resources.length).toBeGreaterThan(0);
  });

  it("should call tools", async () => {
    const result = await client.callTool({
      name: "list_items",
      arguments: { limit: 5 },
    });
    expect(result.content[0].type).toBe("text");
  });
});`
        },
        {
          id: 'mcp9-5',
          type: 'text',
          title: 'Debugging Techniques',
          content: `<p>Common debugging approaches for MCP servers:</p>
<ul>
  <li><strong>stderr logging</strong> - Use console.error() for debug output</li>
  <li><strong>Protocol logging</strong> - Log all incoming/outgoing messages</li>
  <li><strong>Environment variables</strong> - DEBUG=mcp:* for SDK debug logs</li>
  <li><strong>VS Code debugging</strong> - Attach debugger to the server process</li>
</ul>`
        },
        {
          id: 'mcp9-6',
          type: 'code',
          title: 'Debug Logging Setup',
          language: 'typescript',
          content: `// Add debug logging to your server
const DEBUG = process.env.DEBUG === "true";

function log(...args: any[]) {
  if (DEBUG) {
    console.error(new Date().toISOString(), ...args);
  }
}

// Log all requests
server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  log("ListTools request received");
  const tools = getTools();
  log("Returning", tools.length, "tools");
  return { tools };
});

// Log all tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  log("Tool call:", request.params.name, request.params.arguments);
  try {
    const result = await executeTool(request.params);
    log("Tool result:", result);
    return result;
  } catch (error) {
    log("Tool error:", error);
    throw error;
  }
});`
        },
        {
          id: 'mcp9-7',
          type: 'tip',
          title: 'Common Issues',
          content: 'If your server is not appearing in Claude Desktop, check: 1) Config file syntax is valid JSON, 2) Path to server is correct, 3) Server starts without errors when run manually, 4) Claude Desktop was restarted after config changes.'
        }
      ]
    } as LevelContent
  },

  // Level 10: Deployment & Distribution
  {
    levelNumber: 10,
    title: 'Deployment & Distribution',
    description: 'Package and deploy MCP servers for production',
    xpReward: 350,
    estimatedMinutes: 35,
    isFree: false,
    requiresVerification: false,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'mcp10-1',
          type: 'text',
          title: 'Deployment Options',
          content: `<p>MCP servers can be deployed in several ways:</p>
<ul>
  <li><strong>Local (stdio)</strong> - Run alongside the client application</li>
  <li><strong>Remote (HTTP/SSE)</strong> - Deploy as a web service</li>
  <li><strong>npm package</strong> - Distribute for others to install locally</li>
  <li><strong>Docker container</strong> - Package with all dependencies</li>
</ul>`
        },
        {
          id: 'mcp10-2',
          type: 'code',
          title: 'Packaging for npm',
          language: 'json',
          content: `// package.json
{
  "name": "@myorg/mcp-postgres-server",
  "version": "1.0.0",
  "description": "MCP server for PostgreSQL databases",
  "main": "dist/index.js",
  "bin": {
    "mcp-postgres": "./dist/index.js"
  },
  "scripts": {
    "build": "tsc",
    "prepublishOnly": "npm run build"
  },
  "files": [
    "dist/**/*"
  ],
  "keywords": ["mcp", "postgres", "database", "ai"],
  "engines": {
    "node": ">=18"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.0",
    "pg": "^8.11.0"
  }
}`
        },
        {
          id: 'mcp10-3',
          type: 'code',
          title: 'Entry Point Setup',
          language: 'typescript',
          content: `#!/usr/bin/env node
// src/index.ts

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { setupHandlers } from "./handlers.js";

async function main() {
  // Parse command line arguments
  const args = process.argv.slice(2);
  const connectionString = args[0] || process.env.DATABASE_URL;

  if (!connectionString) {
    console.error("Usage: mcp-postgres <connection-string>");
    console.error("Or set DATABASE_URL environment variable");
    process.exit(1);
  }

  const server = new Server(
    { name: "mcp-postgres", version: "1.0.0" },
    { capabilities: { resources: {}, tools: {} } }
  );

  await setupHandlers(server, connectionString);

  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error("MCP PostgreSQL server running");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});`
        },
        {
          id: 'mcp10-4',
          type: 'code',
          title: 'Docker Deployment',
          language: 'dockerfile',
          content: `# Dockerfile
FROM node:20-slim

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy built code
COPY dist ./dist

# Set environment
ENV NODE_ENV=production

# Expose port for HTTP transport
EXPOSE 3000

# Run the server
CMD ["node", "dist/http-server.js"]`
        },
        {
          id: 'mcp10-5',
          type: 'code',
          title: 'HTTP Server for Remote Deployment',
          language: 'typescript',
          content: `// src/http-server.ts
import express from "express";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";

const app = express();
const port = process.env.PORT || 3000;

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "healthy" });
});

// SSE endpoint for MCP
app.get("/mcp", async (req, res) => {
  const server = new Server(
    { name: "mcp-postgres", version: "1.0.0" },
    { capabilities: { resources: {}, tools: {} } }
  );

  await setupHandlers(server, process.env.DATABASE_URL!);

  const transport = new SSEServerTransport("/mcp/messages", res);
  await server.connect(transport);
});

// Message endpoint for client responses
app.post("/mcp/messages", express.json(), async (req, res) => {
  // Handle incoming messages from clients
  const transport = getTransportForSession(req);
  await transport.handleMessage(req.body);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(\`MCP server listening on port \${port}\`);
});`
        },
        {
          id: 'mcp10-6',
          type: 'text',
          title: 'Distribution Checklist',
          content: `<p>Before distributing your MCP server:</p>
<ul>
  <li><strong>Documentation</strong> - Clear README with setup instructions</li>
  <li><strong>Configuration</strong> - Support environment variables and CLI args</li>
  <li><strong>Error handling</strong> - Graceful errors with helpful messages</li>
  <li><strong>Security</strong> - No hardcoded credentials, validate all inputs</li>
  <li><strong>Testing</strong> - Comprehensive test suite</li>
  <li><strong>Versioning</strong> - Semantic versioning for updates</li>
</ul>`
        },
        {
          id: 'mcp10-7',
          type: 'warning',
          title: 'Production Considerations',
          content: 'For production deployments: implement rate limiting, add monitoring/alerting, use connection pooling for databases, set up proper logging infrastructure, and have a rollback plan for updates.'
        },
        {
          id: 'mcp10-8',
          type: 'tip',
          title: 'Publishing to npm',
          content: 'Use npm publish --access public for scoped packages. Add a prepublishOnly script to build automatically. Consider using GitHub Actions for automated releases on git tags.'
        }
      ]
    } as LevelContent
  }
];
