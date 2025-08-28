/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback, useEffect, useMemo, useState, useTransition, useRef } from 'react'
import ReactDOM from 'react-dom'
import { isNull } from 'lodash'
import { EditableDropzone } from '../components/editable-dropzone/editable-dropzone'
import {
  DROPZONE_ATTRIBUTES,
  DROPZONE_CONFIG
} from '../constants/dropzone-constants'
import {
  updateDropzoneContainers,
  removeDropzoneContainers,
  removeFirstDropzoneContainer
} from '../utils/dom-utils'

// Generic manager interface that both BlockManager and AreablockManager can implement
export interface EditableManager {
  getContainer: () => HTMLElement | null
  queryElements: () => HTMLElement[]
  getElementKey: (element: HTMLElement) => string | null
  getElementType?: (element: HTMLElement) => string | null
}

export interface UseEditableDropzonesProps<T extends EditableManager> {
  editableManager: T
  onMoveItem: (fromIndex: number, toIndex: number) => void
  onDropItem?: (info: any, index: number) => Promise<void>
  isValidDrop?: (info: any) => boolean
}

export interface UseEditableDropzonesReturn {
  activeId: string | null
  dropzonePortals: React.ReactPortal[]
  refreshDropzones: () => void
  addDropzonePortal: (containerElement: HTMLElement) => void
  removeFirstDropzone: () => void
  // No drag handlers needed - handled by native components
}

export const useEditableDropzones = <T extends EditableManager>({
  editableManager,
  onMoveItem,
  onDropItem,
  isValidDrop
}: UseEditableDropzonesProps<T>): UseEditableDropzonesReturn => {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [dropzonePortals, setDropzonePortals] = useState<React.ReactPortal[]>([])
  const [dropzoneRefreshKey, setDropzoneRefreshKey] = useState<number>(0)
  const [, startTransition] = useTransition()

  // Stable refs to avoid infinite loops
  const onMoveItemRef = useRef(onMoveItem)
  const onDropItemRef = useRef(onDropItem)
  const isValidDropRef = useRef(isValidDrop)
  const editableManagerRef = useRef(editableManager)

  // Update refs without causing re-renders
  useEffect(() => {
    onMoveItemRef.current = onMoveItem
    onDropItemRef.current = onDropItem
    isValidDropRef.current = isValidDrop
    editableManagerRef.current = editableManager
  })

  const container = useMemo(() => editableManager.getContainer(), [editableManager])
  const editableName = useMemo(() => container?.getAttribute(DROPZONE_ATTRIBUTES.DATA_NAME) ?? null, [container])

  const currentElements = useMemo(() => {
    return editableManager.queryElements()
  }, [editableManager, dropzoneRefreshKey])

  const refreshDropzones = useCallback((): void => {
    startTransition(() => {
      setDropzoneRefreshKey(prev => prev + 1)
    })
  }, [startTransition])

  const addDropzonePortal = useCallback((containerElement: HTMLElement) => {
    // Find all existing dropzone containers to determine the index
    const dropzoneContainers = container?.querySelectorAll(`[${DROPZONE_ATTRIBUTES.DATA_EDITABLE_DROPZONE}="${editableName}"]`)
    const index = Array.from(dropzoneContainers ?? []).indexOf(containerElement)

    if (index !== -1) {
      // Use element key and position for unique dropzone ID
      const elementKey = containerElement.getAttribute(DROPZONE_ATTRIBUTES.DATA_ELEMENT_KEY)
      const position = containerElement.getAttribute(DROPZONE_ATTRIBUTES.DATA_DROPZONE_POSITION)
      const isFirst = containerElement.getAttribute(DROPZONE_ATTRIBUTES.DATA_FIRST_DROPZONE) === 'true'
      
      let dropzoneId: string
      if (isFirst) {
        dropzoneId = `${DROPZONE_CONFIG.ID_PREFIX}first`
      } else if (elementKey && position) {
        dropzoneId = `${DROPZONE_CONFIG.ID_PREFIX}${elementKey}-${position}`
      } else {
        dropzoneId = `${DROPZONE_CONFIG.ID_PREFIX}${index}` // fallback
      }
      
      const dropzone = (
        <EditableDropzone
          id={ dropzoneId }
          index={ index }
          isValidDrop={ isValidDropRef.current }
          key={ dropzoneId }
          onDropItem={ onDropItemRef.current }
          onMoveItem={ onMoveItemRef.current }
          editableManager={ editableManagerRef.current }
        />
      )
      const portal = ReactDOM.createPortal(dropzone, containerElement)

      setDropzonePortals(prev => [...prev, portal])
    }
  }, [container, editableName])

  const removeFirstDropzone = useCallback((): void => {
    removeFirstDropzoneContainer(container, editableName)
  }, [container, editableName])

  // Create dropzone portals when elements change
  useEffect(() => {
    if (currentElements.length === 0) {
      setDropzonePortals([])
      removeDropzoneContainers(container, editableName)
      return
    }

    if (!isNull(container) && dropzoneRefreshKey === 0) {
      updateDropzoneContainers(currentElements, editableName, editableManagerRef.current.getElementKey)
    }

    const dropzoneContainers = container?.querySelectorAll(`[${DROPZONE_ATTRIBUTES.DATA_EDITABLE_DROPZONE}="${editableName}"]`)
    const newPortals: React.ReactPortal[] = []

    dropzoneContainers?.forEach((containerElement, index) => {
      // Use element key and position to create unique dropzone IDs
      const elementKey = containerElement.getAttribute(DROPZONE_ATTRIBUTES.DATA_ELEMENT_KEY)
      const position = containerElement.getAttribute(DROPZONE_ATTRIBUTES.DATA_DROPZONE_POSITION)
      const isFirst = containerElement.getAttribute(DROPZONE_ATTRIBUTES.DATA_FIRST_DROPZONE) === 'true'
      
      let dropzoneId: string
      if (isFirst) {
        dropzoneId = `${DROPZONE_CONFIG.ID_PREFIX}first`
      } else if (elementKey && position) {
        dropzoneId = `${DROPZONE_CONFIG.ID_PREFIX}${elementKey}-${position}`
      } else {
        dropzoneId = `${DROPZONE_CONFIG.ID_PREFIX}${index}` // fallback
      }
      
      const dropzone = (
        <EditableDropzone
          id={ dropzoneId }
          index={ index }
          isValidDrop={ isValidDropRef.current }
          key={ dropzoneId }
          onDropItem={ onDropItemRef.current }
          onMoveItem={ onMoveItemRef.current }
          editableManager={ editableManagerRef.current }
        />
      )
      const portal = ReactDOM.createPortal(dropzone, containerElement)
      newPortals.push(portal)
    })

    setDropzonePortals(newPortals)
  }, [container, editableName, currentElements.length, dropzoneRefreshKey])

  return {
    activeId,
    dropzonePortals,
    refreshDropzones,
    addDropzonePortal,
    removeFirstDropzone
  }
}
