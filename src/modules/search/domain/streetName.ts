import { ValueObject } from "shared/domain";
import { Guard, Result } from "shared/core";

interface StreetNameProps {
  value: string;
}

export class StreetName extends ValueObject<StreetNameProps> {
  public static minLength = 2;
  public static maxLength = 85;

  get value() {
    return this.props.value;
  }

  private constructor(props: StreetNameProps) {
    super(props);
  }

  public static create(props: StreetNameProps): Result<StreetName> {
    const nullGuardResult = Guard.againstNullOrUndefined(
      props.value,
      "streetName"
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

    return Result.ok(new StreetName(props));
  }
}
