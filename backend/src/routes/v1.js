import { Router } from 'express';

import authController from '../controllers/auth';
import requestsController from '../controllers/requests';
import usersController from '../controllers/users';

/**
 * Contiene todas los endpoints para la ruta v1 de la API.
 */
let router = Router();

router.use('/users', usersController);
router.use('/auth/token', authController);
router.use('/', requestsController);

export default router;
