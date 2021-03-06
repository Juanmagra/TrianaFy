import {
    User,
    userRepository
} from '../models/users';

import {
    validationResult
} from 'express-validator';
import bcrypt from 'bcryptjs';
const UserController = {

    todosLosUsuarios: async (req, res) => {
        res.json(await userRepository.findAll());
    },

    usuarioPorId: async (req, res) => {

        let user = await userRepository.findById(req.params.id);
        if (user != undefined) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }

    },
    editarUsuario: async (req, res) => {

        let usuarioModificado = await userRepository.updateById(req.params.id,
            {
                username: req.body.username,
                email: req.body.email,
                fullname: req.body.fullname,
            });
        if (usuarioModificado == undefined)
            res.sendStatus(404);
        else
            res.status(200).json(usuarioModificado);
    },

    eliminarUsuario: async (req, res) => {
        let user = await userRepository.delete(req.params.id);
      
            res.sendStatus(204);
       
    }

};



export {
    UserController
}