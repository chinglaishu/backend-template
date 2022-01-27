import { ACCOUNT_TYPE_NUM, ROLE_NUM } from "../../constant/constant";

export class BaseFilterOption {
  id?: string;
  from?: any;
  to?: any;
}

export class TemplateFilterOption extends BaseFilterOption {};
export class UserFilterOption {};