/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo, type ReactNode } from 'react'
import { StackList, type StackListProps } from '@Pimcore/components/stack-list/stack-list'
import { Empty, Tag } from 'antd'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { useGridConfig } from './hooks/use-grid-config'
import { useTranslation } from 'react-i18next'
import { Space } from '@Pimcore/components/space/space'
import { uuid } from '@Pimcore/utils/uuid'
import { type StackListItemProps } from '@Pimcore/components/stack-list/stack-list-item'
import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import { AdvancedColumnForm } from './forms/advanced-column-form/advanced-column-form'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import { PermissionBasedLanguageSelectionControl } from '@Pimcore/modules/element/components/language-selection/permission-based-language-selection-control'
import { isEmptyValue } from '@Pimcore/utils/type-utils'

interface ColumnStackListItemProps extends StackListItemProps {
  meta: AvailableColumn
}

interface ColumnStackListProps extends Omit<StackListProps, 'items'> {
  items: ColumnStackListItemProps[]
}

export const GridConfigList = (): React.JSX.Element => {
  const { setColumns, columns } = useGridConfig()
  const { t } = useTranslation()

  const stackListItems: ColumnStackListProps['items'] = useMemo(() => columns.map((column) => {
    const uniqueId = column.__meta?.uniqueId ?? uuid()
    let translationKey = `${column.key}`
    const isAdvancedColumn = column.key === 'advanced'
    // @todo translation
    const advancedColumnName = column?.__meta?.advancedColumnConfig?.title ?? 'Add a title'

    if ('fieldDefinition' in column.config) {
      const fieldDefinition = column.config.fieldDefinition as Record<string, any>
      translationKey = !isEmptyValue(fieldDefinition?.title) ? fieldDefinition?.title : column.key
    }

    return {
      id: uniqueId,
      sortable: true,
      meta: column,

      type: isAdvancedColumn ? 'collapse' : 'default',
      children: (
        () => isAdvancedColumn
          ? <Tag color='purple'>{advancedColumnName}</Tag>
          : <Tooltip title={ Array.isArray(column.group) ? column.group.join('/') : undefined }><Tag>{t(`${translationKey}`)}</Tag></Tooltip>
      )(),

      ...(column.key === 'advanced'
        ? {
            body: (
              <AdvancedColumnForm
                column={ column }
                onChange={ (newColumn) => { onAdvancedColumnChange(newColumn, uniqueId) } }
              />
            )
          }
        : {}),

      renderRightToolbar: (
        <Space size='mini'>
          { getLanguageSelection(uniqueId, column) }
          <IconButton
            icon={ { value: 'trash' } }
            onClick={ () => { onRemoveColumn(uniqueId) } }
            theme='secondary'
          />
        </Space>
      )
    }
  }), [columns])

  return (
    <>
      { stackListItems.length === 0 && <Empty image={ Empty.PRESENTED_IMAGE_SIMPLE } /> }
      { stackListItems.length > 0 && (
        <StackList
          items={ stackListItems }
          onItemsChange={ onItemsChange }
          sortable
        />
      ) }
    </>
  )

  function getLanguageSelection (uniqueId: string, column: AvailableColumn): ReactNode {
    if (!column.localizable) {
      return <></>
    }

    const isClassificationStore = column.type === 'dataobject.classificationstore'

    return (
      <PermissionBasedLanguageSelectionControl
        customKeys={ isClassificationStore ? ['default'] : [] }
        isNullable
        onChange={ (language) => { onLanguageSelection(uniqueId, column, language) } }
        value={ column.locale === undefined ? null : column.locale }
      />
    )
  }

  function onAdvancedColumnChange (column: AvailableColumn, id: string): void {
    const itemList = stackListItems.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          meta: {
            ...item.meta,
            __meta: {
              ...item.meta.__meta,
              advancedColumnConfig: column.__meta?.advancedColumnConfig
            }
          }
        }
      }
      return item
    })

    const newColumns = itemList.map((item) => item.meta)
    setColumns(newColumns)
  }

  function onRemoveColumn (uniqueId: string): void {
    const itemList = stackListItems.filter((item) => item.id !== uniqueId)
    const newColumns = itemList.map((item) => item.meta)
    setColumns(newColumns)
  }

  function onLanguageSelection (uniqueId: string, column: AvailableColumn, locale: string | null): void {
    const itemList = stackListItems.map((item) => {
      if (item.id === uniqueId) {
        return {
          ...item,
          meta: {
            ...item.meta,
            locale
          }
        }
      }

      return item
    })

    const newColumns = itemList.map((item) => item.meta)
    setColumns(newColumns)
  }

  function onItemsChange (items: ColumnStackListProps['items']): void {
    const newColumns = items.map((item) => item.meta)
    setColumns(newColumns)
  }
}
