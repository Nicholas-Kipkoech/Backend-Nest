import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  createUser(
    @Body('user_name') username: string,
    @Body('user_id') userID: string,
    @Body('user_email') userEmail: string,
  ): any {
    const generatedId = this.authService.createUser(
      username,
      userID,
      userEmail,
    );
    return { id: generatedId };
  }
}
