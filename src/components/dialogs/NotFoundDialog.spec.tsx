import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { NotFoundDialog } from './NotFoundDialog';
import { currentUserEditor } from '../../test/data/CurrentUser';
import { getEmptyCurrentUser } from '../../models/CurrentUser';
import { renderWithProviders } from '../../test/Utils';
import { todo1 } from '../../test/data/Todo';
import { user1 } from '../../test/data/User';
import { RootState } from '../../reducers/Store';

vi.mock('../../thunks/CurrentUserThunks', () => ({
  readCurrentUser: () => ({ type: 'readCurrentUser' }),
}));

const initialState: Partial<RootState> = {
  todos: [todo1],
  users: [user1],
  apiCalls: { runningReads: 0, runningSubmits: 0 },
  currentUser: currentUserEditor,
};

describe('NotFoundDialog', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should show 404 content for an authenticated user', () => {
    renderWithProviders(<NotFoundDialog />, { preloadedState: initialState });
    expect(screen.getByRole('heading', { name: '404' })).toBeTruthy();
    expect(screen.getByText('Not Found')).toBeTruthy();
  });

  it('should show loading spinner when current user is not loaded yet', () => {
    renderWithProviders(<NotFoundDialog />, {
      preloadedState: { ...initialState, currentUser: getEmptyCurrentUser() },
    });
    expect(screen.getByTestId('loading-spinner')).toBeTruthy();
  });
});
