import express from 'express';
import {
  fetchScripts,
  createScript,
  fetchScriptsById,
} from '../controllers/scriptController';

const router = express.Router();

router.get('/', fetchScripts);
router.get('/fetchScriptsById', fetchScriptsById);
router.post('/createNewScript', createScript);

export default router;
