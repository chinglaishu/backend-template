import { HttpException } from "@nestjs/common";
import { DEFAULT_TTL } from "src/constant/constant";
import { User } from "src/user/entities/user.entity";

const generateDigitNumber = (digit: number) => {
  let result = "";
  for (let i = 0; i < digit; i++) {
      result = result + `${Math.ceil(Math.random() * 9)}`
  }
  return result;
};

const authHelper = {
  async setCodeForUser(cache: any, useKey: string, ttl: number = DEFAULT_TTL) {
    const code = generateDigitNumber(4);
    await cache.set(useKey, code, {
      ttl,
    });
    console.log(`code: ${code}`)
    return code;
  },
  async checkIfCodeValid(cache: any, useKey: string, code: string, throwErrorIfNotValid: boolean = true) {
    const storeCode = await cache.get(useKey);
    const isValid = storeCode && storeCode === code;
    if (!isValid && throwErrorIfNotValid) {
      throw new HttpException(`code not valid`, 401);
    }
    if (storeCode === code) {
      await cache.del(useKey);
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