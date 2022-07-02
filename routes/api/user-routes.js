const router = require('express').Router();

const {
    getUsers,
    addUser,
    getUserById,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');


// api/users
router.route('/')
.get(getUsers)
.post(addUser);

// api/users/:id
router.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

// api/user/:id/friends/:friendId
router.route('/:id/friends/:friendId')
.post(addFriend)
.delete(deleteFriend)


module.exports = router;