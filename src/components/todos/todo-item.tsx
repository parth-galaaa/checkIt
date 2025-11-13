'use client'

import { useState } from 'react'
import { Todo, TodoUpdate } from '@/lib/types/database'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2, Calendar } from 'lucide-react'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import EditTodoDialog from './edit-todo-dialog'

interface TodoItemProps {
  todo: Todo
  onToggle: (completed: boolean) => void
  onUpdate: (id: string, updates: TodoUpdate) => Promise<any>
  onDelete: () => void
}

const priorityColors = {
  low: 'border-l-4 border-l-green-500',
  medium: 'border-l-4 border-l-yellow-500',
  high: 'border-l-4 border-l-red-500',
}

export default function TodoItem({ todo, onToggle, onUpdate, onDelete }: TodoItemProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    await onDelete()
  }

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        <Card className={`${priorityColors[todo.priority]} ${isDeleting ? 'opacity-50' : ''}`}>
          <CardContent className="flex items-start gap-4 p-4">
            <div className="flex items-start gap-3 flex-1">
              <Checkbox
                checked={todo.completed}
                onCheckedChange={(checked) => onToggle(checked as boolean)}
                className="mt-1"
              />
              <div className="flex-1 space-y-1">
                <h3
                  className={`font-medium ${
                    todo.completed ? 'line-through text-muted-foreground' : ''
                  }`}
                >
                  {todo.title}
                </h3>
                {todo.description && (
                  <p className="text-sm text-muted-foreground">{todo.description}</p>
                )}
                <div className="flex flex-wrap gap-2 items-center text-xs text-muted-foreground">
                  <span
                    className={`px-2 py-1 rounded-full ${
                      todo.priority === 'high'
                        ? 'bg-red-100 text-red-700'
                        : todo.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {todo.priority}
                  </span>
                  {todo.due_date && (
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {format(new Date(todo.due_date), 'MMM dd, yyyy')}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditDialogOpen(true)}
                disabled={isDeleting}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <EditTodoDialog
        todo={todo}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onUpdate={onUpdate}
      />
    </>
  )
}
