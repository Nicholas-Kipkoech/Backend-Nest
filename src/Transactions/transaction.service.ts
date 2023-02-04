import { User } from 'src/Auth/auth.model';
import { Wallet } from './../Wallet/wallet.model';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from './transaction.model';
import { Model } from 'mongoose';

export class TransactionService {
  constructor(
    @InjectModel('Transaction') private transactionModel: Model<Transaction>,
    @InjectModel('Wallet') private walletModel: Model<Wallet>,
    @InjectModel('User') private userModel: Model<User>,
  ) {}
  async createTransaction(
    userID: string,
    walletID: string,
    desc: string,
    amount: number,
  ) {
    const user = await this.userModel.findOne({ _id: userID });
    const wallet = await this.walletModel.findOne({ _id: walletID });
    const new_balance = wallet.balance - amount;
    const newTransaction = new this.transactionModel({
      user,
      wallet,
      desc,
      amount,
      new_balance,
    });
    await newTransaction.save();
    return {
      msg: `${user.username}  has paid ksh ${amount} for ${desc} . Balance is ${new_balance} account name: ${wallet.accountName}`,
    };
  }
}
