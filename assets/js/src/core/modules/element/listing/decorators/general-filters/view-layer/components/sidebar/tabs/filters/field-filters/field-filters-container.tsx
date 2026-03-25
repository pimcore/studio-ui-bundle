/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useMemo, useState } from 'react'
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
import { DynamicTypeFieldFilterAbstract } from '@sdk/modules/element'
import { useClassificationStoreModal } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/provider/classifcation-store-modal-provider'
import { useClassDefinitionSelectionOptional } from '@Pimcore/modules/data-object/listing/decorator/class-definition-selection/context-layer/provider/use-class-definition-selection'
import { TabId } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/types'
import { type ClassificationStoreModalProps } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/components/classification-store-modal/classification-store-modal'

export const FieldFiltersContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { availableColumns } = useAvailableColumns()
  const { getType } = useDynamicTypeResolver()
  const { fieldFilters, setFieldFilters } = useFilter()
  const { openModal } = useClassificationStoreModal({ onUpdate: onAddClassificationStoreColumn })
  const classDefinitionContext = useClassDefinitionSelectionOptional()

  const initialFilters: FieldFiltersProps['data'] = useMemo(() => {
    const _initialFilters: FieldFiltersProps['data'] = []

    for (const filter of fieldFilters) {
      const currentColumn = availableColumns.find((column) => column.key === filter.key)

      if (currentColumn === undefined) {
        continue
      }

      _initialFilters.push({
        id: `${filter.key}`,
        translationKey: filter.meta?.translationKey ?? filter.key,
        data: filter.filterValue,
        type: filter.type,
        frontendType: currentColumn?.frontendType,
        localizable: currentColumn?.localizable,
        locale: filter?.locale,
        config: filter.meta ?? currentColumn?.config,
        nameTooltip: currentColumn?.group !== undefined ? Array.isArray(currentColumn.group) ? currentColumn.group.join('/') : undefined : undefined
      })
    }

    return _initialFilters
  }, [fieldFilters, availableColumns])

  const [filters, setFilters] = useState<FieldFiltersProps['data']>(initialFilters)

  const onFilterChange: FieldFiltersProps['onChange'] = (data) => {
    setFilters(data)
    setFieldFilters(data.map((filter) => ({
      key: filter.id,
      filterValue: filter.data,
      type: filter.type,
      locale: filter.locale,
      meta: {
        translationKey: filter.translationKey,
        ...filter.config ?? {}
      }
    })))
  }

  useEffect(() => {
    setFilters(initialFilters)
  }, [initialFilters])

  function onAddClassificationStoreColumn (data): void {
    const column = availableColumns.find((col) => col.key === data.modalContext.fieldName)

    if (column === undefined) {
      throw new Error(`Could not find column configuration for field filter with key ${data.modalContext.fieldName}`)
    }

    const newFilters = data.data.map((item) => {
      const fieldDefinition = item.definition

      return {
        data: undefined,
        id: column.key,
        translationKey: fieldDefinition.title,
        type: column.type,
        frontendType: fieldDefinition.fieldtype,
        localizable: column.localizable,
        locale: column.localizable ? 'default' : undefined,
        config: {
          fieldDefinition,
          groupId: item.groupId,
          keyId: item.id,
          translationKey: fieldDefinition.title
        },
        nameTooltip: column?.group !== undefined ? Array.isArray(column.group) ? column.group.join('/') : undefined : undefined
      }
    })

    setFilters((prevFilters) => {
      // Prevent duplicates in case the user added the same classification store column twice
      const prevFilterIds = prevFilters.map((filter) => filter.id + JSON.stringify({ keyId: filter.config.keyId, groupId: filter.config?.groupId }))

      return [
        ...prevFilters,
        ...newFilters.filter((filter) => !prevFilterIds.includes(filter.id + JSON.stringify({ keyId: filter.config.keyId, groupId: filter.config?.groupId })))
      ]
    })
  }

  const handleClassificationStoreClick = (column: AvailableColumn): void => {
    if (!('fieldDefinition' in column.config) || isNil(column.config) || classDefinitionContext === undefined) {
      throw new Error('Column configuration is missing field definition or class definition context is undefined')
    }

    openModal({
      ...column.config.fieldDefinition as ClassificationStoreModalProps,
      fieldName: column.key,
      allowedTabs: [TabId.GroupByKey]
    })
  }

  const handleColumnClick = (column: AvailableColumn): void => {
    if (column.type === 'dataobject.classificationstore' && classDefinitionContext !== undefined) {
      handleClassificationStoreClick(column)
      return
    }

    setFilters((prevFilters) => [
      ...prevFilters,
      {
        data: undefined,
        translationKey: column.key,
        id: column.key,
        type: column.type,
        frontendType: column.frontendType,
        localizable: column.localizable,
        locale: column.locale,
        config: column.config,
        nameTooltip: column?.group !== undefined ? Array.isArray(column.group) ? column.group.join('/') : undefined : undefined
      }
    ])
  }

  const availableFilterColumns = useMemo(() => availableColumns.filter((column) => {
    let dynamicType = getType({ target: 'FIELD_FILTER', dynamicTypeIds: [column.type, column.frontendType!] })

    if (column.type === 'dataobject.classificationstore' && classDefinitionContext !== undefined) {
      return true
    }

    if (filters.some((filter) => filter.id === column.key)) {
      return false
    }

    if (dynamicType === null) {
      return false
    }

    if (!(dynamicType instanceof DynamicTypeFieldFilterAbstract)) {
      if ('dynamicTypeFieldFilterType' in dynamicType) {
        dynamicType = dynamicType.dynamicTypeFieldFilterType as DynamicTypeFieldFilterAbstract
      } else {
        return false
      }
    }

    return (dynamicType as DynamicTypeFieldFilterAbstract).isFilterAvailable(column.frontendType ?? null)
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
          data-testid="listing-field-filter-add-button"
          icon={ { value: 'new' } }
          type='link'
        >
          {t('listing.add-column')}
        </IconTextButton>
      </Dropdown>
    </Space>
  )
}
