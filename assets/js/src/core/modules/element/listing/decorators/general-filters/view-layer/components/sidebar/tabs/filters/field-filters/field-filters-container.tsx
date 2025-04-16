/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React, { useEffect, useMemo, useState } from 'react'
import { useDynamicTypeResolver } from '@Pimcore/modules/element/dynamic-types/resolver/hooks/use-dynamic-type-resolver'
import { Space } from 'antd'
import { useTranslation } from 'react-i18next'
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

  const initialFilters: FieldFiltersProps['data'] = useMemo(() => fieldFilters.map((filter) => {
    const currentColumn = availableColumns.find((column) => column.key === filter.key)

    return {
      id: filter.key,
      data: filter.filterValue,
      type: filter.type,
      frontendType: currentColumn?.frontendType,
      config: currentColumn?.config
    }
  }), [fieldFilters, availableColumns])

  const [filters, setFilters] = useState<FieldFiltersProps['data']>(initialFilters)

  const onFilterChange: FieldFiltersProps['onChange'] = (data) => {
    setFilters(data)
    setFieldFilters(data.map((filter) => ({
      key: filter.id,
      filterValue: filter.data,
      type: filter.type
    })))
  }

  useEffect(() => {
    setFilters(initialFilters)
  }, [initialFilters])

  const handleColumnClick = (column: AvailableColumn): void => {
    setFilters((prevFilters) => [
      ...prevFilters,
      {
        data: undefined,
        id: column.key,
        type: column.type,
        frontendType: column.frontendType,
        config: column.config
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
