import { Todo } from '../models/Todo';
import { decreaseReads, decreaseSubmits, increaseReads, increaseSubmits } from '../reducers/ApiCallsReducer';
import { AppDispatch, AppThunk } from '../reducers/Store';
import * as todoApi from '../apis/TodoApi';
import { addTodo, changeTodo, removeTodo, setTodos } from '../reducers/TodosReducer';
import { enqueueSnackbar } from '../reducers/SnackbarsReducer';
import { createMessage, Locale } from '../globals/Translations';
import { createErrorLog } from '../apis/ErrorApi';

export const createTodo =
  (todo: Todo, lang: Locale): AppThunk<Promise<Todo>> =>
  async (dispatch) => {
    dispatch(increaseSubmits());
    try {
      const response = await todoApi.createTodo(todo);
      dispatch(addTodo(response.data));
      dispatch(
        enqueueSnackbar(createMessage('create', 'todo', true, lang), { variant: 'success', autoHideDuration: 2000 })
      );
      return response.data;
    } catch (error) {
      createErrorLog(error);
      dispatch(
        enqueueSnackbar(createMessage('create', 'todo', false, lang), { variant: 'error', autoHideDuration: null })
      );
      throw error;
    } finally {
      dispatch(decreaseSubmits());
    }
  };

export const readTodos =
  (lang: Locale): AppThunk<Promise<Todo[]>> =>
  async (dispatch) => {
    dispatch(increaseReads());
    try {
      const response = await todoApi.readTodos();
      dispatch(setTodos(response.data));
      return response.data;
    } catch (error) {
      createErrorLog(error);
      dispatch(
        enqueueSnackbar(createMessage('read', 'todo', false, lang), { variant: 'error', autoHideDuration: null })
      );
      throw error;
    } finally {
      dispatch(decreaseReads());
    }
  };

export const updateTodo =
  (todo: Todo, lang: Locale): AppThunk<Promise<Todo>> =>
  async (dispatch) => {
    dispatch(increaseSubmits());
    try {
      const response = await todoApi.updateTodo(todo);
      dispatch(changeTodo(response.data));
      dispatch(
        enqueueSnackbar(createMessage('update', 'todo', true, lang), { variant: 'success', autoHideDuration: 2000 })
      );
      return response.data;
    } catch (error) {
      createErrorLog(error);
      dispatch(
        enqueueSnackbar(createMessage('update', 'todo', false, lang), { variant: 'error', autoHideDuration: null })
      );
      throw error;
    } finally {
      dispatch(decreaseSubmits());
    }
  };

export const deleteTodo =
  (todoId: number, lang: Locale): AppThunk<Promise<void>> =>
  async (dispatch) => {
    dispatch(increaseSubmits());
    try {
      const response = await todoApi.deleteTodo(todoId);
      dispatch(removeTodo(todoId));
      dispatch(
        enqueueSnackbar(createMessage('delete', 'todo', true, lang), { variant: 'success', autoHideDuration: 2000 })
      );
      return response.data;
    } catch (error) {
      createErrorLog(error);
      dispatch(
        enqueueSnackbar(createMessage('delete', 'todo', false, lang), { variant: 'error', autoHideDuration: null })
      );
      throw error;
    } finally {
      dispatch(decreaseSubmits());
    }
  };

export const readTodo = async (todoId: number, lang: Locale, dispatch: AppDispatch): Promise<Todo> => {
  dispatch(increaseReads());
  try {
    const response = await todoApi.readTodo(todoId);
    return response.data;
  } catch (error) {
    createErrorLog(error);
    dispatch(enqueueSnackbar(createMessage('read', 'todo', false, lang), { variant: 'error', autoHideDuration: null }));
    throw error;
  } finally {
    dispatch(decreaseReads());
  }
};
