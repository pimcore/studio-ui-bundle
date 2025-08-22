/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { type DragStartEvent, type DragOverEvent, type DragEndEvent } from '@dnd-kit/core'
import { EditableDropzone } from '../components/editable-dropzone/editable-dropzone'
import { EnhancedEditableDropzone } from '../components/editable-dropzone/enhanced-editable-dropzone'
import { useEditableDropzoneStyles } from '../components/editable-dropzone/editable-dropzone.styles'
import {
  DROPZONE_ATTRIBUTES,
  DROPZONE_CONFIG
} from '../constants/dropzone-constants'
import {
  updateDropzoneVisibility,
  updateDropzoneDragStates,
  removeExistingDropzones,
  injectDropzoneContainers
} from '../utils/dom-utils'
import { type EditableManager, type UseEditableDropzoneSortingReturn } from './use-editable-dropzone-sorting'

export interface UseEnhancedEditableDropzoneSortingProps<T extends EditableManager> {
  editableManager: T
  onMoveItem: (fromIndex: number, toIndex: number) => void
  onAddAreaAtIndex?: (areaType: string, index: number) => Promise<void>
  config?: any // Areablock config for type validation
}

export const useEnhancedEditableDropzoneSorting = <T extends EditableManager>({
  editableManager,
  onMoveItem,
  onAddAreaAtIndex,
  config
}: UseEnhancedEditableDropzoneSortingProps<T>): UseEditableDropzoneSortingReturn => {
  const { styles } = useEditableDropzoneStyles()
  const [activeId, setActiveId] = useState<string | null>(null)
  const [dropzonePortals, setDropzonePortals] = useState<React.ReactPortal[]>([])
  const [dropzoneRefreshKey, setDropzoneRefreshKey] = useState<number>(0)
  const isDraggingRef = useRef<boolean>(false)
  const activeDropzoneRef = useRef<string | null>(null)

  const container = useMemo(() => editableManager.getContainer(), [editableManager])
  const editableName = useMemo(() => container?.getAttribute('data-editable-name') ?? 'unknown', [container])
  const currentElements = useMemo(() => editableManager.queryElements(), [editableManager, dropzoneRefreshKey])

  const injectDropzones = useCallback(() => {
    if (container === null) return

    removeExistingDropzones(container, editableName)
    injectDropzoneContainers(currentElements, editableName)
  }, [container, editableName, currentElements])

  const updateStyles = useCallback(() => {
    if (container === null) return

    updateDropzoneVisibility(editableName, isDraggingRef.current)
    updateDropzoneDragStates(container, activeDropzoneRef.current, isDraggingRef.current)
  }, [container, editableName])

  const updateDropzones = useCallback(() => {
    if (container === null) return

    injectDropzones()

    const dropzoneContainers = container?.querySelectorAll(`[${DROPZONE_ATTRIBUTES.DATA_EDITABLE_DROPZONE}="${editableName}"]`)
    const newPortals: React.ReactPortal[] = []

    dropzoneContainers?.forEach((containerElement, index) => {
      const dropzoneId = `${DROPZONE_CONFIG.ID_PREFIX}${index}`
      
      // Use enhanced dropzone if we have onAddAreaAtIndex callback
      const dropzone = onAddAreaAtIndex !== undefined ? (
        <EnhancedEditableDropzone
          id={dropzoneId}
          index={index}
          config={config}
          onAddAreaAtIndex={onAddAreaAtIndex}
          key={dropzoneId}
        />
      ) : (
        <EditableDropzone
          id={dropzoneId}
          index={index}
          key={dropzoneId}
        />
      )
      
      const portal = ReactDOM.createPortal(dropzone, containerElement)
      newPortals.push(portal)
    })

    setDropzonePortals(newPortals)
  }, [injectDropzones, container, editableName, currentElements.length, onAddAreaAtIndex, config])

  useEffect(() => {
    updateStyles()
  }, [updateStyles, activeId])

  // Add native drag event listeners for cross-iframe drag and drop
  useEffect(() => {
    if (container === null) return

    const handleDragInfoChange = (event: CustomEvent<any>) => {
      const dragInfo = event.detail
      if (dragInfo?.type === 'areablock-type' && dragInfo?.data?.sourceType === 'sidebar') {
        // Dragging started from sidebar
        isDraggingRef.current = true
        updateDropzoneVisibility(editableName, true)
        updateStyles()
      } else if (dragInfo === null) {
        // Dragging ended
        isDraggingRef.current = false
        activeDropzoneRef.current = null
        updateDropzoneVisibility(editableName, false)
        updateStyles()
      }
    }

    // Determine which window to listen on - parent if we're in iframe, current otherwise
    const targetWindow = window !== window.parent ? window.parent : window

    // Listen for the custom drag info change event from Draggable component
    targetWindow.addEventListener('studioui:draggable:change-drag-info', handleDragInfoChange as EventListener)

    return () => {
      targetWindow.removeEventListener('studioui:draggable:change-drag-info', handleDragInfoChange as EventListener)
    }
  }, [container, editableName, updateStyles])

  useEffect(() => {
    updateStyles()
  }, [updateStyles, activeId])

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const activeElementId = String(event.active.id)
    setActiveId(activeElementId)
    isDraggingRef.current = true
    activeDropzoneRef.current = null

    updateDropzoneVisibility(editableName, true)
  }, [container])

  const handleDragOver = useCallback((event: DragOverEvent) => {
    if (event.over?.id !== undefined) {
      activeDropzoneRef.current = String(event.over.id)
    } else {
      activeDropzoneRef.current = null
    }
    updateStyles()
  }, [updateStyles])

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    setActiveId(null)
    isDraggingRef.current = false
    activeDropzoneRef.current = null

    updateDropzoneVisibility(editableName, false)

    const { active, over } = event

    if (over?.id !== undefined && active.id !== over.id) {
      const activeElementId = String(active.id)
      const overDropzoneId = String(over.id)

      const activeElement = currentElements.find(element => {
        const key = editableManager.getElementKey(element)
        return key === activeElementId
      })

      if (activeElement !== undefined) {
        const fromIndex = currentElements.indexOf(activeElement)
        const toIndex = parseInt(overDropzoneId.replace(DROPZONE_CONFIG.ID_PREFIX, ''), 10)

        if (!isNaN(toIndex) && fromIndex !== toIndex) {
          onMoveItem(fromIndex, toIndex)
        }
      }
    }
  }, [container, currentElements, editableManager, onMoveItem])

  const refreshDropzones = useCallback(() => {
    setDropzoneRefreshKey(prev => prev + 1)
  }, [])

  useEffect(() => {
    updateDropzones()
  }, [updateDropzones])

  return {
    activeId,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    dropzonePortals,
    refreshDropzones
  }
}
