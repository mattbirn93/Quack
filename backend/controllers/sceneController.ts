import { Request, Response } from 'express';
import mongoose from 'mongoose';
import scenes from '../models/sceneModel'; // Adjust the import path according to your project structure

// Controller method to fetch scenes by scriptId
export const fetchScenes = async (req: Request, res: Response) => {
  try {
    // Fetch scenes associated with the scriptId
    const fetechedScenes = await scenes.find().exec();

    // Debug information
    console.log('scenes:', fetechedScenes);

    // If no scenes found, return a 404 response
    if (!fetechedScenes) {
      return res
        .status(404)
        .json({ message: 'No scenes found for the given script ID.' });
    }

    // Return the fetched scenes
    return res.status(200).json(fetechedScenes);
  } catch (error) {
    console.error('Error fetching scenes:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
