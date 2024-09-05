import { IconButton } from "@Pimcore/components/icon-button/icon-button";
import React, { MouseEvent } from "react";
import { useSelection } from "./hooks/use-selection";
import { useStyles } from "./selection-button.styles";

export interface SelectionButtonProps {
  id: React.Key
}

export const SelectionButton = ({ id }: SelectionButtonProps): React.JSX.Element => {
  const { styles } = useStyles();
  const { toggle, isSelected } = useSelection();

  const classes = [styles.selectionButton];

  if (isSelected(id)) {
    classes.push('selection-button--active');
  }

  return (
    <IconButton
      className={classes.join(' ')}
      icon={ 'pin-02' }
      onClick={ onClick }
      minimal
    />
  )

  function onClick(event: MouseEvent<HTMLButtonElement>): void {
    event.stopPropagation();

    toggle(id)
  }
}
