import express from "express";
import { PriceService } from "../services/PriceService";
import { PriceController } from "../controllers/PriceController";
import { knex } from "../main";


const priceService = new PriceService(knex);
const priceController = new PriceController(priceService);

export const priceRoutes = express.Router();

// should not use POST, should use GET instead
// use params instead body, "/:pair"
priceRoutes.post("/", priceController.getPrice);
priceRoutes.get("/current", priceController.getCurrentPrice);

// POST buy (insert into transactions)
// Steps
// 1. get {pair, executed, side} from req.body
// 2. call API to get the current price
// 3. cal amount, fee
// 4. insert into transactions

// POST autoRules (insert into rules)
// 1. get {limitedPrice} from req.body
// 2. call API to get the current price