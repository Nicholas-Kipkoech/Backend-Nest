import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('user')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('create')
  //create user
  createUser(
    @Body('username') username: string,
    @Body('email') userEmail: string,
    @Body('password') userPassword: string,
  ): Promise<any> {
    const createdUser = this.authService.createUser(
      username,
      userEmail,
      userPassword,
    );
    return createdUser;
  }
  //get all users
  @Get('fetch/users')
  async getAllUsers() {
    const users = await this.authService.getUsers();
    return { users: users.users };
  }
  @Get('fetch/:userID')
  async getUserAndWallet(@Param('userID') userID: string) {
    const fetchedUser = await this.authService.getOneUserAndWallets(userID);
    return { fetchedUser };
  }
}
