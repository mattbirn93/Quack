import { Server as SocketIOServer } from 'socket.io';
import { createUserSocket } from '../controllers/userController2';
import logger from './logger';

const configureSocket = (io: SocketIOServer) => {
  io.on('connection', (socket) => {
    logger.info(`New client connected: ${socket.id}`);

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
      logger.info(`Client disconnected for realz: ${socket.id}`);
    });
  });
};

export default configureSocket;
