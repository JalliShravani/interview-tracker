const MockInterview = require("../models/MockInterview");

exports.getMockInterviewPrompts = async (req, res) => {
  try {
    const { topicId } = req.params;
    const prompts = await MockInterview.find({ topicId, userId: req.user.id }).sort({ order: 1 });
    res.json(prompts);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching mock interview prompts" });
  }
};

exports.createMockInterviewPrompt = async (req, res) => {
  try {
    const { topicId, prompt, expectedAnswer, order, difficulty } = req.body;
    if (!topicId || !prompt) {
      return res.status(400).json({ msg: "Topic and prompt are required" });
    }

    const newPrompt = await MockInterview.create({
      topicId,
      userId: req.user.id,
      prompt,
      expectedAnswer,
      order: order || 1,
      difficulty: difficulty || "medium"
    });

    res.json(newPrompt);
  } catch (err) {
    res.status(500).json({ msg: "Error saving mock interview prompt" });
  }
};
