import mongoose, { Schema } from 'mongoose';
import UserCollection from './user.model';

export type IAuthToken = mongoose.Document & {
  user: Schema.Types.ObjectId;
  accessToken: string;
  refreshToken: string;
  kind: string;
};

const authTokenSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: typeof UserCollection, required: true },
  accessToken: { type: String },
  refreshToken: { type: String },
  kind: { type: String },
}, { timestamps: true });

export const AuthTokenCollection = mongoose.model<IAuthToken>('authTokens', authTokenSchema);
