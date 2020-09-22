const mongoose = require("mongoose");

const AskSchema = new mongoose.Schema({
    
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    room:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'room'
    },
    text:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    anonymous:{
        type: Boolean,
        default: false
    },
    isAnswer:{
        type: Boolean,
        default: false
    }
    
})
module.exports = Ask = mongoose.model('ask',AskSchema);
