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
import { isNull, isNumber } from 'lodash'
import { type BlockManager } from '../utils/block-manager'
import ReactDOM from 'react-dom'
import { SortableBlockToolbar } from '../components/sortable-block-toolbar'
import { EmptyStateBlockToolbar } from '../components/empty-state-block-toolbar'
import { useBlockDropzones } from './use-block-dropzones'
import { EditableSortContext } from '../../../helpers/editable-dropzone-sorting/editable-sort-context'
import { configUtils } from '../utils/block-utils'

export interface UseBlockControlsParams {
  blockManager: BlockManager
  config?: any
  onAddBlock: (element: HTMLElement | null, amount?: number) => void
  onRemoveBlock: (element: HTMLElement) => void
  onMoveBlockUp: (element: HTMLElement) => void
  onMoveBlockDown: (element: HTMLElement) => void
  onMoveBlock: (fromIndex: number, toIndex: number) => void
  isInherited?: boolean
  onOverwrite?: () => void
}

export interface UseBlockControlsReturn {
  renderBlockToolbar: () => React.JSX.Element
}

export const useBlockControls = ({
  blockManager,
  config,
  onAddBlock,
  onRemoveBlock,
  onMoveBlockUp,
  onMoveBlockDown,
  onMoveBlock,
  isInherited = false,
  onOverwrite
}: UseBlockControlsParams): UseBlockControlsReturn => {
  const {
    activeId,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    dropzonePortals,
    dragOverlayTitle,
    refreshDropzones,
    removeFirstDropzone
  } = useBlockDropzones({
    blockManager,
    onMoveBlock
  })

  const handleAddBlock = useCallback((element: HTMLElement | null, amount?: number) => {
    onAddBlock(element, amount)
    refreshDropzones()
  }, [onAddBlock, refreshDropzones])

  const handleRemoveBlock = useCallback((element: HTMLElement) => {
    const currentBlockEntries = blockManager.queryElements()
    const isLastItem = currentBlockEntries.length === 1

    onRemoveBlock(element)

    if (isLastItem) {
      removeFirstDropzone() // Remove the first dropzone when removing the last item
    }
  }, [onRemoveBlock, blockManager, removeFirstDropzone])

  const createEmptyStatePortal = useCallback((container: HTMLElement): React.ReactPortal => {
    const emptyStateToolbar = (
      <EmptyStateBlockToolbar
        isInherited={ isInherited }
        onClick={ () => {
          if (!isInherited) {
            handleAddBlock(null, 1)
          }
        } }
        onOverwrite={ onOverwrite }
      />
    )
    return ReactDOM.createPortal(emptyStateToolbar, container)
  }, [handleAddBlock, isInherited, onOverwrite])

  const renderBlockToolbar = useCallback((): React.JSX.Element => {
    const portals: React.ReactPortal[] = []

    const currentBlockEntries = blockManager.queryElements()
    const limit = isNumber(config?.limit) ? config.limit as number : undefined
    const limitReached = configUtils.isLimitReached(currentBlockEntries.length, limit)

    if (currentBlockEntries.length === 0) {
      const container = blockManager.getContainer()
      if (container !== null) {
        const portal = createEmptyStatePortal(container)
        portals.push(portal)
      }
    } else if (!isInherited) {
      portals.push(...dropzonePortals)
    }

    const blockKeys = currentBlockEntries
      .map(entry => blockManager.getElementKey(entry))
      .filter((key): key is string => Boolean(key))

    // Compute per-block flags here so SortableBlockToolbar can be memoized
    // (props are stable primitives, no DOM queries inside the toolbar render).
    const lastIndex = currentBlockEntries.length - 1
    currentBlockEntries.forEach((blockEntry, index) => {
      const buttonsContainer = blockEntry.querySelector('.pimcore_block_buttons')
      if (buttonsContainer === null) return

      const blockKey = blockManager.getElementKey(blockEntry)
      if (blockKey === null) return

      const hasPlus = !isNull(buttonsContainer.querySelector('.pimcore_block_plus'))
      const hasMinus = !isNull(buttonsContainer.querySelector('.pimcore_block_minus'))
      const hasUp = !isNull(buttonsContainer.querySelector('.pimcore_block_up'))
      const hasDown = !isNull(buttonsContainer.querySelector('.pimcore_block_down'))

      const sortableToolbar = (
        <SortableBlockToolbar
          element={ blockEntry }
          hasDown={ hasDown }
          hasMinus={ hasMinus }
          hasPlus={ hasPlus }
          hasUp={ hasUp }
          id={ blockKey }
          isFirst={ index === 0 }
          isInherited={ isInherited }
          isLast={ index === lastIndex }
          key={ blockKey }
          limitReached={ limitReached }
          onAddBlock={ handleAddBlock }
          onMoveBlockDown={ onMoveBlockDown }
          onMoveBlockUp={ onMoveBlockUp }
          onOverwrite={ onOverwrite }
          onRemoveBlock={ handleRemoveBlock }
        />
      )
      const portal = ReactDOM.createPortal(sortableToolbar, buttonsContainer)
      portals.push(portal)
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
  }, [blockManager, config, handleDragStart, handleDragOver, handleDragEnd, handleAddBlock, handleRemoveBlock, onMoveBlockUp, onMoveBlockDown, activeId, dropzonePortals, dragOverlayTitle, createEmptyStatePortal, isInherited, onOverwrite])

  return {
    renderBlockToolbar
  }
}
