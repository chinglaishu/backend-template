export const GLOBALPREFIX = 'api';
export const AUTH_HEADER = "authorization";
export const TIMEZONE = "Asia/Hong_Kong";
export const DEFAULT_LANGUAGE: LANGUAGE = "en";
export const LANG_HEADER = "accept-language";
export const GET_ALL_KEY = "isGetAll";

export const DTO_TYPE_NUM_KEY = "dto_typeNum";
export const DTO_CHECK_ADMIN_FIELD_KEY = "dto-check-admin";
export const DEFAULT_PAGE_SIZE = 20;
export const DEFAULT_TTL = 3600;
export const MAX_INTIMACY_LEVEL = 10;

export const USER_ID_FIELD = "userId";

export type LANGUAGE = "en" | "zh";

export type WEEK_DAY_NUM = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export const WEEK_DAY_NUM: {

  SUN: WEEK_DAY_NUM,
  MON: WEEK_DAY_NUM,
  TUE: WEEK_DAY_NUM,
  WED: WEEK_DAY_NUM,
  THU: WEEK_DAY_NUM,
  FRI: WEEK_DAY_NUM,
  SAT: WEEK_DAY_NUM,

} = {
  SUN: 0,
  MON: 1,
  TUE: 2,
  WED: 3,
  THU: 4,
  FRI: 5,
  SAT: 6,
};

export type ROLE_NUM = 0 | 1 | 2;
export const ROLE_NUM: {

  ADMIN: ROLE_NUM,
  USER: ROLE_NUM,
  GUEST: ROLE_NUM,

} = {
  ADMIN: 0,
  USER: 1,
  GUEST: 2,
};

export type CONFIG_TYPE_NUM = 0 | 1 | 2;
export const CONFIG_TYPE_NUM: {

  VERIFY_CODE: CONFIG_TYPE_NUM,
  SIGNUP_SUCCESS: CONFIG_TYPE_NUM,
  REUSE_REFRESH_TOKEN: CONFIG_TYPE_NUM,

}  = {
  VERIFY_CODE: 0,
  SIGNUP_SUCCESS: 1,
  REUSE_REFRESH_TOKEN: 2,
};
