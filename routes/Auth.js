const express = require('express');
const { createUser, loginUser, checkUser } = require('../controller/Auth');
const passport = require('passport');

const router = express.Router();

router.post('/signup', createUser)
    .post('/login', passport.authenticate('local'), loginUser)
    .get('/check', passport.authenticate('jwt'), checkUser)
    .get('/logout', (req, res) => {
        console.log("logout");
        req.logout((err) => {
            if (err) {
                console.error(err);
            }
        });
        res
            .cookie('jwt', null, {
                expires: new Date(Date.now()),
                httpOnly: true,
            })
            .sendStatus(200)
    });


exports.router = router;