import * as jwt from './jwtService';
import { validateCredentials } from './userService';

/**
 * Petición de nuevo token.
 *
 * @param  {String}  email
 * @param  {String}  password
 * @return {Promise}
 */
export function login(email, password) {
  return validateCredentials(email, password).then(user => {
    // Si las credenciales son válidas génera el token JWT
    let token = jwt.generate(user);

    return token;
  });
}
