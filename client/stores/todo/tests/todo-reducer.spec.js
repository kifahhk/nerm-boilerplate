import todos from '../todo-reducer';
import { expect } from '../../../util/test-helper';
import * as types from '../todo-type';

describe('Todo reducer', () => {
  const testTodos = [{
    text: 'Test Todo 1',
    _id: 0,
  }, {
    text: 'Test Todo 2',
    _id: 1,
  }];

  const storeTodos = [{
    text: 'Test Todo 1',
    completed: false,
    id: 0,
  }, {
    text: 'Test Todo 2',
    completed: true,
    id: 1,
  }];

  it('should handle initial state', () => {
    expect(todos(undefined, {})).to.be.empty;
  });

  it('should handle ADD', () => {
    expect(todos([], {
      type: types.ADD,
      todo: testTodos[0],
    })).deep.equal([{
      completed: false,
      text: testTodos[0].text,
      id: testTodos[0]._id,
    },
    ]);
  });

  it('should handle FETCH/GET', () => {
    expect(todos([], {
      type: types.FETCH,
      todos: testTodos,
    })).deep.equal([{
      ...testTodos[0],
      id: testTodos[0]._id,
    }, {
      ...testTodos[1],
      id: testTodos[1]._id,
    },
    ]);
  });

  it('should handle DELETE', () => {
    expect(
      todos(storeTodos, {
        type: types.DELETE,
        id: 1,
      })
    ).deep.equal([
      storeTodos[0],
    ]);
  });

  it('should handle EDIT', () => {
    expect(
      todos(storeTodos, {
        type: types.EDIT,
        text: 'text edited',
        id: 0,
      })
    ).deep.equal([
      {
        text: 'text edited',
        completed: false,
        id: 0,
      }, storeTodos[1],
    ]);
  });

  it('should handle COMPLETE', () => {
    expect(
      todos(storeTodos, {
        type: types.COMPLETE,
        id: 0,
      })
    ).deep.equal([
      {
        text: 'Test Todo 1',
        completed: true,
        id: 0,
      }, storeTodos[1],
    ]);
    expect(
      todos(storeTodos, {
        type: types.COMPLETE,
        id: 1,
      })
    ).deep.equal([
      storeTodos[0],
      {
        text: 'Test Todo 2',
        completed: false,
        id: 1,
      },
    ]);
  });
});
