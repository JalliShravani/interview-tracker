const Topic = require("../models/Topic");
const Task = require("../models/Task");

// 👉 GET all topics
exports.getTopics = async (req, res) => {
  try {
    const topics = await Topic.find({ userId: req.user.id });
    res.json(topics);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching topics" });
  }
};

// 👉 ADD topic
exports.addTopic = async (req, res) => {
  try {
    const { title, notes } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ msg: "Title is required" });
    }

    const existing = await Topic.findOne({
      title,
      userId: req.user.id
    });

    if (existing) {
      return res.status(400).json({ msg: "Topic already exists" });
    }

    const topic = await Topic.create({
      title,
      notes,
      userId: req.user.id
    });

    res.json(topic);
  } catch (err) {
    res.status(500).json({ msg: "Error adding topic" });
  }
};

// 👉 DELETE topic
exports.deleteTopic = async (req, res) => {
  try {
    const topic = await Topic.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id   // 🔐 security check
    });

    if (!topic) {
      return res.status(404).json({ msg: "Topic not found" });
    }

    res.json({ msg: "Topic deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting topic" });
  }
};

// 👉 UPDATE topic
exports.updateTopic = async (req, res) => {
  try {
    const { title, notes } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ msg: "Title is required" });
    }

    const updated = await Topic.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id   // 🔐 security check
      },
      { title, notes },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ msg: "Topic not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: "Error updating topic" });
  }
};

// 👉 PROGRESS calculation
exports.getProgress = async (req, res) => {
  try {
    const { topicId } = req.params;

    const total = await Task.countDocuments({ topicId });
    const completed = await Task.countDocuments({
      topicId,
      status: "completed"
    });

    const progress = total === 0 ? 0 : (completed / total) * 100;

    res.json({
      total,
      completed,
      progress: Math.round(progress)
    });
  } catch (err) {
    res.status(500).json({ msg: "Error calculating progress" });
  }
};