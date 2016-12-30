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

  it('should render correctly', () =>
    expect(component.find('input')).to.exist
  );
});
