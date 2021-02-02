import { Router } from 'express';
import { UserController } from '../controllers/user';
import { param, body } from 'express-validator';
import { validar } from '../middlewares/validacion'
import { emailExists } from '../models/users'
import { token } from '../services/passport';


const router = Router();

router.get('/', token(), UserController.todosLosUsuarios);

router.get('/:id', token(),
    validar,
    UserController.usuarioPorId);

router.put('/:id', token(), UserController.editarUsuario);

router.delete('/:id', token(), UserController.eliminarUsuario);

export default router;