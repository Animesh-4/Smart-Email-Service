const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
    remoteId: {
        type: String,
        unique: true,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        default: '(No Subject)'
    },
    snippet: {
        type: String
    },
    date: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        enum: ['Personal', 'Work', 'Promotions'],
        default: 'Personal'
    },
    aiConfidence: {
        type: Number,
        default: 0
    },
    isRead: {
        type: Boolean,
        default: false
    },
    isStarred: { type: Boolean, default: false },
    isCorrected: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Email', emailSchema);