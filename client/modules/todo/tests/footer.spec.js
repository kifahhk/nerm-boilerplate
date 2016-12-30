import React from 'react';
import sinon from 'sinon';
import { shallow, expect } from '../../../util/test-helper';
import Footer from '../components/footer';

describe('Footer', () => {
  let component;
  const spy = sinon.spy();
  const props = {
    completedCount: 0,
    activeCount: 0,
    filter: '',
    onShow: spy,
  };

  beforeEach(() => {
    component = shallow(<Footer {...props} />);
  });

  it('should render correctly', () =>
    expect(component.hasClass('footer')).be.true
  );
});
