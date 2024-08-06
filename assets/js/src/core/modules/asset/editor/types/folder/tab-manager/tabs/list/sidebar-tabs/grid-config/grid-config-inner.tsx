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

import { Title } from '@Pimcore/components/title/title'
import React from 'react'
import { useListColumns, useListGridConfig } from '../../hooks/use-list'
import { Button, Dropdown, Space, type MenuProps } from 'antd'
import { GridConfigList } from './grid-config-list'
import { useGridConfig } from './hooks/use-grid-config'
import { type GridColumnConfiguration } from 'src/sdk/main'
import { Toolbar } from '@Pimcore/components/sidebar/toolbar/toolbar'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { useTranslation } from 'react-i18next'

export const GridConfigInner = (): React.JSX.Element => {
  const { dropDownMenu } = useListGridConfig()
  const { columns: gridColumns, setGridColumns } = useListColumns()
  const { columns, setColumns, addColumn } = useGridConfig()
  const { t } = useTranslation()

  return (
    <>
      <Title level={ 1 }>{ t('listing.grid-config.title') }</Title>

      <Space
        direction='vertical'
        style={ { width: '100%' } }
      >
        <GridConfigList columns={ columns } />

        <Dropdown menu={ { items: getFormattedDropDownMenu() } }>
          <IconTextButton
            icon='PlusCircleOutlined'
            type='link'
          >
            { t('listing.add-column') }
          </IconTextButton>
        </Dropdown>
      </Space>

      <Toolbar>
        <Button
          onClick={ onCancelClick }
          type='default'
        >
          { t('button.cancel') }
        </Button>

        <Button
          onClick={ onApplyClick }
          type='primary'
        >
          { t('button.apply') }
        </Button>
      </Toolbar>
    </>
  )

  function onCancelClick (): void {
    setColumns(gridColumns)
  }

  function onApplyClick (): void {
    setGridColumns(columns)
  }

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
