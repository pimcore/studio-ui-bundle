import { IconButton } from "@Pimcore/components/icon-button/icon-button";
import React from "react";
import { useSelection } from "./hooks/use-selection";

export interface SelectionButtonProps {
  key: React.Key
}

export const SelectionButton = ({ key }: SelectionButtonProps): React.JSX.Element => {
  const { toggle, isSelected } = useSelection();

  return (
    <IconButton
      icon={ isSelected(key) ? 'check': 'circle' }
      onClick={ () => toggle(key) }
    />
  )
}
