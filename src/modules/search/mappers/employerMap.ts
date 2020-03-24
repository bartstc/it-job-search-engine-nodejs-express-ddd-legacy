import { Mapper } from "shared/infra";
import { UniqueEntityID } from "shared/domain";

import { UserId, UserName } from "../../users/domain";
import { Employer } from "../domain";

export class EmployerMap implements Mapper<Employer> {
  public static toDomain(employerRaw: any, userRaw: any): Employer {
    const userNameOrError = UserName.create({ name: userRaw.username });
    const userIdOrError = UserId.create(new UniqueEntityID(userRaw.userId));

    const employerOrError = Employer.create(
      {
        username: userNameOrError.getValue(),
        userId: userIdOrError.getValue()
      },
      new UniqueEntityID(employerRaw.employerId)
    );

    !employerOrError.isSuccess ? console.log(employerOrError.error) : "";

    return employerOrError.getValue();
  }

  public static toPersistence(employer: Employer): any {
    return {
      employerId: employer.employerId.id.toString(),
      userId: employer.userId.id.toString()
    };
  }
}
