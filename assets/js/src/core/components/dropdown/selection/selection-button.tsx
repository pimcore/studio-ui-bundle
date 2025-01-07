/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
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
