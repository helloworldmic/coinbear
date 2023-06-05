import express from "express";
import { UserService } from "../services/UserService";
import { UserController } from "../controllers/UserController";
import { knex } from "../main";

export const userService = new UserService(knex);
const userController = new UserController(userService);

export const userRoutes = express.Router();
userRoutes.post("/login", userController.login);
userRoutes.post("/logout", userController.logout)