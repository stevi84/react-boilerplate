import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ShallowRenderer, createRenderer } from 'react-test-renderer/shallow';
import { render } from '@testing-library/react';
import { user1 } from '../../../test/data/User';
import { UserDialog } from './UserDialog';

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

// ist nötig bei Verwendung der generierten Api
const { readUsersMock } = vi.hoisted(() => ({ readUsersMock: vi.fn() }));
vi.mock('../../reducers/UsersReducer', () => ({
  deleteUser: vi.fn(),
  readUsers: readUsersMock,
  usersSelector: vi.fn(),
}));

describe('UserDialog', () => {
  beforeEach(() => {
    readUsersMock.mockReturnValue('readUsers');
  });

  it('should equal saved snapshot', () => {
    useAppSelectorMock.mockReturnValueOnce([user1]).mockReturnValue(false);
    const renderer: ShallowRenderer = createRenderer();
    renderer.render(<UserDialog />);
    const tree = renderer.getRenderOutput();
    expect(tree).toMatchSnapshot();
  });

  it('should load users if not present', () => {
    useAppSelectorMock.mockReturnValueOnce([]).mockReturnValue(false);
    expect(dispatchMock.mock.calls.length).toEqual(0);
    render(<UserDialog />);
    expect(dispatchMock.mock.calls.length).toEqual(1);
    expect(dispatchMock.mock.calls[0][0]).toEqual('readUsers');
  });
});
