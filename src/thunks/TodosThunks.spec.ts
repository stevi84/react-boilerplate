import { describe, it, expect, vi, Mock } from 'vitest';
import { AxiosError, AxiosPromise, AxiosResponse } from 'axios';
import { decreaseReads, decreaseSubmits, increaseReads, increaseSubmits } from '../reducers/ApiCallsReducer';
import { Todo } from '../models/Todo';
import { todo1, todo2, todo3 } from '../../test/data/Todo';
import { addTodo, changeTodo, removeTodo, setTodos } from '../reducers/TodosReducer';
import { createTodo, deleteTodo, readTodo, readTodos, updateTodo } from './TodosThunks';
import {
  createTodo as createTodoApi,
  readTodos as readTodosApi,
  updateTodo as updateTodoApi,
  deleteTodo as deleteTodoApi,
  readTodo as readTodoApi,
} from '../apis/TodoApi';

vi.mock('../apis/TodoApi', () => ({
  createTodo: vi.fn(),
  readTodos: vi.fn(),
  updateTodo: vi.fn(),
  deleteTodo: vi.fn(),
  readTodo: vi.fn(),
}));
const createTodoApiMock = createTodoApi as Mock<[todo: Todo], AxiosPromise<Todo>>;
const readTodosApiMock = readTodosApi as Mock<[], AxiosPromise<Todo[]>>;
const updateTodoApiMock = updateTodoApi as Mock<[todo: Partial<Todo>], AxiosPromise<Todo>>;
const deleteTodoApiMock = deleteTodoApi as Mock<[todoId: number], AxiosPromise<void>>;
const readTodoApiMock = readTodoApi as Mock<[todoId: number], AxiosPromise<Todo>>;

describe('TodosThunk', () => {
  describe('createTodo', () => {
    it('should return correct values on success', async () => {
      const dispatch = vi.fn();
      const getState = vi.fn();
      const axiosResponse: AxiosResponse<Todo> = {
        data: todo1,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };
      createTodoApiMock.mockResolvedValue(axiosResponse);

      const todo: Todo = await createTodo(todo1, 'de')(dispatch, getState, {});
      expect(dispatch.mock.calls.length).toEqual(4);
      expect(dispatch.mock.calls[0][0]).toEqual(increaseSubmits());
      expect(dispatch.mock.calls[1][0]).toEqual(addTodo(todo1));
      expect(dispatch.mock.calls[2][0].notification.options.variant).toEqual('success');
      expect(dispatch.mock.calls[3][0]).toEqual(decreaseSubmits());
      expect(todo).toEqual(todo1);
    });

    it('should return correct values on error', async () => {
      const dispatch = vi.fn();
      const getState = vi.fn();
      const axiosError: AxiosError = {
        config: {} as any,
        isAxiosError: true,
        toJSON: () => ({}),
        name: '',
        message: 'error',
      };
      createTodoApiMock.mockRejectedValue(axiosError);

      await expect(createTodo(todo1, 'de')(dispatch, getState, {})).rejects.toThrow('error');
      expect(dispatch.mock.calls.length).toEqual(3);
      expect(dispatch.mock.calls[0][0]).toEqual(increaseSubmits());
      expect(dispatch.mock.calls[1][0].notification.options.variant).toEqual('error');
      expect(dispatch.mock.calls[2][0]).toEqual(decreaseSubmits());
    });
  });

  describe('readTodos', () => {
    it('should return correct values on success', async () => {
      const dispatch = vi.fn();
      const getState = vi.fn();
      const axiosResponse: AxiosResponse<Todo[]> = {
        data: [todo1, todo2, todo3],
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };
      readTodosApiMock.mockResolvedValue(axiosResponse);

      const todos: Todo[] = await readTodos('de')(dispatch, getState, {});
      expect(dispatch.mock.calls.length).toEqual(3);
      expect(dispatch.mock.calls[0][0]).toEqual(increaseReads());
      expect(dispatch.mock.calls[1][0]).toEqual(setTodos([todo1, todo2, todo3]));
      expect(dispatch.mock.calls[2][0]).toEqual(decreaseReads());
      expect(todos).toEqual([todo1, todo2, todo3]);
    });

    it('should return correct values on error', async () => {
      const dispatch = vi.fn();
      const getState = vi.fn();
      const axiosError: AxiosError = {
        config: {} as any,
        isAxiosError: true,
        toJSON: () => ({}),
        name: '',
        message: 'error',
      };
      readTodosApiMock.mockRejectedValue(axiosError);

      await expect(readTodos('de')(dispatch, getState, {})).rejects.toThrow('error');
      expect(dispatch.mock.calls.length).toEqual(3);
      expect(dispatch.mock.calls[0][0]).toEqual(increaseReads());
      expect(dispatch.mock.calls[1][0].notification.options.variant).toEqual('error');
      expect(dispatch.mock.calls[2][0]).toEqual(decreaseReads());
    });
  });

  describe('updateTodo', () => {
    it('should return correct values on success', async () => {
      const dispatch = vi.fn();
      const getState = vi.fn();
      const axiosResponse: AxiosResponse<Todo> = {
        data: todo1,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };
      updateTodoApiMock.mockResolvedValue(axiosResponse);

      const todo: Todo = await updateTodo(todo1, 'de')(dispatch, getState, {});
      expect(dispatch.mock.calls.length).toEqual(4);
      expect(dispatch.mock.calls[0][0]).toEqual(increaseSubmits());
      expect(dispatch.mock.calls[1][0]).toEqual(changeTodo(todo1));
      expect(dispatch.mock.calls[2][0].notification.options.variant).toEqual('success');
      expect(dispatch.mock.calls[3][0]).toEqual(decreaseSubmits());
      expect(todo).toEqual(todo1);
    });

    it('should return correct values on error 1', async () => {
      const dispatch = vi.fn();
      const getState = vi.fn();
      const axiosError: AxiosError = {
        config: {} as any,
        isAxiosError: true,
        toJSON: () => ({}),
        name: '',
        message: 'error',
      };
      updateTodoApiMock.mockRejectedValue(axiosError);

      await expect(updateTodo(todo1, 'de')(dispatch, getState, {})).rejects.toThrow('error');
      expect(dispatch.mock.calls.length).toEqual(3);
      expect(dispatch.mock.calls[0][0]).toEqual(increaseSubmits());
      expect(dispatch.mock.calls[1][0].notification.options.variant).toEqual('error');
      expect(dispatch.mock.calls[2][0]).toEqual(decreaseSubmits());
    });
  });

  describe('deleteTodo', () => {
    it('should return correct values on success', async () => {
      const dispatch = vi.fn();
      const getState = vi.fn();
      const axiosResponse: AxiosResponse<void> = {
        data: undefined,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };
      deleteTodoApiMock.mockResolvedValue(axiosResponse);

      await deleteTodo(1, 'de')(dispatch, getState, {});
      expect(dispatch.mock.calls.length).toEqual(4);
      expect(dispatch.mock.calls[0][0]).toEqual(increaseSubmits());
      expect(dispatch.mock.calls[1][0]).toEqual(removeTodo(1));
      expect(dispatch.mock.calls[2][0].notification.options.variant).toEqual('success');
      expect(dispatch.mock.calls[3][0]).toEqual(decreaseSubmits());
    });

    it('should return correct values on error', async () => {
      const dispatch = vi.fn();
      const getState = vi.fn();
      const axiosError: AxiosError = {
        config: {} as any,
        isAxiosError: true,
        toJSON: () => ({}),
        name: '',
        message: 'error',
      };
      deleteTodoApiMock.mockRejectedValue(axiosError);

      await expect(deleteTodo(1, 'de')(dispatch, getState, {})).rejects.toThrow('error');
      expect(dispatch.mock.calls.length).toEqual(3);
      expect(dispatch.mock.calls[0][0]).toEqual(increaseSubmits());
      expect(dispatch.mock.calls[1][0].notification.options.variant).toEqual('error');
      expect(dispatch.mock.calls[2][0]).toEqual(decreaseSubmits());
    });
  });

  describe('readTodo', () => {
    it('should return correct values on success', async () => {
      const dispatch = vi.fn();
      const axiosResponse: AxiosResponse<Todo> = {
        data: todo1,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };
      readTodoApiMock.mockResolvedValue(axiosResponse);

      const todo: Todo = await readTodo(1, 'de', dispatch);
      expect(dispatch.mock.calls.length).toEqual(2);
      expect(dispatch.mock.calls[0][0]).toEqual(increaseReads());
      expect(dispatch.mock.calls[1][0]).toEqual(decreaseReads());
      expect(todo).toEqual(todo1);
    });

    it('should return correct values on error', async () => {
      const dispatch = vi.fn();
      const axiosError: AxiosError = {
        config: {} as any,
        isAxiosError: true,
        toJSON: () => ({}),
        name: '',
        message: 'error',
      };
      readTodoApiMock.mockRejectedValue(axiosError);

      await expect(readTodo(1, 'de', dispatch)).rejects.toThrow('error');
      expect(dispatch.mock.calls.length).toEqual(3);
      expect(dispatch.mock.calls[0][0]).toEqual(increaseReads());
      expect(dispatch.mock.calls[1][0].notification.options.variant).toEqual('error');
      expect(dispatch.mock.calls[2][0]).toEqual(decreaseReads());
    });
  });
});
