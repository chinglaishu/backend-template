import { HttpException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { ApplicationException } from "src/core/exception/exception.model";
import { UseError } from "src/core/exception/exceptioncode.enum";
import { PASSWORD_SALT_ROUND } from "../../constant/config";

const crypt = {
  async hashPassword(password: string) {
    return await bcrypt.hash(password, PASSWORD_SALT_ROUND);
  },
  async comparePasswordAndHash(password: string, hash: string, throwErrorIfNotMatch: boolean = true) {
    const isMatch = await bcrypt.compare(password, hash);
    if (!isMatch && throwErrorIfNotMatch) {
      throw new ApplicationException(UseError.AUTH_FAILED);
    }
    return isMatch;
  },
};

export default crypt;
