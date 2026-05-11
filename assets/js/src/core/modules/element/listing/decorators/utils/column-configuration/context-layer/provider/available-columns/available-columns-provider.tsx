/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type DropdownProps } from '@Pimcore/components/dropdown/dropdown'
import React, { createContext, useMemo, useState } from 'react'
import { type GridColumnConfiguration as AssetGridColumnConfig } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { type GridColumnConfiguration as ObjectGridColumnConfig } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import { useTranslation } from 'react-i18next'
import { isEmpty, isNil } from 'lodash'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import { hasFieldDefinition } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/has-field-definition'

// @todo: Create a union type for all the different element types
export type AvailableColumn = (AssetGridColumnConfig | ObjectGridColumnConfig) & {
  __meta?: {
    uniqueId?: string
    advancedColumnConfig?: Record<string, any>
    [key: string]: any
  }
}

export interface OnMenuItemClickEvent {
  column: AvailableColumn
}

export type OnMenuItemClick = (column: AvailableColumn) => void

/**
 * Data structure for the available columns context.
 * Supports nested menu structure based on group property:
 * - Single group: group: "assets" creates a single-level menu
 * - Nested group: group: "assets.metadata" creates "assets" > "metadata" submenu
 * - Array group: group: ["Attributes", "attributes", "Bodywork"] creates "Attributes" > "attributes" > "Bodywork" submenu
 * - Multiple groups: group: [["Attributes", "Engine"], "system"] creates items in both "Attributes" > "Engine" and "system"
 */
export interface AvailableColumnsData {
  availableColumns: AvailableColumn[]
  setAvailableColumns: (availableColumns: AvailableColumn[]) => void
  getAvailableColumnsDropdown: (menuClickHandler: OnMenuItemClick) => DropdownProps
}

export type AvailableColumnsContextProps = AvailableColumnsData | undefined

export const AvailableColumnsContext = createContext<AvailableColumnsContextProps>(undefined)

export interface AvailableColumnsProviderProps {
  children: React.ReactNode
}

export const AvailableColumnsProvider = ({ children }: AvailableColumnsProviderProps): React.JSX.Element => {
  const [availableColumns, setAvailableColumns] = useState<AvailableColumnsData['availableColumns']>([])
  const { t } = useTranslation()

  const getAvailableColumnsDropdown: AvailableColumnsData['getAvailableColumnsDropdown'] = useMemo(() => {
    return (onMenuItemClick: OnMenuItemClick): DropdownProps => {
      // Helper function to create nested menu structure from group paths
      const createNestedStructure = (columns: AvailableColumn[]): any[] => {
        const groupTree: Record<string, any> = {}
        let menuIndex = 0

        // Build the tree structure by processing each column's group(s)
        columns.forEach((column) => {
          // Normalize groups to handle different input formats:
          // - Single string: "assets.metadata"
          // - Array of strings/arrays: ["system", ["Attributes", "Engine"]]
          // - Simple array: ["Attributes", "attributes", "Bodywork"]
          let normalizedGroups: Array<string | string[]> = []

          if (Array.isArray(column.group)) {
            // Check if this is a nested array structure like [["Attributes", "Engine"], "system"]
            // or a simple array like ["Attributes", "attributes", "Bodywork"]
            const hasNestedArrays = column.group.some(item => Array.isArray(item))

            if (hasNestedArrays) {
              // Handle nested array structure - each item becomes a separate group path
              normalizedGroups = column.group
            } else {
              // Handle simple array - treat as single group path
              normalizedGroups = [column.group]
            }
          }

          normalizedGroups.forEach((groupPath) => {
            let groupParts: string[] = []

            // Handle different group path formats:
            // 1. String: "assets.metadata" -> ["assets", "metadata"]
            // 2. Array of strings: ["Attributes", "attributes", "Bodywork"] -> ["Attributes", "attributes", "Bodywork"]
            if (typeof groupPath === 'string') {
              groupParts = groupPath.split('.')
            } else if (Array.isArray(groupPath)) {
              // Convert all elements to strings
              groupParts = groupPath.map(part => String(part))
            } else {
              // Fallback for any other type
              groupParts = [String(groupPath)]
            }

            let currentLevel = groupTree

            // Navigate/create the nested tree structure
            groupParts.forEach((part, index) => {
              if (isNil(currentLevel[part])) {
                currentLevel[part] = {
                  items: [], // Columns that belong directly to this group level
                  subGroups: {} // Nested sub-groups
                }
              }

              // If this is the final part of the group path, add the column to this level
              if (index === groupParts.length - 1) {
                currentLevel[part].items.push(column)
              } else {
                // Move deeper into the tree structure
                currentLevel = currentLevel[part].subGroups
              }
            })
          })
        })

        // Convert the tree structure into Ant Design menu format
        const convertTreeToMenuItems = (tree: Record<string, any>, parentPath = ''): any[] => {
          return Object.entries(tree).map(([groupName, groupData]) => {
            const currentPath = parentPath !== '' ? `${parentPath}.${groupName}` : groupName
            const menuItem: any = {
              key: `group-${menuIndex++}`,
              label: t(groupName)
            }

            // Process sub-groups recursively
            const subGroupItems = !isEmpty(Object.keys(groupData.subGroups as Record<string, any>))
              ? convertTreeToMenuItems(groupData.subGroups as Record<string, any>, currentPath)
              : []

            // Create menu items for columns at this level
            const columnItems = groupData.items.map((column: AvailableColumn) => {
              let translationKey = `${column.key}`

              if (hasFieldDefinition(column.config)) {
                const fieldDefinition = column.config.fieldDefinition as Record<string, any>
                translationKey = !isEmptyValue(fieldDefinition?.title) ? fieldDefinition?.title : column.key
              }

              return {
                key: column.key,
                label: t(translationKey),
                group: column.group,
                mainType: column.type,
                frontendType: column.frontendType,
                editable: column.editable,
                onClick: () => {
                  onMenuItemClick(column)
                }
              }
            })

            // Combine sub-groups and column items as children
            const allChildren = [...subGroupItems, ...columnItems]
            if (allChildren.length > 0) {
              menuItem.children = allChildren
            }

            return menuItem
          })
        }

        return convertTreeToMenuItems(groupTree)
      }

      return {
        menu: {
          items: createNestedStructure(availableColumns)
        }
      }
    }
  }, [availableColumns, t])

  return useMemo(() => (
    <AvailableColumnsContext.Provider value={ { availableColumns, setAvailableColumns, getAvailableColumnsDropdown } }>
      {children}
    </AvailableColumnsContext.Provider>
  ), [availableColumns])
}
