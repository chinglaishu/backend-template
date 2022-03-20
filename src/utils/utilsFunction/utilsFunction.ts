import { GET_ALL_KEY, ROLE_ENUM } from "../../constant/constant";
import { User } from "src/user/entities/user.entity";
import axios from "axios";
import * as moment from "moment";
import { HttpException } from "@nestjs/common";
import { ValidationError } from "class-validator";
import { ApplicationException } from "src/core/exception/exception.model";
import { ErrorResponseData, UseError } from "src/core/exception/exceptioncode.enum";

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
};

export default utilsFunction;
