import { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } from '../../constant/config';

const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const smsHandler = {
  async sendMessage(from: string, to: string, body: string) {
    to = to.replace(/-/g, "");
    client.messages.create({
      from,
      to,
      body,
    });
    return true;
  },
};

export default smsHandler;
