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
import { type AreablockEditableConfig, type AreablockEntry, type AreablockValue, type AreaType } from '../areablock-editable'
import { type AreablockGroupedTypes, type AreablockTypeEntry } from '@Pimcore/modules/document/document-editor-slice'
import { type AbstractDocumentEditableDefinition } from '../../../dynamic-type-document-editable-abstract'

const DEFAULT_AREABLOCK_GROUP = 'Available Areas'
const UNCATEGORIZED_AREABLOCK_GROUP = 'Uncategorized'

export { DEFAULT_AREABLOCK_GROUP, UNCATEGORIZED_AREABLOCK_GROUP }

export function buildGroupedTypes (editableDefinitions: AbstractDocumentEditableDefinition[], typeId: string = 'areablock'): AreablockGroupedTypes {
  const areablockEditables = editableDefinitions.filter(e => e.type === typeId)
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

  getEntryIndexByKey (value: AreablockValue, key: string | number): number {
    return value.findIndex(entry => String(entry.key) === String(key))
  },

  insertEntry (value: AreablockValue, index: number, entry: AreablockEntry): AreablockValue {
    const newValue = [...value]
    newValue.splice(index, 0, entry)
    return newValue
  },

  removeEntryByKey (value: AreablockValue, key: string | number): AreablockValue {
    return value.filter(entry => String(entry.key) !== String(key))
  },

  moveEntry (value: AreablockValue, fromIndex: number, toIndex: number): AreablockValue {
    const newValue = [...value]
    const [movedEntry] = newValue.splice(fromIndex, 1)
    newValue.splice(toIndex, 0, movedEntry)
    return newValue
  },

  setEntryHidden (value: AreablockValue, key: string | number, hidden: boolean): AreablockValue {
    return value.map(entry => String(entry.key) === String(key) ? { ...entry, hidden } : entry)
  },

  calculateNextKey (value: AreablockValue, domKeys: Array<string | null> = []): number {
    const numericKeys = [
      ...value.map(entry => parseInt(String(entry.key), 10)),
      ...domKeys.map(key => parseInt(key ?? '', 10))
    ].filter(key => !Number.isNaN(key))

    return (numericKeys.length > 0 ? Math.max(...numericKeys) : 0) + 1
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


  isTypePasteable (config: AreablockEditableConfig | undefined, type: string): boolean {
    if (!this.isTypeAllowed(config, type)) return false

    const availableTypes: AreaType[] = this.getAvailableTypes(config)

    return availableTypes.some(availableType => availableType.type === type)
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
