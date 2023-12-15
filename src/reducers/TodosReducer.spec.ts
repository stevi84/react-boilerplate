import { describe, it, expect } from 'vitest';
import { Action } from 'redux';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './Store';
import { Todo } from '../models/Todo';
import { todo1, todo2, todo3 } from '../../test/data/Todo';
import {
  addTodo,
  changeTodo,
  removeTodo,
  setTodos,
  todosInitialState,
  todosReducer,
  todosSelector,
} from './TodosReducer';

describe('TodosReducer', () => {
  const todosState: Todo[] = [todo1, todo2, todo3];

  describe('todosReducer', () => {
    it('should set todos', () => {
      const oldState: Todo[] = todosInitialState;
      const newState: Todo[] = todosState;
      const action: PayloadAction<Todo[]> = setTodos(todosState);
      expect(todosReducer(oldState, action)).toEqual(newState);
    });

    it('should create todo', () => {
      const oldState: Todo[] = [todo1, todo2];
      const newState: Todo[] = todosState;
      const action: PayloadAction<Todo> = addTodo(todo3);
      expect(todosReducer(oldState, action)).toEqual(newState);
    });

    it('should update todo', () => {
      const updatedTodo: Todo = { ...todo2, owner: 'Susan Baer' };
      const oldState: Todo[] = todosState;
      const newState: Todo[] = [todo1, updatedTodo, todo3];
      const action: PayloadAction<Todo> = changeTodo(updatedTodo);
      expect(todosReducer(oldState, action)).toEqual(newState);
    });

    it('should delete todo', () => {
      const oldState: Todo[] = todosState;
      const newState: Todo[] = [todo1, todo3];
      const action: PayloadAction<number> = removeTodo(2);
      expect(todosReducer(oldState, action)).toEqual(newState);
    });

    it('should set initial state', () => {
      const oldState: Todo[] = undefined as unknown as Todo[];
      const newState: Todo[] = todosInitialState;
      const action: Action<string> = { type: '@@INIT' };
      expect(todosReducer(oldState, action)).toEqual(newState);
    });

    it('should return state on default', () => {
      const oldState: Todo[] = todosState;
      const newState: Todo[] = todosState;
      const action: Action<string> = { type: 'unknown' };
      expect(todosReducer(oldState, action)).toEqual(newState);
    });
  });

  const state: RootState = {
    todos: [todo1, todo2, todo3],
  } as RootState;

  describe('todosSelector', () => {
    it('should return todos from state', () => {
      expect(todosSelector(state)).toEqual([todo1, todo2, todo3]);
      expect(todosSelector(undefined as unknown as RootState)).toEqual([]);
      expect(todosSelector({} as RootState)).toEqual([]);
    });
  });
});
