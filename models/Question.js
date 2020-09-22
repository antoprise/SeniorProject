const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  questionDetail: {
    type: String,
    required: true,
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "room",
  },
  questionStatus: {
    type: Boolean,
    default: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Question = mongoose.model("question", QuestionSchema);
