import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from './logger';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {

    });
    logger.info('MongoDB Quack connected');
  } catch (error) {
    logger.error('MongoDB Quack connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
