import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { EditTodoDialog } from './EditTodoDialog';
import { todo1 } from '../../test/data/Todo';
import { currentUserEditor } from '../../test/data/CurrentUser';
import { renderWithProviders } from '../../test/Utils';
import { user1 } from '../../test/data/User';
import { RootState } from '../../reducers/Store';

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
    vi.clearAllMocks();
    readTodoMock.mockResolvedValue(todo1);
  });

  it('should load todo if updating', () => {
    expect(readTodoMock.mock.calls.length).toEqual(0);
    renderWithProviders(<EditTodoDialog />, {
      preloadedState: initialState,
      initialEntries: ['/todos/1'],
      path: '/todos/:id',
    });
    expect(readTodoMock.mock.calls.length).toEqual(1);
    expect(readTodoMock.mock.calls[0][0]).toEqual(1);
    expect(readTodoMock.mock.calls[0][1]).toEqual('de');
  });

  it('should not load todo if creating', () => {
    renderWithProviders(<EditTodoDialog />, {
      preloadedState: initialState,
      initialEntries: ['/todos/new'],
      path: '/todos/:id',
    });
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
    const { getLocation } = renderWithProviders(<EditTodoDialog />, {
      preloadedState: initialState,
      initialEntries: ['/todos/1'],
      path: '/todos/:id',
    });
    fireEvent.click(screen.getByText('cancel'));
    expect(getLocation()).toEqual('/todos');
  });

  it('should show dialog if not reading or submitting', () => {
    renderWithProviders(<EditTodoDialog />, {
      preloadedState: initialState,
      initialEntries: ['/todos/1'],
      path: '/todos/:id',
    });
    expect(screen.getByLabelText('owner')).toBeTruthy();
    expect(screen.queryByRole('progressbar')).toBeFalsy();
  });

  it('should show working if reading', () => {
    renderWithProviders(<EditTodoDialog />, {
      preloadedState: { ...initialState, apiCalls: { runningReads: 1, runningSubmits: 0 } },
      initialEntries: ['/todos/1'],
      path: '/todos/:id',
    });
    expect(screen.queryByLabelText('owner')).toBeFalsy();
    expect(screen.getByRole('progressbar')).toBeTruthy();
  });

  it('should show working if submitting', () => {
    renderWithProviders(<EditTodoDialog />, {
      preloadedState: { ...initialState, apiCalls: { runningReads: 0, runningSubmits: 1 } },
      initialEntries: ['/todos/1'],
      path: '/todos/:id',
    });
    expect(screen.queryByLabelText('owner')).toBeFalsy();
    expect(screen.getByRole('progressbar')).toBeTruthy();
  });
});
