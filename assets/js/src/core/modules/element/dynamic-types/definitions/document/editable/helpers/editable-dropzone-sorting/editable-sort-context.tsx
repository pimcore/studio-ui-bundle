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
import { ToolstripDragOverlay } from './components/toolstrip-drag-overlay/toolstrip-drag-overlay'

export interface EditableSortContextProps {
  children: React.ReactNode
  items: string[]
  activeId: string | null
  dragOverlayTitle?: string
  // Native events - no need for handlers since we handle everything natively
}

export const EditableSortContext = ({
  children,
  items,
  activeId,
  dragOverlayTitle
}: EditableSortContextProps): React.JSX.Element => {
  // Simple wrapper - all drag/drop logic is handled by native components
  return (
    <>
      {children}
      <ToolstripDragOverlay
        activeId={ activeId }
        title={ dragOverlayTitle }
      />
    </>
  )
}
