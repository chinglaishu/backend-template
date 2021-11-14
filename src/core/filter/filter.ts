import { ACCOUNT_TYPE_NUM, MATCH_METHOD_NUM, MATCH_STATUS_NUM, ROLE_NUM } from "../../constant/constant";

export class BaseFilterOption {
  id?: string;
  from?: any;
  to?: any;
}

export class UserFilterOption extends BaseFilterOption {
  username?: string;
  roleNum?: ROLE_NUM;
  phone?: string;
  socialId?: string;
  accountTypeNum?: ACCOUNT_TYPE_NUM;
}

export class TemplateFilterOption extends BaseFilterOption {};

export class MatchFilterOption extends BaseFilterOption {
  fromUserId?: string;
  toUserId?: string;
  method?: MATCH_METHOD_NUM;
  status?: MATCH_STATUS_NUM;
};