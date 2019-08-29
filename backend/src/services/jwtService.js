import jwt from 'jsonwebtoken';
import moment from 'moment';

const secret = process.env.JWT_ENCRYPTION;
const expi = process.env.JWT_EXPIRATION;

/**
 * Genera un nuevo JWT.
 *
 *
 * @param  {Object}   user
 * @return {Object}
 */
export function generate(user) {
  let payload = {
    id: user._id,
    email: user.email,
    iat: moment().unix(), // Fecha de creación
    exp: moment()
      .add(expi, 'seconds')
      .unix() // Fecha de expiración
  };

  let token = jwt.sign(payload, secret);

  // La respuesta al endpoint incluye tanto el tipo de token devuelto como su expiración
  let res = { access_token: token, expires_in: expi, token_type: 'Bearer' };

  return res;
}

/**
 * Descodifica un JWT.
 *
 *
 * @param  {String}  token
 * @return {Object}
 */
export function decode(token) {
  return jwt.verify(token, secret);
}
