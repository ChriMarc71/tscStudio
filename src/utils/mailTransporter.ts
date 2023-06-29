import nodemailer, { Transporter } from "nodemailer";
import dotenv from 'dotenv';

dotenv.config();
const user = process.env.USER;
const pass = process.env.PASS;

const mailTransporter: Transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: user,
    pass: pass,
  },
  tls: { rejectUnauthorized: false },
});

export async function sendEmail(
  email: string,
  subject: string,
  text: string,
  html:any
): Promise<void> {
  mailTransporter.sendMail(
    {
      from: user,
      to: email,
      subject: subject,
      text: text,
      html: html,
    },
    function (error: any) {
      if (error) {
        console.log(error);
      }
    }
  );
}

export default { mailTransporter, sendEmail };
