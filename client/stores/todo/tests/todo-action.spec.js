import * as types from '../todo-type';
import * as actions from '../todo-action';
import moxios from 'moxios';
import { expect, mockStore } from '../../../util/test-helper';
import { apiURL } from '../../../../config/server';


describe('Todo actions', () => {
  let store;
  const todos = [{
    text: 'Test Todo 1',
    completed: false,
    id: 0,
  }, {
    text: 'Test Todo 2',
    completed: true,
    id: 1,
  },
  ];

  beforeEach(() => {
    store = mockStore({ todos });
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should fetch Todos when getting todos has been done', (done) => {
    const expectedActions = [{
      type: types.FETCH,
      todos,
    }];

    moxios.stubRequest(`${apiURL}/todos`, {
      status: 200,
      response: { todos },
    });
    moxios.wait(() => {
      expect(store.getActions()).deep.equal(expectedActions);
      done();
    });

    store.dispatch(actions.getTodos());
  });

  it('should delete Todo and create DELETE action', (done) => {
    const expectedActions = [{
      type: types.DELETE,
      id: 0,
    }];

    moxios.stubRequest(`${apiURL}/todos/0`, {
      status: 200,
    });
    moxios.wait(() => {
      expect(store.getActions()).deep.equal(expectedActions);
      done();
    });

    store.dispatch(actions.deleteTodo(0));
  });

  it('should edit Todo and create EDIT action', (done) => {
    const expectedActions = [{
      type: types.EDIT,
      id: 1,
      text: 'Edited Todo text',
    }];

    moxios.stubRequest(`${apiURL}/todos/1`, {
      status: 200,
    });
    moxios.wait(() => {
      expect(store.getActions()).deep.equal(expectedActions);
      done();
    });

    store.dispatch(actions.editTodo(1, 'Edited Todo text'));
  });

  it('should toggle Todo and create COMPLETE action', (done) => {
    const expectedActions = [{
      type: types.COMPLETE,
      id: 0,
    }];

    moxios.stubRequest(`${apiURL}/todos/0`, {
      status: 200,
    });
    moxios.wait(() => {
      expect(store.getActions()).deep.equal(expectedActions);
      done();
    });

    store.dispatch(actions.completeTodo(0));
  });
});
