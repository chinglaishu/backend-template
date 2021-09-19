import { SMTP_USERNAME, TWILIO_PHONE_NUM } from "src/constant/config";
import { MESSAGE_METHOD_NUM } from "src/constant/constant";
import emailHandler from "src/core/email/emailHandler";
import smsHandler from "src/core/sms/smsHandler";

const configHelper = {
  async sendMessage(subject: string, content: string, to: string, messageMethodNum: MESSAGE_METHOD_NUM) {
    return (messageMethodNum === MESSAGE_METHOD_NUM.EMAIL)
      ? emailHandler.sendMail(SMTP_USERNAME, to, subject, content)
      : smsHandler.sendMessage(TWILIO_PHONE_NUM, to, content); 
  },
};

export default configHelper;
