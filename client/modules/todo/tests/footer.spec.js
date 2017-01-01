import React from 'react';
import sinon from 'sinon';
import { shallow, expect } from '../../../util/test-helper';
import Footer from '../components/footer';
import { SHOW_ALL, SHOW_ACTIVE } from '../../../stateManager/todo/todo-constant';

describe('Footer', () => {
  let component;
  const spy = sinon.spy();
  const props = {
    completedCount: 0,
    activeCount: 0,
    filter: SHOW_ALL,
    onShow: spy,
  };

  beforeEach(() => {
    component = shallow(<Footer {...props} />);
  });

  it('should render correctly', () =>
    expect(component.hasClass('footer')).be.true
  );

  it('should display active count correctly', () => {
    expect(component.find('.todo-count').text()).equal('No items left');
    component = shallow(<Footer {...props} activeCount={1} />);
    expect(component.find('.todo-count').text()).equal('1 item left');
  });

  it('should render filters', () => {
    const [, filters] = component.props().children;
    expect(filters.type).equal('ul');
    expect(filters.props.className).equal('filters');
    expect(filters.props.children.length).equal(3);
    filters.props.children.forEach((filter, i) => {
      expect(filter.type).equal('li');
      const a = filter.props.children;
      expect(a.props.className).equal(i === 0 ? 'selected' : '');
      expect(a.props.children).equal({
        0: 'All',
        1: 'Active',
        2: 'Completed',
      }[i]);
    });
  });

  it('should call onShow when a filter is clicked', () => {
    const [, filters] = component.props().children;
    const filterLink = filters.props.children[1].props.children;
    filterLink.props.onClick({});
    expect(spy).to.have.been.calledWith(SHOW_ACTIVE);
  });
});
