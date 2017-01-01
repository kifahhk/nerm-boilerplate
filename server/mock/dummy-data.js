import Todo from '../models/todo';

export const todos = [
  new Todo({
    text: 'test Todo',
    completed: false,
  }),
  new Todo({
    text: 'old Todo',
    completed: true,
  }),
];
