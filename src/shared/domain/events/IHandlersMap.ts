import { IDomainEvent } from "./IDomainEvent";

type Handler = (event: IDomainEvent) => void;

export interface IHandlersMap {
  [key: string]: Handler[];
}
