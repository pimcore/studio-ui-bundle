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
import { useAvailableColumns } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns'
import { type AvailableColumn, buildColumnPickerGroups } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import { type ColumnPickerGroup } from '@Pimcore/components/column-picker/column-picker.types'
import { type FieldFiltersProps } from '@Pimcore/components/field-filters/field-filters'
import { useDraftFilterValues } from '../../../../../../element-filters'
import { DynamicTypeFieldFilterAbstract } from '@sdk/modules/element'
import { useClassificationStoreModal } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/provider/classifcation-store-modal-provider'
import { useClassDefinitionSelectionOptional } from '@Pimcore/modules/data-object/listing/decorator/class-definition-selection/context-layer/provider/use-class-definition-selection'
import { TabId } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/types'
import { type ClassificationStoreModalProps } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/components/classification-store-modal/classification-store-modal'
import { hasFieldDefinition } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/has-field-definition'

export interface UseFieldFilterEditorReturn {
  filters: FieldFiltersProps['data']
  onFilterChange: NonNullable<FieldFiltersProps['onChange']>
  columnGroups: Array<ColumnPickerGroup<AvailableColumn>>
  handleColumnClick: (column: AvailableColumn) => void
}

/**
 * Encapsulates the field-filter editor state and the "add field filter" logic
 * so the list (rendered in the panel content) and the add control (rendered in
 * the bottom toolbar) can share a single source of truth.
 */
export const useFieldFilterEditor = (): UseFieldFilterEditorReturn => {
  const { t } = useTranslation()
  const { availableColumns } = useAvailableColumns()
  const { getType } = useDynamicTypeResolver()
  const { fieldFilters, setFieldFilters } = useDraftFilterValues()
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

  const onFilterChange: UseFieldFilterEditorReturn['onFilterChange'] = (data) => {
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
    if (!hasFieldDefinition(column.config) || classDefinitionContext === undefined) {
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

  const columnGroups = useMemo(
    () => buildColumnPickerGroups(availableFilterColumns, t),
    [availableFilterColumns, t]
  )

  return { filters, onFilterChange, columnGroups, handleColumnClick }
}
