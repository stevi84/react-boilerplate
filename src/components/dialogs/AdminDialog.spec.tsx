import { describe, it, expect, vi } from 'vitest';
import { AdminDialog } from './AdminDialog';
import { currentUserAdmin } from '../../test/data/CurrentUser';
import { renderWithProviders } from '../../test/Utils';
import { RootState } from '../../reducers/Store';
import { todo1 } from '../../test/data/Todo';
import { user1 } from '../../test/data/User';

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

vi.mock('../../thunks/CurrentUserThunks', () => ({
  readCurrentUser: () => ({ type: 'readCurrentUser' }),
}));

const initialState: Partial<RootState> = {
  todos: [todo1],
  users: [user1],
  apiCalls: { runningReads: 0, runningSubmits: 0 },
  currentUser: currentUserAdmin,
};

describe('AdminDialog', () => {
  it('should equal saved snapshot', () => {
    const tree = renderWithProviders(<AdminDialog />, { preloadedState: initialState }).asFragment();
    expect(tree).toMatchSnapshot();
  });
});
