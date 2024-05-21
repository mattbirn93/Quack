import express from 'express';
import { fetchScripts } from '../controllers/scriptController';

const router = express.Router();

router.get('/', fetchScripts);

export default router;
