import { InjectModel } from '@nestjs/mongoose';

import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './auth.model';
import { Wallet } from 'src/Wallet/wallet.model';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Wallet') private walletModel: Model<Wallet>,
  ) {}
  //creation of user
  async createUser(username: string, email: string, password: string) {
    const newUser = new this.userModel({ username, email, password });
    await newUser.save();
    return { newUser };
  }
  //fetching all users in the database
  async getUsers() {
    const users = await this.userModel.find({}).exec();
    if (!users) {
      throw new NotFoundException('Users cannot be found');
    }
    return { users };
  }
  //fetching user and his or her wallets using user ID
  async getOneUserAndWallets(userID: string) {
    const user = await this.userModel.findOne({ _id: userID }).exec();
    const userWallets = await this.walletModel.find({ user: userID }).exec();
    if (!user && !userWallets) {
      throw new NotFoundException('User account not found!');
    }
    return { user, userWallets };
  }
}
