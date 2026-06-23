-- ============================================
-- White Athens CRM Database Schema
-- Database: crm_db (PostgreSQL)
-- ============================================

-- 1. CONTACTS (Core Table)
CREATE TABLE contacts (
    id BIGSERIAL PRIMARY KEY,
    mob_id VARCHAR(50) UNIQUE NOT NULL,
    salutation VARCHAR(20),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    full_name VARCHAR(200),
    mobile_number VARCHAR(20),
    alt_mobile_number VARCHAR(20),
    email VARCHAR(255),
    alt_email VARCHAR(255),
    gender VARCHAR(20),
    dob DATE,
    marital_status VARCHAR(50),
    nationality VARCHAR(50),
    language VARCHAR(50),
    religion VARCHAR(100),
    occupation VARCHAR(100),
    organization VARCHAR(255),
    designation VARCHAR(255),
    industry_type VARCHAR(100),
    experience_years INT DEFAULT 0,
    experience_months INT DEFAULT 0,
    primary_expertise VARCHAR(255),
    alt_expertise VARCHAR(255),
    pan VARCHAR(20),
    aadhaar VARCHAR(20),
    national_id VARCHAR(50),
    source_channel VARCHAR(100) DEFAULT 'Manual Entry',
    talked CHAR(1) DEFAULT 'N',
    met CHAR(1) DEFAULT 'N',
    responded CHAR(1) DEFAULT 'N',
    status VARCHAR(50) DEFAULT 'Active',
    mark_for_deletion CHAR(1) DEFAULT 'N',
    created_by VARCHAR(100),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_by VARCHAR(100),
    modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. ADDRESSES
CREATE TABLE addresses (
    id BIGSERIAL PRIMARY KEY,
    contact_id BIGINT NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
    address_type VARCHAR(20) NOT NULL,
    address_line1 VARCHAR(255),
    address_line2 VARCHAR(255),
    address_line3 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100) DEFAULT 'India',
    zip_code VARCHAR(20),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. SOCIAL MEDIA
CREATE TABLE social_media (
    id BIGSERIAL PRIMARY KEY,
    contact_id BIGINT NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
    linkedin VARCHAR(500),
    facebook VARCHAR(500),
    instagram VARCHAR(500),
    twitter VARCHAR(500),
    website VARCHAR(500),
    youtube VARCHAR(500),
    telegram VARCHAR(255),
    discord VARCHAR(255),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. MARKETING PREFERENCES
CREATE TABLE marketing_preferences (
    id BIGSERIAL PRIMARY KEY,
    contact_id BIGINT NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
    email_consent CHAR(1) DEFAULT 'Y',
    sms_consent CHAR(1) DEFAULT 'Y',
    whatsapp_consent CHAR(1) DEFAULT 'Y',
    call_consent CHAR(1) DEFAULT 'Y',
    dnd CHAR(1) DEFAULT 'N',
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. NOTES
CREATE TABLE notes (
    id BIGSERIAL PRIMARY KEY,
    contact_id BIGINT NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
    note1 TEXT,
    note2 TEXT,
    note3 TEXT,
    note4 TEXT,
    note5 TEXT,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. AUDIT LOG
CREATE TABLE audit_log (
    id BIGSERIAL PRIMARY KEY,
    contact_id BIGINT REFERENCES contacts(id) ON DELETE SET NULL,
    mob_id VARCHAR(50),
    action VARCHAR(50) NOT NULL,
    field_changed VARCHAR(100),
    old_value TEXT,
    new_value TEXT,
    changed_by VARCHAR(100),
    changed_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(50),
    remarks TEXT
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_contacts_mob_id ON contacts(mob_id);
CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_contacts_mobile ON contacts(mobile_number);
CREATE INDEX idx_contacts_status ON contacts(status);
CREATE INDEX idx_contacts_organization ON contacts(organization);
CREATE INDEX idx_contacts_deletion ON contacts(mark_for_deletion);
CREATE INDEX idx_addresses_contact ON addresses(contact_id);
CREATE INDEX idx_social_contact ON social_media(contact_id);
CREATE INDEX idx_marketing_contact ON marketing_preferences(contact_id);
CREATE INDEX idx_notes_contact ON notes(contact_id);
CREATE INDEX idx_audit_contact ON audit_log(contact_id);
CREATE INDEX idx_audit_date ON audit_log(changed_date);
