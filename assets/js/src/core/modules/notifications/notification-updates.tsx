// dummy code to showcase demo background process 
// later on should be replaced with the actual logic to show notifications to the user

import React, { useEffect } from "react";
import { useBackgroundProcessor, useBackgroundProcessorMessage } from "../background-processor/hooks/use-background-processor";

export const NotificationUpdates = (): React.JSX.Element => {
  // Handle the message from the demo process
  useBackgroundProcessorMessage('demo-process', (message) => {
    console.log('Received message from demo process:', message);
  });

  // Alternative syntax for conditional listening
  const backgroundProcessor = useBackgroundProcessor();
  const shouldListen = true; // Replace with your actual condition

  useEffect(() => {
    if (shouldListen) {
      backgroundProcessor.subscribeToProcessMessages('demo-process', (message) => {
        console.log('Received message from demo process:', message);
      });
    }
  })

  return <></>
}
