import { useEffect, useState } from 'react'
import { Input } from './components/ui/input'
import { Button } from './components/ui/button'
import { Plus } from 'lucide-react'
import { cn } from './lib/utils'
import type { Todo } from './api/types'
import TodoComponent from "./components/todo"
import { getTodos } from './api/get-todos'
import { addTodo } from './api/add-todo'

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState<Omit<Todo, 'id'>>({
    title: '',
    description: '',
    status: "PENDING"
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchTodos = async () => {
      const data = await getTodos()
      setTodos(data)
    }
    fetchTodos()
  }, [])

  const handleSubmit = async () => {
    if (!newTodo.title.trim()) {
      alert("Le titre ne peut pas être vide.")
      return
    }

    setLoading(true)

    try {
      const addedTodo = await addTodo(newTodo)
      if (addedTodo) {
        setTodos(prevTodos => [addedTodo, ...prevTodos])
        setNewTodo({ title: '', description: '', status: "PENDING" })
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du todo :", error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewTodo({
      ...newTodo,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className='container mx-auto max-w-5xl space-y-5 p-6'>
      <h1 className='text-3xl font-bold'>Todo App</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center gap-2">
          <Input 
            name='title' 
            value={newTodo.title} 
            placeholder='Ajouter une tâche' 
            onChange={handleChange} 
            className='w-full'  
          />
          <textarea 
            name="description" 
            placeholder='Description' 
            value={newTodo.description} 
            onChange={handleChange} 
           className={cn(
                   "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                   "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                   "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
           )}
          />
          <Button onClick={handleSubmit} disabled={loading} className='w-full'>
            {loading ? "Ajout..." : <><Plus/> Ajouter</>}
          </Button>
        </div>
        <div className="flex flex-col gap-2 col-span-2">
          {todos.length > 0 ? (
            todos.map(todo => <TodoComponent key={todo.id} todo={todo} onDelete={() => window.location.reload()} />)
          ) : (
            <p>Aucun todo trouvé.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
