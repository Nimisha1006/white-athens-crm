import {
  Mail,
  Phone,
  MessageCircle,
  Save,
  Pencil,
  Trash2,
  User,
  MapPin,
  Briefcase,
  Fingerprint,
  Activity,
  Megaphone,
  Share2,
  StickyNote,
  Clock,
  Moon,
  Sun,
} from 'lucide-react'
import type { Contact } from '../../types/contact'
import { Button } from '../ui/Button'
import { StatusBadge } from '../ui/Badge'
import { cn } from '../../lib/utils'

interface ContactHeaderProps {
  contact: Contact
  isEditing: boolean
  onSave: () => void
  onEdit: () => void
  onDelete: () => void
}

function getInitials(name: string) {
  return name
    .replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.)\s*/i, '')
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function ContactHeader({
  contact,
  isEditing,
  onSave,
  onEdit,
  onDelete,
}: ContactHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-4 md:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div
              className={cn(
                'flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-xl font-bold text-white shadow-md',
                'bg-gradient-to-br from-brand-600 to-brand-700',
              )}
            >
              {contact.profilePicture ? (
                <img
                  src={contact.profilePicture}
                  alt={contact.fullName}
                  className="h-full w-full rounded-2xl object-cover"
                />
              ) : (
                getInitials(contact.fullName)
              )}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-bold text-text md:text-2xl">
                  {contact.fullName}
                </h1>
                <StatusBadge status={contact.status} />
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-muted">
                <span className="font-mono">{contact.id}</span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1">
                  <Megaphone className="h-3.5 w-3.5" />
                  {contact.sourceChannel}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {isEditing ? (
              <Button variant="primary" icon={<Save className="h-4 w-4" />} onClick={onSave}>
                Save
              </Button>
            ) : (
              <Button variant="primary" icon={<Pencil className="h-4 w-4" />} onClick={onEdit}>
                Edit
              </Button>
            )}
            <Button variant="danger" icon={<Trash2 className="h-4 w-4" />} onClick={onDelete}>
              Delete
            </Button>
            <Button
              variant="outline"
              icon={<Mail className="h-4 w-4" />}
              onClick={() => window.open(`mailto:${contact.emailAddress}`)}
            >
              <span className="hidden sm:inline">Send Email</span>
            </Button>
            <Button
              variant="outline"
              icon={<Phone className="h-4 w-4" />}
              onClick={() => window.open(`tel:${contact.mobileNumber.replace(/\s/g, '')}`)}
            >
              <span className="hidden sm:inline">Call</span>
            </Button>
            <Button
              variant="outline"
              icon={<MessageCircle className="h-4 w-4" />}
              onClick={() =>
                window.open(
                  `https://wa.me/${contact.mobileNumber.replace(/\D/g, '')}`,
                  '_blank',
                )
              }
            >
              <span className="hidden sm:inline">WhatsApp</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

interface AppShellProps {
  children: React.ReactNode
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export function AppShell({ children, theme, onToggleTheme }: AppShellProps) {
  return (
    <div className="min-h-screen bg-surface-muted">
      <div className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
              WA
            </div>
            <div>
              <p className="text-sm font-semibold text-text">White Athens CRM</p>
              <p className="text-xs text-text-muted">Contact Management</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onToggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface-muted text-text-muted transition hover:text-text"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {children}
    </div>
  )
}

export const sectionIcons = {
  personal: User,
  contact: Phone,
  address: MapPin,
  professional: Briefcase,
  identification: Fingerprint,
  engagement: Activity,
  marketing: Megaphone,
  social: Share2,
  notes: StickyNote,
  audit: Clock,
}
