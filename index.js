const express = require('express');
const server = express();
const { connectMongoDb } = require('./connection');
const productRouter = require('./routes/Product');


connectMongoDb('mongodb://127.0.0.1:27017/express-mongo').catch(err => console.log(err));


server.use(express.json());
server.use('/products', productRouter.router);

server.get('/', (req, res) => {
    res.send('Hello World');
})


server.listen(3000, () => {
    console.log('Server is running...');
});