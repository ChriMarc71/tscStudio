import { Request, Response } from "express";
import Prisma from "../../database/connection";
import mailTransporter from "../../utils/mailTransporter";

async function forgottenPassword(req: Request, res: Response) {
  const email: string = req.body.email;
  const resetToken = await Prisma.patients.findMany({
    select: {
      Token: true,
    },
    where: {
      Email: email,
    },
  });

  res.send("Email for password recovery sent!");

  mailTransporter.sendMail(
    {
      from: "provaProgettoCGM@outlook.it", // sender address
      to: email, // list of receivers
      subject: "RESET PASSWORD",
      text:
        "Copy and paste the following token in the recovery form :\n\n" +
        resetToken[0].Token,
    },
    function (error: any) {
      if (error) {
        console.log(error);
      }
    }
  );
}

export default forgottenPassword;
