import _ from 'lodash';
import BaseRepository from './baseRepository';
import {
  ModelStructure,
  ModelTypes,
  ModelScalarFields,
  MODELS_NAME,
  AnyRecord,
} from './prisma-repo';

// This type will be used if you want to extends the functions in Note Class

/* eslint-disable @typescript-eslint/no-unused-vars */
type Where = ModelTypes[typeof MODELS_NAME.NOTE]['Where'];
type Select = ModelTypes[typeof MODELS_NAME.NOTE]['Select'];
type Include = ModelTypes[typeof MODELS_NAME.NOTE]['Include'];
type Create = ModelTypes[typeof MODELS_NAME.NOTE]['Create'];
type Update = ModelTypes[typeof MODELS_NAME.NOTE]['Update'];
type Cursor = ModelTypes[typeof MODELS_NAME.NOTE]['Cursor'];
type Order = ModelTypes[typeof MODELS_NAME.NOTE]['Order'];
type Delegate = ModelTypes[typeof MODELS_NAME.NOTE]['Delegate'];
type Scalar = ModelScalarFields<typeof MODELS_NAME.NOTE>;
type Model = ModelStructure[typeof MODELS_NAME.NOTE];
/*  eslint-enable @typescript-eslint/no-unused-vars */

class Note extends BaseRepository(MODELS_NAME.NOTE) {
  public static async resourceToModel(resource: AnyRecord) {
    const Note = _.pick(resource, ['title', 'post', 'date']);

    return Note as Create;
  }

  public static async modelToResource(note: ModelStructure['note']) {
    return note;
  }
}

export default Note;
