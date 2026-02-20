// Pitfall Detection System - Identifies common mistakes and provides proactive guidance

export interface PitfallWarning {
  type: 'critical' | 'warning' | 'tip';
  title: string;
  description: string;
  solution: string;
  learnMore?: string;
}

export function detectPitfalls(level: number, code: string): PitfallWarning[] {
  const warnings: PitfallWarning[] = [];
  const lowerCode = code.toLowerCase();

  // Level 0: Terminal and Setup pitfalls
  if (level === 0) {
    if (code.includes('cd ') && code.includes('..')) {
      warnings.push({
        type: 'tip',
        title: 'Terminal Navigation',
        description: 'You\'re navigating directories - great! Using cd .. goes up one folder.',
        solution: 'Use pwd to see where you are and ls to see what\'s in the current folder.',
        learnMore: 'cd stands for "change directory" - think of it like clicking folders'
      });
    }

    if (code.includes('sudo') && !code.includes('brew install')) {
      warnings.push({
        type: 'warning',
        title: 'Be Careful with sudo',
        description: 'sudo gives admin privileges - only use it when necessary.',
        solution: 'Most development tasks don\'t need sudo. Try the command without it first.',
        learnMore: 'sudo = "Super User DO" - it\'s like "Run as Administrator" on Windows'
      });
    }
  }

  // Level 1: HTML and webpage pitfalls
  if (level === 1) {
    if (!lowerCode.includes('<!doctype html>')) {
      warnings.push({
        type: 'warning',
        title: 'Missing DOCTYPE',
        description: 'Your HTML should start with <!DOCTYPE html> to ensure proper rendering.',
        solution: 'Add <!DOCTYPE html> as the very first line of your HTML file.',
        learnMore: 'DOCTYPE tells the browser what version of HTML you\'re using'
      });
    }

    if (lowerCode.includes('<title>') && (lowerCode.includes('document') || lowerCode.includes('untitled'))) {
      warnings.push({
        type: 'tip',
        title: 'Make Your Title Personal',
        description: 'I see a generic title - make it about you!',
        solution: 'Change the title to something like "My First Webpage" or "About [Your Name]"',
        learnMore: 'The title appears in the browser tab and is important for bookmarks'
      });
    }

    if (lowerCode.includes('lorem ipsum') || lowerCode.includes('sample text')) {
      warnings.push({
        type: 'tip',
        title: 'Replace Placeholder Text',
        description: 'Placeholder text is great for testing, but make this page about you!',
        solution: 'Replace Lorem Ipsum with real content about yourself, your interests, or your projects.',
        learnMore: 'Personal content makes your webpage more engaging and meaningful'
      });
    }

    if (!lowerCode.includes('<style>') && !lowerCode.includes('style=')) {
      warnings.push({
        type: 'tip',
        title: 'Add Some Styling',
        description: 'Your webpage works, but styling will make it shine!',
        solution: 'Add <style> tags in the <head> section and try: body { background-color: lightblue; }',
        learnMore: 'CSS (Cascading Style Sheets) controls how your webpage looks'
      });
    }
  }

  // Level 2: JavaScript and interactivity pitfalls
  if (level === 2) {
    if (lowerCode.includes('<button') && !lowerCode.includes('onclick') && !lowerCode.includes('addeventlistener')) {
      warnings.push({
        type: 'warning',
        title: 'Button Without Function',
        description: 'I see a button but it doesn\'t seem to do anything when clicked.',
        solution: 'Add onclick="functionName()" to your button or use addEventListener in JavaScript.',
        learnMore: 'Buttons need JavaScript functions to make them interactive'
      });
    }

    if (lowerCode.includes('function') && !lowerCode.includes('document.') && !lowerCode.includes('alert') && !lowerCode.includes('console.log')) {
      warnings.push({
        type: 'tip',
        title: 'Test Your Functions',
        description: 'Great job writing functions! Make sure they actually do something visible.',
        solution: 'Add console.log("Function working!") inside your function to test it.',
        learnMore: 'Use console.log() for debugging - check browser Developer Tools (F12)'
      });
    }

    if (lowerCode.includes('getelementbyid') && lowerCode.includes('"') && !lowerCode.includes('id=')) {
      warnings.push({
        type: 'warning',
        title: 'ID Mismatch Possible',
        description: 'You\'re using getElementById but I don\'t see matching id attributes in HTML.',
        solution: 'Make sure your HTML elements have id="someName" and JavaScript uses getElementById("someName")',
        learnMore: 'IDs connect your HTML elements to your JavaScript - they must match exactly'
      });
    }
  }

  // Level 6: Task Manager pitfalls
  if (level === 6) {
    if (lowerCode.includes('todo') || lowerCode.includes('task')) {
      if (!lowerCode.includes('localstorage')) {
        warnings.push({
          type: 'tip',
          title: 'Save User Data',
          description: 'Consider adding localStorage to save tasks between browser sessions.',
          solution: 'Use localStorage.setItem("tasks", JSON.stringify(taskArray)) to save data.',
          learnMore: 'localStorage keeps data even when users refresh the page'
        });
      }

      if (!lowerCode.includes('array') && !lowerCode.includes('[]')) {
        warnings.push({
          type: 'tip',
          title: 'Use Arrays for Lists',
          description: 'For managing multiple tasks, arrays are your best friend.',
          solution: 'Create let tasks = [] to store your task list.',
          learnMore: 'Arrays let you add, remove, and iterate through multiple items easily'
        });
      }
    }
  }

  // General pitfalls across all levels
  if (lowerCode.includes('var ') && !lowerCode.includes('let ') && !lowerCode.includes('const ')) {
    warnings.push({
      type: 'tip',
      title: 'Modern JavaScript',
      description: 'Consider using let or const instead of var for better code practices.',
      solution: 'Replace var with let (for variables that change) or const (for constants).',
      learnMore: 'let and const have better scoping rules and prevent common bugs'
    });
  }

  if (code.includes('</') && !code.includes('</' + code.match(/<(\w+)/)?.[1])) {
    warnings.push({
      type: 'warning',
      title: 'Check Your Closing Tags',
      description: 'Make sure all HTML tags are properly closed.',
      solution: 'Every <tag> needs a matching </tag>. Check for typos in tag names.',
      learnMore: 'Unclosed tags can break your webpage layout'
    });
  }

  return warnings;
}

// Helper function to get level-specific pitfall guidance
export function getLevelPitfallGuidance(level: number): string[] {
  const guidance: Record<number, string[]> = {
    0: [
      "Don't be afraid of the terminal - it's just another way to talk to your computer",
      "Use pwd to see where you are, ls to see what's there",
      "Spaces in commands matter - 'cd folder' not 'cdfolder'"
    ],
    1: [
      "Start with <!DOCTYPE html> - it tells the browser what you're writing",
      "Make it personal - replace sample text with information about you",
      "Test in a browser frequently to see your changes"
    ],
    2: [
      "JavaScript makes things happen when users interact",
      "Test your buttons by clicking them - do they do what you expect?",
      "Use console.log() to debug - open Developer Tools (F12) to see messages"
    ],
    6: [
      "Plan your data structure first - how will you store tasks?",
      "Start simple: add tasks, then add delete, then add editing",
      "Think about the user experience - what would be intuitive?"
    ]
  };

  return guidance[level] || [
    "Break complex problems into smaller steps",
    "Test frequently and iterate based on what you learn",
    "Don't hesitate to ask for help or look up examples"
  ];
}