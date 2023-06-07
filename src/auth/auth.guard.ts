import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { fromFetch } from 'rxjs/fetch';
import { verify } from './verify';
import { IAuthResponse } from 'src/typings';
import type { Response } from 'express';

export const base64 = (str: string) => Buffer.from(str).toString('base64');

const AUTH_API =
  'https://accounts.seguros.vitta.com.br/auth/realms/careers/protocol/openid-connect/token';

const obj2params = (o: Record<string, string>) =>
  new URLSearchParams(Object.entries(o)).toString();

export const auth = (username: string) =>
  fromFetch<IAuthResponse>(AUTH_API, {
    selector: (res) => res.json(),
    method: 'POST',
    body: obj2params({
      grant_type: 'client_credentials',
      client_id: 'customers',
      client_secret: '453000f7-47a0-4489-bc47-891c742650e2',
      username,
      password: base64(username),
      scope: 'openid',
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse() as Response;
    const token = req.headers.authorization?.split(' ')?.[1];

    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
      return false;
    }

    const isValid = await verify(token);

    return isValid;
  }
}
