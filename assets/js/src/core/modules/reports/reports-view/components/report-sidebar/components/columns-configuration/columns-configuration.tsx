/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { type AccessorFnColumnDef } from '@tanstack/react-table'
import { Empty } from 'antd'
import { isEmpty } from 'lodash'
import { useColumnsContext } from '@Pimcore/components/grid/contexts/columns-context'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Content } from '@Pimcore/components/content/content'
import { Flex } from '@Pimcore/components/flex/flex'
import { Tag } from '@Pimcore/components/tag/tag'
import { Space } from '@Pimcore/components/space/space'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { StackList, type StackListProps } from '@Pimcore/components/stack-list/stack-list'
import type { StackListItemProps } from '@Pimcore/components/stack-list/stack-list-item'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Button } from '@Pimcore/components/button/button'
import { Dropdown, type DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Title } from '@Pimcore/components/title/title'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import { useStyles } from '@Pimcore/modules/reports/reports-view/reports-view.styles'

type Column = AccessorFnColumnDef<unknown, any>

interface ColumnStackListItemProps extends StackListItemProps {
  meta: Column
}

interface ColumnStackListProps extends Omit<StackListProps, 'items'> {
  items: ColumnStackListItemProps[]
}

export const ColumnsConfiguration = (): React.JSX.Element => {
  const { columns, setColumns, initialColumns, addColumn, resetColumnsToInitial } = useColumnsContext()

  const [addColumnMenu, setAddColumnMenu] = useState<DropdownMenuProps['items']>([])

  const { t } = useTranslation()
  const { styles } = useStyles()

  const handleItemsChange = (items: ColumnStackListProps['items']): void => {
    setColumns(items.map((item) => item.meta))
  }

  const handleRemoveColumn = useCallback((columnId: string): void => {
    setColumns(columns.filter((column) => column.id !== columnId))
  }, [columns, setColumns])

  useEffect(() => {
    const newAddColumnMenu = initialColumns
      ?.filter((initialColumn) => !columns.some((column) => initialColumn.id === column.id))
      ?.map((column) => ({
        key: column.id ?? String(column.header),
        label: column.header as string,
        onClick: () => { addColumn(column) }
      }))

    setAddColumnMenu(newAddColumnMenu)
  }, [columns, initialColumns, addColumn])

  const stackListItems: ColumnStackListProps['items'] = useMemo(() => columns.map((column, index) => {
    const stableId = column.id ?? `col-${index}`

    return {
      id: stableId,
      sortable: true,
      meta: column,

      children: (
        <Tooltip title={ column.header as string }>
          <Tag className={ styles.stackItem }>{column.header as string}</Tag>
        </Tooltip>
      ),

      renderRightToolbar: (
        <Space size='mini'>
          <IconButton
            icon={ { value: 'trash' } }
            onClick={ () => { handleRemoveColumn(stableId) } }
            theme='secondary'
          />
        </Space>
      )
    }
  }), [columns, handleRemoveColumn, styles.stackItem])

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar theme='secondary'>
          <Button
            className={ styles.btnLink }
            data-testid="report-columns-restore-default"
            onClick={ resetColumnsToInitial }
            type="link"
          >
            { t('reports.grid-config.restore-to-default') }
          </Button>
        </Toolbar>
      }
    >
      <Content padded>
        <Title>{t('reports.grid-config.title-columns')}</Title>
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
              data-testid="report-columns-add-button"
              icon={ { value: 'new' } }
              type='link'
            >
              { t('reports.grid-config.add-column') }
            </IconTextButton>
          </Dropdown>
          )}
        </Space>
      </Content>
    </ContentLayout>
  )
}
