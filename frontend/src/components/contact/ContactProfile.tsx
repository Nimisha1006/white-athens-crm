import { useCallback, useState } from 'react'
import { mockContact } from '../../data/mockContact'
import type { Contact } from '../../types/contact'
import { useTheme } from '../../context/ThemeContext'
import { AppShell, ContactHeader } from './ContactHeader'
import {
  PersonalInfoSection,
  ContactInfoSection,
  AddressSection,
  ProfessionalSection,
  IdentificationSection,
} from './ContactSections'
import {
  EngagementSection,
  MarketingSection,
  SocialSection,
  NotesSection,
  AuditSection,
} from './ContactEngagementSections'

export function ContactProfile() {
  const { theme, toggleTheme } = useTheme()
  const [contact, setContact] = useState<Contact>(mockContact)
  const [isEditing, setIsEditing] = useState(false)
  const [savedSnapshot, setSavedSnapshot] = useState<Contact>(mockContact)

  const handleChange = useCallback((updates: Partial<Contact>) => {
    setContact((prev) => ({ ...prev, ...updates }))
  }, [])

  const handleSave = () => {
    setSavedSnapshot(contact)
    setIsEditing(false)
  }

  const handleEdit = () => setIsEditing(true)

  const handleDelete = () => {
    if (window.confirm('Soft delete this contact? The record will be archived.')) {
      setContact((prev) => ({
        ...prev,
        status: 'Archived',
        audit: {
          ...prev.audit,
          status: 'Archived',
          modifiedBy: 'Current User',
          modifiedDate: new Date().toISOString(),
        },
      }))
      setIsEditing(false)
    }
  }

  const handleCancelEdit = () => {
    setContact(savedSnapshot)
    setIsEditing(false)
  }

  return (
    <AppShell theme={theme} onToggleTheme={toggleTheme}>
      <ContactHeader
        contact={contact}
        isEditing={isEditing}
        onSave={handleSave}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <main className="mx-auto max-w-7xl space-y-5 px-4 py-6 md:px-6 md:py-8">
        {isEditing && (
          <div className="flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-900 dark:bg-amber-950/40">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              You are editing this contact. Changes are not saved until you click Save.
            </p>
            <button
              type="button"
              onClick={handleCancelEdit}
              className="text-sm font-medium text-amber-700 underline hover:no-underline dark:text-amber-300"
            >
              Cancel
            </button>
          </div>
        )}

        <div className="grid gap-5 lg:grid-cols-3">
          <div className="space-y-5 lg:col-span-2">
            <PersonalInfoSection
              contact={contact}
              isEditing={isEditing}
              onChange={handleChange}
            />
            <ContactInfoSection
              contact={contact}
              isEditing={isEditing}
              onChange={handleChange}
            />
            <AddressSection contact={contact} isEditing={isEditing} onChange={handleChange} />
            <ProfessionalSection
              contact={contact}
              isEditing={isEditing}
              onChange={handleChange}
            />
            <IdentificationSection
              contact={contact}
              isEditing={isEditing}
              onChange={handleChange}
            />
            <NotesSection contact={contact} isEditing={isEditing} onChange={handleChange} />
          </div>

          <div className="space-y-5">
            <EngagementSection
              contact={contact}
              isEditing={isEditing}
              onChange={handleChange}
            />
            <MarketingSection
              contact={contact}
              isEditing={isEditing}
              onChange={handleChange}
            />
            <SocialSection contact={contact} isEditing={isEditing} onChange={handleChange} />
            <AuditSection contact={contact} />
          </div>
        </div>
      </main>
    </AppShell>
  )
}
