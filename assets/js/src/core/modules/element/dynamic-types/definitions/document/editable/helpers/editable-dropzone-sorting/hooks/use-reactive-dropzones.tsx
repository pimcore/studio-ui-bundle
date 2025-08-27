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
import { isNull } from 'lodash'
import { useEditableDropzoneStyles } from '../components/editable-dropzone/editable-dropzone.styles'
import { EditableDropzone } from '../components/editable-dropzone/editable-dropzone'
import { DROPZONE_ATTRIBUTES } from '../constants/dropzone-constants'
import { type EditableManager } from './use-editable-dropzones'

export interface UseReactiveDropzonesProps<T extends EditableManager> {
  editableManager: T
  onMoveItem: (fromIndex: number, toIndex: number) => void
  onDropItem?: (info: any, index: number) => Promise<void>
  isValidDrop?: (info: any) => boolean
}

export interface UseReactiveDropzonesReturn {
  activeId: string | null
  handleDragStart: (event: DragStartEvent) => void
  handleDragOver: (event: DragOverEvent) => void
  handleDragEnd: (event: DragEndEvent) => void
  dropzonePortals: React.ReactPortal[]
}

interface DropzonePosition {
  id: string
  container: HTMLElement
  position: 'before' | 'after'
  elementIndex?: number
}

export const useReactiveDropzones = <T extends EditableManager>({
  editableManager,
  onMoveItem,
  onDropItem,
  isValidDrop
}: UseReactiveDropzonesProps<T>): UseReactiveDropzonesReturn => {
  const { styles } = useEditableDropzoneStyles()
  const [activeId, setActiveId] = useState<string | null>(null)
  const [dropzonePositions, setDropzonePositions] = useState<DropzonePosition[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const observerRef = useRef<MutationObserver | null>(null)

  const container = useMemo(() => editableManager.getContainer(), [editableManager])
  const editableName = useMemo(() => container?.getAttribute(DROPZONE_ATTRIBUTES.DATA_NAME) ?? null, [container])

  // Calculate dropzone positions from current elements
  const calculateDropzonePositions = useCallback((): DropzonePosition[] => {
    const elements = editableManager.queryElements()
    const positions: DropzonePosition[] = []

    if (isNull(container)) return positions

    if (elements.length === 0) {
      // Empty container gets one dropzone
      positions.push({
        id: `${editableName}-empty`,
        container,
        position: 'after'
      })
    } else {
      // Before first element
      positions.push({
        id: `${editableName}-before-${0}`,
        container: elements[0].parentElement ?? container,
        position: 'before',
        elementIndex: 0
      })

      // After each element
      elements.forEach((element, index) => {
        positions.push({
          id: `${editableName}-after-${index}`,
          container: element,
          position: 'after',
          elementIndex: index
        })
      })
    }

    return positions
  }, [editableManager, container, editableName])

  // Create React portals for dropzones
  const dropzonePortals = useMemo((): React.ReactPortal[] => {
    if (!isDragging) return []

    return dropzonePositions.map(position => {
      const dropzone = (
        <EditableDropzone
          className={styles.dropzone}
          editableName={editableName}
          id={position.id}
          isValidDrop={isValidDrop}
          key={position.id}
          onDropItem={onDropItem}
        />
      )

      // Create a dropzone container div
      const dropzoneContainer = document.createElement('div')
      dropzoneContainer.className = 'pimcore-editable-dropzone-container'
      dropzoneContainer.style.cssText = `
        position: relative;
        height: 0;
        ${position.position === 'before' ? 'margin-bottom: 8px;' : 'margin-top: 8px;'}
      `

      // Insert the container in the right position
      if (position.position === 'before' && position.container.parentNode) {
        position.container.parentNode.insertBefore(dropzoneContainer, position.container)
      } else {
        position.container.appendChild(dropzoneContainer)
      }

      // Clean up container when portal unmounts
      const cleanupContainer = () => {
        if (dropzoneContainer.parentNode) {
          dropzoneContainer.parentNode.removeChild(dropzoneContainer)
        }
      }

      // Store cleanup function on the container for later use
      ;(dropzoneContainer as any).__cleanup = cleanupContainer

      return ReactDOM.createPortal(dropzone, dropzoneContainer)
    })
  }, [dropzonePositions, isDragging, editableName, styles.dropzone, isValidDrop, onDropItem])

  // Clean up dropzone containers when dragging stops
  useEffect(() => {
    if (!isDragging) {
      // Clean up any remaining dropzone containers
      const containers = document.querySelectorAll('.pimcore-editable-dropzone-container')
      containers.forEach(container => {
        const cleanup = (container as any).__cleanup
        if (cleanup) cleanup()
      })
    }
  }, [isDragging])

  // Set up mutation observer to watch for DOM changes
  useEffect(() => {
    if (!container) return

    observerRef.current = new MutationObserver(() => {
      setDropzonePositions(calculateDropzonePositions())
    })

    observerRef.current.observe(container, {
      childList: true,
      subtree: true
    })

    // Initial calculation
    setDropzonePositions(calculateDropzonePositions())

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [container, calculateDropzonePositions])

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string)
    setIsDragging(true)
  }, [])

  const handleDragOver = useCallback((event: DragOverEvent) => {
    // Handle drag over logic if needed
  }, [])

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      // Extract indices from IDs and call onMoveItem
      const activeIndex = parseInt(active.id.toString().split('-').pop() ?? '0')
      const overIndex = parseInt(over.id.toString().split('-').pop() ?? '0')
      
      if (!isNaN(activeIndex) && !isNaN(overIndex)) {
        onMoveItem(activeIndex, overIndex)
      }
    }

    setActiveId(null)
    setIsDragging(false)
  }, [onMoveItem])

  return {
    activeId,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    dropzonePortals
  }
}
