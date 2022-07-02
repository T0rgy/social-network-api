const router = require('express').Router();

const {
    getThoughts,
    getThoughtsById,
    addThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

// api/thoughts
router.route('/')
.get(getThoughts)

// api/thoughts/:userId
router.route('/:userId')
.post(addThought)

// api/thoughts/:thoughtId
router.route('/:thoughtId')
.get(getThoughtsById)
.put(updateThought)
.delete(deleteThought)

// api/thoguhts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
.post(addReaction)

// api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction)

module.exports = router;