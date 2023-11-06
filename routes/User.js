const express = require('express');
const { getUserbyId } = require('../controller/User');
const { updateUser } = require('../controller/User');
const passport = require('passport')
const router = express.Router();

router.get('/own', getUserbyId)
    .patch('/', updateUser)

exports.router = router;