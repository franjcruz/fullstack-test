import Boom from 'boom';
import Joi from 'joi';

import { decode } from '../services/jwtService';
import * as userService from '../services/userService';
import validate from '../utils/validate';

// El esquema que debe de cumplir un usuario
const SCHEMA = {
  email: Joi.string()
    .email()
    .label('email')
    .max(255)
    .required(),
  role: Joi.string()
    .valid(['user', 'admin']) // Solo se permiten estos dos valores
    .label('role')
    .max(255)
    .required(),
  password: Joi.string()
    .label('password')
    .max(255)
    .required()
};

/**
 * Validador para petición CREATE.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @return {Promise}
 */
function userValidator(req, res, next) {
  return validate(req.body, SCHEMA)
    .then(() => next())
    .catch(err => next(err));
}

/**
 * Valida que un usuario sea rol Admin.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @return {Promise}
 */
async function isAdmin(req, res, next) {
  try {
    const userToken = decode(req.headers.authorization.split(' ')[1]);

    let user = await userService.getUser({ _id: userToken.id });

    if (user.role !== 'admin') {
      throw Boom.unauthorized(`No tienes permiso para ejecutar esta acción`);
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

/**
 * Valida que un email no exista ya en el sistema.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @return {Promise}
 */
async function emailValidation(req, res, next) {
  try {
    let user = await userService.getUser({ email: req.body.email });

    if (user) {
      throw Boom.badRequest(`El email introducido ya existe en el sistema.`);
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

export { userValidator, isAdmin, emailValidation };
