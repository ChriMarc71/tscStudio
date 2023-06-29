import { Request, Response } from "express";
import Prisma from "../../database/connection";

import { sendEmail } from "../../utils/mailTransporter";

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

 
  const subject: string = "RESET PASSWORD";
  const text:string ="Copy and paste the following token in the recovery form :\n\n"+resetToken[0].Token;
  let html:any;

  sendEmail(email,subject,text,html);
  res.send("Email for password recovery sent!");
    
}

export default forgottenPassword;
