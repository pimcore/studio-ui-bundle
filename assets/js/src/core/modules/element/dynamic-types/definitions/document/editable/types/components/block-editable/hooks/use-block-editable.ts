/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useCallback, useRef, useState } from 'react'
import { isNil } from 'lodash'
import { useDocumentEditor } from '@Pimcore/modules/document/editor/shared-tab-manager/tabs/edit/hooks/use-document-editor'
import { type AbstractDocumentEditableDefinition } from '../../../../dynamic-type-document-editable-abstract'
import { type BlockEditableConfig, type BlockValue } from '../block-editable'
import {
  elementKeyUtils,
  domUtils,
  blockValueUtils,
  configUtils,
  operationUtils
} from '../utils/block-utils'

export interface UseBlockEditableParams {
  value?: BlockValue
  onChange?: (value: BlockValue) => void
  config?: BlockEditableConfig
  editableName: string
  containerRef?: React.RefObject<HTMLDivElement>
  disabled?: boolean
  onOperationComplete?: (elements: HTMLElement[], limitReached: boolean) => void
}

export const useBlockEditable = ({
  value = [],
  onChange,
  config,
  editableName,
  containerRef,
  disabled = false,
  onOperationComplete
}: UseBlockEditableParams) => {
  const { initializeData, getValues, removeValues } = useDocumentEditor()
  const [dynamicEditables, setDynamicEditables] = useState<AbstractDocumentEditableDefinition[]>([])
  const elementsRef = useRef<HTMLElement[]>([])

  // Simple utility functions - no useCallback needed
  const getBlockContainer = (): HTMLElement | null => {
    return domUtils.findContainer(editableName, containerRef)
  }

  const getElementIndex = (element: HTMLElement): number => {
    return domUtils.findElementIndex(elementsRef.current, element)
  }

  const getNextKey = (): number => {
    return elementKeyUtils.calculateNext(elementsRef.current)
  }

  // Functions with dependencies or passed as props - keep useCallback
  const queryDOMElements = useCallback((): HTMLElement[] => {
    const container = getBlockContainer()
    if (!container) return []
    return domUtils.queryElements(container, editableName)
  }, [editableName])

  const refreshElements = useCallback(() => {
    const domElements = queryDOMElements()
    const elementsWithKeys = elementKeyUtils.ensureAll(domElements)
    elementsRef.current = elementsWithKeys
    return elementsWithKeys
  }, [queryDOMElements])

  const getBlockEditableNames = useCallback((element: HTMLElement): string[] => {
    const elementKey = elementKeyUtils.get(element)
    if (isNil(elementKey)) return []
    
    const currentValues = getValues()
    return blockValueUtils.filterEditableNames(Object.keys(currentValues), editableName, elementKey)
  }, [editableName, getValues])

  const handleReloadMode = useCallback((elementsUpdater: (elements: HTMLElement[]) => HTMLElement[]) => {
    const newElements = elementsUpdater([...elementsRef.current])
    elementsRef.current = newElements
    const newValue = blockValueUtils.fromElements(newElements)
    onChange?.(newValue)
  }, [onChange])

  const handlePostOperation = useCallback(() => {
    const elements = refreshElements()
    const newValue = blockValueUtils.fromElements(elements)
    onChange?.(newValue)
    
    if (onOperationComplete) {
      const limitReached = configUtils.isLimitReached(elements.length, config?.limit)
      onOperationComplete(elements, limitReached)
    }
  }, [refreshElements, onChange, onOperationComplete, config?.limit])

  const addBlock = useCallback((element: HTMLElement | null, amount = 1) => {
    if (disabled) return
    
    const limit = configUtils.getEffectiveLimit(config)
    if (configUtils.isLimitReached(elementsRef.current.length, limit)) return
    
    const index = element ? getElementIndex(element) + 1 : 0
    const nextKey = getNextKey()
    
    if (configUtils.isReloadMode(config)) {
      handleReloadMode((elements) => {
        const placeholderElement = document.createElement('div')
        elementKeyUtils.set(placeholderElement, nextKey.toString())
        const newElements = [...elements]
        newElements.splice(index, 0, placeholderElement)
        return newElements
      })
      return
    }

    const container = getBlockContainer()
    if (isNil(container) || isNil(config)) return

    const newBlockEntry = operationUtils.processNonReloadBlockAddition({
      container,
      index,
      config,
      editableName,
      elementsRef,
      initializeData,
      setDynamicEditables
    })

    if (newBlockEntry) {
      handlePostOperation()
    }
  }, [disabled, config, handleReloadMode, editableName, initializeData, handlePostOperation])

  const removeBlock = useCallback((element: HTMLElement) => {
    if (disabled) return
    
    if (configUtils.isReloadMode(config)) {
      const index = getElementIndex(element)
      handleReloadMode((elements) => {
        const newElements = [...elements]
        newElements.splice(index, 1)
        return newElements
      })
      return
    }
    
    const editableNamesToRemove = getBlockEditableNames(element)
    
    const elementId = element.getAttribute('id')
    if (elementId) {
      setDynamicEditables(prev => 
        prev.filter(editable => !editable.id.includes(elementId))
      )
    }
    
    element.remove()
    
    if (editableNamesToRemove.length > 0) {
      removeValues(editableNamesToRemove)
    }
    
    handlePostOperation()
  }, [disabled, config, handleReloadMode, getBlockEditableNames, removeValues, handlePostOperation])

  const moveBlock = useCallback((
    element: HTMLElement,
    direction: 'up' | 'down'
  ) => {
    if (disabled) return
    
    const index = getElementIndex(element)
    
    if (direction === 'up' && !configUtils.canMoveUp(index)) return
    if (direction === 'down' && !configUtils.canMoveDown(index, elementsRef.current.length)) return
    
    if (configUtils.isReloadMode(config)) {
      const targetIndex = direction === 'up' ? index - 1 : index + 1
      handleReloadMode((elements) => blockValueUtils.swapElements(elements, index, targetIndex))
      return
    }
    
    const targetElement = direction === 'up' ? elementsRef.current[index - 1] : elementsRef.current[index + 1]
    if (targetElement) {
      const insertTarget = direction === 'up' ? targetElement : targetElement.nextSibling
      targetElement.parentNode?.insertBefore(element, insertTarget)
      handlePostOperation()
    }
  }, [disabled, config, handleReloadMode, handlePostOperation])

  // Simple wrapper functions - no useCallback needed
  const moveBlockUp = (element: HTMLElement) => {
    moveBlock(element, 'up')
  }

  const moveBlockDown = (element: HTMLElement) => {
    moveBlock(element, 'down')
  }

  const refresh = useCallback((initializeControlsFn?: () => void, updateControlsFn?: (element: HTMLElement, limitReached: boolean) => void) => {
    const elements = refreshElements()
    const container = getBlockContainer()
    if (!container) return
    
    const limitReached = configUtils.isLimitReached(elements.length, config?.limit)
    
    if (elements.length < 1) {
      initializeControlsFn?.()
    } else {
      container.classList.remove('pimcore_block_buttons')
      
      elements.forEach(element => {
        updateControlsFn?.(element, limitReached)
      })
    }
  }, [refreshElements, config?.limit])

  return {
    dynamicEditables,
    refresh,
    refreshElements,
    getElementIndex,
    queryDOMElements,
    getBlockContainer,
    addBlock,
    removeBlock,
    moveBlockUp,
    moveBlockDown
  }
}