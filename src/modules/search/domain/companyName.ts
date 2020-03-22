import { ValueObject } from "shared/domain";
import { Guard, Result } from "shared/core";

interface CompanyNameProps {
  value: string;
}

export class CompanyName extends ValueObject<CompanyNameProps> {
  public static minLength = 2;
  public static maxLength = 40;

  get value() {
    return this.props.value;
  }

  private constructor(props: CompanyNameProps) {
    super(props);
  }

  public static create(props: CompanyNameProps): Result<CompanyName> {
    const nullGuardResult = Guard.againstNullOrUndefined(
      props.value,
      "companyName"
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

    return Result.ok(new CompanyName(props));
  }
}
