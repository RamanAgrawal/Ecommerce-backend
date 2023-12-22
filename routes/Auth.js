const express = require('express');
const { createUser, loginUser, checkUser, logoutUser, resetPasswordRequest, resetPassword } = require('../controller/Auth');
const passport = require('passport');

const router = express.Router();

router.post('/signup', createUser)
    .post('/login', passport.authenticate('local'), loginUser)
    .get('/check', passport.authenticate('jwt'), checkUser)
    .post('/logout', logoutUser)
    .post('/reset-password-request',resetPasswordRequest)
    .post('/reset-password',resetPassword)


exports.router = router;