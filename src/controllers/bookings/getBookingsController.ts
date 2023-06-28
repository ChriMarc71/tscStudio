import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getBooking = async (req: Request, res: Response) => {
  let id = req.body.bookingId;
  let bookings;
  if (typeof id != "undefined") {
    bookings = await prisma.bookings.findUnique({
      where: {
        Id: id,
      },
    });
  } else {
    bookings = await prisma.bookings.findMany({});
  }
  res.send(bookings);
};

export default getBooking;