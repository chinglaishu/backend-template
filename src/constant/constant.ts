export const GLOBALPREFIX = 'api';
export const AUTH_HEADER = "authorization";
export const TIMEZONE = "Asia/Hong_Kong";
export const DEFAULT_LANGUAGE: LANGUAGE = "en";
export const LANG_HEADER = "accept-language";
export const GET_ALL_KEY = "isGetAll";

export const DTO_ROLE_KEY = "dto_role";
export const DTO_USER_ID_KEY = "dto_userId";
export const DTO_CHECK_ADMIN_FIELD_KEY = "dto-check-admin";
export const DEFAULT_PAGE_SIZE = 20;
export const DEFAULT_TTL = 3600;
export const MAX_INTIMACY_LEVEL = 10;

export const USER_ID_FIELD = "userId";

export type LANGUAGE = "en" | "zh";

export enum ACCOUNT_TYPE_ENUM {
  NORMAL = 0,
  GOOGLE = 1,
  FACEBOOK = 2,
  APPLE = 3,
};

export enum ROLE_ENUM {
  ADMIN = 0,
  USER = 1,
  GUEST = 2,
};

export enum CONFIG_TYPE_ENUM {
  VERIFY_CODE = 0,
  SIGNUP_SUCCESS = 1,
  REUSE_REFRESH_TOKEN = 2,
};

export enum MESSAGE_METHOD_ENUM {
  EMAIL = 0,
  SMS = 1,
};
