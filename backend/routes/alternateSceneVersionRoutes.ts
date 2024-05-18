import express from 'express';
import { fetchScenes } from '../controllers/alternateSceneVersionsController'; // Adjust the import path according to your project structure

const router = express.Router();

// Route to fetch scenes by scriptId using query parameter
router.get('/fetchScene', fetchScenes);

export default router;
