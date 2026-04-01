import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { Dashboard } from './Dashboard';
import { todo1 } from '../../test/data/Todo';
import { user1 } from '../../test/data/User';
import { currentUserAdmin, currentUserEditor } from '../../test/data/CurrentUser';
import { renderWithProviders } from '../../test/Utils';
import { RootState } from '../../reducers/Store';

const { readTodosMock } = vi.hoisted(() => ({ readTodosMock: vi.fn() }));
vi.mock('../../thunks/TodosThunks', () => ({
  readTodos: readTodosMock,
}));

const { readUsersMock } = vi.hoisted(() => ({ readUsersMock: vi.fn() }));
vi.mock('../../thunks/UsersThunks', () => ({
  readUsers: readUsersMock,
}));

vi.mock('../../thunks/CurrentUserThunks', () => ({
  readCurrentUser: () => ({ type: 'readCurrentUser' }),
}));

const initialState: Partial<RootState> = {
  todos: [todo1],
  users: [user1],
  apiCalls: { runningReads: 0, runningSubmits: 0 },
  currentUser: currentUserAdmin,
};

describe('Dashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    readTodosMock.mockReturnValue({ type: 'readTodos' });
    readUsersMock.mockReturnValue({ type: 'readUsers' });
  });

  it('should load todos if not present', () => {
    renderWithProviders(<Dashboard />, { preloadedState: { ...initialState, todos: [] } });
    expect(readTodosMock.mock.calls.length).toEqual(1);
  });

  it('should load users if not present', () => {
    renderWithProviders(<Dashboard />, { preloadedState: { ...initialState, users: [] } });
    expect(readUsersMock.mock.calls.length).toEqual(1);
  });

  it('should navigate to todos on button click', () => {
    const { getLocation } = renderWithProviders(<Dashboard />, { preloadedState: initialState });
    fireEvent.click(screen.getByTestId('EditNoteIcon'));
    expect(getLocation()).toEqual('/todos');
  });

  it('should navigate to users on button click', () => {
    const { getLocation } = renderWithProviders(<Dashboard />, { preloadedState: initialState });
    fireEvent.click(screen.getByTestId('PeopleIcon'));
    expect(getLocation()).toEqual('/users');
  });

  it('should navigate to settings on button click', () => {
    const { getLocation } = renderWithProviders(<Dashboard />, { preloadedState: initialState });
    fireEvent.click(screen.getByTestId('SettingsIcon'));
    expect(getLocation()).toEqual('/admin');
  });

  it('should show dashboard if not reading or submitting', () => {
    renderWithProviders(<Dashboard />, { preloadedState: initialState });
    expect(screen.getByText('todo')).toBeTruthy();
    expect(screen.queryByRole('progressbar')).toBeFalsy();
  });

  it('should show working if reading', () => {
    renderWithProviders(<Dashboard />, {
      preloadedState: { ...initialState, apiCalls: { runningReads: 1, runningSubmits: 0 } },
    });
    expect(screen.queryByText('todo')).toBeFalsy();
    expect(screen.getByRole('progressbar')).toBeTruthy();
  });

  it('should show working if submitting', () => {
    renderWithProviders(<Dashboard />, {
      preloadedState: { ...initialState, apiCalls: { runningReads: 0, runningSubmits: 1 } },
    });
    expect(screen.queryByText('todo')).toBeFalsy();
    expect(screen.getByRole('progressbar')).toBeTruthy();
  });

  it('should hide settings if not authorized', () => {
    renderWithProviders(<Dashboard />, {
      preloadedState: { ...initialState, currentUser: currentUserEditor },
    });
    expect(screen.queryByText('settings')).toBeFalsy();
  });
});
