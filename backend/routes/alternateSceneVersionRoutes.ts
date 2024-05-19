import express from 'express';
import {
  fetchScenes,
  fetchAllScenes,
} from '../controllers/alternateSceneVersionsController'; // Adjust the import path according to your project structure

const router = express.Router();

// Route to fetch all scenes
router.get('/fetchScenes', fetchScenes);
router.get('/fetchAllScenes', fetchAllScenes);

export default router;
