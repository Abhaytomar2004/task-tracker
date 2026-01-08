# README.md

# Task Tracker

A simple task tracking application with a backend API and frontend UI.
Built as part of an SDE internship assignment.

---

## Tech Stack

### Backend
- Python
- Django
- Django REST Framework
- SQLite

### Frontend
- React
- Axios

---

## Project Structure

task-tracker/
├── backend/
│   ├── core/
│   ├── tasks/
│   ├── manage.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── README.md
└── DECISIONS.md

---

## Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

## Backend

Backend will be available at:
http://127.0.0.1:8000/


---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev

Frontend will be available at:
http://localhost:5173/

## API Endpoints

- GET `/api/tasks/`
- POST `/api/tasks/`
- PUT `/api/tasks/<id>/`
- DELETE `/api/tasks/<id>/`

---

## Features

- Create, update, and delete tasks
- Support for task dependencies
- Circular dependency prevention
- Clean REST API design
- Meaningful commit history

---

## Notes

- Logic for handling circular dependencies is explained in `DECISIONS.md`
- Designed with scalability and clarity in mind

---

## Author

Abhay Tomar
