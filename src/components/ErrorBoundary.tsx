import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("App error:", error, info);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center p-8">
          <div className="max-w-lg bg-white border border-primary/20 rounded-lg p-8 shadow-lg">
            <h1 className="text-xl font-serif text-primary mb-4">
              Щось пішло не так
            </h1>
            <p className="text-primary/80 mb-4 font-mono text-sm break-all">
              {this.state.error.message}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90"
            >
              Перезавантажити
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
