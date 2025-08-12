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
import { EmptyStateBlockToolbar } from '../components/empty-state-block-toolbar'
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
  blockManager: BlockManager
  onAddBlock: (element: HTMLElement | null, amount?: number) => void
  onRemoveBlock: (element: HTMLElement) => void
  onMoveBlockUp: (element: HTMLElement) => void
  onMoveBlockDown: (element: HTMLElement) => void
  onMoveBlock: (fromIndex: number, toIndex: number) => void
}

export interface UseBlockControlsReturn {
  updateControls: (element: HTMLElement, limitReached: boolean) => void
  initializeControls: () => void
  clearEmptyState: () => void
  renderBlockToolbar: () => React.JSX.Element
}

export const useBlockControls = ({
  blockManager,
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
  const [emptyStatePortal, setEmptyStatePortal] = useState<React.ReactPortal | null>(null)

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
    setActiveId(event.active.id as string)
  }, [])

  const handleDragOver = useCallback((event: DragOverEvent) => {
    const { over } = event

    const allBlockEntries = blockManager.queryElements()
    allBlockEntries.forEach(element => {
      const key = blockManager.getElementKey(element)

      if (key === over?.id) {
        element.classList.add(styles.dragDropTarget)
      } else {
        element.classList.remove(styles.dragDropTarget)
      }
    })
  }, [blockManager, styles])

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event

    setActiveId(null)

    const allBlockEntries = blockManager.queryElements()
    allBlockEntries.forEach(element => {
      element.style.transform = ''
      element.style.transition = ''
      element.classList.remove(styles.dragActive, styles.dragDropTarget)
    })

    if (over !== null && active.id !== over.id) {
      const currentBlockEntries = blockManager.queryElements()

      const originalActiveIndex = currentBlockEntries.findIndex(el => blockManager.getElementKey(el) === active.id)
      const originalOverIndex = currentBlockEntries.findIndex(el => blockManager.getElementKey(el) === over.id)

      if (originalActiveIndex !== -1 && originalOverIndex !== -1 && originalActiveIndex !== originalOverIndex) {
        onMoveBlock(originalActiveIndex, originalOverIndex)
      }
    }
  }, [blockManager, onMoveBlock, styles])

  const updateControls = useCallback((element: HTMLElement, limitReached: boolean) => {
    const buttonsContainer = element.querySelector('.pimcore_block_buttons')

    if (isNull(buttonsContainer)) {
      return
    }

    limitReachedRef.current = limitReached

    const buttonElements = buttonsContainer.querySelectorAll('.pimcore_block_plus, .pimcore_block_minus, .pimcore_block_up, .pimcore_block_down, .pimcore_block_amount')
    buttonElements.forEach(button => {
      (button as HTMLElement).style.display = 'none'
    })
  }, [])

  const initializeControls = useCallback((): void => {
    const container = blockManager.getContainer()
    if (isNull(container)) return

    if (emptyStatePortal !== null) return

    const emptyStateToolbar = (
      <EmptyStateBlockToolbar
        onClick={ () => {
          setEmptyStatePortal(null)

          setTimeout(() => {
            onAddBlock(null, 1)
          }, 0)
        } }
      />
    )

    const portal = ReactDOM.createPortal(emptyStateToolbar, container)
    setEmptyStatePortal(portal)
  }, [blockManager, onAddBlock, emptyStatePortal])

  const clearEmptyState = useCallback((): void => {
    setEmptyStatePortal(null)
  }, [])

  const renderBlockToolbar = useCallback((): React.JSX.Element => {
    const portals: React.ReactPortal[] = []

    const currentBlockEntries = blockManager.queryElements()
    const validContainerIds = new Set<string>()

    if (currentBlockEntries.length === 0 && emptyStatePortal !== null) {
      portals.push(emptyStatePortal)
    }

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

    portalContainersRef.current.clear()

    const blockKeys = currentBlockEntries
      .map(entry => blockManager.getElementKey(entry))
      .filter((key): key is string => Boolean(key))

    currentBlockEntries.forEach(blockEntry => {
      const buttonsContainer = blockEntry.querySelector('.pimcore_block_buttons')
      if (buttonsContainer !== null) {
        portalContainersRef.current.set(buttonsContainer as HTMLElement, blockEntry)
        const blockKey = blockManager.getElementKey(blockEntry)

        if (blockKey !== null) {
          const sortableToolbar = (
            <SortableBlockToolbar
              activeId={ activeId }
              blockManager={ blockManager }
              buttonsContainer={ buttonsContainer as HTMLElement }
              element={ blockEntry }
              id={ blockKey }
              limitReached={ limitReachedRef.current }
              onAddBlock={ onAddBlock }
              onMoveBlockDown={ onMoveBlockDown }
              onMoveBlockUp={ onMoveBlockUp }
              onRemoveBlock={ onRemoveBlock }
            />
          )
          const portal = ReactDOM.createPortal(sortableToolbar, buttonsContainer)
          portals.push(portal)
        }
      }
    })

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
  }, [blockManager, sensors, handleDragStart, handleDragOver, handleDragEnd, onAddBlock, onRemoveBlock, onMoveBlockUp, onMoveBlockDown, t, activeId, emptyStatePortal])

  const cleanupControls = useCallback(() => {
    portalContainersRef.current.clear()
    setEmptyStatePortal(null)
  }, [])

  useEffect(() => {
    return () => {
      cleanupControls()
    }
  }, [cleanupControls])

  return {
    updateControls,
    initializeControls,
    clearEmptyState,
    renderBlockToolbar
  }
}
