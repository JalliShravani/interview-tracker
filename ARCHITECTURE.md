# 🏗 Architecture Overview

## 📌 Application Structure

The Smart Interview Preparation Tracker follows a **full-stack modular architecture** with clear separation between frontend and backend.

### 🔹 Backend (`interview-tracker-backend/`)
- Built using **Node.js + Express**
- Uses **MongoDB with Mongoose ORM** for data persistence
- Implements **JWT-based authentication**
- Organized into:
  - `controllers/` → Business logic
  - `routes/` → API endpoints
  - `models/` → Database schemas
  - `middleware/` → Authentication & validation

### 🔹 Frontend (`interview-tracker-frontend/`)
- Built using **React**
- Uses **React Router** for navigation
- Organized into:
  - `pages/` → Login, Signup, Topics, Tasks, Dashboard
  - `components/` → Navbar and reusable UI
  - `services/` → API calls using Axios

---

## 🔄 Data Flow

1. User interacts with the React frontend (UI actions)
2. Frontend sends HTTP requests via Axios to backend APIs (`/api/*`)
3. Backend processes requests using controllers
4. Data is stored/retrieved from MongoDB
5. Backend sends response
6. Frontend updates UI dynamically using React state

---

## 🧩 Core Feature Modules

### 🔐 Authentication
- User signup & login
- JWT token generation and validation
- Protected routes using middleware

### 📚 Topics Module
- Create, Read, Update, Delete (CRUD) topics
- Add notes for each topic

### ✅ Tasks Module
- Add tasks under topics
- Track status (pending / completed)
- Used for progress calculation

### 📊 Dashboard Module
- Displays topic-wise progress
- Calculates completion percentage

---

## 🚀 Optional / Extended Modules

> (Some features are partially implemented or experimental)

- Quiz Module (MCQ / short answer)
- Mock Interview Simulation
- AI-based suggestions (extensible with APIs)
- Analytics & insights dashboard

---

## 🧠 Design Decisions

- Used **RESTful API architecture** for simplicity and scalability
- Chose **monolithic backend** instead of microservices (suitable for assignment scope)
- Followed **modular folder structure** for maintainability
- Implemented **JWT authentication** for secure API access
- Used **React Hooks** for state management and dynamic UI updates

---

## 🔮 Future Improvements

- Convert to microservices architecture
- Add real-time updates using WebSockets
- Improve UI with animations and theming
- Add role-based access control (RBAC)
- Integrate AI-powered interview assistance

---

## 🎯 Summary

The application is designed as a **scalable, modular full-stack system** with clean separation of concerns, making it easy to extend with additional features like AI, analytics, and real-time interactions.