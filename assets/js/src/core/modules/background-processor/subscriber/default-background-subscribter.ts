import { AbstractMessage } from "../process/abstract-background-process";
import { AbstractBackgroundSubscriber } from "./abstract-background-subscriber";

export class DefaultBackgroundSubscriber extends AbstractBackgroundSubscriber {
  constructor(callback: (message: AbstractMessage) => void) {
    super(callback);
  }
}
