import { InjectModel } from '@nestjs/mongoose';

import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './auth.model';
@Injectable()
export class AuthService {
  private users: User[] = [];
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async createUser(username: string, email: string, password: string) {
    const newUser = new this.userModel({ username, email, password });
    await newUser.save();
    return { newUser };
  }
}
