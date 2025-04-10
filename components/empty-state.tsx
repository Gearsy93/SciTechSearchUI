import type React from "react"
import { SearchX } from "lucide-react"

interface EmptyStateProps {
  title: string
  description?: string
  icon?: React.ReactNode
  action?: React.ReactNode
}

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-surface-container">
        {icon || <SearchX className="h-10 w-10 text-muted-foreground" />}
      </div>
      <h3 className="md-headline-small mb-2">{title}</h3>
      {description && <p className="md-body-medium text-muted-foreground mb-6 max-w-md">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}
