import { ValueObject } from "shared/domain";
import { Guard, Result } from "shared/core";

interface CityNameProps {
  value: string;
}

export class CityName extends ValueObject<CityNameProps> {
  public static minLength = 2;
  public static maxLength = 50;

  get value() {
    return this.props.value;
  }

  private constructor(props: CityNameProps) {
    super(props);
  }

  public static create(props: CityNameProps): Result<CityName> {
    const nullGuardResult = Guard.againstNullOrUndefined(
      props.value,
      "cityName"
    );

    if (!nullGuardResult.succeeded) {
      return Result.fail<CityName>(nullGuardResult.message!);
    }

    const minGuardResult = Guard.againstAtLeast(this.minLength, props.value);
    const maxGuardResult = Guard.againstAtMost(this.maxLength, props.value);

    if (!minGuardResult.succeeded) {
      return Result.fail<CityName>(minGuardResult.message!);
    }

    if (!maxGuardResult.succeeded) {
      return Result.fail<CityName>(maxGuardResult.message!);
    }

    return Result.ok<CityName>(new CityName(props));
  }
}
