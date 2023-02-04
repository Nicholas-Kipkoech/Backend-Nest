import * as mongoose from 'mongoose';

export const transactionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    wallet: { type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' },
    desc: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  { timestamps: true },
);

export interface Transaction {
  user?: any;
  wallet?: any;
  desc: string;
  amount: number;
}
