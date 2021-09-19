import { DEFAULT_LANG } from '../constant/config';
import { CONFIG_TYPE_NUM, LANGUAGE, RECEIVE_METHOD_NUM, REQUEST_METHOD_NUM, ROLE_NUM } from '../constant/constant';
import { Model } from 'mongoose';
import { ConfigService } from 'src/config/config.service';
import { ConfigDocument } from 'src/config/entities/config.entity';
import emailHandler from 'src/core/email/emailHandler';
import smsHandler from 'src/core/sms/smsHandler';
import { sampleEmail, sampleUser, TEST_DEFAULT_EMAIL } from 'src/utils/utilsFunction/sampleData';
import { AuthService } from './auth.service';
import { RequestDto, SignupDto } from './dto/auth.dto';
import authHelper from './helper/helper';
import { UserService } from 'src/user/user.service';
import { UserDocument } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { TokenDocument } from './entity/token.entity';

describe('AuthService', () => {
  let authService: AuthService;
  let configService: ConfigService;
  let userService: UserService;
  let user: Model<UserDocument>;
  let config: Model<ConfigDocument>;
  let token: Model<TokenDocument>;
  let cache: any;

  const lang: LANGUAGE = DEFAULT_LANG;

  const signupDto: SignupDto = {
    email: "test-user",
    password: "password",
    emailOrPhone: TEST_DEFAULT_EMAIL,
    code: "code",
    methodNum: REQUEST_METHOD_NUM.EMAIL,
  };

  const requestDto: RequestDto = {
    emailOrPhone: TEST_DEFAULT_EMAIL,
    methodNum: REQUEST_METHOD_NUM.EMAIL,
  };

  beforeEach(() => {
    authService = new AuthService(token);
    configService = new ConfigService(config);
    userService = new UserService(user);
  });

  describe('Send Code', () => {
    it('set code for user -> get config data -> send email/sms -> return true', async () => {
      const result = true;
    
      jest.spyOn(authHelper, "setCodeForUser").mockImplementation(async () => "code");
      jest.spyOn(configService, "getData").mockImplementation(async () => sampleEmail);
      jest.spyOn(emailHandler, "sendMail").mockImplementation(async () => true);
      jest.spyOn(smsHandler, "sendMessage").mockImplementation(async () => true);

      const {emailOrPhone, methodNum} = requestDto;

      expect(await authService.sendCode(cache, emailOrPhone, configService, CONFIG_TYPE_NUM.SIGNUP, methodNum, lang)).toBe(result);
    });
  });

  describe('Signup', () => {
    it('check if code valid -> create user', async () => {
      jest.spyOn(authHelper, "checkIfCodeValid").mockImplementation(async () => true);
      const createUserSpy = jest.spyOn(userService, "create").mockImplementation(async () => sampleUser);

      const {email, password} = signupDto;

      const createUserDto: CreateUserDto = {
        email,
        password,
        typeNum: ROLE_NUM.USER,
        contactInfo: {
          phone: null,
          email: TEST_DEFAULT_EMAIL,
          receiveMethodNum: RECEIVE_METHOD_NUM.EMAIL,
        },
      };

      expect(await authService.signup(signupDto, cache, userService)).toBe(sampleUser);
      expect(createUserSpy).toBeCalledWith(createUserDto);
    });
  });

});