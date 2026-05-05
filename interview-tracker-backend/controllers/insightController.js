const Topic = require("../models/Topic");
const Task = require("../models/Task");
const QuizAttempt = require("../models/QuizAttempt");
// Removed node-fetch require since Node 22 has built-in fetch

exports.getSuggestions = async (req, res) => {
  try {
    const topics = await Topic.find({ userId: req.user.id });
    const suggestions = [];

    const topicProgress = await Promise.all(
      topics.map(async (topic) => {
        const total = await Task.countDocuments({ topicId: topic._id });
        const completed = await Task.countDocuments({ topicId: topic._id, status: "completed" });
        const pending = await Task.countDocuments({ topicId: topic._id, status: "pending" });
        const inProgress = await Task.countDocuments({ topicId: topic._id, status: "in-progress" });
        const progress = total ? Math.round((completed / total) * 100) : 0;
        return { topic, total, completed, pending, inProgress, progress };
      })
    );

    // Basic logic suggestions
    const nextTopic = topicProgress
      .filter((item) => item.total > 0)
      .sort((a, b) => a.progress - b.progress)[0];

    const weakTopics = topicProgress.filter((item) => item.progress < 60).slice(0, 3);
    const reviewTopics = topicProgress.filter((item) => item.pending > 0 || item.inProgress > 0).slice(0, 4);

    if (nextTopic) {
      suggestions.push({
        title: "Review this topic next",
        description: `Focus on ${nextTopic.topic.title} - ${nextTopic.progress}% complete`,
        topicId: nextTopic.topic._id
      });
    }

    if (weakTopics.length) {
      suggestions.push({
        title: "Weakest topics",
        description: weakTopics.map((item) => `${item.topic.title} (${item.progress}%)`).join(", ")
      });
    }

    if (reviewTopics.length) {
      suggestions.push({
        title: "Due for practice",
        description: reviewTopics.map((item) => `${item.topic.title} (${item.pending} pending)`).join(" · ")
      });
    }

    // AI-enhanced suggestions (optional, requires OpenAI API key)
    try {
      const aiSuggestions = await generateAISuggestions(topicProgress);
      if (aiSuggestions) {
        suggestions.push({
          title: "AI Recommendation",
          description: aiSuggestions
        });
      }
    } catch (err) {
      console.log("AI suggestions failed, using basic logic");
    }

    res.json({ suggestions, topicProgress });
  } catch (err) {
    res.status(500).json({ msg: "Error calculating suggestions" });
  }
};

// Helper function for AI suggestions
async function generateAISuggestions(topicProgress) {
  const openaiApiKey = process.env.OPENAI_API_KEY; // Set this in .env
  if (!openaiApiKey) return null;

  const prompt = `Based on this interview prep progress data: ${JSON.stringify(topicProgress)}, suggest one personalized study tip for the user. Keep it concise and actionable.`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openaiApiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 100
      })
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content?.trim() || null;
  } catch (err) {
    return null;
  }
}

exports.getSkillProgress = async (req, res) => {
  try {
    const topics = await Topic.find({ userId: req.user.id });
    const topicSummaries = await Promise.all(
      topics.map(async (topic) => {
        const total = await Task.countDocuments({ topicId: topic._id });
        const completed = await Task.countDocuments({ topicId: topic._id, status: "completed" });
        const inProgress = await Task.countDocuments({ topicId: topic._id, status: "in-progress" });
        const pending = await Task.countDocuments({ topicId: topic._id, status: "pending" });
        const progress = total ? Math.round((completed / total) * 100) : 0;
        return { topicId: topic._id, title: topic.title, total, completed, inProgress, pending, progress };
      })
    );

    const attempts = await QuizAttempt.find({ userId: req.user.id });
    const quizByTopic = {};

    attempts.forEach((attempt) => {
      const key = attempt.topicId.toString();
      if (!quizByTopic[key]) quizByTopic[key] = { totalScore: 0, count: 0 };
      quizByTopic[key].totalScore += attempt.score;
      quizByTopic[key].count += 1;
    });

    const quizStats = topicSummaries.map((summary) => {
      const stats = quizByTopic[summary.topicId.toString()];
      return {
        topicId: summary.topicId,
        title: summary.title,
        averageScore: stats ? Math.round(stats.totalScore / stats.count) : 0,
        attempts: stats ? stats.count : 0
      };
    });

    res.json({ topicSummaries, quizStats });
  } catch (err) {
    res.status(500).json({ msg: "Error fetching skill analytics" });
  }
};
