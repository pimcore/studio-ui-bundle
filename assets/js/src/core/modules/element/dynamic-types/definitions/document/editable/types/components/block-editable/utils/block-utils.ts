/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNil } from 'lodash'
import { type BlockEditableConfig, type BlockValue } from '../block-editable'
import { type AbstractDocumentEditableDefinition } from '../../../../dynamic-type-document-editable-abstract'
import { processBlockTemplate, ensurePortalTargets } from './template-processor'

// Element Key Management
export const elementKeyUtils = {
  get: (element: HTMLElement): string | null => 
    element.getAttribute('key'),
  
  set: (element: HTMLElement, key: string): void => 
    element.setAttribute('key', key),
  
  ensure: (element: HTMLElement): void => {
    if (!elementKeyUtils.get(element)) {
      elementKeyUtils.set(element, '0')
    }
  },
  
  ensureAll: (elements: HTMLElement[]): HTMLElement[] => {
    elements.forEach(elementKeyUtils.ensure)
    return elements
  },
  
  parse: (element: HTMLElement): number => {
    const key = element.getAttribute('key')
    return parseInt(key ?? '0', 10)
  },
  
  calculateNext: (elements: HTMLElement[]): number => {
    let nextKey = 0
    
    for (const element of elements) {
      const currentKey = elementKeyUtils.parse(element)
      if (currentKey > nextKey) {
        nextKey = currentKey
      }
    }
    
    return nextKey + 1
  }
}

// DOM Operations
export const domUtils = {
  findContainer: (
    editableName: string,
    containerRef?: React.RefObject<HTMLDivElement>
  ): HTMLElement | null => {
    if (containerRef?.current) {
      return containerRef.current
    }
    
    const element = document.querySelector(`[data-name="${editableName}"][data-type="block"]`)
    return element as HTMLElement
  },
  
  queryElements: (
    container: HTMLElement,
    editableName: string
  ): HTMLElement[] => {
    const selector = `.pimcore_block_entry[data-name="${editableName}"][key]`
    return Array.from(container.querySelectorAll(selector)) as HTMLElement[]
  },
  
  findElementIndex: (elements: HTMLElement[], targetElement: HTMLElement): number => {
    const targetKey = targetElement.getAttribute('key')
    return elements.findIndex(element => element.getAttribute('key') === targetKey)
  }
}

// Block Value Operations
export const blockValueUtils = {
  fromElements: (elements: HTMLElement[]): BlockValue => {
    return elements
      .map(element => element.getAttribute('key'))
      .filter(key => key !== null)
      .map(key => parseInt(key!, 10))
  },
  
  swapElements: <T>(array: T[], index1: number, index2: number): T[] => {
    const newArray = [...array]
    const temp = newArray[index1]
    newArray[index1] = newArray[index2]
    newArray[index2] = temp
    return newArray
  },
  
  filterEditableNames: (
    allEditableNames: string[],
    editableName: string,
    elementKey: string
  ): string[] => {
    const pattern = `${editableName}:${elementKey}.`
    return allEditableNames.filter(key => key.startsWith(pattern))
  }
}

// Configuration & Validation
export const configUtils = {
  isLimitReached: (currentCount: number, limit?: number): boolean => {
    return !isNil(limit) && currentCount >= limit
  },
  
  isReloadMode: (config?: BlockEditableConfig): boolean => {
    return config?.reload === true
  },
  
  getEffectiveLimit: (config?: BlockEditableConfig): number => {
    return config?.limit ?? 1000000
  },
  
  canMoveUp: (index: number): boolean => {
    return index > 0
  },
  
  canMoveDown: (index: number, totalElements: number): boolean => {
    return index < totalElements - 1
  }
}

// Block Operations
export const operationUtils = {
  createEditableData: (
    editableDefinitions: Array<{ name: string; type: string; data?: unknown }>
  ): Record<string, { type: string; data: unknown }> => {
    return editableDefinitions.reduce((acc, definition) => {
      acc[definition.name] = {
        type: definition.type,
        data: definition.data ?? null
      }
      return acc
    }, {} as Record<string, { type: string, data: unknown }>)
  },
  
  processNonReloadBlockAddition: ({
    container,
    index,
    config,
    editableName,
    elementsRef,
    initializeData,
    setDynamicEditables
  }: ProcessNonReloadBlockAdditionParams): HTMLElement | null => {
    if (isNil(config?.template?.html) || isNil(config?.template?.editables)) {
      return null
    }

    const nextKey = elementKeyUtils.calculateNext(elementsRef.current)

    const { html: processedHtml, editableDefinitions } = processBlockTemplate(
      { templateHtml: config.template.html, editableName, nextKey },
      config.template.editables
    )

    // Insert HTML at the correct position based on current managed state
    if (elementsRef.current.length === 0) {
      container.innerHTML = processedHtml
    } else if (elementsRef.current[index - 1]) {
      elementsRef.current[index - 1].insertAdjacentHTML('afterend', processedHtml)
    } else {
      container.insertAdjacentHTML('beforeend', processedHtml)
    }

    // Update managed state with fresh DOM query
    const newElements = domUtils.queryElements(container, editableName)
    const newBlockEntry = newElements.find(el => !elementsRef.current.includes(el)) ?? null
    
    if (newBlockEntry) {
      elementKeyUtils.set(newBlockEntry, nextKey.toString())
      ensurePortalTargets(newBlockEntry, editableDefinitions)
    }

    // Update the managed state to include the new element
    elementsRef.current = elementKeyUtils.ensureAll(newElements)

    // Initialize editable data
    const editableData = operationUtils.createEditableData(editableDefinitions)
    initializeData(editableData)

    // Update dynamic editables state
    setDynamicEditables(prev => [...prev, ...editableDefinitions])

    return newBlockEntry
  }
}

// Interface for block addition parameters
export interface ProcessNonReloadBlockAdditionParams {
  container: HTMLElement
  index: number
  config: BlockEditableConfig
  editableName: string
  elementsRef: React.MutableRefObject<HTMLElement[]>
  initializeData: (data: Record<string, { type: string; data: unknown }>) => void
  setDynamicEditables: React.Dispatch<React.SetStateAction<AbstractDocumentEditableDefinition[]>>
}