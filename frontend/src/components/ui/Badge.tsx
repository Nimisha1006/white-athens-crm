import { cn } from '../../lib/utils'
import type { ContactStatus } from '../../types/contact'

const statusStyles: Record<ContactStatus, string> = {
  Active:
    'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
  Inactive: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
  Prospect:
    'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
  Archived: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300',
}

interface BadgeProps {
  status: ContactStatus
  className?: string
}

export function StatusBadge({ status, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase',
        statusStyles[status],
        className,
      )}
    >
      {status}
    </span>
  )
}
