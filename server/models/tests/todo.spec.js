import { expect } from 'chai';
import request from 'supertest';
import app from '../../server';
import Todo from '../todo';

const todos = [
  new Todo({
    text: 'test Todo',
    completed: false,
  }),
  new Todo({
    text: 'old Todo',
    completed: true,
  }),
];

describe('Todo', () => {
  let addedTodo = null;

  it('should create 2 todos by calling Todo.create', (done) => {
    Todo.create(todos, (err, todos) => {
      if (err) console.warn('Unable to create todos', err);
      expect(todos.length).to.equal(2);
      done();
    });
  });

  it('should create a new todo by post to /api/todos', (done) => {
    request(app)
      .post('/api/todos')
      .send({ todo: { text: 'test text' } })
      .end((err, res) => {
        addedTodo = res.body.todo;
        expect(addedTodo);
        done();
      });
  });

  it('should get all todos by get to /api/todos', (done) => {
    request(app)
      .get('/api/todos')
      .end((err, res) => {
        expect(res.body.todos.length).to.equal(3);
        done();
      });
  });

  it('should get a todo by get to /api/todos/:id', (done) => {
    request(app)
      .get(`/api/todos/${addedTodo._id}`)
      .end((err, res) => {
        expect(res.body.todo.text).to.equal('test text');
        done();
      });
  });

  it('should update a todo by put to /api/todos/:id', (done) => {
    request(app)
      .put(`/api/todos/${addedTodo._id}`)
      .send({ todo: { text: 'new test text' } })
      .end((err, res) => {
        expect(res.body.todo.text).to.equal('new test text');
        done();
      });
  });

  it('should delete a todo by delete to /api/todos/:id', (done) => {
    request(app)
      .delete(`/api/todos/${addedTodo._id}`)
      .send({ todo: { text: 'new test text' } })
      .expect(200, done);
  });

});
