import { describe, it, expect, vi } from 'vitest';
import { createRenderer, ShallowRenderer } from 'react-test-renderer/shallow';
import { MainLayout } from './MainLayout';

vi.mock('../../hooks/UseNotifier', () => ({ useNotifier: vi.fn() }));

describe('MainLayout', () => {
  it('should equal saved snapshot', () => {
    const renderer: ShallowRenderer = createRenderer();
    renderer.render(<MainLayout />);
    const tree = renderer.getRenderOutput();
    expect(tree).toMatchSnapshot();
  });
});
