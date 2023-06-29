import { Request, Response } from "express";
import Prisma from "../../database/connection";
import jwt from "jsonwebtoken";

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const founded = await Prisma.patients.findMany({
    select: {
      Id: true,
    },
    where: {
      Username: username,
      Password: password,
      IsEnable: true,
    },
  });

  if (founded.length != 0) {
    const token = jwt.sign({ Id: founded[0].Id },"AlgernonAlgernonAlgernonAlgernon",
    {
        expiresIn: "4h",
        algorithm: "HS256",
    }
    );

    res.json({Token: token});

  } else {
    res.send("Credentials invalid or account not enabled, check emails to confirm the account!");
  }
};

export default login;
