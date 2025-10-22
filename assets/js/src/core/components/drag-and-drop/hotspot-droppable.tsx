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
  /** Optional content to render within the hotspot area */
  children?: ReactNode
  /**
   * CSS class name to be applied to external DOM elements to make them droppable targets.
   * When specified, all elements with this class will receive the same drag and drop functionality as this hotspot.
   */
  dropClass?: string
}

export interface HotspotDroppableProps {
  className?: string
  children: ReactNode
  hotspots: HotspotArea[]
  disabled?: boolean
  /**
   * If true, it does not update the drag state to 'active' when a drag operation starts. The active state is useful
   * for visually indicating all eligible drop zones before an item is dragged over them. For performance reasons,
   * it is recommended to set this to true if the active indicator is not needed or re-rendering would be too resource intensive.
   */
  disableDndActiveIndicator?: boolean
  /**
   * Distance in pixels to trigger cursor proximity animations
   * @default 100
   */
  proximityThreshold?: number
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
