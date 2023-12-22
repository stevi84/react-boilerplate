import { describe, it, expect, vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { EditTodoDialog } from './EditTodoDialog';
import { todo1 } from '../../test/data/Todo';
import { currentUserEditor } from '../../test/data/CurrentUser';
import { renderWithProviders } from '../../test/Utils';
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

const { readTodoMock } = vi.hoisted(() => ({ readTodoMock: vi.fn() }));
vi.mock('../../thunks/TodosThunks', () => ({
  createTodo: () => ({ type: 'createTodo' }),
  updateTodo: () => ({ type: 'updateTodo' }),
  readTodo: readTodoMock,
}));

vi.mock('../../thunks/CurrentUserThunks', () => ({
  readCurrentUser: () => ({ type: 'readCurrentUser' }),
}));

const initialState: Partial<RootState> = {
  todos: [todo1],
  users: [user1],
  apiCalls: { runningReads: 0, runningSubmits: 0 },
  currentUser: currentUserEditor,
};

describe('EditTodoDialog', () => {
  beforeEach(() => {
    readTodoMock.mockResolvedValue(todo1);
  });

  it('should equal saved snapshot', () => {
    useParamsMock.mockReturnValue({ id: 1 });
    const tree = renderWithProviders(<EditTodoDialog />, { preloadedState: initialState }).asFragment();
    expect(tree).toMatchSnapshot();
  });

  it('should load todo if updating', () => {
    useParamsMock.mockReturnValue({ id: '1' });
    expect(readTodoMock.mock.calls.length).toEqual(0);
    renderWithProviders(<EditTodoDialog />, { preloadedState: initialState });
    expect(readTodoMock.mock.calls.length).toEqual(1);
    expect(readTodoMock.mock.calls[0][0]).toEqual(1);
    expect(readTodoMock.mock.calls[0][1]).toEqual('de');
  });

  it('should not load todo if creating', () => {
    useParamsMock.mockReturnValue({ id: 'new' });
    renderWithProviders(<EditTodoDialog />, { preloadedState: initialState });
    expect(readTodoMock.mock.calls.length).toEqual(0);
  });

  // it('should dispatch createTodo on saving new todo', () => {
  //   useParamsMock.mockReturnValue({ id: 'new' });
  //   expect(dispatchMock.mock.calls.length).toEqual(0);
  //   renderWithProviders(<EditTodoDialog />, { preloadedState: initialState });
  //   fireEvent.change(screen.getByLabelText('owner'), { target: { value: 'owner' } });
  //   fireEvent.change(screen.getByLabelText('dueDate'), { target: { value: '06.12.2023' } });
  //   fireEvent.change(screen.getByLabelText('description'), { target: { value: 'description' } });
  //   fireEvent.click(screen.getByText('save'));
  //   expect(dispatchMock.mock.calls.length).toEqual(1);
  //   expect(dispatchMock.mock.calls[0][0]).toEqual({ type: 'createTodo' });
  // });

  // it('should dispatch updateTodo on saving existing todo', () => {
  //   useParamsMock.mockReturnValue({ id: '1' });
  //   expect(dispatchMock.mock.calls.length).toEqual(0);
  //   renderWithProviders(<EditTodoDialog />, { preloadedState: initialState });
  //   fireEvent.change(screen.getByLabelText('owner'), { target: { value: 'change' } });
  //   fireEvent.click(screen.getByText('save'));
  //   expect(dispatchMock.mock.calls.length).toEqual(1);
  //   expect(dispatchMock.mock.calls[0][0]).toEqual({ type: 'updateTodo' });
  // });

  it('should navigate to todos on cancel', () => {
    useParamsMock.mockReturnValue({ id: '1' });
    expect(navigateMock.mock.calls.length).toEqual(0);
    renderWithProviders(<EditTodoDialog />, { preloadedState: initialState });
    fireEvent.click(screen.getByText('cancel'));
    expect(navigateMock.mock.calls.length).toEqual(1);
    expect(navigateMock.mock.calls[0][0]).toEqual('/todos');
  });

  it('should show dialog if not reading or submitting', () => {
    useParamsMock.mockReturnValue({ id: 1 });
    renderWithProviders(<EditTodoDialog />, { preloadedState: initialState });
    expect(screen.getByLabelText('owner')).toBeTruthy();
    expect(screen.queryByRole('progressbar')).toBeFalsy();
  });

  it('should show working if reading', () => {
    useParamsMock.mockReturnValue({ id: 1 });
    renderWithProviders(<EditTodoDialog />, {
      preloadedState: { ...initialState, apiCalls: { runningReads: 1, runningSubmits: 0 } },
    });
    expect(screen.queryByLabelText('owner')).toBeFalsy();
    expect(screen.getByRole('progressbar')).toBeTruthy();
  });

  it('should show working if submitting', () => {
    useParamsMock.mockReturnValue({ id: 1 });
    renderWithProviders(<EditTodoDialog />, {
      preloadedState: { ...initialState, apiCalls: { runningReads: 0, runningSubmits: 1 } },
    });
    expect(screen.queryByLabelText('owner')).toBeFalsy();
    expect(screen.getByRole('progressbar')).toBeTruthy();
  });
});
