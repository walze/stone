import * as jwksClient from 'jwks-rsa';
import { GetPublicKeyOrSecret, decode, verify as v } from 'jsonwebtoken';

const fetchJwksUri = (issuer: string) =>
  fetch(`${issuer}/.well-known/openid-configuration`)
    .then((res) => res.json())
    .then(({ jwks_uri }) => jwks_uri);

const getKey =
  (jwksUri: string): GetPublicKeyOrSecret =>
  (header, callback) =>
    jwksClient({ jwksUri })
      .getSigningKey(header.kid)
      .then((key) => {
        callback(null, key.getPublicKey());
      });

export const verify = async (token: string) => {
  const { iss } = decode(token) as Record<string, string>;
  const jwksUri = await fetchJwksUri(iss);

  return new Promise((rs, rj) =>
    v(token, getKey(jwksUri), { algorithms: ['RS256'] }, (err, decoded) => {
      if (err) return rj(err);
      return rs(decoded);
    }),
  );
};
