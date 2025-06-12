// dummy code to showcase demo background process 
// later on should be replaced with the actual logic to show notifications to the user

import React, { useEffect } from "react";
import { useBackgroundProcessor, useBackgroundProcessorMessage } from "../background-processor/hooks/use-background-processor";

export const NotificationUpdates = (): React.JSX.Element => {
  // Handle the message from the demo process
  useBackgroundProcessorMessage({
    processName: 'demo-process',
    callback: (message) => {
      console.log('Received message from demo process:', message);
    }
  });

  // Alternative syntax for conditional listening
  const backgroundProcessor = useBackgroundProcessor();
  const shouldListen = true; // Replace with your actual condition

  useEffect(() => {
    // Subscribe to the demo process messages if the condition is met
    let subscriberId: string | undefined;

    if (shouldListen) {
      subscriberId = backgroundProcessor.subscribeToProcessMessages({
        processName: 'demo-process',
        callback: (message) => {
          console.log('Received message from demo process:', message);
        }
      });
    }

    // Cleanup function to unsubscribe when the component unmounts or condition changes
    return () => {
      if (subscriberId) {
        backgroundProcessor.unsubscribeFromProcessMessages(subscriberId);
      }
    };
  })

  return <></>
}
