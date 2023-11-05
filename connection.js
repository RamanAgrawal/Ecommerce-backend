const mongoose = require('mongoose');

const connectMongoDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log('Connected to DB');
    } catch (error) {
        console.error(error.message);
    }


}

module.exports = { connectMongoDb };