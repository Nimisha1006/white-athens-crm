const WAValidation = {
  rules: {
    required: (v) => (v && String(v).trim() ? '' : 'This field is required'),
    email: (v) => {
      if (!v) return '';
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Enter a valid email address';
    },
    phone: (v) => {
      if (!v) return '';
      const digits = v.replace(/\D/g, '');
      return digits.length === 10 ? '' : 'Enter a valid phone number (10 digits)';
    },
    pan: (v) => {
      if (!v) return '';
      return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(v) ? '' : 'Invalid PAN format (e.g. ABCDE1234F)';
    },
    aadhaar: (v) => {
      if (!v) return '';
      const digits = v.replace(/\D/g, '');
      return digits.length === 12 ? '' : 'Aadhaar must be 12 digits';
    },
    zip: (v) => {
      if (!v) return '';
      return /^\d{5,6}$/.test(v) ? '' : 'Enter a valid zip code';
    },
    date: (v) => {
      if (!v) return '';
      const d = new Date(v);
      return isNaN(d.getTime()) ? 'Invalid date' : '';
    },
    number: (v, min, max) => {
      if (v === '' || v === null || v === undefined) return '';
      const n = Number(v);
      if (isNaN(n)) return 'Must be a number';
      if (min !== undefined && n < min) return `Minimum value is ${min}`;
      if (max !== undefined && n > max) return `Maximum value is ${max}`;
      return '';
    },
  },

  validateField(input) {
    const rules = (input.dataset.validate || '').split('|').filter(Boolean);
    let error = '';
    for (const rule of rules) {
      const [name, ...params] = rule.split(':');
      const fn = this.rules[name];
      if (fn) {
        error = fn(input.value, ...params.map(Number));
        if (error) break;
      }
    }
    const field = input.closest('.field');
    if (field) {
      field.classList.toggle('field--error', !!error);
      const errEl = field.querySelector('.field__error');
      if (errEl) errEl.textContent = error;
    }
    return !error;
  },

  validateForm(form) {
    const inputs = form.querySelectorAll('[data-validate]');
    let valid = true;
    inputs.forEach((input) => {
      if (!this.validateField(input)) valid = false;
    });
    return valid;
  },

  bindForm(form) {
    form.querySelectorAll('[data-validate]').forEach((input) => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => {
        if (input.closest('.field')?.classList.contains('field--error')) {
          this.validateField(input);
        }
      });
    });
  },
};
