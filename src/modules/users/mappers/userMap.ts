import { Mapper } from "shared/infra";
import { UniqueEntityID } from "shared/domain";

import { User, UserEmail, UserName, UserPassword } from "../domain";
import { UserDTO } from "../dtos";

export class UserMap implements Mapper<User> {
  public static toDTO(user: User): UserDTO {
    return {
      username: user.username.value,
      // isEmailVerified: user.isEmailVerified,
      isAdminUser: user.isAdminUser,
      isDeleted: user.isDeleted
    };
  }

  public static toDomain(raw: any): User {
    const userNameOrError = UserName.create({ name: raw.username });
    const userEmailOrError = UserEmail.create(raw.email);
    const userPasswordOrError = UserPassword.create({
      value: raw.password,
      hashed: true
    });

    const userOrError = User.create(
      {
        username: userNameOrError.getValue(),
        isAdminUser: raw.isAdminUser,
        isDeleted: raw.isDeleted,
        // isEmailVerified: raw.is_email_verified,
        password: userPasswordOrError.getValue(),
        email: userEmailOrError.getValue()
      },
      new UniqueEntityID(raw.userId)
    );

    !userOrError.isSuccess ? console.log(userOrError.error) : "";

    return userOrError.getValue();
  }

  public static async toPersistence(user: User): Promise<any> {
    let password;
    if (!!user.password) {
      if (user.password.isAlreadyHashed()) {
        password = user.password.value;
      } else {
        password = await user.password.getHashedValue();
      }
    }

    return {
      userId: user.userId.id.toString(),
      email: user.email.value,
      // is_email_verified: user.isEmailVerified,
      username: user.username.value,
      password: password,
      isAdminUser: user.isAdminUser,
      isDeleted: user.isDeleted
    };
  }
}
