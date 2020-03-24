import { Result, UseCaseError } from "shared/core";

export namespace CreateUserErrors {
  export class EmailOrUsernameAlreadyExistsError extends Result<UseCaseError> {
    constructor(email: string, username: string) {
      super(false, {
        message: `The email ${email} or ${username} associated for this account already exists`
      } as UseCaseError);
    }
  }
}
