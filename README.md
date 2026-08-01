# LeadDesk – Lead Management System

live website URL-https://minidesk.vercel.app/

LeadDesk is a full-stack Lead Management System that enables businesses to collect customer enquiries through a modern landing page and allows administrators to securely manage those leads using a dedicated dashboard.

The project demonstrates frontend-backend integration, secure authentication using JWT, REST API development, and PostgreSQL database management.

---

## Features

### Public Website
- Modern responsive landing page
- Lead enquiry form
- Budget selection
- Success notification after submission
- Connected with FastAPI backend

### Admin Panel
- Admin Signup
- Admin Login
- JWT Authentication
- Protected Dashboard
- Dashboard statistics
- Search leads by name or email
- Filter leads by status
- View complete lead details
- Update lead status (Pending, Contacted, Closed)
- Secure Logout

---

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- React Router DOM
- Lucide React
- Fetch API

### Backend
- FastAPI
- SQLAlchemy
- PostgreSQL
- Passlib (bcrypt)
- JWT Authentication
- Python-dotenv

---

## Project Structure

```
LeadDesk/
│
├── frontend/
│   └── lead-desk/
│       ├── src/
│       ├── public/
│       ├── package.json
│       └── vite.config.js
│
├── backend/
│   ├── app/
│   │   ├── config/
│   │   ├── routes/
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── database.py
│   │   ├── dependencies.py
│   │   └── main.py
│   │
│   ├── requirements.txt
│   └── .env
│
└── README.md
```

---

## Application Workflow

```
Visitor
   │
   ▼
Landing Page
   │
Submit Enquiry
   │
POST /leads
   │
FastAPI Backend
   │
PostgreSQL Database
   │
Status = Pending
   │
──────────────
Admin Login
   │
JWT Authentication
   │
Admin Dashboard
   │
Search • Filter • View • Update Status
```

---

## API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/leads` | Submit a new lead |
| POST | `/admin/signup` | Register an admin |
| POST | `/admin/login` | Admin authentication |
| GET | `/admin/leads` | Retrieve all leads |
| PUT | `/admin/leads/{id}` | Update lead status |

---

## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/LeadDesk.git
```

---

## Frontend Setup

```bash
cd frontend/lead-desk

npm install

npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## Backend Setup

Navigate to backend

```bash
cd backend
```

Create virtual environment

```bash
python -m venv venv
```

Activate virtual environment

### Windows

```bash
venv\Scripts\activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run FastAPI

```bash
uvicorn app.main:app --reload
```

Backend runs at

```
http://127.0.0.1:8000
```

Swagger Documentation

```
http://127.0.0.1:8000/docs
```

---

## Environment Variables

Create a `.env` file inside the backend folder.

```env
DATABASE_URL=your_database_connection_string
SECRET_KEY=your_secret_key
ALGORITHM=HS256
```

---

## Database

### Admin Table

- id
- email
- password (hashed)

### Leads Table

- id
- name
- email
- budget
- message
- status
- created_at

---

## Security

- Passwords are hashed using **bcrypt**
- JWT Authentication protects admin routes
- Sensitive configuration is stored using **.env**
- Protected APIs require a valid Bearer Token

---

## Key Features

- Responsive UI
- REST API Integration
- Secure Authentication
- PostgreSQL Database
- Dashboard Analytics
- Search & Filter
- Status Management
- Protected Admin Routes

---

## Future Enhancements

- Email Notifications
- Export Leads to CSV/Excel
- Dashboard Charts
- Pagination
- Role-Based Access Control
- Dark Mode
- Lead Assignment

---

## Author

**Ishwari More**

Computer Science Engineering Student

GitHub: https://github.com/ishwari0209

---

## License

This project is developed for educational and learning purposes.
