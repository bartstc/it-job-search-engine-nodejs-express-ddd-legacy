import { Result, UseCaseError } from "shared/core";

export namespace CreateEmployerErrors {
  export class UserDoesntExistError extends Result<UseCaseError> {
    constructor(userId: string) {
      super(false, {
        message: `A user for user id ${userId} doesn't exist or was deleted.`
      });
    }
  }

  export class EmployerAlreadyExistsError extends Result<UseCaseError> {
    constructor(userId: string) {
      super(false, {
        message: `Employer for ${userId} already exists.`
      });
    }
  }
}
