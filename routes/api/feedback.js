const express = require("express");
const router = express.Router();
const Feedback = require("../../models/Feedback");
const Room = require("../../models/Room");
const auth = require("../../middleware/authCheck");

// @route  POST /api/feedback
// @desc   Create a feedback
// @access   Private
router.post("/", auth, async (req, res) => {
  try {
    const user_id = req.user.id;
    const { roomId, text, emoticon } = req.body;
    console.log("roomId", roomId);
    console.log("text", text);
    console.log("emoticon", emoticon);
    if (!emoticon) {
      return res.status(404).json({ msg: "Give your rating" });
    }

    if (!roomId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({ msg: "Room not found" });
    }

    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ msg: "Room not found2" });
    }
    if (!room.feedbackStatus) {
      return res.status(403).json({ msg: "Feedback Function is Closed" });
    }
    if (!room.user.some((id) => id == user_id)) {
      return res.status(401).json({ msg: "User Unauthorized" });
    }
    const newFeedback = new Feedback({
      user: user_id,
      room: roomId,
      text: text,
      emoticon: emoticon,
    });

    const feedback = await newFeedback.save();

    req.app.io.sockets.in(roomId).emit("organizerFeedback", { status: 200 });

    res.json(feedback);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  GET /api/feedback
// @desc   Get all feedback
// router.get('/', async (req, res) => {
//     try {
//         const feedback = await Feedback.find().populate('user', ['userName']);
//         res.json(feedback)
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

// @route  GET /api/feedback/:feedback_id
// @desc   Get feedback by feedback_id
// router.get('/:feedback_id', async (req, res) => {
//     try{
//         const {feedback_id} = req.params

//         if (!req.params.ask_id.match(/^[0-9a-fA-F]{24}$/)) {
//             return res.status(404).json({ msg: 'Feedback not found' });
//         }

//         const feedback = await Feedback.findById(feedback_id).populate('user', ['userName'])

//         if (!feedback) {
//             return res.status(404).json({ msg: 'Feedback not found' });
//         }

//         res.json(feedback)
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//       }
// })

// // @route  GET /api/feedback/owner/room/:room_id'
// // @desc   Get feedbackList by Owner
// // @access   Private
router.get("/owner/room/:room_id", auth, async (req, res) => {
  try {
    const { room_id } = req.params;

    if (!req.params.room_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({ msg: "Room not found" });
    }

    const feedback = await Feedback.find({ room: room_id }).populate("user", [
      "userName",
    ]);

    if (feedback.length < 1) {
      return res.status(404).json({ msg: "Feedback not found" });
    }

    res.json(feedback);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// // @route  GET /api/feedback/user/room/:room_id'
// // @desc   Get feedbackList by User
// // @access   Private
router.get("/user/room/:room_id", auth, async (req, res) => {
  try {
    const { room_id } = req.params;
    const user_id = req.user.id;
    console.log("room_id at 93", room_id);
    console.log("user_id at 93", user_id);
    if (!req.params.room_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({ msg: "Room not found" });
    }

    const feedback = await Feedback.find({ room: room_id, user: user_id });

    if (feedback.length < 1) {
      return res.status(404).json({ msg: "Feedback not found" });
    }

    res.json(feedback);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
