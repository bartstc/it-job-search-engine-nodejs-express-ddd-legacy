import { ValueObject } from "shared/domain";
import { Guard, Result } from "shared/core";

interface OfferDescriptionProps {
  value: string;
}

export class OfferDescription extends ValueObject<OfferDescriptionProps> {
  public static minLength = 2;
  public static maxLength = 10000;

  get value() {
    return this.props.value;
  }

  private constructor(props: OfferDescriptionProps) {
    super(props);
  }

  public static create(props: OfferDescriptionProps): Result<OfferDescription> {
    const nullGuardResult = Guard.againstNullOrUndefined(
      props.value,
      "offerDescription"
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

    return Result.ok(new OfferDescription(props));
  }
}
