import { Router } from 'express';
import { fetchScenes } from '../controllers/alternateSceneVersionsController';

const router = Router();

router.get('/', fetchScenes);

export default router;
