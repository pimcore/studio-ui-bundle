/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { type AccessorKeyColumnDef } from '@tanstack/react-table'
import { Empty } from 'antd'
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

interface ColumnStackListItemProps extends StackListItemProps {
  meta: AccessorKeyColumnDef<unknown, any>
}

interface ColumnStackListProps extends Omit<StackListProps, 'items'> {
  items: ColumnStackListItemProps[]
}

export const ColumnsConfiguration = (): React.JSX.Element => {
  const { columns, setColumns } = useGridContext()

  const [initialColumns] = useState(columns)

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

  const handleRestoreToDefault = (): void => {
    setColumns(initialColumns)
  }

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
            onClick={ handleRestoreToDefault }
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
      </Content>
    </ContentLayout>
  )
}
