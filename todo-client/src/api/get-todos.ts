import { API_URL } from "@/constants/env"
import type { Todo } from "./types"

export const getTodos = async (): Promise<Todo[]> => {
  try {
    const response = await fetch(`${API_URL}/todo`)
    if (!response.ok) throw new Error("Erreur lors de la récupération des todos")
    return await response.json()
  } catch (error) {
    console.error(error)
    return []
  }
}