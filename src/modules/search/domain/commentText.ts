import { ValueObject } from "shared/domain";
import { Guard, Result } from "shared/core";

interface CommentTextProps {
  value: string;
}

export class CommentText extends ValueObject<CommentTextProps> {
  public static minLength = 2;
  public static maxLength = 10000;

  get value() {
    return this.props.value;
  }

  private constructor(props: CommentTextProps) {
    super(props);
  }

  public static create(props: CommentTextProps): Result<CommentText> {
    const nullGuardResult = Guard.againstNullOrUndefined(
      props.value,
      "commentText"
    );

    if (!nullGuardResult.succeeded) {
      return Result.fail(nullGuardResult.message!);
    }

    const minGuardResult = Guard.againstAtLeast(this.minLength, props.value);
    const maxGuardResult = Guard.againstAtMost(this.maxLength, props.value);

    if (!minGuardResult.succeeded) {
      return Result.fail(minGuardResult.message!);
    }

    if (!maxGuardResult.succeeded) {
      return Result.fail(maxGuardResult.message!);
    }

    return Result.ok(new CommentText(props));
  }
}
