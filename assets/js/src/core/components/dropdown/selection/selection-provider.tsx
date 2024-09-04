import React, { createContext, useState } from "react";

export enum SelectionType {
  Disabled = 'disabled',
  Single = 'single',
  Multiple = 'multiple'
}

export interface ISelectionContext {
  selectionType: SelectionType
  selectedKeys: React.Key[]
  setSelectedKeys: (selected: React.Key[]) => void
}

export const SelectionContext = createContext<ISelectionContext>({
  selectionType: SelectionType.Disabled,
  selectedKeys: [],
  setSelectedKeys: () => {}
});

export interface SelectionProviderProps {
  selectedKeys?: ISelectionContext['selectedKeys'],
  selectionType: SelectionType,
  children: React.ReactNode
}

export const SelectionProvider = ({ children, ...props }: SelectionProviderProps): React.JSX.Element => {
  const [selected, setSelected] = useState<ISelectionContext["selectedKeys"]>(props.selectedKeys || []);

  return (
    <SelectionContext.Provider value={{ selectedKeys: selected, setSelectedKeys: setSelected, selectionType: props.selectionType }}>
      {children}
    </SelectionContext.Provider>
  )
}
