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

import React from 'react'
import { type DragAndDropInfo } from './context-provider'
import { Icon } from '../icon/icon'
import { useStyle } from './drag-overlay.styles'

export interface DragOverlayProps {
  info: DragAndDropInfo
}

export const DragOverlay = (props: DragOverlayProps): React.JSX.Element => {
  const { styles } = useStyle()
  const ref = React.useRef<HTMLDivElement>(null)

  return (
    <div
      className={ ['dnd__overlay', styles.dragOverlay].join(' ') }
      ref={ ref }
    >
      <Icon value={ props.info.icon } /> {props.info.title}
    </div>
  )
}
