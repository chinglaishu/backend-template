import { PORT, SEND_SUBSCRIBE_EMAIL_LIST } from "../../constant/config";
import { TIMEZONE } from "../../constant/constant";
import {CronJob} from "cron";
import * as moment from "moment-timezone";
import utilsFunction from "src/utils/utilsFunction/utilsFunction";

const baseUrl = `http://localhost:${PORT}/api`;

const cronHandler = {
  async setCronJob() {
    console.log("set cron");
    const a = new CronJob('59 23 * * *', async () => {
      let currentTimeString = moment().toISOString();
      console.log(`[${currentTimeString}] Start Function: [Send Subscribe Email]`);
      const result = await this.sendSubscribeEmail();
      console.log("result");
      console.log(result);
      currentTimeString = moment().toISOString();
      console.log(`[${currentTimeString}] End Function: [Send Subscribe Email]`)
    }, null, true, TIMEZONE);
    a.start();
  },
  async sendSubscribeEmail() {
    const url = `${baseUrl}/subscribe-email/send-email`;
    const result = await utilsFunction.makeRequest(url);
    return result;
  },
};

export default cronHandler;
