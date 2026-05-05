# API Documentation

## Authentication

### POST /api/auth/signup
Create a new user.

Request body:
```json
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
- 200: new user created
- 400: validation error

### POST /api/auth/login
Log in and receive a token.

Request body:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "token": "<JWT_TOKEN>"
}
```

## Topics

All topic endpoints require `Authorization` header with the token.

### GET /api/topics
Fetch all topics for the authenticated user.

### POST /api/topics
Create a topic.

Request body:
```json
{
  "title": "React Basics",
  "notes": "Study hooks and component lifecycle"
}
```

### PUT /api/topics/:id
Update a topic.

Request body:
```json
{
  "title": "Updated Title",
  "notes": "Updated notes"
}
```

### DELETE /api/topics/:id
Delete a topic.

### GET /api/topics/progress/:topicId
Get topic progress (total tasks, completed tasks, progress percent).

Response example:
```json
{
  "total": 5,
  "completed": 3,
  "progress": 60
}
```

## Tasks

### GET /api/tasks/:topicId
Get tasks for a topic.

### POST /api/tasks
Create a new task.

Request body:
```json
{
  "title": "Practice useEffect",
  "topicId": "<topicId>"
}
```

### PUT /api/tasks/:id
Update a task status or fields.

Request body:
```json
{
  "status": "completed"
}
```

### DELETE /api/tasks/:id
Delete a task.

## Quiz

### GET /api/quiz/topics/:topicId
Get quiz questions for a topic.

### POST /api/quiz/questions
Create a quiz question.

Request body:
```json
{
  "topicId": "<topicId>",
  "question": "What is Playwright used for?",
  "type": "mcq",
  "choices": ["Browser automation", "Data storage"],
  "answer": "Browser automation",
  "difficulty": "easy"
}
```

### POST /api/quiz/attempts
Submit quiz answers.

Request body:
```json
{
  "topicId": "<topicId>",
  "answers": [
    { "questionId": "<questionId>", "selectedAnswer": "Browser automation" }
  ],
  "confidence": "medium"
}
```

### GET /api/quiz/attempts/:topicId
Get quiz attempt history for a topic.

## Mock Interview

### GET /api/mock-interviews/:topicId
Get mock interview prompts for a topic.

### POST /api/mock-interviews
Add a mock interview prompt.

Request body:
```json
{
  "topicId": "<topicId>",
  "prompt": "Explain event loop in JavaScript.",
  "expectedAnswer": "It is ...",
  "order": 1,
  "difficulty": "medium"
}
```

## Insights / Suggestions

### GET /api/insights/suggestions
Get AI-style or logic-based recommendations.

### GET /api/insights/skill-progress
Get topic progress summary and quiz analytics.

## Notes
- Use `Authorization: <JWT_TOKEN>` header on all protected routes.
- `OPENAI_API_KEY` is optional. If present, AI-enhanced suggestions may be returned.
