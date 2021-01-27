import { Router } from "express";
import { param, body } from 'express-validator';
import { validar } from '../middlewares/validacion'
import { SongController } from '../controllers/song'

const router = Router();
//Gets
//Ver todas las canciones existentes
router.get('/',)
//Ver la informacion de una canción seleccionada
router.get('/:id', [],
    validar,
);
//Post
//Añade una nueva canción.
router.post('/', [],
    validar,
);
//Put
//Modificar el contenido de una canción
router.put('/:id',);

//Delete
//Borrar una canción
router.delete('/:id',);