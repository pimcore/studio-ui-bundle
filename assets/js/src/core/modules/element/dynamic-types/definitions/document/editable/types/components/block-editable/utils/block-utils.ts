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
import { type BlockEditableConfig } from '../block-editable'
import { type AbstractDocumentEditableDefinition } from '../../../../dynamic-type-document-editable-abstract'
import { processBlockTemplate, ensurePortalTargets } from './template-processor'
import { type BlockManager } from './block-manager'

export const blockValueUtils = {
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
    blockManager,
    index,
    config,
    initializeData,
    setDynamicEditables
  }: ProcessNonReloadBlockAdditionParams): HTMLElement | null => {
    const container = blockManager.getContainer()
    if (isNil(container) || isNil(config?.template?.html) || isNil(config?.template?.editables)) {
      return null
    }

    const nextKey = blockManager.calculateNextKey()
    const editableName = blockManager.getEditableName()

    const { html: processedHtml, editableDefinitions } = processBlockTemplate(
      { templateHtml: config.template.html, editableName, nextKey },
      config.template.editables
    )

    const currentElements = blockManager.queryElements()

    if (currentElements.length === 0) {
      container.innerHTML = processedHtml
    } else if (!isNil(currentElements[index - 1])) {
      currentElements[index - 1].insertAdjacentHTML('afterend', processedHtml)
    } else {
      container.insertAdjacentHTML('beforeend', processedHtml)
    }

    const newElements = blockManager.queryElements()
    const newBlockEntry = newElements.find(el => !currentElements.includes(el)) ?? null

    if (!isNil(newBlockEntry)) {
      blockManager.setElementKey(newBlockEntry, nextKey.toString())
      ensurePortalTargets(newBlockEntry, editableDefinitions)
    }

    const editableData = operationUtils.createEditableData(editableDefinitions)
    initializeData(editableData)

    setDynamicEditables(prev => [...prev, ...editableDefinitions])

    return newBlockEntry
  }
}

export interface ProcessNonReloadBlockAdditionParams {
  blockManager: BlockManager
  index: number
  config: BlockEditableConfig
  initializeData: (data: Record<string, { type: string, data: unknown }>) => void
  setDynamicEditables: React.Dispatch<React.SetStateAction<AbstractDocumentEditableDefinition[]>>
}

export { BlockManager } from './block-manager'
