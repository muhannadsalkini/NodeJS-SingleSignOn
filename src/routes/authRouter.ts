import express, { Router, Request, Response } from "express";
import AuthController from "../controllers/authController";

export const authRouter: Router = express.Router();

authRouter.route("/register").post(AuthController.Register);
