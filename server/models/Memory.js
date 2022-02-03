const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        file: {
            type: String
        },
        description: {
            type: String
        },
        likes: {
            type: Array
        },
        comments: [{
            text: String,
            id: Number,
            date:Date
        }, { timestamps: true, }],
        originalUser: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    },
    {
        timestamps: true,
    }
);

const Memory = mongoose.model('Memory', UserSchema);

module.exports = { Memory };
