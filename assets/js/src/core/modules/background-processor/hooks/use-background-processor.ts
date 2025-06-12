import { useInjection } from "@Pimcore/app/depency-injection";
import { BackgroundProcessor, ISubscribeToProcessMessagesArgs } from "../services/background-processor";
import { serviceIds } from "@Pimcore/app/config/services/service-ids";
import { AbstractMessage } from "../process/abstract-background-process";
import { useEffect } from "react";

export const useBackgroundProcessor = (): BackgroundProcessor => {
  return useInjection<BackgroundProcessor>(serviceIds.backgroundProcessor);
}

export const useBackgroundProcessorMessage = <T = AbstractMessage>(args: ISubscribeToProcessMessagesArgs): void => {
  const backgroundProcessor = useBackgroundProcessor();
  
  useEffect(() => {
    const subscriberId = backgroundProcessor.subscribeToProcessMessages(args);

    return () => {
      backgroundProcessor.unsubscribeFromProcessMessages(subscriberId);
    };
  }, [])
}
