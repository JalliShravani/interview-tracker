const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  getTopics,
  addTopic,
  deleteTopic,
  getProgress,
  updateTopic
} = require("../controllers/topicController");

/**
 * @swagger
 * /api/topics:
 *   get:
 *     summary: Get all topics for the authenticated user
 *     tags:
 *       - Topics
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of topics
 */
router.get("/", auth, getTopics);

/**
 * @swagger
 * /api/topics:
 *   post:
 *     summary: Create a new topic
 *     tags:
 *       - Topics
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Topic created
 */
router.post("/", auth, addTopic);

/**
 * @swagger
 * /api/topics/{id}:
 *   delete:
 *     summary: Delete a topic
 *     tags:
 *       - Topics
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Topic deleted
 */
router.delete("/:id", auth, deleteTopic);

/**
 * @swagger
 * /api/topics/progress/{topicId}:
 *   get:
 *     summary: Get topic progress
 *     tags:
 *       - Topics
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
 *         description: Progress details
 */
router.get("/progress/:topicId", auth, getProgress);

/**
 * @swagger
 * /api/topics/{id}:
 *   put:
 *     summary: Update a topic
 *     tags:
 *       - Topics
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Topic updated
 */
router.put("/:id", auth, updateTopic);

module.exports = router;