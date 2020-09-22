const express = require('express');
const router = express.Router();
const Room = require('../../models/Room')
const auth = require('../../middleware/authCheck');

// @route  POST /api/room
// @desc   Create a room
// @access   Private
router.post('/', auth, async (req, res) => {
    
  const user_id = req.user.id
  const {roomName} = req.body

  try {
    const newRoom = new Room({
      owner: user_id,
      roomName: roomName
    });
    const room = await newRoom.save()
    res.json(room);

  }catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  GET /api/room
// @desc   Get all room
// router.get('/', async (req, res) => {
//     try {
//         const room = await Room.find();
//         res.json(room)
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//       }
// });

// @route  GET /api/room/:room_id
// @desc   Get a room by room_id
// @access   Private
router.get('/:room_id', auth, async (req, res) => {
    try{
        const user_id = req.user.id
        const {room_id} = req.params

        if (!req.params.room_id.match(/^[0-9a-fA-F]{24}$/)) {
          return res.status(404).json({ msg: 'Room not found' });
        }
        const room = await Room.findById(room_id)

        if (!room) {
            return res.status(404).json({ msg: 'Room not found' });
        }
        if ((room.owner != user_id) && (!room.user.includes(user_id))){
          return res.status(401).json({msg: 'User Unauthorized'})
        }
        res.json(room) 
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
})

// @route  GET /api/room/owner/list
// @desc   Get roomlist by owner
// @access   Private
router.get('/owner/list', auth, async (req, res) => {
    try{
      const user_id = req.user.id
      console.log(user_id)

      const room = await Room.find({owner: user_id})

      if (room.length < 1) {
        return res.status(404).json({ msg: 'Room not found' });
      }
        res.json(room) 

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
})

// @route  GET /api/room/user/list
// @desc   Get roomlist by user
// @access   Private
router.get('/user/list', auth, async (req, res) => {
  try{
    const user_id = req.user.id

    const room = await Room.find({user: user_id})
      
    if (room.length < 1) {
      return res.status(404).json({ msg: 'Room not found' });
    }

    res.json(room) 
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
})

// @route    DELETE api/room/:room_id
// @desc     Delete a room
// @access   Private
router.delete('/:room_id', auth, async (req, res) => {
    try {
      const user_id = req.user.id
      const {room_id} = req.params
      
      // Check for ObjectId format and room
      if (!req.params.room_id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(404).json({ msg: 'Room not found' });
      }

      const room = await Room.findById(room_id);

      if (!room) {
        return res.status(404).json({ msg: 'Room not found' });
      }
      if(room.owner != user_id){
        return res.status(401).json({msg: 'User Unauthorized'})
      }
    
      await room.remove(); 
      res.json({ msg: 'Room removed' });
    
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});

// @route  POST /api/room/join/:room_code
// @desc   Join a room by user
// @access   Private
router.post('/join/:room_code', auth, async (req, res) => {
  try {

    const {room_code} = req.params
      
    const user_id = req.user.id

    const room = await Room.findOne({code: room_code})

    if(!room){
      return res.status(404).json({ msg: 'Invalid Room Code' });
    }
    if(room.user.includes(user_id)){
      return res.status(403).json({ msg: 'Already Joined' });
    }
    room.user.push(user_id)
    await room.save();
    res.json(room);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  Delete /api/room/leave/:room_id
// @desc   Leave a room
router.delete('/leave/:room_id', async (req, res) => {
  try {
    const {room_id} = req.params           
    const {userId} = req.body
    const room = await Room.findById(room_id);

    const index = room.user.indexOf(userId)
    room.user.splice(index, 1);
  
    await room.save();

    res.json(room);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/room/editname/:room_id
// @desc     Edit room name 
// @access   Private
router.put('/editname/:room_id', auth, async (req, res) => {
    try {
      const user_id = req.user.id
      const {room_id} = req.params
  
      // Check for ObjectId format and room
      if (!req.params.room_id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(404).json({ msg: 'Room not found' });
      }

      const room = await Room.findById(room_id);

      if (!room) {
        return res.status(404).json({ msg: 'Room not found' });
      }
      if(room.owner != user_id){
        return res.status(401).json({msg: 'User Unauthorized'})
      }

      room.roomName = req.body.roomName
      await room.save();
      res.json(room);

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});

// @route    PUT api/room/editstatus/ask/:room_id
// @desc     Edit ask status
// @access   Private
router.put('/editstatus/ask/:room_id', auth, async (req, res) => {
  try {
    const user_id = req.user.id
    const {room_id} = req.params

    // Check for ObjectId format and room
    if (!req.params.room_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({ msg: 'Room not found' });
    }

    const room = await Room.findById(room_id);

    if (!room) {
      return res.status(404).json({ msg: 'Room not found' });
    }
    if(room.owner != user_id){
      return res.status(401).json({msg: 'User Unauthorized'})
    }

    room.askStatus = !room.askStatus
    await room.save();
    res.json(room);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.put('/editstatus/feedback/:room_id', auth, async (req, res) => {
  try {
    const user_id = req.user.id
    const {room_id} = req.params

    // Check for ObjectId format and room
    if (!req.params.room_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({ msg: 'Room not found' });
    }

    const room = await Room.findById(room_id);

    if (!room) {
      return res.status(404).json({ msg: 'Room not found' });
    }
    if(room.owner != user_id){
      return res.status(401).json({msg: 'User Unauthorized'})
    }

    room.feedbackStatus = !room.feedbackStatus
    await room.save();
    res.json(room);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;