import Todo from '../models/todo';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all todos
 * @param req
 * @param res
 * @returns void
 */
export function getTodos(req, res) {
  Todo.find().sort('-created-date').exec((err, todos) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ todos });
  });
}

/**
 * Add a todo
 * @param req
 * @param res
 * @returns void
 */
export function addTodo(req, res) {
  if (!req.body.todo || !req.body.todo.text) {
    res.status(403).end();
  }

  const newTodo = new Todo(req.body.todo);

  // Let's sanitize inputs
  newTodo.text = sanitizeHtml(newTodo.text);
  newTodo.completed = sanitizeHtml(newTodo.completed);
  newTodo.slug = slug(newTodo.text.toLowerCase(), { lowercase: true });
  newTodo.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ todo: saved });
  });
}

/**
 * Get a single todo
 * @param req
 * @param res
 * @returns void
 */
export function getTodo(req, res) {
  Todo.findOne({ _id: req.params.id }).exec((err, todo) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ todo });
  });
}

/**
 * update a todo
 * @param req
 * @param res
 * @returns void
 */
export function updateTodo(req, res) {
  Todo.findOneAndUpdate({ _id: req.params.id }, req.body.todo, { upsert: false }).exec((err, todo) => {
    if (err) {
      res.status(500).send(err);
    }
    if (!todo) {
      res.status(422).send({ error: 'this todo does not exist' });
    }
    res.json({ todo: { ...req.body.todo, ...todo } }); // return new values (updated Todo)
  });
}

/**
 * Delete a todo
 * @param req
 * @param res
 * @returns void
 */
export function deleteTodo(req, res) {
  Todo.findOne({ _id: req.params.id }).exec((err, todo) => {
    if (err) {
      res.status(500).send(err);
    }
    if (!todo) {
      res.status(422).send({ error: 'this todo does not exist' });
    }
    todo.remove(() => {
      res.status(200).end();
    });
  });
}
