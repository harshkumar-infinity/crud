const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    Discription: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'completed'],
        default: 'active',
    },
});

const NoteUser = mongoose.model("NoteData", UserSchema);

module.exports = NoteUser;