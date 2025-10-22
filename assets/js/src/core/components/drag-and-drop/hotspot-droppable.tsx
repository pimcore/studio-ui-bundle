/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactNode } from 'react'
import { BaseHotspotDroppable } from './hotspot-droppable/base-hotspot-droppable'
import cn from 'classnames'
import { DroppableContextProvider } from './droppable-context-provider'
import { type DragAndDropInfo } from './droppable'

export interface HotspotPosition {
  /** X coordinate as percentage (0-100) or pixels */
  x: number | string
  /** Y coordinate as percentage (0-100) or pixels */
  y: number | string
  /** Width as percentage (0-100) or pixels */
  width?: number | string
  /** Height as percentage (0-100) or pixels */
  height?: number | string
}

export interface HotspotArea {
  id: string
  /** Position coordinates relative to the container */
  position: HotspotPosition
  className?: string
  variant?: 'default' | 'outline'
  shape?: 'round' | 'angular'
  isValidContext: boolean | ((info: DragAndDropInfo) => boolean)
  isValidData?: ((info: DragAndDropInfo) => boolean)
  onDrop: (info: DragAndDropInfo) => void
  children?: ReactNode
  dropClass?: string
}

export interface HotspotDroppableProps {
  className?: string
  children: ReactNode
  hotspots: HotspotArea[]
  disabled?: boolean
  disableDndActiveIndicator?: boolean
}

export const HotspotDroppable = (props: HotspotDroppableProps): React.JSX.Element | null => {
  if (props.disabled === true) {
    return (
      <div className={ cn(props.className) }>
        <DroppableContextProvider value={ { isDragActive: false, isOver: false, isValid: false, hasValidDrop: false } }>
          {props.children}
        </DroppableContextProvider>
      </div>
    )
  }

  return (
    <BaseHotspotDroppable
      className={ props.className }
      disableDndActiveIndicator={ props.disableDndActiveIndicator }
      hotspots={ props.hotspots }
    >
      { props.children }
    </BaseHotspotDroppable>
  )
}
