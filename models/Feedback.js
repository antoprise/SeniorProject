const mongoose = require('mongoose')

const FeedbackSchema = new mongoose.Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    room:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'room'
    },
    emoticon:{
        type: String,
        required: true
    },
    text:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    }
    
})
module.exports = Feedback = mongoose.model('feedback',FeedbackSchema);