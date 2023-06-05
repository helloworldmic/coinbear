import express from "express";
import { PortfolioService } from "../services/PortfolioService"
import { PortfolioController } from "../controllers/PortfolioController";
import { PriceService } from "../services/PriceService";
import { knex } from "../main";
import { isLoggedIn } from "../utils/guards"

const portfolioService = new PortfolioService(knex);
const priceService = new PriceService(knex);
const portfolioController = new PortfolioController(portfolioService, priceService);

export const portfolioRoutes = express.Router();
portfolioRoutes.get("/userPortfolio", isLoggedIn, portfolioController.viewPortfolio);