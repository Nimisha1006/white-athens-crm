const API_URL = "http://127.0.0.1:8000";
const PAGE_SIZE = 10;

let state = {
  search: '',
  statusFilter: 'all',
  cityFilter: 'all',
  orgFilter: 'all',
  sortKey: 'created_date',
  sortDir: 'desc',
  page: 1,
  totalPages: 1,
  total: 0,
};

// ── API Calls ──────────────────────────────────────────

async function fetchContacts() {
  try {
    const params = new URLSearchParams({
      page: state.page,
      per_page: PAGE_SIZE,
    });

    if (state.search) params.append('search', state.search);
    if (state.statusFilter !== 'all') params.append('status', state.statusFilter);
    if (state.cityFilter !== 'all') params.append('city', state.cityFilter);
    if (state.orgFilter !== 'all') params.append('organization', state.orgFilter);

    const res = await fetch(`${API_URL}/api/contacts?${params}`);
    if (!res.ok) throw new Error('Failed to fetch contacts');
    return await res.json();
  } catch (err) {
    console.error('Error fetching contacts:', err);
    showToast('Failed to load contacts. Is the backend running?', 'error');
    return { data: [], total: 0, page: 1, total_pages: 1, per_page: PAGE_SIZE };
  }
}

async function fetchFilters() {
  try {
    const res = await fetch(`${API_URL}/api/filters`);
    if (!res.ok) throw new Error('Failed to fetch filters');
    return await res.json();
  } catch (err) {
    console.error('Error fetching filters:', err);
    return { cities: [], organizations: [] };
  }
}

async function deleteContactAPI(contactId) {
  try {
    const res = await fetch(`${API_URL}/api/contacts/${contactId}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete contact');
    return await res.json();
  } catch (err) {
    console.error('Error deleting contact:', err);
    showToast('Failed to delete contact!', 'error');
    return null;
  }
}

// ── Render Filter Buttons ──────────────────────────────

function renderFilterButtons(containerId, items, dataAttr, allLabel) {
  const container = document.getElementById(containerId);
  const prefix = container.querySelector('span');
  container.innerHTML = '';
  if (prefix) container.appendChild(prefix);

  const allBtn = document.createElement('button');
  allBtn.type = 'button';
  allBtn.className = 'filter-btn is-active';
  allBtn.dataset[dataAttr] = 'all';
  allBtn.textContent = allLabel;
  container.appendChild(allBtn);

  items.forEach((item) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'filter-btn';
    btn.dataset[dataAttr] = item;
    btn.textContent = item.length > 18 ? item.slice(0, 16) + '…' : item;
    btn.title = item;
    container.appendChild(btn);
  });
}

// ── Status Badge ──────────────────────────────────────

function statusBadge(status) {
  const cls = status === 'Active' ? 'badge--active' : 'badge--inactive';
  return `<span class="badge ${cls}">${status}</span>`;
}

// ── Format Date ───────────────────────────────────────

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

// ── Show Toast ────────────────────────────────────────

function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `
    <i data-lucide="${type === 'success' ? 'check-circle' : 'alert-circle'}"></i>
    <span>${message}</span>
  `;
  container.appendChild(toast);
  lucide.createIcons();
  setTimeout(() => toast.remove(), 3500);
}

// ── Render Table ──────────────────────────────────────

async function renderTable() {
  const tbody = document.getElementById('tableBody');

  // Show loading state
  tbody.innerHTML = `
    <tr><td colspan="9" style="text-align:center;padding:40px;color:var(--text-muted);">
      <i data-lucide="loader-2"></i> Loading contacts...
    </td></tr>`;
  lucide.createIcons();

  // Fetch from API
  const result = await fetchContacts();
  const contacts = result.data || [];

  state.total = result.total || 0;
  state.totalPages = result.total_pages || 1;
  state.page = result.page || 1;

  const start = (state.page - 1) * PAGE_SIZE;

  if (contacts.length === 0) {
    tbody.innerHTML = `
      <tr><td colspan="9">
        <div class="empty-state">
          <i data-lucide="users"></i>
          <p>No contacts found. Try adjusting your search or filters.</p>
        </div>
      </td></tr>`;
  } else {
    tbody.innerHTML = contacts.map((c) => `
      <tr>
        <td class="mono">${c.mob_id}</td>
        <td><strong class="contact-name" style="cursor:pointer;" onclick="window.location='contact.html?id=${c.id}'">${c.full_name || '—'}</strong></td>
        <td>${c.mobile_number || '—'}</td>
        <td>${c.email || '—'}</td>
        <td>${c.organization || '—'}</td>
        <td>${c.city || '—'}</td>
        <td>${statusBadge(c.status || 'Active')}</td>
        <td>${formatDate(c.created_date)}</td>
        <td>
          <div class="table-actions">
            <a href="contact.html?id=${c.id}" class="btn btn--ghost btn--sm" title="View">
              <i data-lucide="eye"></i>
            </a>
            <a href="contact.html?id=${c.id}&edit=1" class="btn btn--ghost btn--sm" title="Edit">
              <i data-lucide="pencil"></i>
            </a>
            <button type="button" class="btn btn--ghost btn--sm" data-delete="${c.id}" data-mob="${c.mob_id}" title="Delete">
              <i data-lucide="trash-2"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  // Pagination
  document.getElementById('pagination').innerHTML = `
    <span class="pagination__info">
      Showing ${state.total === 0 ? 0 : start + 1}–${Math.min(start + PAGE_SIZE, state.total)} of ${state.total} contacts
    </span>
    <div class="pagination__controls">
      <button type="button" class="btn btn--secondary btn--sm" id="prevPage" ${state.page <= 1 ? 'disabled' : ''}>
        <i data-lucide="chevron-left"></i> Previous
      </button>
      <span style="padding:0 8px;font-size:13px;color:var(--text-muted);">Page ${state.page} / ${state.totalPages}</span>
      <button type="button" class="btn btn--secondary btn--sm" id="nextPage" ${state.page >= state.totalPages ? 'disabled' : ''}>
        Next <i data-lucide="chevron-right"></i>
      </button>
    </div>
  `;

  // Sorted column highlight
  document.querySelectorAll('#contactsTable th[data-sort]').forEach((th) => {
    th.classList.toggle('is-sorted', th.dataset.sort === state.sortKey);
  });

  lucide.createIcons();
}

// ── Init ──────────────────────────────────────────────

async function init() {
  // Fetch filter options from API
  const filters = await fetchFilters();

  renderFilterButtons('cityFilters', filters.cities || [], 'filterCity', 'All Cities');
  renderFilterButtons('orgFilters', filters.organizations || [], 'filterOrg', 'All Orgs');

  // Search
  let searchTimer;
  document.getElementById('searchInput').addEventListener('input', (e) => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      state.search = e.target.value;
      state.page = 1;
      renderTable();
    }, 400);
  });

  // Status filter
  document.getElementById('statusFilters').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-filter-status]');
    if (!btn) return;
    document.querySelectorAll('#statusFilters .filter-btn').forEach((b) => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    state.statusFilter = btn.dataset.filterStatus;
    state.page = 1;
    renderTable();
  });

  // City filter
  document.getElementById('cityFilters').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-filter-city]');
    if (!btn) return;
    document.querySelectorAll('#cityFilters .filter-btn').forEach((b) => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    state.cityFilter = btn.dataset.filterCity;
    state.page = 1;
    renderTable();
  });

  // Org filter
  document.getElementById('orgFilters').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-filter-org]');
    if (!btn) return;
    document.querySelectorAll('#orgFilters .filter-btn').forEach((b) => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    state.orgFilter = btn.dataset.filterOrg;
    state.page = 1;
    renderTable();
  });

  // Table click — sort + delete
  document.getElementById('contactsTable').addEventListener('click', async (e) => {
    // Sort
    const th = e.target.closest('th[data-sort]');
    if (th) {
      const key = th.dataset.sort;
      if (state.sortKey === key) {
        state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortKey = key;
        state.sortDir = 'asc';
      }
      renderTable();
      return;
    }

    // Delete
    const delBtn = e.target.closest('[data-delete]');
    if (delBtn) {
      const id = delBtn.dataset.delete;
      const mob = delBtn.dataset.mob;
      if (confirm(`Delete contact ${mob}? This will mark them as inactive.`)) {
        const result = await deleteContactAPI(id);
        if (result) {
          showToast(`Contact ${mob} deleted successfully!`);
          renderTable();
        }
      }
    }
  });

  // Pagination
  document.getElementById('pagination').addEventListener('click', (e) => {
    if (e.target.closest('#prevPage') && state.page > 1) {
      state.page--;
      renderTable();
    }
    if (e.target.closest('#nextPage') && state.page < state.totalPages) {
      state.page++;
      renderTable();
    }
  });

  // Initial render
  renderTable();
}

document.addEventListener('DOMContentLoaded', init);