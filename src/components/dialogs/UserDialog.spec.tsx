import { describe, it, expect, vi } from 'vitest';
import { user1 } from '../../test/data/User';
import { UserDialog } from './UserDialog';
import { currentUserEditor } from '../../test/data/CurrentUser';
import { renderWithProviders } from '../../test/Utils';
import { todo1 } from '../../test/data/Todo';
import { RootState } from '../../reducers/Store';

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

const { dispatchMock } = vi.hoisted(() => ({ dispatchMock: vi.fn() }));
vi.mock('../../reducers/Store', async () => {
  const mod = await vi.importActual<typeof import('../../reducers/Store')>('../../reducers/Store');
  return {
    ...mod,
    useAppDispatch: () => dispatchMock.mockImplementation(mod.useAppDispatch()),
  };
});

vi.mock('../../thunks/Usersthunks', () => ({
  readUsers: () => ({ type: 'readUsers' }),
  deleteUser: () => ({ type: 'deleteUser' }),
}));

vi.mock('../../thunks/CurrentUserThunks', () => ({
  readCurrentUser: () => ({ type: 'readCurrentUser' }),
}));

const initialState: Partial<RootState> = {
  todos: [todo1],
  users: [user1],
  apiCalls: { runningReads: 0, runningSubmits: 0 },
  currentUser: currentUserEditor,
};

describe('UserDialog', () => {
  it('should equal saved snapshot', () => {
    const tree = renderWithProviders(<UserDialog />, { preloadedState: initialState }).asFragment();
    expect(tree).toMatchSnapshot();
  });

  it('should load users if not present', () => {
    expect(dispatchMock.mock.calls.length).toEqual(0);
    renderWithProviders(<UserDialog />, { preloadedState: { ...initialState, users: [] } });
    expect(dispatchMock.mock.calls.length).toEqual(1);
    expect(dispatchMock.mock.calls[0][0]).toEqual({ type: 'readUsers' });
  });
});
