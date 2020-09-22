const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "question",
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = Answer = mongoose.model("answer", AnswerSchema);
