import React from 'react';

export function parseMarkdown(text: string): React.JSX.Element {
  // Convert markdown to JSX elements
  const lines = text.split('\n');

  return (
    <div>
      {lines.map((line, index) => {
        // Handle empty lines
        if (line.trim() === '') {
          return <br key={index} />;
        }

        // Handle headers (## Header)
        if (line.startsWith('## ')) {
          return (
            <h2 key={index} className="text-lg font-semibold text-white mb-3 mt-4 first:mt-0 flex items-center gap-2">
              {parseInlineMarkdown(line.slice(3))}
            </h2>
          );
        }

        // Handle headers (# Header)
        if (line.startsWith('# ')) {
          return (
            <h1 key={index} className="text-xl font-bold text-white mb-3 mt-4 first:mt-0">
              {parseInlineMarkdown(line.slice(2))}
            </h1>
          );
        }

        // Handle numbered lists (1. Item)
        if (line.match(/^\d+\.\s/)) {
          return (
            <div key={index} className="flex items-start gap-2 mb-2">
              <span className="text-primary font-medium flex-shrink-0">{line.match(/^\d+\./)?.[0]}</span>
              <span>{parseInlineMarkdown(line.replace(/^\d+\.\s/, ''))}</span>
            </div>
          );
        }

        // Handle bullet points
        if (line.startsWith('• ')) {
          return (
            <div key={index} className="flex items-start gap-2 mb-1">
              <span className="text-primary mt-1">•</span>
              <span>{parseInlineMarkdown(line.slice(2))}</span>
            </div>
          );
        }

        // Regular paragraph
        return (
          <p key={index} className="mb-2">
            {parseInlineMarkdown(line)}
          </p>
        );
      })}
    </div>
  );
}

function parseInlineMarkdown(text: string): React.JSX.Element[] {
  const parts: React.JSX.Element[] = [];
  let currentIndex = 0;
  let partIndex = 0;

  // Combined pattern to find all **bold** and *italic* patterns
  const markdownPattern = /(\*\*(.*?)\*\*|\*(.*?)\*)/g;
  let match;

  while ((match = markdownPattern.exec(text)) !== null) {
    // Add text before the marked part
    if (match.index > currentIndex) {
      parts.push(
        <span key={partIndex++}>
          {text.slice(currentIndex, match.index)}
        </span>
      );
    }

    // Check if it's bold (**text**) or italic (*text*)
    if (match[0].startsWith('**') && match[0].endsWith('**')) {
      // Bold text
      parts.push(
        <strong key={partIndex++} className="font-bold text-white">
          {match[2]}
        </strong>
      );
    } else if (match[0].startsWith('*') && match[0].endsWith('*') && !match[0].startsWith('**')) {
      // Italic text
      parts.push(
        <em key={partIndex++} className="italic text-gray-300">
          {match[3]}
        </em>
      );
    }

    currentIndex = match.index + match[0].length;
  }

  // Add any remaining text
  if (currentIndex < text.length) {
    parts.push(
      <span key={partIndex++}>
        {text.slice(currentIndex)}
      </span>
    );
  }

  return parts.length > 0 ? parts : [<span key={0}>{text}</span>];
}