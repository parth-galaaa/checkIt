'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTodos } from '@/lib/hooks/use-todos'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Loader2 } from 'lucide-react'
import TodoItem from './todo-item'
import AddTodoDialog from './add-todo-dialog'

export default function TodoList() {
  const { todos, loading, addTodo, updateTodo, deleteTodo, toggleTodo } = useTodos()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const activeTodos = todos.filter((t) => !t.completed).length
  const completedTodos = todos.filter((t) => t.completed).length

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Todos</h1>
          <p className="text-muted-foreground mt-1">
            {activeTodos} active, {completedTodos} completed
          </p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Todo
        </Button>
      </div>

      <div className="flex gap-2">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          All ({todos.length})
        </Button>
        <Button
          variant={filter === 'active' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('active')}
        >
          Active ({activeTodos})
        </Button>
        <Button
          variant={filter === 'completed' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('completed')}
        >
          Completed ({completedTodos})
        </Button>
      </div>

      {filteredTodos.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center space-y-2">
              <h3 className="font-semibold text-lg">No todos yet</h3>
              <p className="text-sm text-muted-foreground">
                {filter === 'all'
                  ? 'Get started by adding your first todo'
                  : filter === 'active'
                  ? 'No active todos. Great job!'
                  : 'No completed todos yet'}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredTodos.map((todo) => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.2 }}
              >
                <TodoItem
                  todo={todo}
                  onToggle={(completed) => toggleTodo(todo.id, completed)}
                  onUpdate={updateTodo}
                  onDelete={() => deleteTodo(todo.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <AddTodoDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAdd={addTodo}
      />
    </div>
  )
}
