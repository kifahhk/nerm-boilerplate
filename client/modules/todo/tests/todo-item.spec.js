import React from 'react';
import sinon from 'sinon';
import { shallow, expect } from '../../../util/test-helper';
import TodoItem from '../components/todo-item';

describe('TodoItem', () => {
  let component;
  const spy = sinon.spy();
  const props = {
    todo: {},
    editTodo: spy,
    deleteTodo: spy,
    completeTodo: spy,
  };

  beforeEach(() => {
    component = shallow(<TodoItem {...props} />);
  });

  it('should render correctly', () =>
    expect(component.find('li')).to.exist
  );
});
