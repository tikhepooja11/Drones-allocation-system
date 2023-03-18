import Logging from "../loggers/logging";
import { RegisterUser } from "../libs/service-types/user";
import UserModel, { IUser } from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

//Dealing with data base operations
export class UserRepository {
  register = async (registerObj: RegisterUser): Promise<IUser> => {
    Logging.info("inside reposiroty");
    const { name, email, password } = registerObj;
    console.log(name);
    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({
      name,
      email,
      password: encryptedPassword,
    });

    // Create Token
    const token = jwt.sign(
      { user_id: user._id, email },
      config.token.TOKEN_KEY,
      {
        expiresIn: "3h",
      }
    );
    user.token = token;
    const savedUser = await user.save();
    console.log("inside repository", savedUser);
    return savedUser;
  };

  listAllUsers = async (): Promise<IUser[]> => {
    const result = await UserModel.find();
    return result;
  };

  findUser = async (filterInput: Record<string, unknown>): Promise<IUser> => {
    console.log("inside findUser repository", filterInput);
    const result = await UserModel.findOne(filterInput);
    return result as IUser;
  };
}
