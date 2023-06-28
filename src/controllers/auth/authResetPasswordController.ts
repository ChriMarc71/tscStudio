import { Request, Response } from "express";
import Prisma from "../../database/connection";
import { makeId } from "../../utils/makeId";

const resetPassword = async (req: Request, res: Response): Promise<void> => {
  await Prisma.patients.update({
    where: { Token: req.body.token },
    data: {
      Password: req.body.password,
      Token: makeId(64),
    },
  });
  res.send("Password aggiornata");
};

export default resetPassword;
