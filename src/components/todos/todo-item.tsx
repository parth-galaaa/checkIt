'use client'

import { useState } from 'react'
import { Todo, TodoUpdate, List } from '@/lib/types/database'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2, Calendar, AlertCircle, CheckCircle2 } from 'lucide-react'
import { format } from 'date-fns'
import { motion, AnimatePresence } from 'framer-motion'
import EditTodoDialog from './edit-todo-dialog'
import { parseDateWithoutTimezone } from '@/lib/utils/date-utils'

interface TodoItemProps {
  todo: Todo
  onToggle: (completed: boolean) => void
  onUpdate: (id: string, updates: TodoUpdate) => Promise<any>
  onDelete: () => void
  selectedList?: List | null
}

const priorityConfig = {
  low: {
    border: 'border-l-4 border-l-green-500 dark:border-l-green-400',
    badge: 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400',
    icon: CheckCircle2,
  },
  medium: {
    border: 'border-l-4 border-l-yellow-500 dark:border-l-yellow-400',
    badge: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400',
    icon: AlertCircle,
  },
  high: {
    border: 'border-l-4 border-l-red-500 dark:border-l-red-400',
    badge: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400',
    icon: AlertCircle,
  },
}

export default function TodoItem({ todo, onToggle, onUpdate, onDelete, selectedList }: TodoItemProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    await onDelete()
  }

  // Handle casual lists that don't have priority
  const config = todo.priority ? priorityConfig[todo.priority] : null
  const PriorityIcon = config?.icon

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.002, y: -1 }}
        transition={{ duration: 0.15 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card
          className={`${config?.border || ''} ${isDeleting ? 'opacity-50' : ''
            } ${todo.completed ? 'bg-muted/30 dark:bg-muted/10' : 'bg-card'
            } hover:shadow-md transition-all duration-200`}
        >
          <CardContent className="p-3">
            <div className="flex items-start gap-3">
              {/* Checkbox */}
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="mt-0.5"
              >
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={(checked) => onToggle(checked as boolean)}
                  className="h-5 w-5 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                />
              </motion.div>

              {/* Content - Optimized Compact Layout */}
              <div className="flex-1 min-w-0 space-y-1">
                {/* Title Row with Priority, Date, and Actions */}
                <div className="flex items-start justify-between gap-2">
                  {/* Title */}
                  <h3
                    className={`font-semibold text-sm leading-tight transition-all flex-1 min-w-0 ${todo.completed
                      ? 'line-through text-muted-foreground'
                      : 'text-foreground'
                      }`}
                  >
                    {todo.title}
                  </h3>

                  {/* Right side: Priority, Date (stacked), and Action Buttons */}
                  <div className="flex items-start gap-2 shrink-0">
                    {/* Priority and Date Badges - Stacked Vertically */}
                    {(config && todo.priority) || todo.due_date ? (
                      <motion.div
                        className="flex flex-col items-end gap-1"
                        animate={{ x: isHovered ? -16 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {/* Priority Badge */}
                        {config && todo.priority && (
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${config.badge} flex items-center gap-1 whitespace-nowrap`}>
                            {PriorityIcon && <PriorityIcon className="h-3 w-3" />}
                            {todo.priority}
                          </span>
                        )}

                        {/* Date Badge */}
                        {todo.due_date && (
                          <span className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full whitespace-nowrap">
                            <Calendar className="h-3 w-3" />
                            {format(parseDateWithoutTimezone(todo.due_date), 'MMM dd')}
                          </span>
                        )}
                      </motion.div>
                    ) : null}

                    {/* Action Buttons - appear on hover */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          transition={{ duration: 0.2 }}
                          className="flex gap-1"
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsEditDialogOpen(true)}
                            disabled={isDeleting}
                            className="h-7 w-7 hover:bg-primary/10"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="h-7 w-7 hover:bg-destructive/10"
                          >
                            <Trash2 className="h-3.5 w-3.5 text-destructive" />
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Description - Only show if exists */}
                {todo.description && (
                  <p className={`text-xs leading-relaxed pr-2 ${todo.completed
                    ? 'text-muted-foreground/70'
                    : 'text-muted-foreground'
                    }`}>
                    {todo.description}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <EditTodoDialog
        todo={todo}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onUpdate={onUpdate}
        selectedList={selectedList}
      />
    </>
  )
}