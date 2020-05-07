const mongoose = require('mongoose')


const ParticipantesSchema = new mongoose.Schema({
    name: String
    
})

module.exports = mongoose.model('Participantes', ParticipantesSchema)