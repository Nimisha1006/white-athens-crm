from pydantic import BaseModel, EmailStr, field_validator
from typing import Optional, List
from datetime import date, datetime

# ── Address Schemas ──
class AddressBase(BaseModel):
    address_type: str
    address_line1: Optional[str] = None
    address_line2: Optional[str] = None
    address_line3: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    country: Optional[str] = "India"
    zip_code: Optional[str] = None

class AddressCreate(AddressBase):
    pass

class AddressOut(AddressBase):
    id: int
    contact_id: int
    class Config:
        from_attributes = True

# ── Social Media Schemas ──
class SocialMediaBase(BaseModel):
    linkedin: Optional[str] = None
    facebook: Optional[str] = None
    instagram: Optional[str] = None
    twitter: Optional[str] = None
    website: Optional[str] = None
    youtube: Optional[str] = None
    telegram: Optional[str] = None
    discord: Optional[str] = None

class SocialMediaCreate(SocialMediaBase):
    pass

class SocialMediaOut(SocialMediaBase):
    id: int
    contact_id: int
    class Config:
        from_attributes = True

# ── Marketing Preferences Schemas ──
class MarketingPrefBase(BaseModel):
    email_consent: Optional[str] = "Y"
    sms_consent: Optional[str] = "Y"
    whatsapp_consent: Optional[str] = "Y"
    call_consent: Optional[str] = "Y"
    dnd: Optional[str] = "N"

class MarketingPrefCreate(MarketingPrefBase):
    pass

class MarketingPrefOut(MarketingPrefBase):
    id: int
    contact_id: int
    class Config:
        from_attributes = True

# ── Notes Schemas ──
class NoteBase(BaseModel):
    note1: Optional[str] = None
    note2: Optional[str] = None
    note3: Optional[str] = None
    note4: Optional[str] = None
    note5: Optional[str] = None

class NoteCreate(NoteBase):
    pass

class NoteOut(NoteBase):
    id: int
    contact_id: int
    class Config:
        from_attributes = True

# ── Contact Schemas ──
class ContactBase(BaseModel):
    salutation: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    full_name: Optional[str] = None
    mobile_number: Optional[str] = None
    alt_mobile_number: Optional[str] = None
    email: Optional[str] = None
    alt_email: Optional[str] = None
    gender: Optional[str] = None
    dob: Optional[date] = None
    marital_status: Optional[str] = None
    nationality: Optional[str] = None
    language: Optional[str] = None
    religion: Optional[str] = None
    occupation: Optional[str] = None
    organization: Optional[str] = None
    designation: Optional[str] = None
    industry_type: Optional[str] = None
    experience_years: Optional[int] = 0
    experience_months: Optional[int] = 0
    primary_expertise: Optional[str] = None
    alt_expertise: Optional[str] = None
    pan: Optional[str] = None
    aadhaar: Optional[str] = None
    national_id: Optional[str] = None
    source_channel: Optional[str] = "Manual Entry"
    talked: Optional[str] = "N"
    met: Optional[str] = "N"
    responded: Optional[str] = "N"
    status: Optional[str] = "Active"

class ContactCreate(ContactBase):
    mobile_number: str
    first_name: str
    addresses: Optional[List[AddressCreate]] = []
    social_media: Optional[SocialMediaCreate] = None
    marketing_preferences: Optional[MarketingPrefCreate] = None
    notes: Optional[NoteCreate] = None

    @field_validator('mobile_number')
    @classmethod
    def validate_mobile(cls, v):
        if not v.isdigit() or len(v) != 10:
            raise ValueError('Mobile number must be 10 digits')
        return v

class ContactUpdate(ContactBase):
    addresses: Optional[List[AddressCreate]] = None
    social_media: Optional[SocialMediaCreate] = None
    marketing_preferences: Optional[MarketingPrefCreate] = None
    notes: Optional[NoteCreate] = None

class ContactOut(ContactBase):
    id: int
    mob_id: str
    created_by: Optional[str] = None
    created_date: Optional[datetime] = None
    modified_by: Optional[str] = None
    modified_date: Optional[datetime] = None
    mark_for_deletion: Optional[str] = "N"
    addresses: List[AddressOut] = []
    social_media: Optional[SocialMediaOut] = None
    marketing_preferences: Optional[MarketingPrefOut] = None
    notes: Optional[NoteOut] = None
    class Config:
        from_attributes = True

class ContactList(BaseModel):
    id: int
    mob_id: str
    full_name: Optional[str] = None
    mobile_number: Optional[str] = None
    email: Optional[str] = None
    organization: Optional[str] = None
    city: Optional[str] = None
    status: Optional[str] = None
    created_date: Optional[datetime] = None
    class Config:
        from_attributes = True

# ── Audit Log Schema ──
class AuditLogOut(BaseModel):
    id: int
    mob_id: Optional[str] = None
    action: str
    field_changed: Optional[str] = None
    old_value: Optional[str] = None
    new_value: Optional[str] = None
    changed_by: Optional[str] = None
    changed_date: Optional[datetime] = None
    remarks: Optional[str] = None
    class Config:
        from_attributes = True

# ── Response Schemas ──
class MessageResponse(BaseModel):
    message: str
    mob_id: Optional[str] = None

class PaginatedContacts(BaseModel):
    total: int
    page: int
    per_page: int
    total_pages: int
    data: List[ContactList]