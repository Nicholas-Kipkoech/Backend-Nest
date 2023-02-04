import { NotFoundException } from '@nestjs/common';
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
  //fn for creating tx
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
      user: user,
      wallet: wallet.id,
      desc: desc,
      amount: amount,
      balance: new_balance,
    });
    await newTransaction.save();
    return {
      newTransaction,
    };
  }
  //fn for getting all TX
  async getAllTx() {
    const transactions = await this.transactionModel.find({}).exec();
    if (transactions.length === 0) {
      throw new NotFoundException('Failed to fetch transactions');
    }
    return { transactions };
  }
}
