const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { getSuggestions, getSkillProgress } = require("../controllers/insightController");

/**
 * @swagger
 * /api/insights/suggestions:
 *   get:
 *     summary: Get AI-style suggestions and insights
 *     tags:
 *       - Insights
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Suggestions returned
 */
router.get("/suggestions", auth, getSuggestions);

/**
 * @swagger
 * /api/insights/skill-progress:
 *   get:
 *     summary: Get skill progress and analytics
 *     tags:
 *       - Insights
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Skill progress summary
 */
router.get("/skill-progress", auth, getSkillProgress);

module.exports = router;
