const Question = require("../models/Question");
const QuizAttempt = require("../models/QuizAttempt");
const Topic = require("../models/Topic");

exports.getQuizQuestions = async (req, res) => {
  try {
    const { topicId } = req.params;
    const questions = await Question.find({ topicId, userId: req.user.id }).sort({ createdAt: 1 });
    const topic = await Topic.findOne({ _id: topicId, userId: req.user.id }).select("title");
    res.json({ topic, questions });
  } catch (err) {
    res.status(500).json({ msg: "Error fetching quiz questions" });
  }
};

exports.createQuizQuestion = async (req, res) => {
  try {
    const { topicId, question, type, choices, answer, difficulty, explanation } = req.body;
    if (!topicId || !question || !answer) {
      return res.status(400).json({ msg: "Topic, question and answer are required" });
    }

    const newQuestion = await Question.create({
      topicId,
      userId: req.user.id,
      question,
      type,
      choices: Array.isArray(choices) ? choices : [],
      answer,
      difficulty,
      explanation
    });

    res.json(newQuestion);
  } catch (err) {
    res.status(500).json({ msg: "Error saving quiz question" });
  }
};

exports.submitQuizAttempt = async (req, res) => {
  try {
    const { topicId, answers, confidence } = req.body;
    if (!topicId || !Array.isArray(answers)) {
      return res.status(400).json({ msg: "Topic and answers are required" });
    }

    const questionIds = answers.map((item) => item.questionId);
    const questions = await Question.find({ _id: { $in: questionIds }, userId: req.user.id });
    let score = 0;

    const results = answers.map((item) => {
      const question = questions.find((q) => q._id.toString() === item.questionId);
      const selected = String(item.selectedAnswer || "").trim();
      const correctAnswer = String(question?.answer || "").trim();
      const isCorrect = question
        ? question.type === "short-answer"
          ? selected.toLowerCase() === correctAnswer.toLowerCase()
          : selected === correctAnswer
        : false;

      if (isCorrect) score += 1;

      return {
        questionId: item.questionId,
        questionText: question?.question || "",
        selectedAnswer: selected,
        correctAnswer,
        correct: isCorrect
      };
    });

    const attempt = await QuizAttempt.create({
      userId: req.user.id,
      topicId,
      score,
      total: answers.length,
      results,
      confidence
    });

    res.json({ attempt, score, total: answers.length, accuracy: answers.length ? Math.round((score / answers.length) * 100) : 0 });
  } catch (err) {
    res.status(500).json({ msg: "Error submitting quiz attempt" });
  }
};

exports.getQuizAttempts = async (req, res) => {
  try {
    const { topicId } = req.params;
    const attempts = await QuizAttempt.find({ topicId, userId: req.user.id }).sort({ createdAt: -1 });
    res.json(attempts);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching quiz attempts" });
  }
};
