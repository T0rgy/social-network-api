const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const reactionSchema = require('./Reaction');

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
            get: createdAtValue => dateFormat(createdAtValue)
        },
        username: {
            type: String,
            required: true
        },
        reaction: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false
    },
);

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;