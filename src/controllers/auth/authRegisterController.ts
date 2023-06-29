import Prisma from "../../database/connection";
import { sendConfirmationEmail } from "../../utils/mailTransporter";
import { makeId } from "../../utils/makeId";
import express from "express";
import isVaildEmail from "../../utils/mailValidator";

const app2 = express();
const register = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const email = req.body.email;
  if (!isVaildEmail(email)) {
    res.send("invalid email");
  } else {
    const username = req.body.username;
    const password = req.body.password;
    await Prisma.patients.create({
      data: {
        Email: email,
        Username: username,
        Password: password,
        IsEnable: false,
        Token: makeId(64),
      },
    });

    const randomString: string = makeId(64);
    const subject: string = "CONFIRM EMAIL";
    const text:string ="Click the button or paste the following link in the search bar 'http://localhost:3001/${randomString}'";
    const html:any=`<a href='http://localhost:3001/${randomString}'>Cliccami</a>`;

    sendConfirmationEmail(email,subject,text,html);
    res.send("Registration done, check emails to confirm the account");

    const confirmRegistration = async (_req: express.Request,_res: express.Response): Promise<void> => {
      await Prisma.patients.updateMany({
        where: {
          Email: email,
        },
        data: {
          IsEnable: true,
        },
      });
      _res.send("Registration confirmed");
    };
    app2.get("/" + randomString, confirmRegistration);
  }
};
app2.listen(3001);

export default register;
