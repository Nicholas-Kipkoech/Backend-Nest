import { Wallet } from './wallet.model';
import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/Auth/auth.model';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel('Wallet') private walletModel: Model<Wallet>,
    @InjectModel('User') private userModel: Model<User>,
  ) {}
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
  async getWallets() {
    const wallets = await this.walletModel.find({}).exec();
    if (wallets.length === 0) {
      throw new NotFoundException('Wallets not found!');
    }
    return { wallets };
  }
  async getUserWallet(userID: string) {
    const UserWallet = await this.walletModel.findOne({ user: userID });
    if (!UserWallet) {
      throw new NotFoundException('Wallet not found');
    }
    return { UserWallet };
  }
}
