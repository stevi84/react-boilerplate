import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MainLayout } from './MainLayout';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { todo1 } from '../../../test/data/Todo';
import { user1 } from '../../../test/data/User';
import { RootState } from '../../reducers/Store';
import { Provider } from 'react-redux';
import { currentUserEditor } from '../../../test/data/CurrentUser';
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

describe('MainLayout', () => {
  it('should equal saved snapshot', () => {
    const store = mockStore(initialState);
    const tree = render(
      <Provider store={store}>
        <MainLayout allowedAccessRights={['UNRESTRICTED']} />
      </Provider>
    ).asFragment();
    expect(tree).toMatchSnapshot();
  });

  it('should show Working and load currentuser if not loaded yet', () => {
    const store = mockStore({ ...initialState, currentUser: getEmptyCurrentUser() } as RootState);
    expect(store.getActions().length).toEqual(0);
    render(
      <Provider store={store}>
        <MainLayout allowedAccessRights={['UNRESTRICTED']} />
      </Provider>
    );
    expect(screen.getByTestId('loading-spinner')).toBeTruthy();
    expect(store.getActions().length).toEqual(1);
    expect(store.getActions()[0]).toEqual({ type: 'readCurrentUser' });
  });

  it('should show NotAuthorized if current user is not authorized to see content', () => {
    const store = mockStore(initialState);
    expect(store.getActions().length).toEqual(0);
    render(
      <Provider store={store}>
        <MainLayout allowedAccessRights={['ADMIN']} />
      </Provider>
    );
    expect(screen.getByText('Not Authorized')).toBeTruthy();
  });
});
