import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { MainLayout } from './MainLayout';
import { renderWithProviders } from '../../test/Utils';
import { todo1 } from '../../test/data/Todo';
import { user1 } from '../../test/data/User';
import { RootState } from '../../reducers/Store';
import { currentUserEditor } from '../../test/data/CurrentUser';
import { getEmptyCurrentUser } from '../../models/CurrentUser';

const { readCurrentUserMock } = vi.hoisted(() => ({ readCurrentUserMock: vi.fn() }));
vi.mock('../../thunks/CurrentUserThunks', () => ({
  readCurrentUser: readCurrentUserMock,
}));

const initialState: Partial<RootState> = {
  todos: [todo1],
  users: [user1],
  apiCalls: { runningReads: 0, runningSubmits: 0 },
  currentUser: currentUserEditor,
};

describe('MainLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    readCurrentUserMock.mockReturnValue({ type: 'readCurrentUser' });
  });

  it('should show Working and load currentuser if not loaded yet', () => {
    renderWithProviders(<MainLayout allowedAccessRights={['UNRESTRICTED']} />, {
      preloadedState: { ...initialState, currentUser: getEmptyCurrentUser() },
    });
    expect(screen.getByTestId('loading-spinner')).toBeTruthy();
    expect(readCurrentUserMock.mock.calls.length).toEqual(1);
  });

  it('should show NotAuthorized if current user is not authorized to see content', () => {
    renderWithProviders(<MainLayout allowedAccessRights={['ADMIN']} />, { preloadedState: initialState });
    expect(screen.getByText('Not Authorized')).toBeTruthy();
  });
});
