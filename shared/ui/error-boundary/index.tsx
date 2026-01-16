"use client";

import React, { ReactNode } from "react";
import { RiAlertLine, RiRefreshLine } from "react-icons/ri";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gray-900">
          <div className="max-w-md text-center space-y-6">
            <div className="flex justify-center">
              <RiAlertLine className="w-16 h-16 text-red-500" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Something went wrong</h1>
              <p className="text-gray-400">
                An unexpected error occurred. Please try refreshing the page.
              </p>
            </div>
            {this.state.error && (
              <div className="p-4 rounded-lg bg-red-900/20 border border-red-800/50 text-left">
                <p className="text-xs text-gray-400 mb-2 font-mono">
                  Error Details:
                </p>
                <p className="text-xs text-red-400 font-mono break-words">
                  {this.state.error.message}
                </p>
              </div>
            )}
            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              <RiRefreshLine className="w-4 h-4" />
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
