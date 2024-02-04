import express, { Router, Request, Response } from "express";
import ClientController from "../controllers/clientController";

export const clientRouter: Router = express.Router();

clientRouter.route("/register").post(ClientController.Register);
