import { Router } from "express";
import { TodoController } from "../controllers/todo.controller";

const router = Router()
const todoController = new TodoController();

router.get('/', todoController.getAll);
router.get('/:id', todoController.getById);
router.post('/', todoController.create);
router.put('/:id', todoController.updateTodo);
router.patch("/:id/status", todoController.updateTodoStatus);
router.delete('/:id', todoController.deleteTodo);

export default router;