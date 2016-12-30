import React from 'react';
import sinon from 'sinon';
import { shallow, expect } from '../../../util/test-helper';
import Header from '../components/header';

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
});
