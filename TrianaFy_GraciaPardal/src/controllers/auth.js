import 'dotenv/config';
import { User, userRepository } from '../models/users';
import bcrypt from 'bcryptjs';
import { JwtService } from '../services/jwt';
const AuthController = {

     register: async (req, res, next) => {
            let usuarioCreado = await userRepository.create(
            new User({username: req.body.username,email: req.body.email,fullname: req.body.fullname, password:
                        bcrypt.hashSync(req.body.password, parseInt(process.env.BCRYPT_ROUNDS))}));

        // Devolvemos todos los datos del usuario menos la contraseña                
        res.status(201).json({
            id: usuarioCreado.id,
            username: usuarioCreado.username,
            email: usuarioCreado.email
        });
    },
    login: async  (req, res, next) => {
        // Dado que la mitad del esfuerzo lo hace la función password del servicio passport
        // Aquí tan solo tenemos que preocuparnos de generar y devolver el token
        const token = await JwtService.sign(req.user);
        res.status(201).json({
            user: req.user,
            token: token
        });

    }
}
export {
    AuthController
}