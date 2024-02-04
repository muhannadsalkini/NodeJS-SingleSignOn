import express, { Application } from "express";
import * as auth from "./authRouter";
import * as client from "./clientRouter";

export const router = express.Router();

router.use("/api/auth", auth.authRouter);
router.use("/api/client", client.clientRouter);
