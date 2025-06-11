import { useInjection } from "@Pimcore/app/depency-injection";
import { BackgroundProcessor } from "../services/background-processor";
import { serviceIds } from "@Pimcore/app/config/services/service-ids";
import { AbstractMessage } from "../process/abstract-background-process";

export const useBackgroundProcessor = (): BackgroundProcessor => {
  return useInjection<BackgroundProcessor>(serviceIds.backgroundProcessor);
}

export const useBackgroundProcessorMessage = <T = AbstractMessage>(name: string, callback: (message: T) => void): void => {
  const backgroundProcessor = useBackgroundProcessor();
  
  backgroundProcessor.subscribeToProcessMessages(name, (message) => {
    callback(message.payload as T);
  });
}
