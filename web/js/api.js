// ─────────────────────────────────────────────────────────
// White Athens CRM — API Layer
// Aligned with MobCRM.json schema
// ─────────────────────────────────────────────────────────

const API_BASE = "http://127.0.0.1:8000";

function digitsOnly(v) {
  return (v || '').replace(/\D/g, '').replace(/^91/, '').slice(-10);
}

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
    id: c.mob_id,
    _isNew: false,
    salutation: c.salutation || 'Mr.',
    firstName: c.first_name || '',
    lastName: c.last_name || '',
    shortName: c.short_name || '',
    fullName: c.full_name || '',
    originatingChannel: c.originating_channel || '',
    source1: c.source1 || '',
    source2: c.source2 || '',
    enteredBy: c.entered_by || '',
    cat1: c.cat1 || '',
    cat2: c.cat2 || '',
    cat3: c.cat3 || '',
    cat4: c.cat4 || '',
    cat5: c.cat5 || '',
    mobileNumber: c.mobile_number ? `+91 ${digitsOnly(c.mobile_number)}` : '',
    alternateMobileNumber: c.alt_mobile_number ? `+91 ${digitsOnly(c.alt_mobile_number)}` : '',
    emailAddress: c.email || '',
    alternateEmailAddress: c.alt_email || '',
    isPermanentSameAsCurrent: c.is_permanent_same_as_current === 'Y',
    countryOfResidence: c.country_of_residence || '',
    currentAddress: {
      line1: current.address_line1 || '',
      line2: current.address_line2 || '',
      line3: current.address_line3 || '',
      city: current.city || '',
      state: current.state || '',
      country: current.country || 'India',
      zipCode: current.zip_code || '',
    },
    permanentAddressSameAsCurrent: c.is_permanent_same_as_current === 'Y',
    permanentAddress: {
      line1: permanent.address_line1 || '',
      line2: permanent.address_line2 || '',
      line3: permanent.address_line3 || '',
      city: permanent.city || '',
      state: permanent.state || '',
      country: permanent.country || 'India',
      zipCode: permanent.zip_code || '',
    },
    gender: c.gender || '',
    dateOfBirth: c.dob || '',
    maritalStatus: c.marital_status || '',
    nationality: c.nationality || '',
    language: c.language || '',
    religion: c.religion || '',
    education: c.education || '',
    incomeCategory: c.income_category || '',
    fatherName: c.father_name || '',
    occupation: c.occupation || '',
    organization: c.organization || '',
    designation: c.designation || '',
    industryType: c.industry_type || '',
    experienceYears: c.experience_years || 0,
    experienceMonths: c.experience_months || 0,
    primaryExpertise: c.primary_expertise || '',
    alternateExpertise: c.alt_expertise || '',
    pan: c.pan || '',
    aadhaar: c.aadhaar || '',
    nationalIdentificationCode: c.national_identification_code || '',
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
      linkedInId: social.linked_in_id || '',
      facebookId: social.facebook_id || '',
      instagramId: social.instagram_id || '',
      twitterId: social.twitter_id || '',
      website: social.website || '',
      youTubeChannel: social.you_tube_channel || '',
      telegramId: social.telegram_id || '',
      discordId: social.discord_id || '',
    },
    note1: notes.note1 || '',
    note2: notes.note2 || '',
    note3: notes.note3 || '',
    note4: notes.note4 || '',
    note5: notes.note5 || '',
    cvText: c.cv_text || '',
    image1: c.image1 || '',
    image2: c.image2 || '',
    attachment1: c.attachment1 || '',
    attachment2: c.attachment2 || '',
    profilePicture: '',
    status: c.status || 'Active',
    sourceChannel: c.originating_channel || 'Manual Entry',
    audit: {
      createdBy: c.created_by || '',
      createdDate: c.created_date || '',
      modifiedBy: c.modified_by || '',
      modifiedDate: c.modified_date || '',
      status: c.status || 'Active',
      markForDeletion: c.mark_for_deletion || 'N',
      reasonForDeletion: c.reason_for_deletion || '',
    },
  };
}

function mapContactToApi(data) {
  return {
    salutation: data.salutation || '',
    first_name: data.firstName || '',
    last_name: data.lastName || '',
    short_name: data.shortName || '',
    full_name: data.fullName || '',
    originating_channel: data.originatingChannel || '',
    source1: data.source1 || '',
    source2: data.source2 || '',
    entered_by: data.enteredBy || '',
    cat1: data.cat1 || '',
    cat2: data.cat2 || '',
    cat3: data.cat3 || '',
    cat4: data.cat4 || '',
    cat5: data.cat5 || '',
    mobile_number: digitsOnly(data.mobileNumber),
    alt_mobile_number: digitsOnly(data.alternateMobileNumber),
    email: data.emailAddress || null,
    alt_email: data.alternateEmailAddress || null,
    is_permanent_same_as_current: data.permanentAddressSameAsCurrent ? 'Y' : 'N',
    country_of_residence: data.countryOfResidence || '',
    gender: data.gender || '',
    dob: data.dateOfBirth || null,
    marital_status: data.maritalStatus || '',
    nationality: data.nationality || '',
    language: data.language || '',
    religion: data.religion || '',
    education: data.education || '',
    income_category: data.incomeCategory || '',
    father_name: data.fatherName || '',
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
    national_identification_code: data.nationalIdentificationCode || '',
    talked: data.engagement?.talked ? 'Y' : 'N',
    met: data.engagement?.met ? 'Y' : 'N',
    responded: data.engagement?.responded ? 'Y' : 'N',
    addresses: [
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
    ],
    social_media: {
      linked_in_id: data.socialMedia?.linkedInId || '',
      facebook_id: data.socialMedia?.facebookId || '',
      instagram_id: data.socialMedia?.instagramId || '',
      twitter_id: data.socialMedia?.twitterId || '',
      website: data.socialMedia?.website || '',
      you_tube_channel: data.socialMedia?.youTubeChannel || '',
      telegram_id: data.socialMedia?.telegramId || '',
      discord_id: data.socialMedia?.discordId || '',
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
    status: data.status || 'Active',
  };
}

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
  return mapContactFromApi(await res.json());
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
  return mapContactFromApi(await res.json());
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