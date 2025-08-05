/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useCallback, useRef } from 'react'
import { isArray } from 'lodash'
import { DynamicEditablesRenderer } from '@Pimcore/modules/document/editor/shared-tab-manager/tabs/edit/components/editables-renderer/dynamic-editables-renderer'
import { useBlockEditableStyles } from './block-editable.styles'
import { useBlockDOM } from './hooks/use-block-dom'
import { useBlockControls } from './hooks/use-block-controls'
import { useBlockOperations } from './hooks/use-block-operations'

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
  const refreshRef = useRef<() => void>()

  // DOM manipulation hook
  const {
    elementsRef,
    getBlockContainer,
    queryDOMElements,
    refreshElements,
    getElementIndex,
    getNextKey,
    getValue
  } = useBlockDOM({ editableName, containerRef })

  // Block operations hook
  const {
    dynamicEditables,
    addBlock,
    removeBlock,
    moveBlockUp,
    moveBlockDown
  } = useBlockOperations({
    config,
    editableName,
    disabled,
    onChange,
    getBlockContainer,
    queryDOMElements,
    getElementIndex,
    getNextKey,
    getValue,
    refreshElements,
    elementsRef,
    refreshRef
  })

  // Block controls hook
  const {
    refreshControls,
    createInitialControls
  } = useBlockControls({
    editableName,
    onAddBlock: addBlock,
    onRemoveBlock: removeBlock,
    onMoveBlockUp: moveBlockUp,
    onMoveBlockDown: moveBlockDown,
    getElementIndex,
    queryDOMElements,
    getBlockContainer
  })

  const refresh = useCallback(() => {
    const elements = queryDOMElements()
    const container = getBlockContainer()
    if (!container) return
    
    let limitReached = false
    if (config?.limit && elements.length >= config.limit) {
      limitReached = true
    }
    
    if (elements.length < 1) {
      createInitialControls()
    } else {
      container.classList.remove('pimcore_block_buttons')
      
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i]
        if (!element.getAttribute('key')) {
          element.setAttribute('key', element.getAttribute('key') ?? '0')
        }
        refreshControls(element, limitReached)
      }
    }
  }, [queryDOMElements, getBlockContainer, config?.limit, createInitialControls, refreshControls])

  // Set the refresh function reference
  refreshRef.current = refresh

  // Initialize and refresh on value changes
  useEffect(() => {
    // Initialize value array from DOM on first load
    refreshElements()
    
    const timer = setTimeout(() => {
      refresh()
    }, 100)
    
    return () => clearTimeout(timer)
  }, [currentValue, refreshElements, refresh])

  return (
    <div className={`${styles.blockContainer} ${className ?? ''}`}>
      <DynamicEditablesRenderer editableDefinitions={dynamicEditables} />
    </div>
  )
}