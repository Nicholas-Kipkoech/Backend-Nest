import { User } from './auth.model';
import { Injectable, NotFoundException } from '@nestjs/common';
@Injectable()
export class AuthService {
  users: User[] = [];

  createUser(name: string, email: string) {
    const userID = Math.random().toString();
    const newUser = new User(userID, name, email);
    this.users.push(newUser);
  }
  getUsers() {
    return [...this.users];
  }
  getOneUser(userId: string) {
    const users = this.users.find((user) => user.id == userId);
    if (!users) {
      throw new NotFoundException('User not found ');
    }
    return { ...users };
  }
}
