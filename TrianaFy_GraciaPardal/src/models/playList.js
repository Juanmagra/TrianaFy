import 'dotenv/config';
import mongoose from 'mongoose';
import { songRepository } from './songs';
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

    },
    async songListFromPlayList(id) {
        let playList = await PlayList.findById(id);
        return playList != null ? playList.songsList : undefined;

    },
    async oneSongFromPlayList(idSong, idPlayList) {
        let playList = await PlayList.findById(idPlayList);
        if (playList == null) {
            return undefined;
        } else {
            let songList = playList.songsList;
            let song = songList.filter(song => song == idSong);
            if (song == null) {
                return undefined;
            } else {
                return song[0];
            }
        }
    },
    async addSongToPlayList(idSong, idPlayList) {
        let playList = await PlayList.findById(idPlayList);
        if (playList == null) {
            return undefined;
        } else {
            let song = await songRepository.findById(idSong);
            if (song == null) {
                return undefined;
            } else {
                playList.songsList.push(idSong);
                return await playList.save();
            }

        }
    },
    async delSongFromPlayList(idSong, idPlayList){
        let playList = await PlayList.findById(idPlayList);
        if (playList == null) {
            return undefined;
            
        } else {
            let song  = await songRepository.findById(idSong);
            if (song == null) {
                return undefined;
                
            } else {
                playList.songsList.pull(idSong);
                return await playList.save();
            }

            
        }
    }

}
export {
    PlayList,
    playListRepository
}