// Anthropic API Mastery - Track Content
// API authentication, SDK usage, tool use, streaming, and building applications

import type { TrackLevel, LevelContent } from '@/lib/types';

export const ANTHROPIC_API_TRACK_ID = 'anthropic-api';
export const ANTHROPIC_API_COLOR = '#22C55E';

export const anthropicApiLevels: Omit<TrackLevel, 'id' | 'trackId'>[] = [
  // Level 1: API Authentication & Setup
  {
    levelNumber: 1,
    title: 'API Authentication & Setup',
    description: 'Get your API key and install the Anthropic SDK',
    xpReward: 150,
    estimatedMinutes: 15,
    isFree: true,
    requiresVerification: false,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'api1-1',
          type: 'text',
          title: 'Welcome to the Anthropic API',
          content: `<p>The Anthropic API provides programmatic access to Claude, enabling you to build powerful AI applications. In this track, you'll learn how to:</p>
<ul>
  <li><strong>Authenticate</strong> - Securely connect to the API</li>
  <li><strong>Send messages</strong> - Interact with Claude programmatically</li>
  <li><strong>Use tools</strong> - Give Claude the ability to take actions</li>
  <li><strong>Process images</strong> - Work with Claude's vision capabilities</li>
  <li><strong>Build applications</strong> - Create production-ready integrations</li>
</ul>`
        },
        {
          id: 'api1-screenshot-1',
          type: 'image',
          title: 'The Anthropic Console',
          content: 'The Anthropic Console is where you manage API keys, monitor usage, and test prompts in the Workbench.',
          imageSrc: '/screenshots/anthropic-api/api-console.svg',
          imageAlt: 'Screenshot of the Anthropic Console dashboard showing API key management, Workbench, and usage metrics'
        },
        {
          id: 'api1-2',
          type: 'text',
          title: 'Getting Your API Key',
          content: `<p>To use the Anthropic API, you need an API key:</p>
<ol>
  <li>Visit <a href="https://console.anthropic.com" target="_blank">console.anthropic.com</a></li>
  <li>Create an account or sign in</li>
  <li>Navigate to "API Keys" in the dashboard</li>
  <li>Click "Create Key" and give it a descriptive name</li>
  <li>Copy the key immediately (it won't be shown again)</li>
</ol>`
        },
        {
          id: 'api1-3',
          type: 'warning',
          title: 'Keep Your API Key Secret',
          content: 'Never commit your API key to version control or share it publicly. Treat it like a password. If compromised, revoke it immediately and create a new one.'
        },
        {
          id: 'api1-4',
          type: 'code',
          title: 'Installing the Python SDK',
          language: 'bash',
          content: `# Install the official Anthropic Python SDK
pip install anthropic

# Or with conda
conda install -c conda-forge anthropic

# Verify installation
python -c "import anthropic; print(anthropic.__version__)"`
        },
        {
          id: 'api1-5',
          type: 'code',
          title: 'Installing the TypeScript/JavaScript SDK',
          language: 'bash',
          content: `# Install with npm
npm install @anthropic-ai/sdk

# Or with yarn
yarn add @anthropic-ai/sdk

# Or with pnpm
pnpm add @anthropic-ai/sdk`
        },
        {
          id: 'api1-6',
          type: 'text',
          title: 'Setting Up Your Environment',
          content: `<p>Store your API key as an environment variable for security:</p>`
        },
        {
          id: 'api1-7',
          type: 'code',
          title: 'Environment Variable Setup',
          language: 'bash',
          content: `# Add to your shell profile (.bashrc, .zshrc, etc.)
export ANTHROPIC_API_KEY="sk-ant-api03-your-key-here"

# Or create a .env file (add to .gitignore!)
echo "ANTHROPIC_API_KEY=sk-ant-api03-your-key-here" >> .env`
        },
        {
          id: 'api1-8',
          type: 'tip',
          title: 'SDK Auto-Detection',
          content: 'The Anthropic SDK automatically reads the ANTHROPIC_API_KEY environment variable. You don\'t need to pass it explicitly in your code if the environment variable is set.'
        }
      ]
    } as LevelContent
  },

  // Level 2: Making Your First API Call
  {
    levelNumber: 2,
    title: 'Making Your First API Call',
    description: 'Send your first message to Claude via the API',
    xpReward: 150,
    estimatedMinutes: 15,
    isFree: true,
    requiresVerification: true,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'api2-1',
          type: 'text',
          title: 'The Messages API',
          content: `<p>The Messages API is the primary way to interact with Claude. It uses a conversation-based format with:</p>
<ul>
  <li><strong>Messages</strong> - An array of user and assistant messages</li>
  <li><strong>Model</strong> - Which Claude model to use</li>
  <li><strong>Max tokens</strong> - Maximum length of the response</li>
</ul>`
        },
        {
          id: 'api2-2',
          type: 'code',
          title: 'First API Call - Python',
          language: 'python',
          content: `import anthropic

# Initialize the client (uses ANTHROPIC_API_KEY env var)
client = anthropic.Anthropic()

# Create a message
message = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "Hello, Claude! What can you help me with?"}
    ]
)

# Print the response
print(message.content[0].text)`
        },
        {
          id: 'api2-3',
          type: 'code',
          title: 'First API Call - TypeScript',
          language: 'typescript',
          content: `import Anthropic from '@anthropic-ai/sdk';

// Initialize the client (uses ANTHROPIC_API_KEY env var)
const client = new Anthropic();

async function main() {
  const message = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    messages: [
      { role: "user", content: "Hello, Claude! What can you help me with?" }
    ]
  });

  // TypeScript knows message.content[0] could be text or tool_use
  if (message.content[0].type === 'text') {
    console.log(message.content[0].text);
  }
}

main();`
        },
        {
          id: 'api2-4',
          type: 'text',
          title: 'Understanding the Response',
          content: `<p>The API response includes several useful fields:</p>
<ul>
  <li><code>id</code> - Unique message identifier</li>
  <li><code>type</code> - Always "message"</li>
  <li><code>role</code> - Always "assistant" for responses</li>
  <li><code>content</code> - Array of content blocks (text, tool use, etc.)</li>
  <li><code>model</code> - The model that generated the response</li>
  <li><code>stop_reason</code> - Why the response ended (end_turn, max_tokens, etc.)</li>
  <li><code>usage</code> - Token counts for input and output</li>
</ul>`
        },
        {
          id: 'api2-5',
          type: 'code',
          title: 'Inspecting the Full Response - Python',
          language: 'python',
          content: `import anthropic

client = anthropic.Anthropic()

message = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "What is 2 + 2?"}
    ]
)

print(f"Message ID: {message.id}")
print(f"Model: {message.model}")
print(f"Stop Reason: {message.stop_reason}")
print(f"Input Tokens: {message.usage.input_tokens}")
print(f"Output Tokens: {message.usage.output_tokens}")
print(f"Response: {message.content[0].text}")`
        },
        {
          id: 'api2-6',
          type: 'tip',
          title: 'Token Counting',
          content: 'Keep track of usage.input_tokens and usage.output_tokens to monitor costs. Input tokens are typically cheaper than output tokens.'
        }
      ],
      exercise: {
        type: 'code',
        instructions: 'Write a Python or TypeScript program that sends a message to Claude asking it to explain what an API is in simple terms. Print both the response text and the total tokens used.',
        starterCode: `import anthropic

client = anthropic.Anthropic()

# Your code here: Create a message asking Claude to explain APIs
# Then print the response and token usage`,
        hints: [
          'Use client.messages.create() with model, max_tokens, and messages',
          'Access the response text with message.content[0].text',
          'Total tokens = message.usage.input_tokens + message.usage.output_tokens'
        ],
        validationCriteria: [
          'Creates a message with the API',
          'Asks Claude to explain APIs',
          'Prints the response text',
          'Prints token usage information'
        ]
      }
    } as LevelContent
  },

  // Level 3: Understanding Models & Parameters
  {
    levelNumber: 3,
    title: 'Understanding Models & Parameters',
    description: 'Choose the right model and configure parameters for your use case',
    xpReward: 200,
    estimatedMinutes: 20,
    isFree: false,
    requiresVerification: false,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'api3-1',
          type: 'text',
          title: 'Available Models',
          content: `<p>Anthropic offers several Claude models optimized for different use cases:</p>
<ul>
  <li><strong>claude-opus-4-20250514</strong> - Most capable, best for complex tasks</li>
  <li><strong>claude-sonnet-4-20250514</strong> - Balanced performance and speed</li>
  <li><strong>claude-3-5-haiku-20241022</strong> - Fastest, most cost-effective</li>
</ul>
<p>Choose based on your needs: Opus for quality, Haiku for speed, Sonnet for balance.</p>`
        },
        {
          id: 'api3-2',
          type: 'text',
          title: 'Key Parameters',
          content: `<p>Fine-tune Claude's behavior with these parameters:</p>
<ul>
  <li><strong>max_tokens</strong> (required) - Maximum tokens in the response</li>
  <li><strong>temperature</strong> - Randomness (0-1, default 1)</li>
  <li><strong>top_p</strong> - Nucleus sampling threshold</li>
  <li><strong>top_k</strong> - Limit token choices per step</li>
  <li><strong>system</strong> - System prompt for context and instructions</li>
  <li><strong>stop_sequences</strong> - Custom strings to stop generation</li>
</ul>`
        },
        {
          id: 'api3-3',
          type: 'code',
          title: 'Using Temperature - Python',
          language: 'python',
          content: `import anthropic

client = anthropic.Anthropic()

# Low temperature (0.0) = more deterministic, focused
creative_low = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=256,
    temperature=0.0,
    messages=[
        {"role": "user", "content": "Write a haiku about coding."}
    ]
)

# High temperature (1.0) = more creative, varied
creative_high = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=256,
    temperature=1.0,
    messages=[
        {"role": "user", "content": "Write a haiku about coding."}
    ]
)

print("Low temperature:\\n", creative_low.content[0].text)
print("\\nHigh temperature:\\n", creative_high.content[0].text)`
        },
        {
          id: 'api3-4',
          type: 'tip',
          title: 'Temperature Guidelines',
          content: 'Use temperature=0 for factual tasks, code generation, and consistent outputs. Use higher temperatures (0.7-1.0) for creative writing, brainstorming, and varied responses.'
        },
        {
          id: 'api3-5',
          type: 'code',
          title: 'System Prompts - TypeScript',
          language: 'typescript',
          content: `import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

async function main() {
  const message = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    system: "You are a helpful coding assistant. Always provide code examples in Python and explain your reasoning step by step.",
    messages: [
      { role: "user", content: "How do I read a JSON file?" }
    ]
  });

  if (message.content[0].type === 'text') {
    console.log(message.content[0].text);
  }
}

main();`
        },
        {
          id: 'api3-6',
          type: 'code',
          title: 'Stop Sequences - Python',
          language: 'python',
          content: `import anthropic

client = anthropic.Anthropic()

# Stop generation when Claude says "END"
message = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=1024,
    stop_sequences=["END", "STOP", "---"],
    messages=[
        {"role": "user", "content": "List 3 programming languages, then say END."}
    ]
)

print(f"Response: {message.content[0].text}")
print(f"Stop reason: {message.stop_reason}")  # Will be "stop_sequence"`
        },
        {
          id: 'api3-7',
          type: 'text',
          title: 'Model Selection Strategy',
          content: `<p>Choose your model based on the task:</p>
<table>
  <tr><th>Use Case</th><th>Recommended Model</th></tr>
  <tr><td>Complex analysis, research</td><td>claude-opus-4-20250514</td></tr>
  <tr><td>General coding, writing</td><td>claude-sonnet-4-20250514</td></tr>
  <tr><td>Simple Q&A, classification</td><td>claude-3-5-haiku-20241022</td></tr>
  <tr><td>High-volume, low-latency</td><td>claude-3-5-haiku-20241022</td></tr>
</table>`
        }
      ]
    } as LevelContent
  },

  // Level 4: Streaming Responses
  {
    levelNumber: 4,
    title: 'Streaming Responses',
    description: 'Implement real-time streaming for better user experience',
    xpReward: 200,
    estimatedMinutes: 20,
    isFree: false,
    requiresVerification: false,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'api4-1',
          type: 'text',
          title: 'Why Stream Responses?',
          content: `<p>Streaming provides several benefits:</p>
<ul>
  <li><strong>Better UX</strong> - Users see responses as they're generated</li>
  <li><strong>Lower latency</strong> - First token arrives quickly</li>
  <li><strong>Progress indication</strong> - Users know the system is working</li>
  <li><strong>Early termination</strong> - Cancel if response isn't useful</li>
</ul>`
        },
        {
          id: 'api4-2',
          type: 'code',
          title: 'Basic Streaming - Python',
          language: 'python',
          content: `import anthropic

client = anthropic.Anthropic()

# Use stream=True for streaming responses
with client.messages.stream(
    model="claude-sonnet-4-20250514",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "Write a short story about a robot learning to paint."}
    ]
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)

print()  # Newline at the end`
        },
        {
          id: 'api4-3',
          type: 'code',
          title: 'Basic Streaming - TypeScript',
          language: 'typescript',
          content: `import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

async function main() {
  const stream = client.messages.stream({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    messages: [
      { role: "user", content: "Write a short story about a robot learning to paint." }
    ]
  });

  // Process text as it arrives
  stream.on('text', (text) => {
    process.stdout.write(text);
  });

  // Wait for completion
  const finalMessage = await stream.finalMessage();
  console.log('\\n\\nTotal tokens:', finalMessage.usage.input_tokens + finalMessage.usage.output_tokens);
}

main();`
        },
        {
          id: 'api4-4',
          type: 'text',
          title: 'Stream Events',
          content: `<p>The streaming API emits several event types:</p>
<ul>
  <li><code>message_start</code> - Beginning of the message</li>
  <li><code>content_block_start</code> - Start of a content block</li>
  <li><code>content_block_delta</code> - Incremental text updates</li>
  <li><code>content_block_stop</code> - End of a content block</li>
  <li><code>message_delta</code> - Message-level updates (stop_reason, usage)</li>
  <li><code>message_stop</code> - End of the message</li>
</ul>`
        },
        {
          id: 'api4-5',
          type: 'code',
          title: 'Handling Stream Events - Python',
          language: 'python',
          content: `import anthropic

client = anthropic.Anthropic()

with client.messages.stream(
    model="claude-sonnet-4-20250514",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "Count from 1 to 5 slowly."}
    ]
) as stream:
    for event in stream:
        if event.type == "content_block_delta":
            print(event.delta.text, end="", flush=True)
        elif event.type == "message_stop":
            print("\\n[Stream completed]")
        elif event.type == "message_delta":
            print(f"\\n[Stop reason: {event.delta.stop_reason}]")`
        },
        {
          id: 'api4-6',
          type: 'code',
          title: 'Async Streaming - Python',
          language: 'python',
          content: `import anthropic
import asyncio

async def stream_response():
    client = anthropic.AsyncAnthropic()

    async with client.messages.stream(
        model="claude-sonnet-4-20250514",
        max_tokens=1024,
        messages=[
            {"role": "user", "content": "Explain quantum computing briefly."}
        ]
    ) as stream:
        async for text in stream.text_stream:
            print(text, end="", flush=True)

    print()

# Run the async function
asyncio.run(stream_response())`
        },
        {
          id: 'api4-7',
          type: 'tip',
          title: 'Web Applications',
          content: 'For web apps, stream responses using Server-Sent Events (SSE). The client receives chunks as they arrive, creating a ChatGPT-like typing effect.'
        }
      ]
    } as LevelContent
  },

  // Level 5: Tool Use (Function Calling)
  {
    levelNumber: 5,
    title: 'Tool Use (Function Calling)',
    description: 'Give Claude the ability to use tools and take actions',
    xpReward: 250,
    estimatedMinutes: 25,
    isFree: false,
    requiresVerification: true,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'api5-1',
          type: 'text',
          title: 'What is Tool Use?',
          content: `<p>Tool use (also called function calling) allows Claude to:</p>
<ul>
  <li><strong>Request actions</strong> - Ask your code to perform operations</li>
  <li><strong>Get real data</strong> - Fetch information from APIs, databases</li>
  <li><strong>Take actions</strong> - Send emails, update records, etc.</li>
  <li><strong>Extend capabilities</strong> - Do things Claude can't do alone</li>
</ul>
<p>You define the tools, Claude decides when and how to use them.</p>`
        },
        {
          id: 'api5-2',
          type: 'code',
          title: 'Defining Tools - Python',
          language: 'python',
          content: `import anthropic

client = anthropic.Anthropic()

# Define your tools with JSON Schema
tools = [
    {
        "name": "get_weather",
        "description": "Get the current weather for a location",
        "input_schema": {
            "type": "object",
            "properties": {
                "location": {
                    "type": "string",
                    "description": "City and state, e.g., San Francisco, CA"
                },
                "unit": {
                    "type": "string",
                    "enum": ["celsius", "fahrenheit"],
                    "description": "Temperature unit"
                }
            },
            "required": ["location"]
        }
    }
]

message = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=1024,
    tools=tools,
    messages=[
        {"role": "user", "content": "What's the weather like in Tokyo?"}
    ]
)

print(message.content)`
        },
        {
          id: 'api5-3',
          type: 'text',
          title: 'The Tool Use Flow',
          content: `<p>Tool use follows a specific pattern:</p>
<ol>
  <li>You send a message with tool definitions</li>
  <li>Claude responds with a <code>tool_use</code> content block</li>
  <li>Your code executes the tool with the provided inputs</li>
  <li>You send the result back as a <code>tool_result</code></li>
  <li>Claude uses the result to formulate its response</li>
</ol>`
        },
        {
          id: 'api5-4',
          type: 'code',
          title: 'Complete Tool Use Loop - Python',
          language: 'python',
          content: `import anthropic
import json

client = anthropic.Anthropic()

# Define the tool
tools = [
    {
        "name": "calculate",
        "description": "Perform basic math calculations",
        "input_schema": {
            "type": "object",
            "properties": {
                "expression": {
                    "type": "string",
                    "description": "Math expression to evaluate, e.g., '2 + 2 * 3'"
                }
            },
            "required": ["expression"]
        }
    }
]

# Function to actually perform the calculation
def calculate(expression: str) -> str:
    try:
        # WARNING: eval is dangerous with untrusted input!
        # Use a proper math parser in production
        result = eval(expression)
        return str(result)
    except Exception as e:
        return f"Error: {e}"

# Initial request
messages = [{"role": "user", "content": "What is 15 * 7 + 23?"}]

response = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=1024,
    tools=tools,
    messages=messages
)

# Check if Claude wants to use a tool
if response.stop_reason == "tool_use":
    # Find the tool use block
    tool_use = next(block for block in response.content if block.type == "tool_use")

    # Execute the tool
    if tool_use.name == "calculate":
        result = calculate(tool_use.input["expression"])

    # Send the result back to Claude
    messages.append({"role": "assistant", "content": response.content})
    messages.append({
        "role": "user",
        "content": [
            {
                "type": "tool_result",
                "tool_use_id": tool_use.id,
                "content": result
            }
        ]
    })

    # Get Claude's final response
    final_response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=1024,
        tools=tools,
        messages=messages
    )

    print(final_response.content[0].text)
else:
    print(response.content[0].text)`
        },
        {
          id: 'api5-5',
          type: 'code',
          title: 'Multiple Tools - TypeScript',
          language: 'typescript',
          content: `import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

const tools: Anthropic.Tool[] = [
  {
    name: "search_database",
    description: "Search the product database",
    input_schema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query" },
        limit: { type: "number", description: "Max results (default 10)" }
      },
      required: ["query"]
    }
  },
  {
    name: "get_product_details",
    description: "Get details for a specific product",
    input_schema: {
      type: "object",
      properties: {
        product_id: { type: "string", description: "Product ID" }
      },
      required: ["product_id"]
    }
  }
];

// Tool implementations
function searchDatabase(query: string, limit = 10): object {
  // In reality, query your database here
  return { results: [{ id: "123", name: "Widget", price: 9.99 }] };
}

function getProductDetails(productId: string): object {
  return { id: productId, name: "Widget", price: 9.99, stock: 42 };
}

async function main() {
  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    tools: tools,
    messages: [
      { role: "user", content: "Find products matching 'widget' and show me details of the first one" }
    ]
  });

  console.log("Response:", JSON.stringify(response.content, null, 2));
}

main();`
        },
        {
          id: 'api5-6',
          type: 'tip',
          title: 'Tool Design Best Practices',
          content: 'Write clear, detailed descriptions for tools and parameters. Claude uses these descriptions to decide when and how to use each tool. Include examples in descriptions when helpful.'
        }
      ],
      exercise: {
        type: 'code',
        instructions: 'Create a tool called "get_stock_price" that takes a stock symbol and returns a price. Then write the code to handle Claude\'s tool use request and return a mock price.',
        starterCode: `import anthropic

client = anthropic.Anthropic()

# Define your get_stock_price tool here
tools = [
    # Your tool definition
]

# Function to handle the tool call
def get_stock_price(symbol: str) -> str:
    # Return a mock price
    pass

# Create message and handle tool use
messages = [{"role": "user", "content": "What's the stock price of AAPL?"}]

# Your code to handle the tool use flow`,
        hints: [
          'The tool needs a "symbol" parameter of type string',
          'Check response.stop_reason == "tool_use" to see if Claude wants to use a tool',
          'Send the result back with role: "user" and type: "tool_result"'
        ],
        validationCriteria: [
          'Defines a get_stock_price tool with proper schema',
          'Implements a function to return mock prices',
          'Handles the tool use response correctly',
          'Sends tool results back to Claude'
        ]
      }
    } as LevelContent
  },

  // Level 6: Multi-turn Conversations
  {
    levelNumber: 6,
    title: 'Multi-turn Conversations',
    description: 'Manage conversation history for context-aware interactions',
    xpReward: 200,
    estimatedMinutes: 20,
    isFree: false,
    requiresVerification: false,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'api6-1',
          type: 'text',
          title: 'Conversation Context',
          content: `<p>The Claude API is stateless - each request is independent. To maintain context across turns, you must:</p>
<ul>
  <li><strong>Store messages</strong> - Keep a list of all messages</li>
  <li><strong>Include history</strong> - Send previous messages with each request</li>
  <li><strong>Manage length</strong> - Handle context window limits</li>
</ul>`
        },
        {
          id: 'api6-2',
          type: 'code',
          title: 'Basic Multi-turn Conversation - Python',
          language: 'python',
          content: `import anthropic

client = anthropic.Anthropic()

# Maintain conversation history
conversation_history = []

def chat(user_message: str) -> str:
    """Send a message and get a response, maintaining context."""
    # Add user message to history
    conversation_history.append({
        "role": "user",
        "content": user_message
    })

    # Send request with full history
    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=1024,
        system="You are a helpful assistant with a great memory.",
        messages=conversation_history
    )

    # Add assistant response to history
    assistant_message = response.content[0].text
    conversation_history.append({
        "role": "assistant",
        "content": assistant_message
    })

    return assistant_message

# Have a conversation
print(chat("My name is Alice and I love hiking."))
print(chat("What's my name and what do I enjoy?"))  # Claude remembers!
print(chat("Suggest a hiking trail for me."))`
        },
        {
          id: 'api6-3',
          type: 'code',
          title: 'Conversation Class - TypeScript',
          language: 'typescript',
          content: `import Anthropic from '@anthropic-ai/sdk';

class Conversation {
  private client: Anthropic;
  private history: Anthropic.MessageParam[] = [];
  private systemPrompt: string;

  constructor(systemPrompt: string = "You are a helpful assistant.") {
    this.client = new Anthropic();
    this.systemPrompt = systemPrompt;
  }

  async send(userMessage: string): Promise<string> {
    // Add user message
    this.history.push({ role: "user", content: userMessage });

    // Get response
    const response = await this.client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: this.systemPrompt,
      messages: this.history
    });

    // Extract and store assistant response
    const assistantMessage = response.content[0].type === 'text'
      ? response.content[0].text
      : '';

    this.history.push({ role: "assistant", content: assistantMessage });

    return assistantMessage;
  }

  clear(): void {
    this.history = [];
  }

  getHistory(): Anthropic.MessageParam[] {
    return [...this.history];
  }
}

// Usage
async function main() {
  const chat = new Conversation("You are a friendly tutor.");

  console.log(await chat.send("I want to learn about photosynthesis."));
  console.log(await chat.send("Can you explain it more simply?"));
  console.log(await chat.send("What's the chemical equation?"));
}

main();`
        },
        {
          id: 'api6-4',
          type: 'text',
          title: 'Managing Context Length',
          content: `<p>Claude has a context window limit (varies by model). When conversations get long:</p>
<ul>
  <li><strong>Truncate old messages</strong> - Remove earliest messages</li>
  <li><strong>Summarize history</strong> - Condense old context</li>
  <li><strong>Sliding window</strong> - Keep only recent N messages</li>
  <li><strong>Smart selection</strong> - Keep most relevant messages</li>
</ul>`
        },
        {
          id: 'api6-5',
          type: 'code',
          title: 'Context Management - Python',
          language: 'python',
          content: `import anthropic

client = anthropic.Anthropic()

class ManagedConversation:
    def __init__(self, max_messages: int = 20):
        self.history = []
        self.max_messages = max_messages

    def add_message(self, role: str, content: str):
        self.history.append({"role": role, "content": content})
        self._trim_history()

    def _trim_history(self):
        """Keep only the most recent messages."""
        if len(self.history) > self.max_messages:
            # Always keep first message for context
            first_message = self.history[0]
            # Keep recent messages
            recent = self.history[-(self.max_messages - 1):]
            self.history = [first_message] + recent

    def get_messages(self):
        return self.history.copy()

# Alternative: Summarize old context
def summarize_and_continue(history: list, client) -> list:
    """Summarize old messages when context gets too long."""
    if len(history) < 10:
        return history

    # Get summary of older messages
    old_messages = history[:-4]  # Keep last 4 as-is

    summary_response = client.messages.create(
        model="claude-3-5-haiku-20241022",  # Use fast model for summary
        max_tokens=500,
        messages=[
            {"role": "user", "content": f"Summarize this conversation briefly:\\n{old_messages}"}
        ]
    )

    summary = summary_response.content[0].text

    # Return summary + recent messages
    return [
        {"role": "user", "content": f"[Previous conversation summary: {summary}]"},
        {"role": "assistant", "content": "I understand the context. How can I help?"}
    ] + history[-4:]`
        },
        {
          id: 'api6-6',
          type: 'tip',
          title: 'Conversation Storage',
          content: 'For production apps, store conversation history in a database (Redis, PostgreSQL, etc.) keyed by session or user ID. This allows conversations to persist across server restarts.'
        }
      ]
    } as LevelContent
  },

  // Level 7: Vision & Image Input
  {
    levelNumber: 7,
    title: 'Vision & Image Input',
    description: 'Process and analyze images with Claude\'s vision capabilities',
    xpReward: 250,
    estimatedMinutes: 25,
    isFree: false,
    requiresVerification: true,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'api7-1',
          type: 'text',
          title: 'Claude\'s Vision Capabilities',
          content: `<p>Claude can analyze images to:</p>
<ul>
  <li><strong>Describe content</strong> - What's in the image</li>
  <li><strong>Extract text</strong> - OCR from screenshots, documents</li>
  <li><strong>Analyze charts</strong> - Interpret graphs and diagrams</li>
  <li><strong>Code from screenshots</strong> - Convert UI mockups to code</li>
  <li><strong>Compare images</strong> - Find differences or similarities</li>
</ul>`
        },
        {
          id: 'api7-2',
          type: 'text',
          title: 'Supported Image Formats',
          content: `<p>Claude accepts images in these formats:</p>
<ul>
  <li>JPEG / JPG</li>
  <li>PNG</li>
  <li>GIF (first frame only)</li>
  <li>WebP</li>
</ul>
<p>Maximum size: 20MB per image. Images can be sent as base64 or URLs.</p>`
        },
        {
          id: 'api7-3',
          type: 'code',
          title: 'Image from URL - Python',
          language: 'python',
          content: `import anthropic

client = anthropic.Anthropic()

message = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=1024,
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "image",
                    "source": {
                        "type": "url",
                        "url": "https://upload.wikimedia.org/wikipedia/commons/a/a7/Camponotus_flavomarginatus_ant.jpg"
                    }
                },
                {
                    "type": "text",
                    "text": "What insect is shown in this image? Describe it in detail."
                }
            ]
        }
    ]
)

print(message.content[0].text)`
        },
        {
          id: 'api7-4',
          type: 'code',
          title: 'Image from Base64 - Python',
          language: 'python',
          content: `import anthropic
import base64
from pathlib import Path

client = anthropic.Anthropic()

# Read and encode a local image
image_path = Path("screenshot.png")
image_data = base64.standard_b64encode(image_path.read_bytes()).decode("utf-8")

# Determine media type from extension
media_type = "image/png"  # or image/jpeg, image/gif, image/webp

message = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=1024,
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "image",
                    "source": {
                        "type": "base64",
                        "media_type": media_type,
                        "data": image_data
                    }
                },
                {
                    "type": "text",
                    "text": "Extract all the text from this screenshot."
                }
            ]
        }
    ]
)

print(message.content[0].text)`
        },
        {
          id: 'api7-5',
          type: 'code',
          title: 'Multiple Images - TypeScript',
          language: 'typescript',
          content: `import Anthropic from '@anthropic-ai/sdk';
import * as fs from 'fs';

const client = new Anthropic();

async function compareImages(image1Path: string, image2Path: string) {
  // Read and encode both images
  const image1Data = fs.readFileSync(image1Path).toString('base64');
  const image2Data = fs.readFileSync(image2Path).toString('base64');

  const message = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: {
              type: "base64",
              media_type: "image/png",
              data: image1Data
            }
          },
          {
            type: "image",
            source: {
              type: "base64",
              media_type: "image/png",
              data: image2Data
            }
          },
          {
            type: "text",
            text: "Compare these two images. What are the key differences?"
          }
        ]
      }
    ]
  });

  if (message.content[0].type === 'text') {
    console.log(message.content[0].text);
  }
}

compareImages('before.png', 'after.png');`
        },
        {
          id: 'api7-6',
          type: 'tip',
          title: 'Vision Best Practices',
          content: 'For best results: use high-resolution images, ensure text is legible, and be specific in your prompts about what you want analyzed. Claude can process multiple images in a single request for comparison tasks.'
        },
        {
          id: 'api7-7',
          type: 'code',
          title: 'UI to Code Example - Python',
          language: 'python',
          content: `import anthropic
import base64

client = anthropic.Anthropic()

# Load a UI mockup screenshot
with open("ui_mockup.png", "rb") as f:
    image_data = base64.standard_b64encode(f.read()).decode("utf-8")

message = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=4096,
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "image",
                    "source": {
                        "type": "base64",
                        "media_type": "image/png",
                        "data": image_data
                    }
                },
                {
                    "type": "text",
                    "text": """Convert this UI mockup to React code with Tailwind CSS.
                    Include:
                    - Proper component structure
                    - Responsive design
                    - Semantic HTML
                    - Accessibility attributes"""
                }
            ]
        }
    ]
)

print(message.content[0].text)`
        }
      ],
      exercise: {
        type: 'code',
        instructions: 'Write a Python function that takes an image URL and a question about the image, then returns Claude\'s analysis. Test it with an image of your choice.',
        starterCode: `import anthropic

def analyze_image(image_url: str, question: str) -> str:
    """
    Analyze an image and answer a question about it.

    Args:
        image_url: URL of the image to analyze
        question: Question to ask about the image

    Returns:
        Claude's response about the image
    """
    client = anthropic.Anthropic()

    # Your code here
    pass

# Test your function
result = analyze_image(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
    "What animal is this and what color is it?"
)
print(result)`,
        hints: [
          'Use content as a list with both image and text blocks',
          'The image source type should be "url" with a "url" field',
          'Access the response with message.content[0].text'
        ],
        validationCriteria: [
          'Creates proper image content block with URL',
          'Includes text content block with the question',
          'Returns the text response from Claude',
          'Handles the API call correctly'
        ]
      }
    } as LevelContent
  },

  // Level 8: Batch Processing
  {
    levelNumber: 8,
    title: 'Batch Processing',
    description: 'Efficiently process large volumes of requests',
    xpReward: 250,
    estimatedMinutes: 25,
    isFree: false,
    requiresVerification: false,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'api8-1',
          type: 'text',
          title: 'Why Batch Processing?',
          content: `<p>When you need to process many requests, batching provides:</p>
<ul>
  <li><strong>Cost savings</strong> - 50% discount on batch requests</li>
  <li><strong>Higher throughput</strong> - Process more requests in parallel</li>
  <li><strong>Async processing</strong> - Submit and retrieve results later</li>
  <li><strong>Better resource management</strong> - Avoid rate limits</li>
</ul>`
        },
        {
          id: 'api8-2',
          type: 'text',
          title: 'Batch API Overview',
          content: `<p>The Message Batches API works in three steps:</p>
<ol>
  <li><strong>Create</strong> - Submit a batch of requests</li>
  <li><strong>Poll</strong> - Check batch status until complete</li>
  <li><strong>Retrieve</strong> - Get results for all requests</li>
</ol>
<p>Batches are processed within 24 hours and results are available for 29 days.</p>`
        },
        {
          id: 'api8-3',
          type: 'code',
          title: 'Creating a Batch - Python',
          language: 'python',
          content: `import anthropic

client = anthropic.Anthropic()

# Create a batch of requests
batch = client.messages.batches.create(
    requests=[
        {
            "custom_id": "request-1",
            "params": {
                "model": "claude-sonnet-4-20250514",
                "max_tokens": 1024,
                "messages": [
                    {"role": "user", "content": "Summarize the benefits of exercise."}
                ]
            }
        },
        {
            "custom_id": "request-2",
            "params": {
                "model": "claude-sonnet-4-20250514",
                "max_tokens": 1024,
                "messages": [
                    {"role": "user", "content": "Summarize the benefits of meditation."}
                ]
            }
        },
        {
            "custom_id": "request-3",
            "params": {
                "model": "claude-sonnet-4-20250514",
                "max_tokens": 1024,
                "messages": [
                    {"role": "user", "content": "Summarize the benefits of good sleep."}
                ]
            }
        }
    ]
)

print(f"Batch ID: {batch.id}")
print(f"Status: {batch.processing_status}")`
        },
        {
          id: 'api8-4',
          type: 'code',
          title: 'Polling and Retrieving Results - Python',
          language: 'python',
          content: `import anthropic
import time

client = anthropic.Anthropic()

def process_batch(batch_id: str):
    """Poll for batch completion and retrieve results."""
    while True:
        batch = client.messages.batches.retrieve(batch_id)

        print(f"Status: {batch.processing_status}")
        print(f"Completed: {batch.request_counts.succeeded}/{batch.request_counts.processing + batch.request_counts.succeeded}")

        if batch.processing_status == "ended":
            break

        time.sleep(60)  # Check every minute

    # Retrieve results
    results = {}
    for result in client.messages.batches.results(batch_id):
        if result.result.type == "succeeded":
            message = result.result.message
            results[result.custom_id] = message.content[0].text
        else:
            results[result.custom_id] = f"Error: {result.result.error}"

    return results

# Process a batch
results = process_batch("batch_abc123")
for custom_id, response in results.items():
    print(f"\\n{custom_id}:\\n{response}")`
        },
        {
          id: 'api8-5',
          type: 'code',
          title: 'Async Batch Processing - TypeScript',
          language: 'typescript',
          content: `import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

interface BatchRequest {
  custom_id: string;
  params: Anthropic.MessageCreateParams;
}

async function createAndProcessBatch(prompts: string[]) {
  // Build batch requests
  const requests: BatchRequest[] = prompts.map((prompt, index) => ({
    custom_id: \`request-\${index}\`,
    params: {
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }]
    }
  }));

  // Create batch
  const batch = await client.messages.batches.create({ requests });
  console.log(\`Created batch: \${batch.id}\`);

  // Poll until complete
  let status = batch.processing_status;
  while (status !== 'ended') {
    await new Promise(resolve => setTimeout(resolve, 60000));
    const updated = await client.messages.batches.retrieve(batch.id);
    status = updated.processing_status;
    console.log(\`Status: \${status}\`);
  }

  // Collect results
  const results: Record<string, string> = {};
  for await (const result of client.messages.batches.results(batch.id)) {
    if (result.result.type === 'succeeded') {
      const content = result.result.message.content[0];
      if (content.type === 'text') {
        results[result.custom_id] = content.text;
      }
    }
  }

  return results;
}

// Example usage
const prompts = [
  "What is TypeScript?",
  "What is JavaScript?",
  "What is Python?"
];

createAndProcessBatch(prompts).then(console.log);`
        },
        {
          id: 'api8-6',
          type: 'tip',
          title: 'Batch Best Practices',
          content: 'Use meaningful custom_id values that help you match results to original requests. Include metadata in the ID like "user-123-task-456" for easy tracking.'
        },
        {
          id: 'api8-7',
          type: 'text',
          title: 'Concurrent Processing Alternative',
          content: `<p>For immediate results (no 24-hour wait), use concurrent API calls:</p>`
        },
        {
          id: 'api8-8',
          type: 'code',
          title: 'Concurrent Processing - Python',
          language: 'python',
          content: `import anthropic
import asyncio
from typing import List

async def process_concurrent(prompts: List[str], max_concurrent: int = 5):
    """Process multiple prompts concurrently with rate limiting."""
    client = anthropic.AsyncAnthropic()
    semaphore = asyncio.Semaphore(max_concurrent)

    async def process_one(prompt: str, index: int):
        async with semaphore:
            response = await client.messages.create(
                model="claude-sonnet-4-20250514",
                max_tokens=1024,
                messages=[{"role": "user", "content": prompt}]
            )
            return index, response.content[0].text

    tasks = [process_one(prompt, i) for i, prompt in enumerate(prompts)]
    results = await asyncio.gather(*tasks)

    # Sort by original index
    return [r[1] for r in sorted(results, key=lambda x: x[0])]

# Usage
prompts = ["Question 1", "Question 2", "Question 3"]
results = asyncio.run(process_concurrent(prompts))
for i, result in enumerate(results):
    print(f"Result {i}: {result[:100]}...")`
        }
      ]
    } as LevelContent
  },

  // Level 9: Error Handling & Best Practices
  {
    levelNumber: 9,
    title: 'Error Handling & Best Practices',
    description: 'Implement robust error handling and production-ready patterns',
    xpReward: 250,
    estimatedMinutes: 25,
    isFree: false,
    requiresVerification: false,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'api9-1',
          type: 'text',
          title: 'Common API Errors',
          content: `<p>The Anthropic API can return several error types:</p>
<ul>
  <li><strong>400 Bad Request</strong> - Invalid request format or parameters</li>
  <li><strong>401 Unauthorized</strong> - Invalid or missing API key</li>
  <li><strong>403 Forbidden</strong> - API key doesn't have access</li>
  <li><strong>429 Rate Limited</strong> - Too many requests</li>
  <li><strong>500 Server Error</strong> - Anthropic server issue</li>
  <li><strong>529 Overloaded</strong> - API is temporarily overloaded</li>
</ul>`
        },
        {
          id: 'api9-2',
          type: 'code',
          title: 'Basic Error Handling - Python',
          language: 'python',
          content: `import anthropic

client = anthropic.Anthropic()

try:
    message = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=1024,
        messages=[{"role": "user", "content": "Hello!"}]
    )
    print(message.content[0].text)

except anthropic.AuthenticationError:
    print("Invalid API key. Check your ANTHROPIC_API_KEY.")

except anthropic.RateLimitError as e:
    print(f"Rate limited. Retry after: {e.response.headers.get('retry-after', 'unknown')} seconds")

except anthropic.BadRequestError as e:
    print(f"Bad request: {e.message}")

except anthropic.APIError as e:
    print(f"API error: {e.status_code} - {e.message}")`
        },
        {
          id: 'api9-3',
          type: 'code',
          title: 'Retry Logic with Exponential Backoff - Python',
          language: 'python',
          content: `import anthropic
import time
from typing import Optional

def call_with_retry(
    client: anthropic.Anthropic,
    messages: list,
    max_retries: int = 3,
    base_delay: float = 1.0
) -> Optional[str]:
    """Make an API call with exponential backoff retry."""

    for attempt in range(max_retries):
        try:
            response = client.messages.create(
                model="claude-sonnet-4-20250514",
                max_tokens=1024,
                messages=messages
            )
            return response.content[0].text

        except anthropic.RateLimitError as e:
            # Use retry-after header if available
            retry_after = int(e.response.headers.get('retry-after', base_delay * (2 ** attempt)))
            print(f"Rate limited. Waiting {retry_after}s...")
            time.sleep(retry_after)

        except anthropic.APIStatusError as e:
            if e.status_code >= 500:
                # Server error - retry with backoff
                delay = base_delay * (2 ** attempt)
                print(f"Server error {e.status_code}. Retrying in {delay}s...")
                time.sleep(delay)
            else:
                # Client error - don't retry
                raise

        except anthropic.APIConnectionError:
            delay = base_delay * (2 ** attempt)
            print(f"Connection error. Retrying in {delay}s...")
            time.sleep(delay)

    print("Max retries exceeded")
    return None

# Usage
client = anthropic.Anthropic()
result = call_with_retry(client, [{"role": "user", "content": "Hello!"}])
if result:
    print(result)`
        },
        {
          id: 'api9-4',
          type: 'code',
          title: 'Error Handling - TypeScript',
          language: 'typescript',
          content: `import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

async function safeApiCall(prompt: string): Promise<string | null> {
  const maxRetries = 3;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const message = await client.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        messages: [{ role: "user", content: prompt }]
      });

      if (message.content[0].type === 'text') {
        return message.content[0].text;
      }
      return null;

    } catch (error) {
      if (error instanceof Anthropic.RateLimitError) {
        const delay = Math.pow(2, attempt) * 1000;
        console.log(\`Rate limited. Waiting \${delay}ms...\`);
        await new Promise(resolve => setTimeout(resolve, delay));

      } else if (error instanceof Anthropic.APIError) {
        if (error.status >= 500) {
          const delay = Math.pow(2, attempt) * 1000;
          console.log(\`Server error. Retrying in \${delay}ms...\`);
          await new Promise(resolve => setTimeout(resolve, delay));
        } else {
          throw error; // Don't retry client errors
        }

      } else {
        throw error;
      }
    }
  }

  console.log("Max retries exceeded");
  return null;
}

// Usage
safeApiCall("Hello!").then(result => {
  if (result) console.log(result);
});`
        },
        {
          id: 'api9-5',
          type: 'text',
          title: 'Rate Limit Best Practices',
          content: `<p>To avoid hitting rate limits:</p>
<ul>
  <li><strong>Implement backoff</strong> - Exponential backoff with jitter</li>
  <li><strong>Use queues</strong> - Queue requests and process at a steady rate</li>
  <li><strong>Cache responses</strong> - Don't repeat identical requests</li>
  <li><strong>Use batching</strong> - Message Batches API for bulk processing</li>
  <li><strong>Monitor usage</strong> - Track your request patterns</li>
</ul>`
        },
        {
          id: 'api9-6',
          type: 'code',
          title: 'Request Queue Pattern - Python',
          language: 'python',
          content: `import anthropic
import asyncio
from collections import deque
from typing import Callable, Any

class RequestQueue:
    """Rate-limited request queue."""

    def __init__(self, requests_per_minute: int = 50):
        self.client = anthropic.AsyncAnthropic()
        self.delay = 60.0 / requests_per_minute
        self.queue: deque = deque()
        self.results: dict = {}

    async def add(self, request_id: str, messages: list):
        """Add a request to the queue."""
        self.queue.append((request_id, messages))

    async def process(self):
        """Process all queued requests with rate limiting."""
        while self.queue:
            request_id, messages = self.queue.popleft()

            try:
                response = await self.client.messages.create(
                    model="claude-sonnet-4-20250514",
                    max_tokens=1024,
                    messages=messages
                )
                self.results[request_id] = response.content[0].text
            except Exception as e:
                self.results[request_id] = f"Error: {e}"

            # Rate limiting delay
            await asyncio.sleep(self.delay)

        return self.results

# Usage
async def main():
    queue = RequestQueue(requests_per_minute=30)

    # Add requests
    for i in range(10):
        await queue.add(f"req-{i}", [{"role": "user", "content": f"Question {i}"}])

    # Process with rate limiting
    results = await queue.process()
    print(results)

asyncio.run(main())`
        },
        {
          id: 'api9-7',
          type: 'tip',
          title: 'Production Checklist',
          content: 'Before deploying: implement retry logic, add request timeouts, log errors with context, set up monitoring/alerting, use environment variables for keys, and test error scenarios.'
        }
      ]
    } as LevelContent
  },

  // Level 10: Building a Complete Application
  {
    levelNumber: 10,
    title: 'Building a Complete Application',
    description: 'Put it all together with a full application example',
    xpReward: 300,
    estimatedMinutes: 30,
    isFree: false,
    requiresVerification: true,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'api10-1',
          type: 'text',
          title: 'Building a Document Q&A System',
          content: `<p>Let's build a complete application that combines everything you've learned:</p>
<ul>
  <li><strong>Multi-turn conversations</strong> - Maintain context</li>
  <li><strong>Tool use</strong> - Search documents and retrieve info</li>
  <li><strong>Streaming</strong> - Real-time responses</li>
  <li><strong>Error handling</strong> - Robust production code</li>
</ul>`
        },
        {
          id: 'api10-2',
          type: 'code',
          title: 'Document Q&A System - Python',
          language: 'python',
          content: `import anthropic
from typing import Optional
import json

class DocumentQA:
    """A document Q&A system using Claude with tool use."""

    def __init__(self):
        self.client = anthropic.Anthropic()
        self.conversation_history = []
        self.documents = {}  # Simple in-memory document store

        # Define tools for document operations
        self.tools = [
            {
                "name": "search_documents",
                "description": "Search through documents for relevant information",
                "input_schema": {
                    "type": "object",
                    "properties": {
                        "query": {
                            "type": "string",
                            "description": "Search query"
                        }
                    },
                    "required": ["query"]
                }
            },
            {
                "name": "get_document",
                "description": "Retrieve a specific document by ID",
                "input_schema": {
                    "type": "object",
                    "properties": {
                        "document_id": {
                            "type": "string",
                            "description": "Document ID"
                        }
                    },
                    "required": ["document_id"]
                }
            }
        ]

    def add_document(self, doc_id: str, content: str, metadata: dict = None):
        """Add a document to the system."""
        self.documents[doc_id] = {
            "content": content,
            "metadata": metadata or {}
        }

    def _search_documents(self, query: str) -> str:
        """Simple keyword search (replace with vector search in production)."""
        results = []
        query_lower = query.lower()

        for doc_id, doc in self.documents.items():
            if query_lower in doc["content"].lower():
                results.append({
                    "id": doc_id,
                    "snippet": doc["content"][:200] + "..."
                })

        return json.dumps(results if results else [{"message": "No documents found"}])

    def _get_document(self, document_id: str) -> str:
        """Retrieve a document by ID."""
        if document_id in self.documents:
            return json.dumps(self.documents[document_id])
        return json.dumps({"error": f"Document {document_id} not found"})

    def _execute_tool(self, tool_name: str, tool_input: dict) -> str:
        """Execute a tool and return the result."""
        if tool_name == "search_documents":
            return self._search_documents(tool_input["query"])
        elif tool_name == "get_document":
            return self._get_document(tool_input["document_id"])
        return json.dumps({"error": f"Unknown tool: {tool_name}"})`
        },
        {
          id: 'api10-3',
          type: 'code',
          title: 'Document Q&A System - Chat Method',
          language: 'python',
          content: `    def chat(self, user_message: str) -> str:
        """Send a message and get a response, handling tool use."""
        self.conversation_history.append({
            "role": "user",
            "content": user_message
        })

        # Keep trying until we get a final response
        while True:
            try:
                response = self.client.messages.create(
                    model="claude-sonnet-4-20250514",
                    max_tokens=4096,
                    system="""You are a helpful document assistant. Use the search_documents
                    tool to find relevant information, then use get_document to retrieve
                    full content when needed. Always cite your sources.""",
                    tools=self.tools,
                    messages=self.conversation_history
                )

                # Check if Claude wants to use a tool
                if response.stop_reason == "tool_use":
                    # Add assistant's response to history
                    self.conversation_history.append({
                        "role": "assistant",
                        "content": response.content
                    })

                    # Process all tool uses
                    tool_results = []
                    for block in response.content:
                        if block.type == "tool_use":
                            result = self._execute_tool(block.name, block.input)
                            tool_results.append({
                                "type": "tool_result",
                                "tool_use_id": block.id,
                                "content": result
                            })

                    # Add tool results to history
                    self.conversation_history.append({
                        "role": "user",
                        "content": tool_results
                    })

                    # Continue the loop to get Claude's response
                    continue

                # Got a final text response
                assistant_message = response.content[0].text
                self.conversation_history.append({
                    "role": "assistant",
                    "content": assistant_message
                })

                return assistant_message

            except anthropic.RateLimitError:
                import time
                time.sleep(5)
                continue
            except anthropic.APIError as e:
                return f"API Error: {e.message}"

    def clear_history(self):
        """Clear conversation history."""
        self.conversation_history = []`
        },
        {
          id: 'api10-4',
          type: 'code',
          title: 'Using the Document Q&A System',
          language: 'python',
          content: `# Create the Q&A system
qa = DocumentQA()

# Add some documents
qa.add_document(
    "doc1",
    """Python is a high-level programming language known for its simplicity
    and readability. It was created by Guido van Rossum and first released
    in 1991. Python supports multiple programming paradigms including
    procedural, object-oriented, and functional programming.""",
    {"topic": "programming", "language": "english"}
)

qa.add_document(
    "doc2",
    """Machine learning is a subset of artificial intelligence that enables
    systems to learn and improve from experience without being explicitly
    programmed. Common ML frameworks include TensorFlow, PyTorch, and
    scikit-learn.""",
    {"topic": "AI", "language": "english"}
)

# Have a conversation
print("User: What can you tell me about Python?")
print("Assistant:", qa.chat("What can you tell me about Python?"))

print("\\nUser: What about machine learning?")
print("Assistant:", qa.chat("What about machine learning?"))

print("\\nUser: How do they relate to each other?")
print("Assistant:", qa.chat("How do they relate to each other?"))`
        },
        {
          id: 'api10-5',
          type: 'code',
          title: 'Streaming Version - TypeScript',
          language: 'typescript',
          content: `import Anthropic from '@anthropic-ai/sdk';

interface Document {
  content: string;
  metadata: Record<string, string>;
}

class StreamingDocumentQA {
  private client: Anthropic;
  private documents: Map<string, Document> = new Map();
  private history: Anthropic.MessageParam[] = [];

  private tools: Anthropic.Tool[] = [
    {
      name: "search_documents",
      description: "Search documents for relevant information",
      input_schema: {
        type: "object",
        properties: {
          query: { type: "string", description: "Search query" }
        },
        required: ["query"]
      }
    }
  ];

  constructor() {
    this.client = new Anthropic();
  }

  addDocument(id: string, content: string, metadata: Record<string, string> = {}) {
    this.documents.set(id, { content, metadata });
  }

  async *streamChat(userMessage: string): AsyncGenerator<string> {
    this.history.push({ role: "user", content: userMessage });

    const stream = this.client.messages.stream({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2048,
      system: "You are a helpful document assistant.",
      tools: this.tools,
      messages: this.history
    });

    let fullResponse = '';

    for await (const event of stream) {
      if (event.type === 'content_block_delta' &&
          event.delta.type === 'text_delta') {
        fullResponse += event.delta.text;
        yield event.delta.text;
      }
    }

    this.history.push({ role: "assistant", content: fullResponse });
  }
}

// Usage with streaming output
async function main() {
  const qa = new StreamingDocumentQA();
  qa.addDocument("doc1", "TypeScript is a typed superset of JavaScript...");

  console.log("Streaming response:");
  for await (const chunk of qa.streamChat("Tell me about TypeScript")) {
    process.stdout.write(chunk);
  }
  console.log();
}

main();`
        },
        {
          id: 'api10-6',
          type: 'tip',
          title: 'Production Enhancements',
          content: 'For production: add vector search (Pinecone, Weaviate), implement caching, add authentication, use a database for conversation storage, add logging and monitoring, and deploy behind a load balancer.'
        },
        {
          id: 'api10-7',
          type: 'text',
          title: 'Next Steps',
          content: `<p>Congratulations on completing the Anthropic API track! Here's where to go next:</p>
<ul>
  <li>Explore the <a href="https://docs.anthropic.com" target="_blank">Anthropic Documentation</a></li>
  <li>Join the <a href="https://discord.gg/anthropic" target="_blank">Anthropic Discord</a></li>
  <li>Check out the <a href="https://github.com/anthropics/anthropic-cookbook" target="_blank">Anthropic Cookbook</a> for more examples</li>
  <li>Build your own AI-powered applications!</li>
</ul>`
        }
      ],
      exercise: {
        type: 'prompt',
        instructions: 'Design an AI-powered application using the Anthropic API. Describe: 1) What the application does, 2) Which API features it uses (tool use, streaming, vision, etc.), 3) How you would handle errors and rate limits, 4) What the user experience would be like.',
        hints: [
          'Think about a real problem you could solve with Claude',
          'Consider which features would make the best user experience',
          'Plan for production concerns like reliability and cost'
        ],
        validationCriteria: [
          'Describes a clear application purpose',
          'Identifies specific API features to use',
          'Includes error handling strategy',
          'Considers user experience'
        ]
      }
    } as LevelContent
  }
];
