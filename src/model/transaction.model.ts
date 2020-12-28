import mongoose, { Schema } from 'mongoose';
import UserCollection from './user.model';
import FileCollection from './file.model';

export type ITransaction = mongoose.Document & {
  sender: string;
  receiver: string;
  fileId: Schema.Types.ObjectId;
  status: string;
};

const transactionSchema = new mongoose.Schema({
    sender: { type: String, ref: UserCollection },
    receiver: { type: String, ref: UserCollection },
    fileId: { type: Schema.Types.ObjectId, ref:  FileCollection},
    status: { type: String},
}, { timestamps: true });


const TransactionCollection = mongoose.model<ITransaction>('transaction', transactionSchema);

export default TransactionCollection;
