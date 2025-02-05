import mongoose from 'mongoose';

const jukeboxSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		artist: {
			type: String,
			required: true,
		},
		genre: {
			type: String,
		},
		releaseYear: {
			type: Number,
		},
	},
	{ collection: 'jukebox' } // Correct placement
);

const Jukebox = mongoose.model('Jukebox', jukeboxSchema);

export default Jukebox;
