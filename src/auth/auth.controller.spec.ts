import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from "../user/user.service";
import { ConfigService } from "../config/config.service";
import { ForgetPasswordRequestDto, LoginDto, RequestDto, SignupDto, ForgetPasswordDto, ResetPasswordDto, ChangeContactDto } from './dto/auth.dto';
import { ACCESS_TOKEN_EXPIRE_TIME, DEFAULT_LANG } from '../constant/config';
import { User, UserDocument } from '../user/entities/user.entity';
import { Model } from 'mongoose';
import { ConfigDocument } from 'src/config/entities/config.entity';
import { sampleEmailAndSMSData, sampleUser, TEST_DEFAULT_EMAIL, TEST_REFRESH_TOKEN } from 'src/utils/utilsFunction/sampleData';
import bookingHelper from "../booking/helper/helper";
import { CONFIG_TYPE_NUM, REQUEST_METHOD_NUM } from '../constant/constant';
import JwtStrategy from 'src/core/authentication/jwt.strategy';
import crypt from 'src/utils/utilsFunction/crypt';
import authHelper from './helper/helper';
import { TokenDocument } from './entity/token.entity';
import { NotificationDocument } from 'src/notification/entities/notification.entity';
import { NotificationService } from 'src/notification/notification.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let userService: UserService;
  let notificationService: NotificationService;
  let userModel: Model<UserDocument>;
  let configModel: Model<ConfigDocument>;
  let tokenModel: Model<TokenDocument>;
  let notificationModel: Model<NotificationDocument>;
  let configService: ConfigService;
  let cache: any = null;

  const requestDto: RequestDto = {
    emailOrPhone: TEST_DEFAULT_EMAIL,
    methodNum: REQUEST_METHOD_NUM.EMAIL,
  };

  const forgetPasswordRequestDto: ForgetPasswordRequestDto = {
    email: "test-user",
  };

  const lang = DEFAULT_LANG;

  const signupDto: SignupDto = {
    email: "test-user",
    password: "password",
    emailOrPhone: TEST_DEFAULT_EMAIL,
    code: "code",
    methodNum: REQUEST_METHOD_NUM.EMAIL,
  };

  const loginDto: LoginDto = {
    email: "test-user",
    password: "password",
  };

  const forgetPasswordDto: ForgetPasswordDto = {
    email: "test-user",
    newPassword: "new-password",
    code: "code",
  };

  const resetPasswordDto: ResetPasswordDto = {
    oldPassword: "password",
    newPassword: "new-password",
  };

  const changeContactDto: ChangeContactDto = {
    emailOrPhone: TEST_DEFAULT_EMAIL,
    methodNum: REQUEST_METHOD_NUM.EMAIL,
    code: "code",
  };

  beforeEach(() => {
    authService = new AuthService(tokenModel);
    userService = new UserService(userModel);
    configService = new ConfigService(configModel);
    notificationService = new NotificationService(notificationModel);
    authController = new AuthController(authService, userService, configService, notificationService, cache);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('Request Signup Token', () => {
    it('should send code and return true', async () => {
      const result = true;
      const sendCodeSpy = jest.spyOn(authService, "sendCode").mockResolvedValueOnce(true);
      jest.spyOn(userService, "checkIfEmailOrPhoneCanUse").mockImplementation(async () => true);

      const {emailOrPhone, methodNum} = requestDto;

      expect(await authController.signupRequest(requestDto, lang)).toBe(result);
      expect(sendCodeSpy).toBeCalledWith(cache, emailOrPhone, configService, CONFIG_TYPE_NUM.SIGNUP, methodNum, lang);
    });
  });

  describe('Request Forget Password Token', () => {
    it('should send code and return true', async () => {
      const result = {emailOrPhone: TEST_DEFAULT_EMAIL, methodNum: 0};
      const sendCodeSpy = jest.spyOn(authService, "sendCode").mockImplementation(async () => true);
      jest.spyOn(userService, "findUserByEmail").mockImplementation(async () => sampleUser);

      const methodNum = REQUEST_METHOD_NUM.EMAIL;

      expect(await authController.forgetPasswordToken(forgetPasswordRequestDto, lang)).toStrictEqual(result);
      expect(sendCodeSpy).toBeCalledWith(cache, sampleUser.id, configService, CONFIG_TYPE_NUM.SIGNUP, methodNum, lang, TEST_DEFAULT_EMAIL);
    });
  });

  describe('Request Change Contact Token', () => {
    it('should send code and return true', async () => {
      const result = true;
      const sendCodeSpy = jest.spyOn(authService, "sendCode").mockImplementation(async () => result);
      jest.spyOn(userService, "checkIfEmailOrPhoneCanUse").mockImplementation(async () => true);

      const {emailOrPhone, methodNum} = requestDto;

      expect(await authController.changeSettingToken(requestDto, sampleUser, lang)).toBe(result);
      expect(sendCodeSpy).toBeCalledWith(cache, emailOrPhone, configService, CONFIG_TYPE_NUM.SIGNUP, methodNum, lang);
    });
  });

  describe('Request Email', () => {
    it('should send email to email/sms -> return true', async () => {
      const sendSpy = jest.spyOn(bookingHelper, "sendEmailOrSMSToUser").mockImplementation(async () => true);
      jest.spyOn(userService, "findOneWithFilter").mockImplementation(async () => sampleUser);
      jest.spyOn(configService, "getEmailAndSMSData").mockImplementation(async () => sampleEmailAndSMSData);

      expect(await authController.requestEmail(requestDto, lang)).toBe(sampleUser);
    });
  });

  describe('Signup', () => {
    it('signup success -> send email -> return user', async () => {
      jest.spyOn(bookingHelper, "sendEmailOrSMSToUser").mockImplementation(async () => true);
      jest.spyOn(authService, "signup").mockImplementation(async () => sampleUser);
      jest.spyOn(configService, "getEmailAndSMSData").mockImplementation(async () => sampleEmailAndSMSData);

      expect(await authController.signup(signupDto, lang)).toBe(sampleUser);
    });
  });

  describe('Login', () => {
    it('login success -> return user and token', async () => {
      jest.spyOn(crypt, "comparePasswordAndHash").mockImplementation(async () => true);
      jest.spyOn(userService, "findUserByEmail").mockImplementation(async () => sampleUser);
      jest.spyOn(authService, "generateRefreshToken").mockImplementation(async () => TEST_REFRESH_TOKEN)

      const token = JwtStrategy.signByUser(sampleUser, ACCESS_TOKEN_EXPIRE_TIME);
      const refreshToken = await authService.generateRefreshToken(sampleUser);
      expect(await authController.login(loginDto)).toStrictEqual({user: sampleUser, token, refreshToken});
    });
  });

  describe('Forget Password', () => {
    it('find user by email -> check code -> hash password -> update password', async () => {
      jest.spyOn(userService, "findUserByEmail").mockImplementation(async () => sampleUser);
      jest.spyOn(authHelper, "checkIfCodeValid").mockImplementation(async () => true);
      jest.spyOn(crypt, "hashPassword").mockImplementation(async () => "hash-password");
      jest.spyOn(userService, "updatePassword").mockImplementation(async () => sampleUser);

      // const token = JwtStrategy.signByUser(sampleUser, ACCESS_TOKEN_EXPIRE_TIME);
      expect(await authController.forgetPassword(forgetPasswordDto)).toBe(true);
    });
  });

  describe('Reset Password', () => {
    it('compare oldPassword and current password -> hash new password -> update user', async () => {
      jest.spyOn(crypt, "comparePasswordAndHash").mockImplementation(async () => true);
      jest.spyOn(crypt, "hashPassword").mockImplementation(async () => "hash-password");
      jest.spyOn(userService, "updatePassword").mockImplementation(async () => sampleUser);

      expect(await authController.resetPassword(resetPasswordDto, sampleUser)).toBe(true);
    });
  });

  describe('Change Contact', () => {
    it('check Code -> update contact', async () => {
      jest.spyOn(authHelper, "checkIfCodeValid").mockImplementation(async () => true);
      jest.spyOn(userService, "updateContact").mockImplementation(async () => sampleUser);

      expect(await authController.changeContact(changeContactDto, sampleUser)).toStrictEqual(sampleUser);
    });
  });
});