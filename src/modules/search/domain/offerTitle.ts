import { ValueObject } from "shared/domain";
import { Guard, Result } from "shared/core";

interface OfferTitleProps {
  value: string;
}

export class OfferTitle extends ValueObject<OfferTitleProps> {
  public static minLength = 2;
  public static maxLength = 85;

  get value() {
    return this.props.value;
  }

  private constructor(props: OfferTitleProps) {
    super(props);
  }

  public static create(props: OfferTitleProps): Result<OfferTitle> {
    const nullGuardResult = Guard.againstNullOrUndefined(
      props.value,
      "offerTitle"
    );

    if (!nullGuardResult.succeeded) {
      return Result.fail<OfferTitle>(nullGuardResult.message!);
    }

    const minGuardResult = Guard.againstAtLeast(this.minLength, props.value);
    const maxGuardResult = Guard.againstAtMost(this.maxLength, props.value);

    if (!minGuardResult.succeeded) {
      return Result.fail<OfferTitle>(minGuardResult.message!);
    }

    if (!maxGuardResult.succeeded) {
      return Result.fail<OfferTitle>(maxGuardResult.message!);
    }

    return Result.ok<OfferTitle>(new OfferTitle(props));
  }
}
