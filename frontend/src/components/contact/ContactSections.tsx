import type { Contact, Address } from '../../types/contact'
import { Card, CardHeader } from '../ui/Card'
import { FormField } from '../ui/FormField'
import { sectionIcons } from './ContactHeader'

interface SectionProps {
  contact: Contact
  isEditing: boolean
  onChange: (updates: Partial<Contact>) => void
}

function AddressFields({
  prefix,
  address,
  isEditing,
  onChange,
}: {
  prefix: string
  address: Address
  isEditing: boolean
  onChange: (address: Address) => void
}) {
  const update = (field: keyof Address, value: string) =>
    onChange({ ...address, [field]: value })

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <FormField
        label={`${prefix} Address Line 1`}
        value={address.line1}
        readOnly={!isEditing}
        onChange={(v) => update('line1', v)}
      />
      <FormField
        label={`${prefix} Address Line 2`}
        value={address.line2}
        readOnly={!isEditing}
        onChange={(v) => update('line2', v)}
      />
      <FormField
        label={`${prefix} Address Line 3`}
        value={address.line3}
        readOnly={!isEditing}
        onChange={(v) => update('line3', v)}
      />
      <FormField
        label="City"
        value={address.city}
        readOnly={!isEditing}
        onChange={(v) => update('city', v)}
      />
      <FormField
        label="State"
        value={address.state}
        readOnly={!isEditing}
        onChange={(v) => update('state', v)}
      />
      <FormField
        label="Country"
        value={address.country}
        readOnly={!isEditing}
        onChange={(v) => update('country', v)}
      />
      <FormField
        label="Zip Code"
        value={address.zipCode}
        readOnly={!isEditing}
        onChange={(v) => update('zipCode', v)}
      />
    </div>
  )
}

export function PersonalInfoSection({ contact, isEditing, onChange }: SectionProps) {
  const Icon = sectionIcons.personal
  return (
    <Card id="personal-info">
      <CardHeader
        icon={<Icon className="h-4 w-4" />}
        title="Personal Information"
        description="Basic demographic and identity details"
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <FormField
          label="Salutation"
          value={contact.salutation}
          readOnly={!isEditing}
          onChange={(v) => onChange({ salutation: v })}
          as="select"
          options={['Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Prof.']}
        />
        <FormField
          label="First Name"
          value={contact.firstName}
          readOnly={!isEditing}
          onChange={(v) => onChange({ firstName: v })}
        />
        <FormField
          label="Last Name"
          value={contact.lastName}
          readOnly={!isEditing}
          onChange={(v) => onChange({ lastName: v })}
        />
        <FormField
          label="Full Name"
          value={contact.fullName}
          readOnly={!isEditing}
          onChange={(v) => onChange({ fullName: v })}
        />
        <FormField
          label="Gender"
          value={contact.gender}
          readOnly={!isEditing}
          onChange={(v) => onChange({ gender: v })}
          as="select"
          options={['Male', 'Female', 'Other', 'Prefer not to say']}
        />
        <FormField
          label="Date of Birth"
          value={contact.dateOfBirth}
          type="date"
          readOnly={!isEditing}
          onChange={(v) => onChange({ dateOfBirth: v })}
        />
        <FormField
          label="Marital Status"
          value={contact.maritalStatus}
          readOnly={!isEditing}
          onChange={(v) => onChange({ maritalStatus: v })}
          as="select"
          options={['Single', 'Married', 'Divorced', 'Widowed']}
        />
        <FormField
          label="Nationality"
          value={contact.nationality}
          readOnly={!isEditing}
          onChange={(v) => onChange({ nationality: v })}
        />
        <FormField
          label="Language"
          value={contact.language}
          readOnly={!isEditing}
          onChange={(v) => onChange({ language: v })}
        />
        <FormField
          label="Religion"
          value={contact.religion}
          readOnly={!isEditing}
          onChange={(v) => onChange({ religion: v })}
        />
      </div>
    </Card>
  )
}

export function ContactInfoSection({ contact, isEditing, onChange }: SectionProps) {
  const Icon = sectionIcons.contact
  return (
    <Card id="contact-info">
      <CardHeader
        icon={<Icon className="h-4 w-4" />}
        title="Contact Information"
        description="Phone numbers and email addresses"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          label="Mobile Number"
          value={contact.mobileNumber}
          type="tel"
          readOnly={!isEditing}
          onChange={(v) => onChange({ mobileNumber: v })}
        />
        <FormField
          label="Alternate Mobile Number"
          value={contact.alternateMobileNumber}
          type="tel"
          readOnly={!isEditing}
          onChange={(v) => onChange({ alternateMobileNumber: v })}
        />
        <FormField
          label="Email Address"
          value={contact.emailAddress}
          type="email"
          readOnly={!isEditing}
          onChange={(v) => onChange({ emailAddress: v })}
        />
        <FormField
          label="Alternate Email Address"
          value={contact.alternateEmailAddress}
          type="email"
          readOnly={!isEditing}
          onChange={(v) => onChange({ alternateEmailAddress: v })}
        />
      </div>
    </Card>
  )
}

export function AddressSection({ contact, isEditing, onChange }: SectionProps) {
  const Icon = sectionIcons.address

  const handleSameToggle = (checked: boolean) => {
    onChange({
      permanentAddressSameAsCurrent: checked,
      permanentAddress: checked ? { ...contact.currentAddress } : contact.permanentAddress,
    })
  }

  return (
    <Card id="address-info">
      <CardHeader
        icon={<Icon className="h-4 w-4" />}
        title="Address Information"
        description="Current and permanent address details"
      />
      <div className="space-y-6">
        <div>
          <h3 className="mb-3 text-sm font-semibold text-text">Current Address</h3>
          <AddressFields
            prefix="Current"
            address={contact.currentAddress}
            isEditing={isEditing}
            onChange={(addr) => onChange({ currentAddress: addr })}
          />
        </div>
        <div className="border-t border-border pt-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-text">Permanent Address</h3>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-text-muted">
              <input
                type="checkbox"
                checked={contact.permanentAddressSameAsCurrent}
                onChange={(e) => handleSameToggle(e.target.checked)}
                disabled={!isEditing}
                className="h-4 w-4 rounded border-border text-brand-600 focus:ring-brand-500"
              />
              Same as Current Address
            </label>
          </div>
          <AddressFields
            prefix="Permanent"
            address={
              contact.permanentAddressSameAsCurrent
                ? contact.currentAddress
                : contact.permanentAddress
            }
            isEditing={isEditing && !contact.permanentAddressSameAsCurrent}
            onChange={(addr) => onChange({ permanentAddress: addr })}
          />
        </div>
      </div>
    </Card>
  )
}

export function ProfessionalSection({ contact, isEditing, onChange }: SectionProps) {
  const Icon = sectionIcons.professional
  return (
    <Card id="professional-info">
      <CardHeader
        icon={<Icon className="h-4 w-4" />}
        title="Professional Information"
        description="Work history and expertise"
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <FormField
          label="Organization"
          value={contact.organization}
          readOnly={!isEditing}
          onChange={(v) => onChange({ organization: v })}
        />
        <FormField
          label="Designation"
          value={contact.designation}
          readOnly={!isEditing}
          onChange={(v) => onChange({ designation: v })}
        />
        <FormField
          label="Occupation"
          value={contact.occupation}
          readOnly={!isEditing}
          onChange={(v) => onChange({ occupation: v })}
        />
        <FormField
          label="Industry Type"
          value={contact.industryType}
          readOnly={!isEditing}
          onChange={(v) => onChange({ industryType: v })}
        />
        <FormField
          label="Experience Years"
          value={contact.experienceYears}
          type="number"
          readOnly={!isEditing}
          onChange={(v) => onChange({ experienceYears: Number(v) })}
        />
        <FormField
          label="Experience Months"
          value={contact.experienceMonths}
          type="number"
          readOnly={!isEditing}
          onChange={(v) => onChange({ experienceMonths: Number(v) })}
        />
        <FormField
          label="Primary Expertise"
          value={contact.primaryExpertise}
          readOnly={!isEditing}
          onChange={(v) => onChange({ primaryExpertise: v })}
        />
        <FormField
          label="Alternate Expertise"
          value={contact.alternateExpertise}
          readOnly={!isEditing}
          onChange={(v) => onChange({ alternateExpertise: v })}
        />
      </div>
    </Card>
  )
}

export function IdentificationSection({ contact, isEditing, onChange }: SectionProps) {
  const Icon = sectionIcons.identification
  return (
    <Card id="identification">
      <CardHeader
        icon={<Icon className="h-4 w-4" />}
        title="Identification"
        description="Government and national ID details"
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <FormField
          label="PAN"
          value={contact.pan}
          readOnly={!isEditing}
          onChange={(v) => onChange({ pan: v })}
        />
        <FormField
          label="Aadhaar"
          value={contact.aadhaar}
          readOnly={!isEditing}
          onChange={(v) => onChange({ aadhaar: v })}
        />
        <FormField
          label="National Identification Number"
          value={contact.nationalIdNumber}
          readOnly={!isEditing}
          onChange={(v) => onChange({ nationalIdNumber: v })}
        />
      </div>
    </Card>
  )
}
