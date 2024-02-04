import express, { Request, Response } from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import database from "./database";
import bodyParser from "body-parser";
import { router } from "./routes/index";

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
database.connect();
app.use(bodyParser.json());

app.use(router);
app.get("/test", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
