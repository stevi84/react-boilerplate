import { Component, ErrorInfo, PropsWithChildren } from 'react';
import { createErrorLog } from '../../apis/ErrorApi';

interface ErrorBoundaryProps extends PropsWithChildren {}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    createErrorLog({ error, errorInfo });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    return hasError ? <div>Error occurred!</div> : children;
  }
}
