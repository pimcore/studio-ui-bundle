/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNil, isUndefined, isArray } from 'lodash'
import { type AreablockEditableConfig, type AreablockValue, type AreaType } from '../areablock-editable'
import { type AreablockGroupedTypes, type AreablockTypeEntry } from '@Pimcore/modules/document/document-editor-slice'
import { type AbstractDocumentEditableDefinition } from '../../../dynamic-type-document-editable-abstract'

const DEFAULT_AREABLOCK_GROUP = 'Available Areas'
const UNCATEGORIZED_AREABLOCK_GROUP = 'Uncategorized'

export { DEFAULT_AREABLOCK_GROUP, UNCATEGORIZED_AREABLOCK_GROUP }

export function buildGroupedTypes (editableDefinitions: AbstractDocumentEditableDefinition[]): AreablockGroupedTypes {
  const areablockEditables = editableDefinitions.filter(e => e.type === 'areablock')
  if (areablockEditables.length === 0) return {}

  const allGroupedTypes: AreablockGroupedTypes = {}

  const createEntry = (editable: AbstractDocumentEditableDefinition, type: AreaType): AreablockTypeEntry => ({
    areablockName: editable.name,
    type: type.type,
    name: type.name,
    description: type.description,
    icon: type.icon
  })

  const addToGroup = (groupName: string, types: AreaType[], editable: AbstractDocumentEditableDefinition): void => {
    if (isNil(allGroupedTypes[groupName])) {
      allGroupedTypes[groupName] = []
    }
    types.forEach(type => { allGroupedTypes[groupName].push(createEntry(editable, type)) })
  }

  const hasGrouped = areablockEditables.some(editable => {
    const grouped = configUtils.getGroupedAreaTypes(editable.config as AreablockEditableConfig | undefined)
    return !isArray(grouped)
  })

  areablockEditables.forEach(editable => {
    const grouped = configUtils.getGroupedAreaTypes(editable.config as AreablockEditableConfig | undefined)
    if (isArray(grouped)) {
      addToGroup(hasGrouped ? UNCATEGORIZED_AREABLOCK_GROUP : DEFAULT_AREABLOCK_GROUP, grouped, editable)
    } else {
      Object.entries(grouped).forEach(([groupName, types]) => { addToGroup(groupName, types, editable) })
    }
  })

  return allGroupedTypes
}

export const areablockValueUtils = {
  filterEditableNames (allEditableNames: string[], areablockName: string, entryKey: string): string[] {
    const prefix = `${areablockName}:${entryKey}.`
    return allEditableNames.filter(name => name.startsWith(prefix))
  },

  elementsToAreablockValue (elements: HTMLElement[]): AreablockValue {
    return elements.map(element => {
      const key = element.getAttribute('key') ?? ''
      const type = element.getAttribute('type') ?? ''
      const hidden = element.getAttribute('data-hidden') === 'true'

      return { key, type, hidden }
    })
  },

  swapElements<T> (array: T[], index1: number, index2: number): T[] {
    const newArray = [...array]
    const temp = newArray[index1]
    newArray[index1] = newArray[index2]
    newArray[index2] = temp
    return newArray
  }
}

export const configUtils = {
  getEffectiveLimit (config?: AreablockEditableConfig): number {
    return config?.limit ?? 1000000
  },

  isReloadMode (config?: AreablockEditableConfig): boolean {
    return Boolean(config?.reload)
  },

  isLimitReached (currentCount: number, limit?: number): boolean {
    if (isNil(limit) || isUndefined(limit)) return false
    return currentCount >= limit
  },

  canMoveUp (index: number): boolean {
    return index > 0
  },

  canMoveDown (index: number, totalCount: number): boolean {
    return index < totalCount - 1
  },

  getAvailableTypes (config?: AreablockEditableConfig): AreaType[] {
    return config?.types ?? []
  },

  isTypeAllowed (config: AreablockEditableConfig | undefined, type: string): boolean {
    if (isNil(config?.allowed) || config.allowed.length === 0) return true
    return config.allowed.includes(type)
  },

  getGroupedAreaTypes (config?: AreablockEditableConfig): AreaType[] | Record<string, AreaType[]> {
    const availableTypes = config?.types ?? []
    const groupConfig = config?.group

    if (isNil(groupConfig) || Object.keys(groupConfig).length === 0) {
      return availableTypes
    }

    const groupedTypes: Record<string, AreaType[]> = {}

    Object.entries(groupConfig).forEach(([groupName, typeIds]) => {
      const uniqueTypeIds = [...new Set(typeIds)]

      const groupTypes = uniqueTypeIds
        .map(typeId => availableTypes.find(type => type.type === typeId))
        .filter((type): type is AreaType => !isNil(type))

      if (groupTypes.length > 0) {
        groupedTypes[groupName] = groupTypes
      }
    })

    return groupedTypes
  }
}
