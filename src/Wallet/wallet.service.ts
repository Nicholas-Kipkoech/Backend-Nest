import { Wallet } from './wallet.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/Auth/auth.model';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel('Wallet') private walletModel: Model<Wallet>,
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Wallet') private transactionModel: Model<Wallet>,
  ) {}
  //creating a wallet by user
  async createWallet(
    userEmail: string,
    address: string,
    balance: number,
    accountName: string,
  ) {
    const user: string = await this.userModel.findOne({ email: userEmail });
    const wallet = new this.walletModel({
      user: user,
      address: address,
      accountName: accountName,
      balance: balance,
    });
    await wallet.save();
    return { wallet };
  }
  //getting all registered wallets and users owning that wallet
  async getWallets() {
    const wallets = await this.walletModel.find({}).exec();
    if (wallets.length === 0) {
      throw new NotFoundException('Wallets not found!');
    }
    return { wallets };
  }
  //getting all user wallets
  async getUserWallets(userID: string) {
    const UserWallet = await this.walletModel.find({ user: userID });
    if (!UserWallet) {
      throw new NotFoundException('Wallets not found');
    }
    return { UserWallet };
  }
  //getting one wallet using wallet_id
  async getOneWallet(walletID: string) {
    const wallet = await this.walletModel.findOne({ _id: walletID }).exec();
    if (!wallet) {
      throw new NotFoundException('Wallet not found!');
    }
    return { wallet };
  }
  //funding the wallet or adding income
  async fundWallet(newBalance: number, walletID: string) {
    const updatedWallet = await this.getOneWallet(walletID);
    //updating income with new value
    const updatedBalance = updatedWallet.wallet.balance + newBalance;
    if (newBalance) {
      updatedWallet.wallet.balance = updatedBalance;
    }
    await updatedWallet.wallet.save();
    return { updatedWallet: updatedWallet.wallet };
  }
  //update balance after transactions
}
