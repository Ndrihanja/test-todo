import { TodoStatus } from "../enum/todo-status.enum";

export class Todo {
    id: number;
    title: string;
    description: string;
    status: TodoStatus;
}