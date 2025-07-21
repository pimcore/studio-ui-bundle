/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { type AccessorKeyColumnDef } from '@tanstack/react-table'
import { Empty } from 'antd'
import { isEmpty } from 'lodash'
import { useGridContext } from '@Pimcore/modules/reports/reports-view/context/grid-context'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Content } from '@Pimcore/components/content/content'
import { Header } from '@Pimcore/components/header/header'
import { Flex } from '@Pimcore/components/flex/flex'
import { Tag } from '@Pimcore/components/tag/tag'
import { Space } from '@Pimcore/components/space/space'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { uuid } from '@Pimcore/utils/uuid'
import { StackList, type StackListProps } from '@Pimcore/components/stack-list/stack-list'
import type { StackListItemProps } from '@Pimcore/components/stack-list/stack-list-item'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Button } from '@Pimcore/components/button/button'
import { Dropdown, type DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'

type Column = AccessorKeyColumnDef<unknown, any>

interface ColumnStackListItemProps extends StackListItemProps {
  meta: Column
}

interface ColumnStackListProps extends Omit<StackListProps, 'items'> {
  items: ColumnStackListItemProps[]
}

export const ColumnsConfiguration = (): React.JSX.Element => {
  const { columns, setColumns, initialColumns, addColumn, resetColumnsToInitial } = useGridContext()

  const [addColumnMenu, setAddColumnMenu] = useState<DropdownMenuProps['items']>([])

  const { t } = useTranslation()

  const handleItemsChange = (items: ColumnStackListProps['items']): void => {
    const newColumns = items.map((item) => item.meta)

    setColumns(newColumns)
  }

  const handleRemoveColumn = (uniqueId: string): void => {
    const itemList = stackListItems.filter((item) => item.id !== uniqueId)
    const newColumns = itemList.map((item) => item.meta)

    setColumns(newColumns)
  }

  const handleColumnClick = (column: Column): void => {
    addColumn(column)
  }

  useEffect(() => {
    const newAddColumnMenu = initialColumns
      ?.filter((initialColumn) => !columns.some((column) => initialColumn.accessorKey === column.accessorKey))
      ?.map((column) => ({
        key: column.accessorKey,
        label: column.header as string,
        onClick: () => { handleColumnClick(column) }
      }))

    setAddColumnMenu(newAddColumnMenu)
  }, [columns])

  const stackListItems: ColumnStackListProps['items'] = columns.map(column => {
    const uniqueId = uuid()

    return {
      id: uniqueId,
      sortable: true,
      meta: column,

      children: <Tag>{column.header as string}</Tag>,

      renderRightToolbar: (
        <Space size='mini'>
          <IconButton
            icon={ { value: 'trash' } }
            onClick={ () => { handleRemoveColumn(uniqueId) } }
            theme='secondary'
          />
        </Space>
      )
    }
  })

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar
          padding={ { x: 'none' } }
          theme='secondary'
        >
          <Button
            onClick={ resetColumnsToInitial }
            type="link"
          >
            { t('reports.grid-config.restore-to-default') }
          </Button>
        </Toolbar>
      }
    >
      <Content padded>
        <Header
          fullWidth
          title={ t('reports.grid-config.title-columns') }
        />
        <Space
          direction='vertical'
          style={ { width: '100%' } }
        >
          <Flex vertical>
            { stackListItems.length === 0 && <Empty image={ Empty.PRESENTED_IMAGE_SIMPLE } /> }
            { stackListItems.length > 0 && (
            <StackList
              items={ stackListItems }
              onItemsChange={ handleItemsChange }
              sortable
            />
            ) }
          </Flex>
          {!isEmpty(addColumnMenu) && (
          <Dropdown menu={ { items: addColumnMenu } }>
            <IconTextButton
              icon={ { value: 'new' } }
              type='link'
            >
              { t('listing.add-column') }
            </IconTextButton>
          </Dropdown>
          )}
        </Space>
      </Content>
    </ContentLayout>
  )
}
