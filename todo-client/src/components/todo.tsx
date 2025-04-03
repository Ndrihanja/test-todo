import type { Todo } from '@/api/types'
import { Button } from './ui/button'
import { Trash } from 'lucide-react'
import TodoDialog from './todo-dialog'
import { cn } from '@/lib/utils'
import { deleteTodo } from '@/api/delete-todo'
import { useState } from 'react'

const Todo = ({ todo, onDelete }: { todo: Todo, onDelete: (id: number) => void }) => {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (loading) return
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?")) return

    setLoading(true)
    const success = await deleteTodo(todo.id)
    if (success) {
      onDelete(todo.id)
    }
    setLoading(false)
  }

  return (
    <div className="flex items-center justify-between p-4 border rounded-md">
      <div className="grid gap-1">
        <div className={cn("size-3 rounded-full", todo.status === "PENDING" ? "bg-yellow-500" : todo.status === "COMPLETED" ? "bg-green-500" : "bg-blue-500")}/>
        <h6>{todo.title}</h6>
        <p className="text-foreground/50 text-sm italic">{todo.description}</p>
      </div>
      <div className="flex gap-2">
        <TodoDialog todo={todo} onUpdate={() => window.location.reload()} />
        <Button variant="outline" size="icon" onClick={handleDelete} disabled={loading}>
          {loading ? "..." : <Trash />}
        </Button>
      </div>
    </div>
  )
}

export default Todo
