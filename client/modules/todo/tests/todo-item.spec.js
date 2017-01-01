import React from 'react';
import sinon from 'sinon';
import { shallow, expect } from '../../../util/test-helper';
import TodoItem from '../components/todo-item';
import TodoInput from '../components/todo-input';


describe('TodoItem', () => {
  let component;
  const spy = sinon.spy();
  const props = {
    todo: {
      id: 0,
      text: 'First ToDo',
      completed: false,
    },
    editTodo: spy,
    deleteTodo: spy,
    completeTodo: spy,
  };

  beforeEach(() => {
    component = shallow(<TodoItem {...props} />);
  });

  afterEach(() => spy.reset());

  it('should render correctly', () =>
    expect(component.find('li')).to.exist
  );

  it('should call completeTodo on input change', () => {
    component.find('input.toggle').simulate('change');
    expect(spy).to.have.been.calledWith(0);
  });

  it('should call deleteTodo on button Click', () => {
    component.find('button.destroy').simulate('click');
    expect(props.deleteTodo).to.have.been.calledWith(0);
  });

  it('should put component in edit state on label double click ', () => {
    component.find('label').simulate('doubleclick');
    const todoInput = component.find(TodoInput);
    expect(todoInput).to.exist;
    expect(component.props().className).equal('editing');
  });

  it('should call editTodo on TodoInput save', () => {
    component.find('label').simulate('doubleclick');
    const todoInput = component.find(TodoInput);
    todoInput.props().onSave('text');
    expect(props.editTodo).to.have.been.calledWith(0, 'text');
  });

  it('should call deleteTodo on TodoInput save if text is empty', () => {
    component.find('label').simulate('doubleclick');
    const todoInput = component.find(TodoInput);
    todoInput.props().onSave('');
    expect(props.deleteTodo).to.have.been.calledWith(0);
  });

  it('should exit component from edit state on TodoInput save', () => {
    component.find('label').simulate('doubleclick');
    const todoInput = component.find(TodoInput);
    todoInput.props().onSave('text');
    component.update(); // important to force update after changing editing state
    expect(component.props().className).equal('');
  });
});
