import { ValueObject } from "shared/domain";
import { Guard, Result } from "shared/core";

interface SkillsListProps {
  value: string[];
}

export class SkillsList extends ValueObject<SkillsListProps> {
  get value() {
    return this.props.value;
  }

  private constructor(props: SkillsListProps) {
    super(props);
  }

  public static create(props: SkillsListProps): Result<SkillsListProps> {
    const nullGuardResult = Guard.againstNullOrUndefined(
      props.value,
      "skillsList"
    );

    if (!nullGuardResult.succeeded) {
      return Result.fail(nullGuardResult.message!);
    }

    const listOfStringsGuardResult = Guard.isListOfStrings(
      props.value,
      "skillsList"
    );

    if (!listOfStringsGuardResult.succeeded) {
      return Result.fail(listOfStringsGuardResult.message!);
    }

    return Result.ok(new SkillsList(props));
  }
}
