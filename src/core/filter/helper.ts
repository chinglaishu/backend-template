import { ROLE_ENUM, USER_ID_FIELD } from "src/constant/constant";
import { User } from "src/user/entities/user.entity";
import utilsFunction from "src/utils/utilsFunction/utilsFunction";
import { BaseFilterOption } from "./filter";

export const preprocessFilter = (filter: any, checkBelongUser: boolean, user: User) => {
  if (user.role === ROLE_ENUM.ADMIN) {return filter; }
  if (checkBelongUser) {
    filter[USER_ID_FIELD] = user.id;
  }
  return filter;
};

export const createFilterForArray = (filter: any) => {
  const keys = Object.keys(filter);
  for (let i = 0 ; i < keys.length ; i++) {
    if (utilsFunction.checkIfIsArrayAndHaveItem(filter[keys[i]])) {
      filter[keys[i]] = {$in: filter[keys[i]]};
    }
  }
};

export const createFilterForTime = (filter: any) => {
  const {from, to} = filter;
  if (from) {
    delete filter["from"];
    filter["startTime"] = {
      $gte: from,
    };
  }
  if (to) {
    delete filter["to"];
    filter["endTime"] = {
      $lte: to,
    };
  }
  return filter;
};
