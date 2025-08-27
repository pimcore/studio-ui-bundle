import React, { createContext, useMemo } from "react";
import { FieldCollectionProps } from "./field-collection";

export interface IFieldCollectionContext extends FieldCollectionProps {}

export const FieldCollectionContext = createContext<IFieldCollectionContext | undefined>(undefined);

export interface FieldCollectionProviderProps extends IFieldCollectionContext {
  children: React.JSX.Element
}

export const FieldCollectionProvider = (props: FieldCollectionProviderProps): React.JSX.Element => {
  const { children, ...contextValue } = props;

  return useMemo(() => (
    <FieldCollectionContext.Provider value={contextValue}>
      {children}
    </FieldCollectionContext.Provider>
  ), [contextValue, children]);
};

export interface UseFieldCollectionReturn extends IFieldCollectionContext {}

export const useFieldCollection = (): UseFieldCollectionReturn => {
  const context = React.useContext(FieldCollectionContext);
  if (!context) {
    throw new Error("useFieldCollection must be used within a FieldCollectionProvider");
  }
  return context;
};
