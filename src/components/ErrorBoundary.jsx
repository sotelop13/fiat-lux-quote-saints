import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="fixed inset-0 flex flex-col items-center justify-center px-8 bg-background text-center">
          <span className="font-playfair text-4xl text-muted-foreground mb-4">✝</span>
          <h1 className="font-playfair text-2xl font-bold text-foreground mb-2">
            Something went wrong
          </h1>
          <p className="font-inter text-sm text-muted-foreground mb-6 max-w-xs">
            An unexpected error occurred. Your favorites and settings are safe.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="font-inter text-sm font-semibold text-gold hover:underline"
          >
            Reload app
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
