import { describe, it, expect, vi } from 'vitest';
import { ShallowRenderer, createRenderer } from 'react-test-renderer/shallow';
import { render } from '@testing-library/react';
import { todo1 } from '../../../test/data/Todo';
import { TodoDialog } from './TodoDialog';

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

const { useAppSelectorMock, dispatchMock } = vi.hoisted(() => ({
  useAppSelectorMock: vi.fn(),
  dispatchMock: vi.fn(),
}));
vi.mock('../../reducers/Store', () => ({
  useAppSelector: useAppSelectorMock,
  useAppDispatch: () => dispatchMock,
}));

describe('TodoDialog', () => {
  it('should equal saved snapshot', () => {
    useAppSelectorMock.mockReturnValueOnce([todo1]).mockReturnValue(false);
    const renderer: ShallowRenderer = createRenderer();
    renderer.render(<TodoDialog />);
    const tree = renderer.getRenderOutput();
    expect(tree).toMatchSnapshot();
  });

  it('should load todos if not present', () => {
    useAppSelectorMock.mockReturnValueOnce([]).mockReturnValue(false);
    expect(dispatchMock.mock.calls.length).toEqual(0);
    render(<TodoDialog />);
    expect(dispatchMock.mock.calls.length).toEqual(1);
    //expect(dispatchMock.mock.calls[0][0]).toEqual(readTodos('de'));
  });
});
