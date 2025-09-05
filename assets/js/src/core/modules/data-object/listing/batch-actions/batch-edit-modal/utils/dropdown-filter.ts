/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ItemType, type MenuItemType } from '@Pimcore/components/dropdown/dropdown'
import { type BatchEdit } from '../batch-edit-provider'

// Helper function to compare groups that can be strings, arrays, or nested arrays
export const areGroupsEqual = (group1: any, group2: any): boolean => {
  // Normalize groups to string arrays for comparison
  const normalizeGroup = (group: any): string[] => {
    if (typeof group === 'string') {
      return group.split('.')
    }
    if (Array.isArray(group)) {
      return group.flat().map(part => String(part))
    }
    return [String(group)]
  }

  const normalizedGroup1 = normalizeGroup(group1)
  const normalizedGroup2 = normalizeGroup(group2)

  // Compare arrays by length and content
  if (normalizedGroup1.length !== normalizedGroup2.length) {
    return false
  }

  return normalizedGroup1.every((part, index) => part === normalizedGroup2[index])
}

// Helper function to check if a column item should be included in batch edit options
export const shouldIncludeColumnItem = (
  item: any,
  batchEdits: BatchEdit[],
  hasType: (props: { target: string, dynamicTypeIds: string[] }) => boolean
): boolean => {
  const isEditable: boolean = item.editable === true
  const isAlreadyInBatchEditList = batchEdits.some(batchItem =>
    item.key === batchItem.key && areGroupsEqual(item.group, batchItem.group)
  )
  const hasDynamicType = hasType({
    target: 'BATCH_EDIT',
    dynamicTypeIds: [item?.mainType, item?.frontendType as string]
  })

  return isEditable && hasDynamicType && !isAlreadyInBatchEditList
}

// Recursively filter the dropdown menu while preserving the nested structure
export const filterDropdownItems = (
  items: Array<ItemType<MenuItemType>>,
  batchEdits: BatchEdit[],
  hasType: (props: { target: string, dynamicTypeIds: string[] }) => boolean
): Array<ItemType<MenuItemType>> => {
  return items.map((item: ItemType<MenuItemType>) => {
    // If this item has children, it's a group - process its children recursively
    if (item !== null && 'children' in item && item.children !== undefined && Array.isArray(item.children)) {
      const filteredChildren = filterDropdownItems(
        item.children,
        batchEdits,
        hasType
      )
      return {
        ...item,
        children: filteredChildren
      }
    } else {
      // This is a column item - check if it should be included
      return shouldIncludeColumnItem(item, batchEdits, hasType) ? item : null
    }
  }).filter((item): item is ItemType<MenuItemType> => {
    // Remove null items and groups with no valid children
    if (item === null) return false

    // Check if item has children property and validate children length
    if ('children' in item && item.children !== undefined && Array.isArray(item.children)) {
      return item.children.length > 0
    }

    return true
  })
}

// Check if the dropdown list has any selectable items (recursively)
export const hasSelectableItems = (items: Array<ItemType<MenuItemType>>): boolean => {
  return items.some((item: ItemType<MenuItemType>) => {
    if (item !== null && 'children' in item && item.children !== undefined && Array.isArray(item.children)) {
      // This is a group - check if it has selectable children
      return hasSelectableItems(item.children)
    } else {
      // This is a column item - it's selectable
      return true
    }
  })
}
