import { Request, Response } from "express";
import crypto from "crypto";
import User from "../database/models/userModel";
import Client from "../database/models/clientModel";
import { hashPassword, comparePassword } from "../utils/passwordUtils";
import { createJWT } from "../utils/tokenUtils";

class AuthController {
  //Register
  public async Register(req: Request, res: Response): Promise<void> {
    try {
      const { name, surname, email, phone, password, redirectUrl, client_id } =
        req.body;

      const client = await Client.findOne({ id: client_id });

      if (!client) {
        return res.status(404).json({ error: "Client Not Found" });
      }

      if (client.redirectUrl !== redirectUrl) {
        return res.status(403).json({ error: "Incorrect redirectUrl" });
      }

      // hash password
      const hashedPassword = await hashPassword(password);

      // generate id
      const userID = crypto.randomUUID();

      // generate code
      const code = createJWT({});

      // create a new user in the database
      const newUser = new User({
        id: userID,
        name,
        surname,
        email,
        phone,
        password: hashedPassword,
        code: code,
      });

      // save the User to the database
      await newUser.save();

      // send success response
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  //Login

  //Token

  //Validate Client
}

export default new AuthController();
