import { Router } from 'express';
import * as user from '../middleware/users';
import * as note from '../middleware/notes';

const router = Router();

// POST /users
router.post('/', user.authMw, note.createNoteMw, note.returnNoteMw);

// GET /users
router.get('/', user.authMw, note.getNotesMw, note.returnNotesMw);

// GET /users/:id
router.get('/:id', user.authMw, note.getNoteMw, note.returnNoteMw);

// PATCH /users/:id
router.patch(
  '/:id',
  user.authMw,
  note.getNoteMw,
  note.updateNoteMw,
  note.getNoteMw,
  note.returnNoteMw
);

// DELETE /users/:id
router.delete('/:id', user.authMw, note.getNoteMw, note.deleteNoteMw);

export default router;
