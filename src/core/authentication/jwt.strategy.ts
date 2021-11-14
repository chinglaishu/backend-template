import {JWT_SECRET} from "../../constant/config";
import * as jwt from "jsonwebtoken";
import { ExecutionContext, HttpException } from "@nestjs/common";
import { AUTH_HEADER } from "../../constant/constant";
import { User } from "src/user/entities/user.entity";
import { DecodeTokenObj } from "src/types/common";
import { AppleDecodeToken } from "src/types/auth";

const JwtStrategy = {
  sign(userId: any, expireTime: string) {
    return jwt.sign({userId}, JWT_SECRET, {expiresIn: expireTime});
  },
  signByUser(user: User, expireTime: string) {
    const {id} = user;
    return this.sign(id, expireTime);
  },
  verify(token: string) {
    try {
      return (jwt.verify(token, JWT_SECRET) as DecodeTokenObj);
    } catch (err) {
      return false;
    }
  },
  getUserIdFromToken(token: string) {
    const decodeTokenObj = JwtStrategy.verify(token);
    if (!decodeTokenObj) {
      throw new HttpException("not valid token", 500);
    }
    const {userId} = decodeTokenObj;
    return userId;

  },
  getTokenFromReq(req: Request) {
    const {headers} = req;
    const token = headers[AUTH_HEADER];
    return token;
  },
  decode(token: string) {
    return (jwt.decode(token)) as AppleDecodeToken;
  },
};

export default JwtStrategy;
