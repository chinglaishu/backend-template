import { SMTP_HOST, SMTP_PASSWORD, SMTP_USERNAME, SMTP_PORT, SMTP_HOST_SUB, SMTP_PORT_SUB, SMTP_USERNAME_SUB, SMTP_PASSWORD_SUB } from "../../constant/config";
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

const subEmailer = (nodemailer as any).createTransport({
  host: SMTP_HOST_SUB, // Office 365 server
  port: SMTP_PORT_SUB,     // secure SMTP
  secure: false, // false for TLS - as a boolean not string - but the default is false so just remove this completely
  auth: {
    user: SMTP_USERNAME_SUB,
    pass: SMTP_PASSWORD_SUB
  },
  tls: {
    ciphers: 'SSLv3'
  }
});

const emailHandler = {
  async sendSubscriptionEmail(email: string, subject: string, html: string) {
    const result = await this.sendSubEmail(SMTP_USERNAME_SUB, email, subject, html);
    return result;
  },
  async sendSubEmail(from: any, to: any, subject: string, html: string, attachments: any[] = []) {
    const mailOptions = {
      from: `INDICAID LAB <${from}>`,
      to,
      subject,
      html,
      attachments,
    };
    await subEmailer.sendMail(mailOptions);
    return true;
  },
  async sendMail(from: any, to: any, subject: string, html: string, attachments: any[] = []) {
    const mailOptions = {
      from: `INDICAID LAB <${from}>`,
      to,
      subject,
      html,
      attachments,
    };

    // test not wait the result ---------
    emailer.sendMail(mailOptions);
    return true;
    // -----------------------------------

    // await emailer.sendMail(mailOptions);
    // return true;
  },
};

export default emailHandler;
