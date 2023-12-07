import { describe, it, expect, vi } from 'vitest';
import { createRenderer, ShallowRenderer } from 'react-test-renderer/shallow';
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
    const renderer: ShallowRenderer = createRenderer();
    renderer.render(<Working isReading={false} isSubmitting={true} />);
    const tree = renderer.getRenderOutput();
    expect(tree).toMatchSnapshot();
  });

  it('should show reading', () => {
    render(<Working isReading={true} isSubmitting={false} />);
    expect(screen.getByText('reading')).toBeTruthy();
  });

  it('should show submitting', () => {
    render(<Working isReading={false} isSubmitting={true} />);
    expect(screen.getByText('submitting')).toBeTruthy();
  });

  it('should show submitting too', () => {
    render(<Working isReading={true} isSubmitting={true} />);
    expect(screen.getByText('submitting')).toBeTruthy();
  });
});
