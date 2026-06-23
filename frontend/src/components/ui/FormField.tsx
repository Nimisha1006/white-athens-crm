import { cn } from '../../lib/utils'

interface FormFieldProps {
  label: string
  value: string | number
  onChange?: (value: string) => void
  type?: 'text' | 'email' | 'tel' | 'date' | 'number'
  readOnly?: boolean
  placeholder?: string
  className?: string
  as?: 'input' | 'select' | 'textarea'
  options?: string[]
  rows?: number
}

export function FormField({
  label,
  value,
  onChange,
  type = 'text',
  readOnly = false,
  placeholder,
  className,
  as = 'input',
  options,
  rows = 3,
}: FormFieldProps) {
  const baseInput =
    'w-full rounded-xl border border-border bg-surface-muted px-3.5 py-2.5 text-sm text-text outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 disabled:cursor-not-allowed disabled:opacity-70'

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label className="text-xs font-medium tracking-wide text-text-muted uppercase">
        {label}
      </label>
      {as === 'select' && options ? (
        <select
          value={String(value)}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={readOnly}
          className={baseInput}
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : as === 'textarea' ? (
        <textarea
          value={String(value)}
          onChange={(e) => onChange?.(e.target.value)}
          readOnly={readOnly}
          placeholder={placeholder}
          rows={rows}
          className={cn(baseInput, 'resize-y min-h-[80px]')}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          readOnly={readOnly}
          placeholder={placeholder}
          className={baseInput}
        />
      )}
    </div>
  )
}
