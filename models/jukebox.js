const mongoose = require('mongoose');
const Jukebox = mongoose.model('Jukebox', jukeboxSchema);

const jukeboxSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	artist: {
		type: String,
		required: true,
	},
});

export default Jukebox;
// module.exports = Jukebox;
