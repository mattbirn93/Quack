import express from 'express';
import { fetchScripts, createScript } from '../controllers/scriptController';

const router = express.Router();

router.get('/', fetchScripts);
router.post('/createNewScript', createScript);

export default router;
