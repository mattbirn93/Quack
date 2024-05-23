import express, { application } from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import mongoose from 'mongoose';
import env from './config/config';
import connectDB from './config/db';
import configureServer from './config/serverConfig';
import configureSocket from './config/socketConfig';
import userRoutes from './routes/userRoutes';
import alternateSceneVersionRoutes from './routes/alternateSceneVersionRoutes';
import scriptRoutes from './routes/scriptRoutes';
import sceneRoutes from './routes/sceneRoutes';
import sceneVersionRoutes from './routes/sceneVersionRoutes';
import sceneVersionContentRoutes from './routes/sceneVersionContentRoutes';

import logger from './config/logger';

const app = express();
const port = env.PORT;

const server = http.createServer(app);

const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Configure Express middleware
configureServer(app);

// Set up routes
app.use('/api/users', userRoutes);
app.use('/api/users/fetchUserById', userRoutes);
app.use('/api/scenes', alternateSceneVersionRoutes);
app.use('/api/scripts', scriptRoutes);
app.use('/api/scripts/fetchScriptsById', scriptRoutes);
app.use('/api/scripts/createNewScript', scriptRoutes);
app.use('/api/scenes', sceneRoutes);
app.use('/api/sceneVersions', sceneVersionRoutes);
app.use('/api/sceneVersions/createSceneVersion', sceneVersionRoutes);
app.use('/api/sceneVersionContent', sceneVersionContentRoutes);
app.use('/api/scenes/sceneVersions', sceneVersionContentRoutes);
app.use('/api/scenes/sceneVersionContent', sceneVersionContentRoutes);

// Connect to MongoDB
connectDB()
  .then(() => {
    // Start the server after a successful database connection
    server.listen(Number(port), '0.0.0.0', () => {
      logger.info(`Quack server running on port ${port}`);
    });

    // Configure WebSocket
    configureSocket(io);
  })
  .catch((err) => {
    logger.error('Failed to connect to Quack MongoDB', err);
  });

// Graceful shutdown handling
const gracefulShutdown = () => {
  logger.info('SIGTERM signal received: closing HTTP server for realz');
  server.close(() => {
    logger.info('HTTP server closed son');
    io.close(() => {
      logger.info('WebSocket server closed son');
      mongoose.connection.close();
    });
  });
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

//////////////////////////////////////////

// import express from 'express';
// import http from 'http';
// import { Server as SocketIOServer } from 'socket.io';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import connectDB from './config/db';
// import userRoutes from './routes/userRoutes';
// import alternateSceneVersionRoutes from './routes/alternateSceneVersionRoutes';
// import { createUserSocket } from './controllers/userController2';

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 5001;

// const server = http.createServer(app);

// const io = new SocketIOServer(server, {
//   cors: {
//     origin: '*',
//     methods: ['GET', 'POST'],
//   },
// });

// app.use(bodyParser.json());
// app.use(cors());

// connectDB();

// app.use('/api/users', userRoutes);
// app.use('/api/scenes', alternateSceneVersionRoutes);

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// console.log('MongoDB URI:', process.env.MONGO_URI);

// io.on('connection', (socket) => {
//   console.log('New client connected', socket.id);

//   socket.on('add_user', (data) => {
//     createUserSocket(data, (error: any, savedUser: any) => {
//       if (error) {
//         socket.emit('user_add_error', error);
//       } else {
//         socket.emit('user_added', savedUser);
//       }
//     });
//   });

//   socket.on('disconnect', () => {
//     console.log('Client disconnected', socket.id);
//   });
// });

// server.listen(Number(port), '0.0.0.0', () => {
//   console.log(`Server running on port ${port}`);
// });
