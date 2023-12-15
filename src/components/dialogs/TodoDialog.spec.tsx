import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { todo1 } from '../../../test/data/Todo';
import { TodoDialog } from './TodoDialog';
import { currentUserEditor } from '../../../test/data/CurrentUser';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { user1 } from '../../../test/data/User';
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

vi.mock('react-router-dom', () => ({ useNavigate: () => vi.fn() }));

vi.mock('../../hooks/UseNotifier', () => ({ useNotifier: vi.fn() }));

vi.mock('../../thunks/TodosThunks', () => ({
  readTodos: () => ({ type: 'readTodos' }),
  deleteTodo: () => ({ type: 'deleteTodo' }),
}));

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

describe('TodoDialog', () => {
  it('should equal saved snapshot', () => {
    const store = mockStore(initialState);
    const tree = render(
      <Provider store={store}>
        <TodoDialog />
      </Provider>
    ).asFragment();
    expect(tree).toMatchSnapshot();
  });

  it('should load todos if not present', () => {
    const store = mockStore({ ...initialState, todos: [] } as RootState);
    expect(store.getActions().length).toEqual(0);
    render(
      <Provider store={store}>
        <TodoDialog />
      </Provider>
    );
    expect(store.getActions().length).toEqual(1);
    expect(store.getActions()[0]).toEqual({ type: 'readTodos' });
  });
});
