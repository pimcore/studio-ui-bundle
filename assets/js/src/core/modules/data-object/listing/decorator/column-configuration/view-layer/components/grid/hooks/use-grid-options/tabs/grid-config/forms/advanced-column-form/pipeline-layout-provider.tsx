import React, { createContext, useContext, useMemo } from "react";

export interface PipelineLayoutContextProps {
  pipelineLayout: 'default' | 'verbose';
}

export const PipelineLayoutContext = createContext<PipelineLayoutContextProps>({
  pipelineLayout: 'default'
});

export interface PipelineLayoutProviderProps extends PipelineLayoutContextProps {
  children: React.ReactNode;
}

export const PipelineLayoutProvider = ({ children, pipelineLayout }: PipelineLayoutProviderProps): React.JSX.Element => {
  return useMemo(() => (
    <PipelineLayoutContext.Provider value={{ pipelineLayout }}>
      {children}
    </PipelineLayoutContext.Provider>
  ), [children, pipelineLayout]);
}

export const usePipelineLayoutContext = (): PipelineLayoutContextProps => {
  const context = useContext(PipelineLayoutContext);

  if (!context) {
    throw new Error('usePipelineLayoutContext must be used within a PipelineLayoutProvider');
  }

  return context;
}
