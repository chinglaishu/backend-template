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

export type ACCOUNT_TYPE_NUM = 0 | 1 | 2 | 3;
export const ACCOUNT_TYPE_NUM: {
  
  NORMAL: ACCOUNT_TYPE_NUM,
  GOOGLE: ACCOUNT_TYPE_NUM,
  FACEBOOK: ACCOUNT_TYPE_NUM,
  APPLE: ACCOUNT_TYPE_NUM,

} = {

  NORMAL: 0,
  GOOGLE: 1,
  FACEBOOK: 2,
  APPLE: 3,

};

export type SEX_NUM = 0 | 1 | 2;
export const SEX_NUM: {
  MALE: SEX_NUM,
  FEMALE: SEX_NUM,
  OTHER: SEX_NUM,
} = {
  MALE: 0,
  FEMALE: 1,
  OTHER: 2,
};

export const SEX_NUM_REF = {
  0: "Male",
  1: "Female",
  2: "Other",
};

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

export type MESSAGE_METHOD_NUM = 0 | 1;
export const MESSAGE_METHOD_NUM: {

  EMAIL: MESSAGE_METHOD_NUM,
  SMS: MESSAGE_METHOD_NUM,

} = {

  EMAIL: 0,
  SMS: 1,

};

export type AGE_RANGE_NUM = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export const AGE_RANGE_NUM: {

  "below20": AGE_RANGE_NUM,
  "20to25": AGE_RANGE_NUM,
  "25to29": AGE_RANGE_NUM,
  "30to35": AGE_RANGE_NUM,
  "35to39": AGE_RANGE_NUM,
  "40to45": AGE_RANGE_NUM,
  "45to50": AGE_RANGE_NUM,
  "over50": AGE_RANGE_NUM,

} = {

  "below20": 0,
  "20to25": 1,
  "25to29": 2,
  "30to35": 3,
  "35to39": 4,
  "40to45": 5,
  "45to50": 6,
  "over50": 7,

};

export type FRIEND_STATUS_NUM = -1 | 0;
export const FRIEND_STATUS_NUM: {

  friend_quit: FRIEND_STATUS_NUM,
  normal: FRIEND_STATUS_NUM,

} = {
  friend_quit: -1,
  normal: 0,
};

export type MATCH_STATUS_NUM = -1 | 0 | 1;
export const MATCH_STATUS_NUM: {
  REJECTED: MATCH_STATUS_NUM,
  WAITING: MATCH_STATUS_NUM,
  ACCEPTED: MATCH_STATUS_NUM,
} = {
  REJECTED: -1,
  WAITING: 0,
  ACCEPTED: 1,
};

export type MATCH_METHOD_NUM = 0 | 1;
export const MATCH_METHOD_NUM: {
  SYSTEM: MATCH_METHOD_NUM,
  MANUAL: MATCH_METHOD_NUM,
} = {
  SYSTEM: 0,
  MANUAL: 1,
};
