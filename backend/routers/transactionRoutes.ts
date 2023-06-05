import express from "express";
import { TransactionService } from "../services/TransactionService";
import { UserService } from "../services/UserService";
import { PriceService } from "../services/PriceService";
import { PortfolioService } from "../services/PortfolioService";
import { TransactionController } from "../controllers/TransactionController";
import { knex } from "../main";
import { isLoggedIn } from "../utils/guards"
const transactionService = new TransactionService(knex);
const userService = new UserService(knex);
const priceService = new PriceService(knex);
const portfolioService = new PortfolioService(knex);
const transactionController = new TransactionController(transactionService, userService, priceService, portfolioService);

export const transactionRoutes = express.Router();
transactionRoutes.post("/transaction", isLoggedIn, transactionController.transaction)


