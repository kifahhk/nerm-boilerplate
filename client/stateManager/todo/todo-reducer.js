import * as types from './todo-constant';

const initialState = [
  {
    text: 'Finish the BoilerPlate',
    completed: false,
    id: 0,
  },
];

export default function todos(state = initialState, action) {
  switch (action.type) {
    case types.ADD:
      return [{
        id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
        completed: false,
        text: action.text,
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

    case types.COMPLETE_ALL:
      const areAllMarked = state.every(todo => todo.completed);
      return state.map(todo => ({
        ...todo,
        completed: !areAllMarked,
      }));

    case types.CLEAR_COMPLETED:
      return state.filter(todo => todo.completed === false);

    default:
      return state;
  }
}
