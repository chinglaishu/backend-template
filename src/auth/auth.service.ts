import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OAuth2Client } from "google-auth-library";
import { APPLE_CLIENT_SECRET, GOOGLE_CLIENT_ID, REFERSH_TOKEN_EXPIRE_TIME } from '../constant/config';
import { CreateRefreshTokenDto, SignupDto, SocialAuthDto } from './dto/auth.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import authHelper from './helper/helper';
import { ConfigService } from 'src/config/config.service';
import { ACCOUNT_TYPE_NUM, CONFIG_TYPE_NUM, LANGUAGE } from '../constant/constant';
import { UserService } from 'src/user/user.service';
import { Token, TokenDocument } from './entity/token.entity';
import { User } from 'src/user/entities/user.entity';
import JwtStrategy from 'src/core/authentication/jwt.strategy';
import { BaseService } from 'src/utils/base/base.service';
import configHelper from 'src/config/helper/helper';
import utilsFunction from 'src/utils/utilsFunction/utilsFunction';
import { AppleVerifyResponse, FacebookVerifyResponse } from 'src/types/auth';

const querystring = require("querystring");

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

@Injectable()
export class AuthService extends BaseService<CreateRefreshTokenDto, any, any> {
  constructor(
    @InjectModel(Token.name) public model: Model<TokenDocument>,
  ) {
    super(model);
  }

  async getSocialIdFromSocialAuth(socialAuthDto: SocialAuthDto) {
    const {token, clientId, accountTypeNum} = socialAuthDto;
    if (accountTypeNum === ACCOUNT_TYPE_NUM.GOOGLE) {
      return await this.getSocialIdFromGoogleToken(token);
    } else if ( accountTypeNum === ACCOUNT_TYPE_NUM.FACEBOOK) {
      return await this.getSocialIdFromFacebookToken(token);
    } else if (accountTypeNum === ACCOUNT_TYPE_NUM.APPLE) {
      return await this.getSocialIdFromAppleToken(token, clientId);
    }
    throw new HttpException("account type num error", 500);
  }

  async getSocialIdFromGoogleToken(token: string) {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    const {email} = ticket.getPayload();
    return email;
  }

  async getSocialIdFromFacebookToken(token: string) {
    const url = `https://graph.facebook.com/me?access_token=${token}&fields=id`;
    const result = await utilsFunction.makeRequest(url, "POST");
    const facebookRes: FacebookVerifyResponse = result.data;
    if (facebookRes.error) {
      throw new HttpException("Facebook verify error", 500);
    }
    return facebookRes.id;
  }

  async getSocialIdFromAppleToken(token: string, clientId: string) {
    const url = `https://appleid.apple.com/auth/token`;
    const body = {
      client_id: clientId,
      client_secret: APPLE_CLIENT_SECRET,
      code: token,
      grant_type: "authorization_code",
    };
    const result = await utilsFunction.makeRequest(url, "POST", querystring.stringify(body));
    const appleRes: AppleVerifyResponse = result.data;
    if (appleRes.error) {
      throw new HttpException("Apple verify error", 500);
    }
    const decodeToken = JwtStrategy.decode(appleRes.id_token);
    return decodeToken.sub;
  }

  async sendCode(cache: any, useKey: string, to: string, configService: ConfigService, lang: LANGUAGE) {
    const token = await authHelper.setCodeForUser(cache, useKey);
    const {subject, content, messageMethodNum} = await configService.findByLang(CONFIG_TYPE_NUM.VERIFY_CODE, lang);
    const useContent = content.replace(/{{TOKEN}}/g, token);
    await configHelper.sendMessage(subject, useContent, to, messageMethodNum);
    return true;
  }

  async signup(signupDto: SignupDto, userService: UserService) {
    const {username, password} = signupDto;
    const createUserDto: CreateUserDto = {username, password};
    const result = await userService.create(createUserDto);
    return result;
  }

  async generateRefreshToken(user: User) {
    const {id} = user;
    const refreshToken = JwtStrategy.signByUser(user, REFERSH_TOKEN_EXPIRE_TIME);
    await this.create({userId: id, refreshToken});
    return refreshToken;
  }

  // when someone try to use a used refresh token
  async deleteAllRefreshTokenByUserId(userId: string) {
    return await this.model.deleteMany({userId});
  }
}
