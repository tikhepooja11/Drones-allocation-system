import { RegisterUser } from "../libs/service-types/user";
import { IUser } from "../models/user";
import { UserRepository } from "../repository/user-repository";

// Business logic
export class UserService {
  private repository: UserRepository;
  constructor() {
    this.repository = new UserRepository();
  }

  register = async (registerObj: RegisterUser): Promise<IUser> => {
    console.log("inside registerUser() method");
    const user = await this.repository.register(registerObj);
    return user;
  };

  listAllUsers = async (): Promise<IUser[]> => {
    const userList = await this.repository.listAllUsers();
    return userList;
  };

  findUser = async (filterInput: Record<string, unknown>): Promise<IUser> => {
    console.log("inside findUser service", filterInput);
    const userList = await this.repository.findUser(filterInput);
    return userList;
  };
}
