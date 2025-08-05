/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useCallback, useState } from 'react'
import { isNil } from 'lodash'
import { useDocumentEditor } from '@Pimcore/modules/document/editor/shared-tab-manager/tabs/edit/hooks/use-document-editor'
import { type AbstractDocumentEditableDefinition } from '../../../../dynamic-type-document-editable-abstract'
import { type BlockEditableConfig, type BlockValue } from '../block-editable'
import { processBlockTemplate, ensurePortalTargets } from '../utils/template-processor'

export interface UseBlockOperationsParams {
  config?: BlockEditableConfig
  editableName: string
  disabled: boolean
  onChange?: (value: BlockValue) => void
  getBlockContainer: () => HTMLElement | null
  queryDOMElements: () => HTMLElement[]
  getElementIndex: (element: HTMLElement) => number
  getNextKey: () => number
  getValue: () => BlockValue
  refreshElements: () => HTMLElement[]
  elementsRef: React.MutableRefObject<HTMLElement[]>
  refreshRef: React.MutableRefObject<(() => void) | undefined>
}

export const useBlockOperations = ({
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
}: UseBlockOperationsParams) => {
  const { initializeData, getValues, removeValues } = useDocumentEditor()
  const [dynamicEditables, setDynamicEditables] = useState<AbstractDocumentEditableDefinition[]>([])

  // Helper function to get editable names that belong to a specific block element
  const getBlockEditableNames = useCallback((element: HTMLElement): string[] => {
    const elementKey = element.getAttribute('key')
    if (isNil(elementKey)) return []
    
    const blockEditablePattern = `${editableName}:${elementKey}.`
    const currentValues = getValues()
    
    return Object.keys(currentValues).filter(key => key.startsWith(blockEditablePattern))
  }, [editableName, getValues])

  // Helper function to handle reload mode operations
  const handleReloadMode = useCallback((elementsUpdater: (elements: HTMLElement[]) => HTMLElement[]) => {
    const newElements = elementsUpdater([...elementsRef.current])
    elementsRef.current = newElements
    const newValue = getValue()
    onChange?.(newValue)
  }, [elementsRef, getValue, onChange])

  // Helper function to handle non-reload mode finalization
  const finalizeNonReloadMode = useCallback(() => {
    refreshElements()
    const newValue = getValue()
    onChange?.(newValue)
    refreshRef.current?.()
  }, [refreshElements, getValue, onChange, refreshRef])

  // Helper function to swap elements in array
  const swapElements = useCallback((elements: HTMLElement[], index1: number, index2: number): HTMLElement[] => {
    const newElements = [...elements]
    const temp = newElements[index1]
    newElements[index1] = newElements[index2]
    newElements[index2] = temp
    return newElements
  }, [])

  const addBlock = useCallback((element: HTMLElement | null, amount = 1) => {
    if (disabled) return
    
    const limit = config?.limit ?? 1000000
    const elements = queryDOMElements()
    if (elements.length >= limit) return
    
    const index = element ? getElementIndex(element) + 1 : 0
    const nextKey = getNextKey()
    
    if (config?.reload === true) {
      handleReloadMode((elements) => {
        const placeholderElement = document.createElement('div')
        placeholderElement.setAttribute('key', nextKey.toString())
        const newElements = [...elements]
        newElements.splice(index, 0, placeholderElement)
        return newElements
      })
      return
    }
    
    // Handle DOM manipulation for non-reload mode
    if (!isNil(config?.template?.html) && !isNil(config?.template?.editables)) {
      const container = getBlockContainer()
      if (isNil(container)) return
      
      const { html: processedHtml, editableDefinitions } = processBlockTemplate(
        { templateHtml: config.template.html, editableName, nextKey },
        config.template.editables
      )
      
      if (elements.length === 0) {
        container.innerHTML = processedHtml
      } else if (elements[index - 1]) {
        elements[index - 1].insertAdjacentHTML('afterend', processedHtml)
      } else {
        container.insertAdjacentHTML('beforeend', processedHtml)
      }
      
      // Find the newly created block entry and ensure it has proper attributes
      const newElements = queryDOMElements()
      const newBlockEntry = newElements.find(el => !elementsRef.current.includes(el))
      if (newBlockEntry) {
        newBlockEntry.setAttribute('key', nextKey.toString())
        ensurePortalTargets(newBlockEntry, editableDefinitions)
      }
      
      // Initialize editable data without triggering change cycle
      const editableData: Record<string, { type: string, data: any }> = {}
      editableDefinitions.forEach(definition => {
        editableData[definition.name] = {
          type: definition.type,
          data: definition.data ?? null
        }
      })
      initializeData(editableData)
      
      setDynamicEditables(prev => [...prev, ...editableDefinitions])
      finalizeNonReloadMode()
      
      setTimeout(() => refreshRef.current?.(), 50)
    }
  }, [disabled, config, queryDOMElements, getElementIndex, getNextKey, handleReloadMode, getBlockContainer, editableName, initializeData, elementsRef, finalizeNonReloadMode])

  const removeBlock = useCallback((element: HTMLElement) => {
    if (disabled) return
    
    const index = getElementIndex(element)
    
    if (config?.reload === true) {
      handleReloadMode((elements) => {
        const newElements = [...elements]
        newElements.splice(index, 1)
        return newElements
      })
      return
    }
    
    // Get all editable names that belong to this block element before removing it
    const editableNamesToRemove = getBlockEditableNames(element)
    
    // Handle DOM manipulation for non-reload mode
    const elementId = element.getAttribute('id')
    if (elementId) {
      setDynamicEditables(prev => 
        prev.filter(editable => !editable.id.includes(elementId))
      )
    }
    
    element.remove()
    
    // Remove the editable values from document editor
    if (editableNamesToRemove.length > 0) {
      removeValues(editableNamesToRemove)
    }
    
    finalizeNonReloadMode()
  }, [disabled, getElementIndex, config?.reload, handleReloadMode, getBlockEditableNames, removeValues, finalizeNonReloadMode])

  const moveBlockUp = useCallback((element: HTMLElement) => {
    if (disabled) return
    
    const elements = queryDOMElements()
    const index = getElementIndex(element)
    if (index <= 0) return
    
    if (config?.reload === true) {
      handleReloadMode((elements) => swapElements(elements, index, index - 1))
      return
    }
    
    const previousElement = elements[index - 1]
    if (previousElement) {
      previousElement.parentNode?.insertBefore(element, previousElement)
      finalizeNonReloadMode()
    }
  }, [disabled, getElementIndex, config?.reload, handleReloadMode, swapElements, queryDOMElements, finalizeNonReloadMode])

  const moveBlockDown = useCallback((element: HTMLElement) => {
    if (disabled) return
    
    const elements = queryDOMElements()
    const index = getElementIndex(element)
    if (index >= elements.length - 1) return
    
    if (config?.reload === true) {
      handleReloadMode((elements) => swapElements(elements, index, index + 1))
      return
    }
    
    // Handle DOM manipulation for non-reload mode
    const nextElement = elements[index + 1]
    if (nextElement) {
      nextElement.parentNode?.insertBefore(element, nextElement.nextSibling)
      finalizeNonReloadMode()
    }
  }, [disabled, queryDOMElements, getElementIndex, config?.reload, handleReloadMode, swapElements, finalizeNonReloadMode])

  return {
    dynamicEditables,
    addBlock,
    removeBlock,
    moveBlockUp,
    moveBlockDown
  }
}