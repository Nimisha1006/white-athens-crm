import type { Contact } from '../../types/contact'
import { Card, CardHeader } from '../ui/Card'
import { FormField } from '../ui/FormField'
import { Toggle } from '../ui/Toggle'
import { cn } from '../../lib/utils'
import { sectionIcons } from './ContactHeader'
import {
  LinkedInIcon,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YouTubeIcon,
  TelegramIcon,
  DiscordIcon,
  WebsiteIcon,
} from '../icons/SocialIcons'

interface SectionProps {
  contact: Contact
  isEditing: boolean
  onChange: (updates: Partial<Contact>) => void
}

function EngagementCard({
  label,
  value,
}: {
  label: string
  value: boolean
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center rounded-2xl border p-5 text-center transition',
        value
          ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/50'
          : 'border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/50',
      )}
    >
      <div
        className={cn(
          'mb-3 flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold',
          value
            ? 'bg-emerald-500 text-white'
            : 'bg-red-400 text-white',
        )}
      >
        {value ? '✓' : '✗'}
      </div>
      <p className="text-sm font-medium text-text">{label}</p>
      <p
        className={cn(
          'mt-1 text-xs font-semibold uppercase tracking-wide',
          value ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-600 dark:text-red-400',
        )}
      >
        {value ? 'Yes' : 'No'}
      </p>
    </div>
  )
}

export function EngagementSection({ contact, isEditing, onChange }: SectionProps) {
  const Icon = sectionIcons.engagement

  const updateEngagement = (field: keyof Contact['engagement'], value: boolean) => {
    onChange({ engagement: { ...contact.engagement, [field]: value } })
  }

  return (
    <Card id="engagement">
      <CardHeader
        icon={<Icon className="h-4 w-4" />}
        title="Engagement Dashboard"
        description="Customer interaction metrics at a glance"
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <EngagementCard label="Talked" value={contact.engagement.talked} />
        <EngagementCard label="Met" value={contact.engagement.met} />
        <EngagementCard label="Responded" value={contact.engagement.responded} />
      </div>
      {isEditing && (
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <Toggle
            label="Talked"
            checked={contact.engagement.talked}
            onChange={(v) => updateEngagement('talked', v)}
          />
          <Toggle
            label="Met"
            checked={contact.engagement.met}
            onChange={(v) => updateEngagement('met', v)}
          />
          <Toggle
            label="Responded"
            checked={contact.engagement.responded}
            onChange={(v) => updateEngagement('responded', v)}
          />
        </div>
      )}
    </Card>
  )
}

export function MarketingSection({ contact, isEditing, onChange }: SectionProps) {
  const Icon = sectionIcons.marketing

  const updatePref = (field: keyof Contact['marketingPreferences'], value: boolean) => {
    onChange({
      marketingPreferences: { ...contact.marketingPreferences, [field]: value },
    })
  }

  return (
    <Card id="marketing">
      <CardHeader
        icon={<Icon className="h-4 w-4" />}
        title="Marketing Preferences"
        description="Communication consent and DND settings"
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <Toggle
          label="Email Consent"
          description="Allow promotional emails"
          checked={contact.marketingPreferences.emailConsent}
          onChange={(v) => updatePref('emailConsent', v)}
          disabled={!isEditing}
        />
        <Toggle
          label="SMS Consent"
          description="Allow text message updates"
          checked={contact.marketingPreferences.smsConsent}
          onChange={(v) => updatePref('smsConsent', v)}
          disabled={!isEditing}
        />
        <Toggle
          label="WhatsApp Consent"
          description="Allow WhatsApp communications"
          checked={contact.marketingPreferences.whatsappConsent}
          onChange={(v) => updatePref('whatsappConsent', v)}
          disabled={!isEditing}
        />
        <Toggle
          label="Call Consent"
          description="Allow outbound phone calls"
          checked={contact.marketingPreferences.callConsent}
          onChange={(v) => updatePref('callConsent', v)}
          disabled={!isEditing}
        />
        <Toggle
          label="Do Not Disturb"
          description="Pause all outreach"
          checked={contact.marketingPreferences.doNotDisturb}
          onChange={(v) => updatePref('doNotDisturb', v)}
          disabled={!isEditing}
        />
      </div>
    </Card>
  )
}

const socialPlatforms = [
  { key: 'linkedin' as const, label: 'LinkedIn', icon: LinkedInIcon, color: 'hover:bg-[#0A66C2]/10 hover:text-[#0A66C2]' },
  { key: 'facebook' as const, label: 'Facebook', icon: FacebookIcon, color: 'hover:bg-[#1877F2]/10 hover:text-[#1877F2]' },
  { key: 'instagram' as const, label: 'Instagram', icon: InstagramIcon, color: 'hover:bg-[#E4405F]/10 hover:text-[#E4405F]' },
  { key: 'twitter' as const, label: 'Twitter', icon: TwitterIcon, color: 'hover:bg-sky-500/10 hover:text-sky-500' },
  { key: 'website' as const, label: 'Website', icon: WebsiteIcon, color: 'hover:bg-brand-500/10 hover:text-brand-600' },
  { key: 'youtube' as const, label: 'YouTube', icon: YouTubeIcon, color: 'hover:bg-[#FF0000]/10 hover:text-[#FF0000]' },
  { key: 'telegram' as const, label: 'Telegram', icon: TelegramIcon, color: 'hover:bg-[#26A5E4]/10 hover:text-[#26A5E4]' },
  { key: 'discord' as const, label: 'Discord', icon: DiscordIcon, color: 'hover:bg-[#5865F2]/10 hover:text-[#5865F2]' },
]

export function SocialSection({ contact, isEditing, onChange }: SectionProps) {
  const Icon = sectionIcons.social

  return (
    <Card id="social-media">
      <CardHeader
        icon={<Icon className="h-4 w-4" />}
        title="Social Media"
        description="Social profiles and online presence"
      />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {socialPlatforms.map(({ key, label, icon: PlatformIcon, color }) => {
          const url = contact.socialMedia[key]
          const hasUrl = url.length > 0
          return (
            <a
              key={key}
              href={hasUrl ? url : undefined}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'flex flex-col items-center gap-2 rounded-xl border border-border bg-surface-muted p-4 transition',
                hasUrl ? color : 'opacity-40 pointer-events-none',
              )}
            >
              <PlatformIcon className="h-6 w-6" />
              <span className="text-xs font-medium">{label}</span>
            </a>
          )
        })}
      </div>
      {isEditing && (
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {socialPlatforms.map(({ key, label }) => (
            <FormField
              key={key}
              label={label}
              value={contact.socialMedia[key]}
              onChange={(v) =>
                onChange({ socialMedia: { ...contact.socialMedia, [key]: v } })
              }
            />
          ))}
        </div>
      )}
    </Card>
  )
}

export function NotesSection({ contact, isEditing, onChange }: SectionProps) {
  const Icon = sectionIcons.notes
  const notes = [
    { key: 'note1' as const, label: 'Note 1' },
    { key: 'note2' as const, label: 'Note 2' },
    { key: 'note3' as const, label: 'Note 3' },
    { key: 'note4' as const, label: 'Note 4' },
    { key: 'note5' as const, label: 'Note 5' },
  ]

  return (
    <Card id="notes">
      <CardHeader
        icon={<Icon className="h-4 w-4" />}
        title="Notes"
        description="Relationship manager observations and follow-ups"
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {notes.map(({ key, label }) => (
          <FormField
            key={key}
            label={label}
            value={contact[key]}
            readOnly={!isEditing}
            as="textarea"
            rows={4}
            onChange={(v) => onChange({ [key]: v })}
          />
        ))}
      </div>
    </Card>
  )
}

function AuditRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface-muted px-4 py-3">
      <p className="text-xs font-medium tracking-wide text-text-muted uppercase">{label}</p>
      <p className="mt-1 text-sm font-medium text-text">{value}</p>
    </div>
  )
}

export function AuditSection({ contact }: { contact: Contact }) {
  const Icon = sectionIcons.audit
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    })

  return (
    <Card id="audit-info">
      <CardHeader
        icon={<Icon className="h-4 w-4" />}
        title="Audit Information"
        description="Record creation and modification history"
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <AuditRow label="Created By" value={contact.audit.createdBy} />
        <AuditRow label="Created Date" value={formatDate(contact.audit.createdDate)} />
        <AuditRow label="Modified By" value={contact.audit.modifiedBy} />
        <AuditRow label="Modified Date" value={formatDate(contact.audit.modifiedDate)} />
        <AuditRow label="Status" value={contact.audit.status} />
      </div>
    </Card>
  )
}
