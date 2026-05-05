const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  getQuizQuestions,
  createQuizQuestion,
  submitQuizAttempt,
  getQuizAttempts
} = require("../controllers/quizController");

/**
 * @swagger
 * /api/quiz/topics/{topicId}:
 *   get:
 *     summary: Get quiz questions for a topic
 *     tags:
 *       - Quiz
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: topicId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Quiz questions list
 */
router.get("/topics/:topicId", auth, getQuizQuestions);

/**
 * @swagger
 * /api/quiz/questions:
 *   post:
 *     summary: Create a quiz question
 *     tags:
 *       - Quiz
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - topicId
 *               - question
 *               - type
 *               - answer
 *             properties:
 *               topicId:
 *                 type: string
 *               question:
 *                 type: string
 *               type:
 *                 type: string
 *               choices:
 *                 type: array
 *                 items:
 *                   type: string
 *               answer:
 *                 type: string
 *               difficulty:
 *                 type: string
 *     responses:
 *       200:
 *         description: Quiz question created
 */
router.post("/questions", auth, createQuizQuestion);

/**
 * @swagger
 * /api/quiz/attempts:
 *   post:
 *     summary: Submit quiz answers
 *     tags:
 *       - Quiz
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - topicId
 *               - answers
 *             properties:
 *               topicId:
 *                 type: string
 *               answers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionId:
 *                       type: string
 *                     selectedAnswer:
 *                       type: string
 *               confidence:
 *                 type: string
 *     responses:
 *       200:
 *         description: Quiz attempt submitted
 */
router.post("/attempts", auth, submitQuizAttempt);

/**
 * @swagger
 * /api/quiz/attempts/{topicId}:
 *   get:
 *     summary: Get quiz attempt history for a topic
 *     tags:
 *       - Quiz
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: topicId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Quiz attempts list
 */
router.get("/attempts/:topicId", auth, getQuizAttempts);

module.exports = router;
