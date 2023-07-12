import _ from 'lodash';
import { asyncMw } from 'express-asyncmw';
import repository from '../repository';

export const createNoteMw = asyncMw(async (req, res, next) => {
  if (!req.isUser) return res.status(401).json({ message: 'Unauthorized' });

  const data = await repository.note.resourceToModel(req.body);
  req.note = await repository.note.create(data);

  return next();
});

export const getNoteMw = asyncMw(async (req, res, next) => {
  const note = await repository.note.findOne(req.params.id);

  if (!note) return res.status(404).json({ message: 'Note not found' });

  req.note = note;

  return next();
});

export const getNotesMw = asyncMw(async (req, res, next) => {
  req.notes = await repository.note.findAll(
    {},
    req.filterQueryParams,
    req.query
  );

  return next();
});

export const updateNoteMw = asyncMw(async (req, res, next) => {
  if (!req.isAdmin) return res.status(401).json({ message: 'Unauthorized' });

  const data = await repository.note.resourceToModel(req.body);
  const note = await repository.note.update(req.params.id, data);

  req.note = note;

  return next();
});

export const deleteNoteMw = asyncMw(async (req, res) => {
  if (!req.isAdmin) return res.status(401).json({ message: 'Unauthorized' });

  await repository.note.delete(req.params.id);

  return res.status(204).json({
    message: 'Pembukuan deleted',
  });
});

export const returnNoteMw = asyncMw(async (req, res) => {
  return res.json(await repository.note.modelToResource(req.note));
});

export const returnNotesMw = asyncMw(async (req, res) => {
  return res.json({
    rows: await Promise.all(
      _.map(_.get(req.notes, 'rows', []), (note) =>
        repository.note.modelToResource(note)
      )
    ),
    count: _.get(req.notes, 'count', 0),
  });
});
