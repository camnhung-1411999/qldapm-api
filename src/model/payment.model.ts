import mongoose, { Schema } from 'mongoose';
import UserCollection from './user.model';

export type IPayment = mongoose.Document & {
  email: String;
  amount: string;
};

const paymentSchema = new mongoose.Schema({
    email: { type: String, ref: UserCollection },
    amount: String,
}, { timestamps: true });


const PaymentCollection = mongoose.model<IPayment>('payment', paymentSchema);

export default PaymentCollection;
