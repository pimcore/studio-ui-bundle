import { appConfig } from "@Pimcore/app/config/app-config";
import { AbstractBackgroundProcess } from "./abstract-background-process";

export abstract class AbstractMercureProcess extends AbstractBackgroundProcess {
  protected abstract readonly topics: string[];
  protected eventSource?: EventSource;

  public start() {
    if (this.eventSource) {
      this.eventSource.close();
    }

    const url = new URL(appConfig.mercureUrl);

    this.topics.forEach(topic => {
      url.searchParams.append('topic', topic);
    });

    this.eventSource = new EventSource(url.toString());

    this.eventSource.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      this.sendMessage({
        type: 'update',
        payload: data
      });
    };

    this.eventSource.onerror = (error: Event) => {
      this.sendMessage({
        type: 'error',
        payload: error
      });
      this.cancel();
    };
  };

  public cancel() {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = undefined;
    }

    this.sendMessage({
      type: 'cancel',
      payload: null
    });
  };
}
