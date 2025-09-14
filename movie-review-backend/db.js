const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
        console.warn('MONGO_URI not set; skipping database connection.');
        return;
    }

    try {
        await mongoose.connect(mongoUri);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        // Do not exit; allow the app to run for health checks or limited functionality
    }
};

module.exports = connectDB;
