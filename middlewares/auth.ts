import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { config } from "../config/config";

export const tokenVerifiy = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = <string>req.headers["authorization"];
  if (!token) {
    res.status(401).send({ message: "Token not provided" });
  }
  token = token.replace("Bearer ", "");
  console.log(token);
  let jwtPayload;
  try {
    jwtPayload = <any>jwt.verify(token, config.token.TOKEN_KEY);
    res.locals.jwtPayload = jwtPayload;
    console.log(jwtPayload);
  } catch (error) {
    res.status(401).send({ message: "Not Authorised...! Invalid Token" });
    return;
  }
  //Call the next middleware or controller
  next();
};

module.exports;
