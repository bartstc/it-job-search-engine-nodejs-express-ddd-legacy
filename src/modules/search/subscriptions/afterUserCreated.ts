import { IHandle } from "shared/domain/events/IHandle";

import { UserCreated } from "../../users/domain/events";
import { DomainEvents } from "../../../shared/domain/events";
import { CreateEmployerUseCase } from "../useCases/employers/createEmployer";

export class AfterUserCreated implements IHandle {
  private createEmployer: CreateEmployerUseCase;

  constructor(createEmployer: CreateEmployerUseCase) {
    this.setupSubscriptions();
    this.createEmployer = createEmployer;
  }

  setupSubscriptions(): void {
    // Register to the domain event, todo: any
    DomainEvents.register(
      this.onUserCreated.bind(this) as any,
      UserCreated.name
    );
  }

  private async onUserCreated(event: UserCreated): Promise<void> {
    const { user } = event;

    try {
      await this.createEmployer.execute({
        userId: user.userId.id.toString()
      });
      console.log(
        `[AfterUserCreated]: Successfully executed CreateEmployer use case AfterUserCreated`
      );
    } catch (err) {
      console.log(
        `[AfterUserCreated]: Failed to execute CreateEmployer use case AfterUserCreated.`
      );
    }
  }
}
