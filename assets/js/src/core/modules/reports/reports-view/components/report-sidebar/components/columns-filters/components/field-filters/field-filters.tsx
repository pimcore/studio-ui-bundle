/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type Key, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Empty, Space } from 'antd'
import { isEmpty, isNull, isUndefined, reject, uniq } from 'lodash'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Title } from '@Pimcore/components/title/title'
import { Flex } from '@Pimcore/components/flex/flex'
import type { BundleCustomReportsColumnConfiguration } from '@Pimcore/modules/reports/custom-reports-api-slice-enhanced'
import { Dropdown, type DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import type { FieldFiltersProps } from '@Pimcore/components/field-filters/field-filters'
import { FieldFilters as FieldFiltersComponent } from '@Pimcore/components/field-filters/field-filters'
import {
  FIELD_TYPE_MAP,
  FRONTEND_TO_ORIGINAL_TYPE,
  getDateFieldFilterData,
  getNumberFieldFilterData
} from '@Pimcore/modules/reports/reports-view/components/report-sidebar/components/columns-filters/components/field-filters/helpers'
import { useColumnsFiltersContext } from '@Pimcore/modules/reports/reports-view/components/report-sidebar/components/columns-filters/context/columns-filters-context'
import { useReportDataContext } from '@Pimcore/modules/reports/reports-view/context/report-data-context'
import { useFullChartData } from '@Pimcore/modules/reports/reports-view/hooks/useFullChartData'
import { useDynamicTypeResolver } from '@Pimcore/modules/element/dynamic-types/resolver/hooks/use-dynamic-type-resolver'
import type { DynamicTypeFieldFilterAbstract } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/dynamic-type-field-filter-abstract'
import { FieldFilterOperators, type IFieldFilterTypeData } from '@Pimcore/modules/reports/reports-view/components/report-sidebar/components/columns-filters/components/field-filters/types'
import { DynamicTypeFieldFilterNumber } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/types/number/dynamic-type-field-filter-number'
import { type NumberValue } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/components/dynamic-type-field-filter-number-component'
import { DynamicTypeFieldFilterDate } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/types/date/dynamic-type-field-filter-date'
import { type DateValue } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/components/dynamic-type-field-filter-date-component'

export const FieldFilters = (): React.JSX.Element => {
  const { t } = useTranslation()

  const [addColumnMenu, setAddColumnMenu] = useState<DropdownMenuProps['items']>([])

  const { reportDetailData } = useReportDataContext()
  const { setColumnsFilters, fieldFilters, setFieldFilters } = useColumnsFiltersContext()
  const { data: fullChartDetailData } = useFullChartData({ name: reportDetailData?.name ?? '' })

  const { getType } = useDynamicTypeResolver()

  const getLabelValue = (column: BundleCustomReportsColumnConfiguration): string => (
    (!isEmptyValue(column.label) ? column.label : column.name)
  )

  const handleColumnClick = (column: BundleCustomReportsColumnConfiguration): void => {
    const filterType: string = column.filterType ?? 'string'
    const frontendType: string = FIELD_TYPE_MAP[filterType].frontendType
    const type: string = FIELD_TYPE_MAP[filterType].type

    const id = getLabelValue(column)
    const fieldName = column.name
    const fieldOptions = reject(
      fullChartDetailData?.items.map(item => item.data[fieldName]),
      value => isNull(value)
    )

    setFieldFilters([
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

  const onFilterChange: FieldFiltersProps['onChange'] = (data) => {
    setFieldFilters(data)

    const updatedColumnFilters = data
      .filter(item => !isUndefined(item.data))
      .flatMap(item => {
        const dynType = getType({ target: 'FIELD_FILTER', dynamicTypeIds: [item.frontendType!] }) as DynamicTypeFieldFilterAbstract | null

        const baseFilterData = {
          property: item.name!,
          type: FRONTEND_TO_ORIGINAL_TYPE[item.frontendType!]
        }
        const defaultFilterData: IFieldFilterTypeData = {
          operator: FieldFilterOperators.LIKE,
          value: String(item.data)
        }

        if (isNull(dynType)) {
          return [{ ...baseFilterData, ...defaultFilterData }]
        }

        let filterData: IFieldFilterTypeData[] = []

        if (dynType instanceof DynamicTypeFieldFilterNumber) {
          filterData = getNumberFieldFilterData(item.data as NumberValue)
        } else if (dynType instanceof DynamicTypeFieldFilterDate) {
          filterData = getDateFieldFilterData(item.data as DateValue)
        } else {
          filterData = [defaultFilterData]
        }

        return filterData.map(filter => ({
          ...baseFilterData,
          operator: filter.operator,
          value: filter.value
        }))
      })

    !isUndefined(updatedColumnFilters) && setColumnsFilters(updatedColumnFilters)
  }

  useEffect(() => {
    setFieldFilters([])
    setColumnsFilters([])
  }, [reportDetailData])

  useEffect(() => {
    if (isEmpty(fullChartDetailData)) return

    const filterableColumnConfigurationsList = reportDetailData?.columnConfigurations.filter(item => {
      return item.display && !isEmptyValue(item.filterType)
    })

    const newAddColumnMenu = filterableColumnConfigurationsList
      ?.filter((initialColumn) => !fieldFilters.some((column) => initialColumn.name === column.name))
      ?.map((column) => ({
        key: column.id as Key,
        label: getLabelValue(column),
        onClick: () => { handleColumnClick(column) }
      }))

    setAddColumnMenu(newAddColumnMenu)
  }, [fullChartDetailData, reportDetailData, fieldFilters])

  return (
    <>
      <Title>{t('reports.field-filters')}</Title>
      <Space
        direction='vertical'
        style={ { width: '100%' } }
      >
        <Flex vertical>
          { fieldFilters.length === 0 && <Empty image={ Empty.PRESENTED_IMAGE_SIMPLE } /> }
          { fieldFilters.length > 0 && (
            <FieldFiltersComponent
              data={ fieldFilters }
              onChange={ onFilterChange }
            />
          )}
        </Flex>
        {!isEmpty(addColumnMenu) && (
          <Dropdown menu={ { items: addColumnMenu } }>
            <IconTextButton
              data-testid="report-filters-add-column-button"
              icon={ { value: 'new' } }
              type='link'
            >
              { t('reports.grid-config.add-column') }
            </IconTextButton>
          </Dropdown>
        )}
      </Space>
    </>
  )
}
