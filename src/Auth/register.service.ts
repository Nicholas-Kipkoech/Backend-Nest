import { User } from './register.model';
import { Injectable } from '@nestjs/common';
@Injectable()
export class RegisterService {
  user: User[] = [];
  createUser(id: string, name: string, email: string) {
    const newUser = new User(id, name, email);
    this.user.push(newUser);
  }
}
