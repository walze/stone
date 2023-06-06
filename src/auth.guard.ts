import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { lastValueFrom, map, mergeMap, tap } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { verify } from './verify';

// body
// grant_type=client_credentials
// client_id=customers
// client_secret=453000f7-47a0-4489-bc47-891c742650e2
// username=<seu_email>
// password=<base64_de_seu_email>
// scope=openid
// Content-Type: application/x-www-form-urlencoded

export const base64 = (str: string) => Buffer.from(str).toString('base64');

const AUTH_API =
  'https://accounts.seguros.vitta.com.br/auth/realms/careers/protocol/openid-connect/token';

const encode = (o: Record<string, string>) =>
  new URLSearchParams(Object.entries(o)).toString();

export const auth = (username: string) =>
  fromFetch(AUTH_API, {
    method: 'POST',
    body: encode({
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
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization.replace('Bearer ', '');
    if (!token) return false;

    const isValid = auth('wallacefares').pipe(
      mergeMap((res) => res.json()),
      map((res) => res.access_token as string),
      map((_) => verify(token) && true),
      tap((res) => console.log(res, 123)),
    );

    return lastValueFrom(isValid);
  }
}
