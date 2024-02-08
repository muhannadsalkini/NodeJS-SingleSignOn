import { Request, Response, NextFunction } from "express";
import crypto from "crypto";
import Client from "../database/models/clientModel";

class ClientController {
  // register client
  public async Register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { name, redirectUrl } = req.body;

      if (!name) throw new Error("Name is required!");
      if (!redirectUrl) throw new Error("RedirectUrl is required!");

      // generate the secret code
      const byteLength = 32;
      const secretCode = crypto.randomBytes(byteLength).toString("hex");

      // generate id
      const clientID = crypto.randomUUID();

      // create a new client in the database
      const newClient = new Client({
        id: clientID,
        name,
        redirectUrl,
        secret: secretCode,
      });

      // save the client to the database
      await newClient.save();

      // send success response
      res
        .status(201)
        .json({ message: "Client registered successfully", secretCode });
    } catch (error) {
      next(error);
    }
  }
}

export default new ClientController();
