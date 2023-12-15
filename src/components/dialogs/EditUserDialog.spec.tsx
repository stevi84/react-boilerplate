import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { user1 } from '../../../test/data/User';
import { EditUserDialog } from './EditUserDialog';
import { currentUserEditor } from '../../../test/data/CurrentUser';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { todo1 } from '../../../test/data/Todo';
import { RootState } from '../../reducers/Store';
import { Provider } from 'react-redux';

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

const mockStore = configureStore([thunk]);
const initialState = {
  todos: [todo1],
  users: [user1],
  apiCalls: { runningReads: 0, runningSubmits: 0 },
  currentUser: currentUserEditor,
} as RootState;

describe('EditUserDialog', () => {
  beforeEach(() => {
    readUserMock.mockResolvedValue(user1);
  });

  it('should equal saved snapshot', () => {
    const store = mockStore(initialState);
    useParamsMock.mockReturnValue({ id: 1 });
    const tree = render(
      <Provider store={store}>
        <EditUserDialog />
      </Provider>
    ).asFragment();
    expect(tree).toMatchSnapshot();
  });

  it('should load user if updating', () => {
    const store = mockStore(initialState);
    useParamsMock.mockReturnValue({ id: '1' });
    expect(readUserMock.mock.calls.length).toEqual(0);
    render(
      <Provider store={store}>
        <EditUserDialog />
      </Provider>
    );
    expect(readUserMock.mock.calls.length).toEqual(1);
    expect(readUserMock.mock.calls[0][0]).toEqual(1);
    expect(readUserMock.mock.calls[0][1]).toEqual('de');
  });

  it('should not load user if creating', () => {
    const store = mockStore(initialState);
    useParamsMock.mockReturnValue({ id: 'new' });
    render(
      <Provider store={store}>
        <EditUserDialog />
      </Provider>
    );
    expect(readUserMock.mock.calls.length).toEqual(0);
  });

  // it('should dispatch createUser on saving new user', () => {
  //   const store = mockStore(initialState);
  //   useParamsMock.mockReturnValue({ id: 'new' });
  //   expect(store.getActions().length).toEqual(0);
  //   render(
  //     <Provider store={store}>
  //       <EditUserDialog />
  //     </Provider>
  //   );
  //   fireEvent.change(screen.getByLabelText('name'), { target: { value: 'name' } });
  //   fireEvent.change(screen.getByLabelText('dateOfBirth'), { target: { value: '06.12.2023' } });
  //   fireEvent.change(screen.getByLabelText('size'), { target: { value: '123' } });
  //   fireEvent.change(screen.getByLabelText('weight'), { target: { value: '50.5' } });
  //   fireEvent.change(screen.getByLabelText('email'), { target: { value: 'test@test.de' } });
  //   fireEvent.change(screen.getByLabelText('phone'), { target: { value: '0123/4567890' } });
  //   fireEvent.click(screen.getByText('save'));
  //   expect(store.getActions().length).toEqual(1);
  //   expect(store.getActions()[0]).toEqual({ type: 'createUser' });
  // });

  // it('should dispatch updateUser on saving existing user', () => {
  //   const store = mockStore(initialState);
  //   useParamsMock.mockReturnValue({ id: '1' });
  //   expect(store.getActions().length).toEqual(0);
  //   render(
  //     <Provider store={store}>
  //       <EditUserDialog />
  //     </Provider>
  //   );
  //   fireEvent.change(screen.getByLabelText('name'), { target: { value: 'change' } });
  //   fireEvent.click(screen.getByText('save'));
  //   expect(store.getActions().length).toEqual(1);
  //   expect(store.getActions()[0]).toEqual({ type: 'updateUser' });
  // });

  it('should navigate to users on cancel', () => {
    const store = mockStore(initialState);
    useParamsMock.mockReturnValue({ id: '1' });
    expect(navigateMock.mock.calls.length).toEqual(0);
    render(
      <Provider store={store}>
        <EditUserDialog />
      </Provider>
    );
    fireEvent.click(screen.getByText('cancel'));
    expect(navigateMock.mock.calls.length).toEqual(1);
    expect(navigateMock.mock.calls[0][0]).toEqual('/users');
  });

  it('should show dialog if not reading or submitting', () => {
    const store = mockStore(initialState);
    useParamsMock.mockReturnValue({ id: 1 });
    render(
      <Provider store={store}>
        <EditUserDialog />
      </Provider>
    );
    expect(screen.getByLabelText('name')).toBeTruthy();
    expect(screen.queryByRole('progressbar')).toBeFalsy();
  });

  it('should show working if reading', () => {
    const store = mockStore({ ...initialState, apiCalls: { runningReads: 1, runningSubmits: 0 } } as RootState);
    useParamsMock.mockReturnValue({ id: 1 });
    render(
      <Provider store={store}>
        <EditUserDialog />
      </Provider>
    );
    expect(screen.queryByLabelText('name')).toBeFalsy();
    expect(screen.getByRole('progressbar')).toBeTruthy();
  });

  it('should show working if submitting', () => {
    const store = mockStore({ ...initialState, apiCalls: { runningReads: 0, runningSubmits: 1 } } as RootState);
    useParamsMock.mockReturnValue({ id: 1 });
    render(
      <Provider store={store}>
        <EditUserDialog />
      </Provider>
    );
    expect(screen.queryByLabelText('name')).toBeFalsy();
    expect(screen.getByRole('progressbar')).toBeTruthy();
  });
});
