import { TodoStatus } from "../enum/todo-status.enum";

export class UpdateTodoDto {
    title?: string;
    description?: string;
    status?: TodoStatus;
  }