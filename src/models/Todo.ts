import { Components } from '../apis/api';

export type Todo = Components.Schemas.Todo;

export const getEmptyTodo = (): Todo => ({
  id: 0,
  tsCreate: '',
  tsUpdate: '',
  owner: '',
  dueDate: '',
  description: '',
  completed: false,
});
