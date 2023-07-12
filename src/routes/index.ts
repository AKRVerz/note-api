import { Router } from 'express';
import authsRoutes from './auth';
import filesRoutes from './files';
import usersRoutes from './users';
import notesRoutes from './notes';

const router = Router();

router.use('/auth', authsRoutes);
router.use('/files', filesRoutes);
router.use('/users', usersRoutes);
router.use('/notes', notesRoutes);

export default router;
