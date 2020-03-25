import { IUserRepo } from "../userRepo";
import { User, UserEmail, UserName } from "../../domain";
import { UserMap } from "../../mappers";

export class TypeormUserRepo implements IUserRepo {
  private userRepository: any;

  constructor(userRepository: any) {
    this.userRepository = userRepository;
  }

  async exists(username: UserName, email: UserEmail): Promise<boolean> {
    const existingUser = await this.userRepository
      .createQueryBuilder()
      .where("username = :username OR email = :email", {
        username,
        email
      })
      .getOne();

    return !!existingUser;
  }

  async getUserByUsername(userName: UserName): Promise<User> {
    const username =
      userName instanceof UserName ? (<UserName>userName).value : userName;

    const user: User = await this.userRepository.findOne({ username });

    if (!user) throw new Error("User not found");

    return UserMap.toDomain(user);
  }

  async getUserByUserId(userId: string): Promise<User> {
    const user: User = await this.userRepository.findOne({ userId });

    if (!user) throw new Error("User not found");

    return UserMap.toDomain(user);
  }

  async save(user: User): Promise<void> {
    const userExists = this.exists(user.username, user.email);

    if (!!userExists) return;

    const rawTypeormUser = await UserMap.toPersistence(user);
    await this.userRepository.create(rawTypeormUser).save();
  }
}
