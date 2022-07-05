const { Thought, User } = require('../models');

const thoughtController = {
    // get method to return all thoughts
    getThoughts(req, res) {
        Thought.find({})
        .select('-__v')
        .then(thoughtData => res.json(thoughtData))
        .catch(err => res.status(400).json(err));
    },
    // get method to return thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .select('-__v')
        .then(thoughtData => {
            // if thought doesn't exist send error message
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with matching ID.' });
                return;
            }
            res.json(thoughtData)
        })
        .catch(err => res.status(400).json(err));
    },
    // creates new thought
    addThought({ body }, res) {
        Thought.create(body)
        // uses the id generated from the new thought and matches username
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { username: body.username },
                { $push: { thoughts: _id }},
                { new: true }
            );
        })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user found with matching id.'});
                return;
            }
            res.json(userData);
        })
        .catch(err => res.status(400).json(err));
    },
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { runValidators: true, new: true})
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({ message: "No thought found with this ID."});
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => res.status(400).json(err));        
    }, 
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(thoughtDelete => {
            if (!thoughtDelete) {
                return res.status(404).json({ message: "No thought found with this ID."});
            }
            return User.findOneAndUpdate(
                { username: thoughtDelete.username },
                { $push: { thoughts: params.id }},
                { new: true }
            );
        })
        .then(userData => {
            if(!userData) {
                res.status(404).json({ message: 'No user found with this username. '});
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => res.status(400).json(err));
    },
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId},
            { $push: { reactions: body }},
            { new: true, runValidators: true }
        )
        .then(reactData => {
            if (!reactData) {
                res.status(404).json({ message: "No thought matching this ID."});
                return;
            }
            res.json(reactData);
        })
        .catch(err => res.status(400).json(err));
    },
    deleteReaction({ params}, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId }}},
            { new: true, runValidators: true }
        )
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({ message: "No reaction found with this ID."});
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => res.status(400).json(err))
    }
};


module.exports = thoughtController;