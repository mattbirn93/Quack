import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from './logger';

const configureServer = (app: express.Application) => {
    app.use(bodyParser.json());
    app.use(cors());

    app.get('/', (req, res) => {
        res.send('Hello World From Quack!');
    });

    // Centralized error handling middleware
    app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
        logger.error(err.stack);
        res.status(500).send({ error: 'Something is not good' });
    });
};

export default configureServer;

