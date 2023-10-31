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
const cors=require('cors')


connectMongoDb('mongodb://127.0.0.1:27017/express-mongo').catch(err => console.log(err));

server.use(cors({
    exposedHeaders:['X-Total-Count']
}))


server.use(express.json());
server.use('/products', productRouter.router);
server.use('/categories', categoriesRouter.router);
server.use('/brands', brandsRouter.router);
server.use('/users', userRouter.router);
server.use('/auth', authRouter.router);
server.use('/cart',cartRouter.router)
server.use('/order',orderRouter.router)

server.get('/', (req, res) => {
    res.send('Hello World');
})


server.listen(3000, () => {
    console.log('Server is running...');
});