import { ACCOUNT_TYPE_ENUM, ROLE_ENUM } from "../../constant/constant";

export type BaseFilterOption = {
  _id?: any;
};

export type TemplateFilterOption = {} & BaseFilterOption;
export class UserFilterOption {};