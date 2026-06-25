/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type Key, useMemo } from 'react'
import { isEmpty, isNull, reject, uniq } from 'lodash'
import { type DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'
import { type IDynamicFilter } from '@Pimcore/components/dynamic-filter/provider/dynamic-filter-provider'
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
  addColumnMenu: DropdownMenuProps['items']
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

  const addColumnMenu = useMemo<DropdownMenuProps['items']>(() => {
    if (isEmpty(fullChartDetailData)) {
      return []
    }

    const filterableColumnConfigurationsList = reportDetailData?.columnConfigurations.filter((item) => {
      return item.display && !isEmptyValue(item.filterType)
    })

    return filterableColumnConfigurationsList
      ?.filter((initialColumn) => !fieldFilters.some((column) => initialColumn.name === column.name))
      ?.map((column) => ({
        key: column.id as Key,
        label: getLabelValue(column),
        onClick: () => { handleColumnClick(column) }
      }))
  }, [fullChartDetailData, reportDetailData, fieldFilters])

  return { fieldFilters, onFilterChange, addColumnMenu }
}
