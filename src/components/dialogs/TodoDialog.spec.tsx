import { describe, it, expect, vi, beforeEach } from 'vitest';
import { todo1 } from '../../test/data/Todo';
import { TodoDialog } from './TodoDialog';
import { currentUserEditor } from '../../test/data/CurrentUser';
import { renderWithProviders } from '../../test/Utils';
import { user1 } from '../../test/data/User';
import { RootState } from '../../reducers/Store';

const { readTodosMock } = vi.hoisted(() => ({ readTodosMock: vi.fn() }));
vi.mock('../../thunks/TodosThunks', () => ({
  readTodos: readTodosMock,
  deleteTodo: () => ({ type: 'deleteTodo' }),
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

describe('TodoDialog', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    readTodosMock.mockReturnValue({ type: 'readTodos' });
  });

  it('should load todos if not present', () => {
    renderWithProviders(<TodoDialog />, { preloadedState: { ...initialState, todos: [] } });
    expect(readTodosMock.mock.calls.length).toEqual(1);
  });
});
