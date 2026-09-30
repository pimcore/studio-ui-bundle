/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { type ColumnPickerGroup } from '@Pimcore/components/column-picker/column-picker.types'
import { type GridColumnConfiguration } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import { isNil } from 'lodash'
import { ADVANCED_COLUMN_KEY, ADVANCED_COLUMN_TYPE } from './types'

type GroupTree = Record<string, any>
type PickerGroups = Array<ColumnPickerGroup<GridColumnConfiguration>>

const normalizeGroups = (group: unknown): Array<string | string[]> => {
  if (Array.isArray(group)) {
    return group.some((item: any) => Array.isArray(item)) ? group : [group as string[]]
  }
  return [String(group)]
}

const toGroupParts = (groupPath: string | string[]): string[] => {
  return Array.isArray(groupPath) ? groupPath.map((part: any) => String(part)) : groupPath.split('.')
}

const addColumnToTree = (tree: GroupTree, column: GridColumnConfiguration, parts: string[]): void => {
  let currentLevel = tree
  parts.forEach((part, index) => {
    if (isNil(currentLevel[part])) {
      currentLevel[part] = { items: [], subGroups: {} }
    }
    if (index === parts.length - 1) {
      currentLevel[part].items.push(column)
    } else {
      currentLevel = currentLevel[part].subGroups
    }
  })
}

const buildGroupTree = (columns: GridColumnConfiguration[]): GroupTree => {
  const tree: GroupTree = {}
  columns.forEach((column) => {
    normalizeGroups(column.group).forEach((groupPath) => {
      addColumnToTree(tree, column, toGroupParts(groupPath))
    })
  })
  return tree
}

const resolveTranslationKey = (column: GridColumnConfiguration): string => {
  if (!isNil(column.config) && 'fieldDefinition' in column.config) {
    const fieldDefinition = column.config.fieldDefinition as Record<string, any>
    return fieldDefinition?.title ?? column.key
  }
  return column.key
}

const convertTreeToGroups = (
  tree: GroupTree,
  t: (key: string) => string,
  counter: { value: number }
): PickerGroups => {
  const result: PickerGroups = []
  Object.entries(tree).forEach(([groupName, groupData]) => {
    const children = convertTreeToGroups(groupData.subGroups as GroupTree, t, counter)
    const items = (groupData.items as GridColumnConfiguration[]).map((column) => ({
      key: column.key,
      label: t(resolveTranslationKey(column)),
      meta: column
    }))

    if (items.length > 0 || children.length > 0) {
      result.push({ key: `group-${counter.value++}`, label: t(groupName), items, children })
    }
  })
  return result
}

/**
 * Builds grouped, selectable column groups for the studio ColumnPicker from a
 * flat list of GridColumnConfiguration entries. Each leaf carries its column in
 * `meta`, so the picker's `onSelect` can hand it back to the add-column handler.
 */
export const useAddColumnGroups = (availableColumns: GridColumnConfiguration[]): PickerGroups => {
  const { t } = useTranslation()

  return useMemo((): PickerGroups => {
    // The advanced column is offered through its own dedicated button, not the tree.
    const treeColumns = availableColumns.filter(
      (column) => column.key !== ADVANCED_COLUMN_KEY && column.type !== ADVANCED_COLUMN_TYPE
    )

    return convertTreeToGroups(buildGroupTree(treeColumns), t, { value: 0 })
  }, [availableColumns, t])
}
