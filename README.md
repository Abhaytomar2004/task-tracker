# Task Tracker Application

A full-stack task management application with support for task dependencies and circular dependency prevention.  
Built with a clean REST API and a modern frontend for clarity, scalability, and maintainability.

---

## Tech Stack

### Backend
- Django
- Django REST Framework
- SQLite (default, easily swappable)
- RESTful API design

### Frontend
- React
- Vite
- JavaScript
- Fetch API

---

## Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Linux / Mac
venv\Scripts\activate      # Windows

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

Backend URL

http://127.0.0.1:8000/

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



## 3. Brief Write-up
Circular Dependency Detection Algorithm

I implemented circular dependency detection using a Depth-First Search (DFS) approach on the task dependency graph.
Each task is treated as a node, and dependencies are directed edges.

When adding a new dependency, the system performs DFS starting from the dependent task to check if the source task is reachable again. If so, a circular dependency is detected and prevented. The algorithm also reconstructs and returns the exact cycle path.

Time Complexity:
O(V + E), where V is the number of tasks and E is the number of dependencies.

Most Challenging Part

The most challenging part was accurately detecting circular dependencies while also returning the exact cycle path.
This required careful tracking of the recursion stack during DFS to reconstruct the path without false positives.

Future Improvements

Given more time, I would improve the dependency graph visualization, add real-time updates, and enhance UI/UX. I would also add more automated tests for complex dependency scenarios.