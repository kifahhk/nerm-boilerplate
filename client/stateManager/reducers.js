// root reducer
import { combineReducers } from 'redux';
import todos from './todo/todo-reducer';

// Combine all reducers into one root reduce
export default combineReducers({
  todos,
});
