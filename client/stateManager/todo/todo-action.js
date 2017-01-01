import * as types from './todo-constant';
import axios from 'axios';
import { apiURL } from '../../../config/server';

export const getTodos = () => {
  return (dispatch) => {
    axios.get(`${apiURL}/todos`)
      .then(response => {
        dispatch({ type: types.FETCH, todos: response.data.todos });
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

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
        if (response.status === 200) {
          dispatch({ type: types.DELETE, id });
        } else {
          console.error('server error');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

const updateTodo = (id, todo) => {
  return new Promise((resolve, reject) => {
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

export const editTodo = (id, text) => {
  return (dispatch) => {
    updateTodo(id, { text })
      .then(() => dispatch({ type: types.EDIT, id, text }));
  };
};

export const completeTodo = id => {
  return (dispatch) => {
    updateTodo(id, { completed: true })
      .then(() => dispatch({ type: types.COMPLETE, id }));
  };
};
