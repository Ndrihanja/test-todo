import { Todo } from "@/api/types"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Pencil } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useState } from "react"
import {
  Command,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { editTodo } from "@/api/update-todo"

const TodoDialog = ({ todo, onUpdate }: { todo: Todo, onUpdate: () => void }) => {
  const [open, setOpen] = useState(false)
  const [openStatus, setOpenStatus] = useState(false)
  const [updateTodo, setUpdateTodo] = useState<Todo>(todo)
  const [loading, setLoading] = useState(false) 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setUpdateTodo({
        ...updateTodo,
        [e.target.name]: e.target.value
      })
  }

  const handleSubmit = async () => {
      setLoading(true)
      try {
          await editTodo(updateTodo)
          setOpen(false)
          onUpdate()
      } catch (error) {
          console.error("Erreur lors de la mise à jour :", error)
      } finally {
          setLoading(false)
      }
  }
  
  return (
      <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
              <Button size={"icon"} variant={"outline"}><Pencil/></Button>
          </DialogTrigger>
          <DialogContent>
              <DialogHeader>
                  <DialogTitle>Modifier la tâche</DialogTitle>
                  <DialogDescription>Vous pouvez modifier les champs suivants :</DialogDescription>
              </DialogHeader>
              <div className="grid items-center gap-4">
                  <Input name='title' value={updateTodo.title} onChange={handleChange} className='w-full' />
                  <textarea name="description" value={updateTodo.description} onChange={handleChange} className="border-input w-full p-2 rounded-md" />
                  
                  <div className="flex items-center space-x-4">
                      <p className="text-sm text-muted-foreground">Statut</p>
                      <Popover open={openStatus} onOpenChange={setOpenStatus}>
                          <PopoverTrigger asChild>
                              <Button variant="outline" className="w-[150px] justify-start">
                                  {updateTodo.status || "Changer statut"}
                              </Button>
                          </PopoverTrigger>
                          <PopoverContent className="p-0" side="right" align="start">
                              <Command>
                                  <CommandList>
                                      {["PENDING", "IN_PROGRESS", "COMPLETED"].map(status => (
                                          <CommandItem
                                              key={status}
                                              value={status}
                                              onSelect={() => {
                                                  setUpdateTodo({ ...updateTodo, status: status as Todo["status"] })
                                                  setOpenStatus(false)
                                              }}
                                          >
                                              {status}
                                          </CommandItem>
                                      ))}
                                  </CommandList>
                              </Command>
                          </PopoverContent>
                      </Popover>
                  </div>

                  <Button onClick={handleSubmit} className="mt-4" disabled={loading}>
                      {loading ? "Enregistrement..." : "Enregistrer"}
                  </Button>
              </div>
          </DialogContent>
      </Dialog>
  )
}

export default TodoDialog
