import { uuid } from "@Pimcore/utils/uuid";
import { AbstractMessage } from "../process/abstract-background-process";

export type SubscriberConstructor = new (
  callback: (message: AbstractMessage) => void
) => AbstractBackgroundSubscriber;

export abstract class AbstractBackgroundSubscriber {
  protected readonly id: string = uuid();

  protected callback: (message: AbstractMessage) => void;

  constructor(callback: (message: AbstractMessage) => void) {
    this.callback = callback;
  }

  public getId(): string {
    return this.id;
  }

  public getCallback(): (message: AbstractMessage) => void {
    return this.callback;
  }
}
