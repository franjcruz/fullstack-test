import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import passport from 'passport';

import * as requestService from '../services/requestService';
import { schemaValidator } from '../validators/request';
import { isAdmin } from '../validators/user';
import passportMiddleware from './../middlewares/passport';

const router = Router();

passportMiddleware(passport);

/**
 * GET /api/v1/items
 */
router.get('/items', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  requestService
    .listItems()
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * POST /api/v1/values
 */
router.post('/values', passport.authenticate('jwt', { session: false }), isAdmin, schemaValidator, (req, res, next) => {
  requestService
    .createItem(req.body)
    // Se devuelve 201 según patrón REST APIs
    .then(data => res.status(HttpStatus.CREATED).json({ data }))
    .catch(err => next(err));
});

export default router;
