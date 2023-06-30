import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getPatients = async (req: Request, res: Response): Promise<void> => {
  let id: number | undefined = req.body.id;
  let patients;console.log(4)

  if (typeof id !== "undefined") {
    patients = await prisma.patients.findUnique({
      where: {
        Id: id,
      },
    });
  } else {
    patients = await prisma.patients.findMany({});
  }

  res.send(patients);
};

export default getPatients;