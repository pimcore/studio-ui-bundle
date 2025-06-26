/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { type DragAndDropInfo } from '@sdk/components'
import { Icon } from '../icon/icon'
import { useStyle } from './drag-overlay.styles'

export interface DragOverlayProps {
  info: DragAndDropInfo
}

export const DragOverlay = (props: DragOverlayProps): React.JSX.Element => {
  const { styles } = useStyle()

  return (
    <div
      className={ ['dnd__overlay', styles.dragOverlay].join(' ') }
    >
      <Icon {...props.info.icon} /> {props.info.title}
    </div>
  )
}
