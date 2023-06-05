import dotenv from "dotenv";
import express from "express";   // ts-node main.ts
import expressSession from 'express-session';
import cors from 'cors'
import Knex from "knex";

dotenv.config();

// routes
const knexConfig = require("./knexfile");
export const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);

import { routes } from "./routes" //should be knex first, otherwise, route .select will be undefined

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Add headers before the routes are defined

app.use(expressSession({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

//simplified first, as suggested by gordon
// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '/');//'http://localhost:3000'
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

app.use(cors({ origin: [process.env.FRONTEND_URL + ""] })) //change fr 'http://localhost:3000'
// + ""-->helps process.env.FRONTEND_URL change to string 
// test api
app.get("/test", (req, resp) => {
  resp.json({ msg: "goodnight world" });
})
app.use("/api", routes);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`listening to PORT ${PORT}`)
});

// app.get("/get-username", async (req, res) => {
//   console.log('***get username')
//   if (req.session['user']) {
//     res.json({
//       result: true,
//       username: req.session['user'].username,
//       id: req.session['user'].id,
//     });
//   }
//   else { res.json({ result: false }); }
// });

//import pg from 'pg';

// export const client = new pg.Client({
//   database: process.env.DB_NAME,
//   user: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
// });
// client.connect();