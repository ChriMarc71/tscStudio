import { Request, Response } from "express";
import Prisma from "../../database/connection";

const createBooking = async (req: Request, res: Response) => {
  await Prisma.bookings.create({
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
