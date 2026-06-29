/* Contact Profile — White Athens CRM */
const SOCIAL_ICONS = {
  linkedInId: '<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.127 0 2.063 2.063 0 01-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
  facebookId: '<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
  instagramId: '<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>',
  twitterId: '<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
  website: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>',
  youTubeChannel: '<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
  telegramId: '<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>',
  discordId: '<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.2252 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0953 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0953 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/></svg>',
};

const SECTION_ACCENTS = {
  B: '#2563eb', C: '#8b5cf6', D: '#3fb950', E: '#d29922',
  F: '#f85149', G: '#58a6ff', H: '#db61a2', I: '#a371f7',
  J: '#7ee787', K: '#8b949e',
};

const INDUSTRY_OPTIONS = [
  'Information Technology','Financial Services','Healthcare','Manufacturing',
  'Retail','Education','Real Estate','Transportation','SaaS','Startup','Other',
];

const ENGAGEMENT_EMOJI = { talked: '📞', met: '🤝', responded: '💬' };

const SOCIAL_LABELS = {
  linkedInId: 'LinkedIn', facebookId: 'Facebook', instagramId: 'Instagram',
  twitterId: 'Twitter/X', website: 'Website', youTubeChannel: 'YouTube',
  telegramId: 'Telegram', discordId: 'Discord',
};

let contact = null;
let isEditing = false;
let snapshot = null;
const maskedFields = new Set(['pan', 'aadhaar', 'nationalIdentificationCode']);

// ── FIX: Preserve form data on validation failure ──
function preserveFormState() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.querySelectorAll('input:not([type=file]):not([type=checkbox]), select, textarea').forEach((el) => {
    if (!el.name) return;
    if (el.name.includes('.')) {
      const [parent, child] = el.name.split('.');
      if (parent === 'currentAddress' && contact.currentAddress) contact.currentAddress[child] = el.value;
      else if (parent === 'permanentAddress' && contact.permanentAddress) contact.permanentAddress[child] = el.value;
      else if (parent === 'social' && contact.socialMedia) contact.socialMedia[child] = el.value;
    } else if (!['currentAddress','permanentAddress','engagement','marketingPreferences','socialMedia','audit'].includes(el.name)) {
      contact[el.name] = el.dataset.phone ? (el.value ? `+91 ${el.value}` : '') : el.value;
    }
  });
  form.querySelectorAll('input[type=checkbox]').forEach((el) => {
    if (!el.name) return;
    const [parent, child] = el.name.split('.');
    if (parent === 'marketing' && contact.marketingPreferences) contact.marketingPreferences[child] = el.checked;
  });
  const sameCb = document.getElementById('sameAddress');
  if (sameCb) contact.permanentAddressSameAsCurrent = sameCb.checked;
}

function params() { return new URLSearchParams(window.location.search); }

function esc(str) {
  return String(str || '')
    .replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function getMaskedDisplay(id, value) {
  if (!value) return '';
  if (!maskedFields.has(id)) return value;
  if (id === 'pan') return maskPan(value);
  if (id === 'aadhaar') return maskAadhaar(value);
  return maskValue(value, 4);
}

function field(name, label, opts = {}) {
  const { type='text', validate='', value='', readonly=false, as='input', options=[], rows=2, id=name, alwaysReadonly=false } = opts;
  const locked = alwaysReadonly || readonly || !isEditing;
  const ro = locked && as !== 'select' ? 'readonly' : '';
  const dis = locked ? 'disabled' : '';
  const err = '<span class="field__error"></span>';

  if (as === 'select') {
    return `<div class="field"><label class="field__label">${label}</label>
      <select class="field__select" name="${name}" id="${id}" data-validate="${validate}" ${dis}>
        ${options.map((o) => `<option value="${esc(o)}" ${o === value ? 'selected' : ''}>${esc(o)}</option>`).join('')}
      </select>${err}</div>`;
  }
  if (as === 'textarea') {
    return `<div class="field note-field" data-note-field>
      <div class="note-field__head">
        <label class="field__label">${label}</label>
        <div class="note-field__tools">
          <span class="note-field__count" data-count-for="${id}">0/500</span>
          <button type="button" class="note-field__expand" data-expand-note="${id}"><i data-lucide="maximize-2"></i></button>
        </div>
      </div>
      <textarea class="field__textarea field__textarea--collapsed" name="${name}" id="${id}" rows="${rows}" maxlength="500" data-validate="${validate}" data-note-input ${ro}>${esc(value)}</textarea>${err}</div>`;
  }
  return `<div class="field"><label class="field__label">${label}</label>
    <input class="field__input" type="${type}" name="${name}" id="${id}" value="${esc(value)}" data-validate="${validate}" ${ro} />${err}</div>`;
}

function fieldPhone(name, label, value, validate='') {
  const ro = !isEditing ? 'readonly' : '';
  const display = stripPhone(value);
  return `<div class="field"><label class="field__label">${label}</label>
    <div class="phone-input">
      <span class="phone-input__prefix">🇮🇳 +91</span>
      <input class="field__input phone-input__field" type="tel" name="${name}" id="${name}" value="${esc(display)}" data-validate="${validate}" data-phone ${ro} />
    </div><span class="field__error"></span></div>`;
}

function fieldMasked(id, label, value, maskType, validate='') {
  const display = getMaskedDisplay(id, value);
  const ro = !isEditing ? 'readonly' : '';
  return `<div class="field"><label class="field__label">${label}</label>
    <div class="masked-input">
      <input class="field__input ${maskedFields.has(id) ? 'field__input--masked' : ''}" type="text" name="${id}" id="${id}" value="${esc(display)}" data-validate="${validate}" data-masked="true" data-mask-type="${maskType}" data-real-value="${esc(value)}" ${ro} />
      ${!isEditing ? `<button type="button" class="masked-input__toggle" data-reveal="${id}"><i data-lucide="eye"></i></button>` : ''}
    </div><span class="field__error"></span></div>`;
}

function addressFields(formKey) {
  const sourceKey = formKey === 'permanentAddress' && contact.permanentAddressSameAsCurrent ? 'currentAddress' : formKey;
  const addr = contact[sourceKey] || {};
  const ro = !isEditing || (formKey === 'permanentAddress' && contact.permanentAddressSameAsCurrent);
  return [
    ['line1','Address Line 1'],['line2','Line 2'],['line3','Line 3'],
    ['city','City'],['state','State'],['country','Country'],['zipCode','Zip'],
  ].map(([f, lbl]) => field(`${formKey}.${f}`, lbl, { value: addr[f], readonly: ro, id: `${formKey}_${f}`, validate: f==='zipCode'?'zip':'' })).join('');
}

function collapsibleCard(sectionId, sectionLetter, icon, title, desc, body, open=true) {
  const accent = SECTION_ACCENTS[sectionLetter] || '#2563eb';
  return `<div class="card ${open?'is-open':''}" id="section-${sectionId}" data-section="${sectionLetter}" style="--accent:${accent}">
    <div class="card__header" data-toggle-card>
      <div class="card__header-left">
        <div class="card__icon"><i data-lucide="${icon}"></i></div>
        <div>
          <span class="card__section-tag">Section ${sectionLetter}</span>
          <h2 class="card__title">${title}</h2>
          <p class="card__desc">${desc}</p>
        </div>
      </div>
      <i data-lucide="chevron-down" class="card__chevron"></i>
    </div>
    <div class="card__body"><div class="card__body-inner">${body}</div></div>
  </div>`;
}

function renderBreadcrumb() {
  document.getElementById('breadcrumb').innerHTML = `
    <a href="index.html">Contacts</a>
    <span class="breadcrumb__sep">›</span>
    <span class="breadcrumb__muted">${esc(contact.id)}</span>
    <span class="breadcrumb__sep">›</span>
    <span class="breadcrumb__current">${esc(contact.fullName)}</span>`;
}

function renderStickyHeader() {
  const statusCls = contact.status === 'Active' ? 'badge--active' : 'badge--inactive';
  const avatarContent = contact.profilePicture
    ? `<img src="${contact.profilePicture}" alt="${esc(contact.fullName)}" />`
    : getInitials(contact.fullName);

  document.getElementById('stickyHeader').innerHTML = `
    <div class="contact-sticky__inner">
      <div class="contact-sticky__profile">
        <div class="avatar-wrap">
          <div class="avatar" id="avatarDisplay">${avatarContent}</div>
          ${isEditing ? `<label class="avatar-upload"><i data-lucide="camera"></i><input type="file" id="avatarUpload" accept="image/*" /></label>` : ''}
        </div>
        <div>
          <h1 class="contact-sticky__name">${esc(contact.fullName)}</h1>
          <div class="contact-sticky__meta">
            <span class="contact-sticky__id">${esc(contact.id)}</span>
            <span class="badge ${statusCls}">${contact.status.toUpperCase()}</span>
            <span class="badge badge--source">${esc(contact.sourceChannel||'Manual Entry')}</span>
          </div>
        </div>
      </div>
      <div class="contact-sticky__actions">
        ${isEditing
          ? `<button type="submit" form="contactForm" class="btn btn--primary btn--action"><span class="btn-emoji">💾</span><span class="hide-mobile">Save</span></button>`
          : `<button type="button" class="btn btn--primary btn--action" id="btnEdit"><span class="btn-emoji">✏️</span><span class="hide-mobile">Edit</span></button>`}
        <button type="button" class="btn btn--danger btn--action" id="btnDelete"><span class="btn-emoji">🗑️</span><span class="hide-mobile">Delete</span></button>
        <a href="mailto:${esc(contact.emailAddress||'')}" class="btn btn--outline btn--action"><span class="btn-emoji">📧</span><span class="hide-mobile">Email</span></a>
        <a href="tel:+91${stripPhone(contact.mobileNumber||'').replace(/\D/g,'')}" class="btn btn--outline btn--action"><span class="btn-emoji">📞</span><span class="hide-mobile">Call</span></a>
        <a href="https://wa.me/91${stripPhone(contact.mobileNumber||'').replace(/\D/g,'')}" target="_blank" rel="noopener" class="btn btn--outline btn--action"><span class="btn-emoji">💬</span><span class="hide-mobile">WhatsApp</span></a>
      </div>
    </div>`;
}

function renderViewSummary() {
  if (isEditing) return '';
  const addr = contact.currentAddress || {};
  return `<div class="contact-view-card">
    <div class="contact-view-grid">
      <div class="contact-view-item"><span class="contact-view-item__label">Mobile</span><span class="contact-view-item__value">${esc(contact.mobileNumber||'—')}</span></div>
      <div class="contact-view-item"><span class="contact-view-item__label">Email</span><span class="contact-view-item__value">${esc(contact.emailAddress||'—')}</span></div>
      <div class="contact-view-item"><span class="contact-view-item__label">Organization</span><span class="contact-view-item__value">${esc(contact.organization||'—')}</span></div>
      <div class="contact-view-item"><span class="contact-view-item__label">Designation</span><span class="contact-view-item__value">${esc(contact.designation||'—')}</span></div>
      <div class="contact-view-item"><span class="contact-view-item__label">City</span><span class="contact-view-item__value">${esc(addr.city||'—')}</span></div>
      <div class="contact-view-item"><span class="contact-view-item__label">Status</span><span class="contact-view-item__value">${esc(contact.status||'—')}</span></div>
    </div>
  </div>`;
}

function renderSections() {
  const e = contact.engagement || {};
  const m = contact.marketingPreferences || {};

  const personal = collapsibleCard('personal','B','user','Personal Information','Demographics', `
    <div class="card-grid">
      ${field('salutation','Salutation',{as:'select',options:['Mr.','Mrs.','Ms.','Dr.'],value:contact.salutation,validate:'required'})}
      ${field('firstName','First Name',{value:contact.firstName,validate:'required'})}
      ${field('lastName','Last Name',{value:contact.lastName,validate:'required'})}
      ${field('fullName','Full Name',{value:contact.fullName,alwaysReadonly:true})}
      ${field('shortName','Short Name',{value:contact.shortName})}
      ${field('gender','Gender',{as:'select',options:['Male','Female','Other','Prefer not to say'],value:contact.gender})}
      ${field('dateOfBirth','Date of Birth',{type:'date',value:contact.dateOfBirth,validate:'date'})}
      ${field('maritalStatus','Marital Status',{as:'select',options:['Single','Married','Divorced','Widowed'],value:contact.maritalStatus})}
      ${field('nationality','Nationality',{value:contact.nationality})}
      ${field('language','Language',{value:contact.language})}
      ${field('religion','Religion',{value:contact.religion})}
      ${field('education','Education',{value:contact.education})}
      ${field('incomeCategory','Income Category',{value:contact.incomeCategory})}
      ${field('fatherName','Father Name',{value:contact.fatherName})}
    </div>`, !isEditing ? false : true);

  const origin = collapsibleCard('origin','B','radio','Source & Origin','Channel info', `
    <div class="card-grid">
      ${field('originatingChannel','Originating Channel',{value:contact.originatingChannel})}
      ${field('source1','Source 1',{value:contact.source1})}
      ${field('source2','Source 2',{value:contact.source2})}
      ${field('enteredBy','Entered By',{value:contact.enteredBy})}
      ${field('cat1','Category 1',{value:contact.cat1})}
      ${field('cat2','Category 2',{value:contact.cat2})}
      ${field('cat3','Category 3',{value:contact.cat3})}
      ${field('cat4','Category 4',{value:contact.cat4})}
      ${field('cat5','Category 5',{value:contact.cat5})}
    </div>`, false);

  const contactInfo = collapsibleCard('contact-info','C','phone','Contact Information','Phone & email', `
    <div class="card-grid card-grid--2">
      ${fieldPhone('mobileNumber','Mobile Number',contact.mobileNumber,'required|phone')}
      ${fieldPhone('alternateMobileNumber','Alt Mobile',contact.alternateMobileNumber,'phone')}
      ${field('emailAddress','Email Address',{type:'email',value:contact.emailAddress,validate:'required|email'})}
      ${field('alternateEmailAddress','Alt Email',{type:'email',value:contact.alternateEmailAddress,validate:'email'})}
      ${field('countryOfResidence','Country of Residence',{value:contact.countryOfResidence})}
    </div>`);

  const address = collapsibleCard('address','D','map-pin','Address Information','Current & permanent', `
    <div class="address-split">
      <div class="address-split__col">
        <h3 class="subsection-title">Current Address</h3>
        <div class="card-grid card-grid--address">${addressFields('currentAddress')}</div>
      </div>
      <div class="address-split__col">
        <div class="address-split__head">
          <h3 class="subsection-title">Permanent Address</h3>
          <label class="toggle-row toggle-row--compact">
            <span class="toggle-row__label">Same as Current</span>
            <div class="toggle">
              <input type="checkbox" id="sameAddress" ${contact.permanentAddressSameAsCurrent?'checked':''} ${!isEditing?'disabled':''} />
              <span class="toggle__track"></span><span class="toggle__thumb"></span>
            </div>
          </label>
        </div>
        <div class="card-grid card-grid--address" id="permanentAddressFields">${addressFields('permanentAddress')}</div>
      </div>
    </div>`, false);

  const professional = collapsibleCard('professional','E','briefcase','Professional Information','Work & expertise', `
    <div class="card-grid">
      ${field('organization','Organization',{value:contact.organization,validate:'required'})}
      ${field('designation','Designation',{value:contact.designation})}
      ${field('occupation','Occupation',{value:contact.occupation})}
      ${field('industryType','Industry Type',{as:'select',options:INDUSTRY_OPTIONS,value:contact.industryType})}
      ${field('experienceYears','Exp Years',{type:'number',value:contact.experienceYears,validate:'number:0:50'})}
      ${field('experienceMonths','Exp Months',{type:'number',value:contact.experienceMonths,validate:'number:0:11'})}
      ${field('primaryExpertise','Primary Expertise',{value:contact.primaryExpertise})}
      ${field('alternateExpertise','Alternate Expertise',{value:contact.alternateExpertise})}
    </div>`);

  const identification = collapsibleCard('identification','F','fingerprint','Identification','Government ID', `
    <div class="card-grid card-grid--3">
      ${fieldMasked('pan','PAN',contact.pan,'pan','pan')}
      ${fieldMasked('aadhaar','Aadhaar',contact.aadhaar,'aadhaar','aadhaar')}
      ${fieldMasked('nationalIdentificationCode','National ID Code',contact.nationalIdentificationCode,'default')}
    </div>`, false);

  const notes = collapsibleCard('notes','J','file-text','Notes','Contact notes', `
    <div class="card-grid card-grid--notes">
      ${[1,2,3,4,5].map((n) => field(`note${n}`,`Note ${n}`,{as:'textarea',value:contact[`note${n}`],rows:2})).join('')}
    </div>`, false);

  const engagement = collapsibleCard('engagement','G','activity','Engagement','Click to toggle', `
    <div class="engagement-grid">
      ${['talked','met','responded'].map((k) => {
        const yes = e[k];
        const label = k.charAt(0).toUpperCase()+k.slice(1);
        const clickable = isEditing ? 'engagement-card--clickable' : '';
        return `<button type="button" class="engagement-card engagement-card--${yes?'yes':'no'} ${clickable}" data-engagement-toggle="${k}" ${!isEditing?'disabled':''}>
          <div class="engagement-card__icon"><i data-lucide="${k==='talked'?'phone':k==='met'?'handshake':'message-circle'}"></i></div>
          <div class="engagement-card__label">${label}</div>
          <div class="engagement-card__value">${yes?'YES':'NO'}</div>
        </button>`;
      }).join('')}
    </div>`, true);

  const marketing = collapsibleCard('marketing','H','megaphone','Marketing Preferences','Communication consent', `
    <div class="marketing-list">
      ${[['emailConsent','Email Consent',false],['smsConsent','SMS Consent',false],['whatsappConsent','WhatsApp Consent',false],['callConsent','Call Consent',false],['doNotDisturb','Do Not Disturb',true]]
        .map(([key,label,isDnd]) => `
        <label class="toggle-row ${isDnd&&m[key]?'toggle-row--danger':''}">
          <span class="toggle-row__label">${label}</span>
          <div class="toggle">
            <input type="checkbox" name="marketing.${key}" ${m[key]?'checked':''} ${!isEditing?'disabled':''} />
            <span class="toggle__track"></span><span class="toggle__thumb"></span>
          </div>
        </label>`).join('')}
    </div>`, true);

  const socialInputs = Object.keys(SOCIAL_ICONS).map((key) => {
    const val = (contact.socialMedia||{})[key];
    return `<div class="field social-field">
      <label class="field__label">${SOCIAL_LABELS[key]}</label>
      <span class="social-field__icon">${SOCIAL_ICONS[key]}</span>
      <input class="field__input" type="text" name="social.${key}" value="${esc(val)}"
        placeholder="${key==='telegramId'||key==='discordId'?'@username':'https://...'}"
        ${!isEditing?'readonly':''} />
    </div>`;
  }).join('');

  const social = collapsibleCard('social','I','share-2','Social Media','Profile links', `
    <div class="card-grid card-grid--social">${socialInputs}</div>`, false);

  const audit = collapsibleCard('audit','K','clock','Audit Information','Read-only history', `
    <div class="audit-grid">
      <div class="audit-item"><div class="audit-item__label">Created By</div><div class="audit-item__value">${esc(contact.audit?.createdBy)}</div></div>
      <div class="audit-item"><div class="audit-item__label">Created Date</div><div class="audit-item__value">${formatDateTime(contact.audit?.createdDate)}</div></div>
      <div class="audit-item"><div class="audit-item__label">Modified By</div><div class="audit-item__value">${esc(contact.audit?.modifiedBy)}</div></div>
      <div class="audit-item"><div class="audit-item__label">Modified Date</div><div class="audit-item__value">${formatDateTime(contact.audit?.modifiedDate)}</div></div>
      <div class="audit-item"><div class="audit-item__label">Status</div><div class="audit-item__value">${esc(contact.audit?.status)}</div></div>
    </div>`, true);

  const viewSummary = renderViewSummary();

  document.getElementById('mainSections').innerHTML =
    viewSummary + personal + origin + contactInfo + address + professional + identification + notes;
  document.getElementById('sidebarSections').innerHTML =
    engagement + marketing + social + audit;

  const banner = document.getElementById('editBanner');
  if (isEditing) {
    banner.hidden = false;
    banner.innerHTML = `<div class="edit-banner__inner">
      <span>✏️ Editing mode — make changes and click <strong>Save</strong></span>
      <button type="button" id="btnCancel" class="btn btn--ghost btn--sm">Cancel</button>
    </div>`;
  } else {
    banner.hidden = true;
    banner.innerHTML = '';
  }

  WAValidation.bindForm(document.getElementById('contactForm'));
  updateNoteCounters();
  lucide.createIcons();
}

function updateFullNameInForm() {
  const sal = document.getElementById('salutation')?.value || contact.salutation;
  const fn = document.getElementById('firstName')?.value || contact.firstName;
  const ln = document.getElementById('lastName')?.value || contact.lastName;
  const full = buildFullName(sal, fn, ln);
  const fullEl = document.getElementById('fullName');
  if (fullEl) fullEl.value = full;
  contact.fullName = full;
}

function updateNoteCounters() {
  document.querySelectorAll('[data-note-input]').forEach((ta) => {
    const counter = document.querySelector(`[data-count-for="${ta.id}"]`);
    if (counter) counter.textContent = `${ta.value.length}/500`;
  });
}

function bindInteractions() {
  document.querySelectorAll('[data-toggle-card]').forEach((header) => {
    header.onclick = () => header.closest('.card').classList.toggle('is-open');
  });

  document.querySelectorAll('[data-reveal]').forEach((btn) => {
    btn.onclick = (ev) => {
      ev.preventDefault();
      const id = btn.dataset.reveal;
      const input = document.getElementById(id);
      if (!input || !maskedFields.has(id)) return;
      maskedFields.delete(id);
      input.value = input.dataset.realValue;
      input.classList.remove('field__input--masked');
      btn.innerHTML = '<i data-lucide="eye-off"></i>';
      lucide.createIcons();
    };
  });

  document.querySelectorAll('[data-expand-note]').forEach((btn) => {
    btn.onclick = () => {
      const id = btn.dataset.expandNote;
      const ta = document.getElementById(id);
      if (ta) { ta.classList.toggle('field__textarea--expanded'); ta.classList.toggle('field__textarea--collapsed'); }
    };
  });

  document.querySelectorAll('[data-note-input]').forEach((ta) => {
    ta.oninput = () => {
      const counter = document.querySelector(`[data-count-for="${ta.id}"]`);
      if (counter) counter.textContent = `${ta.value.length}/500`;
    };
  });

  ['salutation','firstName','lastName'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', updateFullNameInForm);
    if (el && el.tagName === 'SELECT') el.addEventListener('change', updateFullNameInForm);
  });

  document.querySelectorAll('[data-engagement-toggle]').forEach((card) => {
    card.onclick = () => {
      if (!isEditing) return;
      preserveFormState(); // ← ADD THIS LINE
      const key = card.dataset.engagementToggle;
      contact.engagement[key] = !contact.engagement[key];
      renderSections(); bindInteractions();
    };
  });

  const sameCb = document.getElementById('sameAddress');
  if (sameCb) {
    sameCb.onchange = () => {
      preserveFormState(); // ← ADD THIS LINE
      contact.permanentAddressSameAsCurrent = sameCb.checked;
      if (sameCb.checked) contact.permanentAddress = { ...contact.currentAddress };
      renderSections(); bindInteractions();
    };
  }

  const upload = document.getElementById('avatarUpload');
  if (upload) {
    upload.onchange = (ev) => {
      const file = ev.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (r) => {
        contact.profilePicture = r.target.result;
        document.getElementById('avatarDisplay').innerHTML = `<img src="${r.target.result}" alt="Profile" />`;
      };
      reader.readAsDataURL(file);
    };
  }

  document.getElementById('btnEdit') && (document.getElementById('btnEdit').onclick = () => {
    isEditing = true;
    maskedFields.clear();
    ['pan','aadhaar','nationalIdentificationCode'].forEach((f) => maskedFields.add(f));
    renderAll();
  });

  document.getElementById('btnCancel') && (document.getElementById('btnCancel').onclick = () => {
    contact = JSON.parse(JSON.stringify(snapshot));
    isEditing = false;
    ['pan','aadhaar','nationalIdentificationCode'].forEach((f) => maskedFields.add(f));
    renderAll();
  });

  document.getElementById('btnDelete') && (document.getElementById('btnDelete').onclick = async () => {
    if (contact._isNew) { window.location.href = 'index.html'; return; }
    if (confirm('Soft delete this contact? Status will be set to Inactive.')) {
      try {
        await apiDeleteContact(contact._dbId);
        showToast('Contact archived successfully.');
        window.location.href = 'index.html';
      } catch (err) {
        showToast(`❌ Delete failed: ${err.message}`, 'error');
      }
    }
  });

  document.querySelectorAll('input[name^="marketing."]').forEach((cb) => {
    cb.onchange = () => {
      const row = cb.closest('.toggle-row');
      if (row && cb.name === 'marketing.doNotDisturb') row.classList.toggle('toggle-row--danger', cb.checked);
    };
  });
}

function collectFormData() {
  const form = document.getElementById('contactForm');
  const data = {
    currentAddress: { ...contact.currentAddress },
    permanentAddress: { ...contact.permanentAddress },
    engagement: { ...contact.engagement },
    marketingPreferences: { ...contact.marketingPreferences },
    socialMedia: { ...contact.socialMedia },
  };

  form.querySelectorAll('input:not([type=file]):not([type=checkbox]), select, textarea').forEach((el) => {
    if (!el.name || el.type === 'checkbox') return;
    let val = el.value;
    if (el.dataset.phone) val = val ? `+91 ${val}` : '';
    if (el.name.includes('.')) {
      const [parent, child] = el.name.split('.');
      if (parent === 'currentAddress' || parent === 'permanentAddress') data[parent][child] = val;
      else if (parent === 'social') data.socialMedia[child] = val;
    } else if (!['currentAddress','permanentAddress','engagement','marketingPreferences','socialMedia','audit'].includes(el.name)) {
      data[el.name] = val;
    }
  });

  form.querySelectorAll('input[type=checkbox]').forEach((el) => {
    if (!el.name) return;
    const [parent, child] = el.name.split('.');
    if (parent === 'marketing') data.marketingPreferences[child] = el.checked;
  });

  ['pan','aadhaar','nationalIdentificationCode'].forEach((f) => {
    const el = document.getElementById(f);
    if (el) {
      const real = el.dataset.realValue || contact[f];
      data[f] = el.classList.contains('field__input--masked') ? real : el.value;
    }
  });

  data.fullName = buildFullName(data.salutation || contact.salutation, data.firstName, data.lastName);
  data.experienceYears = Number(data.experienceYears) || 0;
  data.experienceMonths = Number(data.experienceMonths) || 0;
  data.permanentAddressSameAsCurrent = document.getElementById('sameAddress')?.checked || false;
  if (data.permanentAddressSameAsCurrent) data.permanentAddress = { ...data.currentAddress };
  if (contact.profilePicture) data.profilePicture = contact.profilePicture;
  data.audit = { ...contact.audit, modifiedBy: 'Current User', modifiedDate: new Date().toISOString() };

  return data;
}

function renderAll() {
  renderBreadcrumb();
  renderStickyHeader();
  renderSections();
  bindInteractions();
  lucide.createIcons();
}

async function init() {
  const p = params();
  const isNew = p.get('new') === '1';
  const id = p.get('id');

  if (isNew) {
    contact = {
      _isNew: true, id: null, _dbId: null,
      status: 'Active', sourceChannel: 'Manual Entry', salutation: 'Mr.',
      firstName: '', lastName: '', shortName: '', fullName: 'New Contact', gender: 'Male',
      dateOfBirth: '', maritalStatus: 'Single', nationality: 'Indian', language: 'English',
      religion: '', education: '', incomeCategory: '', fatherName: '',
      originatingChannel: '', source1: '', source2: '', enteredBy: '',
      cat1: '', cat2: '', cat3: '', cat4: '', cat5: '',
      mobileNumber: '', alternateMobileNumber: '', emailAddress: '', alternateEmailAddress: '',
      countryOfResidence: '',
      currentAddress: { line1:'', line2:'', line3:'', city:'', state:'', country:'India', zipCode:'' },
      permanentAddressSameAsCurrent: true,
      permanentAddress: { line1:'', line2:'', line3:'', city:'', state:'', country:'India', zipCode:'' },
      organization: '', designation: '', occupation: '', industryType: 'Information Technology',
      experienceYears: 0, experienceMonths: 0, primaryExpertise: '', alternateExpertise: '',
      pan: '', aadhaar: '', nationalIdentificationCode: '',
      engagement: { talked: false, met: false, responded: false },
      marketingPreferences: { emailConsent: true, smsConsent: true, whatsappConsent: true, callConsent: true, doNotDisturb: false },
      socialMedia: { linkedInId:'', facebookId:'', instagramId:'', twitterId:'', website:'', youTubeChannel:'', telegramId:'', discordId:'' },
      note1:'', note2:'', note3:'', note4:'', note5:'',
      audit: { createdBy:'', createdDate:'', modifiedBy:'', modifiedDate:'', status:'Active' },
    };
    isEditing = true;
  } else if (id) {
    try {
      contact = await apiGetContactById(id);
    } catch (err) {
      showToast(`Failed to load contact: ${err.message}`, 'error');
      window.location.href = 'index.html';
      return;
    }
    if (!contact) { window.location.href = 'index.html'; return; }
    isEditing = p.get('edit') === '1';
  } else {
    window.location.href = 'index.html';
    return;
  }

  snapshot = JSON.parse(JSON.stringify(contact));
  ['pan','aadhaar','nationalIdentificationCode'].forEach((f) => maskedFields.add(f));

  document.getElementById('contactForm').onsubmit = async (ev) => {
    ev.preventDefault();

    // ── FIX: Preserve form state before validation ──
    preserveFormState();

    if (!WAValidation.validateForm(ev.target)) {
      showToast('Please fix validation errors before saving.', 'error');
      return;
    }

    const data = collectFormData();
    try {
      if (contact._isNew) {
        contact = await apiCreateContact(data);
        if (contact._dbId) window.history.replaceState({}, '', `contact.html?id=${contact._dbId}`);
      } else {
        contact = await apiUpdateContact(contact._dbId, data);
      }
      snapshot = JSON.parse(JSON.stringify(contact));
      isEditing = false;
      ['pan','aadhaar','nationalIdentificationCode'].forEach((f) => maskedFields.add(f));
      renderAll();
      showToast('✅ Contact saved successfully!');
    } catch (err) {
      showToast(`❌ Save failed: ${err.message}`, 'error');
    }
  };

  renderAll();
}

document.addEventListener('DOMContentLoaded', init);