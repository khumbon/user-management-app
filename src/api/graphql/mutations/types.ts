import { User } from "../types";

export type AddUserInput = Omit<User, "id">;

export type EditUserInput = User;
