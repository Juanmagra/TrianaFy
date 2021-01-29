import {Song, songRepository} from '../models/songs';
import {validationResult} from 'express-validator';

const SongController = {

    nuevaCancion: async (req, res) => {
        let songCreada = await songRepository.create(new Song({
            title: req.body.title,
            artist: req.body.artist,
            album : req.body.album,
            year: req.body.year
        }));
        res.status(201).json({
            id: songCreada.id,
            title: songCreada.title

        });
    }
}

export {
    SongController
}