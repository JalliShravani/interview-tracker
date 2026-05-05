const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    topicId: { type: mongoose.Schema.Types.ObjectId, ref: "Topic", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["mcq", "short-answer", "code"], default: "mcq" },
    question: { type: String, required: true },
    choices: [{ type: String }],
    answer: { type: String, required: true },
    difficulty: { type: String, enum: ["easy", "medium", "hard"], default: "medium" },
    explanation: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
