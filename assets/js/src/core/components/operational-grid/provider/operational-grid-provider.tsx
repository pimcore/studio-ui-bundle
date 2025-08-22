import React, { createContext } from "react";
import { OperationalGridProps } from "../operational-grid";

export interface IOperationalGridContext extends Omit<OperationalGridProps, 'children'> {}

export const OperationalGridContext = createContext<IOperationalGridContext | undefined>(undefined);

export interface OperationalGridProviderProps extends IOperationalGridContext {
  children: React.ReactNode;
}

export const OperationalGridProvider = (props: OperationalGridProviderProps): React.JSX.Element => {
  const { children, ...contextValue } = props;

  return (
    <OperationalGridContext.Provider value={contextValue}>
      {children}
    </OperationalGridContext.Provider>
  );
};

export const useOperationalGridContext = (): IOperationalGridContext => {
  const context = React.useContext(OperationalGridContext);
  if (!context) {
    throw new Error("useOperationalGridContext must be used within an OperationalGridProvider");
  }
  return context;
};
