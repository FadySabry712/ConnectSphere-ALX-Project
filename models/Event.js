const moongose = require('mongoose');

const eventSchema = new moongose.Schema({
    title : { type: String, required: true, unique: true },
    description : String,
    location : { type: String, required: true },
    category : { type: String, required: true },
    date : { type: Date, required: true },
    creator : { type: moongose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt : { type: Date, default: Date.now }
})

module.exports = moongose.model('Event', eventSchema);