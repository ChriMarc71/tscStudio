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

export default mailTransporter;
