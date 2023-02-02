import { Controller, Post } from '@nestjs/common';
import { RegisterService } from './register.service';

@Controller('auth')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}
  @Post()
  createUser(): any {
    this.registerService.createUser();
  }
}
