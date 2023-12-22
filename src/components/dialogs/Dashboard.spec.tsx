import { describe, it, expect, vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { Dashboard } from './Dashboard';
import { todo1 } from '../../test/data/Todo';
import { user1 } from '../../test/data/User';
import { currentUserAdmin, currentUserEditor } from '../../test/data/CurrentUser';
import { renderWithProviders } from '../../test/Utils';
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

const { dispatchMock } = vi.hoisted(() => ({ dispatchMock: vi.fn() }));
vi.mock('../../reducers/Store', async () => {
  const mod = await vi.importActual<typeof import('../../reducers/Store')>('../../reducers/Store');
  return {
    ...mod,
    useAppDispatch: () => dispatchMock.mockImplementation(mod.useAppDispatch()),
  };
});

vi.mock('../../thunks/TodosThunks', () => ({
  readTodos: () => ({ type: 'readTodos' }),
}));

vi.mock('../../thunks/UsersThunks', () => ({
  readUsers: () => ({ type: 'readUsers' }),
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
  it('should equal saved snapshot', () => {
    const tree = renderWithProviders(<Dashboard />, { preloadedState: initialState }).asFragment();
    expect(tree).toMatchSnapshot();
  });

  it('should load todos if not present', () => {
    expect(dispatchMock.mock.calls.length).toEqual(0);
    renderWithProviders(<Dashboard />, { preloadedState: { ...initialState, todos: [] } });
    expect(dispatchMock.mock.calls.length).toEqual(1);
    expect(dispatchMock.mock.calls[0][0]).toEqual({ type: 'readTodos' });
  });

  it('should load users if not present', () => {
    expect(dispatchMock.mock.calls.length).toEqual(0);
    renderWithProviders(<Dashboard />, { preloadedState: { ...initialState, users: [] } });
    expect(dispatchMock.mock.calls.length).toEqual(1);
    expect(dispatchMock.mock.calls[0][0]).toEqual({ type: 'readUsers' });
  });

  it('should navigate to todos on button click', () => {
    renderWithProviders(<Dashboard />, { preloadedState: initialState });
    expect(navigateMock.mock.calls.length).toEqual(0);
    fireEvent.click(screen.getByTestId('EditNoteIcon'));
    expect(navigateMock.mock.calls.length).toEqual(1);
    expect(navigateMock.mock.calls[0][0]).toEqual('/todos');
  });

  it('should navigate to users on button click', () => {
    renderWithProviders(<Dashboard />, { preloadedState: initialState });
    expect(navigateMock.mock.calls.length).toEqual(0);
    fireEvent.click(screen.getByTestId('PeopleIcon'));
    expect(navigateMock.mock.calls.length).toEqual(1);
    expect(navigateMock.mock.calls[0][0]).toEqual('/users');
  });

  it('should navigate to settings on button click', () => {
    renderWithProviders(<Dashboard />, { preloadedState: initialState });
    expect(navigateMock.mock.calls.length).toEqual(0);
    fireEvent.click(screen.getByTestId('SettingsIcon'));
    expect(navigateMock.mock.calls.length).toEqual(1);
    expect(navigateMock.mock.calls[0][0]).toEqual('/admin');
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
