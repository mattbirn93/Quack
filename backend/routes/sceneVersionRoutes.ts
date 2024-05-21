import express from 'express';
import { fetchSceneVersions } from '../controllers/sceneVersionController';

const router = express.Router();

router.get('/', fetchSceneVersions);

export default router;
