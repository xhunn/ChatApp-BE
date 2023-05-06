import { Request, Response, } from "express";
import * as jwt from "jsonwebtoken";

const createToken = (user: any) => {

  const payload = {
    id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
    avatar: user.avatar,
    isOnline: user.isOnline,
    contacts: user.contacts,
  }

  return jwt.sign(payload, process.env.TOKEN_SECRET!!);
}

const verify = (req: Request, res: Response, next: any) => {
  
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(403).json({ message: "No token provided" });

  return jwt.verify(token, process.env.TOKEN_SECRET!!, (err: any, decoded: any) => {

    if (err) return res.status(401).json({ message: "Unauthorized!" });
    else next();

  });
  
}

const decode = (token: string): {
  message: string,
  status: number,
  data?: any,
} | any => {

  if (token) {

    token = token.split(" ")[1];
    return jwt.verify(token, process.env.TOKEN_SECRET!!, (err: any, payload: any) => {

      if (err) return {
        message: "Unauthorized!",
        status: 401,
      };
      
      else return {
        message: "Token verified",
        status: 200,
        data: payload
      }

    });

  } else return {

    message: "No token provided",
    status: 403,

  };

}

export { createToken, verify, decode };