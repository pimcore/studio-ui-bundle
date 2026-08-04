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
import { useTranslation } from 'react-i18next'
import { useDynamicTypeResolver } from '@Pimcore/modules/element/dynamic-types/resolver/hooks/use-dynamic-type-resolver'
import { DynamicTypeFieldFilterAbstract } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/dynamic-type-field-filter-abstract'
import { type FieldFilter } from '@Pimcore/modules/element/listing/decorators/general-filters/context-layer/provider/field-filters/field-filters-provider'
import { type FieldFiltersProps } from '@Pimcore/components/field-filters/field-filters'
import { type ColumnPickerGroup } from '@Pimcore/components/column-picker/column-picker.types'
import { NOTES_FILTERABLE_FIELDS, useNotesDraftFilters } from '@Pimcore/modules/notes-and-events/filters/filters'
import { type NotesFilterColumn } from '@Pimcore/modules/notes-and-events/filters/types'

export interface UseNotesFieldFilterEditorReturn {
  filters: FieldFiltersProps['data']
  onFilterChange: NonNullable<FieldFiltersProps['onChange']>
  columnGroups: Array<ColumnPickerGroup<NotesFilterColumn>>
  handleColumnClick: (column: NotesFilterColumn) => void
}

export const useNotesFieldFilterEditor = (): UseNotesFieldFilterEditorReturn => {
  const { t } = useTranslation()

  const { getType } = useDynamicTypeResolver()
  const { values, setValue } = useNotesDraftFilters()

  const fieldFilters = (values.fieldFilters ?? []) as FieldFilter[]

  const initialFilters: FieldFiltersProps['data'] = useMemo(() => {
    const _initialFilters: FieldFiltersProps['data'] = []

    for (const filter of fieldFilters) {
      const column = NOTES_FILTERABLE_FIELDS.find((col) => col.key === filter.key)

      if (column === undefined) {
        continue
      }

      _initialFilters.push({
        id: filter.key,
        translationKey: filter.meta?.translationKey ?? t(column.translationKey),
        data: filter.filterValue,
        type: filter.type,
        frontendType: column.frontendType,
        config: filter.meta ?? {}
      })
    }

    return _initialFilters
  }, [fieldFilters, t])

  const [filters, setFilters] = useState<FieldFiltersProps['data']>(initialFilters)

  useEffect(() => {
    setFilters(initialFilters)
  }, [initialFilters])

  const onFilterChange: UseNotesFieldFilterEditorReturn['onFilterChange'] = (data) => {
    setFilters(data)
    setValue('fieldFilters', data.map((filter) => ({
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

  const handleColumnClick = (column: NotesFilterColumn): void => {
    setFilters((prevFilters) => [
      ...prevFilters,
      {
        data: undefined,
        id: column.key,
        translationKey: t(column.translationKey),
        type: column.type,
        frontendType: column.frontendType,
        config: {}
      }
    ])
  }

  const availableColumns = useMemo(() => NOTES_FILTERABLE_FIELDS.filter((column) => {
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
  }), [filters])

  const columnGroups = useMemo<Array<ColumnPickerGroup<NotesFilterColumn>>>(() => {
    if (availableColumns.length === 0) {
      return []
    }

    return [{
      key: 'notes-columns',
      label: '',
      items: availableColumns.map((column) => ({
        key: column.key,
        label: t(column.translationKey),
        meta: column
      }))
    }]
  }, [availableColumns, t])

  return { filters, onFilterChange, columnGroups, handleColumnClick }
}
