import { Bearer } from "permit";
import jwtSimple from "jwt-simple";
import express from "express";
import jwt from "./jwt";
// import { UserService } from "../services/UserService";
import { userService } from "../routers/userRoutes";
import { User } from "../services/models";

const permit = new Bearer({
  query: "access_token",
});

export async function isLoggedIn(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const token = permit.check(req);

    //console.log('token--->', token);

    if (!token) {
      return res.status(401).json({ msg: "Permission Denied" });
    }

    const payload = jwtSimple.decode(token, jwt.jwtSecret);
    console.log('payload.id--->', payload.id)
    // Querying Database is not compulsory
    const user: User = await userService.getUserById(payload.id); // payload.id = user.id

    console.log('user in guard.ts--->', user)

    if (user) {
      req.user = user;
      return next();
    } else {
      return res.status(401).json({ msg: "Permission Denied" });
    }
  } catch (e) {
    return res.status(401).json({ msg: "Permission Denied" });
  }
}

//wsp version
// import {Request,Response,NextFunction} from 'express';

// export function isLoggedIn(req:Request,res:Response,next:NextFunction){
//     if(req.session?.['user']){
//         next();
//     }else{
//         console.log('fail to pass isLoggedIn')
//         res.redirect('/')
//     }
// }
