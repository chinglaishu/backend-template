import { GET_ALL_KEY, ROLE_NUM } from "../../constant/constant";
import { User } from "src/user/entities/user.entity";
import axios from "axios";
import * as moment from "moment";
import { HttpException } from "@nestjs/common";

const utilsFunction = {
  async makeRequest(url: string, requestMethod: any = "get", data: any = {}, headers: any = {}) {
    if (requestMethod.toLowerCase() === "get") {
      const request = await axios({
        method: "GET",
        url,
        headers,
      });
      return request;
    } else {
      const request = await axios({
        method: requestMethod,
        url,
        headers,
        data,
      });
      return request;
    }
  },
  getObjKeyPath(useObj: any, keyPathList: string[], defaultResponse: any) {
    let useData = useObj;
    for (let i = 0 ; i < keyPathList.length ; i++) {
      if (useData[keyPathList[i]]) {
        useData = useData[keyPathList[i]];
      } else {
        return defaultResponse;
      }  
    }
    return useData;
  },
  buildUrlWithParams(url: string, paramObj: any) {
    const keyList = Object.keys(paramObj);
    for (let i = 0 ; i < keyList.length ; i++) {
      const addText = (i === 0) ? `?${keyList[i]}=` : `&${keyList[i]}=`;
      url += addText + paramObj[keyList[i]];
    }
    return url;
  },
  tryJsonParse(item: string) {
    try {
      return JSON.parse(item);
    } catch {
      return item;
    }
  },
  checkIfAddUserId(idKey: string, user: User | null, useObj: any) {
    if (!user) {return useObj; }
    const {roleNum, id} = user;
    if (roleNum === ROLE_NUM.ADMIN && useObj[GET_ALL_KEY]) {
      delete useObj[GET_ALL_KEY];
      return useObj;
    }
    if (!(roleNum === ROLE_NUM.ADMIN && useObj[idKey])) {
      useObj[idKey] = id;
    }
    delete useObj[GET_ALL_KEY];
    return useObj;
  },
  checkIfAnyFalseInList(useList: any[]) {
    for (let i = 0 ; i < useList.length ; i++) {
      if (!useList[i]) {return true; }
    }
    return false;
  },
  compareId(a: any, b: any) {
    return String(a) === String(b);
  },
  compareTime(a: any, b: any) {
    return moment(a).isSame(moment(b));
  },
  removeIdFromIdList(useList: any[], item: any) {
    for (let i = 0 ; i < useList.length ; i++) {
      if (this.compareId(useList[i], item)) {
        useList.splice(i, 1);
        return true;
      }
    }
    return false;
  },
  checkIfIsArrayAndHaveItem(item: any) {
    if (!item) {return false; }
    if (!Array.isArray(item)) {return false; }
    if (item.length === 0) {return false; }
    return true;
  },
  paramsAppendByObj(params: any, useObj: any) {
    const keyList = Object.keys(useObj);
    for (let i = 0 ; i < keyList.length ; i++) {
      const key = keyList[i];
      if (!useObj[key]) {continue; }
      params.append(key, useObj[key]);
    }
  },
  getCheckUser(isCheck: boolean, user: User) {
    return isCheck ? user : null;
  },
  checkReadOnly(readOnly: boolean, user: User) {
    if (readOnly && user.roleNum !== ROLE_NUM.ADMIN) {
      throw new HttpException("read only", 500);
    }
    return true;
  },
};

export default utilsFunction;
