const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();

//ROUTES
const productRouter = require('./routes/Product');
const categoriesRouter = require('./routes/Category');
const brandsRouter = require('./routes/Brand');
const userRouter = require('./routes/User');
const authRouter = require('./routes/Auth');
const cartRouter = require('./routes/Cart');
const orderRouter = require('./routes/Order');
const healthRouter = require('./routes/Health');

const { initializrPassport } = require('./passportConfig');
const { connectMongoDb } = require('./connection');
const { isAuth } = require('./utils');

const server = express();
const corsOptions = {
    exposedHeaders: ['X-Total-Count'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    origin: process.env.CORS_ORIGIN, // Replace with the actual domain of your frontend
    credentials: true,
}
const sessionOptions = {
    secret: 'keyboard cat',
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
}
server.use(express.json());
server.use(cookieParser());

server.use(session(sessionOptions));
server.use(passport.initialize());
server.use(passport.session());
server.use(passport.authenticate('session'));
server.use(cors(corsOptions))

server.use('/api/products', productRouter.router);
server.use('/api/categories', categoriesRouter.router);
server.use('/api/brands', brandsRouter.router);
server.use('/api/users', isAuth(), userRouter.router);
server.use('/api/auth', authRouter.router);
server.use('/api/cart', isAuth(), cartRouter.router)
server.use('/api/order', orderRouter.router)
server.use('/health', healthRouter.router)

initializrPassport(passport)
connectMongoDb()


server.get('/', (req, res) => {
    res.send('Hello World');
})
server.listen(process.env.PORT, () => {
    console.log('Server is running...');
});






