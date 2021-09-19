import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OAuth2Client } from "google-auth-library";
import { GOOGLE_CLIENT_ID, REFERSH_TOKEN_EXPIRE_TIME } from '../constant/config';
import { CreateRefreshTokenDto, GoogleAuthDto, SignupDto } from './dto/auth.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import authHelper from './helper/helper';
import { ConfigService } from 'src/config/config.service';
import { CONFIG_TYPE_NUM, LANGUAGE } from '../constant/constant';
import { UserService } from 'src/user/user.service';
import { Token, TokenDocument } from './entity/token.entity';
import { User } from 'src/user/entities/user.entity';
import JwtStrategy from 'src/core/authentication/jwt.strategy';
import { BaseService } from 'src/utils/base/base.service';
import configHelper from 'src/config/helper/helper';

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

@Injectable()
export class AuthService extends BaseService<CreateRefreshTokenDto, any, any> {
  constructor(
    @InjectModel(Token.name) public model: Model<TokenDocument>,
  ) {
    super(model);
  }

  async getEmailFromGoogleToken(googleAuthDto: GoogleAuthDto) {
    const {token} = googleAuthDto;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    const {email} = ticket.getPayload();
    return email;
  }

  async sendCode(cache: any, useKey: string, to: string, configService: ConfigService, lang: LANGUAGE) {
    const token = await authHelper.setCodeForUser(cache, useKey);
    const {subject, content, messageMethodNum} = await configService.findByLang(CONFIG_TYPE_NUM.VERIFY_CODE, lang);
    const useContent = content.replace(/{{TOKEN}}/g, token);
    await configHelper.sendMessage(subject, useContent, to, messageMethodNum);
    return true;
  }

  async signup(signupDto: SignupDto, cache: any, userService: UserService) {
    const {email, password, phone, code} = signupDto;
    await authHelper.checkIfCodeValid(cache, phone, code, true);
    const createUserDto: CreateUserDto = {email, password};
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
