/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { isNull } from 'lodash'
import { useBlockEditableStyles } from '../block-editable.styles'
import { type BlockManager } from '../utils/block-manager'
import ReactDOM from 'react-dom'
import { useTranslation } from 'react-i18next'
import { BlockDragOverlay } from '../components/block-drag-overlay/block-drag-overlay'
import { SortableBlockToolbar } from '../components/sortable-block-toolbar'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  type DragOverEvent
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'

export interface UseBlockControlsParams {
  editableName: string
  onAddBlock: (element: HTMLElement | null, amount?: number) => void
  onRemoveBlock: (element: HTMLElement) => void
  onMoveBlockUp: (element: HTMLElement) => void
  onMoveBlockDown: (element: HTMLElement) => void
  onMoveBlock: (fromIndex: number, toIndex: number) => void
}

export interface UseBlockControlsReturn {
  updateControls: (element: HTMLElement, limitReached: boolean) => void
  initializeControls: (blockManager: BlockManager) => void
  renderBlockToolbar: () => React.JSX.Element
  cleanupControls: () => void
}

export const useBlockControls = ({
  editableName,
  onAddBlock,
  onRemoveBlock,
  onMoveBlockUp,
  onMoveBlockDown,
  onMoveBlock
}: UseBlockControlsParams): UseBlockControlsReturn => {
  const { styles } = useBlockEditableStyles()
  const { t } = useTranslation()
  const portalContainersRef = useRef<Map<HTMLElement, HTMLElement>>(new Map())
  const limitReachedRef = useRef<boolean>(false)
  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  const handleDragStart = useCallback((event: DragStartEvent) => {
    console.log('Drag start:', event.active.id)
    setActiveId(event.active.id as string)
  }, [])

  const handleDragOver = useCallback((event: DragOverEvent) => {
    const { over } = event

    const allBlockEntries = document.querySelectorAll('.pimcore_block_entry[data-name="' + editableName + '"][key]')
    allBlockEntries.forEach(entry => {
      const element = entry as HTMLElement
      const key = element.getAttribute('key')

      if (key === over?.id) {
        element.classList.add(styles.dragDropTarget)
      } else {
        element.classList.remove(styles.dragDropTarget)
      }
    })
  }, [editableName, styles])

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event

    console.log('Drag end event:', { active: active.id, over: over?.id })

    setActiveId(null)

    const allBlockEntries = document.querySelectorAll('.pimcore_block_entry[data-name="' + editableName + '"][key]')
    allBlockEntries.forEach(entry => {
      const element = entry as HTMLElement
      element.style.transform = ''
      element.style.transition = ''
      element.classList.remove(styles.dragActive, styles.dragDropTarget)
    })

    if (over !== null && active.id !== over.id) {
      const currentBlockEntries = Array.from(
        document.querySelectorAll('.pimcore_block_entry[data-name="' + editableName + '"][key]')
      )

      console.log('Current block entries:', currentBlockEntries.map(el => el.getAttribute('key')))

      const originalActiveIndex = currentBlockEntries.findIndex(el => el.getAttribute('key') === active.id)
      const originalOverIndex = currentBlockEntries.findIndex(el => el.getAttribute('key') === over.id)

      console.log('Original indices:', { from: originalActiveIndex, to: originalOverIndex })

      if (originalActiveIndex !== -1 && originalOverIndex !== -1 && originalActiveIndex !== originalOverIndex) {
        console.log('Calling onMoveBlock with indices:', originalActiveIndex, originalOverIndex)
        onMoveBlock(originalActiveIndex, originalOverIndex)
      }
    }
  }, [editableName, onMoveBlock, styles])

  const updateControls = useCallback((element: HTMLElement, limitReached: boolean) => {
    console.log('updateControls called for element:', element)

    const buttonsContainer = element.querySelector('.pimcore_block_buttons')

    if (isNull(buttonsContainer)) {
      console.log('No buttons container found')
      return
    }

    console.log('Found buttons container:', buttonsContainer)

    limitReachedRef.current = limitReached

    const buttonElements = buttonsContainer.querySelectorAll('.pimcore_block_plus, .pimcore_block_minus, .pimcore_block_up, .pimcore_block_down, .pimcore_block_amount')
    buttonElements.forEach(button => {
      (button as HTMLElement).style.display = 'none'
    })
  }, [])

  const initializeControls = useCallback((blockManager: BlockManager): void => {
    const container = blockManager.getContainer()
    if (isNull(container)) return

    const plusEl = container.querySelector('.pimcore_block_plus')
    if (!isNull(plusEl)) {
      (plusEl as HTMLElement).style.display = 'none'

      const handleContainerClick = (e: Event): void => {
        const target = e.target as HTMLElement
        if (target.closest('.pimcore_block_plus') !== null) {
          onAddBlock(null, 1)
        }
      }
      container.addEventListener('click', handleContainerClick)
    }
  }, [onAddBlock])

  const renderBlockToolbar = useCallback((): React.JSX.Element => {
    const portals: React.ReactPortal[] = []

    console.log('renderBlockToolbar called, current containers:', portalContainersRef.current.size)

    const currentBlockEntries = document.querySelectorAll('.pimcore_block_entry[data-name="' + editableName + '"][key]')
    const validContainerIds = new Set<string>()

    currentBlockEntries.forEach(blockEntry => {
      const buttonsContainer = blockEntry.querySelector('.pimcore_block_buttons')
      if (buttonsContainer !== null) {
        const containerId = (buttonsContainer as HTMLElement).dataset.containerId ?? Math.random().toString()
        if ((buttonsContainer as HTMLElement).dataset.containerId === undefined) {
          (buttonsContainer as HTMLElement).dataset.containerId = containerId
        }
        validContainerIds.add(containerId)
      }
    })

    console.log('Valid container IDs from DOM:', validContainerIds)

    portalContainersRef.current.clear()

    const blockKeys = Array.from(currentBlockEntries)
      .map(entry => entry.getAttribute('key'))
      .filter((key): key is string => Boolean(key))

    currentBlockEntries.forEach(blockEntry => {
      const buttonsContainer = blockEntry.querySelector('.pimcore_block_buttons')
      if (buttonsContainer !== null) {
        portalContainersRef.current.set(buttonsContainer as HTMLElement, blockEntry as HTMLElement)
        const blockKey = blockEntry.getAttribute('key')

        if (blockKey !== null) {
          const sortableToolbar = (
            <SortableBlockToolbar
              activeId={ activeId }
              buttonsContainer={ buttonsContainer as HTMLElement }
              editableName={ editableName }
              element={ blockEntry as HTMLElement }
              id={ blockKey }
              limitReached={ limitReachedRef.current }
              onAddBlock={ onAddBlock }
              onMoveBlockDown={ onMoveBlockDown }
              onMoveBlockUp={ onMoveBlockUp }
              onRemoveBlock={ onRemoveBlock }
              styles={ styles }
              t={ t }
            />
          )
          const portal = ReactDOM.createPortal(sortableToolbar, buttonsContainer)
          portals.push(portal)
          console.log('Created sortable portal for container')
        }
      }
    })

    console.log('Rebuilt containers, total:', portalContainersRef.current.size)

    return (
      <DndContext
        collisionDetection={ closestCenter }
        onDragEnd={ handleDragEnd }
        onDragOver={ handleDragOver }
        onDragStart={ handleDragStart }
        sensors={ sensors }
      >
        <SortableContext
          items={ blockKeys }
          strategy={ verticalListSortingStrategy }
        >
          <>{portals}</>
        </SortableContext>
        <BlockDragOverlay
          activeId={ activeId }
          t={ t }
        />
      </DndContext>
    )
  }, [editableName, sensors, handleDragStart, handleDragOver, handleDragEnd, onAddBlock, onRemoveBlock, onMoveBlockUp, onMoveBlockDown, t, styles, activeId])

  const cleanupControls = useCallback(() => {
    portalContainersRef.current.clear()
  }, [])

  useEffect(() => {
    return () => {
      cleanupControls()
    }
  }, [cleanupControls])

  return {
    updateControls,
    initializeControls,
    renderBlockToolbar,
    cleanupControls
  }
}
