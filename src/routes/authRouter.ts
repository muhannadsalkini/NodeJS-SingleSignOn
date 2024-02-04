import express, { Router, Request, Response } from "express";
import AuthController from "../controllers/authController";

export const authRouter: Router = express.Router();

authRouter.route("/register").post(AuthController.Register);
authRouter.route("/login").post(AuthController.Login);
authRouter.route("/token").post(AuthController.Token);
authRouter.route("/validate").post(AuthController.Validate);
