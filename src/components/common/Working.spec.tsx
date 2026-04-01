import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Working } from './Working';

describe('Working', () => {
  it('should show reading', () => {
    render(<Working isReading={true} />);
    expect(screen.getByText('reading')).toBeTruthy();
  });

  it('should show submitting', () => {
    render(<Working isSubmitting={true} />);
    expect(screen.getByText('submitting')).toBeTruthy();
  });

  it('should show submitting too', () => {
    render(<Working isReading={true} isSubmitting={true} />);
    expect(screen.getByText('submitting')).toBeTruthy();
  });
});
