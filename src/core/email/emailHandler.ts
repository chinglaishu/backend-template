import { SMTP_HOST, SMTP_PASSWORD, SMTP_USERNAME, SMTP_PORT } from "../../constant/config";
import * as nodemailer from "nodemailer";

const emailer = (nodemailer as any).createTransport({
  host: SMTP_HOST, // Office 365 server
  port: SMTP_PORT,     // secure SMTP
  secure: false, // false for TLS - as a boolean not string - but the default is false so just remove this completely
  auth: {
    user: SMTP_USERNAME,
    pass: SMTP_PASSWORD
  },
  tls: {
    ciphers: 'SSLv3'
  }
});

const emailHandler = {
  async sendMail(from: any, to: any, subject: string, html: string, attachments: any[] = []) {
    const mailOptions = {
      from: `INDICAID LAB <${from}>`,
      to,
      subject,
      html,
      attachments,
    };
    emailer.sendMail(mailOptions);
    return true;
  },
};

export default emailHandler;
