import { Request, Response } from "express";
import { makeId } from "../../utils/makeId";
import Prisma from "../../database/connection";

export const postNewDoctor = async (req: Request, res: Response) => {
  await Prisma.doctors.create({
    data: {
      Name: req.body.name,
      Surname: req.body.surname,
      Email: req.body.email,
      Username: req.body.username,
      Password: req.body.password,
      Number: req.body.number,
      TokenAmm: makeId(64),
      IsEnable: true,
    },
  });
  res.send("created");
};

export default postNewDoctor;
