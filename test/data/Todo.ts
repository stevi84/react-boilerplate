import { Todo } from '../../src/models/Todo';

export const todo1: Todo = {
  id: 1,
  owner: 'Kerstin Barth',
  dueDate: '2022-12-24T08:00:00',
  description: 'Weihnachtsgeschenke besorgen',
  completed: true,
  tsCreate: '2022-12-01T15:02:28',
  tsUpdate: '2022-12-01T15:02:28',
};

export const todo2: Todo = {
  id: 2,
  owner: 'Kerstin Barth',
  dueDate: '2023-02-05T12:00:00',
  description: 'Geburtstag',
  completed: false,
  tsCreate: '2022-12-01T15:02:28',
  tsUpdate: '2022-12-01T15:02:28',
};

export const todo3: Todo = {
  id: 3,
  owner: 'Gabriele Barth',
  dueDate: '2023-12-24T00:00:00',
  description: 'Weihnachtsgeschenke besorgen',
  completed: true,
  tsCreate: '2022-12-01T15:02:28',
  tsUpdate: '2022-12-01T15:02:28',
};
