import { Result } from "./Result";
import { UnknownError } from "./UnknownError";

export namespace AppError {
  export class UnexpectedError extends Result<UnknownError> {
    public constructor(err: any) {
      super(false, {
        message: `An unexpected error occurred.`,
        error: err
      });
      console.log(`[AppError]: An unexpected error occurred`);
      console.error(err);
    }

    public static create(err: any): UnexpectedError {
      return new UnexpectedError(err);
    }
  }
}
