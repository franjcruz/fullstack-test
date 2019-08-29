import { Router } from 'express';
import HttpStatus from 'http-status-codes';

import * as userService from '../services/userService';
import { emailValidation, userValidator } from '../validators/user';

const router = Router();

/**
 * POST /api/v1/users
 */
router.post('/', userValidator, emailValidation, (req, res, next) => {
  userService
    .createUser(req.body)
    // Se devuelve 201 según patrón REST APIs
    .then(data => res.status(HttpStatus.CREATED).json({ data }))
    .catch(err => next(err));
});

export default router;
