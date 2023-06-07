import { Injectable } from '@nestjs/common';
import { auth } from './auth.guard';

@Injectable()
export class AuthService {
  login(username: string) {
    return auth(username);
  }
}
