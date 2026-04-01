import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { NotAuthorizedDialog } from './NotAuthorizedDialog';
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

describe('NotAuthorizedDialog', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should show 403 not authorized content for an authenticated user', () => {
    renderWithProviders(<NotAuthorizedDialog />, { preloadedState: initialState });
    expect(screen.getByRole('heading', { name: '403' })).toBeTruthy();
    expect(screen.getByText('Not Authorized')).toBeTruthy();
  });

  it('should show loading spinner when current user is not loaded yet', () => {
    renderWithProviders(<NotAuthorizedDialog />, {
      preloadedState: { ...initialState, currentUser: getEmptyCurrentUser() },
    });
    expect(screen.getByTestId('loading-spinner')).toBeTruthy();
  });
});
