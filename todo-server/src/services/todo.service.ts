import { todo } from "node:test";
import { Todo } from "../entities/Todo.entity";
import { CreateTodoDto } from "../dtos/create-todo.dto";
import { TodoStatus } from "../enum/todo-status.enum";

let todos: Todo[] = [
    {id:1, title: "Tâche 1", description: "Test description", status: TodoStatus.PENDING },
    {id:2, title: "Tâche 2", description: "Test2 description", status: TodoStatus.IN_PROGRESS },
    {id:3, title: "Tâche3", description: "Test3 description", status: TodoStatus.COMPLETED },
]

export class TodoService {

    public static createTodo(data: CreateTodoDto): Todo {
        const newTodo: Todo = {
            id: data.id,
            title: data.title,
            description: data.description,
            status: TodoStatus.PENDING
        }
        todos.push(newTodo);
        return newTodo;
        
    }

    public static getAll(): Todo[]  {
        return todos;
    }

    public static getById(id: number): Todo | null {
        const todo = todos.find(todo => todo.id === id) || null;
        return todo;
    }

    public static update(id: number, data: Todo): Todo | null {
        const todo = todos.find(t => t.id === id);
        if(!todo) return null;

        todo.title = data.title;
        todo.description = data.description;
        todo.status = data.status;
        
        return todo;
    }

    public static updateStatus(id: number, status: TodoStatus): Todo | null {
        const todo = todos.find(t => t.id === id);
        if (!todo) return null;
        todo.status = status;
        return todo;
    }

    public static delete(id: number): boolean {
        const todoToDelete = todos.findIndex((t) => t.id === id);
        if(todoToDelete !== -1) {
            todos.splice(todoToDelete,1);
            return true;
        }

        return true;
    }

}