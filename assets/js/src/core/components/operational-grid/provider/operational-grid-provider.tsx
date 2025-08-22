import React, { createContext } from "react";
import { GridProps } from "@Pimcore/types/components/types";
import { ColumnDef } from "@tanstack/react-table";

export interface IOperationalGridContext {
  value: GridProps['data'];
  onChange?: (value: GridProps['data']) => void;
  columns: Array<ColumnDef<any>>;
  onColumnsChange?: (columns: Array<ColumnDef<any>>) => void;
  finalGridProps: GridProps;
}

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
