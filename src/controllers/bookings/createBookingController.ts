import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createBooking = async (req: Request, res: Response) => {
  await prisma.bookings.create({
    data: {
      StartTime: req.body.startTime,
      EndTime: req.body.endTime,
      PatientUsername: req.body.patient,
      PatientNumber: req.body.number,
      DoctorUsername: req.body.doctorUsername,
    },
  });
};

export default createBooking;