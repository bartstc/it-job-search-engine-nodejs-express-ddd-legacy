import { AggregateRoot, UniqueEntityID } from "shared/domain";
import { Guard, Result } from "shared/core";

import { UserId, UserName } from "../../users/domain";
import { EmployerId } from "./employerId";

interface EmployerProps {
  userId: UserId;
  username: UserName;
}

export class Employer extends AggregateRoot<EmployerProps> {
  get employerId(): EmployerId {
    return EmployerId.create(this._id).getValue();
  }

  get userId(): UserId {
    return this.props.userId;
  }

  get username(): UserName {
    return this.props.username;
  }

  private constructor(props: EmployerProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    props: EmployerProps,
    id?: UniqueEntityID
  ): Result<Employer> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.userId, argumentName: "userId" },
      { argument: props.username, argumentName: "username" }
    ]);

    if (!guardResult.succeeded) {
      return Result.fail(guardResult.message!);
    }

    const employer = new Employer(props, id);
    const isNewEmployer = !!id;

    if (isNewEmployer) {
      // todo: domain events
      // employer.addDomainEvent(new EmployerCreated(employer));
    }

    return Result.ok(employer);
  }
}
