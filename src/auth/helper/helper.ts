import { DEFAULT_TTL } from "src/constant/constant";
import { redisHelper } from "src/core/cache/cache";
import { ApplicationException } from "src/core/exception/exception.model";
import { UseError } from "src/core/exception/exceptioncode.enum";
import { User } from "src/user/entities/user.entity";
import utilsFunction from "src/utils/utilsFunction/utilsFunction";

const generateDigitNumber = (digit: number) => {
  let result = "";
  for (let i = 0; i < digit; i++) {
      result = result + `${Math.ceil(Math.random() * 9)}`
  }
  return String(result);
};

const authHelper = {
  async setCodeForUser(cache: any, useKey: string, ttl: number = DEFAULT_TTL) {
    const code = generateDigitNumber(4);
    await redisHelper.setRedisKey(cache, useKey, code, ttl);
    console.log(`code: ${code}`);
    return code;
  },
  async checkIfCodeValid(cache: any, useKey: string, code: string, isDelete: boolean = true) {
    const storeCode = await redisHelper.getRedisKey(cache, useKey);
    const isValid = storeCode && utilsFunction.compareId(storeCode, code);
    if (!isValid) {
      throw new ApplicationException(UseError.CODE_INVALID);
    }
    if (isValid && isDelete) {
      await redisHelper.delRedisKey(cache, useKey);
    }
    return isValid;
  },
  generatePassword(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },
  // use by signup success and request email
  editEmailContent(content: string, user: User) {
    content = content.replace(/{{email}}/g, user.displayName);
    return content;
  },
};

export default authHelper;