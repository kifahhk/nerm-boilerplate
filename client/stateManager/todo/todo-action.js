import * as types from './todo-constant';
import axios from 'axios';
import { apiURL } from '../../../config/server';

export const addTodo = text => {
  return (dispatch) => {
    axios.post(`${apiURL}/todos`, { todo: { text } })
      .then(response => {
        dispatch({ type: types.ADD, todo: response.data.todo });
      })
    .catch((err) => {
      console.error(err);
    });
  };
};

export const deleteTodo = id => {
  return (dispatch) => {
    axios.delete(`${apiURL}/todos/${id}`)
      .then(response => {
        dispatch({ type: types.DELETE, id });
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

export const editTodo = (id, text) => {
  return (dispatch) => {
    updateTodo(id, {text})
      .then(() => dispatch({ type: types.EDIT, id, text }));
  };
};

export const completeTodo = id => {
  return (dispatch) => {
    updateTodo(id, { completed: true })
      .then(() => dispatch({ type: types.COMPLETE, id }));
  };
};

const updateTodo = (id, todo) => {
  return new Promise(function(resolve, reject) {
    axios.put(`${apiURL}/todos/${id}`, { todo })
      .then(response => {
        resolve(response);
      })
      .catch((err) => {
        console.error(err);
        reject();
      });
    });
};
