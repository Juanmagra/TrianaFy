import { Song, songRepository } from '../models/songs';
import { validationResult } from 'express-validator';

const SongController = {

    todasLasCanciones: async (req, res) => {
        res.json(await songRepository.findAll());

    },
    cancionPorId: async (req, res) => {
        let song = await songRepository.findById(req.params.id);
        if (song != undefined) {
            res.json(song);
        } else {
            res.sendStatus(404);
        }

    },
    nuevaCancion: async (req, res) => {
        let songCreada = await songRepository.create(new Song({
            title: req.body.title,
            artist: req.body.artist,
            album: req.body.album,
            year: req.body.year
        }));
        res.status(201).json({
            id: songCreada.id,
            title: songCreada.title

        });
    },
    editarCancion: async (req, res) => {
        let songModified = await songRepository.updateById(req.params.id, {
            title: req.body.title,
            artist: req.body.artist,
            album: req.body.album,
            year: req.body.year,

        });
        if (songModified == undefined)
            res.sendStatus(404);
        else
            res.status(200).json(songModified);

    },
    eliminarCancion: async (req, res) => {
        let song = await songRepository.delete(req.params.id);
        res.sendStatus(204);
    }
}

export {
    SongController
}