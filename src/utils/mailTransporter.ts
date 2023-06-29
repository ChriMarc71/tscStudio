import nodemailer, { Transporter } from "nodemailer";

const mailTransporter: Transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: "provaProgettoCGM@outlook.it",
    pass: "CiaoCiao99",
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
      from: "provaProgettoCGM@outlook.it",
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
