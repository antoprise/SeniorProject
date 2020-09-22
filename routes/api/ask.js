const express = require("express");
const router = express.Router();
const Ask = require('../../models/Ask')
const Room = require('../../models/Room')
const auth = require('../../middleware/authCheck');

// @route  GET /api/ask
// @desc   Get all ask
// router.get('/', async (req, res) => {
//     try {
//         const ask = await Ask.find().populate('user', ['userName']);
//         res.json(ask)
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

// @route  GET /api/ask/:ask_id
// @desc   Get ask by ask_id
// router.get('/:ask_id', async (req, res) => {
//     try{
//         const {ask_id} = req.params

//         if (!req.params.ask_id.match(/^[0-9a-fA-F]{24}$/)) {
//             return res.status(404).json({ msg: 'Ask not found' });
//         }

//         const ask = await Ask.findById(ask_id).populate('user', ['userName'])

//         if (!ask) {
//             return res.status(404).json({ msg: 'Ask not found' });
//         }

//         res.json(ask)
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//       }
// })

// @route  POST /api/ask
// @desc   Create a ask
// @access   Private
router.post('/', auth, async (req, res) => {
    try {
        const user_id = req.user.id
        const {roomId,text,anonymous} = req.body


        if (!roomId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(404).json({ msg: 'Room not found1' });
        }
        console.log('roomId',roomId)
        const room = await Room.findById(roomId)
        console.log('room',room)
        if(!room){
            return res.status(404).json({ msg: 'Room not found2' });
        }
        if(!room.askStatus){
            return res.status(403).json({ msg: 'Ask Function is Closed' });
        }
        if(!room.user.some(id => id == user_id)){
            return res.status(401).json({msg: 'User Unauthorized'})
        }

        const newAsk = new Ask({
            user: user_id,
            room: roomId,
            text: text,
            anonymous: anonymous
          });
        
        const ask = await newAsk.save()
        console.log('---Request---',req.app)
        req.app.io.sockets
        .in(roomId)
        .emit('organizerAsk', { status: 200 })

        res.json(ask);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route  GET /api/ask/room/:room_id'
// @desc   Get askList by Owner
// @access   Private
router.get("/owner/room/:room_id", auth, async (req, res) => {
  try {
    const { room_id } = req.params;

    if (!req.params.room_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({ msg: "Room not found" });
    }

    const ask = await Ask.find({ room: room_id }).populate("user", [
      "userName",
    ]);

    if (ask.length < 1) {
      return res.status(404).json({ msg: "Ask not found" });
    }

    res.json(ask);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  GET /api/ask/user/room/:room_id'
// @desc   Get askList by User
// @access   Private
router.get("/user/room/:room_id", auth, async (req, res) => {
  try {
    const { room_id } = req.params;
    const user_id = req.user.id;
    console.log("room_id at 93", room_id);
    console.log("user_id at 93", user_id);
    if (!req.params.room_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({ msg: "Room not found" });
    }

    const ask = await Ask.find({ room: room_id, user: user_id });

    if (ask.length < 1) {
      return res.status(404).json({ msg: "Ask not found" });
    }

    res.json(ask);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})

// @route  PUT /api/ask/isanswer/:ask_id
// @desc   Set isAnswer Status 
// @access   Private
router.put('/isanswer/:ask_id', auth, async (req, res) => {
    try {
        
        const {ask_id} = req.params

        if (!ask_id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(404).json({ msg: 'Ask not found' });
        }
        
        const ask = await Ask.findById(ask_id);
        
        if (!ask) {
            return res.status(404).json({ msg: 'Ask not found' });
        }

        ask.isAnswer = true 

        await ask.save();
        res.json(ask);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
