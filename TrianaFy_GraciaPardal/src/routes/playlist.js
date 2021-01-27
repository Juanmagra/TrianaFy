import { Router } from "express";
import { param, body } from 'express-validator';
import { validar } from '../middlewares/validacion';
import { PlayListController } from '../controllers/playList';

const router = Router();

/*=================================================*/

//Ver todas las listas de reproducción existentes
router.get('/',);

//Ver la información de una lista de reproducción seleccionada
router.get('/:id', [],
    validar,
);

//Ver todas las canciones de una lista de reproducción existente
router.get('/:id/songs', [], validar,);

//Ver una canción de una lista de reproducción.
router.get('/:id1/songs/:id2', [], validar,);
/*=================================================*/

//Añade una nueva lista de reproducción
router.post('/', [],
    validar,
);

//Añade una canción existente a una lista de reproducción.
router.post('/:id1/songs/:id2', [], validar,);
/*=================================================*/

//Modificar el contenido de una lista de reproducción
router.put('/:id',);
/*=================================================*/

//Borrar una lista de reproducción
router.delete('/:id',);

//Borrar una canción de una lista de reproducción
router.delete('/:id1/songs/:id2', )