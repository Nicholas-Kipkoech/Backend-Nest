import * as mongoose from 'mongoose';

export const walletSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  address: {
    type: String,
    required: true,
    unique: true,
  },
  accountName: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
});
export interface Wallet {
  user?: any;
  address: string;
  balance: number;
  accountName: string;
}
