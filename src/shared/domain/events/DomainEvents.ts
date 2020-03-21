import { IDomainEvent } from "./IDomainEvent";
import { AggregateRoot } from "../AggregateRoot";
import { UniqueEntityID } from "../UniqueEntityID";
import { IHandlersMap } from "./IHandlersMap";

export class DomainEvents {
  private static handlersMap: IHandlersMap = {};
  private static markedAggregates: AggregateRoot<unknown>[] = [];

  /**
   * @method markAggregateForDispatch
   * @static
   * @desc Called by aggregate root objects that have created domain
   * events to eventually be dispatched when the infrastructure commits
   * the unit of work.
   */

  public static markAggregateForDispatch(
    aggregate: AggregateRoot<unknown>
  ): void {
    const aggregateFound = !!this.findMarkedAggregateByID(aggregate.id);

    if (!aggregateFound) {
      this.markedAggregates.push(aggregate);
    }
  }

  /**
   * @method dispatchAggregateEvents
   * @static
   * @private
   * @desc Call all of the handlers for any domain events on this aggregate.
   */

  private static dispatchAggregateEvents(
    aggregate: AggregateRoot<unknown>
  ): void {
    aggregate.domainEvents.forEach((event: IDomainEvent) =>
      this.dispatch(event)
    );
  }

  private static removeAggregateFromMarkedDispatchList(
    aggregate: AggregateRoot<unknown>
  ): void {
    const index = this.markedAggregates.findIndex(a => a.equals(aggregate));
    this.markedAggregates.splice(index, 1);
  }

  private static findMarkedAggregateByID(
    id: UniqueEntityID
  ): AggregateRoot<unknown> | undefined {
    return this.markedAggregates.find(aggregate => aggregate.id.equals(id));
  }

  /**
   * @method dispatchEventsForAggregate
   * @static
   * @desc When all we know is the ID of the aggregate, call this
   * in order to dispatch any handlers subscribed to events on the
   * aggregate. Called by sequelize hook.
   */

  public static dispatchEventsForAggregate(id: UniqueEntityID): void {
    const aggregate = this.findMarkedAggregateByID(id);

    if (aggregate) {
      this.dispatchAggregateEvents(aggregate);
      aggregate.clearEvents();
      this.removeAggregateFromMarkedDispatchList(aggregate);
    }
  }

  /**
   * @method register
   * @static
   * @desc Register a handler to a domain event. Called by Subscriber -
   * it use DomainEvents's register() method to register the particular
   * handler to correct domain event
   */

  public static register(
    callback: (event: IDomainEvent) => void,
    eventClassName: string
  ): void {
    if (!this.handlersMap.hasOwnProperty(eventClassName)) {
      this.handlersMap[eventClassName] = [];
    }
    this.handlersMap[eventClassName].push(callback);
  }

  /**
   * @method clearHandlers
   * @static
   * @desc Useful for testing.
   */

  public static clearHandlers(): void {
    this.handlersMap = {};
  }

  /**
   * @method clearMarkedAggregates
   * @static
   * @desc Useful for testing.
   */

  public static clearMarkedAggregates(): void {
    this.markedAggregates = [];
  }

  /**
   * @method dispatch
   * @static
   * @desc Invokes all of the subscribers to a particular domain event.
   */

  private static dispatch(event: IDomainEvent): void {
    const eventClassName: string = event.constructor.name;

    if (this.handlersMap.hasOwnProperty(eventClassName)) {
      const handlers: any[] = this.handlersMap[eventClassName];
      for (let handler of handlers) {
        handler(event);
      }
    }
  }
}
