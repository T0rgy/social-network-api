const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Types.ObjectId,
            default: new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtValue => dateFormat(createdAtValue)
        },
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);


module.exports = ReactionSchema