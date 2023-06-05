import { UserService } from "../services/UserService";
import { Request, Response } from "express";
import jwtSimple from 'jwt-simple';
import jwt from '../utils/jwt';
import { checkPassword } from '../utils/hash';
import fetch from 'node-fetch';


export class UserController {
  private readonly tag = "UserController";

  constructor(private userService: UserService) {
    this.userService = userService;
  }

  login = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        res.status(401).json({ msg: "Wrong Username/Password 1" });
        return;
      }

      const user = (await this.userService.getUser(username));
      //console.log("user : ", user.password)
      //console.log(password)

      if (!user || !(await checkPassword(password, user.password))) {
        res.status(401).json({ msg: "Wrong Username/Password 2" });
        return;
      }

      const payload = {
        id: user.id, // user_id: user.id,
        username: user.username // user_name: user.name,
      };

      //console.log("payload : ", payload)

      const token = jwtSimple.encode(payload, jwt.jwtSecret);
      
      res.json({
        token: token
      });
    } catch (e) {
      console.log(e)
      res.status(500).json({ msg: e.toString() })
    }
    // const { username, password } = req.body;
    // const result = await this.userService.login(username, password);
    // const user = result[0];
    // let queryResult;
    // if (!user) {
    //   return resp.status(401).json({ message: "Invalid username or password." });
    // } else {
    //   if (req.session) {
    //     req.session["user"] = {
    //       id: user.id,
    //       username: user.username,
    //     };
    //   }
    //   console.log("logged in: ", req.session["user"]);
    //   return resp.status(200).json("successfully logged in");
    // }
  };

  logout = async (req: Request, resp: Response) => {
    if (req.session["user"]) {
      delete req.session["user"];
      return resp.status(200).json({ message: "successfully logged out" });
    }
    return resp.status(401).json({ message: "no session found" });
  };
}
// function checkPassword(password: any, password: any) {
//   throw new Error("Function not implemented.");
// }

