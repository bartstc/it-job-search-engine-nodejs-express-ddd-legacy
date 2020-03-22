import { ValueObject } from "shared/domain";
import { Guard, Result } from "shared/core";

interface CoordinateProps {
  value: number;
}

export class Coordinate extends ValueObject<CoordinateProps> {
  public static latitudeMin = -90;
  public static latitudeMax = 90;
  public static longitudeMin = -180;
  public static longitudeMax = 180;

  get value() {
    return this.props.value;
  }

  private constructor(props: CoordinateProps) {
    super(props);
  }

  public static createLatitudeCoord(
    props: CoordinateProps
  ): Result<Coordinate> {
    const nullGuardResult = Guard.againstNullOrUndefined(
      props.value,
      "latitude"
    );

    if (!nullGuardResult.succeeded) {
      return Result.fail(nullGuardResult.message!);
    }

    const isNumberGuardResult = Guard.isNumber(props.value, "latitude");

    if (!isNumberGuardResult.succeeded) {
      return Result.fail(nullGuardResult.message!);
    }

    const isRangeGuardResult = Guard.inRange(
      props.value,
      this.latitudeMin,
      this.latitudeMax,
      "latitude"
    );

    if (!isRangeGuardResult.succeeded) {
      return Result.fail(isRangeGuardResult.message!);
    }

    return Result.ok(new Coordinate(props));
  }

  public static createLongitudeCoord(
    props: CoordinateProps
  ): Result<Coordinate> {
    const nullGuardResult = Guard.againstNullOrUndefined(
      props.value,
      "longitude"
    );

    if (!nullGuardResult.succeeded) {
      return Result.fail(nullGuardResult.message!);
    }

    const isNumberGuardResult = Guard.isNumber(props.value, "longitude");

    if (!isNumberGuardResult.succeeded) {
      return Result.fail(nullGuardResult.message!);
    }

    const isRangeGuardResult = Guard.inRange(
      props.value,
      this.longitudeMin,
      this.longitudeMax,
      "longitude"
    );

    if (!isRangeGuardResult.succeeded) {
      return Result.fail(isRangeGuardResult.message!);
    }

    return Result.ok(new Coordinate(props));
  }
}
