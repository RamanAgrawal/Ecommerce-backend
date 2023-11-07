const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
const JwtStrategy = require('passport-jwt').Strategy;
const { User } = require('./model/User');
const { sanitizeUser, cookieExtractor } = require('./utils');
const jwt = require('jsonwebtoken');

exports.initializrPassport = (passport) => {
    const SECRET_KEY = process.env.PASS_SECRET_KEY;
    let opts = {}
    opts.jwtFromRequest = cookieExtractor
    opts.secretOrKey = SECRET_KEY;
    

    passport.use(new LocalStrategy({ usernameField: 'email' },
        async function (email, password, done) {

            try {
                const user = await User.findOne({ email: email }).exec();
                if (!user) {
                    console.log('User not found');
                    return done(null, false, { message: 'Invalid username or password' });
                };
                crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', async function (err, hashedPassword) {
                    if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
                        return done(null, false, { message: 'Invalid username or password' });
                    };
                    const token = jwt.sign(sanitizeUser(user), SECRET_KEY);
                    done(null, { token });
                });
            } catch (err) {

                done(err);
            }
        }));

    passport.use('jwt', new JwtStrategy(opts, async function (jwt_payload, done) {
        try {
            const user = await User.findById(jwt_payload.id);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        } catch (error) {
            if (error) {
                return done(error, false);
            }
        }
    }));

    passport.serializeUser(function (user, cb) {
        process.nextTick(function () {
            return cb(null, {
                id: user.id,
                role: user.role
            });
        });
    });

    passport.deserializeUser(function (user, cb) {
        process.nextTick(function () {
            return cb(null, user);
        });
    });
}