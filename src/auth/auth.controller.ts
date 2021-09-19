import { Controller, Post, Body, HttpException, CACHE_MANAGER, Inject, Req, Get } from '@nestjs/common';
import { Public } from 'src/core/decorator/public.decorator';
import { AuthService } from "./auth.service";
import { GoogleAuthDto, SignupDto, LoginDto, ResetPasswordDto, ChangeContactDto, ForgetPasswordDto, ForgetPasswordRequestDto, RefreshTokenDto, SMSRequest } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import JwtStrategy from 'src/core/authentication/jwt.strategy';
import crypt from 'src/utils/utilsFunction/crypt';
import authHelper from './helper/helper';
import { ReqUser } from 'src/core/decorator/user.decorator';
import { User } from 'src/user/entities/user.entity';
import { ConfigService } from 'src/config/config.service';
import { Lang } from 'src/core/decorator/lang.decorator';
import { CONFIG_TYPE_NUM, LANGUAGE, SIGNUP_METHOD_NUM } from '../constant/constant';
import { ACCESS_TOKEN_EXPIRE_TIME, REFERSH_TOKEN_EXPIRE_TIME } from 'src/constant/config';
import { Roles } from 'src/core/authorization/role.decorator';
import { Role } from 'src/core/authorization/role.enum';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    public service: AuthService,
    public userService: UserService,
    public configService: ConfigService,
    @Inject(CACHE_MANAGER) private cache: any,
  ) {}

  @Public()
  @Post("google/signup")
  async googleSignup(@Body() googleAuthDto: GoogleAuthDto) {
    const email = await this.service.getEmailFromGoogleToken(googleAuthDto);
    const createUserDto: CreateUserDto = {email, signupMethodNum: SIGNUP_METHOD_NUM.GMAIL};
    const result = await this.userService.create(createUserDto);
    return result;
  }

  @Public()
  @Post("google/login")
  async googleLogin(@Body() googleAuthDto: GoogleAuthDto) {
    const email = await this.service.getEmailFromGoogleToken(googleAuthDto);
    const user = await this.userService.findOneWithFilter({email}, true);
    const token = JwtStrategy.signByUser(user, ACCESS_TOKEN_EXPIRE_TIME);
    const refreshToken = await this.service.generateRefreshToken(user);
    return {user, token, refreshToken};
  }

  @Public()
  @Post("token/request")
  async signupRequest(@Body() body: SMSRequest, @Lang() lang: LANGUAGE) {
    const {phone} = body;
    await this.userService.countAndError({phone});
    await this.service.sendCode(this.cache, phone, phone, this.configService, lang);
    return true;
  }

  @Public()
  @Post("forget-password-token/request")
  async forgetPasswordToken(@Body() body: ForgetPasswordRequestDto, @Lang() lang: LANGUAGE) {
    const {email, phone} = body;
    await this.userService.findOneWithFilter({email, phone}, true);
    await this.service.sendCode(this.cache, phone, phone, this.configService, lang);
    return true;
  }

  @Public()
  @Post("signup")
  async signup(@Body() signupDto: SignupDto, @Lang() lang: LANGUAGE) {
    const user = await this.service.signup(signupDto, this.cache, this.userService);
    return user;
  }

  @Public()
  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    const {email, password} = loginDto;
    const user = await this.userService.findOneWithFilter({email}, true);
    await crypt.comparePasswordAndHash(password, user.password);
    const token = JwtStrategy.signByUser(user, ACCESS_TOKEN_EXPIRE_TIME);
    const refreshToken = await this.service.generateRefreshToken(user);
    return {user, token, refreshToken};
  }

  @Public()
  @Post("forget-password")
  async forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
    const {newPassword, code, email} = forgetPasswordDto;
    const user = await this.userService.findOneWithFilter({email}, true);
    await authHelper.checkIfCodeValid(this.cache, user.id, code);
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

  @Post("change-contact")
  async changeContact(@Body() changeContactDto: ChangeContactDto, @ReqUser() user: User) {
    const {phone, code} = changeContactDto;
    await authHelper.checkIfCodeValid(this.cache, phone, code);
    return await this.userService.update(user.id, {phone});
  }

  @Public()
  @Post("refresh-token")
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto, @Lang() lang: LANGUAGE) {
    const {refreshToken} = refreshTokenDto;
    const userId = JwtStrategy.getUserIdFromToken(refreshToken);
    const user = await this.userService.findOne(userId, true);
    const token = await this.service.findOneWithFilter({refreshToken}, false);
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
}
