/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDynamicTypeResolver } from '@Pimcore/modules/element/dynamic-types/resolver/hooks/use-dynamic-type-resolver'
import { Space } from 'antd'
import { useTranslation } from 'react-i18next'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { isEmpty, isNil } from 'lodash'
import { Dropdown, type DropdownProps } from '@Pimcore/components/dropdown/dropdown'
import { useAvailableColumns } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns'
import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import { FieldFilters, type FieldFiltersProps } from '@Pimcore/components/field-filters/field-filters'
import { useFilter } from '../provider/filter-provider/use-filter'
import { type DynamicTypeFieldFilterAbstract } from '@sdk/modules/element'
import { useFocusRestore } from '../focus-context'

const FILTER_FIELD_KEY_IGNORE_LIST = ['size']

export const FieldFiltersContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { availableColumns } = useAvailableColumns()
  const { getType } = useDynamicTypeResolver()
  const { fieldFilters, setFieldFilters } = useFilter()
  const { restoreFocus } = useFocusRestore()

  const initialFilters: FieldFiltersProps['data'] = useMemo(() => fieldFilters.map((filter) => {
    const currentColumn = availableColumns.find((column) => column.key === filter.key)

    return {
      id: `${filter.key}`,
      data: filter.filterValue,
      type: filter.type,
      filterType: filter?.filterType,
      frontendType: currentColumn?.frontendType,
      localizable: currentColumn?.localizable,
      locale: filter?.locale,
      config: currentColumn?.config,
      nameTooltip: currentColumn?.group !== undefined ? Array.isArray(currentColumn.group) ? currentColumn.group.join('/') : undefined : undefined
    }
  }), [fieldFilters, availableColumns])

  const [filters, setFilters] = useState<FieldFiltersProps['data']>(initialFilters)
  const previousFilterCount = useRef<number>(filters.length)

  const onFilterChange: FieldFiltersProps['onChange'] = (data) => {
    setFilters(data)
    setFieldFilters(data.map((filter) => ({
      key: filter.id,
      filterType: filter?.filterType,
      filterValue: filter.data,
      type: filter.type,
      locale: filter.locale
    })))
  }

  useEffect(() => {
    setFilters(initialFilters)
  }, [initialFilters])

  useEffect(() => {
    if (filters.length > previousFilterCount.current) {
      restoreFocus()
    }
    previousFilterCount.current = filters.length
  }, [filters.length, restoreFocus])

  const handleColumnClick = (column: AvailableColumn): void => {
    const objectDataByFrontendType = getType({ target: 'FIELD_FILTER', dynamicTypeIds: [column.frontendType!] })

    let inferredFilterType: DynamicTypeFieldFilterAbstract | null = null

    if (objectDataByFrontendType !== null && 'dynamicTypeFieldFilterType' in objectDataByFrontendType) {
      inferredFilterType = objectDataByFrontendType.dynamicTypeFieldFilterType as DynamicTypeFieldFilterAbstract
    } else if (objectDataByFrontendType !== null) {
      inferredFilterType = objectDataByFrontendType as DynamicTypeFieldFilterAbstract
    }

    setFilters((prevFilters) => [
      ...prevFilters,
      {
        data: undefined,
        id: column.key,
        type: column.type,
        frontendType: column.frontendType,
        localizable: column.localizable,
        locale: column.locale,
        config: column.config,
        nameTooltip: column?.group !== undefined ? Array.isArray(column.group) ? column.group.join('/') : undefined : undefined,
        ...(inferredFilterType !== null && { filterType: inferredFilterType.getFieldFilterType() })
      }
    ])
  }

  const availableFilterColumns = useMemo(() => availableColumns.filter((column) => {
    const dynamicType = getType({ target: 'FIELD_FILTER', dynamicTypeIds: [column.frontendType!] })

    let isNoneType = false

    if (dynamicType !== null && 'dynamicTypeFieldFilterType' in dynamicType) {
      const fieldFilterType = dynamicType.dynamicTypeFieldFilterType as DynamicTypeFieldFilterAbstract
      isNoneType = fieldFilterType.id === 'none'
    }

    const hasDynamicType = dynamicType !== null
    const isIgnoredField = FILTER_FIELD_KEY_IGNORE_LIST.includes(column.key) || column.filterable !== true

    return hasDynamicType && !isIgnoredField && !isNoneType && !filters.some((filter) => filter.id === column.key)
  }), [availableColumns, filters])

  const getFilteredDropDownMenuItems = useMemo((): DropdownProps['menu']['items'] => {
    // Helper function to create nested menu structure from group paths
    const createNestedStructure = (columns: typeof availableFilterColumns): any[] => {
      const groupTree: Record<string, any> = {}
      let menuIndex = 0

      // Build the tree structure by processing each column's group
      columns.forEach((column) => {
        // Handle the group - it's always a one-dimensional array representing a single group path
        let groupParts: string[] = []

        if (Array.isArray(column.group)) {
          // Convert array elements to strings
          groupParts = column.group.map(part => String(part))
        } else {
          return
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

            if ('fieldDefinition' in column.config && !isNil(column.config)) {
              const fieldDefinition = column.config.fieldDefinition as Record<string, any>
              translationKey = fieldDefinition?.title ?? column.key
            }

            return {
              key: column.key,
              label: t(translationKey),
              onClick: () => { handleColumnClick(column) }
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

    return createNestedStructure(availableFilterColumns)
  }, [availableFilterColumns, t])

  return (
    <Space
      className='w-full'
      direction='vertical'
    >
      <FieldFilters
        data={ filters }
        onChange={ onFilterChange }
      />

      <Dropdown menu={ { items: getFilteredDropDownMenuItems } }>
        <IconTextButton
          icon={ { value: 'new' } }
          type='link'
        >
          {t('listing.add-column')}
        </IconTextButton>
      </Dropdown>
    </Space>
  )
}
