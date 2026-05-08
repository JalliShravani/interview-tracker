# 🚀 Smart Interview Preparation Tracker

## 📌 Overview

Smart Interview Preparation Tracker is a full-stack web application designed to help users efficiently prepare for technical interviews by organizing topics, tracking tasks, and monitoring progress.

The application provides a structured and interactive way to manage interview preparation with a clean UI and real-time updates.

---

## ✨ Key Features

### 🔐 Authentication

* User Signup & Login
* Secure authentication using JWT
* Protected API routes

### 📚 Topic Management

* Add, Edit, Delete topics (Full CRUD)
* Add notes for each topic
* Organized topic tracking

### ✅ Task Management

* Create tasks under each topic
* Track task status (pending / completed)
* Enables structured learning

### 📊 Dashboard

* Topic-wise progress tracking
* Completion percentage calculation

### 🎨 UI Highlights

* Clean card-based layout
* Inline editing functionality
* Responsive and user-friendly design

---

## 🛠 Tech Stack

### Frontend

* React
* React Router
* Axios

### Backend

* Node.js
* Express.js

### Database

* MongoDB (Mongoose)

### Authentication

* JSON Web Tokens (JWT)

---

## 🏗 Architecture Summary

* RESTful API design
* Modular backend (controllers, routes, models)
* Component-based React frontend
* Client-server communication using Axios

👉 For detailed architecture, refer to **Architecture.md**

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone <your-repo-link>
cd interview-prep-tracker
```

---

### 2️⃣ Backend Setup

```bash
cd interview-tracker-backend
npm install
```

Create `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npx nodemon server.js
```

---

### 3️⃣ Frontend Setup

```bash
cd interview-tracker-frontend
npm install
npm start
```

---

## 🔗 API Endpoints

### Auth

* POST `/api/auth/signup`
* POST `/api/auth/login`

### Topics

* GET `/api/topics`
* POST `/api/topics`
* PUT `/api/topics/:id`
* DELETE `/api/topics/:id`

### Tasks

* GET `/api/tasks/:topicId`
* POST `/api/tasks`

---

## 📸 Demo Flow

1. User Signup/Login
2. Add Topics with notes
3. Edit/Delete Topics
4. Add Tasks under topics
5. Track progress in Dashboard

---

## 🚀 Extended / Experimental Features

> (Some features are partially implemented using AI assistance)

* Quiz module (MCQ / short-answer)
* Mock interview simulation
* AI-based preparation suggestions
* Analytics dashboard

---

## 💡 Key Highlights

* Full-stack application with complete CRUD operations
* Secure authentication system using JWT
* Clean and modular architecture
* Dynamic UI with React Hooks
* Scalable and extendable design

---

## 🧠 Learnings

* Designed REST APIs using Express.js
* Implemented authentication with JWT
* Integrated MongoDB using Mongoose
* Built dynamic UI with React Hooks
* Managed API communication using Axios

---

## 🔮 Future Enhancements

* Dark mode UI
* Real-time progress tracking
* AI-powered interview assistant
* Advanced analytics and charts

---

## 👩‍💻 Author

Shravani Jalli

---

## 🎯 Conclusion

This project demonstrates a complete full-stack development workflow, including authentication, CRUD operations, API design, and interactive frontend development, making it a strong foundation for scalable web applications.
