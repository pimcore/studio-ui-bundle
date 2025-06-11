export interface AbstractMessage {
  type: string;
  payload: unknown;
}

export const ProcessTypes = {
  DAEMON: "daemon",
} as const;

export type ProcessTypes = typeof ProcessTypes[keyof typeof ProcessTypes];

export abstract class AbstractBackgroundProcess {
  protected abstract readonly name: string;
  protected abstract readonly description?: string;
  protected type: ProcessTypes = ProcessTypes.DAEMON;

  abstract start(): void
  abstract cancel(): void

  public onMessage?: (message: AbstractMessage) => void;

  public getName(): string {
    return this.name;
  }

  public getDescription(): string | undefined {
    return this.description;
  }

  public getType(): ProcessTypes {
    return this.type;
  }

  protected sendMessage(message: AbstractMessage): void {
    if (this.onMessage) {
      this.onMessage(message);
    }
  }
}
