import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from './components/header';
import MainSection from './components/main-section';
import * as TodoActions from '../../stateManager/todo/todo-action';
import 'todomvc-app-css/index.css';
import './todo.scss';

const Todo = ({todos, actions}) => (
  <div className="todo-container">
    <Header addTodo={actions.addTodo} />
    <MainSection todos={todos} actions={actions} />
  </div>
);

Todo.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  todos: state.todos
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TodoActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todo)
