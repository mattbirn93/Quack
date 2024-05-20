import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import alternateSceneVersionRoutes from './routes/alternateSceneVersionRoutes';
import { createUserSocket } from './controllers/userController2';

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

const server = http.createServer(app);

const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(bodyParser.json());
app.use(cors());

connectDB();

app.use('/api/users', userRoutes);
app.use('/api/scenes', alternateSceneVersionRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

console.log('MongoDB URI:', process.env.MONGO_URI);

io.on('connection', (socket) => {
  console.log('New client connected', socket.id);

  socket.on('add_user', (data) => {
    createUserSocket(data, (error: any, savedUser: any) => {
      if (error) {
        socket.emit('user_add_error', error);
      } else {
        socket.emit('user_added', savedUser);
      }
    });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected', socket.id);
  });
});

server.listen(Number(port), '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});


//////////////////////////////////////////


// import express from 'express';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import connectDB from './config/db';
// import userRoutes from './routes/userRoutes';
// import alternateSceneVersionRoutes from './routes/alternateSceneVersionRoutes';

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 5001;

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// // Connect to MongoDB
// connectDB();

// // Routes
// app.use('/api/users', userRoutes);
// app.use('/api/scenes', alternateSceneVersionRoutes);

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// console.log('MongoDB URI:', process.env.MONGO_URI);

// app.listen(Number(port), '0.0.0.0', () => {
//   console.log(`Server running on port ${port}`);
// });

