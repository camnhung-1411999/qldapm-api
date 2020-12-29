import mongoose, { Schema } from 'mongoose';
import UserCollection from './user.model';

export type IFile = mongoose.Document & {
  email: String;
  path: string;
  type: string;
  size: number;
  name: string;
  signed: boolean;
};

const fileSchema = new mongoose.Schema({
    email: { type: String, ref: UserCollection },
    path: { type: String},
    type: { type: String},
    name: { type: String},
    signed: {type: Boolean},
    size: Number,
}, { timestamps: true });


const FileCollection = mongoose.model<IFile>('file', fileSchema);

export default FileCollection;
