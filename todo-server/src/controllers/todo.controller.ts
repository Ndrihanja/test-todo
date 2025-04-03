import { NextFunction, Request, Response } from "express";
import { TodoService } from "../services/todo.service";
import { TodoStatus } from "../enum/todo-status.enum";
import { Todo } from "../entities/Todo.entity";

const todoService = new TodoService


export class TodoController {

    public create(req:Request, res: Response, next: NextFunction) {
        const data = req.body

        if(!data) {
            res.status(400).send('');
            return;
        }
        const newTodo = TodoService.createTodo(data);
        res.status(201).json(newTodo);

    }

    public getAll(req: Request ,res: Response): void{
        const todos = TodoService.getAll();
         res.json(todos);
    }

    public  getById(req: Request,  res: Response){
        const {id} = req.params;
        const todo = TodoService.getById(parseInt(id))
        if(!todo) {
            res.status(404).send('Todo non trouvé');
            return;
        }

        res.json(todo)
    }

    public deleteTodo(req: Request, res: Response){
        const {id} = req.params;
        const deleted = TodoService.delete(parseInt(id));

        if(!deleted) {
            res.status(404).send("La tâche n'existe pas");
            return ;
        }

        res.status(204).send("La tâche est supprimer avec success");

    }

    public updateTodo(req: Request, res: Response): void {
        const {id} = req.params;
        const updateTodo = TodoService.update(parseInt(id), req.body as Todo);
        if(!updateTodo)  res.status(404).json({message: "La tâche est introuvable"});
        res.json(updateTodo);
    }

    public updateTodoStatus(req: Request, res: Response): void {
        const id = parseInt(req.params.id);
        const { status } = req.body;
      
        if (!Object.values(TodoStatus).includes(status as TodoStatus)) {
           res.status(400).json({ message: "Status invalid" });
        }
      
        const updatedTodo = TodoService.updateStatus(id, status as TodoStatus);
        if (!updatedTodo)  res.status(404).json({ message: "Tâche introuvable" });
      
        res.json(updatedTodo);
      }
}