const moongose = require('mongoose');

const rsvpSchema = moongose.Schema({
    userId: {type: moongose.Schema.Types.ObjectId, ref: 'User', required: true},
    eventId: {type: moongose.Schema.Types.ObjectId, ref: 'Event', required: true},
    createdAt: {type: Date, default: Date.now}
})

module.exports = moongose.model('RSVP', rsvpSchema);