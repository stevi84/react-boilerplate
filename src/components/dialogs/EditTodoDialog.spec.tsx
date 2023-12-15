import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { EditTodoDialog } from './EditTodoDialog';
import { todo1 } from '../../../test/data/Todo';
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

const { navigateMock, useParamsMock } = vi.hoisted(() => ({
  navigateMock: vi.fn(),
  useParamsMock: vi.fn(),
}));
vi.mock('react-router-dom', () => ({
  useNavigate: () => navigateMock,
  useParams: useParamsMock,
}));

vi.mock('../../hooks/UseNotifier', () => ({ useNotifier: vi.fn() }));

const { readTodoMock } = vi.hoisted(() => ({ readTodoMock: vi.fn() }));
vi.mock('../../thunks/TodosThunks', () => ({
  createTodo: () => ({ type: 'createTodo' }),
  updateTodo: () => ({ type: 'updateTodo' }),
  readTodo: readTodoMock,
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

describe('EditTodoDialog', () => {
  beforeEach(() => {
    readTodoMock.mockResolvedValue(todo1);
  });

  it('should equal saved snapshot', () => {
    const store = mockStore(initialState);
    useParamsMock.mockReturnValue({ id: 1 });
    const tree = render(
      <Provider store={store}>
        <EditTodoDialog />
      </Provider>
    ).asFragment();
    expect(tree).toMatchSnapshot();
  });

  it('should load todo if updating', () => {
    const store = mockStore(initialState);
    useParamsMock.mockReturnValue({ id: '1' });
    expect(readTodoMock.mock.calls.length).toEqual(0);
    render(
      <Provider store={store}>
        <EditTodoDialog />
      </Provider>
    );
    expect(readTodoMock.mock.calls.length).toEqual(1);
    expect(readTodoMock.mock.calls[0][0]).toEqual(1);
    expect(readTodoMock.mock.calls[0][1]).toEqual('de');
  });

  it('should not load todo if creating', () => {
    const store = mockStore(initialState);
    useParamsMock.mockReturnValue({ id: 'new' });
    render(
      <Provider store={store}>
        <EditTodoDialog />
      </Provider>
    );
    expect(readTodoMock.mock.calls.length).toEqual(0);
  });

  // it('should dispatch createTodo on saving new todo', () => {
  //   const store = mockStore(initialState);
  //   useParamsMock.mockReturnValue({ id: 'new' });
  //   expect(store.getActions().length).toEqual(0);
  //   render(
  //     <Provider store={store}>
  //       <EditTodoDialog />
  //     </Provider>
  //   );
  //   fireEvent.change(screen.getByLabelText('owner'), { target: { value: 'owner' } });
  //   fireEvent.change(screen.getByLabelText('dueDate'), { target: { value: '06.12.2023' } });
  //   fireEvent.change(screen.getByLabelText('description'), { target: { value: 'description' } });
  //   fireEvent.click(screen.getByText('save'));
  //   expect(store.getActions().length).toEqual(1);
  //   expect(store.getActions()[0]).toEqual({ type: 'createTodo' });
  // });

  // it('should dispatch updateTodo on saving existing todo', () => {
  //   const store = mockStore(initialState);
  //   useParamsMock.mockReturnValue({ id: '1' });
  //   expect(store.getActions().length).toEqual(0);
  //   render(
  //     <Provider store={store}>
  //       <EditTodoDialog />
  //     </Provider>
  //   );
  //   fireEvent.change(screen.getByLabelText('owner'), { target: { value: 'change' } });
  //   fireEvent.click(screen.getByText('save'));
  //   expect(store.getActions().length).toEqual(1);
  //   expect(store.getActions()[0]).toEqual({ type: 'updateTodo' });
  // });

  it('should navigate to todos on cancel', () => {
    const store = mockStore(initialState);
    useParamsMock.mockReturnValue({ id: '1' });
    expect(navigateMock.mock.calls.length).toEqual(0);
    render(
      <Provider store={store}>
        <EditTodoDialog />
      </Provider>
    );
    fireEvent.click(screen.getByText('cancel'));
    expect(navigateMock.mock.calls.length).toEqual(1);
    expect(navigateMock.mock.calls[0][0]).toEqual('/todos');
  });

  it('should show dialog if not reading or submitting', () => {
    const store = mockStore(initialState);
    useParamsMock.mockReturnValue({ id: 1 });
    render(
      <Provider store={store}>
        <EditTodoDialog />
      </Provider>
    );
    expect(screen.getByLabelText('owner')).toBeTruthy();
    expect(screen.queryByRole('progressbar')).toBeFalsy();
  });

  it('should show working if reading', () => {
    const store = mockStore({ ...initialState, apiCalls: { runningReads: 1, runningSubmits: 0 } } as RootState);
    useParamsMock.mockReturnValue({ id: 1 });
    render(
      <Provider store={store}>
        <EditTodoDialog />
      </Provider>
    );
    expect(screen.queryByLabelText('owner')).toBeFalsy();
    expect(screen.getByRole('progressbar')).toBeTruthy();
  });

  it('should show working if submitting', () => {
    const store = mockStore({ ...initialState, apiCalls: { runningReads: 0, runningSubmits: 1 } } as RootState);
    useParamsMock.mockReturnValue({ id: 1 });
    render(
      <Provider store={store}>
        <EditTodoDialog />
      </Provider>
    );
    expect(screen.queryByLabelText('owner')).toBeFalsy();
    expect(screen.getByRole('progressbar')).toBeTruthy();
  });
});
