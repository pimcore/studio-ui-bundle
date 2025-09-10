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
import { FIELD_TYPE_MAP, FRONTEND_TO_ORIGINAL_TYPE } from '@Pimcore/modules/reports/reports-view/components/report-sidebar/components/columns-filters/components/field-filters/utils/helpers'
import { useColumnsFiltersContext } from '@Pimcore/modules/reports/reports-view/components/report-sidebar/components/columns-filters/context/columns-filters-context'
import { useReportDataContext } from '@Pimcore/modules/reports/reports-view/context/report-data-context'
import { useFullChartData } from '@Pimcore/modules/reports/reports-view/hooks/useFullChartData'

const EQUAL_OPERATOR = 'eq'

export const FieldFilters = (): React.JSX.Element => {
  const { t } = useTranslation()

  const [addColumnMenu, setAddColumnMenu] = useState<DropdownMenuProps['items']>([])

  const { reportDetailData } = useReportDataContext()
  const { setColumnsFilters, fieldFilters, setFieldFilters } = useColumnsFiltersContext()
  const { data: fullChartDetailData } = useFullChartData({ name: reportDetailData?.name ?? '' })

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
      .map(item => ({
        property: item.name!,
        type: FRONTEND_TO_ORIGINAL_TYPE[item.frontendType!],
        operator: EQUAL_OPERATOR,
        value: String(item.data)
      }))

    !isUndefined(updatedColumnFilters) && setColumnsFilters(updatedColumnFilters)
  }

  useEffect(() => {
    setFieldFilters([])
    setColumnsFilters([])
  }, [reportDetailData])

  useEffect(() => {
    if (isEmpty(fullChartDetailData)) return

    const columnConfigurationsList = reportDetailData?.columnConfigurations.filter(item => item.display)

    const newAddColumnMenu = columnConfigurationsList
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
