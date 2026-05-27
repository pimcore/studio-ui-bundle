/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo } from 'react'
import { DragOverlay } from '@dnd-kit/core'
import { snapCenterToCursor } from '@dnd-kit/modifiers'
import { ToolStrip } from '@Pimcore/components/toolstrip/tool-strip'
import { useStyles } from './toolstrip-drag-overlay.styles'

export interface ToolstripDragOverlayProps {
  activeId: string | null
  title?: string
}

// Module-level so dnd-kit doesn't see a new modifiers array per render.
const DRAG_OVERLAY_MODIFIERS = [snapCenterToCursor]

const ToolstripDragOverlayComponent = ({
  activeId,
  title
}: ToolstripDragOverlayProps): React.JSX.Element => {
  const { styles } = useStyles()

  // DragOverlay re-renders to update its transform on every drag tick. Memoize
  // the children so the inner ToolStrip isn't rebuilt with it.
  const overlayContent = useMemo(() => {
    if (activeId === null) return null
    return (
      <div className={ styles.dragOverlay }>
        <ToolStrip
          dragger
          rounded
          theme="inverse"
          title={ title }
        />
      </div>
    )
  }, [activeId, title, styles.dragOverlay])

  return (
    <DragOverlay
      dropAnimation={ null }
      modifiers={ DRAG_OVERLAY_MODIFIERS }
    >
      {overlayContent}
    </DragOverlay>
  )
}

export const ToolstripDragOverlay = React.memo(ToolstripDragOverlayComponent)
