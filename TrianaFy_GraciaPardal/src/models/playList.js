import 'dotenv/config';
import mongoose from 'mongoose';
const { Schema } = mongoose;
const playListSchema = new Schema({
    nombre: String,
    descripcion: String,
    userId: String,
    songsList: [String]
});
const PlayList = mongoose.model('PlayList', playListSchema);
export {
    PlayList
}