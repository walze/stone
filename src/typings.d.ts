export interface IAuthResponse {
  access_token: string;
  expires_in: number;
  id_token: string;
  'not-before-policy': number;
  refresh_expires_in: number;
  scope: string;
  token_type: string;
}

export interface ICustomer {
  id: string;
  document: number;
  name: string;
}
