import { Either, left, Result, right } from "shared/core/Result";
import { AppError, UseCase } from "shared/core";

import { User, UserEmail, UserName, UserPassword } from "../../domain";
import { CreateUserErrors } from "./CreateUserErrors";
import { CreateUserDTO } from "./CreateUserDTO";
import { IUserRepo } from "../../repos/userRepo";

type Response = Either<
  | CreateUserErrors.EmailOrUsernameAlreadyExistsError
  | AppError.UnexpectedError
  | Result<any>,
  Result<void>
>;

export class CreateUserUseCase
  implements UseCase<CreateUserDTO, Promise<Response>> {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  async execute(request: CreateUserDTO): Promise<Response> {
    const emailOrError = UserEmail.create(request.email);
    const passwordOrError = UserPassword.create({ value: request.password });
    const usernameOrError = UserName.create({ name: request.username });

    const dtoResult = Result.combine([
      emailOrError,
      passwordOrError,
      usernameOrError
    ]);

    if (!dtoResult.isSuccess) {
      // todo: fix types inside Result.fail - should return string as error? ...
      return left(Result.fail(dtoResult.error as string));
    }

    const email = emailOrError.getValue();
    const password = passwordOrError.getValue();
    const username = usernameOrError.getValue();

    try {
      const userAlreadyExists = await this.userRepo.exists(username, email);

      if (userAlreadyExists) {
        return left(
          new CreateUserErrors.EmailOrUsernameAlreadyExistsError(
            email.value,
            username.value
          )
        );
      }

      const userOrError = User.create({
        email,
        password,
        username,
        isAdminUser: false,
        isDeleted: false
      });

      if (!userOrError.isSuccess) {
        return left(Result.fail(userOrError.error!.toString()));
      }

      const user: User = userOrError.getValue();

      await this.userRepo.save(user);

      return right(Result.ok());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
