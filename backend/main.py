from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import or_, func
from typing import Optional
import math

from database import engine, get_db, Base
import models, schemas

# Create all tables
Base.metadata.create_all(bind=engine)

# FastAPI app
app = FastAPI(
    title="White Athens CRM API",
    description="Contact Management System API",
    version="1.0.0"
)

# CORS — allows UI to talk to API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Helper: Generate MOB ID ──
def generate_mob_id(db: Session) -> str:
    count = db.query(models.Contact).count()
    return f"MOB-{str(count + 1).zfill(3)}"

# ── Helper: Create Audit Log ──
def create_audit(db: Session, contact_id: int, mob_id: str, action: str, changed_by: str = "System", remarks: str = ""):
    log = models.AuditLog(
        contact_id=contact_id,
        mob_id=mob_id,
        action=action,
        changed_by=changed_by,
        remarks=remarks
    )
    db.add(log)

# ── ROOT ──
@app.get("/")
def root():
    return {"message": "White Athens CRM API is running!", "version": "1.0.0"}

# ── CREATE CONTACT ──
@app.post("/api/contacts", response_model=schemas.ContactOut, status_code=201)
def create_contact(contact: schemas.ContactCreate, db: Session = Depends(get_db)):
    # Check duplicate mobile
    existing = db.query(models.Contact).filter(
        models.Contact.mobile_number == contact.mobile_number,
        models.Contact.mark_for_deletion == 'N'
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Mobile number already exists!")

    # Check duplicate email
    if contact.email:
        existing_email = db.query(models.Contact).filter(
            models.Contact.email == contact.email,
            models.Contact.mark_for_deletion == 'N'
        ).first()
        if existing_email:
            raise HTTPException(status_code=400, detail="Email already exists!")

    # Generate MOB ID
    mob_id = generate_mob_id(db)

    # Create contact
    db_contact = models.Contact(
        mob_id=mob_id,
        created_by="Admin",
        modified_by="Admin",
        **contact.model_dump(exclude={'addresses', 'social_media', 'marketing_preferences', 'notes'})
    )
    db.add(db_contact)
    db.flush()

    # Add addresses
    if contact.addresses:
        for addr in contact.addresses:
            db_addr = models.Address(contact_id=db_contact.id, **addr.model_dump())
            db.add(db_addr)

    # Add social media
    if contact.social_media:
        db_social = models.SocialMedia(contact_id=db_contact.id, **contact.social_media.model_dump())
        db.add(db_social)

    # Add marketing preferences
    if contact.marketing_preferences:
        db_mkt = models.MarketingPreference(contact_id=db_contact.id, **contact.marketing_preferences.model_dump())
        db.add(db_mkt)
    else:
        db_mkt = models.MarketingPreference(contact_id=db_contact.id)
        db.add(db_mkt)

    # Add notes
    if contact.notes:
        db_notes = models.Note(contact_id=db_contact.id, **contact.notes.model_dump())
        db.add(db_notes)
    else:
        db_notes = models.Note(contact_id=db_contact.id)
        db.add(db_notes)

    # Audit log
    create_audit(db, db_contact.id, mob_id, "CREATE", remarks="Contact created")

    db.commit()
    db.refresh(db_contact)
    return db_contact

# ── GET ALL CONTACTS (with pagination, search, filters) ──
@app.get("/api/contacts", response_model=schemas.PaginatedContacts)
def get_contacts(
    page: int = Query(1, ge=1),
    per_page: int = Query(10, ge=1, le=100),
    search: Optional[str] = None,
    status: Optional[str] = None,
    city: Optional[str] = None,
    organization: Optional[str] = None,
    db: Session = Depends(get_db)
):
    # Subquery: get the Current address city for each contact
    current_addr = db.query(
        models.Address.contact_id,
        models.Address.city
    ).filter(models.Address.address_type == 'Current').subquery()

    query = db.query(
        models.Contact,
        current_addr.c.city
    ).outerjoin(
        current_addr, models.Contact.id == current_addr.c.contact_id
    ).filter(models.Contact.mark_for_deletion == 'N')

    # Search
    if search:
        query = query.filter(or_(
            models.Contact.full_name.ilike(f"%{search}%"),
            models.Contact.email.ilike(f"%{search}%"),
            models.Contact.mobile_number.ilike(f"%{search}%"),
            models.Contact.mob_id.ilike(f"%{search}%"),
            models.Contact.organization.ilike(f"%{search}%")
        ))

    # Filters
    if status and status != "all":
        query = query.filter(models.Contact.status == status)
    if organization and organization != "all":
        query = query.filter(models.Contact.organization == organization)
    if city and city != "all":
        query = query.filter(current_addr.c.city == city)

    # Pagination
    total = query.count()
    total_pages = math.ceil(total / per_page) if total else 1
    rows = query.order_by(models.Contact.created_date.desc()) \
                .offset((page - 1) * per_page) \
                .limit(per_page).all()

    data = []
    for contact_obj, city_val in rows:
        item = schemas.ContactList(
            id=contact_obj.id,
            mob_id=contact_obj.mob_id,
            full_name=contact_obj.full_name,
            mobile_number=contact_obj.mobile_number,
            email=contact_obj.email,
            organization=contact_obj.organization,
            city=city_val,
            status=contact_obj.status,
            created_date=contact_obj.created_date,
        )
        data.append(item)

    return {
        "total": total,
        "page": page,
        "per_page": per_page,
        "total_pages": total_pages,
        "data": data
    }

# ── GET ONE CONTACT ──
@app.get("/api/contacts/{contact_id}", response_model=schemas.ContactOut)
def get_contact(contact_id: int, db: Session = Depends(get_db)):
    contact = db.query(models.Contact).filter(
        models.Contact.id == contact_id,
        models.Contact.mark_for_deletion == 'N'
    ).first()
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found!")
    return contact

# ── UPDATE CONTACT ──
# ── REPLACE your existing update_contact function in main.py with this ──

@app.put("/api/contacts/{contact_id}", response_model=schemas.ContactOut)
def update_contact(contact_id: int, contact_update: schemas.ContactUpdate, db: Session = Depends(get_db)):
    db_contact = db.query(models.Contact).filter(
        models.Contact.id == contact_id,
        models.Contact.mark_for_deletion == 'N'
    ).first()
    if not db_contact:
        raise HTTPException(status_code=404, detail="Contact not found!")

    # ── Duplicate mobile check (excluding this contact itself) ──
    if contact_update.mobile_number:
        dup_mobile = db.query(models.Contact).filter(
            models.Contact.mobile_number == contact_update.mobile_number,
            models.Contact.id != contact_id,
            models.Contact.mark_for_deletion == 'N'
        ).first()
        if dup_mobile:
            raise HTTPException(status_code=400, detail="Mobile number already used by another contact!")

    # ── Duplicate email check (excluding this contact itself) ──
    if contact_update.email:
        dup_email = db.query(models.Contact).filter(
            models.Contact.email == contact_update.email,
            models.Contact.id != contact_id,
            models.Contact.mark_for_deletion == 'N'
        ).first()
        if dup_email:
            raise HTTPException(status_code=400, detail="Email already used by another contact!")

    # Update main fields
    update_data = contact_update.model_dump(exclude={'addresses', 'social_media', 'marketing_preferences', 'notes'}, exclude_none=True)
    for field, value in update_data.items():
        setattr(db_contact, field, value)
    db_contact.modified_by = "Admin"

    # Update addresses
    if contact_update.addresses is not None:
        db.query(models.Address).filter(models.Address.contact_id == contact_id).delete()
        for addr in contact_update.addresses:
            db_addr = models.Address(contact_id=contact_id, **addr.model_dump())
            db.add(db_addr)

    # Update social media
    if contact_update.social_media is not None:
        existing = db.query(models.SocialMedia).filter(models.SocialMedia.contact_id == contact_id).first()
        if existing:
            for field, value in contact_update.social_media.model_dump().items():
                setattr(existing, field, value)
        else:
            db.add(models.SocialMedia(contact_id=contact_id, **contact_update.social_media.model_dump()))

    # Update marketing preferences
    if contact_update.marketing_preferences is not None:
        existing = db.query(models.MarketingPreference).filter(models.MarketingPreference.contact_id == contact_id).first()
        if existing:
            for field, value in contact_update.marketing_preferences.model_dump().items():
                setattr(existing, field, value)
        else:
            db.add(models.MarketingPreference(contact_id=contact_id, **contact_update.marketing_preferences.model_dump()))

    # Update notes
    if contact_update.notes is not None:
        existing = db.query(models.Note).filter(models.Note.contact_id == contact_id).first()
        if existing:
            for field, value in contact_update.notes.model_dump().items():
                setattr(existing, field, value)
        else:
            db.add(models.Note(contact_id=contact_id, **contact_update.notes.model_dump()))

    # Audit log
    create_audit(db, contact_id, db_contact.mob_id, "UPDATE", remarks="Contact updated")

    db.commit()
    db.refresh(db_contact)
    return db_contact

# ── SOFT DELETE ──
@app.delete("/api/contacts/{contact_id}", response_model=schemas.MessageResponse)
def delete_contact(contact_id: int, db: Session = Depends(get_db)):
    db_contact = db.query(models.Contact).filter(
        models.Contact.id == contact_id,
        models.Contact.mark_for_deletion == 'N'
    ).first()
    if not db_contact:
        raise HTTPException(status_code=404, detail="Contact not found!")

    db_contact.mark_for_deletion = 'Y'
    db_contact.status = 'Inactive'

    create_audit(db, contact_id, db_contact.mob_id, "DELETE", remarks="Contact marked for deletion")

    db.commit()
    return {"message": "Contact deleted successfully!", "mob_id": db_contact.mob_id}

# ── SEARCH CONTACTS ──
@app.get("/api/contacts/search/query", response_model=list[schemas.ContactList])
def search_contacts(q: str = Query(..., min_length=1), db: Session = Depends(get_db)):
    contacts = db.query(models.Contact).filter(
        models.Contact.mark_for_deletion == 'N',
        or_(
            models.Contact.full_name.ilike(f"%{q}%"),
            models.Contact.email.ilike(f"%{q}%"),
            models.Contact.mobile_number.ilike(f"%{q}%"),
            models.Contact.mob_id.ilike(f"%{q}%"),
            models.Contact.organization.ilike(f"%{q}%")
        )
    ).limit(20).all()
    return contacts

# ── GET FILTER OPTIONS ──
@app.get("/api/filters")
def get_filters(db: Session = Depends(get_db)):
    organizations = db.query(models.Contact.organization).filter(
        models.Contact.mark_for_deletion == 'N',
        models.Contact.organization != None
    ).distinct().all()

    cities = db.query(models.Address.city).filter(
        models.Address.city != None,
        models.Address.address_type == 'Current'
    ).distinct().all()

    return {
        "organizations": [o[0] for o in organizations if o[0]],
        "cities": [c[0] for c in cities if c[0]]
    }

# ── GET AUDIT LOG ──
@app.get("/api/contacts/{contact_id}/audit", response_model=list[schemas.AuditLogOut])
def get_audit_log(contact_id: int, db: Session = Depends(get_db)):
    logs = db.query(models.AuditLog).filter(
        models.AuditLog.contact_id == contact_id
    ).order_by(models.AuditLog.changed_date.desc()).all()
    return logs