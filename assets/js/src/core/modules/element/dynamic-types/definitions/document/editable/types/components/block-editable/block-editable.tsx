/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useMemo, useCallback } from 'react'
import { isArray, isNil } from 'lodash'
import { DynamicEditablesRenderer } from '@Pimcore/modules/document/editor/shared-tab-manager/tabs/edit/components/editables-renderer/dynamic-editables-renderer'
import { useBlockEditableStyles } from './block-editable.styles'
import { useBlockEditable } from './hooks/use-block-editable'
import { useBlockControls } from './hooks/use-block-controls'
import { BlockManager } from './utils/block-manager'
import { configUtils } from './utils/block-utils'

export interface BlockEditableConfig {
  limit?: number
  class?: string
  reload?: boolean
  template?: {
    html: string
    editables: any[]
  }
}

export type BlockValue = Array<string | number>

export interface BlockEditableProps {
  value?: BlockValue
  onChange?: (value: BlockValue) => void
  config?: BlockEditableConfig
  className?: string
  editableName: string
  containerRef?: React.RefObject<HTMLDivElement>
  disabled?: boolean
}

export const BlockEditable = ({
  value = [],
  onChange,
  config,
  className,
  editableName,
  containerRef,
  disabled = false
}: BlockEditableProps): React.JSX.Element => {
  const { styles } = useBlockEditableStyles()
  const currentValue = isArray(value) ? value : []

  // Create BlockManager instance - memoized to avoid recreation on every render
  const blockManager = useMemo(() => new BlockManager(editableName, containerRef), [editableName, containerRef])

  // Central hook for all block logic
  const {
    dynamicEditables,
    addBlock,
    removeBlock,
    moveBlockUp,
    moveBlockDown
  } = useBlockEditable({
    blockManager,
    value: currentValue,
    onChange,
    config,
    disabled,
    onOperationComplete: (limitReached) => {
      // Update controls for all elements after any operation
      const elements = blockManager.queryElements()
      elements.forEach(element => { updateControls(element, limitReached) })
    }
  })

  // Simplified controls hook for UI manipulation
  const { initializeControls, updateControls } = useBlockControls({
    editableName,
    onAddBlock: addBlock,
    onRemoveBlock: removeBlock,
    onMoveBlockUp: moveBlockUp,
    onMoveBlockDown: moveBlockDown
  })

  // Refresh logic moved to component level where it belongs
  const refreshControls = useCallback(() => {
    const elements = blockManager.ensureAllElementKeys()
    const container = blockManager.getContainer()
    if (isNil(container)) return

    const limitReached = configUtils.isLimitReached(elements.length, config?.limit)

    if (elements.length < 1) {
      // No elements: Initialize empty state with "Add Block Entry" button
      initializeControls(blockManager)
    } else {
      // Has elements: Remove empty state class and update controls for each element
      container.classList.remove('pimcore_block_buttons')
      elements.forEach(element => {
        updateControls(element, limitReached)
      })
    }
  }, [blockManager, config?.limit, initializeControls, updateControls])

  // Initialize and refresh on value changes
  useEffect(() => {
    refreshControls()
  }, [currentValue, refreshControls])

  return (
    <div className={ `${styles.blockContainer} ${className ?? ''}` }>
      <DynamicEditablesRenderer editableDefinitions={ dynamicEditables } />
    </div>
  )
}
