const { User } = require('../models');

const userController = {
    getUsers(req, res) {
        User.find({})
        .populate([
            {
                path: 'thoughts',
                select: '-__v'
            },
            {
                path: 'friends',
                select: '-__v'
            }
        ])
        .select('-__v')
        .then(userData => res.json(userData))
        .catch(err => res.status(400).json(err));
    },
    addUser({ body }, res) {
        User.create(body)
        .then(userData => res.json(userData))
        .catch(err => res.status(400).json(err));
    },
    getUserById({ params }, res){
        User.findOne({ _id: params.id })
        .then(userData => res.json(userData))
        .catch(err => res.status(400).json(err));
    },
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(userData => {
            if(!userData) {
                res.status(404).json({ message: "No user found with matching id."});
                return;
            }
            res.json(userData);
        })
        .catch(err => res.status(400).json(err));
    },
    deleteUser({ params }, res) { 
        User.findOneAndDelete({ _id: params.id })
        .then(userData => {
            if(!userData) {
                res.status(404).json({ message: "No user found with matching id."});
                return;
            }
            res.json(userData);
        })
        .catch(err => res.status(400).json(err));
    },
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $push: { friends: params.friendId }},
            { runValidators: true, new: true }
        )
        .then(userData => {
            if(!userData) {
                res.status(404).json({ message: "No user found with matching ID."});
                return;
            }
            res.json(userData);
        })
        .catch(err => res.status(400).json(err));
    },
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id},
            { $push: { friends: params.friendId }},
            { new: true, runValidators: true }
        )
        .then(userData => {
            if(!userData) {
                res.status(404).json({ message: "No friend found with matchind ID."})
                return;
            }
            res.json(userData)
        })
        .catch(err => res.status(400).json(err));
    }
};

module.exports = userController;