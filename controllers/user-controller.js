const { User } = require('../models');

const userController = {
    getUsers(req, res) {
        User.find({})
        .then(userData => res.json(userData))
        .catch(err => res.status(400).json(err));
    },
    addUser({ body }, res) {
        User.create(body)
        .then(userData => res.json(userData))
        .catch(err => res.status(400).json(err));
    },
    getUserById
}