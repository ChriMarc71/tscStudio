import Prisma from "../database/connection";
import { Request, Response, NextFunction } from "express";

export const roleVerifier = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const tokenAmm: string = req.body.tokenAmm;
  const path = req.path;

  if (path == "/admin") {
    if (Prisma.admin.findMany({ where: { TokenAmm: tokenAmm } }) != null) {
      next();
    }
  } else if (path == "/booking" || path == "/patients") {
    if (Prisma.doctors.findMany({ where: { TokenAmm: tokenAmm } }) != null) {
      next();
    }
    if (Prisma.secretariats.findMany({ where: { TokenAmm: tokenAmm } }) != null) {
      next();
    }
  }
  res.status(405).send(
      "you are not allowed to access the resource if you are not in the staff"
    );
};