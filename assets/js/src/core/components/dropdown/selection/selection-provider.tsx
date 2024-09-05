import React, { createContext, useEffect, useState } from "react";
import { DropdownProps } from "../dropdown";

export enum SelectionType {
  Disabled = 'disabled',
  Single = 'single',
  Multiple = 'multiple'
}

export interface ISelectionContext {
  selectionType: SelectionType
  selectedKeys: React.Key[]
  setSelectedKeys: (selected: React.Key[]) => void
  onSelected: DropdownProps['onSelect']
}

export const SelectionContext = createContext<ISelectionContext>({
  selectionType: SelectionType.Disabled,
  selectedKeys: [],
  setSelectedKeys: () => {},
  onSelected: () => {}
});

export interface SelectionProviderProps {
  selectedKeys?: ISelectionContext['selectedKeys'],
  selectionType: SelectionType,
  children: React.ReactNode
  onSelected?: DropdownProps['onSelect']
}

export const SelectionProvider = ({ children, onSelected, ...props }: SelectionProviderProps): React.JSX.Element => {
  const [selected, setSelected] = useState<ISelectionContext["selectedKeys"]>(props.selectedKeys || []);

  useEffect(() => {
    setSelected(props.selectedKeys || [])
  }, [props.selectedKeys]);

  return (
    <SelectionContext.Provider value={{ selectedKeys: selected, setSelectedKeys, selectionType: props.selectionType, onSelected }}>
      {children}
    </SelectionContext.Provider>
  )

  function setSelectedKeys(selected: React.Key[]): void {
    setSelected(() => {
      if (onSelected !== undefined) {
        onSelected(selected);
      }
      
      return selected
    });
  }
}
