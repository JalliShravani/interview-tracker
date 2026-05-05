const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" },
  status: { type: String, default: "pending" },
  confidence: { type: String, enum: ["low", "medium", "high"] }
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);