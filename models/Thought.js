const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
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
            // creates and formats a timestamp when reaction was created
            get: createdAtValue => dateFormat(createdAtValue)
        },
    },
);


const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLenght: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // creates and formats a timestamp when thought was created
            get: createdAtValue => dateFormat(createdAtValue)
        },
        username: {
            type: String,
            required: true
        },
        reaction: [ReactionSchema],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false
    },
);



ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;