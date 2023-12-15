import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../models/Todo';
import { RootState } from './Store';

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

export const todosSelector = (state: RootState): Todo[] => state?.todos || [];
