const express = require('express');
const { createUser, loginUser, checkUser } = require('../controller/Auth');
const passport = require('passport');

const router = express.Router();

router.post('/signup', createUser)
    .post('/login', passport.authenticate('local'), loginUser)
    .get('/check', passport.authenticate('jwt'), checkUser)
    .get('/logout', (req, res) => {
        console.log("logout");
        res.cookie('jwt', null, {
            expires: new Date(Date.now()),
            httpOnly: true,
            sameSite: 'None',
            secure: true, // set to true if your using https
            domain:process.env.CORS_ORIGIN
        }).sendStatus(200)
    });


exports.router = router;