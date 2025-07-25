import React, { createContext, useMemo, useState } from "react";

export interface IPreviewItemContext {
  item: any;
  setItem: (item: any) => void;
}

export const PreviewItemContext = createContext<IPreviewItemContext>({
  item: null,
  setItem: () => {},
});

export interface IPreviewItemProviderProps {
  children?: React.ReactNode;
}

export const PreviewItemProvider = ({ children }: IPreviewItemProviderProps): React.JSX.Element => {
  const [item, setItem] = useState<any>(null);

  return useMemo(() => (
    <PreviewItemContext.Provider value={{ item, setItem }}>
      {children}
    </PreviewItemContext.Provider>
  ), [item, children]);
}

export interface UsePreviewItemReturn extends IPreviewItemContext {}

export const usePreviewItem = (): UsePreviewItemReturn => {
  const context = React.useContext(PreviewItemContext);
  if (!context) {
    throw new Error("usePreviewItem must be used within a PreviewItemProvider");
  }
  return context;
};
