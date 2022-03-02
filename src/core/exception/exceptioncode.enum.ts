
export type ErrorResponseData = {code: number, status: number, message: any};
export type ErrorResponse<Keys extends string> = {[key in Keys]?: {code: number, status: number, message: any}};

type CommonErrors = "UNKNOWN_ERROR";

export const CommonError: ErrorResponse<CommonErrors> = {
  UNKNOWN_ERROR: {code: 10000, status: 500, message: "unknown error"}
};
