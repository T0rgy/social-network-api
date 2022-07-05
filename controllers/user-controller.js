const { User, Thought } = require('../models');

const userController = {
    // get method to return all users
    getUsers(req, res) {
        User.find({})      
        .select('-__v')
        .then(userData => res.json(userData))
        .catch(err => res.status(400).json(err));
    },
    // get method to return a single user by ID
    getUserById({ params }, res){
        User.findOne({ _id: params.id })
        // fill the data of thoughts and friends to the user json
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
        .then(userData => { 
            if (!userData) {
                res.status(404).json({ message: 'No user found with matching ID.'});
                return;
            }
            res.json(userData);
        })
        .catch(err => res.status(400).json(err));
    },    
    // adds a new user
    addUser({ body }, res) {
        User.create(body)
        .then(userData => res.json(userData))
        .catch(err => res.status(400).json(err));
    },
    // updates and existing user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        // fill the data of thoughts and friends to the user json
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
        .then(userData => {
            if(!userData) {
                res.status(404).json({ message: "No user found with matching id."});
                return;
            }
            res.json(userData);
        })
        .catch(err => res.status(400).json(err));
    },
    // deletes a user by ID
    deleteUser({ params }, res) { 
        User.findOneAndDelete({ _id: params.id })
        .then(userDelete => {
            if(!userDelete) {
                return res.status(404).json({ message: "No user found with matching id."});
            }
            // if user was deleted finds all thoughts matching username and delete
            return Thought.deleteMany({ username: userDelete.username });
        })
        .then(userData => res.json(userData))
        .catch(err => res.status(400).json(err));
    },
    // adds friend to user
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId }},
            { new: true }
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
    // deletes friend from user
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId},
            { $pull: { friends: params.friendId }},
            { new: true }
        )
        .then(userData => {
            if(!userData) {
                res.status(404).json({ message: "No friend found with matching ID."})
                return;
            }
            res.json(userData)
        })
        .catch(err => res.status(400).json(err));
    }
};

module.exports = userController;