import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { MainLayout } from './MainLayout';
import { renderWithProviders } from '../../test/Utils';
import { todo1 } from '../../test/data/Todo';
import { user1 } from '../../test/data/User';
import { RootState } from '../../reducers/Store';
import { currentUserEditor } from '../../test/data/CurrentUser';
import { getEmptyCurrentUser } from '../../models/CurrentUser';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
    i18n: {
      language: 'de',
      changeLanguage: vi.fn(),
    },
  }),
}));

vi.mock('react-router-dom', () => ({ useNavigate: () => vi.fn() }));

vi.mock('../../hooks/UseNotifier', () => ({ useNotifier: vi.fn() }));

const { dispatchMock } = vi.hoisted(() => ({ dispatchMock: vi.fn() }));
vi.mock('../../reducers/Store', async () => {
  const mod = await vi.importActual<typeof import('../../reducers/Store')>('../../reducers/Store');
  return {
    ...mod,
    useAppDispatch: () => dispatchMock.mockImplementation(mod.useAppDispatch()),
  };
});

vi.mock('../../thunks/CurrentUserThunks', () => ({
  readCurrentUser: () => ({ type: 'readCurrentUser' }),
}));

const initialState: Partial<RootState> = {
  todos: [todo1],
  users: [user1],
  apiCalls: { runningReads: 0, runningSubmits: 0 },
  currentUser: currentUserEditor,
};

describe('MainLayout', () => {
  it('should equal saved snapshot', () => {
    const tree = renderWithProviders(<MainLayout allowedAccessRights={['UNRESTRICTED']} />, {
      preloadedState: initialState,
    }).asFragment();
    expect(tree).toMatchSnapshot();
  });

  it('should show Working and load currentuser if not loaded yet', () => {
    expect(dispatchMock.mock.calls.length).toEqual(0);
    renderWithProviders(<MainLayout allowedAccessRights={['UNRESTRICTED']} />, {
      preloadedState: { ...initialState, currentUser: getEmptyCurrentUser() },
    });
    expect(screen.getByTestId('loading-spinner')).toBeTruthy();
    expect(dispatchMock.mock.calls.length).toEqual(1);
    expect(dispatchMock.mock.calls[0][0]).toEqual({ type: 'readCurrentUser' });
  });

  it('should show NotAuthorized if current user is not authorized to see content', () => {
    renderWithProviders(<MainLayout allowedAccessRights={['ADMIN']} />, { preloadedState: initialState });
    expect(screen.getByText('Not Authorized')).toBeTruthy();
  });
});
