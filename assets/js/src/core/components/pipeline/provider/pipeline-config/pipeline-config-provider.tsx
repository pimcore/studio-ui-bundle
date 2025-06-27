import React, { createContext, useMemo, useState } from "react";

export interface PipelineConfigProviderProps {
  initialConfig?: Record<string, any>;
  children: React.ReactNode;
}

export interface PipelineConfigProviderContext {
  config: Record<string, any>;
  setConfig: (config: Record<string, any>) => void;
}

export const PipelineConfigProviderContext = createContext<PipelineConfigProviderContext | null>(null);

export const PipelineConfigProvider = ({ initialConfig, children }: PipelineConfigProviderProps): React.JSX.Element => {
  const [config, setConfig] = useState<Record<string, any>>(initialConfig ?? {});

  return useMemo(() => (
    <PipelineConfigProviderContext.Provider value={{ config, setConfig }}>
      {children}
    </PipelineConfigProviderContext.Provider>
  ), [config, children]);
}
