import { AbstractBackgroundProcess, AbstractMessage } from "../process/abstract-background-process";

export class BackgroundProcessor {
  protected processes: Map<string, AbstractBackgroundProcess> = new Map();

  public registerProcess(process: AbstractBackgroundProcess): void {
    if (this.processes.has(process.getName())) {
      throw new Error(`Process with name ${process.getName()} is already registered.`);
    }

    this.processes.set(process.getName(), process);
  }

  public startProcess(name: string): void {
    const process = this.processes.get(name);
    
    if (!process) {
      throw new Error(`Process with name ${name} is not registered.`);
    }

    process.start();
  }

  public cancelProcess(name: string): void {
    const process = this.processes.get(name);
    
    if (!process) {
      throw new Error(`Process with name ${name} is not registered.`);
    }

    process.cancel();
  }

  public subscribeToProcessMessages(name: string, callback: (message: AbstractMessage) => void): void {
    const process = this.processes.get(name);
    
    if (!process) {
      throw new Error(`Process with name ${name} is not registered.`);
    }

    process.onMessage = callback;
  }

  public startDaemons(): void {
    this.processes.forEach((process) => {
      if (process.getType() === "daemon") {
        process.start();
      }
    });
  }
}
