import React from "react";
import { SystemSettingsProvider } from "./context/system-settings-provider";
import { SystemSettings } from "./system-settings";

export const SystemSettingsContainer = (): React.JSX.Element => {
  return (
    <SystemSettingsProvider>
      <SystemSettings />
    </SystemSettingsProvider>
  )
}