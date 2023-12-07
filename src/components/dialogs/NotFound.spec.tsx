import { describe, it, expect, vi } from 'vitest';
import { ShallowRenderer, createRenderer } from 'react-test-renderer/shallow';
import { NotFound } from './NotFound';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
    i18n: {
      language: 'de',
      changeLanguage: vi.fn(),
    },
  }),
}));

vi.mock('react-router-dom', () => ({ useNavigate: () => vi.fn() }));

vi.mock('../../hooks/UseNotifier', () => ({ useNotifier: vi.fn() }));

describe('NotFound', () => {
  it('should equal saved snapshot', () => {
    const renderer: ShallowRenderer = createRenderer();
    renderer.render(<NotFound />);
    const tree = renderer.getRenderOutput();
    expect(tree).toMatchSnapshot();
  });
});
