import React, { createContext, useMemo, useState } from "react"

export interface IDropdownHeightContext {
  height: number
}

export const DropdownHeightContext = createContext<IDropdownHeightContext | undefined>(undefined)

export interface DropdownHeightProviderProps {
  children: React.ReactNode
}

export const DropdownHeightProvider = ({ children }: DropdownHeightProviderProps): React.JSX.Element => {
  const [height, setHeight] = useState<number>(0);

  const onContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    const viewportHeight = window.innerHeight;
    const triggerLocation = e.clientY;
    const offset = 16;
    let newHeight = viewportHeight - triggerLocation;

    if (triggerLocation > viewportHeight / 2) {
      newHeight = triggerLocation;
    }

    setHeight(newHeight - offset);
  }

  return useMemo(() => (
    <div onContextMenuCapture={onContextMenu}>
      <DropdownHeightContext.Provider value={{ height }}>
        {children}
      </DropdownHeightContext.Provider>
    </div>
  ), [height, children]);
}

export const useDropdownHeightOptional = (): IDropdownHeightContext | undefined => {
  const context = React.useContext(DropdownHeightContext);
  
  return context;
}
