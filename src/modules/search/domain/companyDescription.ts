import { ValueObject } from "shared/domain";
import { Guard, Result } from "shared/core";

interface CompanyDescriptionProps {
  value: string;
}

export class CompanyDescription extends ValueObject<CompanyDescriptionProps> {
  public static minLength: number = 2;
  public static maxLength: number = 1000;

  get value() {
    return this.props.value;
  }

  private constructor(props: CompanyDescriptionProps) {
    super(props);
  }

  public static create(
    props: CompanyDescriptionProps
  ): Result<CompanyDescription> {
    const nullGuardResult = Guard.againstNullOrUndefined(
      props.value,
      "companyDescription"
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

    return Result.ok(new CompanyDescription(props));
  }
}
