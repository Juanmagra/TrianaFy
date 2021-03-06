import { Router } from "express";
import { param, body } from 'express-validator';
import { validar } from '../middlewares/validacion';
import { PlayListController } from '../controllers/playList';
import { token } from "../services/passport";


const router = Router();

/*=================================================*/

//Ver todas las listas de reproducción existentes
router.get('/', token(), PlayListController.todasLasPlayList);

//Ver la información de una lista de reproducción seleccionada
router.get('/:id',token(), PlayListController.playListPorId);

//Ver todas las canciones de una lista de reproducción existente
router.get('/:id/songs', token(), PlayListController.todasLasCancionesDeUnaPlayList);

//Ver una canción de una lista de reproducción.
router.get('/:idSong/songs/:idPlayList', token(), PlayListController.cancionDePlayList);
/*=================================================*/

//Añade una nueva lista de reproducción
router.post('/', token(),[
    body('nombre')
        .exists().withMessage('El campo nombre es requerido')
        .not().isEmpty().withMessage('El campo nombre no puede estar vacio'),
    body('userId')
        .not().exists().withMessage('El campo del usuario no es permitido'),
    body('songList')
        .not().exists().withMessage('La lista de canciones no es permitida en la creacion de la lista')
],
    validar, PlayListController.nuevaPlayList);

//Añade una canción existente a una lista de reproducción.
router.post('/:idSong/songs/:idPlayList', token(), PlayListController.añadirCancionToPlayList);
/*=================================================*/

//Modificar el contenido de una lista de reproducción
router.put('/:id', token(), PlayListController.editarPlayList);
/*=================================================*/

//Borrar una lista de reproducción
router.delete('/:id', token(), PlayListController.eliminarPlayList);

//Borrar una canción de una lista de reproducción
router.delete('/:idSong/songs/:idPlayList',token(), PlayListController.eliminarCancionDePlayList);

export default router;