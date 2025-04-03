import { API_URL } from "@/constants/env"
import type { Todo } from "./types"

export const addTodo = async (todo: Omit<Todo, "id">): Promise<Todo | null> => {
    try {
        const response = await fetch(`${API_URL}/todo`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(todo),
        })

        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Erreur lors de l'ajout du todo :", error)
        return null
    }
}
