import Jukebox from '../models/jukebox.js';
import mongoose from 'mongoose';
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
router.get('/tracks', async (req, res) => {
	try {
		const jukeboxTracks = await Jukebox.find();
		res.status(200).json(jukeboxTracks);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

router.get('/:trackId', async (req, res) => {
	try {
		const jukeboxTracks = await Jukebox.findById(req.params.trackId);
		if (!jukeboxTracks) {
			return res.status(404).json({ error: 'Track not found' });
		}
		res.status(200).json(jukeboxTracks);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

router.delete('/:trackId', async (req, res) => {
	try {
		const deletedTrack = await Jukebox.findByIdAndDelete(req.params.trackId);
		if (!deletedTrack) {
			return res.status(404).json({ error: 'Track not found' });
		}
		res.status(200).json({ message: 'Track successfully deleted' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

router.put('/:trackId', async (req, res) => {
	const trackId = req.params.trackId.trim();

	// Validate ObjectId format
	if (!mongoose.Types.ObjectId.isValid(trackId)) {
		return res.status(400).json({ error: 'Invalid track ID format' });
	}

	try {
		// Attempt to find and update the track
		const updatedTrack = await Jukebox.findByIdAndUpdate(trackId, req.body, {
			new: true,
			runValidators: true,
		});

		// If no track is found, return 404
		if (!updatedTrack) {
			return res.status(404).json({ error: 'Track not found' });
		}

		// Return success response with the updated track
		res.status(200).json({
			message: 'Track updated successfully',
			updatedTrack,
			details: {
				id: updatedTrack._id,
				title: updatedTrack.title,
				artist: updatedTrack.artist,
			},
		});
	} catch (error) {
		console.error('Error:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

//  Export the router at the bottom of the file

export default router;
