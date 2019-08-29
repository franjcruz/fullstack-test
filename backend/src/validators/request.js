import Joi from 'joi';

import validate from '../utils/validate';

const SCHEMA = {
  title: Joi.string()
    .label('title')
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
function schemaValidator(req, res, next) {
  return validate(req.body, SCHEMA)
    .then(() => next())
    .catch(err => next(err));
}

export { schemaValidator };
