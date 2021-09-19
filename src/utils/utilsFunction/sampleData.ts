import { DOCUMENT_TYPE_NUM, ROLE_NUM, SEX_NUM } from "../../constant/constant";
import { DEFAULT_LANG } from "../../constant/config";
import { User } from "src/user/entities/user.entity";
import { EmailAndSMSData, EmailOrSMSData } from "../base/base.entity";

export const TEST_DEFAULT_EMAIL = "email";
export const TEST_DEFAULT_PHONE = "phone";

export const TEST_ACCESS_TOKEN = "access-token";
export const TEST_REFRESH_TOKEN = "refresh-token";

export const sampleUser: User | any = {
  id: "user-id",
  email: "test-user",
  password: "password",
  typeNum: ROLE_NUM.USER,
  profileImageUrl: "img",
  personalInfo: {
    name: {
      en: "name en",
      zh: "name zh",
    },
    sex: SEX_NUM.MALE,
    dateOfBirth: new Date(),
    documentType: DOCUMENT_TYPE_NUM.HKID,
    documentNumber: "Y123456(7)",
    address: "address",
  },
  contactInfo: {
    email: TEST_DEFAULT_EMAIL,
    phone: TEST_DEFAULT_PHONE,
    receiveMethodNum: 0,
  },
  language: DEFAULT_LANG,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const sampleEmail: EmailOrSMSData | any = {
  subject: "email subject",
  content: "email content",
  replace: "email replace",
};

export const sampleSMS: EmailOrSMSData | any = {
  subject: "sms subject",
  content: "sms content",
  replace: "sms replace",
};

export const sampleEmailAndSMSData: EmailAndSMSData | any = {
  emailData: sampleEmail,
  smsData: sampleSMS,
};
