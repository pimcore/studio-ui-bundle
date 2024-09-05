import React, { useContext } from "react"
import { ISelectionContext, SelectionContext, SelectionType } from "../selection-provider";

export interface UseSelectionHookReturn extends ISelectionContext {
  isSelected: (key: React.Key) => boolean
  select: (key: React.Key) => void
  deselect: (key: React.Key) => void
  toggle: (key: React.Key) => void
}

export const useSelection = (): UseSelectionHookReturn => {
  const { selectedKeys, setSelectedKeys, selectionType, ...context } = useContext(SelectionContext);

  function isSelected(key: React.Key): boolean {
    return selectedKeys.includes(key);
  }

  function select(key: React.Key): void {
    if (selectionType === SelectionType.Disabled) {
      return;
    }

    if (selectionType === SelectionType.Single) {
      setSelectedKeys([key]);
      return;
    }

    if (selectionType === SelectionType.Multiple) {
      setSelectedKeys([...selectedKeys, key]);
    }
  }

  function deselect(key: React.Key): void {
    if (selectionType === SelectionType.Disabled) {
      return;
    }

    setSelectedKeys(selectedKeys.filter((selectedKey) => selectedKey !== key));
  }

  function toggle(key: React.Key): void {
    if (isSelected(key)) {
      deselect(key);
      return;
    }

    select(key);
  }

  return {
    isSelected,
    select,
    deselect,
    toggle,
    selectedKeys,
    setSelectedKeys,
    selectionType,
    ...context
  };
}
