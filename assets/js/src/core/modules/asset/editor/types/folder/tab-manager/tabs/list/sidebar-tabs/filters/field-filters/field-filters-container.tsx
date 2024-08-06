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

import React from 'react'
import { useListGridConfig } from '../../../hooks/use-list'
import { Dropdown, Space, type MenuProps } from 'antd'
import { useTranslation } from 'react-i18next'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { type GridColumnConfiguration } from 'src/sdk/main'
import { FieldFiltersListContainer } from './field-filters-list-container'
import { useFilters } from '../hooks/use-filters'

export const FieldFiltersContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { dropDownMenu } = useListGridConfig()
  const { columns, addColumn } = useFilters()

  return (
    <Space
      direction='vertical'
      style={ { width: '100%' } }
    >
      <FieldFiltersListContainer columns={ columns } />

      <Dropdown menu={ { items: getFormattedDropDownMenu() } }>
        <IconTextButton
          icon='PlusCircleOutlined'
          type='link'
        >
          { t('listing.add-column') }
        </IconTextButton>
      </Dropdown>
    </Space>
  )

  function getFormattedDropDownMenu (): MenuProps['items'] {
    const formattedDropDownMenu: MenuProps['items'] = []
    let index = 0

    for (const [key, value] of Object.entries(dropDownMenu)) {
      formattedDropDownMenu.push({
        key: index++,
        label: t(`asset.listing.groups.${key}`),
        children: value.map((column) => ({
          key: column.key,
          label: t(`asset.listing.column.${column.key}`),
          onClick: () => { onColumnClick(column) }
        }))
      })
    }

    return formattedDropDownMenu
  }

  function onColumnClick (column: GridColumnConfiguration): void {
    addColumn(column)
  }
}
