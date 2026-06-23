import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface CardProps {
  children: ReactNode
  className?: string
  id?: string
}

export function Card({ children, className, id }: CardProps) {
  return (
    <section
      id={id}
      className={cn(
        'rounded-2xl border border-border bg-surface p-5 shadow-sm md:p-6',
        className,
      )}
    >
      {children}
    </section>
  )
}

interface CardHeaderProps {
  icon?: ReactNode
  title: string
  description?: string
}

export function CardHeader({ icon, title, description }: CardHeaderProps) {
  return (
    <div className="mb-5 flex items-start gap-3 border-b border-border pb-4">
      {icon && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-600/20 dark:text-brand-100">
          {icon}
        </div>
      )}
      <div>
        <h2 className="text-base font-semibold text-text">{title}</h2>
        {description && (
          <p className="mt-0.5 text-sm text-text-muted">{description}</p>
        )}
      </div>
    </div>
  )
}
