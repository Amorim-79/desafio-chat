const mongoose = require('mongoose')


const MessagesSchema = new mongoose.Schema({
    name: String,
    message: {
        required: true,
        type: String
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('Messages', MessagesSchema)