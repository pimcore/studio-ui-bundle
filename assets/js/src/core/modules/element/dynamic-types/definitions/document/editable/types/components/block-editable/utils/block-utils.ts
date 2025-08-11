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

  set: (element: HTMLElement, key: string): void => { element.setAttribute('key', key) },

  ensure: (element: HTMLElement): void => {
    const key = elementKeyUtils.get(element)
    if (isNil(key) || key === '') {
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

  calculateNext: (editableName: string, containerRef?: React.RefObject<HTMLDivElement>): number => {
    const elements = domUtils.queryElements(editableName, containerRef)
    if (elements.length === 0) return 1

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
    if (!isNil(containerRef?.current)) {
      return containerRef.current
    }

    const element = document.querySelector(`[data-name="${editableName}"][data-type="block"]`)
    return element as HTMLElement
  },

  queryElements: (
    editableName: string,
    containerRef?: React.RefObject<HTMLDivElement>
  ): HTMLElement[] => {
    const container = domUtils.findContainer(editableName, containerRef)
    if (isNil(container)) return []

    const selector = `.pimcore_block_entry[data-name="${editableName}"][key]`
    return Array.from(container.querySelectorAll(selector))
  },

  findElementIndex: (editableName: string, targetElement: HTMLElement, containerRef?: React.RefObject<HTMLDivElement>): number => {
    const elements = domUtils.queryElements(editableName, containerRef)
    if (elements.length === 0) return -1

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
      .map(key => parseInt(key, 10))
  },

  getBlockValueFromDom: (editableName: string, containerRef?: React.RefObject<HTMLDivElement>): BlockValue => {
    const elements = domUtils.queryElements(editableName, containerRef)
    return blockValueUtils.fromElements(elements)
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
    editableDefinitions: Array<{ name: string, type: string, data?: unknown }>
  ): Record<string, { type: string, data: unknown }> => {
    return editableDefinitions.reduce<Record<string, { type: string, data: unknown }>>((acc, definition) => {
      acc[definition.name] = {
        type: definition.type,
        data: definition.data ?? null
      }
      return acc
    }, {})
  },

  processNonReloadBlockAddition: ({
    container,
    index,
    config,
    editableName,
    initializeData,
    setDynamicEditables
  }: ProcessNonReloadBlockAdditionParams): HTMLElement | null => {
    if (isNil(config?.template?.html) || isNil(config?.template?.editables)) {
      return null
    }

    const nextKey = elementKeyUtils.calculateNext(editableName)

    const { html: processedHtml, editableDefinitions } = processBlockTemplate(
      { templateHtml: config.template.html, editableName, nextKey },
      config.template.editables
    )

    // Get current elements to determine insertion point
    const currentElements = domUtils.queryElements(editableName)

    // Insert HTML at the correct position
    if (currentElements.length === 0) {
      container.innerHTML = processedHtml
    } else if (!isNil(currentElements[index - 1])) {
      currentElements[index - 1].insertAdjacentHTML('afterend', processedHtml)
    } else {
      container.insertAdjacentHTML('beforeend', processedHtml)
    }

    // Query fresh elements after insertion
    const newElements = domUtils.queryElements(editableName)
    const newBlockEntry = newElements.find(el => !currentElements.includes(el)) ?? null

    if (!isNil(newBlockEntry)) {
      elementKeyUtils.set(newBlockEntry, nextKey.toString())
      ensurePortalTargets(newBlockEntry, editableDefinitions)
    }

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
  initializeData: (data: Record<string, { type: string, data: unknown }>) => void
  setDynamicEditables: React.Dispatch<React.SetStateAction<AbstractDocumentEditableDefinition[]>>
}
