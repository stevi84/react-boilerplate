import { describe, it, expect, vi } from 'vitest';
import { NotAuthorized } from './NotAuthorized';
import { fireEvent, screen } from '@testing-library/react';
import { currentUserEditor } from '../../test/data/CurrentUser';
import { renderWithProviders } from '../../test/Utils';
import { todo1 } from '../../test/data/Todo';
import { user1 } from '../../test/data/User';
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

const { navigateMock } = vi.hoisted(() => ({ navigateMock: vi.fn() }));
vi.mock('react-router-dom', () => ({ useNavigate: () => navigateMock }));

vi.mock('../../hooks/UseNotifier', () => ({ useNotifier: vi.fn() }));

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
  it('should equal saved snapshot', () => {
    const tree = renderWithProviders(<NotAuthorized />, { preloadedState: initialState }).asFragment();
    expect(tree).toMatchSnapshot();
  });

  it('should navigate to dashboard on button click', () => {
    renderWithProviders(<NotAuthorized />, { preloadedState: initialState });
    expect(navigateMock.mock.calls.length).toEqual(0);
    fireEvent.click(screen.getByTestId('ArrowBackIcon'));
    expect(navigateMock.mock.calls.length).toEqual(1);
    expect(navigateMock.mock.calls[0][0]).toEqual('/');
  });
});
