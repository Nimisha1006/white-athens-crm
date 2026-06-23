import type { Contact } from '../types/contact'

export const mockContact: Contact = {
  id: 'CNT-2024-00847',
  profilePicture: '',
  status: 'Active',
  sourceChannel: 'Website Lead Form',

  salutation: 'Mr.',
  firstName: 'Arjun',
  lastName: 'Mehta',
  fullName: 'Mr. Arjun Mehta',
  gender: 'Male',
  dateOfBirth: '1988-03-15',
  maritalStatus: 'Married',
  nationality: 'Indian',
  language: 'English, Hindi',
  religion: 'Hindu',

  mobileNumber: '+91 98765 43210',
  alternateMobileNumber: '+91 91234 56789',
  emailAddress: 'arjun.mehta@example.com',
  alternateEmailAddress: 'arjun.personal@gmail.com',

  currentAddress: {
    line1: '42, Skyline Residency',
    line2: 'Bandra Kurla Complex',
    line3: 'Near Trade Centre',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    zipCode: '400051',
  },
  permanentAddressSameAsCurrent: false,
  permanentAddress: {
    line1: '15, Green Park Colony',
    line2: 'Sector 12',
    line3: '',
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    zipCode: '411014',
  },

  organization: 'TechNova Solutions Pvt. Ltd.',
  designation: 'Senior Product Manager',
  occupation: 'Product Management',
  industryType: 'Information Technology',
  experienceYears: 12,
  experienceMonths: 6,
  primaryExpertise: 'SaaS Product Strategy',
  alternateExpertise: 'Agile Leadership',

  pan: 'ABCDE1234F',
  aadhaar: 'XXXX-XXXX-4521',
  nationalIdNumber: 'IN-8847291034',

  engagement: {
    talked: true,
    met: true,
    responded: false,
  },
  marketingPreferences: {
    emailConsent: true,
    smsConsent: true,
    whatsappConsent: true,
    callConsent: false,
    doNotDisturb: false,
  },
  socialMedia: {
    linkedin: 'https://linkedin.com/in/arjunmehta',
    facebook: 'https://facebook.com/arjun.mehta',
    instagram: 'https://instagram.com/arjunmehta',
    twitter: 'https://twitter.com/arjunmehta',
    website: 'https://arjunmehta.dev',
    youtube: 'https://youtube.com/@arjunmehta',
    telegram: 'https://t.me/arjunmehta',
    discord: 'https://discord.gg/arjunmehta',
  },

  note1: 'High-value enterprise prospect. Interested in CRM migration from legacy system.',
  note2: 'Prefers communication via email during business hours (9 AM – 6 PM IST).',
  note3: 'Referred by existing client — TechNova Solutions.',
  note4: 'Follow-up scheduled for Q2 product demo.',
  note5: 'Decision maker for procurement. Budget approved for FY2024–25.',

  audit: {
    createdBy: 'Priya Sharma',
    createdDate: '2024-01-15T10:30:00',
    modifiedBy: 'Rahul Verma',
    modifiedDate: '2024-06-10T14:45:00',
    status: 'Active',
  },
}
