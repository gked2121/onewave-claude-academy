// Code Validator - Automatically checks if user's code meets level requirements

interface ValidationResult {
  passed: boolean;
  score: number; // 0-100
  feedback: {
    type: 'success' | 'warning' | 'error' | 'info';
    message: string;
    suggestion?: string;
  }[];
  completionStatus: 'not-started' | 'in-progress' | 'completed' | 'excellent';
}

export function validateCode(level: number, html: string, css?: string, js?: string): ValidationResult {
  const feedback: ValidationResult['feedback'] = [];
  let score = 0;
  const maxScore = 100;

  // Level-specific validation
  switch (level) {
    case 1:
      return validateLevel1(html, css, feedback);
    case 2:
      return validateLevel2(html, css, js, feedback);
    case 6:
      return validateTaskManager(html, css, js, feedback);
    default:
      return validateGeneral(html, css, js, feedback);
  }
}

function validateLevel1(html: string, css: string = '', feedback: ValidationResult['feedback']): ValidationResult {
  let score = 0;

  // Check HTML structure (40 points)
  if (html.includes('<!DOCTYPE html>')) {
    score += 10;
    feedback.push({
      type: 'success',
      message: 'Great! You have a proper HTML document declaration'
    });
  } else {
    feedback.push({
      type: 'warning',
      message: 'Missing DOCTYPE declaration',
      suggestion: 'Add <!DOCTYPE html> at the very top of your file'
    });
  }

  if (html.includes('<html') && html.includes('</html>')) {
    score += 10;
  } else {
    feedback.push({
      type: 'error',
      message: 'Missing HTML tags',
      suggestion: 'Wrap your content in <html> and </html> tags'
    });
  }

  if (html.includes('<head') && html.includes('</head>')) {
    score += 10;
  } else {
    feedback.push({
      type: 'error',
      message: 'Missing HEAD section',
      suggestion: 'Add <head></head> tags for page metadata'
    });
  }

  if (html.includes('<body') && html.includes('</body>')) {
    score += 10;
    feedback.push({
      type: 'success',
      message: 'Perfect! Your HTML has proper structure'
    });
  } else {
    feedback.push({
      type: 'error',
      message: 'Missing BODY tags',
      suggestion: 'Put your visible content inside <body></body> tags'
    });
  }

  // Check for personal content (30 points)
  const hasHeading = /(<h[1-6])/i.test(html);
  if (hasHeading) {
    score += 15;
    feedback.push({
      type: 'success',
      message: 'Nice! You have headings to organize your content'
    });
  } else {
    feedback.push({
      type: 'info',
      message: 'Consider adding headings (h1, h2, etc.) to organize your content'
    });
  }

  const hasPersonalContent = !html.includes('Lorem ipsum') &&
                           !html.includes('Sample text') &&
                           html.length > 500;
  if (hasPersonalContent) {
    score += 15;
    feedback.push({
      type: 'success',
      message: 'Excellent! You made this page personal with your own content'
    });
  } else {
    feedback.push({
      type: 'warning',
      message: 'Make it personal!',
      suggestion: 'Replace sample text with information about yourself'
    });
  }

  // Check for styling (30 points)
  const hasInlineStyles = html.includes('style=');
  const hasStyleTag = html.includes('<style>') || css.length > 0;

  if (hasStyleTag || hasInlineStyles) {
    score += 20;
    feedback.push({
      type: 'success',
      message: 'Great! You added styling to make your page look awesome'
    });
  } else {
    feedback.push({
      type: 'info',
      message: 'Add some colors and styling to make your page pop!',
      suggestion: 'Try asking AI: "Make the background blue and center the text"'
    });
  }

  // Check for basic interactivity hints
  if (html.includes('background') && !html.includes('white')) {
    score += 10;
    feedback.push({
      type: 'success',
      message: 'Nice color choices! Your page stands out'
    });
  }

  // Determine completion status
  let completionStatus: ValidationResult['completionStatus'] = 'not-started';
  if (score >= 90) completionStatus = 'excellent';
  else if (score >= 70) completionStatus = 'completed';
  else if (score >= 30) completionStatus = 'in-progress';

  return {
    passed: score >= 70,
    score,
    feedback,
    completionStatus
  };
}

function validateLevel2(html: string, css: string = '', js: string = '', feedback: ValidationResult['feedback']): ValidationResult {
  let score = 0;

  // First check Level 1 requirements (50 points)
  const level1Result = validateLevel1(html, css, []);
  score += Math.floor(level1Result.score * 0.5);

  // Check for interactive elements (30 points)
  const hasButton = html.includes('<button');
  const hasInput = html.includes('<input');
  const hasInteractiveElements = hasButton || hasInput;

  if (hasInteractiveElements) {
    score += 15;
    feedback.push({
      type: 'success',
      message: 'Awesome! You added interactive elements'
    });
  } else {
    feedback.push({
      type: 'error',
      message: 'Missing interactive elements',
      suggestion: 'Add buttons or input fields that users can interact with'
    });
  }

  // Check for JavaScript (20 points)
  const hasJavaScript = js.length > 0 || html.includes('<script>') || html.includes('onclick=');

  if (hasJavaScript) {
    score += 20;
    feedback.push({
      type: 'success',
      message: 'Excellent! You added JavaScript functionality'
    });

    // Check for functions
    if (js.includes('function') || html.includes('function')) {
      feedback.push({
        type: 'success',
        message: 'Great! You\'re using JavaScript functions like a pro'
      });
    }
  } else {
    feedback.push({
      type: 'warning',
      message: 'Add some JavaScript to make things happen when users click',
      suggestion: 'Try asking AI: "Add a button that changes the page when clicked"'
    });
  }

  // Advanced checks for Level 2
  const hasDynamicContent = js.includes('innerHTML') || js.includes('textContent') ||
                           html.includes('getElementById') || html.includes('querySelector');

  if (hasDynamicContent) {
    score += 10;
    feedback.push({
      type: 'success',
      message: 'Amazing! You\'re dynamically updating the page content'
    });
  }

  const hasEventListeners = js.includes('addEventListener') || html.includes('onclick');
  if (hasEventListeners) {
    score += 10;
    feedback.push({
      type: 'success',
      message: 'Perfect! Your page responds to user interactions'
    });
  }

  // Determine completion status
  let completionStatus: ValidationResult['completionStatus'] = 'not-started';
  if (score >= 90) completionStatus = 'excellent';
  else if (score >= 70) completionStatus = 'completed';
  else if (score >= 40) completionStatus = 'in-progress';

  return {
    passed: score >= 70,
    score,
    feedback,
    completionStatus
  };
}

function validateTaskManager(html: string, css: string = '', js: string = '', feedback: ValidationResult['feedback']): ValidationResult {
  let score = 0;

  // Check for task management functionality
  const hasTaskInput = html.includes('input') && (html.includes('task') || html.includes('todo'));
  const hasTaskList = html.includes('ul') || html.includes('ol') || html.includes('div');
  const hasAddFunction = js.includes('add') || js.includes('create') || js.includes('push');
  const hasDeleteFunction = js.includes('delete') || js.includes('remove') || js.includes('splice');

  if (hasTaskInput) {
    score += 20;
    feedback.push({
      type: 'success',
      message: 'Great! You have an input field for adding tasks'
    });
  }

  if (hasTaskList) {
    score += 20;
    feedback.push({
      type: 'success',
      message: 'Perfect! You have a place to display tasks'
    });
  }

  if (hasAddFunction) {
    score += 25;
    feedback.push({
      type: 'success',
      message: 'Excellent! Users can add new tasks'
    });
  } else {
    feedback.push({
      type: 'error',
      message: 'Missing add task functionality',
      suggestion: 'Ask AI: "Add a function to create new tasks when the user clicks Add"'
    });
  }

  if (hasDeleteFunction) {
    score += 25;
    feedback.push({
      type: 'success',
      message: 'Amazing! Users can remove completed tasks'
    });
  } else {
    feedback.push({
      type: 'warning',
      message: 'Consider adding delete functionality',
      suggestion: 'Ask AI: "Add delete buttons so users can remove tasks"'
    });
  }

  // Check for data persistence
  if (js.includes('localStorage')) {
    score += 10;
    feedback.push({
      type: 'success',
      message: 'Outstanding! Tasks persist between browser sessions'
    });
  } else {
    feedback.push({
      type: 'info',
      message: 'Pro tip: Add localStorage to save tasks between sessions'
    });
  }

  let completionStatus: ValidationResult['completionStatus'] = 'not-started';
  if (score >= 90) completionStatus = 'excellent';
  else if (score >= 70) completionStatus = 'completed';
  else if (score >= 40) completionStatus = 'in-progress';

  return {
    passed: score >= 70,
    score,
    feedback,
    completionStatus
  };
}

function validateGeneral(html: string, css: string = '', js: string = '', feedback: ValidationResult['feedback']): ValidationResult {
  let score = 50; // Base score for any attempt

  if (html.length > 100) {
    score += 25;
    feedback.push({
      type: 'success',
      message: 'You\'re making good progress!'
    });
  }

  if (css.length > 0 || html.includes('<style>')) {
    score += 15;
    feedback.push({
      type: 'success',
      message: 'Nice styling work!'
    });
  }

  if (js.length > 0 || html.includes('<script>')) {
    score += 10;
    feedback.push({
      type: 'success',
      message: 'Great job adding interactivity!'
    });
  }

  return {
    passed: score >= 60,
    score,
    feedback,
    completionStatus: score >= 70 ? 'completed' : 'in-progress'
  };
}

// Helper function to extract CSS and JS from HTML
export function extractCodeFromHTML(html: string) {
  const styleMatch = html.match(/<style[^>]*>([\s\S]*?)<\/style>/);
  const scriptMatch = html.match(/<script[^>]*>([\s\S]*?)<\/script>/);

  return {
    css: styleMatch ? styleMatch[1] : '',
    js: scriptMatch ? scriptMatch[1] : ''
  };
}