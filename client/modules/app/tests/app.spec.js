import React from 'react';
import { shallow, expect } from '../../../util/test-helper';
import App from '../app';

describe('App', () => {
  let component;

  beforeEach(() => {
    component = shallow(<App />);
  });

  it('should has container', () => {
    expect(component.find('.container').length).to.equal(1);
  });

});
