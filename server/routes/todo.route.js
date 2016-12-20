import { Router } from 'express';
import * as TodoController from '../controllers/todo.controller';
const router = new Router();

// Get all Todos
router.route('/todos').get(TodoController.getTodos);

// Get todo by id
router.route('/todos/:id').get(TodoController.getTodo);

// Add a new todo
router.route('/todos').post(TodoController.addTodo);

// Delete todo by id
router.route('/todos/:id').delete(TodoController.deleteTodo);

// Update todo by id
router.route('/todos/:id').put(TodoController.updateTodo);

export default router;
