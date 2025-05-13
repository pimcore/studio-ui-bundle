/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import React, { type MouseEvent } from 'react'
import { useSelection } from './hooks/use-selection'
import { useStyles } from './selection-button.styles'

export interface SelectionButtonProps {
  id: React.Key
}

export const SelectionButton = ({ id }: SelectionButtonProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { toggle, isSelected } = useSelection()

  const classes = [styles.selectionButton]

  if (isSelected(id)) {
    classes.push('selection-button--active')
  }

  return (
    <IconButton
      className={ classes.join(' ') }
      icon={ { value: 'pin' } }
      onClick={ onClick }
      variant="minimal"
    />
  )

  function onClick (event: MouseEvent<HTMLButtonElement>): void {
    event.stopPropagation()

    toggle(id)
  }
}
