import Jukebox from '../models/jukebox.js';
import express from 'express';
const router = express.Router();

// Write your routes/controller functions here

//  CREATE - POST - /jukebox
router.post('/', async (req, res) => {
	try {
		const createJukebox = await Jukebox.create(req.body);
		res.status(201).json(createJukebox); // 201 Created
	} catch (error) {
		if (error.name === 'ValidationError') {
			return res.status(400).json({ error: error.message });
		}
		res.status(500).json({ err: error.message });
	}
});

//  Export the router at the bottom of the file

export default router;
