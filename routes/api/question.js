const express = require("express");
const router = express.Router();
const Question = require("../../models/Question");
const User = require("../../models/User");
const auth = require("../../middleware/authCheck");

// @route  POST /api/question
// @desc   Create a question
// @access   Private
router.post("/", auth, async (req, res) => {
  try {
    const { roomId, questionDetail } = req.body;

    const newQuestion = new Question({
      room: roomId,
      questionDetail: questionDetail,
    });

    const question = await newQuestion.save();
    console.log("---Request---", req.app);
    req.app.io.sockets.in(roomId).emit("organizerQuestion", { status: 200 });

    res.json(question);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  GET /api/question
// @desc   Get all question
// router.get('/', async (req, res) => {
//     try {
//         const question = await Question.find();
//         res.json(question)
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

// // @route  GET /api/question/:question_id
// // @desc   Get question by question_id
router.get("/:question_id", async (req, res) => {
  try {
    const { question_id } = req.params;

    const question = await Question.findById(question_id);

    if (!question) {
      return res.status(404).json({ msg: "Question not found" });
    }

    res.json(question);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  GET /api/question/owner/room/:room_id'
// @desc   Get questionList by Owner
// @access   Private
router.get("/owner/room/:room_id", auth, async (req, res) => {
  try {
    const { room_id } = req.params;

    if (!req.params.room_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({ msg: "Room not found" });
    }

    const question = await Question.find({ room: room_id });

    if (question.length < 1) {
      return res.status(404).json({ msg: "Question not found" });
    }

    res.json(question);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  GET /api/question/user/room/:room_id'
// @desc   Get questionList by User
// @access   Private
router.get("/user/room/:room_id", auth, async (req, res) => {
  try {
    const { room_id } = req.params;
    console.log("room_id at 93", room_id);
    if (!req.params.room_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({ msg: "Room not found" });
    }

    const question = await Question.find({ room: room_id });

    if (question.length < 1) {
      return res.status(404).json({ msg: "Question not found" });
    }

    res.json(question);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route    DELETE api/question/:question_id
// @desc     Delete a question
// @access   Private
router.delete("/:question_id", auth, async (req, res) => {
  try {
    const { question_id } = req.params;

    const question = await Question.findById(question_id);

    if (!question) {
      return res.status(404).json({ msg: "Question not found" });
    }

    await question.remove();
    res.json({ msg: "Question removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/question/editquestion/:question_id
// @desc     Edit a question
// @access   Private
router.put("/editquestion/:question_id", auth, async (req, res) => {
  try {
    const { question_id } = req.params;

    const question = await Question.findById(question_id);

    if (!question) {
      return res.status(404).json({ msg: "Question not found" });
    }

    question.questionDetail = req.body.questionDetail;
    await question.save();
    res.json(question);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
