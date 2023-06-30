import Prisma from "../database/connection";
import { Request, Response, NextFunction } from "express";

export const roleVerifier = async (req: Request,res: Response,next: NextFunction): Promise<void> => {
  const tokenAmm: string = req.body.tokenAmm;
  const url = req.baseUrl;
  
  

  if (url == "/booking" || url == "/patients") {
    if (Prisma.doctors.findUnique({where: { TokenAmm: tokenAmm } }) != null) 
    {
      console.log(await Prisma.doctors.findUnique({ where: { TokenAmm: tokenAmm } }))
      next();
    }
    else
    {
      res.status(405).send("you are not allowed to access the resource if you are not in the staff");
    }



/*
  if (url == "/admin") {
    if (Prisma.admin.findMany({ where: { TokenAmm: tokenAmm } }) != null) {
      next();
    }else{
    res.status(405).send(
        "you are not allowed to access the resource if you are not in the staff"
      );
    }
  } else if (url == "/booking" || url == "/patients") {
    if (Prisma.doctors.findMany({ where: { TokenAmm: tokenAmm } }) != null) {
      next();
    }else{
    res.status(405).send(
        "you are not allowed to access the resource if you are not in the staff"
      );
    }
    if (Prisma.secretariats.findMany({ where: { TokenAmm: tokenAmm } }) != null) {
      next();
    }else{
    res.status(405).send(
        "you are not allowed to access the resource if you are not in the staff"
      );
    }
  }*/
}};