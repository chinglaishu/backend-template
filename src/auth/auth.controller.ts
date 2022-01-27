import { Controller, Post, Body, HttpException, Get } from '@nestjs/common';
import { Public } from 'src/core/decorator/public.decorator';
import { AuthService } from "./auth.service";
import { SignupDto, LoginDto, ResetPasswordDto, ForgetPasswordDto, ForgetPasswordRequestDto, RefreshTokenDto, SMSRequestDto, SocialAuthDto, SMSVerifyDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import JwtStrategy from 'src/core/authentication/jwt.strategy';
import crypt from 'src/utils/utilsFunction/crypt';
import authHelper from './helper/helper';
import { ReqUser } from 'src/core/decorator/user.decorator';
import { User } from 'src/user/entities/user.entity';
import { ConfigService } from 'src/config/config.service';
import { Lang } from 'src/core/decorator/lang.decorator';
import { CONFIG_TYPE_NUM, LANGUAGE, ACCOUNT_TYPE_NUM } from '../constant/constant';
import { ACCESS_TOKEN_EXPIRE_TIME, REFERSH_TOKEN_EXPIRE_TIME } from 'src/constant/config';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { redisClient } from 'src/core/cache/cache';
import { SocketGateway } from 'src/socket/socket.gateway';

@Controller('auth')
export class AuthController {
  constructor(
    public service: AuthService,
    public userService: UserService,
    public configService: ConfigService,
    public gateway: SocketGateway,
  ) {}

  @Public()
  @Post("social-auth")
  async socialAuth(@Body() socialAuthDto: SocialAuthDto) {
    const {accountTypeNum} = socialAuthDto;
    const socialId = await this.service.getSocialIdFromSocialAuth(socialAuthDto);
    let user = await this.userService.findOneWithFilter({socialId, accountTypeNum});
    if (!user) {
      const createUserDto: CreateUserDto = {socialId, accountTypeNum: socialAuthDto.accountTypeNum};
      user = await this.userService.create(createUserDto);
    }
    const token = JwtStrategy.signByUser(user, ACCESS_TOKEN_EXPIRE_TIME);
    const refreshToken = await this.service.generateRefreshToken(user);
    return {user, token, refreshToken};
  }

  @Public()
  @Post("token/request")
  async signupRequest(@Body() smsRequestDto: SMSRequestDto, @Lang() lang: LANGUAGE) {
    const {phone, isSignup} = smsRequestDto;
    if (isSignup) {
      // dont let others know this phone is used?
      await this.userService.countAndError({phone});
    }
    await this.service.sendCode(redisClient, phone, phone, this.configService, lang);
    return true;
  }

  @Public()
  @Post("forget-password-token/request")
  async forgetPasswordToken(@Body() body: ForgetPasswordRequestDto, @Lang() lang: LANGUAGE) {
    const {phone} = body;
    const user: User = await this.userService.findOneWithFilter({phone}, null, true);
    await this.service.sendCode(redisClient, user.id, phone, this.configService, lang);
    return true;
  }

  @Public()
  @Post("signup")
  async signup(@Body() signupDto: SignupDto, @Lang() lang: LANGUAGE) {
    const user = await this.service.signup(signupDto, this.userService);
    const token = JwtStrategy.signByUser(user, ACCESS_TOKEN_EXPIRE_TIME);
    const refreshToken = await this.service.generateRefreshToken(user);
    return {user, token, refreshToken};
  }

  @Post("token/verify-only")
  async SMSVerifyOnly(@Body() smsVerifyDto: SMSVerifyDto, @Lang() lang: LANGUAGE) {
    const {phone, code} = smsVerifyDto;
    await authHelper.checkIfCodeValid(redisClient, phone, code, false);
    return true;
  }

  @Post("phone/verify")
  async signupSMSVerify(@ReqUser() user: User, @Body() smsVerifyDto: SMSVerifyDto, @Lang() lang: LANGUAGE) {
    const {phone, code} = smsVerifyDto;
    await authHelper.checkIfCodeValid(redisClient, phone, code, true);
    const result = await this.userService.update(user.id, {phone}, true);
    return result;
  }

  @Public()
  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    const {username, password} = loginDto;
    const user = await this.userService.findOneWithFilter({username}, null, true);
    await crypt.comparePasswordAndHash(password, user.password);
    const token = JwtStrategy.signByUser(user, ACCESS_TOKEN_EXPIRE_TIME);
    const refreshToken = await this.service.generateRefreshToken(user);
    return {user, token, refreshToken};
  }

  @Public()
  @Post("forget-password")
  async forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
    const {newPassword, code, username} = forgetPasswordDto;
    const user = await this.userService.findOneWithFilter({username}, null, true);
    await authHelper.checkIfCodeValid(redisClient, user.id, code);
    const hashNewPassword = await crypt.hashPassword(newPassword);
    await this.userService.update(user.id, {password: hashNewPassword});
    return true;
  }

  @Post("reset-password")
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto, @ReqUser() user: User) {
    const {oldPassword, newPassword} = resetPasswordDto;
    await crypt.comparePasswordAndHash(oldPassword, user.password);
    const hashNewPassword = await crypt.hashPassword(newPassword);
    await this.userService.update(user.id, {password: hashNewPassword});
    return true;
  }

  @Public()
  @Post("refresh-token")
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto, @Lang() lang: LANGUAGE) {
    const {refreshToken} = refreshTokenDto;
    const userId = JwtStrategy.getUserIdFromToken(refreshToken);
    const user = await this.userService.findOne(userId, true);
    const token = await this.service.findOneWithFilter({refreshToken}, null, false);
    if (!token) {
      await this.service.deleteAllRefreshTokenByUserId(userId);
      throw new HttpException("token is used or invalid", 500);
    } else {
      const newRefreshToken = JwtStrategy.signByUser(user, REFERSH_TOKEN_EXPIRE_TIME);
      await this.service.update(token.id, {refreshToken: newRefreshToken}, true);
      const accessToken = JwtStrategy.signByUser(user, ACCESS_TOKEN_EXPIRE_TIME);
      return {token: accessToken, refreshToken: newRefreshToken};
    }
  }

  @Public()
  @Get("test")
  async test() {
    this.gateway.sendMessages("social auth test");
    return;
  }
}
