/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect } from 'react'
import { isArray } from 'lodash'
import { DynamicEditablesRenderer } from '@Pimcore/modules/document/editor/shared-tab-manager/tabs/edit/components/editables-renderer/dynamic-editables-renderer'
import { useBlockEditableStyles } from './block-editable.styles'
import { useBlockEditable } from './hooks/use-block-editable'
import { useBlockControls } from './hooks/use-block-controls'

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

  // Central hook for all block logic
  const {
    dynamicEditables,
    refresh,
    addBlock,
    removeBlock,
    moveBlockUp,
    moveBlockDown,
    getBlockContainer
  } = useBlockEditable({
    value: currentValue,
    onChange,
    config,
    editableName,
    containerRef,
    disabled,
    onOperationComplete: (elements, limitReached) => {
      // Update controls for all elements after any operation
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

  // Initialize and refresh on value changes
  useEffect(() => {
    refresh(() => { initializeControls(getBlockContainer) }, updateControls)
  }, [currentValue, refresh, initializeControls, updateControls, getBlockContainer])

  return (
    <div className={ `${styles.blockContainer} ${className ?? ''}` }>
      <DynamicEditablesRenderer editableDefinitions={ dynamicEditables } />
    </div>
  )
}
