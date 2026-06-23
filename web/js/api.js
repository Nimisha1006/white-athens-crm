// ─────────────────────────────────────────────────────────
// White Athens CRM — API Layer
// Translates between backend (snake_case, flat tables) and
// frontend (camelCase, nested objects) shapes.
// ─────────────────────────────────────────────────────────

const API_BASE = "http://127.0.0.1:8000";

// ── Helpers: split full mobile "+91 9876543210" -> "9876543210" ──
function digitsOnly(v) {
  return (v || '').replace(/\D/g, '').replace(/^91/, '').slice(-10);
}

// ── Backend -> Frontend ─────────────────────────────────
// Takes the raw ContactOut JSON from FastAPI and reshapes it
// into the camelCase / nested structure contact.js expects.
function mapContactFromApi(c) {
  if (!c) return null;

  const addresses = c.addresses || [];
  const current = addresses.find(a => a.address_type === 'Current') || {};
  const permanent = addresses.find(a => a.address_type === 'Permanent') || {};

  const social = c.social_media || {};
  const marketing = c.marketing_preferences || {};
  const notes = c.notes || {};

  return {
    _dbId: c.id,
    id: c.mob_id,                 // display id like MOB-001
    _isNew: false,

    salutation: c.salutation || 'Mr.',
    firstName: c.first_name || '',
    lastName: c.last_name || '',
    fullName: c.full_name || '',
    gender: c.gender || 'Male',
    dateOfBirth: c.dob || '',
    maritalStatus: c.marital_status || 'Single',
    nationality: c.nationality || '',
    language: c.language || '',
    religion: c.religion || '',

    mobileNumber: c.mobile_number ? `+91 ${digitsOnly(c.mobile_number)}` : '',
    alternateMobileNumber: c.alt_mobile_number ? `+91 ${digitsOnly(c.alt_mobile_number)}` : '',
    emailAddress: c.email || '',
    alternateEmailAddress: c.alt_email || '',

    currentAddress: {
      line1: current.address_line1 || '',
      line2: current.address_line2 || '',
      line3: current.address_line3 || '',
      city: current.city || '',
      state: current.state || '',
      country: current.country || 'India',
      zipCode: current.zip_code || '',
    },
    permanentAddressSameAsCurrent: false,
    permanentAddress: {
      line1: permanent.address_line1 || '',
      line2: permanent.address_line2 || '',
      line3: permanent.address_line3 || '',
      city: permanent.city || '',
      state: permanent.state || '',
      country: permanent.country || 'India',
      zipCode: permanent.zip_code || '',
    },

    organization: c.organization || '',
    designation: c.designation || '',
    occupation: c.occupation || '',
    industryType: c.industry_type || 'Information Technology',
    experienceYears: c.experience_years || 0,
    experienceMonths: c.experience_months || 0,
    primaryExpertise: c.primary_expertise || '',
    alternateExpertise: c.alt_expertise || '',

    pan: c.pan || '',
    aadhaar: c.aadhaar || '',
    nationalIdNumber: c.national_id || '',

    status: c.status || 'Active',
    sourceChannel: c.source_channel || 'Manual Entry',

    engagement: {
      talked: c.talked === 'Y',
      met: c.met === 'Y',
      responded: c.responded === 'Y',
    },

    marketingPreferences: {
      emailConsent: marketing.email_consent !== 'N',
      smsConsent: marketing.sms_consent !== 'N',
      whatsappConsent: marketing.whatsapp_consent !== 'N',
      callConsent: marketing.call_consent !== 'N',
      doNotDisturb: marketing.dnd === 'Y',
    },

    socialMedia: {
      linkedin: social.linkedin || '',
      facebook: social.facebook || '',
      instagram: social.instagram || '',
      twitter: social.twitter || '',
      website: social.website || '',
      youtube: social.youtube || '',
      telegram: social.telegram || '',
      discord: social.discord || '',
    },

    note1: notes.note1 || '',
    note2: notes.note2 || '',
    note3: notes.note3 || '',
    note4: notes.note4 || '',
    note5: notes.note5 || '',

    profilePicture: '',

    audit: {
      createdBy: c.created_by || '',
      createdDate: c.created_date || '',
      modifiedBy: c.modified_by || '',
      modifiedDate: c.modified_date || '',
      status: c.status || 'Active',
    },
  };
}

// ── Frontend -> Backend ─────────────────────────────────
// Takes the camelCase data collected from the form
// and reshapes it into the nested ContactCreate/ContactUpdate
// payload the FastAPI backend expects.
function mapContactToApi(data) {
  const addresses = [
    {
      address_type: 'Current',
      address_line1: data.currentAddress?.line1 || '',
      address_line2: data.currentAddress?.line2 || '',
      address_line3: data.currentAddress?.line3 || '',
      city: data.currentAddress?.city || '',
      state: data.currentAddress?.state || '',
      country: data.currentAddress?.country || 'India',
      zip_code: data.currentAddress?.zipCode || '',
    },
    {
      address_type: 'Permanent',
      address_line1: data.permanentAddress?.line1 || '',
      address_line2: data.permanentAddress?.line2 || '',
      address_line3: data.permanentAddress?.line3 || '',
      city: data.permanentAddress?.city || '',
      state: data.permanentAddress?.state || '',
      country: data.permanentAddress?.country || 'India',
      zip_code: data.permanentAddress?.zipCode || '',
    },
  ];

  return {
    salutation: data.salutation || '',
    first_name: data.firstName || '',
    last_name: data.lastName || '',
    full_name: data.fullName || '',
    mobile_number: digitsOnly(data.mobileNumber),
    alt_mobile_number: digitsOnly(data.alternateMobileNumber),
    email: data.emailAddress || null,
    alt_email: data.alternateEmailAddress || null,
    gender: data.gender || '',
    dob: data.dateOfBirth || null,
    marital_status: data.maritalStatus || '',
    nationality: data.nationality || '',
    language: data.language || '',
    religion: data.religion || '',
    occupation: data.occupation || '',
    organization: data.organization || '',
    designation: data.designation || '',
    industry_type: data.industryType || '',
    experience_years: Number(data.experienceYears) || 0,
    experience_months: Number(data.experienceMonths) || 0,
    primary_expertise: data.primaryExpertise || '',
    alt_expertise: data.alternateExpertise || '',
    pan: data.pan || '',
    aadhaar: data.aadhaar || '',
    national_id: data.nationalIdNumber || '',
    status: data.status || 'Active',
    source_channel: data.sourceChannel || 'Manual Entry',
    talked: data.engagement?.talked ? 'Y' : 'N',
    met: data.engagement?.met ? 'Y' : 'N',
    responded: data.engagement?.responded ? 'Y' : 'N',

    addresses: addresses,

    social_media: {
      linkedin: data.socialMedia?.linkedin || '',
      facebook: data.socialMedia?.facebook || '',
      instagram: data.socialMedia?.instagram || '',
      twitter: data.socialMedia?.twitter || '',
      website: data.socialMedia?.website || '',
      youtube: data.socialMedia?.youtube || '',
      telegram: data.socialMedia?.telegram || '',
      discord: data.socialMedia?.discord || '',
    },

    marketing_preferences: {
      email_consent: data.marketingPreferences?.emailConsent ? 'Y' : 'N',
      sms_consent: data.marketingPreferences?.smsConsent ? 'Y' : 'N',
      whatsapp_consent: data.marketingPreferences?.whatsappConsent ? 'Y' : 'N',
      call_consent: data.marketingPreferences?.callConsent ? 'Y' : 'N',
      dnd: data.marketingPreferences?.doNotDisturb ? 'Y' : 'N',
    },

    notes: {
      note1: data.note1 || '',
      note2: data.note2 || '',
      note3: data.note3 || '',
      note4: data.note4 || '',
      note5: data.note5 || '',
    },
  };
}

// ── API Calls ────────────────────────────────────────────

async function fetchContacts() {
  const res = await fetch(`${API_BASE}/api/contacts`);
  if (!res.ok) throw new Error("Failed to load contacts");
  return await res.json();
}

async function apiGetContactById(id) {
  const res = await fetch(`${API_BASE}/api/contacts/${id}`);
  if (!res.ok) throw new Error("Failed to load contact");
  const raw = await res.json();
  return mapContactFromApi(raw);
}

async function apiCreateContact(data) {
  const payload = mapContactToApi(data);

  const res = await fetch(`${API_BASE}/api/contacts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Unknown error' }));
    throw new Error(typeof err.detail === 'string' ? err.detail : JSON.stringify(err.detail));
  }

  const raw = await res.json();
  return mapContactFromApi(raw);
}

async function apiUpdateContact(id, data) {
  const payload = mapContactToApi(data);

  const res = await fetch(`${API_BASE}/api/contacts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Unknown error' }));
    throw new Error(typeof err.detail === 'string' ? err.detail : JSON.stringify(err.detail));
  }

  const raw = await res.json();
  return mapContactFromApi(raw);
}

async function apiDeleteContact(id) {
  const res = await fetch(`${API_BASE}/api/contacts/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Delete failed");
  return true;
}

async function softDelete(id) {
  return apiDeleteContact(id);
}

window.fetchContacts = fetchContacts;
window.softDelete = softDelete;
window.apiGetContactById = apiGetContactById;
window.apiCreateContact = apiCreateContact;
window.apiUpdateContact = apiUpdateContact;
window.apiDeleteContact = apiDeleteContact;