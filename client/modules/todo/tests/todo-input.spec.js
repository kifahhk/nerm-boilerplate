import React from 'react';
import sinon from 'sinon';
import { shallow, expect } from '../../../util/test-helper';
import TodoInput from '../components/todo-input';

describe('TodoInput', () => {
  let component;
  const spy = sinon.spy();
  const props = {
    onSave: spy,
    text: '',
    placeholder: '',
    editing: false,
    newTodo: false,
  };

  beforeEach(() => {
    component = shallow(<TodoInput {...props} />);
  });

  afterEach(() => spy.reset());

  it('should render correctly', () =>
    expect(component.find('input')).to.exist
  );

  it('should call onSave on return key press', () => {
    component.find('input').simulate('keyDown', { which: 13, target: { value: 'text' } });
    expect(spy).to.have.been.calledWith('text');
  });

  it('should render correctly when editing=true', () => {
    component = shallow(<TodoInput {...props} editing />);
    expect(component.props().className).equal('edit ');
  });

  it('should render correctly when newTodo=true', () => {
    component = shallow(<TodoInput {...props} newTodo />);
    expect(component.props().className).equal('new-todo');
  });

  it('should update value on change', () => {
    component.find('input').simulate('change', { target: { value: 'First ToDo' } });
    expect(component.find('input').props().value).equal('First ToDo');
  });

  it('should reset state on return key press if newTodo', () => {
    component.find('input').simulate('keyDown', { which: 13, target: { value: 'text' } });
    expect(component.find('input').props().value).equal('');
  });

  it('should call onSave on blur', () => {
    component.find('input').simulate('blur', { target: { value: 'text' } });
    expect(spy).to.have.been.calledWith('text');
  });

  it('should not call onSave on blur if newTodo', () => {
    component = shallow(<TodoInput {...props} newTodo />);
    component.find('input').simulate('blur', { target: { value: 'text' } });
    expect(spy).to.have.not.been.called;
  });
});
