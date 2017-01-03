import * as types from './todo-type';

const initialState = [];

export default function todos(state = initialState, action) {
  switch (action.type) {
    case types.FETCH:
      return [
        ...action.todos.map(todo => {
          return {
            ...todo,
            id: todo._id,
          };
        }),
        ...state,
      ];

    case types.ADD:
      return [{
        id: action.todo._id,
        completed: false,
        text: action.todo.text,
      },
        ...state,
      ];

    case types.DELETE:
      return state.filter(todo =>
        todo.id !== action.id
      );

    case types.EDIT:
      return state.map(todo => {
        return todo.id === action.id ?
          { ...todo, text: action.text } :
          todo;
      });

    case types.COMPLETE:
      return state.map(todo => {
        return todo.id === action.id ?
          { ...todo, completed: !todo.completed } :
          todo;
      });

    default:
      return state;
  }
}
