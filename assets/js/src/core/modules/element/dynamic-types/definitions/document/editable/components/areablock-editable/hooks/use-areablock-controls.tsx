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
import { useAreablockEditableStyles } from '../areablock-editable.styles'
import { type AreablockManager } from '../utils/areablock-manager'
import { type AreaType } from '../areablock-editable'
import ReactDOM from 'react-dom'
import { useTranslation } from 'react-i18next'
import { AreablockDragOverlay } from '../components/areablock-drag-overlay/areablock-drag-overlay'
import { SortableAreablockToolbar } from '../components/sortable-areablock-toolbar/sortable-areablock-toolbar'
import { EmptyStateAreablockToolbar } from '../components/empty-state-areablock-toolbar/empty-state-areablock-toolbar'
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

export interface UseAreablockControlsParams {
  areablockManager: AreablockManager
  areaTypes: AreaType[]
  onAddArea: (element: HTMLElement | null, areaType?: string) => Promise<void>
  onRemoveArea: (element: HTMLElement) => void
  onMoveAreaUp: (element: HTMLElement) => void
  onMoveAreaDown: (element: HTMLElement) => void
  onMoveArea: (fromIndex: number, toIndex: number) => void
}

export interface UseAreablockControlsReturn {
  updateControls: (element: HTMLElement, limitReached: boolean) => void
  initializeControls: () => void
  clearEmptyState: () => void
  renderAreablockToolbar: () => React.JSX.Element
}

export const useAreablockControls = ({
  areablockManager,
  areaTypes,
  onAddArea,
  onRemoveArea,
  onMoveAreaUp,
  onMoveAreaDown,
  onMoveArea
}: UseAreablockControlsParams): UseAreablockControlsReturn => {
  const { styles } = useAreablockEditableStyles()
  const { t } = useTranslation()
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

    const allAreaEntries = areablockManager.queryElements()
    allAreaEntries.forEach(element => {
      const key = areablockManager.getElementKey(element)

      if (key === over?.id) {
        element.classList.add(styles.dragDropTarget)
      } else {
        element.classList.remove(styles.dragDropTarget)
      }
    })
  }, [areablockManager, styles])

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event

    setActiveId(null)

    const allAreaEntries = areablockManager.queryElements()
    allAreaEntries.forEach(element => {
      element.style.transform = ''
      element.style.transition = ''
      element.classList.remove(styles.dragActive, styles.dragDropTarget)
    })

    if (over !== null && active.id !== over.id) {
      const currentAreaEntries = areablockManager.queryElements()

      const originalActiveIndex = currentAreaEntries.findIndex(el => areablockManager.getElementKey(el) === active.id)
      const originalOverIndex = currentAreaEntries.findIndex(el => areablockManager.getElementKey(el) === over.id)

      if (originalActiveIndex !== -1 && originalOverIndex !== -1 && originalActiveIndex !== originalOverIndex) {
        onMoveArea(originalActiveIndex, originalOverIndex)
      }
    }
  }, [areablockManager, onMoveArea, styles])

  const updateControls = useCallback((element: HTMLElement, limitReached: boolean) => {
    const buttonsContainer = element.querySelector('.pimcore_area_buttons')

    if (isNull(buttonsContainer)) {
      return
    }

    limitReachedRef.current = limitReached

    const buttonElements = buttonsContainer.querySelectorAll('.pimcore_area_plus, .pimcore_area_minus, .pimcore_area_up, .pimcore_area_down, .pimcore_area_type')
    buttonElements.forEach(button => {
      (button as HTMLElement).style.display = 'none'
    })
  }, [])

  const initializeControls = useCallback((): void => {
    const container = areablockManager.getContainer()
    if (isNull(container)) return

    if (emptyStatePortal !== null) return

    const emptyStateToolbar = (
      <EmptyStateAreablockToolbar
        areaTypes={ areaTypes }
        onClick={ async (areaType) => {
          setEmptyStatePortal(null)

          setTimeout(() => {
            void onAddArea(null, areaType)
          }, 0)
        } }
      />
    )

    const portal = ReactDOM.createPortal(emptyStateToolbar, container)
    setEmptyStatePortal(portal)
  }, [areablockManager, areaTypes, onAddArea, emptyStatePortal])

  const clearEmptyState = useCallback((): void => {
    setEmptyStatePortal(null)
  }, [])

  const renderAreablockToolbar = useCallback((): React.JSX.Element => {
    const portals: React.ReactPortal[] = []

    const currentAreaEntries = areablockManager.queryElements()

    if (currentAreaEntries.length === 0 && emptyStatePortal !== null) {
      portals.push(emptyStatePortal)
    }

    const areaKeys = currentAreaEntries
      .map(entry => areablockManager.getElementKey(entry))
      .filter((key): key is string => Boolean(key))

    currentAreaEntries.forEach(areaEntry => {
      const buttonsContainer = areaEntry.querySelector('.pimcore_area_buttons')
      if (buttonsContainer !== null) {
        const areaKey = areablockManager.getElementKey(areaEntry)

        if (areaKey !== null) {
          const sortableToolbar = (
            <SortableAreablockToolbar
              activeId={ activeId }
              areaTypes={ areaTypes }
              areablockManager={ areablockManager }
              buttonsContainer={ buttonsContainer as HTMLElement }
              element={ areaEntry }
              id={ areaKey }
              limitReached={ limitReachedRef.current }
              onAddArea={ onAddArea }
              onMoveAreaDown={ onMoveAreaDown }
              onMoveAreaUp={ onMoveAreaUp }
              onRemoveArea={ onRemoveArea }
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
          items={ areaKeys }
          strategy={ verticalListSortingStrategy }
        >
          <>{portals}</>
        </SortableContext>
        <AreablockDragOverlay
          activeId={ activeId }
          t={ t }
        />
      </DndContext>
    )
  }, [areablockManager, areaTypes, sensors, handleDragStart, handleDragOver, handleDragEnd, onAddArea, onRemoveArea, onMoveAreaUp, onMoveAreaDown, t, activeId, emptyStatePortal])

  const cleanupControls = useCallback(() => {
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
    renderAreablockToolbar
  }
}
