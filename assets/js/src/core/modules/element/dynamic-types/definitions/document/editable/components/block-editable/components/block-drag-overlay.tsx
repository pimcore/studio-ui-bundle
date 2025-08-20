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
import { IconButton } from '@Pimcore/components/icon-button/icon-button'

export interface BlockDragOverlayProps {
  activeId: string | null
  t: (key: string) => string
}

export const BlockDragOverlay = ({ activeId, t }: BlockDragOverlayProps): React.JSX.Element => {
  return (
    <DragOverlay dropAnimation={ null }>
      {activeId !== null
        ? (
          <div style={ {
            padding: '8px 12px',
            backgroundColor: '#fff',
            border: '2px dashed #722ed1',
            borderRadius: '6px',
            boxShadow: '0 2px 8px rgba(114, 46, 209, 0.15)',
            opacity: 0.9,
            display: 'inline-flex',
            alignItems: 'center',
            transform: 'translate(10px, -10px)' // Offset from cursor
          } }
          >
            <div style={ {
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#722ed1',
              fontSize: '14px',
              fontWeight: 500
            } }
            >
              <IconButton
                icon={ { value: 'drag-option' } }
                style={ {
                  cursor: 'grabbing',
                  color: '#722ed1',
                  pointerEvents: 'none'
                } }
              />
              <span>{t('moving-block')}</span>
            </div>
          </div>
          )
        : null}
    </DragOverlay>
  )
}
