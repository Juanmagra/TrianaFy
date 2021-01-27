import 'dotenv/config';
import mongoose from 'mongoose';
const { Schema } = mongoose;

const songSchema = new Schema({
    title: String,
    artist: String,
    album: String,
    year: Date

});

const Song = mongoose.model('Song', songSchema);

export { Song }
