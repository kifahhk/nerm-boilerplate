import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from './components/header';
import MainSection from './components/main-section';
import * as TodoActions from '../../stores/todo/todo-action';
import 'todomvc-app-css/index.css';
import './todo.scss';

class Todo extends Component {
  constructor(props) {
    super(props);
    props.actions.getTodos();
  }

  render() {
    const { actions, todos } = this.props;

    return (
      <div className="todo-container">
        <Header addTodo={actions.addTodo} />
        <MainSection todos={todos} actions={actions} />
      </div>
    );
  }
}
Todo.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  todos: state.todo,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TodoActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todo);
