import { Either, left, Result, right } from "shared/core/Result";
import { AppError, UseCase } from "shared/core";

import { IEmployerRepo } from "../../../repos/employerRepo";
import { IUserRepo } from "../../../../users/repos/userRepo";
import { User } from "../../../../users/domain";
import { Employer } from "../../../domain";
import { CreateEmployerErrors } from "./CreateEmployerErrors";
import { CreateEmployerDTO } from "./CreateEmployerDTO";

type Response = Either<
  | CreateEmployerErrors.EmployerAlreadyExistsError
  | CreateEmployerErrors.UserDoesntExistError
  | AppError.UnexpectedError
  | Result<any>,
  Result<void>
>;

export class CreateEmployerUseCase
  implements UseCase<CreateEmployerDTO, Promise<Response>> {
  private employerRepo: IEmployerRepo;
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo, employerRepo: IEmployerRepo) {
    this.userRepo = userRepo;
    this.employerRepo = employerRepo;
  }

  public async execute(request: CreateEmployerDTO): Promise<Response> {
    let user: User;
    let employer: Employer;
    const { userId } = request;

    try {
      try {
        user = await this.userRepo.getUserByUserId(userId);
      } catch (err) {
        return left(new CreateEmployerErrors.UserDoesntExistError(userId));
      }

      try {
        employer = await this.employerRepo.getEmployerByUserId(userId);
        const employerExists = !!employer;

        if (employerExists) {
          return left(
            new CreateEmployerErrors.EmployerAlreadyExistsError(userId)
          );
        }
      } catch (err) {}

      // Employer doesn't exist already (good), so we want to create it
      const employerOrError = Employer.create({
        userId: user.userId,
        username: user.username
      });

      if (!employerOrError.isSuccess) {
        return left(employerOrError);
      }

      employer = employerOrError.getValue();

      await this.employerRepo.save(employer);

      return right(Result.ok());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
