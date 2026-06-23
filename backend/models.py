from sqlalchemy import Column, BigInteger, String, Date, DateTime, Integer, Text, CHAR, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base

class Contact(Base):
    __tablename__ = "contacts"

    id = Column(BigInteger, primary_key=True, index=True)
    mob_id = Column(String(50), unique=True, nullable=False)
    salutation = Column(String(20))
    first_name = Column(String(100))
    last_name = Column(String(100))
    full_name = Column(String(200))
    mobile_number = Column(String(20))
    alt_mobile_number = Column(String(20))
    email = Column(String(255))
    alt_email = Column(String(255))
    gender = Column(String(20))
    dob = Column(Date)
    marital_status = Column(String(50))
    nationality = Column(String(50))
    language = Column(String(50))
    religion = Column(String(100))
    occupation = Column(String(100))
    organization = Column(String(255))
    designation = Column(String(255))
    industry_type = Column(String(100))
    experience_years = Column(Integer, default=0)
    experience_months = Column(Integer, default=0)
    primary_expertise = Column(String(255))
    alt_expertise = Column(String(255))
    pan = Column(String(20))
    aadhaar = Column(String(20))
    national_id = Column(String(50))
    source_channel = Column(String(100), default='Manual Entry')
    talked = Column(CHAR(1), default='N')
    met = Column(CHAR(1), default='N')
    responded = Column(CHAR(1), default='N')
    status = Column(String(50), default='Active')
    mark_for_deletion = Column(CHAR(1), default='N')
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
    linkedin = Column(String(500))
    facebook = Column(String(500))
    instagram = Column(String(500))
    twitter = Column(String(500))
    website = Column(String(500))
    youtube = Column(String(500))
    telegram = Column(String(255))
    discord = Column(String(255))
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