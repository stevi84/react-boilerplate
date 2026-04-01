import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { AdminDialog } from './AdminDialog';
import { currentUserAdmin, currentUserEditor } from '../../test/data/CurrentUser';
import { getEmptyCurrentUser } from '../../models/CurrentUser';
import { renderWithProviders } from '../../test/Utils';
import { RootState } from '../../reducers/Store';
import { todo1 } from '../../test/data/Todo';
import { user1 } from '../../test/data/User';

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
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should show admin content when current user has ADMIN role', () => {
    renderWithProviders(<AdminDialog />, { preloadedState: initialState });
    expect(screen.getByText('This is some very secret dialog with admin functions.')).toBeTruthy();
  });

  it('should show NotAuthorized when current user does not have ADMIN role', () => {
    renderWithProviders(<AdminDialog />, {
      preloadedState: { ...initialState, currentUser: currentUserEditor },
    });
    expect(screen.getByText('Not Authorized')).toBeTruthy();
  });

  it('should show loading spinner when current user is not loaded yet', () => {
    renderWithProviders(<AdminDialog />, {
      preloadedState: { ...initialState, currentUser: getEmptyCurrentUser() },
    });
    expect(screen.getByTestId('loading-spinner')).toBeTruthy();
  });
});
