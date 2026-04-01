import { describe, it, expect, vi, beforeEach } from 'vitest';
import { user1 } from '../../test/data/User';
import { UserDialog } from './UserDialog';
import { currentUserEditor } from '../../test/data/CurrentUser';
import { renderWithProviders } from '../../test/Utils';
import { todo1 } from '../../test/data/Todo';
import { RootState } from '../../reducers/Store';

const { readUsersMock } = vi.hoisted(() => ({ readUsersMock: vi.fn() }));
vi.mock('../../thunks/UsersThunks', () => ({
  readUsers: readUsersMock,
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
  beforeEach(() => {
    vi.clearAllMocks();
    readUsersMock.mockReturnValue({ type: 'readUsers' });
  });

  it('should load users if not present', () => {
    renderWithProviders(<UserDialog />, { preloadedState: { ...initialState, users: [] } });
    expect(readUsersMock.mock.calls.length).toEqual(1);
  });
});
