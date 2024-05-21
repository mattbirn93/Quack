import express from 'express';
import { fetchScenes } from '../controllers/sceneController';

const router = express.Router();

router.get('/', fetchScenes);

export default router;
