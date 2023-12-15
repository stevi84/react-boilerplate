import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';

describe('ErrorBoundary', () => {
  const GoodComponent = () => <div>good</div>;
  const ErrorComponent = () => {
    throw new Error('test');
  };

  it('should render component if there is no error', () => {
    render(
      <ErrorBoundary>
        <GoodComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText('good')).toBeTruthy();
    expect(screen.queryByText('Error occurred!')).toBeFalsy();
  });

  it('should render error message if there is an error', () => {
    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );
    expect(screen.queryByText('good')).toBeFalsy();
    expect(screen.getByText('Error occurred!')).toBeTruthy();
  });
});
