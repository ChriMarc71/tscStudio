import { Request, Response } from "express";
import Prisma from "../../database/connection";

const getDoctors = async (req: Request, res: Response) => {
  let id = req.body.doctorId;
  let doctors;
  if (typeof id != "undefined") {
    doctors = await Prisma.doctors.findUnique({
      where: {
        Id: id,
      },
    });
  } else {
    doctors = await Prisma.doctors.findMany({});
  }
  res.send(doctors);
};

export default getDoctors;
