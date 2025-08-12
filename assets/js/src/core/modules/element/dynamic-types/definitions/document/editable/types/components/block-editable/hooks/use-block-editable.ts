/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useCallback, useState, useRef } from 'react'
import { isNil } from 'lodash'
import { useDocumentEditor } from '@Pimcore/modules/document/editor/shared-tab-manager/tabs/edit/hooks/use-document-editor'
import { type AbstractDocumentEditableDefinition } from '../../../../dynamic-type-document-editable-abstract'
import { type BlockEditableConfig, type BlockValue } from '../block-editable'
import { type BlockManager } from '../utils/block-manager'
import {
  blockValueUtils,
  configUtils,
  operationUtils
} from '../utils/block-utils'

export interface UseBlockEditableParams {
  blockManager: BlockManager
  value?: BlockValue
  onChange?: (value: BlockValue) => void
  config?: BlockEditableConfig
  disabled?: boolean
  onOperationComplete?: (limitReached: boolean) => void
}

export interface UseBlockEditableReturn {
  dynamicEditables: AbstractDocumentEditableDefinition[]
  addBlock: (element: HTMLElement | null, amount?: number) => void
  removeBlock: (element: HTMLElement) => void
  moveBlockUp: (element: HTMLElement) => void
  moveBlockDown: (element: HTMLElement) => void
}

export const useBlockEditable = ({
  blockManager,
  value = [],
  onChange,
  config,
  disabled = false,
  onOperationComplete
}: UseBlockEditableParams): UseBlockEditableReturn => {
  const { initializeData, getValues, removeValues } = useDocumentEditor()
  const [dynamicEditables, setDynamicEditables] = useState<AbstractDocumentEditableDefinition[]>([])
  const reloadModeElementsRef = useRef<HTMLElement[]>([])

  const getBlockEditableNames = (element: HTMLElement): string[] => {
    const elementKey = blockManager.getElementKey(element)
    if (isNil(elementKey)) return []

    const currentValues = getValues()
    return blockValueUtils.filterEditableNames(Object.keys(currentValues), blockManager.getEditableName(), elementKey)
  }

  const handleReloadMode = useCallback((elementsUpdater: (elements: HTMLElement[]) => HTMLElement[]) => {
    const currentElements = configUtils.isReloadMode(config) ? reloadModeElementsRef.current : blockManager.queryElements()
    const newElements = elementsUpdater([...currentElements])
    reloadModeElementsRef.current = newElements
    const newValue = blockManager.getBlockValue()
    onChange?.(newValue)
  }, [onChange, config, blockManager])

  const handlePostOperation = useCallback(() => {
    const elements = blockManager.ensureAllElementKeys()
    const newValue = blockManager.getBlockValue()
    onChange?.(newValue)

    if (!isNil(onOperationComplete)) {
      const limitReached = configUtils.isLimitReached(elements.length, config?.limit)
      onOperationComplete(limitReached)
    }
  }, [onChange, onOperationComplete, config?.limit, blockManager])

  const addBlock = useCallback((element: HTMLElement | null, amount = 1) => {
    if (disabled) return

    const limit = configUtils.getEffectiveLimit(config)
    const currentElements = configUtils.isReloadMode(config) ? reloadModeElementsRef.current : blockManager.queryElements()
    if (configUtils.isLimitReached(currentElements.length, limit)) return

    const index = !isNil(element) ? blockManager.findElementIndex(element) + 1 : 0
    const nextKey = blockManager.calculateNextKey()

    if (configUtils.isReloadMode(config)) {
      handleReloadMode((elements) => {
        const placeholderElement = document.createElement('div')
        blockManager.setElementKey(placeholderElement, nextKey.toString())
        const newElements = [...elements]
        newElements.splice(index, 0, placeholderElement)
        return newElements
      })
      return
    }

    const container = blockManager.getContainer()
    if (isNil(container) || isNil(config)) return

    const newBlockEntry = operationUtils.processNonReloadBlockAddition({
      blockManager,
      index,
      config,
      initializeData,
      setDynamicEditables
    })

    if (!isNil(newBlockEntry)) {
      handlePostOperation()
    }
  }, [disabled, config, handleReloadMode, initializeData, handlePostOperation, blockManager])

  const removeBlock = useCallback((element: HTMLElement) => {
    if (disabled) return

    if (configUtils.isReloadMode(config)) {
      const index = blockManager.findElementIndex(element)
      handleReloadMode((elements) => {
        const newElements = [...elements]
        newElements.splice(index, 1)
        return newElements
      })
      return
    }

    const editableNamesToRemove = getBlockEditableNames(element)
    
    // Get the block key to properly filter dynamic editables
    const elementKey = blockManager.getElementKey(element)
    
    // Remove editables from state using the proper pattern
    if (!isNil(elementKey)) {
      const editableName = blockManager.getEditableName()
      const namePattern = `${editableName}:${elementKey}.`
      
      setDynamicEditables(prev =>
        prev.filter(editable => !editable.name.startsWith(namePattern))
      )
    }

    element.remove()

    if (editableNamesToRemove.length > 0) {
      removeValues(editableNamesToRemove)
    }

    handlePostOperation()
  }, [disabled, config, handleReloadMode, removeValues, handlePostOperation, blockManager])

  const moveBlock = (
    element: HTMLElement,
    direction: 'up' | 'down'
  ): void => {
    if (disabled) return

    const index = blockManager.findElementIndex(element)
    const currentElements = configUtils.isReloadMode(config) ? reloadModeElementsRef.current : blockManager.queryElements()

    if (direction === 'up' && !configUtils.canMoveUp(index)) return
    if (direction === 'down' && !configUtils.canMoveDown(index, currentElements.length)) return

    if (configUtils.isReloadMode(config)) {
      const targetIndex = direction === 'up' ? index - 1 : index + 1
      handleReloadMode((elements) => blockValueUtils.swapElements(elements, index, targetIndex))
      return
    }

    const targetElement = direction === 'up' ? currentElements[index - 1] : currentElements[index + 1]
    if (!isNil(targetElement)) {
      const insertTarget = direction === 'up' ? targetElement : targetElement.nextSibling
      targetElement.parentNode?.insertBefore(element, insertTarget)
      handlePostOperation()
    }
  }

  // Simple wrapper functions - no useCallback needed
  const moveBlockUp = (element: HTMLElement): void => {
    moveBlock(element, 'up')
  }

  const moveBlockDown = (element: HTMLElement): void => {
    moveBlock(element, 'down')
  }

  return {
    dynamicEditables,
    addBlock,
    removeBlock,
    moveBlockUp,
    moveBlockDown
  }
}
