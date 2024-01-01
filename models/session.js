const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    wardenId: {
        type: String,
        required: true,
    },
    dayOfWeek: {
        type: Number,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    slotDetails: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['free', 'booked', 'pending'],
        default: 'free',
    },
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;