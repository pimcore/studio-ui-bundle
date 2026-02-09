/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isString, isNull, isNil } from 'lodash'
import { type HotspotPosition, type HotspotArea } from '../hotspot-droppable'
import { type DragAndDropInfo } from '../droppable'

export type DragState = 'inactive' | 'active' | 'valid' | 'error'

export interface HotspotState {
  dragState: DragState
  isContextValid: boolean
  isDataValid: boolean
}

export const formatPositionValue = (value: number | string): string => {
  if (isString(value)) {
    return value
  }
  // If it's a number between 0-100, treat as percentage, otherwise as pixels
  return value <= 100 ? `${value}%` : `${value}px`
}

export const getHotspotStyles = (position: HotspotPosition): React.CSSProperties => {
  return {
    position: 'absolute',
    left: formatPositionValue(position.x),
    top: formatPositionValue(position.y),
    width: !isNil(position.width) ? formatPositionValue(position.width) : '20px',
    height: !isNil(position.height) ? formatPositionValue(position.height) : '20px'
  }
}

export const createHotspotHandlers = (
  hotspot: HotspotArea,
  hotspotStates: Record<string, HotspotState>,
  updateHotspotDragState: (hotspotId: string, state: DragState) => void,
  isInfoValidForHotspot: (hotspotId: string) => boolean,
  dragInfoRef: React.MutableRefObject<DragAndDropInfo | null>
): { handleDragOver: (e: React.DragEvent) => void, handleDragLeave: (e: React.DragEvent) => void, handleDrop: (e: React.DragEvent) => void } => {
  const handleDragOver = (e: React.DragEvent): void => {
    e.preventDefault()

    if (isNull(dragInfoRef.current) || !hotspotStates[hotspot.id]?.isContextValid) {
      updateHotspotDragState(hotspot.id, 'inactive')
      return
    }

    e.stopPropagation()
    const isValid = isInfoValidForHotspot(hotspot.id)
    updateHotspotDragState(hotspot.id, isValid ? 'valid' : 'error')
  }

  const handleDragLeave = (e: React.DragEvent): void => {
    e.preventDefault()

    if (hotspotStates[hotspot.id]?.isContextValid) {
      updateHotspotDragState(hotspot.id, !isNull(dragInfoRef.current) ? 'active' : 'inactive')
    }
  }

  const handleDrop = (e: React.DragEvent): void => {
    e.preventDefault()
    updateHotspotDragState(hotspot.id, 'inactive')
    if (isInfoValidForHotspot(hotspot.id)) {
      const dragInfo = dragInfoRef.current!
      // Delay the onDrop callback to allow the drag cycle to complete
      // This ensures handleDragEnd fires and cleans up the overlay before
      // any state changes from onDrop cause component re-renders
      setTimeout(() => {
        hotspot.onDrop(dragInfo)
      }, 0)
    }
  }

  return { handleDragOver, handleDragLeave, handleDrop }
}
