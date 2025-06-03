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
import { useInjection } from '@Pimcore/app/depency-injection'
import type { DynamicTypeFieldFilterRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/dynamic-type-field-filter-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Dropdown, type DropdownProps } from '@Pimcore/components/dropdown/dropdown'
import { useAvailableColumns } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns'
import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import { FieldFilters, type FieldFiltersProps } from '@Pimcore/components/field-filters/field-filters'
import { useFilter } from '../provider/filter-provider/use-filter'

const FILTER_FIELD_KEY_IGNORE_LIST = ['size']

export const FieldFiltersContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { availableColumns } = useAvailableColumns()
  const { hasType } = useDynamicTypeResolver()
  const { fieldFilters, setFieldFilters } = useFilter()

  const objectDataRegistry = useInjection<DynamicTypeFieldFilterRegistry>(serviceIds['DynamicTypes/FieldFilterRegistry'])

  const initialFilters: FieldFiltersProps['data'] = useMemo(() => fieldFilters.map((filter) => {
    const currentColumn = availableColumns.find((column) => column.key === filter.key)
    console.log('test teest')

    return {
      id: filter.key,
      data: filter.filterValue,
      type: filter.type,
      filterType: filter?.filterType,
      frontendType: currentColumn?.frontendType,
      config: currentColumn?.config
    }
  }), [fieldFilters, availableColumns])

  const [filters, setFilters] = useState<FieldFiltersProps['data']>(initialFilters)

  const onFilterChange: FieldFiltersProps['onChange'] = (data) => {
    setFilters(data)
    setFieldFilters(data.map((filter) => ({
      key: filter.id,
      filterType: filter?.filterType,
      filterValue: filter.data,
      type: filter.type
    })))
  }

  useEffect(() => {
    setFilters(initialFilters)
  }, [initialFilters])

  const handleColumnClick = (column: AvailableColumn): void => {
    const objectDataByFrontendType = objectDataRegistry.getDynamicType(column.frontendType!)

    const isObjectHasDataByColumnType = objectDataRegistry.hasDynamicType(column.type)
    let shouldOverrideFilterType = false

    if (isObjectHasDataByColumnType) {
      const objectDataByColumnType = objectDataRegistry.getDynamicType(column.type)

      shouldOverrideFilterType = objectDataByColumnType.shouldOverrideFilterType()
    }

    setFilters((prevFilters) => [
      ...prevFilters,
      {
        data: undefined,
        id: column.key,
        type: column.type,
        frontendType: column.frontendType,
        config: column.config,
        ...(shouldOverrideFilterType && { filterType: objectDataByFrontendType.getFieldFilterType() })
      }
    ])
  }

  const availableFilterColumns = useMemo(() => availableColumns.filter((column) => {
    const hasDynamicType = hasType({ target: 'FIELD_FILTER', dynamicTypeIds: [column.frontendType!] })
    const isIgnoredField = FILTER_FIELD_KEY_IGNORE_LIST.includes(column.key) || column.filterable !== true

    return hasDynamicType && !isIgnoredField && !filters.some((filter) => filter.id === column.key)
  }), [availableColumns, filters])

  const getFilteredDropDownMenuItems = useMemo(() => (): DropdownProps['menu']['items'] => {
    const groupedItems: DropdownProps['menu']['items'] = []

    availableFilterColumns.forEach((column) => {
      const group = column.group

      if (groupedItems[group] === undefined) {
        groupedItems[group] = []
      }

      let translationKey = `${column.key}`

      if ('fieldDefinition' in column.config) {
        const fieldDefinition = column.config.fieldDefinition as Record<string, any>
        translationKey = fieldDefinition?.title ?? column.key
      }

      groupedItems[group].push({
        key: column.key,
        label: t(translationKey),
        onClick: () => { handleColumnClick(column) }
      })
    })

    return Object.keys(groupedItems).map((group) => ({
      key: group,
      label: t(group),
      children: groupedItems[group]
    }))
  }, [availableFilterColumns])

  return (
    <Space
      className='w-full'
      direction='vertical'
    >
      <FieldFilters
        data={ filters }
        onChange={ onFilterChange }
      />

      <Dropdown menu={ { items: getFilteredDropDownMenuItems() } }>
        <IconTextButton
          icon={ { value: 'new' } }
          type='link'
        >
          { t('listing.add-column') }
        </IconTextButton>
      </Dropdown>
    </Space>
  )
}
