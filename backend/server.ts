import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import alternateSceneVersionRoutes from './routes/alternateSceneVersionRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/scenes', alternateSceneVersionRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

console.log('MongoDB URI:', process.env.MONGO_URI);

app.listen(5001, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
