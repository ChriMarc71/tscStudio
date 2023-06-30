import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
function isValidJwt(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers.authorization;
  const secretKey = String(process.env.SECRET_KEY_JWT)
  if (!token) {
    res.status(403).send("TokenJWT not valid, try to login.");
    return;
  }

  jwt.verify(
    token,
    secretKey,
    { algorithms: ["HS256"] },
    function (err:any, decoded:any) {
      if (err) {
        res.status(403).send(err.message);
      }
    }
  );
  next();
}

export default isValidJwt;