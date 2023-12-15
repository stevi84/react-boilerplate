import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Working } from './Working';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
    i18n: {
      language: 'de',
      changeLanguage: vi.fn(),
    },
  }),
}));

describe('Working', () => {
  it('should equal saved snapshot', () => {
    const tree = render(<Working isReading={false} isSubmitting={true} />).asFragment();
    expect(tree).toMatchSnapshot();
  });

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
