import Prisma from "../database/connection";
import { Request, Response, NextFunction } from "express";

export const roleVerifier = async(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const tokenAmm: string = req.body.tokenAmm;
  const path = req.baseUrl;
  console.log(path)

  if (path == "/admin") {
    if ((await Prisma.admin.findMany({ where: { TokenAmm: tokenAmm } })).length > 0) {
      console.log(await Prisma.admin.findMany({ where: { TokenAmm: tokenAmm } }))
      next();
    }else{
    res.status(405).send(
        "you are not allowed to access the resource if you are not in the staff"
      );
    }
  } else if (path == "/bookings" || path == "/patients") {
    if ((await Prisma.doctors.findMany({ where: { TokenAmm: tokenAmm } })).length > 0 || (await Prisma.secretariats.findMany({ where: { TokenAmm: tokenAmm } })).length >0) {
      next();
    }else{
      res.status(405).send(
          "you are not allowed to access the resource if you are not in the staff"
        );
      }
  }
};