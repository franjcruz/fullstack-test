import Boom from 'boom';
import _isEmpty from 'lodash/isEmpty';

/**
 * Middleware para manejar solicitudes con JSON vacíos en peticiones POST o PUT.
 *
 * @param  {Object}   request
 * @param  {Object}   response
 * @param  {Function} next
 */
export default function json(request, response, next) {
  const { body, method } = request;
  const disallowedHttpHeaders = ['POST', 'PUT'];

  if (request.is('application/json') && disallowedHttpHeaders.includes(method) && _isEmpty(body)) {
    throw Boom.badRequest('Empty JSON');
  }

  next();
}
