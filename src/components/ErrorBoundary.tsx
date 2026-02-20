"use client";

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);

    // In production, you might want to send this to an error reporting service
    // Example: logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return <ErrorFallback error={this.state.error} onRetry={() => this.setState({ hasError: false })} />;
    }

    return this.props.children;
  }
}

interface ErrorFallbackProps {
  error?: Error;
  onRetry: () => void;
}

function ErrorFallback({ error, onRetry }: ErrorFallbackProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="glass rounded-2xl p-8 w-full max-w-lg text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-red-400" />
        </div>

        <h1 className="text-2xl font-bold mb-4 text-slate-800">Oops! Something went wrong</h1>

        <p className="text-slate-600 mb-6">
          Don't worry, even the best coders encounter bugs. Let's get you back on track!
        </p>

        {process.env.NODE_ENV === 'development' && error && (
          <details className="mb-6 text-left">
            <summary className="cursor-pointer text-sm text-slate-500 hover:text-slate-700 mb-2">
              Error Details (Development Mode)
            </summary>
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg overflow-auto max-h-40">
              <pre className="text-xs text-red-700 whitespace-pre-wrap">
                {error.name}: {error.message}
                {error.stack && '\n\n' + error.stack}
              </pre>
            </div>
          </details>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onRetry}
            className="btn-primary flex items-center gap-2 justify-center"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>

          <Link href="/" className="btn-secondary flex items-center gap-2 justify-center">
            <Home className="w-4 h-4" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

// Specialized error boundaries for different parts of the app
export function LayoutErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        console.error('Layout Error:', error, errorInfo);
        // Could send to analytics service
      }}
    >
      {children}
    </ErrorBoundary>
  );
}

export function ComponentErrorBoundary({
  children,
  fallback
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  return (
    <ErrorBoundary
      fallback={fallback || <ComponentErrorFallback />}
    >
      {children}
    </ErrorBoundary>
  );
}

function ComponentErrorFallback() {
  return (
    <div className="glass rounded-lg p-6 text-center">
      <AlertTriangle className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
      <p className="text-slate-600 text-sm">
        This component encountered an error. Please refresh the page.
      </p>
    </div>
  );
}

export default ErrorBoundary;