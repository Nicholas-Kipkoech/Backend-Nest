import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  createUser(
    @Body('name') username: string,
    @Body('email') userEmail: string,
  ): any {
    const generatedId = this.authService.createUser(username, userEmail);
    return { id: generatedId };
  }
  @Get()
  getAllUsers() {
    return this.authService.getUsers();
  }
  @Get(':id')
  getOneUser(@Param('id') userId: string) {
    return this.authService.getOneUser(userId);
  }
}
