const express = require('express');
const server = express();
const { connectMongoDb } = require('./connection');
const productRouter = require('./routes/Product');
const categoriesRouter = require('./routes/Category');
const brandsRouter = require('./routes/Brand');
const userRouter = require('./routes/User');
const authRouter = require('./routes/Auth');
const cartRouter = require('./routes/Cart');
const orderRouter = require('./routes/Order');
const healthRouter = require('./routes/Health');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const { User } = require('./model/User');
const jwt = require('jsonwebtoken');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const cookieParser = require('cookie-parser');
const { sanitizeUser, isAuth, cookieExtractor } = require('./utils');

const SECRET_KEY = 'secret';

var opts = {}
opts.jwtFromRequest = cookieExtractor
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET_KEY;

server.use(cookieParser());

server.use(session({
    secret: 'keyboard cat',
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
}));

server.use(passport.initialize());
server.use(passport.session());
server.use(passport.authenticate('session'));
server.use(cors({
    exposedHeaders: ['X-Total-Count'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE' ], 
    // origin: 'https://my-commerce-git-tem-backend-connect-ramanagrawal.vercel.app', // Replace with the actual domain of your frontend
    credentials: true,
}))
server.use(express.json());
server.use('/api/products', productRouter.router);
server.use('/api/categories', categoriesRouter.router);
server.use('/api/brands', brandsRouter.router);
server.use('/api/users', isAuth(), userRouter.router);
server.use('/api/auth', authRouter.router);
server.use('/api/cart', isAuth(), cartRouter.router)
server.use('/api/order', orderRouter.router)
server.use('/health',healthRouter.router)
// server.get('*', (req, res) => {
//     res.redirect('http://localhost:5173');
// });

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

server.get('/', (req, res) => {
    res.send('Hello World');
})


connectMongoDb('mongodb+srv://iramanagrawal:5R8PzP9Ci33JLYR3@cluster0.rrsq0ek.mongodb.net/').catch(err => console.log(err));

server.listen(3000, () => {
    console.log('Server is running...');
});






