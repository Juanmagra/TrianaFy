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

const playListRepository = {
    async findAll() {
        const result = await PlayList.find({}).exec();
        return result;

    },
    async findById(id) {
        const result = await PlayList.findById(id).exec();
        return result != null ? result : undefined;
    },
    async create(newPlayList) {
        const playList = new PlayList({
            nombre: newPlayList.nombre,
            descripcion: newPlayList.descripcion,
            userId: newPlayList.userId,
            songsList: newPlayList.songsList
        });
        const result = await newPlayList.save();
        return result;

    },
    async updateById(id, playListModified) {
        const saved = await PlayList.findById(id);
        if (saved != null) {
            return Object.assign(saved, playListModified).save();
        } else {
            return undefined;
        }

    },
    async delete(id) {
        await PlayList.findOneAndDelete(id).exec();

    }

}
export {
    PlayList,
    playListRepository
}