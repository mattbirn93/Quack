import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import mongoose from 'mongoose';
import env from './config/config';
import connectDB from './config/db';
import configureServer from './config/serverConfig';
import configureSocket from './config/socketConfig';
import userRoutes from './routes/userRoutes';
import alternateSceneVersionRoutes from './routes/alternateSceneVersionRoutes';
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
app.use('/api/scenes', alternateSceneVersionRoutes);

// Connect to MongoDB
connectDB().then(() => {
  // Start the server after a successful database connection
  server.listen(Number(port), '0.0.0.0', () => {
    logger.info(`Quack server running on port ${port}`);
  });

  // Configure WebSocket
  configureSocket(io);
}).catch(err => {
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


/////////////////////////////////////////

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


////////////////////////////////////////////


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
// import * as Y from 'yjs';
// import { MongodbPersistence } from 'y-mongodb';

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

// if (!process.env.MONGO_URI) {
//   throw new Error('MONGO_URI environment variable is not defined');
// }

// // Set up Yjs document and MongoDB persistence
// const ydoc = new Y.Doc();
// const persistence = new MongodbPersistence(
//   process.env.MONGO_URI,
//   process.env.MONGO_COLLECTION_NAME,
// );

// // Load the document state from MongoDB
// persistence.getYDoc('document-name').then((storedYdoc) => {
//   const updates = Y.encodeStateAsUpdate(storedYdoc);
//   Y.applyUpdate(ydoc, updates);
//   console.log('Document loaded from MongoDB');
// });

// ydoc.on('update', (update) => {
//   persistence.storeUpdate('document-name', update);
// });

// io.on('connection', (socket) => {
//   console.log('New client connected', socket.id);

//   // Send the initial document state to the client
//   socket.emit('document-state', Y.encodeStateAsUpdate(ydoc));

//   // Listen for document updates from the client
//   socket.on('update', (update) => {
//     Y.applyUpdate(ydoc, new Uint8Array(update));
//     socket.broadcast.emit('update', update);
//   });

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
