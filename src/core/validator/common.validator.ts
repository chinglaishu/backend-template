import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { DTO_CHECK_ADMIN_FIELD_KEY, DTO_ROLE_KEY, DTO_USER_ID_KEY } from "src/constant/constant";
import { ROLE_ENUM } from "src/constant/constant";

export const checkAdminConstraint = (args: ValidationArguments) => {
  const {object, constraints} = args;
  if (!constraints) {return true; }
  const isCheckAdmin = constraints.includes(DTO_CHECK_ADMIN_FIELD_KEY);
  if (!isCheckAdmin) {return true; }
  const role = object[DTO_ROLE_KEY];
  return role === ROLE_ENUM.ADMIN;
};

export const checkCorrectUserId = (value: string, args: ValidationArguments) => {
  const {object} = args;
  const role = object[DTO_ROLE_KEY];
  const userId = object[DTO_USER_ID_KEY];  
  return (userId === value || role === ROLE_ENUM.ADMIN);
};

@ValidatorConstraint({name: "adminOnlyField", async: false})
export class AdminFieldConfirmConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    return checkAdminConstraint(args);
  }
  
  defaultMessage(args: ValidationArguments) {
    const name = args.property;
    return `no access to update field: ${name}`;
  }
};

@ValidatorConstraint({name: "userIdField", async: false})
export class UserIdConfirmConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    return checkCorrectUserId(value, args);
  }

  defaultMessage(args: ValidationArguments) {
    return `please input correct user id`;
  }
};