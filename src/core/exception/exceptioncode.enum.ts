
export type ErrorResponseData = {code: number, status: number, message: any};
export type ErrorResponse<Keys extends string> = {[key in Keys]?: {code: number, status: number, message: any}};

type CommonErrors = "UNKNOWN_ERROR" | "UNEXPECTED_PARAMS" | "ITEM_NOT_FOUND_OR_NO_ACCESS" | "ITEM_REPEATED" | "MISSING_USER_IN_CREATE"
  | "CODE_INVALID" | "REFRESH_TOKEN_USED" | "AUTH_FAILED";

export const UseError: ErrorResponse<CommonErrors> = {
  UNKNOWN_ERROR: {code: 10000, status: 500, message: "unknown error"},
  UNEXPECTED_PARAMS: {code: 10001, status: 400, message: "unexpected params"},
  ITEM_NOT_FOUND_OR_NO_ACCESS: {code: 10002, status: 500, message: "item not found or no access"},
  ITEM_REPEATED: {code: 10003, status: 500, message: "item repeated"},
  MISSING_USER_IN_CREATE: {code: 10004, status: 500, message: "missing user in create"},
  // AUTH
  CODE_INVALID: {code: 20000, status: 401, message: "code invalid"},
  REFRESH_TOKEN_USED: {code: 20001, status: 401, message: "refresh token used or invalid"},
  AUTH_FAILED: {code: 20002, status: 401, message: "auth failed"},
};
