// import { RegisterService } from "../services/registerService";
// import { Request, Response } from "express";

// export class RegisterController {
//   private readonly tag = "RegisterController";

//   constructor(private registerService: RegisterService) {
//     this.registerService = registerService;
//   }
//   registerUser = async (req:Request, resp:Response) => {
//       const {firstName, lastName, username, email, password} = req.body
//       const result = await this.registerService.registerUser(firstName, lastName, username, email, password);
//       return resp.status(200).json({message: result})
//   }
// }
