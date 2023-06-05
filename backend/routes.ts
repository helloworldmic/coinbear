import express from "express";
import { priceRoutes } from "./routers/priceRoutes";
import { userRoutes } from "./routers/userRoutes";
import { transactionRoutes } from "./routers/transactionRoutes";
// import { registerRoutes } from "./routers/registerRoutes";
import { portfolioRoutes } from "./routers/portfolioRoutes"
import { tranxRoutes } from "./routers/tranxRoutes";

// import { isLoggedIn } from "./guards";


export const routes = express.Router();
// routes.use("/register", registerRoutes);
routes.use("/users", userRoutes);
routes.use("/price", priceRoutes);
routes.use("/transaction", transactionRoutes); 
routes.use("/portfolio", portfolioRoutes);
routes.use("/tranx", tranxRoutes);
