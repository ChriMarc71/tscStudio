import { Request, Response } from "express";
import Prisma from "../../database/connection";


const getPatients = async (req: Request, res: Response): Promise<void> => {
  let id: number | undefined = req.body.id;
  let patients;

  if (typeof id !== "undefined") {
    patients = await Prisma.patients.findUnique({
      where: {
        Id: id,
      },
    });
  } else {
    patients = await Prisma.patients.findMany({});
  }

  res.send(patients);
};

export default getPatients;