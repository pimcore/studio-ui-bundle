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
import { type BlockManager } from '../utils/block-manager'
import ReactDOM from 'react-dom'
import { SortableBlockToolbar } from '../components/sortable-block-toolbar'
import { EmptyStateBlockToolbar } from '../components/empty-state-block-toolbar'
import { useBlockDropzones } from './use-block-dropzones'
import { EditableSortContext } from '../../../helpers/editable-dropzone-sorting/editable-sort-context'

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
  const limitReachedRef = useRef<boolean>(false)
  const [emptyStatePortal, setEmptyStatePortal] = useState<React.ReactPortal | null>(null)

  const {
    activeId,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    dropzonePortals,
    dragOverlayTitle,
    refreshDropzones
  } = useBlockDropzones({
    blockManager,
    onMoveBlock
  })

  const handleAddBlock = useCallback((element: HTMLElement | null, amount?: number) => {
    onAddBlock(element, amount)
    refreshDropzones()
  }, [onAddBlock, refreshDropzones])

  const handleRemoveBlock = useCallback((element: HTMLElement) => {
    onRemoveBlock(element)
    refreshDropzones()
  }, [onRemoveBlock, refreshDropzones])

  const handleMoveBlockUp = useCallback((element: HTMLElement) => {
    onMoveBlockUp(element)
    refreshDropzones()
  }, [onMoveBlockUp, refreshDropzones])

  const handleMoveBlockDown = useCallback((element: HTMLElement) => {
    onMoveBlockDown(element)
    refreshDropzones()
  }, [onMoveBlockDown, refreshDropzones])

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
            handleAddBlock(null, 1)
          }, 0)
        } }
      />
    )

    const portal = ReactDOM.createPortal(emptyStateToolbar, container)
    setEmptyStatePortal(portal)
  }, [blockManager, handleAddBlock, emptyStatePortal])

  const clearEmptyState = useCallback((): void => {
    setEmptyStatePortal(null)
  }, [])

  const renderBlockToolbar = useCallback((): React.JSX.Element => {
    const portals: React.ReactPortal[] = []

    const currentBlockEntries = blockManager.queryElements()

    if (currentBlockEntries.length === 0 && emptyStatePortal !== null) {
      portals.push(emptyStatePortal)
    } else {
      // Add dropzone portals
      portals.push(...dropzonePortals)
    }

    const blockKeys = currentBlockEntries
      .map(entry => blockManager.getElementKey(entry))
      .filter((key): key is string => Boolean(key))

    currentBlockEntries.forEach(blockEntry => {
      const buttonsContainer = blockEntry.querySelector('.pimcore_block_buttons')
      if (buttonsContainer !== null) {
        const blockKey = blockManager.getElementKey(blockEntry)

        if (blockKey !== null) {
          const sortableToolbar = (
            <SortableBlockToolbar
              blockManager={ blockManager }
              buttonsContainer={ buttonsContainer as HTMLElement }
              element={ blockEntry }
              id={ blockKey }
              key={ blockKey }
              limitReached={ limitReachedRef.current }
              onAddBlock={ handleAddBlock }
              onMoveBlockDown={ handleMoveBlockDown }
              onMoveBlockUp={ handleMoveBlockUp }
              onRemoveBlock={ handleRemoveBlock }
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
        items={ blockKeys }
        onDragEnd={ handleDragEnd }
        onDragOver={ handleDragOver }
        onDragStart={ handleDragStart }
      >
        <>{portals}</>
      </EditableSortContext>
    )
  }, [blockManager, handleDragStart, handleDragOver, handleDragEnd, handleAddBlock, handleRemoveBlock, handleMoveBlockUp, handleMoveBlockDown, activeId, emptyStatePortal, dropzonePortals, dragOverlayTitle])

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
    renderBlockToolbar
  }
}
