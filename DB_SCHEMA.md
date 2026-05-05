# Database Schema

This app uses MongoDB with the following collections and document models.

## User

- `name`: String
- `email`: String (unique)
- `password`: String
- `createdAt`, `updatedAt`: timestamps

## Topic

- `title`: String
- `notes`: String
- `userId`: ObjectId (ref: `User`)

## Task

- `title`: String
- `topicId`: ObjectId (ref: `Topic`)
- `status`: String (`pending`, `in-progress`, `completed`)
- `confidence`: String (`low`, `medium`, `high`)
- `createdAt`, `updatedAt`: timestamps

## Question

- `topicId`: ObjectId (ref: `Topic`)
- `userId`: ObjectId (ref: `User`)
- `type`: String (`mcq`, `short-answer`, `code`)
- `question`: String
- `choices`: [String]
- `answer`: String
- `difficulty`: String (`easy`, `medium`, `hard`)
- `explanation`: String
- `createdAt`, `updatedAt`: timestamps

## QuizAttempt

- `userId`: ObjectId (ref: `User`)
- `topicId`: ObjectId (ref: `Topic`)
- `score`: Number
- `total`: Number
- `results`: [
  - `questionId`: ObjectId (ref: `Question`)
  - `selectedAnswer`: String
  - `correct`: Boolean
]
- `durationSeconds`: Number
- `confidence`: String (`low`, `medium`, `high`)
- `createdAt`, `updatedAt`: timestamps

## MockInterview

- `topicId`: ObjectId (ref: `Topic`)
- `userId`: ObjectId (ref: `User`)
- `prompt`: String
- `expectedAnswer`: String
- `order`: Number
- `difficulty`: String (`easy`, `medium`, `hard`)
- `createdAt`, `updatedAt`: timestamps
