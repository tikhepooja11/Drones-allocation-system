import express from "express";
import Logging from "../loggers/logging";
import { UserService } from "../services/user";
const router = express.Router();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { tokenVerifiy } from "../middlewares/auth";
export = router;

router.post("/register", async (request, response) => {
  Logging.info("Registering new user");
  const userService = new UserService();
  try {
    const { name, email, password } = request.body;
    if (!(name && email && password)) {
      return response
        .status(400)
        .json({ message: "please provide both email & password" });
    }
    const myFilter: Record<string, unknown> = { email: email };
    const existingUser = await userService.findUser(myFilter);
    if (existingUser) {
      Logging.error("User Already Exist. Please Login");
      return response.status(409).json({ message: "User already exist" });
    }
    const user = await userService.register({
      name,
      email,
      password,
    });
    return response.status(200).json({ user, token: user.token });
  } catch (error) {
    Logging.error(`Error in registering user`);
    return response.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (request, response) => {
  Logging.info(" user login");
  const userService = new UserService();
  try {
    const { email, password } = request.body;
    if (!(email && password)) {
      response.status(400).send("Email and Password required");
    }
    const myFilter: Record<string, unknown> = { email: email };
    const user = await userService.findUser(myFilter);
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user.id, email },
        config.token.TOKEN_KEY,
        {
          expiresIn: "7h",
        }
      );
      user.token = token;
      return response.status(200).json(user);
    } else {
      return response.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    Logging.error(`Error in user login`);
    return response.status(500).json({ message: "Internal server error" });
  }
});

router.get("/listAllUsers", tokenVerifiy, async (request, response) => {
  Logging.info("Listing all users");
  const userService = new UserService();
  try {
    const userList = await userService.listAllUsers();
    if (userList.length > 0) {
      return response.status(200).send(userList);
    } else {
      return response.status(404).send({ message: "Users not found" });
    }
  } catch (error) {
    Logging.error(`Internal server error`);
    return response.status(500).json({ message: "Internal Server Error" });
  }
});
