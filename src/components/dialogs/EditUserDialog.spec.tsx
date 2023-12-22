import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { user1 } from '../../test/data/User';
import { EditUserDialog } from './EditUserDialog';
import { currentUserEditor } from '../../test/data/CurrentUser';
import { renderWithProviders } from '../../test/Utils';
import { todo1 } from '../../test/data/Todo';
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

const { navigateMock, useParamsMock } = vi.hoisted(() => ({
  navigateMock: vi.fn(),
  useParamsMock: vi.fn(),
}));
vi.mock('react-router-dom', () => ({
  useNavigate: () => navigateMock,
  useParams: useParamsMock,
}));

vi.mock('../../hooks/UseNotifier', () => ({ useNotifier: vi.fn() }));

const { dispatchMock } = vi.hoisted(() => ({ dispatchMock: vi.fn() }));
vi.mock('../../reducers/Store', async () => {
  const mod = await vi.importActual<typeof import('../../reducers/Store')>('../../reducers/Store');
  return {
    ...mod,
    useAppDispatch: () => dispatchMock.mockImplementation(mod.useAppDispatch()),
  };
});

const { readUserMock } = vi.hoisted(() => ({ readUserMock: vi.fn() }));
vi.mock('../../thunks/UsersThunks', async () => {
  return {
    createUser: () => ({ type: 'createUser' }),
    updateUser: () => ({ type: 'updateUser' }),
    readUser: readUserMock,
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

describe('EditUserDialog', () => {
  beforeEach(() => {
    readUserMock.mockResolvedValue(user1);
  });

  it('should equal saved snapshot', () => {
    useParamsMock.mockReturnValue({ id: 1 });
    const tree = renderWithProviders(<EditUserDialog />, { preloadedState: initialState }).asFragment();
    expect(tree).toMatchSnapshot();
  });

  it('should load user if updating', () => {
    useParamsMock.mockReturnValue({ id: '1' });
    expect(readUserMock.mock.calls.length).toEqual(0);
    renderWithProviders(<EditUserDialog />, { preloadedState: initialState });
    expect(readUserMock.mock.calls.length).toEqual(1);
    expect(readUserMock.mock.calls[0][0]).toEqual(1);
    expect(readUserMock.mock.calls[0][1]).toEqual('de');
  });

  it('should not load user if creating', () => {
    useParamsMock.mockReturnValue({ id: 'new' });
    renderWithProviders(<EditUserDialog />, { preloadedState: initialState });
    expect(readUserMock.mock.calls.length).toEqual(0);
  });

  // it('should dispatch createUser on saving new user', () => {
  //   useParamsMock.mockReturnValue({ id: 'new' });
  //   expect(dispatchMock.mock.calls.length).toEqual(0);
  //   renderWithProviders(<EditUserDialog />, { preloadedState: initialState });
  //   fireEvent.change(screen.getByLabelText('name'), { target: { value: 'name' } });
  //   fireEvent.change(screen.getByLabelText('dateOfBirth'), { target: { value: '06.12.2023' } });
  //   fireEvent.change(screen.getByLabelText('size'), { target: { value: '123' } });
  //   fireEvent.change(screen.getByLabelText('weight'), { target: { value: '50.5' } });
  //   fireEvent.change(screen.getByLabelText('email'), { target: { value: 'test@test.de' } });
  //   fireEvent.change(screen.getByLabelText('phone'), { target: { value: '0123/4567890' } });
  //   fireEvent.click(screen.getByText('save'));
  //   expect(dispatchMock.mock.calls.length).toEqual(1);
  //   expect(dispatchMock.mock.calls[0][0]).toEqual({ type: 'createUser' });
  // });

  // it('should dispatch updateUser on saving existing user', () => {
  //   useParamsMock.mockReturnValue({ id: '1' });
  //   expect(dispatchMock.mock.calls.length).toEqual(0);
  //   renderWithProviders(<EditUserDialog />, { preloadedState: initialState });
  //   fireEvent.change(screen.getByLabelText('name'), { target: { value: 'change' } });
  //   fireEvent.click(screen.getByText('save'));
  //   expect(dispatchMock.mock.calls.length).toEqual(1);
  //   expect(dispatchMock.mock.calls[0][0]).toEqual({ type: 'updateUser' });
  // });

  it('should navigate to users on cancel', () => {
    useParamsMock.mockReturnValue({ id: '1' });
    expect(navigateMock.mock.calls.length).toEqual(0);
    renderWithProviders(<EditUserDialog />, { preloadedState: initialState });
    fireEvent.click(screen.getByText('cancel'));
    expect(navigateMock.mock.calls.length).toEqual(1);
    expect(navigateMock.mock.calls[0][0]).toEqual('/users');
  });

  it('should show dialog if not reading or submitting', () => {
    useParamsMock.mockReturnValue({ id: 1 });
    renderWithProviders(<EditUserDialog />, { preloadedState: initialState });
    expect(screen.getByLabelText('name')).toBeTruthy();
    expect(screen.queryByRole('progressbar')).toBeFalsy();
  });

  it('should show working if reading', () => {
    useParamsMock.mockReturnValue({ id: 1 });
    renderWithProviders(<EditUserDialog />, {
      preloadedState: { ...initialState, apiCalls: { runningReads: 1, runningSubmits: 0 } },
    });
    expect(screen.queryByLabelText('name')).toBeFalsy();
    expect(screen.getByRole('progressbar')).toBeTruthy();
  });

  it('should show working if submitting', () => {
    useParamsMock.mockReturnValue({ id: 1 });
    renderWithProviders(<EditUserDialog />, {
      preloadedState: { ...initialState, apiCalls: { runningReads: 0, runningSubmits: 1 } },
    });
    expect(screen.queryByLabelText('name')).toBeFalsy();
    expect(screen.getByRole('progressbar')).toBeTruthy();
  });
});
