export type ContactStatus = 'Active' | 'Inactive' | 'Prospect' | 'Archived'

export interface Address {
  line1: string
  line2: string
  line3: string
  city: string
  state: string
  country: string
  zipCode: string
}

export interface EngagementMetrics {
  talked: boolean
  met: boolean
  responded: boolean
}

export interface MarketingPreferences {
  emailConsent: boolean
  smsConsent: boolean
  whatsappConsent: boolean
  callConsent: boolean
  doNotDisturb: boolean
}

export interface SocialMedia {
  linkedin: string
  facebook: string
  instagram: string
  twitter: string
  website: string
  youtube: string
  telegram: string
  discord: string
}

export interface AuditInfo {
  createdBy: string
  createdDate: string
  modifiedBy: string
  modifiedDate: string
  status: ContactStatus
}

export interface Contact {
  id: string
  profilePicture?: string
  status: ContactStatus
  sourceChannel: string

  salutation: string
  firstName: string
  lastName: string
  fullName: string
  gender: string
  dateOfBirth: string
  maritalStatus: string
  nationality: string
  language: string
  religion: string

  mobileNumber: string
  alternateMobileNumber: string
  emailAddress: string
  alternateEmailAddress: string

  currentAddress: Address
  permanentAddressSameAsCurrent: boolean
  permanentAddress: Address

  organization: string
  designation: string
  occupation: string
  industryType: string
  experienceYears: number
  experienceMonths: number
  primaryExpertise: string
  alternateExpertise: string

  pan: string
  aadhaar: string
  nationalIdNumber: string

  engagement: EngagementMetrics
  marketingPreferences: MarketingPreferences
  socialMedia: SocialMedia

  note1: string
  note2: string
  note3: string
  note4: string
  note5: string

  audit: AuditInfo
}
