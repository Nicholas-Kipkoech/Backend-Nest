import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
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
}
