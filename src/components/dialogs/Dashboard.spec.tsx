import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Dashboard } from './Dashboard';
import { todo1 } from '../../../test/data/Todo';
import { user1 } from '../../../test/data/User';
import { currentUserAdmin, currentUserEditor } from '../../../test/data/CurrentUser';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
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

const { navigateMock } = vi.hoisted(() => ({ navigateMock: vi.fn() }));
vi.mock('react-router-dom', () => ({ useNavigate: () => navigateMock }));

vi.mock('../../hooks/UseNotifier', () => ({ useNotifier: vi.fn() }));

vi.mock('../../thunks/TodosThunks', () => ({
  readTodos: () => ({ type: 'readTodos' }),
}));

vi.mock('../../thunks/UsersThunks', () => ({
  readUsers: () => ({ type: 'readUsers' }),
}));

vi.mock('../../thunks/CurrentUserThunks', () => ({
  readCurrentUser: () => ({ type: 'readCurrentUser' }),
}));

const mockStore = configureStore([thunk]);
const initialState = {
  todos: [todo1],
  users: [user1],
  apiCalls: { runningReads: 0, runningSubmits: 0 },
  currentUser: currentUserAdmin,
} as RootState;

describe('Dashboard', () => {
  it('should equal saved snapshot', () => {
    const store = mockStore(initialState);
    const tree = render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    ).asFragment();
    expect(tree).toMatchSnapshot();
  });

  it('should load todos if not present', () => {
    const store = mockStore({ ...initialState, todos: [] } as RootState);
    expect(store.getActions().length).toEqual(0);
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
    expect(store.getActions().length).toEqual(1);
    expect(store.getActions()[0]).toEqual({ type: 'readTodos' });
  });

  it('should load users if not present', () => {
    const store = mockStore({ ...initialState, users: [] } as RootState);
    expect(store.getActions().length).toEqual(0);
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
    expect(store.getActions().length).toEqual(1);
    expect(store.getActions()[0]).toEqual({ type: 'readUsers' });
  });

  it('should navigate to todos on button click', () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
    expect(navigateMock.mock.calls.length).toEqual(0);
    fireEvent.click(screen.getByTestId('EditNoteIcon'));
    expect(navigateMock.mock.calls.length).toEqual(1);
    expect(navigateMock.mock.calls[0][0]).toEqual('/todos');
  });

  it('should navigate to users on button click', () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
    expect(navigateMock.mock.calls.length).toEqual(0);
    fireEvent.click(screen.getByTestId('PeopleIcon'));
    expect(navigateMock.mock.calls.length).toEqual(1);
    expect(navigateMock.mock.calls[0][0]).toEqual('/users');
  });

  it('should navigate to settings on button click', () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
    expect(navigateMock.mock.calls.length).toEqual(0);
    fireEvent.click(screen.getByTestId('SettingsIcon'));
    expect(navigateMock.mock.calls.length).toEqual(1);
    expect(navigateMock.mock.calls[0][0]).toEqual('/admin');
  });

  it('should show dashboard if not reading or submitting', () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
    expect(screen.getByText('todo')).toBeTruthy();
    expect(screen.queryByRole('progressbar')).toBeFalsy();
  });

  it('should show working if reading', () => {
    const store = mockStore({ ...initialState, apiCalls: { runningReads: 1, runningSubmits: 0 } } as RootState);
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
    expect(screen.queryByText('todo')).toBeFalsy();
    expect(screen.getByRole('progressbar')).toBeTruthy();
  });

  it('should show working if submitting', () => {
    const store = mockStore({ ...initialState, apiCalls: { runningReads: 0, runningSubmits: 1 } } as RootState);
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
    expect(screen.queryByText('todo')).toBeFalsy();
    expect(screen.getByRole('progressbar')).toBeTruthy();
  });

  it('should hide settings if not authorized', () => {
    const store = mockStore({ ...initialState, currentUser: currentUserEditor } as RootState);
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
    expect(screen.queryByText('settings')).toBeFalsy();
  });
});
