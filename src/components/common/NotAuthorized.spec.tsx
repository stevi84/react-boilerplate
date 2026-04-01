import { describe, it, expect, vi } from 'vitest';
import { NotAuthorized } from './NotAuthorized';
import { fireEvent, screen } from '@testing-library/react';
import { currentUserEditor } from '../../test/data/CurrentUser';
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

describe('NotAuthorized', () => {
  it('should navigate to dashboard on button click', () => {
    const { getLocation } = renderWithProviders(<NotAuthorized />, { preloadedState: initialState });
    fireEvent.click(screen.getByTestId('ArrowBackIcon'));
    expect(getLocation()).toEqual('/');
  });
});
