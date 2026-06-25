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
import { isEmpty, isNull, reject, uniq } from 'lodash'
import { type IDynamicFilter } from '@Pimcore/components/dynamic-filter/provider/dynamic-filter-provider'
import { type ColumnPickerGroup } from '@Pimcore/components/column-picker/column-picker.types'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import { type BundleCustomReportsColumnConfiguration } from '@Pimcore/modules/reports/custom-reports-api-slice-enhanced'
import { useReportDataContext } from '@Pimcore/modules/reports/reports-view/context/report-data-context'
import { useFullChartData } from '@Pimcore/modules/reports/reports-view/hooks/useFullChartData'
import { useReportsDraftFilters } from '@Pimcore/modules/reports/reports-view/components/report-sidebar/components/filters/reports-filters'
import { FIELD_TYPE_MAP } from '@Pimcore/modules/reports/reports-view/components/report-sidebar/components/columns-filters/field-filters/helpers'

const getLabelValue = (column: BundleCustomReportsColumnConfiguration): string => (
  !isEmptyValue(column.label) ? column.label : column.name
)

export interface UseFieldFilterEditorReturn {
  fieldFilters: IDynamicFilter[]
  onFilterChange: (data: IDynamicFilter[]) => void
  columnGroups: Array<ColumnPickerGroup<BundleCustomReportsColumnConfiguration>>
  handleColumnClick: (column: BundleCustomReportsColumnConfiguration) => void
}

export const useFieldFilterEditor = (): UseFieldFilterEditorReturn => {
  const { values, setValue } = useReportsDraftFilters()
  const fieldFilters = (values.fieldFilters ?? []) as IDynamicFilter[]

  const { reportDetailData } = useReportDataContext()
  const { data: fullChartDetailData } = useFullChartData({ name: reportDetailData?.name ?? '' })

  const onFilterChange = (data: IDynamicFilter[]): void => {
    setValue('fieldFilters', data)
  }

  const handleColumnClick = (column: BundleCustomReportsColumnConfiguration): void => {
    const filterType: string = column.filterType ?? 'string'
    const frontendType: string = FIELD_TYPE_MAP[filterType].frontendType
    const type: string = FIELD_TYPE_MAP[filterType].type

    const id = getLabelValue(column)
    const fieldName = column.name
    const fieldOptions = reject(
      fullChartDetailData?.items.map((item) => item.data[fieldName]),
      (option) => isNull(option)
    )

    onFilterChange([
      ...fieldFilters,
      {
        data: undefined,
        id,
        translationKey: id,
        name: fieldName,
        type,
        frontendType,
        config: {
          options: uniq(fieldOptions),
          showSearch: frontendType === 'select'
        }
      }
    ])
  }

  const columnGroups = useMemo<Array<ColumnPickerGroup<BundleCustomReportsColumnConfiguration>>>(() => {
    if (isEmpty(fullChartDetailData)) {
      return []
    }

    const availableColumns = (reportDetailData?.columnConfigurations ?? [])
      .filter((item) => item.display && !isEmptyValue(item.filterType))
      .filter((initialColumn) => !fieldFilters.some((column) => initialColumn.name === column.name))

    if (availableColumns.length === 0) {
      return []
    }

    return [{
      key: 'report-columns',
      label: '',
      items: availableColumns.map((column) => ({
        key: String(column.id),
        label: getLabelValue(column),
        meta: column
      }))
    }]
  }, [fullChartDetailData, reportDetailData, fieldFilters])

  return { fieldFilters, onFilterChange, columnGroups, handleColumnClick }
}
