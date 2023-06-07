import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post()
  login(@Body('username') username: string) {
    if (!username)
      throw new HttpException('Username is required', HttpStatus.BAD_REQUEST);

    return this.auth.login(username);
  }
}
