const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  title: String,
  notes: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Topic", topicSchema);