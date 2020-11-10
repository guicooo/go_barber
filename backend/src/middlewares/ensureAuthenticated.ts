import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import auth from "../config/auth";

export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void {

  //Validação do token
  const authHeader = request.headers.authorization;

  if(!authHeader) {
    throw Error('JWT token is missing');
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, auth.jwt.subject);

    console.log(decoded);

    return next();

  } catch {
    throw new Error('Invalid  JWT token')
  }

}
767
