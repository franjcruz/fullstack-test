import * as bcrypt from 'bcryptjs';
import Boom from 'boom';

import User from '../models/user';
import { decode } from '../services/jwtService';

// Para la complejidad del hash creado por bcrypt
const saltRounds = 10;

/**
 * Obtener un usuario.
 *
 * @param  {Object}  filter
 * @return {Promise}
 */
export async function getUser(filter) {
  return User.findOne(filter);
}

/**
 * Obtener el usuario propietario del token con el que se realiza la llamada
 *
 * @param  {String}  token
 * @return {Promise}
 *
 */
export async function getMe(token) {
  let user = decode(token.split(' ')[1]);

  return await getUser({ _id: user.id });
}

/**
 * Crear usuario.
 *
 * @param  {Object}  body
 * @return {Promise}
 */
export async function createUser(body) {
  // Crea hash con la contraseña del usuario
  const hash = await bcrypt.hash(body.password, saltRounds);

  let user = new User();

  user.email = body.email;
  user.password = hash;

  // Tomo el rol que me viene desde el front para que desde la app se pueda crear ambos tipos de usuarios a modo de prueba.
  user.role = body.role;

  return await user.save();
}

/**
 * Validador de credenciales del usuario.
 *
 * @param  {String}  email
 * @param  {String}  password
 * @return {Promise}
 */
export async function validateCredentials(email, password) {
  const user = await getUser({ email: email });

  if (!user) {
    // Se devuelve 404 ya que el recurso pedido no existe
    throw Boom.notFound('Este usuario no está registrado en el sistema.');
  }
  // Compara la contraseña dada con el hash almacenado del usuario
  if (!bcrypt.compareSync(password, user.password)) {
    // Se devuelve 401 porque el cliente intentó acceder a un recurso protegido sin proporcionar las credenciales válidas
    throw Boom.unauthorized('Contraseña incorrecta');
  }

  return user;
}
