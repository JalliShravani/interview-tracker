const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { getMockInterviewPrompts, createMockInterviewPrompt } = require("../controllers/mockInterviewController");

/**
 * @swagger
 * /api/mock-interviews/{topicId}:
 *   get:
 *     summary: Get mock interview prompts for a topic
 *     tags:
 *       - Mock Interview
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
 *         description: Mock interview prompts
 */
router.get("/:topicId", auth, getMockInterviewPrompts);

/**
 * @swagger
 * /api/mock-interviews:
 *   post:
 *     summary: Add a mock interview prompt
 *     tags:
 *       - Mock Interview
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
 *               - prompt
 *             properties:
 *               topicId:
 *                 type: string
 *               prompt:
 *                 type: string
 *               expectedAnswer:
 *                 type: string
 *               order:
 *                 type: integer
 *               difficulty:
 *                 type: string
 *     responses:
 *       200:
 *         description: Mock interview prompt created
 */
router.post("/", auth, createMockInterviewPrompt);

module.exports = router;
