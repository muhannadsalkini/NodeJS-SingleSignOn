import { Request, Response, NextFunction } from "express";
import crypto from "crypto";
import User from "../database/models/userModel";
import Client from "../database/models/clientModel";
import moment from "moment";
import { hashPassword, comparePassword } from "../utils/passwordUtils";
import { createJWT, verifyJWT } from "../utils/tokenUtils";

const isExpired = (date: Date): boolean => {
  return moment().isSameOrAfter(date);
};
class AuthController {
  //Register
  public async Register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const {
        name,
        surname,
        email,
        phone,
        password,
        redirectUrl,
        client_id,
        state,
      } = req.body;

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
      });

      newUser.code.token = code;
      newUser.code.takenAt = new Date();
      newUser.code.expireAt = moment().add(31, "days").toDate();

      // save the User to the database
      await newUser.save();

      // Generate redirect url
      const url: string = redirectUrl + `?state=${state}&code=${code}`;

      // send success response
      res
        .status(200)
        .json({ message: "User registered successfully", url, state });
    } catch (error) {
      next(error);
    }
  }

  //Login
  public async Login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, password, redirectUrl, client_id, state } = req.body;

      const client = await Client.findOne({ id: client_id });

      if (!client) {
        return res.status(404).json({ error: "Client Not Found" });
      }

      if (client.redirectUrl !== redirectUrl) {
        return res.status(403).json({ error: "Incorrect redirectUrl" });
      }

      // Check user
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ error: "User Not Found" });
      }

      // check the password
      const compare = await comparePassword(password, user.password);
      if (!compare) {
        return res
          .status(401)
          .json({ error: "Email or password is incorect!" });
      }

      // generate code
      const code = createJWT({});

      // save the code
      user.code.token = code;
      user.code.takenAt = new Date();
      user.code.expireAt = moment().add(31, "days").toDate();

      // Save User
      await user.save();

      // Generate redirect url
      const url: string = redirectUrl + `?state=${state}&code=${code}`;

      // send success response
      res
        .status(200)
        .json({ message: "User loged In successfully", url, state });
    } catch (error) {
      next(error);
    }
  }

  //Token
  public async Token(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { code, client_id, secret } = req.body;

      const client = await Client.findOne({ id: client_id });

      if (!client) {
        return res.status(404).json({ error: "Client Not Found" });
      }

      if (client.secret !== secret) {
        return res.status(403).json({ error: "Incorrect Secret" });
      }

      // Check code
      let user = await User.findOne({ "code.token": code });
      if (!user) {
        return res.status(404).json({ error: "User Not Found" });
      }

      if (!user.code) {
        return res.status(403).json({ error: "not allowed to access" });
      }

      if (isExpired(user.code.expireAt)) {
        // Code expired
        return res.status(401).json({ error: "unauthorized user" });
      }

      const token = createJWT({
        _id: user._id,
        id: user.id,
        client_id,
        email: user.email,
      });

      // send success response
      res.status(200).json({ message: "User token", token });
    } catch (error) {
      next(error);
    }
  }

  //Validate Client
  public async Validate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { redirectUrl, client_id } = req.query;

      const client = await Client.findOne({ id: client_id });

      if (!client) {
        return res.status(404).json({ error: "Client Not Found" });
      }

      if (client.redirectUrl !== redirectUrl) {
        console.log(client.redirectUrl, redirectUrl);
        return res.status(401).json({ error: "redirectUrl is incorrect!" });
      }

      // send success response
      res.status(200).json({ message: "Client verification is done" });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
