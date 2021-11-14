import { PORT } from "../../constant/config";
import { TIMEZONE } from "../../constant/constant";
import {CronJob} from "cron";

const cronHandler = {
  // async setCronJob() {
  //   console.log("set cron");
  //   const a = new CronJob('59 23 * * *', async () => {
  //   }, null, true, TIMEZONE);
  //   a.start();
  // },
};

export default cronHandler;
