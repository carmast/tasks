
import  jwt, { JwtPayload } from 'jsonwebtoken';
import {NextFunction, Request , Response } from 'express';

interface CustomRequest extends Request {
  user?: JwtPayload;
}
export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.token as string;;
  if (authHeader) {
    const token = authHeader?.split(" ")[1];
    try {
      jwt.verify(token, process.env.JWT_SEC as string , (err, user) => {
        if (err) {
          res.status(403).json("Token is not valid!");
          return;
        } else {
          req.user  = user as JwtPayload;
          next();
        }
      });
    } catch (err) {
      res.status(500).json("Internal Server Error");
    }
  } else {
    res.status(401).json("You are not authenticated!");
    return;
  }
};

