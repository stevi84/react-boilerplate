import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createMessage } from '../globals/Translations';
import { Todo } from '../models/Todo';
import * as todoApi from '../apis/TodoApi';
import { AppDispatch, AppThunk, RootState } from './Store';
import { decreaseReads, decreaseSubmits, increaseReads, increaseSubmits } from './ApiCallsReducer';
import { enqueueSnackbar } from './SnackbarsReducer';

export const todosInitialState: Todo[] = [];

const todosSlice = createSlice({
  name: 'todos',
  initialState: todosInitialState,
  reducers: {
    setTodos(state, action: PayloadAction<Todo[]>) {
      return action.payload;
    },
    addTodo(state, action: PayloadAction<Todo>) {
      return state.concat(action.payload);
    },
    changeTodo(state, action: PayloadAction<Todo>) {
      return state.map((todo) => (todo.id !== action.payload.id ? todo : action.payload));
    },
    removeTodo(state, action: PayloadAction<number>) {
      return state.filter((todo) => todo.id !== action.payload);
    },
  },
});

const { actions, reducer } = todosSlice;
export const { setTodos, addTodo, changeTodo, removeTodo } = actions;
export { reducer as todosReducer };

export const todosSelector = (state: RootState): Todo[] => state.todos;

export const createTodo =
  (todo: Todo): AppThunk<Promise<Todo>> =>
  async (dispatch) => {
    dispatch(increaseSubmits());
    try {
      const response = await todoApi.createTodo(todo);
      dispatch(addTodo(response.data));
      dispatch(enqueueSnackbar(createMessage('create', 'todo', true), { variant: 'success', autoHideDuration: 2000 }));
      return response.data;
    } catch (error) {
      dispatch(enqueueSnackbar(createMessage('create', 'todo', false), { variant: 'error', autoHideDuration: null }));
      throw error;
    } finally {
      dispatch(decreaseSubmits());
    }
  };

export const readTodos = (): AppThunk<Promise<Todo[]>> => async (dispatch) => {
  dispatch(increaseReads());
  try {
    const response = await todoApi.readTodos();
    dispatch(setTodos(response.data));
    return response.data;
  } catch (error) {
    dispatch(enqueueSnackbar(createMessage('read', 'todo', false), { variant: 'error', autoHideDuration: null }));
    throw error;
  } finally {
    dispatch(decreaseReads());
  }
};

export const updateTodo =
  (todo: Todo): AppThunk<Promise<Todo>> =>
  async (dispatch) => {
    dispatch(increaseSubmits());
    try {
      const response = await todoApi.updateTodo(todo);
      dispatch(changeTodo(response.data));
      dispatch(enqueueSnackbar(createMessage('update', 'todo', true), { variant: 'success', autoHideDuration: 2000 }));
      return response.data;
    } catch (error) {
      dispatch(enqueueSnackbar(createMessage('update', 'todo', false), { variant: 'error', autoHideDuration: null }));
      throw error;
    } finally {
      dispatch(decreaseSubmits());
    }
  };

export const deleteTodo =
  (todoId: number): AppThunk<Promise<void>> =>
  async (dispatch) => {
    dispatch(increaseSubmits());
    try {
      const response = await todoApi.deleteTodo(todoId);
      dispatch(removeTodo(todoId));
      dispatch(enqueueSnackbar(createMessage('delete', 'todo', true), { variant: 'success', autoHideDuration: 2000 }));
      return response.data;
    } catch (error) {
      dispatch(enqueueSnackbar(createMessage('delete', 'todo', false), { variant: 'error', autoHideDuration: null }));
      throw error;
    } finally {
      dispatch(decreaseSubmits());
    }
  };

export const readTodo = async (todoId: number, dispatch: AppDispatch): Promise<Todo> => {
  dispatch(increaseReads());
  try {
    const response = await todoApi.readTodo(todoId);
    dispatch(enqueueSnackbar(createMessage('read', 'todo', true), { variant: 'success', autoHideDuration: 2000 }));
    return response.data;
  } catch (error) {
    dispatch(enqueueSnackbar(createMessage('read', 'todo', false), { variant: 'error', autoHideDuration: null }));
    throw error;
  } finally {
    dispatch(decreaseReads());
  }
};
