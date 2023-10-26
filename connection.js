const mongoose = require('mongoose');

const connectMongoDb = async (url) => {
    await mongoose.connect(url);
    console.log('Connected to DB');
}

module.exports = { connectMongoDb };