import { User, UserEmail, UserName } from "../domain";

export interface IUserRepo {
  exists(username: UserName, email: UserEmail): Promise<boolean>;
  getUserByUserId(userId: string): Promise<User>;
  getUserByUsername(username: UserName | string): Promise<User>;
  save(user: User): Promise<void>;
}
