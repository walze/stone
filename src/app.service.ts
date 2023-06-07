import { Injectable } from '@nestjs/common';
import { auth } from './auth.guard';
import { mergeMap } from 'rxjs';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  login(username: string) {
    return auth(username).pipe(mergeMap((res) => res.json()));
  }
}
