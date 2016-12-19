import * as types from './todo-constant';

export const addTodo = text => ({ type: types.ADD, text });
export const deleteTodo = id => ({ type: types.DELETE, id });
export const editTodo = (id, text) => ({ type: types.EDIT, id, text });
export const completeTodo = id => ({ type: types.COMPLETE, id });
export const completeAll = () => ({ type: types.COMPLETE_ALL });
export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED });
