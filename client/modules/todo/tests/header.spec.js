import React from 'react';
import sinon from 'sinon';
import { shallow, expect } from '../../../util/test-helper';
import Header from '../components/header';
import TodoInput from '../components/todo-input';

describe('Header', () => {
  let component;
  const spy = sinon.spy();
  const props = {
    addTodo: spy,
  };

  beforeEach(() => {
    component = shallow(<Header {...props} />);
  });

  it('should render correctly', () =>
    expect(component.hasClass('header')).be.true
  );

  it('should call addTodo if length of text is greater than 0', () => {
    const todoInput = component.find(TodoInput);
    expect(todoInput).to.have.length(1);
    todoInput.props().onSave('');
    expect(spy).to.have.not.been.called;
    todoInput.props().onSave('text');
    expect(spy).to.have.been.calledOnce;
  });
});
