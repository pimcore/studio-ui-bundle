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
import { isEmpty, isUndefined } from 'lodash'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Title } from '@Pimcore/components/title/title'
import { Flex } from '@Pimcore/components/flex/flex'
import type {
  BundleCustomReportsColumnConfiguration,
  BundleCustomReportsDetails
} from '@Pimcore/modules/reports/custom-reports-api-slice-enhanced'
import { Dropdown, type DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import type { FieldFiltersProps } from '@Pimcore/components/field-filters/field-filters'
import { FieldFilters as FieldFiltersComponent } from '@Pimcore/components/field-filters/field-filters'
import {
  FIELD_TYPE_MAP,
  FRONTEND_TO_ORIGINAL_TYPE
} from '@Pimcore/modules/reports/reports-view/components/report-sidebar/components/columns-filters/components/field-filters/utils/helpers'
import type { IGridFilter } from '@Pimcore/modules/reports/reports-view/types'

interface IFieldFiltersProps {
  reportData: BundleCustomReportsDetails
  setColumnFilters: (filters: IGridFilter['columnFilters']) => void
}

export const FieldFilters = ({ reportData, setColumnFilters }: IFieldFiltersProps): React.JSX.Element => {
  const { t } = useTranslation()

  const [addColumnMenu, setAddColumnMenu] = useState<DropdownMenuProps['items']>([])
  const [filters, setFilters] = useState<FieldFiltersProps['data']>([])

  const handleColumnClick = (column: BundleCustomReportsColumnConfiguration): void => {
    const filterType: string = column.filterType ?? 'string'

    const frontendType: string = FIELD_TYPE_MAP[filterType].frontendType
    const type: string = FIELD_TYPE_MAP[filterType].type
    const id = (!isEmptyValue(column.label) ? column.label : column.name)!

    setFilters((prevFilters) => [
      ...prevFilters,
      {
        data: undefined,
        id,
        name: column.name,
        type,
        frontendType,
        config: []
      }
    ])
  }

  const onFilterChange: FieldFiltersProps['onChange'] = (data) => {
    setFilters(data)

    const updatedColumnFilters = data
      .filter(item => !isUndefined(item.data))
      .map(item => ({
        property: item.name!,
        type: FRONTEND_TO_ORIGINAL_TYPE[item.frontendType!],
        operator: 'eq',
        value: String(item.data)
      }))

    !isUndefined(updatedColumnFilters) && setColumnFilters(updatedColumnFilters)
  }

  useEffect(() => {
    setFilters([])
  }, [reportData])

  useEffect(() => {
    const newAddColumnMenu = reportData?.columnConfigurations
      ?.filter((initialColumn) => !filters.some((column) => initialColumn.name === column.name))
      ?.map((column) => ({
        key: column.id as Key,
        label: !isEmptyValue(column.label) ? column.label : column.name,
        onClick: () => { handleColumnClick(column) }
      }))

    setAddColumnMenu(newAddColumnMenu)
  }, [reportData, filters])

  return (
    <>
      <Title>{t('reports.field-filters')}</Title>
      <Space
        direction='vertical'
        style={ { width: '100%' } }
      >
        <Flex vertical>
          { filters.length === 0 && <Empty image={ Empty.PRESENTED_IMAGE_SIMPLE } /> }
          { filters.length > 0 && (
            <FieldFiltersComponent
              data={ filters }
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
