/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback } from 'react'
import { type AreablockManager } from '../utils/areablock-manager'
import { type AreaType, type AreablockEditableConfig } from '../areablock-editable'
import ReactDOM from 'react-dom'
import { SortableAreablockToolbar } from '../components/sortable-areablock-toolbar/sortable-areablock-toolbar'
import { EmptyStateAreablockToolbar } from '../components/empty-state-areablock-toolbar/empty-state-areablock-toolbar'
import { useAreablockDropzones } from './use-areablock-dropzones'
import { EditableSortContext } from '../../../helpers/editable-dropzone-sorting/editable-sort-context'
import { configUtils } from '../utils/areablock-utils'

export interface UseAreablockControlsParams {
  areablockManager: AreablockManager
  areaTypes: AreaType[]
  config?: AreablockEditableConfig
  onAddArea: (element: HTMLElement | null, areaType?: string) => Promise<void>
  onRemoveArea: (element: HTMLElement) => void
  onMoveAreaUp: (element: HTMLElement) => void
  onMoveAreaDown: (element: HTMLElement) => void
  onMoveArea: (fromIndex: number, toIndex: number) => void
  onOpenDialog?: (areaKey: string) => void
  onToggleHidden?: (element: HTMLElement) => void
  isInherited?: boolean
  onOverwrite?: () => void
}

export interface UseAreablockControlsReturn {
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
  onMoveArea,
  onOpenDialog,
  onToggleHidden,
  isInherited = false,
  onOverwrite
}: UseAreablockControlsParams): UseAreablockControlsReturn => {
  const {
    activeId,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    dropzonePortals,
    dragOverlayTitle,
    refreshDropzones,
    removeFirstDropzone
  } = useAreablockDropzones({
    areablockManager,
    areaTypes,
    onMoveArea,
    onDropAreablock: async (areaType: string, index: number) => {
      if (isInherited) return

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
    }
  })

  const handleAddArea = useCallback(async (element: HTMLElement | null, areaType?: string) => {
    await onAddArea(element, areaType)
    refreshDropzones()
  }, [onAddArea, refreshDropzones])

  const handleRemoveArea = useCallback((element: HTMLElement) => {
    const currentAreaEntries = areablockManager.queryElements()
    const isLastItem = currentAreaEntries.length === 1

    onRemoveArea(element)

    if (isLastItem) {
      removeFirstDropzone()
    }
  }, [onRemoveArea, areablockManager, removeFirstDropzone])

  const createEmptyStatePortal = useCallback((container: HTMLElement): React.ReactPortal => {
    const emptyStateToolbar = (
      <EmptyStateAreablockToolbar
        areaTypes={ areaTypes }
        config={ config }
        isInherited={ isInherited }
        onClick={ async (areaType) => {
          await handleAddArea(null, areaType)
        } }
        onOverwrite={ onOverwrite }
      />
    )
    return ReactDOM.createPortal(emptyStateToolbar, container)
  }, [areaTypes, config, handleAddArea, isInherited, onOverwrite])

  const renderAreablockToolbar = useCallback((): React.JSX.Element => {
    const portals: React.ReactPortal[] = []

    const currentAreaEntries = areablockManager.queryElements()
    const limitReached = configUtils.isLimitReached(currentAreaEntries.length, config?.limit)

    if (currentAreaEntries.length === 0) {
      const container = areablockManager.getContainer()
      if (container !== null) {
        const portal = createEmptyStatePortal(container)
        portals.push(portal)
      }
    } else {
      if (!isInherited) {
        portals.push(...dropzonePortals)
      }
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
              isInherited={ isInherited }
              limitReached={ limitReached }
              onAddArea={ handleAddArea }
              onMoveAreaDown={ onMoveAreaDown }
              onMoveAreaUp={ onMoveAreaUp }
              onOpenDialog={ onOpenDialog }
              onOverwrite={ onOverwrite }
              onRemoveArea={ handleRemoveArea }
              onToggleHidden={ onToggleHidden }
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
  }, [areablockManager, areaTypes, config, handleDragStart, handleDragOver, handleDragEnd, handleAddArea, handleRemoveArea, onMoveAreaUp, onMoveAreaDown, onToggleHidden, onOpenDialog, activeId, dropzonePortals, dragOverlayTitle, createEmptyStatePortal, isInherited, onOverwrite])

  return {
    renderAreablockToolbar
  }
}
