/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback, useEffect, useMemo, useRef, useState, useTransition } from 'react'
import ReactDOM from 'react-dom'
import { type DragStartEvent, type DragOverEvent, type DragEndEvent } from '@dnd-kit/core'
import { isNull, isUndefined } from 'lodash'
import { useEditableDropzoneStyles } from '../components/editable-dropzone/editable-dropzone.styles'
import { EditableDropzone } from '../components/editable-dropzone/editable-dropzone'
import {
  DROPZONE_ATTRIBUTES,
  DROPZONE_CONFIG
} from '../constants/dropzone-constants'
import {
  updateDropzoneVisibility,
  updateDropzoneDragStates,
  updateDropzoneContainers,
  removeDropzoneContainers,
  removeFirstDropzoneContainer
} from '../utils/dom-utils'
import { type BlockManagerInterface } from '../../../managers/abstract-block-manager'

export interface UseBlockManagerDropzonesProps<T extends BlockManagerInterface> {
  blockManager: T
  onMoveItem: (fromIndex: number, toIndex: number) => void
  onDropItem?: (info: any, index: number) => Promise<void>
  isValidDrop?: (info: any) => boolean
}

export interface UseBlockManagerDropzonesReturn {
  activeId: string | null
  handleDragStart: (event: DragStartEvent) => void
  handleDragOver: (event: DragOverEvent) => void
  handleDragEnd: (event: DragEndEvent) => void
  dropzonePortals: React.ReactPortal[]
  refreshDropzones: () => void
  addDropzonePortal: (containerElement: HTMLElement) => void
  removeFirstDropzone: () => void
}

export const useBlockManagerDropzones = <T extends BlockManagerInterface>({
  blockManager,
  onMoveItem,
  onDropItem,
  isValidDrop
}: UseBlockManagerDropzonesProps<T>): UseBlockManagerDropzonesReturn => {
  const { styles } = useEditableDropzoneStyles()
  const [activeId, setActiveId] = useState<string | null>(null)
  const [dropzonePortals, setDropzonePortals] = useState<React.ReactPortal[]>([])
  const [dropzoneRefreshKey, setDropzoneRefreshKey] = useState<number>(0)
  const [, startTransition] = useTransition()
  const isDraggingRef = useRef<boolean>(false)
  const activeDropzoneRef = useRef<string | null>(null)

  const container = useMemo(() => blockManager.getContainer(), [blockManager])
  const editableName = useMemo(() => container?.getAttribute(DROPZONE_ATTRIBUTES.DATA_NAME) ?? null, [container])

  const currentElements = useMemo(() => {
    return blockManager.queryElements()
  }, [blockManager, dropzoneRefreshKey])

  const refreshDropzones = useCallback((): void => {
    startTransition(() => {
      setDropzoneRefreshKey(prev => prev + 1)
    })
  }, [startTransition])

  const updateStyles = useCallback(() => {
    updateDropzoneVisibility(editableName, isDraggingRef.current)
    updateDropzoneDragStates(container, activeDropzoneRef.current, isDraggingRef.current)
  }, [container, editableName])

  const addDropzonePortal = useCallback((containerElement: HTMLElement) => {
    // Find all existing dropzone containers to determine the index
    const dropzoneContainers = container?.querySelectorAll(`[${DROPZONE_ATTRIBUTES.DATA_EDITABLE_DROPZONE}="${editableName}"]`)
    const index = Array.from(dropzoneContainers ?? []).indexOf(containerElement)

    if (index !== -1) {
      const dropzoneId = `${DROPZONE_CONFIG.ID_PREFIX}${index}`
      const dropzone = (
        <EditableDropzone
          id={ dropzoneId }
          index={ index }
          isValidDrop={ isValidDrop }
          key={ dropzoneId }
          onDropItem={ onDropItem }
        />
      )
      const portal = ReactDOM.createPortal(dropzone, containerElement)

      setDropzonePortals(prev => [...prev, portal])
    }
  }, [container, editableName, isValidDrop, onDropItem])

  const removeFirstDropzone = useCallback((): void => {
    removeFirstDropzoneContainer(container, editableName)
  }, [container, editableName])

  useEffect(() => {
    if (currentElements.length === 0) {
      setDropzonePortals([])
      removeDropzoneContainers(container, editableName)
      return
    }

    if (!isNull(container) && dropzoneRefreshKey === 0) {
      updateDropzoneContainers(currentElements, editableName)
    }

    const dropzoneContainers = container?.querySelectorAll(`[${DROPZONE_ATTRIBUTES.DATA_EDITABLE_DROPZONE}="${editableName}"]`)
    const newPortals: React.ReactPortal[] = []

    dropzoneContainers?.forEach((containerElement, index) => {
      const dropzoneId = `${DROPZONE_CONFIG.ID_PREFIX}${index}`
      const dropzone = (
        <EditableDropzone
          id={ dropzoneId }
          index={ index }
          isValidDrop={ isValidDrop }
          key={ dropzoneId }
          onDropItem={ onDropItem }
        />
      )
      const portal = ReactDOM.createPortal(dropzone, containerElement)
      newPortals.push(portal)
    })

    setDropzonePortals(newPortals)
  }, [container, editableName, currentElements.length])

  useEffect(() => {
    updateStyles()
  }, [updateStyles, activeId])

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const activeElementId = String(event.active.id)
    setActiveId(activeElementId)
    isDraggingRef.current = true
    activeDropzoneRef.current = null

    const activeElement = currentElements.find(el => blockManager.getElementKey(el) === activeElementId)
    if (!isUndefined(activeElement)) {
      activeElement.classList.add(styles.dragActive)
    }
  }, [styles.dragActive, currentElements, blockManager])

  const handleDragOver = useCallback((event: DragOverEvent) => {
    const { over } = event

    if (!isUndefined(over?.id)) {
      const overId = String(over.id)

      if (overId.startsWith(DROPZONE_CONFIG.ID_PREFIX)) {
        activeDropzoneRef.current = overId
      } else {
        activeDropzoneRef.current = null
      }
    } else {
      activeDropzoneRef.current = null
    }

    updateStyles()
  }, [updateStyles])

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event

    setActiveId(null)
    isDraggingRef.current = false
    activeDropzoneRef.current = null

    currentElements.forEach(element => {
      element.classList.remove(styles.dragActive)
    })

    if (over !== null && active.id !== over.id) {
      const overId = String(over.id)

      if (overId.startsWith(DROPZONE_CONFIG.ID_PREFIX)) {
        const dropzoneElement = document.querySelector(`[${DROPZONE_ATTRIBUTES.DATA_DROPZONE_ID}="${overId}"]`)
        const dropzoneIndexStr = dropzoneElement?.getAttribute(DROPZONE_ATTRIBUTES.DATA_DROPZONE_INDEX)
        const dropzoneIndex = !isNull(dropzoneIndexStr) && !isUndefined(dropzoneIndexStr) && dropzoneIndexStr !== '' ? parseInt(dropzoneIndexStr, 10) : NaN

        if (!isNaN(dropzoneIndex)) {
          const originalActiveIndex = currentElements.findIndex(el => blockManager.getElementKey(el) === active.id)

          if (originalActiveIndex !== -1) {
            let targetIndex = dropzoneIndex
            if (originalActiveIndex < dropzoneIndex) {
              targetIndex = dropzoneIndex - 1
            }

            if (originalActiveIndex !== targetIndex) {
              onMoveItem(originalActiveIndex, targetIndex)
              refreshDropzones()
            }
          }
        }
      }
    }
  }, [currentElements, blockManager, onMoveItem, refreshDropzones, styles.dragActive])

  return {
    activeId,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    dropzonePortals,
    refreshDropzones,
    addDropzonePortal,
    removeFirstDropzone
  }
}
