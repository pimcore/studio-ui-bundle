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
import { isEmpty } from 'lodash'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Title } from '@Pimcore/components/title/title'
import { Flex } from '@Pimcore/components/flex/flex'
import { useColumnsContext } from '@Pimcore/components/grid/contexts/columns-context'
import type {
  BundleCustomReportsColumnConfiguration,
  BundleCustomReportsDetails
} from '@Pimcore/modules/reports/custom-reports-api-slice-enhanced'
import { Dropdown, type DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import type { FieldFiltersProps } from '@Pimcore/components/field-filters/field-filters'
import { FieldFilters as FieldFiltersComponent } from '@Pimcore/components/field-filters/field-filters'

const MAPPER = {
  string: {
    frontendType: 'input',
    type: 'system.string'
  },
  numeric: {
    frontendType: 'id',
    type: 'system.id'
  },
  boolean: {
    frontendType: 'checkbox',
    type: 'system.string'
  },
  date: {
    frontendType: 'datetime',
    type: 'system.datetime'
  }
}

export const FieldFilters = ({ reportData }: { reportData: BundleCustomReportsDetails }): React.JSX.Element => {
  const { t } = useTranslation()

  const { columns } = useColumnsContext()

  const [addColumnMenu, setAddColumnMenu] = useState<DropdownMenuProps['items']>([])
  const [filters, setFilters] = useState<FieldFiltersProps['data']>([])

  const handleColumnClick = (column: BundleCustomReportsColumnConfiguration): void => {
    const filterType: string = column.filterType ?? 'string'

    const frontendType: string = MAPPER[filterType].frontendType
    const type: string = MAPPER[filterType].type

    setFilters((prevFilters) => [
      ...prevFilters,
      {
        data: undefined,
        id: column.label!,
        name: column.name,
        type,
        frontendType,
        config: []
      }
    ])
  }

  const onFilterChange: FieldFiltersProps['onChange'] = (data) => {
    setFilters(data)
  }

  useEffect(() => {
    const newAddColumnMenu = reportData?.columnConfigurations?.map((column) => ({
      key: column.id as Key,
      label: !isEmptyValue(column.label) ? column.label : column.name,
      onClick: () => { handleColumnClick(column) }
    }))

    setAddColumnMenu(newAddColumnMenu)
  }, [columns])

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
