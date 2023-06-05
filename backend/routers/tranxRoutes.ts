import express from "express";
import { TranxService } from "../services/TranxService";
import { TranxController } from "../controllers/TranxController"; 
import { knex } from "../main";
import { isLoggedIn } from "../utils/guards"

const tranxService = new TranxService(knex);
const tranxController = new TranxController(tranxService);

export const tranxRoutes = express.Router();
tranxRoutes.post("/upload", isLoggedIn, tranxController.upload);
tranxRoutes.get("/get_tranx", isLoggedIn, tranxController.getTranx)


