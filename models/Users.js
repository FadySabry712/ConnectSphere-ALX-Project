const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username : {type: String, required: true, unique: true},
    emial : {type: String, required: true, unique: true},
    password : {type: String, required: true},
    createdat : {type: Date, default: Date.now}
})

model.exports = mongoose.model('User', UserSchema);