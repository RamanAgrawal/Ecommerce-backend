const express = require('express');
const {  getUserbyId } = require('../controller/User');
const { updateUser } = require('../controller/User');

const router = express.Router();

router.get('/:id', getUserbyId)
    .patch('/:id', updateUser)

exports.router = router;