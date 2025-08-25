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
import { DragOverlay } from '@dnd-kit/core'
import { snapCenterToCursor } from '@dnd-kit/modifiers'
import { ToolStrip } from '@Pimcore/components/toolstrip/tool-strip'
import { useStyles } from './toolstrip-drag-overlay.styles'

export interface ToolstripDragOverlayProps {
  activeId: string | null
  title?: string
}

export const ToolstripDragOverlay = ({
  activeId,
  title
}: ToolstripDragOverlayProps): React.JSX.Element => {
  const { styles } = useStyles()

  return (
    <DragOverlay
      dropAnimation={ null }
      modifiers={ [snapCenterToCursor] }
    >
      {activeId !== null
        ? (
          <div className={ styles.dragOverlay }>
            <ToolStrip
              dragger
              rounded
              theme="inverse"
              title={ title }
            />
          </div>
          )
        : null}
    </DragOverlay>
  )
}
