import { AggregateRoot, UniqueEntityID } from "shared/domain";
import { Guard, Result } from "shared/core";

import { UserEmail } from "./userEmail";
import { UserName } from "./userName";
import { UserPassword } from "./userPassword";
import { JWTToken, RefreshToken } from "./jwt";
import { UserId } from "./userId";

interface UserProps {
  email: UserEmail;
  username: UserName;
  password: UserPassword;
  isDeleted: boolean;
  isAdminUser: boolean;
  accessToken?: JWTToken;
  refreshToken?: RefreshToken;
  lastLogin?: Date;
}

/**
 * User is an Aggregate Root since it's the
 * object that we perform commands against.
 */

export class User extends AggregateRoot<UserProps> {
  get userId(): UserId {
    return UserId.create(this._id).getValue();
  }

  get email(): UserEmail {
    return this.props.email;
  }

  get username(): UserName {
    return this.props.username;
  }

  get password(): UserPassword {
    return this.props.password;
  }

  get isDeleted(): boolean {
    return this.props.isDeleted;
  }

  get isAdminUser(): boolean {
    return this.props.isAdminUser;
  }

  get lastLogin() {
    return this.props.lastLogin;
  }

  get refreshToken() {
    return this.props.refreshToken;
  }

  get accessToken() {
    return this.props.accessToken;
  }

  public isLoggedIn(): boolean {
    return !!this.props.accessToken && !!this.props.refreshToken;
  }

  public setAccessToken(token: JWTToken, refreshToken: RefreshToken): void {
    // todo: domain events
    // this.addDomainEvent(new UserLoggedIn(this));
    this.props.accessToken = token;
    this.props.refreshToken = refreshToken;
    this.props.lastLogin = new Date();
  }

  public delete(): void {
    if (!this.props.isDeleted) {
      // todo: domain events
      // this.addDomainEvent(new UserDeleted(this));
      this.props.isDeleted = true;
    }
  }

  /**
   * Private constructor that disables us from
   * circumventing the creation rules by using
   * the `new` keyword.
   */

  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  /**
   * Static factory method that forces the creation of a
   * user by using User.create(props, id?)
   */

  public static create(props: UserProps, id?: UniqueEntityID): Result<User> {
    // Guard clause that fails if the required properties aren't
    // provided.

    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.username, argumentName: "username" },
      { argument: props.email, argumentName: "email" }
    ]);

    if (!guardResult.succeeded) {
      return Result.fail(guardResult.message!);
    }

    // const isNewUser = !!id;

    const user = new User(
      {
        ...props,
        isDeleted: props.isDeleted ?? false,
        isAdminUser: props.isAdminUser ?? false
      },
      id
    );

    // todo: domain events
    // if (isNewUser) {
    //   user.addDomainEvent(new UserCreated(user));
    // }

    return Result.ok(user);
  }
}
