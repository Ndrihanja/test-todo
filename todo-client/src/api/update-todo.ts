import { API_URL } from "@/constants/env"
import type { Todo } from "./types"

export const editTodo = async (todo: Todo) => {
    const response = await fetch(`${API_URL}/todo/${todo.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(todo),
        })
        return response.json()
}