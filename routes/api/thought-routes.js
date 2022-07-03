const router = require('express').Router();

const {
    getThoughts,
    getThoughtById,
    addThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

// api/thoughts
router.route('/')
.get(getThoughts)
.post(addThought)

// api/thoughts/:Id
router.route('/:id')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought)

// api/thoguhts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
.post(addReaction)

// api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction)

module.exports = router;