import { Router } from 'express';
import * as TodoController from '../controllers/todo.controller';
const router = new Router();

// Get all Todos
router.get('/todos', TodoController.getTodos);

// Get todo by id
router.get('/todos/:id', TodoController.getTodo);

// Add a new todo
router.post('/todos', TodoController.addTodo);

// Delete todo by id
router.delete('/todos/:id', TodoController.deleteTodo);

// Update todo by id
router.put('/todos/:id', TodoController.updateTodo);

export default router;
