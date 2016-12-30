import React from 'react';
import { shallow, expect } from '../../../util/test-helper';
import MainSection from '../components/main-section';
import * as actions from '../../../stateManager/todo/todo-action';

describe('MainSection', () => {
  let component;
  const props = {
    todos: [],
    actions,
  };

  beforeEach(() => {
    component = shallow(<MainSection {...props} />);
  });

  it('should render correctly', () =>
    expect(component.find('.main').length).to.equal(1)
  );
});
