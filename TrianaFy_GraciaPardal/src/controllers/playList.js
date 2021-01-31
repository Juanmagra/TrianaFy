import {PlayList, playListRepository} from '../models/playList';
import {userRepository} from '../models/users'
import { validationResult } from 'express-validator';
var jwt = require('jwt-simple');
const PlayListController = {
    todasLasPlayList: async (req, res)=>{
      res.json(await playListRepository.findAll());
    },
    playListPorId: async(req, res) =>{
        let playList = await playListRepository.findById(req.params.id);
        if (playList != undefined) {
            res.json(playList);
        } else {
            res.sendStatus(404);
        }
    },
    nuevaPlayList : async(req, res) =>{
        var token = req.headers.authorization.split(" ")[1];
        var payload = jwt.decode(token, process.env.JWT_SECRET);
        
        let nuevaPlayList = await playListRepository.create(new PlayList({
            nombre : req.body.nombre,
            descripcion : req.body. descripcion,
            userId :  payload.sub,
            songList: []
        }));
        let usuario = await await userRepository.findById(nuevaPlayList.userId)
        res.status(201).json({
            id: nuevaPlayList.id,
            nombre: nuevaPlayList.nombre,
            usuario: usuario.username
        })
    },
    editarPlayList: async (req, res) =>{
        let playListModified = await playListRepository.updateById(req.params.id,{
            nombre : req.body.nombre,
            descripcion: req.body.descripcion
        });
        if (playListModified ==undefined)
            res.sendStatus(404);
        else
            res.status(200).json(playListModified);
    },
    eliminarPlayList: async (req,res)=>{
        let platList = await playListRepository.delete(req.params.id);
        res.sendStatus(204);
    },
    todasLasCancionesDeUnaPlayList: async (req, res )=>{
        let songList = await playListRepository.songListFromPlayList(req.params.id);
        if (songList == undefined) {
            res.sendStatus(404);
            
        } else {
            res.status(200).json(songList);
        }
    },
    añadirCancionToPlayList: async(req, res)=>{
        let playList = await playListRepository.addSongToPlayList(req.params.idSong, req.params.idPlayList);
        if (playList == undefined) {
            res.sendStatus(404);
            
        } else {
            res.status(200).json(playList.songsList);
        }
    },
    cancionDePlayList: async (req, res) =>{
        let song = await playListRepository.oneSongFromPlayList(req.params.idSong, req.params.idPlayList);
        if (song == undefined) {
            res.sendStatus(404);
            
        } else {
            res.status(200).json(song);
        }
    },
    eliminarCancionDePlayList: async (req, res) =>{
        let playList = await playListRepository.delSongFromPlayList(req.params.idSong, req.params.idPlayList);
        res.sendStatus(204);
    }
}
export {
    PlayListController
}