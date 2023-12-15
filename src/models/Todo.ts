import { BaseEntity } from './BaseEntity';

export interface Todo extends BaseEntity {
  owner: string;
  dueDate: string;
  description: string;
  completed: boolean;
}

export const getEmptyTodo = (): Todo => ({
  id: 0,
  tsCreate: '',
  tsUpdate: '',
  owner: '',
  dueDate: '',
  description: '',
  completed: false,
});
