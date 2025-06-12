import { AbstractBackgroundProcess, AbstractMessage } from "../process/abstract-background-process";
import { AbstractBackgroundSubscriber, SubscriberConstructor } from "../subscriber/abstract-background-subscriber";
import { DefaultBackgroundSubscriber } from "../subscriber/default-background-subscribter";

export type ISubscribeToProcessMessagesArgs = {
  processName: string;
  callback: (message: AbstractMessage) => void;
  subscriberClass?: SubscriberConstructor;
};

export class BackgroundProcessor {
  protected processes: Map<string, AbstractBackgroundProcess> = new Map();
  protected subscribers: Map<string, AbstractBackgroundSubscriber> = new Map();
  protected processSubscriptions: Map<string, string[]> = new Map();
  protected runningProcesses: Set<string> = new Set();

  public registerProcess(process: AbstractBackgroundProcess): void {
    if (this.processes.has(process.getName())) {
      throw new Error(`Process with name ${process.getName()} is already registered.`);
    }

    this.processes.set(process.getName(), process);
  }

  public subscribeToProcessMessages({
    processName,
    callback,
    subscriberClass = DefaultBackgroundSubscriber,
  }: ISubscribeToProcessMessagesArgs): string {
    if (!this.processes.has(processName)) {
      throw new Error(`Process with name ${processName} is not registered.`);
    }

    const subscriber = new subscriberClass(callback);
    this.subscribers.set(subscriber.getId(), subscriber);

    if (!this.processSubscriptions.has(processName)) {
      this.processSubscriptions.set(processName, []);
    }
    this.processSubscriptions.get(processName)?.push(subscriber.getId());

    const process = this.processes.get(processName);
    
    if (!process) {
      throw new Error(`Process with name ${processName} does not exist.`);
    }

    this.startProcess(processName);

    return subscriber.getId();
  }

  public unsubscribeFromProcessMessages(subscriberId: string): void {
    const subscriber = this.subscribers.get(subscriberId);
    if (!subscriber) {
      throw new Error(`Subscriber with ID ${subscriberId} does not exist.`);
    }

    this.subscribers.delete(subscriberId);

    for (const [processName, subscribers] of this.processSubscriptions.entries()) {
      const index = subscribers.indexOf(subscriberId);
      if (index !== -1) {
        subscribers.splice(index, 1);
        if (subscribers.length === 0) {
          // If no subscribers left for this process, remove it from the map
          this.cancelProcess(processName);
          this.processSubscriptions.delete(processName);
        }
      }
    }
  }

  protected notifySubscribers(processName: string, message: AbstractMessage): void {
    const subscribers = this.processSubscriptions.get(processName);
    if (!subscribers) {
      return;
    }

    for (const subscriberId of subscribers) {
      const subscriber = this.subscribers.get(subscriberId);
      if (subscriber) {
        subscriber.getCallback()(message);
      }
    }
  }

  protected startProcess(processName: string): void {
    const process = this.processes.get(processName);
    if (!process) {
      throw new Error(`Process with name ${processName} does not exist.`);
    }

    if (this.runningProcesses.has(processName)) {
      return; // Process is already running
    }

    process.start();
    this.runningProcesses.add(processName);

    process.onMessage = (message: AbstractMessage) => {
      this.notifySubscribers(processName, message);
    };
  }

  protected cancelProcess(processName: string): void {
    const process = this.processes.get(processName);
    
    if (!process) {
      throw new Error(`Process with name ${processName} does not exist.`);
    }

    if (!this.runningProcesses.has(processName)) {
      return; // Process is not running
    }
    
    this.runningProcesses.delete(processName);
    process.cancel();
  }
}
