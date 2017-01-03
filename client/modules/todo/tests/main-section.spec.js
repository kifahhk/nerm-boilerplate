import React from 'react';
import sinon from 'sinon';
import { shallow, expect } from '../../../util/test-helper';
import MainSection from '../components/main-section';
import Footer from '../components/footer';
import TodoItem from '../components/todo-item';
import { SHOW_ALL, SHOW_COMPLETED } from '../../../stateManager/todo/todo-type';

describe('MainSection', () => {
  let component;
  const spy = sinon.spy();
  const props = {
    todos: [
      {
        text: 'Use Redux',
        completed: false,
        id: 0,
      }, {
        text: 'Run the tests',
        completed: true,
        id: 1,
      },
    ],
    actions: {
      editTodo: spy,
      deleteTodo: spy,
      completeTodo: spy,
    },
  };

  beforeEach(() => {
    component = shallow(<MainSection {...props} />);
  });

  afterEach(() => spy.reset());

  it('should render correctly', () =>
    expect(component.find('.main').length).to.equal(1)
  );

  it('should render footer with show all filter set', () => {
    const footer = component.find(Footer);
    expect(footer).to.exist;
    expect(footer.props().completedCount).equal(1);
    expect(footer.props().activeCount).equal(1);
    expect(footer.props().filter).equal(SHOW_ALL);
  });

  it('onShow should set the filter', () => {
    const footer = component.find(Footer);
    footer.props().onShow(SHOW_COMPLETED);
    component.update();
    const updatedFooter = component.find(Footer);
    expect(updatedFooter.props().filter).equal(SHOW_COMPLETED);
  });

  it('should render items list', () => {
    const list = component.find('ul');
    expect(list).to.exist;
    expect(list.props().children.length).equal(2);
    list.props().children.forEach((item, i) => {
      expect(item.type).equal(TodoItem);
      expect(item.props.todo).equal(props.todos[i]);
    });
  });

  it('should filter items', () => {
    const footer = component.find(Footer);
    footer.props().onShow(SHOW_COMPLETED);
    component.update();
    const updatedList = component.find('ul');
    expect(updatedList.props().children.length).equal(1);
    expect(updatedList.props().children[0].props.todo).equal(props.todos[1]);
  });
});
