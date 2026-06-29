# White Athens CRM — Contact Management System

A full-stack CRM platform built during internship at White Athens AI Platform.

## Tech Stack
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Python, FastAPI, SQLAlchemy
- **Database**: PostgreSQL
- **Deployment**: Docker, docker-compose

## Project Structure
```
CRM/
├── backend/
│   ├── main.py          # FastAPI app + all routes
│   ├── models.py        # SQLAlchemy models
│   ├── schemas.py       # Pydantic schemas
│   ├── database.py      # DB connection
│   └── requirements.txt
├── web/
│   ├── index.html       # Dashboard
│   ├── contact.html     # Contact profile
│   ├── css/styles.css
│   └── js/
│       ├── api.js       # API layer
│       ├── contact.js   # Contact form logic
│       ├── dashboard.js # Dashboard logic
│       ├── validation.js
│       ├── data.js
│       └── theme.js
├── schema.sql           # Database schema
├── docker-compose.yml
├── Dockerfile.backend
├── Dockerfile.web
└── .env.example
```

## Quick Start (Docker)

1. Clone the repository
2. Copy `.env.example` to `.env` and set your password:
   ```
   cp .env.example .env
   ```
3. Start everything with one command:
   ```
   docker-compose up --build
   ```
4. Open your browser:
   - Frontend: http://localhost
   - API Docs: http://localhost:8000/docs

## Manual Setup (Local)

### Database
1. Install PostgreSQL
2. Create database: `createdb crm_db`
3. Run schema: `psql -d crm_db -f schema.sql`

### Backend
```bash
cd backend
pip install -r requirements.txt
# Edit database.py and set your PostgreSQL password
uvicorn main:app --reload
```

### Frontend
Open `web/index.html` with Live Server in VS Code
or any static file server.

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/contacts | List all contacts |
| POST | /api/contacts | Create contact |
| GET | /api/contacts/{id} | Get one contact |
| PUT | /api/contacts/{id} | Update contact |
| DELETE | /api/contacts/{id} | Soft delete |
| GET | /api/contacts/search/query | Search |
| GET | /api/filters | Get filter options |
| GET | /api/contacts/{id}/audit | Audit log |

## Features
- Complete CRUD for contacts
- Real-time search and multi-filter dashboard
- Light/Dark mode
- Pagination
- Soft delete with audit trail
- Frontend + backend validation
- Duplicate prevention (mobile + email)
- DKIM/SPF/DMARC email infrastructure (AWS SES)
- Docker deployment