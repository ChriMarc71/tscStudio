import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

function isValidJwt(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers.authorization;
  if (!token) {
    res.status(403).send("TokenJWT not valid, try to login.");
    return;
  }

  jwt.verify(
    token,
    "AlgernonAlgernonAlgernonAlgernon",
    { algorithms: ["HS256"] },
    function (err, decoded) {
      if (err) {
        res.status(403).send(err.message);
        return;
      }
    }
  );

  next();
}

export default isValidJwt;