import { GridProps } from "@Pimcore/types/components/types";
import React, { createContext, useState } from "react";

export interface IDataContext {
  data: GridProps['data'];
  setData: (data: GridProps['data']) => void;
}

export const DataContext = createContext<IDataContext | undefined>(undefined);

export interface DataProviderProps {
  data: GridProps['data'];
  children: React.ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ data, children }) => {
  const [state, setState] = useState(data);

  const value = {
    data: state,
    setData: setState,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = (): IDataContext => {
  const context = React.useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
