import { UserProject, AiCliType, ProgressState } from '@/types';

export interface PersonalizedContent {
  title: string;
  description: string;
  codeExample: string;
  objectives: string[];
  tips: string[];
  nextSteps: string[];
}

export interface ContentTemplate {
  default: PersonalizedContent;
  portfolio?: PersonalizedContent;
  'recipe-app'?: PersonalizedContent;
  blog?: PersonalizedContent;
  'creative-showcase'?: PersonalizedContent;
  dashboard?: PersonalizedContent;
  'landing-page'?: PersonalizedContent;
  custom?: PersonalizedContent;
}

// Level content templates organized by level ID
const levelContentTemplates: Record<number, ContentTemplate> = {
  1: {
    default: {
      title: "Build Your First Web Page",
      description: "Create a beautiful, responsive web page using modern HTML and CSS with AI assistance.",
      codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Web Page</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
        .container { max-width: 800px; margin: 0 auto; }
        h1 { color: #333; text-align: center; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to My Website!</h1>
        <p>This is my first web page built with AI assistance.</p>
    </div>
</body>
</html>`,
      objectives: [
        "Understand HTML structure and semantic elements",
        "Apply CSS styling for visual presentation",
        "Use AI CLI to generate and modify code",
        "Preview your work in a web browser"
      ],
      tips: [
        "Ask your AI to explain any code you don't understand",
        "Experiment with different colors and fonts",
        "Use the browser's developer tools to inspect elements"
      ],
      nextSteps: [
        "Add more content sections",
        "Experiment with CSS animations",
        "Make your page mobile-responsive"
      ]
    },
    portfolio: {
      title: "Build Your Portfolio Homepage",
      description: "Create a professional portfolio homepage that showcases your skills and projects to potential employers or clients.",
      codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Name - Portfolio</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
        .hero { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white; text-align: center; padding: 100px 20px; }
        .hero h1 { font-size: 3rem; margin-bottom: 1rem; }
        .hero p { font-size: 1.2rem; max-width: 600px; margin: 0 auto; }
    </style>
</head>
<body>
    <section class="hero">
        <h1>Hi, I'm [Your Name]</h1>
        <p>I'm a developer passionate about creating amazing web experiences</p>
    </section>
</body>
</html>`,
      objectives: [
        "Create a compelling hero section with your personal brand",
        "Structure content to highlight your professional story",
        "Design with potential employers/clients in mind",
        "Use modern CSS techniques for visual appeal"
      ],
      tips: [
        "Keep your headline clear and professional",
        "Use high-quality photos if including images",
        "Make sure your contact information is easy to find"
      ],
      nextSteps: [
        "Add a projects showcase section",
        "Include testimonials or client feedback",
        "Optimize for search engines (SEO)"
      ]
    },
    'recipe-app': {
      title: "Build Your Recipe App Homepage",
      description: "Create an appetizing homepage for your recipe sharing application with mouth-watering visuals and intuitive navigation.",
      codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Delicious Recipes - Your Cooking Companion</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Georgia', serif; color: #2c3e50; }
        .hero { background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),
                url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600"><rect fill="%23e67e22" width="1000" height="600"/></svg>');
                background-size: cover; color: white; text-align: center; padding: 120px 20px; }
        .hero h1 { font-size: 3.5rem; margin-bottom: 1rem; text-shadow: 2px 2px 4px rgba(0,0,0,0.5); }
        .hero p { font-size: 1.3rem; max-width: 700px; margin: 0 auto; }
    </style>
</head>
<body>
    <section class="hero">
        <h1>Delicious Recipes</h1>
        <p>Discover, cook, and share amazing recipes from around the world</p>
    </section>
</body>
</html>`,
      objectives: [
        "Design an appetizing visual layout that makes users hungry",
        "Create clear navigation for browsing recipes",
        "Implement search functionality concepts",
        "Focus on food photography and visual appeal"
      ],
      tips: [
        "Use warm, food-related colors (oranges, reds, browns)",
        "Include high-quality food imagery",
        "Make recipe categories easily discoverable"
      ],
      nextSteps: [
        "Add recipe card components",
        "Implement search and filter features",
        "Create user rating and review system"
      ]
    },
    blog: {
      title: "Build Your Blog Homepage",
      description: "Create a clean, readable blog homepage that showcases your writing and engages your audience.",
      codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Blog - Thoughts & Ideas</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Georgia', serif; line-height: 1.8; color: #2c3e50; background: #fefefe; }
        .header { background: white; padding: 40px 20px; text-align: center;
                 border-bottom: 3px solid #3498db; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header h1 { font-size: 2.8rem; color: #2c3e50; margin-bottom: 0.5rem; }
        .header p { font-size: 1.1rem; color: #7f8c8d; font-style: italic; }
    </style>
</head>
<body>
    <header class="header">
        <h1>Your Blog Name</h1>
        <p>Sharing thoughts, ideas, and stories that matter</p>
    </header>
</body>
</html>`,
      objectives: [
        "Create a clean, readable typography system",
        "Design for content consumption and readability",
        "Implement blog post listing and navigation",
        "Focus on minimalism and user experience"
      ],
      tips: [
        "Prioritize readability with proper font sizes and line spacing",
        "Use plenty of white space",
        "Keep navigation simple and intuitive"
      ],
      nextSteps: [
        "Add blog post preview cards",
        "Implement categories and tags",
        "Create an about page and author bio"
      ]
    },
    'creative-showcase': {
      title: "Build Your Creative Portfolio",
      description: "Design a stunning visual portfolio that showcases your creative work and artistic vision.",
      codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Creative Portfolio</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Helvetica Neue', sans-serif; background: #000; color: white; }
        .hero { height: 100vh; display: flex; align-items: center; justify-content: center;
                background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);
                background-size: 400% 400%; animation: gradient 15s ease infinite; }
        @keyframes gradient { 0%,100% { background-position: 0% 50%; }
                              50% { background-position: 100% 50%; } }
        .hero-content { text-align: center; z-index: 2; }
        .hero h1 { font-size: 4rem; margin-bottom: 1rem; font-weight: 300; }
        .hero p { font-size: 1.5rem; opacity: 0.9; }
    </style>
</head>
<body>
    <section class="hero">
        <div class="hero-content">
            <h1>Creative Vision</h1>
            <p>Where art meets innovation</p>
        </div>
    </section>
</body>
</html>`,
      objectives: [
        "Create visually striking layouts that showcase creativity",
        "Implement smooth animations and transitions",
        "Design an immersive visual experience",
        "Focus on portfolio piece presentation"
      ],
      tips: [
        "Use bold colors and creative typography",
        "Implement smooth scroll and hover effects",
        "Make your work the hero of every page"
      ],
      nextSteps: [
        "Add portfolio gallery with lightbox",
        "Implement project detail pages",
        "Create interactive elements and animations"
      ]
    },
    dashboard: {
      title: "Build Your Dashboard Interface",
      description: "Create a clean, functional dashboard that displays data and metrics in an intuitive way.",
      codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Analytics Dashboard</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; background: #f7fafc; color: #2d3748; }
        .header { background: white; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .header h1 { font-size: 1.8rem; font-weight: 600; color: #1a202c; }
        .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 20px; padding: 20px; }
        .stat-card { background: white; padding: 24px; border-radius: 8px;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    </style>
</head>
<body>
    <header class="header">
        <h1>Analytics Dashboard</h1>
    </header>
    <div class="stats">
        <div class="stat-card">
            <h3>Total Users</h3>
            <p style="font-size: 2rem; font-weight: bold; color: #3182ce;">1,234</p>
        </div>
    </div>
</body>
</html>`,
      objectives: [
        "Design clear data visualization layouts",
        "Create responsive grid systems for metrics",
        "Implement clean, professional UI components",
        "Focus on data readability and user experience"
      ],
      tips: [
        "Use consistent spacing and grid systems",
        "Choose colors that help users interpret data quickly",
        "Keep interfaces clean and uncluttered"
      ],
      nextSteps: [
        "Add interactive charts and graphs",
        "Implement real-time data updates",
        "Create filtering and sorting features"
      ]
    },
    'landing-page': {
      title: "Build Your Landing Page",
      description: "Create a high-converting landing page that clearly communicates your value proposition and drives action.",
      codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Product - Solve Your Problem</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #2d3748; }
        .hero { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white; text-align: center; padding: 100px 20px; }
        .hero h1 { font-size: 3.5rem; margin-bottom: 1rem; font-weight: 700; }
        .hero p { font-size: 1.3rem; margin-bottom: 2rem; max-width: 600px; margin: 0 auto 2rem; }
        .cta-button { background: #ff6b6b; color: white; padding: 15px 40px;
                     border: none; border-radius: 50px; font-size: 1.1rem;
                     font-weight: 600; cursor: pointer; transition: transform 0.2s; }
        .cta-button:hover { transform: translateY(-2px); }
    </style>
</head>
<body>
    <section class="hero">
        <h1>Solve Your Biggest Problem</h1>
        <p>Our solution helps you achieve your goals faster and easier than ever before</p>
        <button class="cta-button">Get Started Today</button>
    </section>
</body>
</html>`,
      objectives: [
        "Create compelling headlines that grab attention",
        "Design clear call-to-action buttons and flows",
        "Structure content to build trust and credibility",
        "Optimize for conversion and user action"
      ],
      tips: [
        "Keep your value proposition clear and specific",
        "Use social proof and testimonials",
        "Make your call-to-action buttons stand out"
      ],
      nextSteps: [
        "Add customer testimonials section",
        "Implement A/B testing for headlines",
        "Create lead capture forms"
      ]
    }
  },
  2: {
    default: {
      title: "Add Interactive Features",
      description: "Enhance your web page with JavaScript to create dynamic, interactive user experiences.",
      codeExample: `// Add interactivity with JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('myButton');
    const counter = document.getElementById('counter');
    let count = 0;

    button.addEventListener('click', function() {
        count++;
        counter.textContent = count;

        // Add some visual feedback
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
    });
});`,
      objectives: [
        "Understand JavaScript event handling",
        "Manipulate DOM elements dynamically",
        "Create responsive user interactions",
        "Debug JavaScript in browser tools"
      ],
      tips: [
        "Start with simple click events before complex interactions",
        "Use console.log() to debug your code",
        "Test your interactions thoroughly"
      ],
      nextSteps: [
        "Add form validation",
        "Create smooth animations",
        "Implement local storage"
      ]
    },
    portfolio: {
      title: "Add Portfolio Interactions",
      description: "Make your portfolio interactive with smooth animations, project filters, and dynamic content loading.",
      codeExample: `// Portfolio project filtering
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter projects with smooth transition
            projects.forEach(project => {
                if (filter === 'all' || project.classList.contains(filter)) {
                    project.style.opacity = '0';
                    setTimeout(() => {
                        project.style.display = 'block';
                        project.style.opacity = '1';
                    }, 150);
                } else {
                    project.style.opacity = '0';
                    setTimeout(() => {
                        project.style.display = 'none';
                    }, 150);
                }
            });
        });
    });
});`,
      objectives: [
        "Create smooth project filtering system",
        "Add hover effects for project cards",
        "Implement modal windows for project details",
        "Create contact form with validation"
      ],
      tips: [
        "Use CSS transitions for smooth animations",
        "Optimize images for fast loading",
        "Test on different screen sizes"
      ],
      nextSteps: [
        "Add project detail modals",
        "Implement smooth scrolling navigation",
        "Create testimonials carousel"
      ]
    }
    // Add more templates for other project types...
  }
  // Add more levels...
};

// Character-specific content adjustments
export const getCharacterPersonalization = (character: number | null) => {
  switch(character) {
    case 1: // Business Builder
      return {
        focus: "business applications",
        tone: "entrepreneurial",
        examples: "MVP development, landing pages, lead capture",
        cliRecommendation: "claude",
        skillEmphasis: "rapid prototyping and validation"
      };
    case 2: // Tech Engineer
      return {
        focus: "technical excellence",
        tone: "professional",
        examples: "scalable applications, APIs, system architecture",
        cliRecommendation: "claude",
        skillEmphasis: "code quality and maintainability"
      };
    case 3: // Full-Stack Hybrid
      return {
        focus: "versatile development",
        tone: "balanced",
        examples: "full-stack applications, both prototypes and production",
        cliRecommendation: "codex",
        skillEmphasis: "adaptability and comprehensive skills"
      };
    default:
      return {
        focus: "web development",
        tone: "encouraging",
        examples: "modern web applications",
        cliRecommendation: "claude",
        skillEmphasis: "fundamental coding skills"
      };
  }
};

// AI CLI specific code examples and tips
export const getCliPersonalization = (selectedAiCli: AiCliType) => {
  switch(selectedAiCli) {
    case 'claude':
      return {
        cliCommand: "claude",
        examplePrompt: 'claude "refactor this component for better performance"',
        helpCommand: "claude --help",
        tips: [
          "Claude excels at code quality and best practices",
          "Ask it to review and improve your code",
          "Try: 'claude \"add TypeScript types to this component\"'"
        ]
      };
    case 'codex':
      return {
        cliCommand: "openai",
        examplePrompt: 'openai "implement user authentication with JWT"',
        helpCommand: "openai --help",
        tips: [
          "Codex is great for complex logic and algorithms",
          "Use it for both quick fixes and full implementations",
          "Try: 'openai \"optimize this database query\"'"
        ]
      };
    default:
      return {
        cliCommand: "ai-cli",
        examplePrompt: 'ai-cli "help me build this feature"',
        helpCommand: "ai-cli --help",
        tips: [
          "Describe what you want to build clearly",
          "Ask for explanations when you need them",
          "Break complex tasks into smaller steps"
        ]
      };
  }
};

// Main personalization function
export const personalizeContent = (
  levelId: number,
  project: UserProject | undefined,
  character: number | null,
  selectedAiCli: AiCliType
): PersonalizedContent => {
  const levelTemplates = levelContentTemplates[levelId];
  if (!levelTemplates) {
    return {
      title: `Level ${levelId}`,
      description: "Continue your coding journey with personalized challenges.",
      codeExample: "// Your personalized code example will appear here",
      objectives: ["Complete this level", "Learn new skills", "Build something awesome"],
      tips: ["Take your time", "Ask for help when needed", "Experiment and have fun"],
      nextSteps: ["Move to the next level", "Practice what you've learned", "Build more features"]
    };
  }

  // Get project-specific content if available
  const projectTemplate = project?.template && levelTemplates[project.template]
    ? levelTemplates[project.template]
    : levelTemplates.default;

  // Get character and CLI personalizations
  const characterPersonalization = getCharacterPersonalization(character);
  const cliPersonalization = getCliPersonalization(selectedAiCli);

  // Merge and personalize content
  const personalizedContent = { ...projectTemplate! };

  // Add CLI-specific tips
  personalizedContent.tips = [
    ...personalizedContent.tips,
    ...cliPersonalization.tips.slice(0, 2) // Add 2 CLI-specific tips
  ];

  // Add character-specific objectives if applicable
  if (character) {
    const characterObjective = `Apply ${characterPersonalization.skillEmphasis} to your project`;
    if (!personalizedContent.objectives.includes(characterObjective)) {
      personalizedContent.objectives.push(characterObjective);
    }
  }

  // Customize next steps based on project
  if (project) {
    personalizedContent.nextSteps = [
      `Continue building your ${project.name}`,
      `Add features from your project plan: ${project.features.slice(0, 2).join(', ')}`,
      ...personalizedContent.nextSteps.slice(0, 1) // Keep 1 original next step
    ];
  }

  return personalizedContent;
};

// Helper function to get project-specific encouragement
export const getProjectEncouragement = (project: UserProject | undefined): string => {
  if (!project) return "Keep building awesome things!";

  const projectTypes: Record<string, string> = {
    'portfolio': "Your portfolio is going to impress potential employers!",
    'recipe-app': "This recipe app is going to be delicious!",
    'blog': "Your blog will inspire so many readers!",
    'creative-showcase': "Your creative work deserves this amazing showcase!",
    'dashboard': "This dashboard will provide incredible insights!",
    'landing-page': "This landing page is going to convert like crazy!",
    'custom': `Building ${project.name} is going to be amazing!`
  };

  return project.template ? projectTypes[project.template] || projectTypes.custom : projectTypes.custom;
};