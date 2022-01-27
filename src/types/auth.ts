export class GoogleVerifyResponse {
  iss: string
  azp: string
  aud: string
  sub: string
  email: string
  email_verified: boolean
  at_hash: string
  name: string
  picture: string
  given_name: string
  family_name: string
  locale: string
}

export class FacebookVerifyResponse {
  id: string;
  error?: any;
}

export class AppleVerifyResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  id_token: string;
  error?: any;
}

export class AppleDecodeToken {
  iss: string;
  aud: string;
  exp: number;
  iat: number;
  sub: string;
  at_hash: string;
  email: string; // "fn8fwwmczc@privaterelay.appleid.com", maybe it's private and random gen by apple
  email_verified: string; // string "true"
  is_private_email: string; // string "true"
  auth_time: number;
  nonce_supported: boolean
}

export class AppleUserInfo {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}
