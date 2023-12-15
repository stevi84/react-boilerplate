import { describe, it, expect, vi } from 'vitest';
import { NotAuthorizedDialog } from './NotAuthorizedDialog';
import { render } from '@testing-library/react';
import { currentUserEditor } from '../../../test/data/CurrentUser';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { todo1 } from '../../../test/data/Todo';
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

describe('NotAuthorized', () => {
  it('should equal saved snapshot', () => {
    const store = mockStore(initialState);
    const tree = render(
      <Provider store={store}>
        <NotAuthorizedDialog />
      </Provider>
    ).asFragment();
    expect(tree).toMatchSnapshot();
  });
});
