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

const songRepository = {
    async findAll(){
        const result = await Song.find({}).exec();
        return result;
    },
    async findById(id) {
        const result = await Song.findById(id).exec();
        return result != null ? result : undefined;
    },
    async create(newSong){
        const song = new Song({
            title: newSong.title,
            artist: newSong. artist,
            album: newSong.album,
            year : newSong. year
        });
        const result = await song.save();
        return result;
    },
    async updateById(id, cancionModificada){
        const cancionGuardada = await Song.findById(id);
        console.log(cancionGuardada);
        if (cancionGuardada != null) {
            console.log(cancionModificada);
            return Object.assign(cancionGuardada, cancionModificada).save();
            
        } else {
            return undefined;
        }

    },
    async delete (id){
        await Song.findOneAndDelete(id).exec();
    }

}
export {
    Song,
    songRepository
}
