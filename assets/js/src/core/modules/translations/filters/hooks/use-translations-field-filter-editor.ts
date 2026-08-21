/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useEffect, useMemo, useState } from 'react'
import { useDynamicTypeResolver } from '@Pimcore/modules/element/dynamic-types/resolver/hooks/use-dynamic-type-resolver'
import { DynamicTypeFieldFilterAbstract } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/dynamic-type-field-filter-abstract'
import { type FieldFilter } from '@Pimcore/modules/element/listing/decorators/general-filters/context-layer/provider/field-filters/field-filters-provider'
import { type FieldFiltersProps } from '@Pimcore/components/field-filters/field-filters'
import { type ColumnPickerGroup } from '@Pimcore/components/column-picker/column-picker.types'
import { useTranslationsAppliedFilters, useTranslationsDraftFilters } from '@Pimcore/modules/translations/filters/filters'
import { useTranslationFilterColumns } from '@Pimcore/modules/translations/filters/hooks/use-translation-filter-columns'
import { type TranslationFilterColumn } from '@Pimcore/modules/translations/filters/types'

export interface UseTranslationsFieldFilterEditorReturn {
  filters: FieldFiltersProps['data']
  onFilterChange: NonNullable<FieldFiltersProps['onChange']>
  onFilterCommit: NonNullable<FieldFiltersProps['onCommit']>
  columnGroups: Array<ColumnPickerGroup<TranslationFilterColumn>>
  handleColumnClick: (column: TranslationFilterColumn) => void
}

export const useTranslationsFieldFilterEditor = (): UseTranslationsFieldFilterEditorReturn => {
  const { getType } = useDynamicTypeResolver()
  const { values, setValue } = useTranslationsDraftFilters()
  const appliedStore = useTranslationsAppliedFilters()
  const columns = useTranslationFilterColumns()

  const fieldFilters = (values.fieldFilters ?? []) as FieldFilter[]

  const initialFilters: FieldFiltersProps['data'] = useMemo(() => {
    const _initialFilters: FieldFiltersProps['data'] = []

    for (const filter of fieldFilters) {
      const column = columns.find((col) => col.key === filter.key)

      if (column === undefined) {
        continue
      }

      _initialFilters.push({
        id: filter.key,
        translationKey: filter.meta?.translationKey ?? column.label,
        data: filter.filterValue,
        type: filter.type,
        frontendType: column.frontendType,
        config: filter.meta ?? {}
      })
    }

    return _initialFilters
  }, [fieldFilters, columns])

  const [filters, setFilters] = useState<FieldFiltersProps['data']>(initialFilters)

  useEffect(() => {
    setFilters(initialFilters)
  }, [initialFilters])

  const toFieldFilters = (data: FieldFiltersProps['data']): FieldFilter[] => data.map((filter) => ({
    key: filter.id,
    filterValue: filter.data,
    type: filter.type,
    locale: filter.locale,
    meta: {
      translationKey: filter.translationKey,
      ...filter.config ?? {}
    }
  }))

  const onFilterChange: UseTranslationsFieldFilterEditorReturn['onFilterChange'] = (data) => {
    setFilters(data)
    setValue('fieldFilters', toFieldFilters(data))
  }

  const onFilterCommit: UseTranslationsFieldFilterEditorReturn['onFilterCommit'] = (data) => {
    setFilters(data)
    const fieldFilters = toFieldFilters(data)
    setValue('fieldFilters', fieldFilters)
    appliedStore.setValues({ ...values, fieldFilters })
  }

  const handleColumnClick = (column: TranslationFilterColumn): void => {
    setFilters((prevFilters) => [
      ...prevFilters,
      {
        data: undefined,
        id: column.key,
        translationKey: column.label,
        type: column.type,
        frontendType: column.frontendType,
        config: {}
      }
    ])
  }

  const availableColumns = useMemo(() => columns.filter((column) => {
    if (filters.some((filter) => filter.id === column.key)) {
      return false
    }

    let dynamicType = getType({ target: 'FIELD_FILTER', dynamicTypeIds: [column.type, column.frontendType] })

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

    return (dynamicType as DynamicTypeFieldFilterAbstract).isFilterAvailable(column.frontendType)
  }), [filters, columns, getType])

  const columnGroups = useMemo<Array<ColumnPickerGroup<TranslationFilterColumn>>>(() => {
    if (availableColumns.length === 0) {
      return []
    }

    return [{
      key: 'translation-columns',
      label: '',
      items: availableColumns.map((column) => ({
        key: column.key,
        label: column.label,
        meta: column
      }))
    }]
  }, [availableColumns])

  return { filters, onFilterChange, onFilterCommit, columnGroups, handleColumnClick }
}
