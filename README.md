# Smart Interview Preparation Tracker

A full-stack interview preparation tracker built with React frontend and Node.js/Express backend. The app includes topic/task management, quiz mode, mock interview flow, AI-assisted suggestion generation, and progress analytics.

## Project Structure

- `interview-tracker-backend/` - backend service built with Express and MongoDB (Mongoose)
- `interview-tracker-frontend/` - React frontend with route-based pages and interactive UI
- `DB_SCHEMA.md` - database model definitions and collections
- `ARCHITECTURE.md` - architecture overview and component flow

## Features

- User authentication: login/signup with JWT-based API auth
- Topic and task management for interview preparation
- Task status tracking: pending / in-progress / completed
- Quiz builder and quiz attempt submission
- Mock interview prompt flow
- AI-style suggestions and skill analytics
- Progress dashboards and topic performance view

## Setup

### Backend

1. Install dependencies:
   ```bash
   cd interview-tracker-backend
   npm install
   ```
2. Create a `.env` file with:
   ```bash
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_jwt_secret
   OPENAI_API_KEY=your_openai_api_key # optional
   ```
3. Start backend:
   ```bash
   npm start
   ```

### Frontend

1. Install dependencies:
   ```bash
   cd interview-tracker-frontend
   npm install
   ```
2. Start frontend:
   ```bash
   npm start
   ```

## Notes

- A Postman collection export is useful and acceptable, but it is best to also include a Markdown API document for reviewers.
- The app currently uses a single backend service, which is acceptable for this assignment. If you want, microservice separation can be added later.
- AI suggestions are optional and use `OPENAI_API_KEY` when available.
