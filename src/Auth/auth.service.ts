import { InjectModel } from '@nestjs/mongoose';

import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './auth.model';
@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async createUser(username: string, email: string, password: string) {
    const newUser = new this.userModel({ username, email, password });
    await newUser.save();
    return { newUser };
  }
  async getUsers() {
    const users = await this.userModel.find({}).exec();
    if (!users) {
      throw new NotFoundException('Users cannot be found');
    }
    return { users };
  }
}
