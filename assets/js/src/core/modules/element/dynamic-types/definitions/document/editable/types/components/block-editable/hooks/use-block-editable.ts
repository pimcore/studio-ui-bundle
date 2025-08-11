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

export interface UseBlockEditableReturn {
  dynamicEditables: AbstractDocumentEditableDefinition[]
  refresh: (initializeControlsFn?: () => void, updateControlsFn?: (element: HTMLElement, limitReached: boolean) => void) => void
  getBlockContainer: () => HTMLElement | null
  addBlock: (element: HTMLElement | null, amount?: number) => void
  removeBlock: (element: HTMLElement) => void
  moveBlockUp: (element: HTMLElement) => void
  moveBlockDown: (element: HTMLElement) => void
}

export const useBlockEditable = ({
  value = [],
  onChange,
  config,
  editableName,
  containerRef,
  disabled = false,
  onOperationComplete
}: UseBlockEditableParams): UseBlockEditableReturn => {
  const { initializeData, getValues, removeValues } = useDocumentEditor()
  const [dynamicEditables, setDynamicEditables] = useState<AbstractDocumentEditableDefinition[]>([])
  const reloadModeElementsRef = useRef<HTMLElement[]>([])

  // Simple utility functions - no useCallback needed
  const getBlockContainer = (): HTMLElement | null => {
    return domUtils.findContainer(editableName, containerRef)
  }

  const getElementIndex = (element: HTMLElement): number => {
    return domUtils.findElementIndex(editableName, element, containerRef)
  }

  const getNextKey = (): number => {
    return elementKeyUtils.calculateNext(editableName, containerRef)
  }

  // Functions with dependencies or passed as props - keep useCallback
  const queryDOMElements = (): HTMLElement[] => {
    return domUtils.queryElements(editableName, containerRef)
  }

  const getBlockEditableNames = (element: HTMLElement): string[] => {
    const elementKey = elementKeyUtils.get(element)
    if (isNil(elementKey)) return []

    const currentValues = getValues()
    return blockValueUtils.filterEditableNames(Object.keys(currentValues), editableName, elementKey)
  }

  const handleReloadMode = useCallback((elementsUpdater: (elements: HTMLElement[]) => HTMLElement[]) => {
    const currentElements = configUtils.isReloadMode(config) ? reloadModeElementsRef.current : queryDOMElements()
    const newElements = elementsUpdater([...currentElements])
    reloadModeElementsRef.current = newElements
    const newValue = blockValueUtils.fromElements(newElements)
    onChange?.(newValue)
  }, [onChange, config])

  const handlePostOperation = useCallback(() => {
    const elements = elementKeyUtils.ensureAll(queryDOMElements())
    const newValue = blockValueUtils.fromElements(elements)
    onChange?.(newValue)

    if (!isNil(onOperationComplete)) {
      const limitReached = configUtils.isLimitReached(elements.length, config?.limit)
      onOperationComplete(elements, limitReached)
    }
  }, [onChange, onOperationComplete, config?.limit])

  const addBlock = useCallback((element: HTMLElement | null, amount = 1) => {
    if (disabled) return

    const limit = configUtils.getEffectiveLimit(config)
    const currentElements = configUtils.isReloadMode(config) ? reloadModeElementsRef.current : queryDOMElements()
    if (configUtils.isLimitReached(currentElements.length, limit)) return

    const index = !isNil(element) ? getElementIndex(element) + 1 : 0
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
      initializeData,
      setDynamicEditables
    })

    if (!isNil(newBlockEntry)) {
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
    if (!isNil(elementId) && elementId !== '') {
      setDynamicEditables(prev =>
        prev.filter(editable => !editable.id.includes(elementId))
      )
    }

    element.remove()

    if (editableNamesToRemove.length > 0) {
      removeValues(editableNamesToRemove)
    }

    handlePostOperation()
  }, [disabled, config, handleReloadMode, removeValues, handlePostOperation])

  const moveBlock = (
    element: HTMLElement,
    direction: 'up' | 'down'
  ): void => {
    if (disabled) return

    const index = getElementIndex(element)
    const currentElements = configUtils.isReloadMode(config) ? reloadModeElementsRef.current : queryDOMElements()

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

  const refresh = useCallback((initializeControlsFn?: () => void, updateControlsFn?: (element: HTMLElement, limitReached: boolean) => void) => {
    const elements = elementKeyUtils.ensureAll(queryDOMElements())
    const container = getBlockContainer()
    if (isNil(container)) return

    const limitReached = configUtils.isLimitReached(elements.length, config?.limit)

    if (elements.length < 1) {
      initializeControlsFn?.()
    } else {
      container.classList.remove('pimcore_block_buttons')

      elements.forEach(element => {
        updateControlsFn?.(element, limitReached)
      })
    }
  }, [config?.limit])

  return {
    dynamicEditables,
    refresh,
    getBlockContainer,
    addBlock,
    removeBlock,
    moveBlockUp,
    moveBlockDown
  }
}
