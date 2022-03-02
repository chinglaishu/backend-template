import { ErrorResponse } from "src/core/exception/exceptioncode.enum";

type AuthErrors = "CODE_INVALID";

export const AuthError: ErrorResponse<AuthErrors> = {
  CODE_INVALID: {code: 20000, status: 401, message: "code invalid"},
};
