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
  },

  elementsToBlockValue: (elements: HTMLElement[]): BlockValue => {
    return elements
      .map(element => element.getAttribute('key'))
      .filter(key => key !== null)
      .map(key => parseInt(key, 10))
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

export { BlockManager } from './block-manager'
