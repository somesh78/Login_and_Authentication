const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const dbURI = 'mongodb://localhost:27017/authDB';

        const db = await mongoose.connect(dbURI);

        console.log(`MongoDB Connected: ${db.connection.host}`);

    } catch (err) {
        console.error(`Error connection to MongoDB: ${err.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;

