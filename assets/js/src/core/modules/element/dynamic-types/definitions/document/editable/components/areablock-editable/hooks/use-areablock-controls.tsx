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
import { type AreablockManager } from '../utils/areablock-manager'
import { type AreaType, type AreablockEditableConfig } from '../areablock-editable'
import ReactDOM from 'react-dom'
import { SortableAreablockToolbar } from '../components/sortable-areablock-toolbar/sortable-areablock-toolbar'
import { EmptyStateAreablockToolbar } from '../components/empty-state-areablock-toolbar/empty-state-areablock-toolbar'
import { useAreablockDropzones } from './use-areablock-dropzones'
import { EditableSortContext } from '../../../helpers/editable-dropzone-sorting/editable-sort-context'

export interface UseAreablockControlsParams {
  areablockManager: AreablockManager
  areaTypes: AreaType[]
  config?: AreablockEditableConfig
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
  config,
  onAddArea,
  onRemoveArea,
  onMoveAreaUp,
  onMoveAreaDown,
  onMoveArea
}: UseAreablockControlsParams): UseAreablockControlsReturn => {
  const limitReachedRef = useRef<boolean>(false)
  const [emptyStatePortal, setEmptyStatePortal] = useState<React.ReactPortal | null>(null)

  const handleAddArea = useCallback(async (element: HTMLElement | null, areaType?: string) => {
    await onAddArea(element, areaType)
  }, [onAddArea])

  const {
    activeId,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    dropzonePortals,
    dragOverlayTitle,
    refreshDropzones
  } = useAreablockDropzones({
    areablockManager,
    areaTypes,
    onMoveArea,
    onDropAreablock: async (areaType: string, index: number) => {
      const elements = areablockManager.queryElements()

      if (index === 0) {
        await handleAddArea(null, areaType)
      } else if (index >= elements.length) {
        const lastElement = elements[elements.length - 1]
        await handleAddArea(lastElement, areaType)
      } else {
        const targetElement = elements[index - 1]
        await handleAddArea(targetElement, areaType)
      }

      refreshDropzones()
    }
  })

  const handleAddAreaWithRefresh = useCallback(async (element: HTMLElement | null, areaType?: string) => {
    await handleAddArea(element, areaType)
    refreshDropzones()
  }, [handleAddArea, refreshDropzones])

  const handleRemoveArea = useCallback((element: HTMLElement) => {
    onRemoveArea(element)
    refreshDropzones()
  }, [onRemoveArea, refreshDropzones])

  const handleMoveAreaUp = useCallback((element: HTMLElement) => {
    onMoveAreaUp(element)
    refreshDropzones()
  }, [onMoveAreaUp, refreshDropzones])

  const handleMoveAreaDown = useCallback((element: HTMLElement) => {
    onMoveAreaDown(element)
    refreshDropzones()
  }, [onMoveAreaDown, refreshDropzones])

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
        config={ config }
        onClick={ async (areaType) => {
          setEmptyStatePortal(null)
          await handleAddAreaWithRefresh(null, areaType)
        } }
      />
    )

    const portal = ReactDOM.createPortal(emptyStateToolbar, container)
    setEmptyStatePortal(portal)
  }, [areablockManager, areaTypes, handleAddAreaWithRefresh, emptyStatePortal])

  const clearEmptyState = useCallback((): void => {
    setEmptyStatePortal(null)
  }, [])

  const renderAreablockToolbar = useCallback((): React.JSX.Element => {
    const portals: React.ReactPortal[] = []

    const currentAreaEntries = areablockManager.queryElements()

    if (currentAreaEntries.length === 0 && emptyStatePortal !== null) {
      portals.push(emptyStatePortal)
    } else {
      // Add stable dropzone portals
      portals.push(...dropzonePortals)
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
              areaTypes={ areaTypes }
              areablockManager={ areablockManager }
              buttonsContainer={ buttonsContainer as HTMLElement }
              config={ config }
              element={ areaEntry }
              id={ areaKey }
              limitReached={ limitReachedRef.current }
              onAddArea={ handleAddAreaWithRefresh }
              onMoveAreaDown={ handleMoveAreaDown }
              onMoveAreaUp={ handleMoveAreaUp }
              onRemoveArea={ handleRemoveArea }
            />
          )
          const portal = ReactDOM.createPortal(sortableToolbar, buttonsContainer)
          portals.push(portal)
        }
      }
    })

    return (
      <EditableSortContext
        activeId={ activeId }
        dragOverlayTitle={ dragOverlayTitle }
        items={ areaKeys }
        onDragEnd={ handleDragEnd }
        onDragOver={ handleDragOver }
        onDragStart={ handleDragStart }
      >
        <>{portals}</>
      </EditableSortContext>
    )
  }, [areablockManager, areaTypes, handleDragStart, handleDragOver, handleDragEnd, handleAddAreaWithRefresh, handleRemoveArea, handleMoveAreaUp, handleMoveAreaDown, activeId, emptyStatePortal, dropzonePortals, dragOverlayTitle])

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
