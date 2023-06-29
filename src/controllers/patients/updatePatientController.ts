import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const updatePatients = async (req: Request,res: Response): Promise<void> => {
  const id: number = req.body.id;
  const toChange: string = req.body.toChange;
  const data: string = req.body.data;

  if (typeof id === "undefined" ||typeof toChange === "undefined" ||typeof data === "undefined") {
    res.status(400).send("undefined field/s!");
    return;
  }

  prisma.patients.update({
    where: {
      Id: id,
    },
    data: "{" + toChange + ":" + data + "}",
  });

  res.send("Updated");
};

export default updatePatients;