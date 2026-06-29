from sqlalchemy import Column, BigInteger, String, Date, DateTime, Integer, Text, CHAR, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base

class Contact(Base):
    __tablename__ = "contacts"

    id = Column(BigInteger, primary_key=True, index=True)
    mob_id = Column(String(50), unique=True, nullable=False)

    # Name
    salutation = Column(String(20))
    first_name = Column(String(100))
    last_name = Column(String(100))
    short_name = Column(String(100))
    full_name = Column(String(200))

    # Origin
    originating_channel = Column(String(100))
    source1 = Column(String(100))
    source2 = Column(String(100))
    entered_by = Column(String(100))

    # Reporting Params
    cat1 = Column(String(100))
    cat2 = Column(String(100))
    cat3 = Column(String(100))
    cat4 = Column(String(100))
    cat5 = Column(String(100))

    # Contact Info
    mobile_number = Column(String(20))
    alt_mobile_number = Column(String(20))
    email = Column(String(255))
    alt_email = Column(String(255))

    # Address
    is_permanent_same_as_current = Column(CHAR(1), default='N')
    country_of_residence = Column(String(10))

    # Personal
    gender = Column(String(20))
    dob = Column(Date)
    marital_status = Column(String(50))
    nationality = Column(String(50))
    language = Column(String(50))
    religion = Column(String(100))
    education = Column(String(100))
    income_category = Column(String(20))
    father_name = Column(String(200))

    # Profession
    occupation = Column(String(100))
    organization = Column(String(255))
    designation = Column(String(255))
    industry_type = Column(String(100))
    experience_years = Column(Integer, default=0)
    experience_months = Column(Integer, default=0)
    primary_expertise = Column(String(255))
    alt_expertise = Column(String(255))

    # Identification
    pan = Column(String(20))
    aadhaar = Column(String(20))
    national_identification_code = Column(String(50))

    # Engagement
    talked = Column(CHAR(1), default='N')
    met = Column(CHAR(1), default='N')
    responded = Column(CHAR(1), default='N')

    # Attachments
    cv_text = Column(Text)
    image1 = Column(Text)
    image2 = Column(Text)
    attachment1 = Column(Text)
    attachment2 = Column(Text)

    # Audit
    status = Column(String(50), default='Active')
    mark_for_deletion = Column(CHAR(1), default='N')
    reason_for_deletion = Column(Text)
    created_by = Column(String(100))
    created_date = Column(DateTime, default=func.now())
    modified_by = Column(String(100))
    modified_date = Column(DateTime, default=func.now(), onupdate=func.now())

    # Relationships
    addresses = relationship("Address", back_populates="contact", cascade="all, delete")
    social_media = relationship("SocialMedia", back_populates="contact", cascade="all, delete", uselist=False)
    marketing_preferences = relationship("MarketingPreference", back_populates="contact", cascade="all, delete", uselist=False)
    notes = relationship("Note", back_populates="contact", cascade="all, delete", uselist=False)
    audit_logs = relationship("AuditLog", back_populates="contact", cascade="all, delete")


class Address(Base):
    __tablename__ = "addresses"

    id = Column(BigInteger, primary_key=True, index=True)
    contact_id = Column(BigInteger, ForeignKey("contacts.id"), nullable=False)
    address_type = Column(String(20), nullable=False)
    address_line1 = Column(String(255))
    address_line2 = Column(String(255))
    address_line3 = Column(String(255))
    city = Column(String(100))
    state = Column(String(100))
    country = Column(String(100), default='India')
    zip_code = Column(String(20))
    created_date = Column(DateTime, default=func.now())
    modified_date = Column(DateTime, default=func.now(), onupdate=func.now())

    contact = relationship("Contact", back_populates="addresses")


class SocialMedia(Base):
    __tablename__ = "social_media"

    id = Column(BigInteger, primary_key=True, index=True)
    contact_id = Column(BigInteger, ForeignKey("contacts.id"), nullable=False)
    linked_in_id = Column(String(500))
    facebook_id = Column(String(500))
    instagram_id = Column(String(500))
    twitter_id = Column(String(500))
    website = Column(String(500))
    you_tube_channel = Column(String(500))
    telegram_id = Column(String(255))
    discord_id = Column(String(255))
    created_date = Column(DateTime, default=func.now())
    modified_date = Column(DateTime, default=func.now(), onupdate=func.now())

    contact = relationship("Contact", back_populates="social_media")


class MarketingPreference(Base):
    __tablename__ = "marketing_preferences"

    id = Column(BigInteger, primary_key=True, index=True)
    contact_id = Column(BigInteger, ForeignKey("contacts.id"), nullable=False)
    email_consent = Column(CHAR(1), default='Y')
    sms_consent = Column(CHAR(1), default='Y')
    whatsapp_consent = Column(CHAR(1), default='Y')
    call_consent = Column(CHAR(1), default='Y')
    dnd = Column(CHAR(1), default='N')
    created_date = Column(DateTime, default=func.now())
    modified_date = Column(DateTime, default=func.now(), onupdate=func.now())

    contact = relationship("Contact", back_populates="marketing_preferences")


class Note(Base):
    __tablename__ = "notes"

    id = Column(BigInteger, primary_key=True, index=True)
    contact_id = Column(BigInteger, ForeignKey("contacts.id"), nullable=False)
    note1 = Column(Text)
    note2 = Column(Text)
    note3 = Column(Text)
    note4 = Column(Text)
    note5 = Column(Text)
    created_date = Column(DateTime, default=func.now())
    modified_date = Column(DateTime, default=func.now(), onupdate=func.now())

    contact = relationship("Contact", back_populates="notes")


class AuditLog(Base):
    __tablename__ = "audit_log"

    id = Column(BigInteger, primary_key=True, index=True)
    contact_id = Column(BigInteger, ForeignKey("contacts.id"), nullable=True)
    mob_id = Column(String(50))
    action = Column(String(50), nullable=False)
    field_changed = Column(String(100))
    old_value = Column(Text)
    new_value = Column(Text)
    changed_by = Column(String(100))
    changed_date = Column(DateTime, default=func.now())
    ip_address = Column(String(50))
    remarks = Column(Text)

    contact = relationship("Contact", back_populates="audit_logs")