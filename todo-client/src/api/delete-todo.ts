import { API_URL } from "@/constants/env"

export const deleteTodo = async (todoId: number): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/todo/${todoId}`, {
            method: "DELETE",
        })

        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`)
        }

        return true
    } catch (error) {
        console.error("Erreur lors de la suppression du todo :", error)
        return false
    }
}
