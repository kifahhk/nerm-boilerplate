import React from 'react';
import sinon from 'sinon';
import { renderComponent, expect } from '../../../util/test-helper';
import Header from '../components/header';

describe('Header', () => {
  let component;
  const spy = sinon.spy();
  const props = {
    addTodo: spy
  };

  beforeEach(() => {
    component = renderComponent(Header, props);
  });

  it('should render correctly', () => {
    expect(component).to.have.class('header');
  });

});
