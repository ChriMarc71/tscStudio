import { Request, Response } from "express";
import Prisma from "../../database/connection";

const getBooking = async (req: Request, res: Response) => {
  let id = req.body.bookingId;
  let bookings;
  if (typeof id != "undefined") {
    bookings = await Prisma.bookings.findUnique({
      where: {
        Id: id,
      },
    });
  } else {
    bookings = await Prisma.bookings.findMany({});
  }
  res.send(bookings);
};

export default getBooking;
