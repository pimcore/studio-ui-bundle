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

  const blockManager = useMemo(() => new BlockManager(editableName, containerRef), [editableName, containerRef])

  const {
    dynamicEditables,
    addBlock,
    removeBlock,
    moveBlockUp,
    moveBlockDown,
    moveBlock
  } = useBlockEditable({
    blockManager,
    value: currentValue,
    onChange,
    config,
    disabled,
    onOperationComplete: (limitReached) => {
      const elements = blockManager.queryElements()
      elements.forEach(element => { updateControls(element, limitReached) })
    }
  })

  const { initializeControls, updateControls, clearEmptyState, renderBlockToolbar } = useBlockControls({
    blockManager,
    onAddBlock: addBlock,
    onRemoveBlock: removeBlock,
    onMoveBlockUp: moveBlockUp,
    onMoveBlockDown: moveBlockDown,
    onMoveBlock: moveBlock
  })

  const refreshControls = useCallback(() => {
    const elements = blockManager.ensureAllElementKeys()
    const container = blockManager.getContainer()
    if (isNil(container)) return

    const limitReached = configUtils.isLimitReached(elements.length, config?.limit)

    if (elements.length < 1) {
      initializeControls()
    } else {
      clearEmptyState()
      container.classList.remove('pimcore_block_buttons')
      elements.forEach(element => {
        updateControls(element, limitReached)
      })
    }
  }, [blockManager, config?.limit, initializeControls, updateControls, clearEmptyState])

  useEffect(() => {
    refreshControls()
  }, [currentValue, refreshControls])

  return (
    <div className={ `${styles.blockContainer} ${className ?? ''}` }>
      <DynamicEditablesRenderer editableDefinitions={ dynamicEditables } />
      {renderBlockToolbar()}
    </div>
  )
}
