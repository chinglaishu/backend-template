import { ValidationError } from "class-validator";
import { ApplicationException } from "./exception.model";
import { ErrorResponseData, UseError } from "./exceptioncode.enum";

export const getValidationErrorResponseData = (validationErrors: ValidationError[] = []) => {
  const message = validationErrors.reduce((prev: string, curr: any, index: number) => {
    const addSign = prev.length > 0 ? ", " : "";
    const errorMessage = String(Object.values(curr.constraints)?.[0]);
    return prev + `${addSign}${errorMessage}`;
  }, "");
  const errorResponseData: ErrorResponseData = {code: UseError.UNEXPECTED_PARAMS.code, status: 400, message};
  return new ApplicationException(errorResponseData); 
};
