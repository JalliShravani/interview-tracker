const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ topicId: req.params.topicId });
  res.json(tasks);
};

exports.addTask = async (req, res) => {
  const { title, topicId } = req.body;

  if (!title || !topicId) {
    return res.status(400).json({ msg: "Title and TopicId required" });
  }

  const task = await Task.create({
    title,
    topicId
  });

  res.json(task);
};

exports.updateTask = async (req, res) => {
  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};