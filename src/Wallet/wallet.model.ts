import * as mongoose from 'mongoose';

export const walletSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  address: {
    type: Number,
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
});
export interface Wallet {
  user: object;
  address: number;
  balance: number;
}
