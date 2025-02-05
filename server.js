import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import logger from 'morgan';
import cors from 'cors';
import jukeboxRouter from './controllers/jukebox.js';

const app = express();

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
	console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.json());
app.use(cors());
app.use(logger('dev'));
app.use('/jukebox', jukeboxRouter);

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ error: 'Internal Server Error' });
});

//Routes go here

app.listen(3000, () => {
	console.log('The express app is ready!');
});
