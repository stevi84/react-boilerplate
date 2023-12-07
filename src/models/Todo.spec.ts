import { describe, it, expect } from 'vitest';
import { getEmptyTodo, Todo } from './Todo';

describe('Todo', () => {
  describe('getEmptyTodo', () => {
    it('should return empty todo', () => {
      const emptyTodo: Todo = {
        id: 0,
        tsCreate: '',
        tsUpdate: '',
        owner: '',
        dueDate: '',
        description: '',
        completed: false,
      };
      expect(getEmptyTodo()).toEqual(emptyTodo);
    });
  });
});
