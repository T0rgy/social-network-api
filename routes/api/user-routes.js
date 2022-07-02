const router = require('express').Router();

const {

} = require('../../controllers/user-controller');

router.route('/')
.get(getUsers)
.post(addUser);