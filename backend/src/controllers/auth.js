import { Router } from 'express';

import * as authService from '../services/authService';

const router = Router();

/**
 * POST /api/v1/auth/token
 */
router.post('/', (req, res, next) => {
  authService
    .login(req.body.email, req.body.password)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

export default router;
